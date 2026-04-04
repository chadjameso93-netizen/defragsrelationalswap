import { randomUUID } from "node:crypto";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { createMcpExpressApp } from "@modelcontextprotocol/sdk/server/express.js";
import {
  getOAuthProtectedResourceMetadataUrl,
  mcpAuthMetadataRouter,
} from "@modelcontextprotocol/sdk/server/auth/router.js";
import { requireBearerAuth } from "@modelcontextprotocol/sdk/server/auth/middleware/bearerAuth.js";
import type { OAuthMetadata } from "@modelcontextprotocol/sdk/shared/auth.js";
import { getPreviewAuthEnv, validatePreviewEnv } from "./auth/env";
import { getDemoAccount } from "./auth/runtime-auth";
import { buildAuthChallengeMeta, verifyProductionAccessToken } from "./auth/production-auth";
import { log, sanitizeError } from "./ops/logger";
import { checkRateLimit } from "./ops/rate-limit";
import { registerWidgetResources } from "./resources/register-widget-resources";
import { registerTools } from "./tools/register-tools";
import { buildWidgetAssets } from "../../web/src/index";

const transports: Record<string, StreamableHTTPServerTransport> = {};
let assetsPromise: ReturnType<typeof buildWidgetAssets> | null = null;

function getWidgetAssets() {
  if (!assetsPromise) {
    assetsPromise = buildWidgetAssets();
  }
  return assetsPromise;
}

function createServer(name: string, websiteUrl: string) {
  return new McpServer(
    {
      name,
      version: "0.2.0",
      websiteUrl,
    },
    {
      capabilities: {
        logging: {},
      },
    },
  );
}

function createOAuthMetadata(env: ReturnType<typeof getPreviewAuthEnv>): OAuthMetadata {
  const authorizationEndpoint = `${env.authBaseUrl}/api/chatgpt/oauth/authorize`;
  const tokenEndpoint = `${env.authBaseUrl}/api/chatgpt/oauth/token`;

  return {
    issuer: env.authBaseUrl,
    authorization_endpoint: authorizationEndpoint,
    token_endpoint: tokenEndpoint,
    response_types_supported: ["code"],
    grant_types_supported: ["authorization_code", "refresh_token"],
    code_challenge_methods_supported: ["S256"],
    scopes_supported: ["defrag:read", "defrag:billing"],
    token_endpoint_auth_methods_supported: ["none"],
  };
}

function requestKey(req: any) {
  const ip =
    req.headers["x-forwarded-for"]?.toString().split(",")[0]?.trim() ??
    req.socket?.remoteAddress ??
    "unknown";
  return `${ip}:${req.method}:${req.path}`;
}

async function getConnectedServer(env: ReturnType<typeof getPreviewAuthEnv>) {
  const server = createServer(
    env.authMode === "preview" ? "defrag-chatgpt-app-preview" : "defrag-chatgpt-app-local",
    env.canonicalAppUrl,
  );
  const assets = await getWidgetAssets();
  registerWidgetResources(server, assets);
  registerTools(server, env.mcpBaseUrl);
  return server;
}

export async function createDefragMcpApp(): Promise<{
  app: ReturnType<typeof createMcpExpressApp>;
  env: ReturnType<typeof getPreviewAuthEnv>;
}> {
  const env = getPreviewAuthEnv();
  const envValidation = validatePreviewEnv(env);
  if (!envValidation.ok) {
    throw new Error(`Invalid MCP preview environment: ${envValidation.errors.join("; ")}`);
  }

  const hostUrl = new URL(env.mcpBaseUrl);
  const enforceBearer =
    env.authMode === "preview" || process.env.DEFRAG_MCP_ENFORCE_BEARER === "true";
  const app = createMcpExpressApp({
    host: hostUrl.hostname,
    allowedHosts: [hostUrl.hostname, "127.0.0.1", "localhost"],
  });

  app.use((req: any, res: any, next: () => void) => {
    const startedAt = Date.now();
    res.setHeader("Cache-Control", "no-store");
    res.on("finish", () => {
      log("info", "http_request", {
        method: req.method,
        path: req.path,
        statusCode: res.statusCode,
        durationMs: Date.now() - startedAt,
      });
    });
    next();
  });

  app.use((req: any, res: any, next: () => void) => {
    const limit = checkRateLimit(requestKey(req), env.rateLimitRequests, env.rateLimitWindowMs);
    res.setHeader("X-RateLimit-Remaining", String(limit.remaining));
    res.setHeader("X-RateLimit-Reset", String(limit.resetAt));
    if (!limit.allowed) {
      log("warn", "rate_limit_block", { path: req.path, method: req.method });
      res.status(429).json({
        error: "rate_limited",
        error_description: "Too many requests. Try again shortly.",
      });
      return;
    }
    next();
  });

  app.get("/health", (_: unknown, res: any) => {
    res.json({
      ok: true,
      app: env.authMode === "preview" ? "defrag-chatgpt-app-preview" : "defrag-chatgpt-app-local",
    });
  });

  app.get("/ready", (_: unknown, res: any) => {
    const missing: string[] = [];
    if (env.authMode === "preview") {
      if (!env.authSecret) missing.push("DEFRAG_CHATGPT_AUTH_SECRET");
      if (!env.supabaseUrl) missing.push("NEXT_PUBLIC_SUPABASE_URL");
      if (!env.supabaseServiceRoleKey) missing.push("SUPABASE_SERVICE_ROLE_KEY");
      if (env.allowedRedirectOrigins.length === 0) {
        missing.push("DEFRAG_CHATGPT_ALLOWED_REDIRECT_ORIGINS");
      }
    }

    res.status(missing.length === 0 ? 200 : 503).json({
      ok: missing.length === 0,
      mode: env.authMode,
      missing,
    });
  });

  app.use(
    mcpAuthMetadataRouter({
      oauthMetadata: createOAuthMetadata(env),
      resourceServerUrl: new URL(`${env.mcpBaseUrl}/mcp`),
      resourceName: "DEFRAG ChatGPT MCP server",
      scopesSupported: ["defrag:read", "defrag:billing"],
    }),
  );

  const authMiddleware = requireBearerAuth({
    verifier: {
      async verifyAccessToken(token) {
        if (env.authMode === "preview") {
          const verified = await verifyProductionAccessToken(token);
          return {
            token,
            clientId: verified.clientId,
            scopes: verified.scope,
            extra: { userId: verified.userId, email: verified.email },
          };
        }

        const userId = token.replace(/^Bearer\s+/i, "").replace(/^dev-/, "");
        const account = getDemoAccount(userId);
        if (!account) {
          throw new Error("invalid_demo_token");
        }

        return {
          token,
          clientId: "defrag-local-dev-mode",
          scopes: ["defrag:read", "defrag:billing"],
          extra: { userId: account.userId, email: account.email },
        };
      },
    },
    requiredScopes: [],
    resourceMetadataUrl: getOAuthProtectedResourceMetadataUrl(new URL(`${env.mcpBaseUrl}/mcp`)),
  });

  const postHandler = async (req: any, res: any) => {
    const sessionId = req.headers["mcp-session-id"] as string | undefined;

    try {
      let transport: StreamableHTTPServerTransport;

      if (sessionId && transports[sessionId]) {
        transport = transports[sessionId];
      } else {
        transport = new StreamableHTTPServerTransport({
          sessionIdGenerator: () => randomUUID(),
          onsessioninitialized(initializedSessionId) {
            transports[initializedSessionId] = transport;
          },
        });

        transport.onclose = () => {
          const currentSessionId = transport.sessionId;
          if (currentSessionId) {
            delete transports[currentSessionId];
          }
        };

        const server = await getConnectedServer(env);
        await server.connect(transport);
      }

      await transport.handleRequest(req, res, req.body);
    } catch (error) {
      log("error", "mcp_request_failed", sanitizeError(error));
      if (!res.headersSent) {
        res.status(500).json({
          jsonrpc: "2.0",
          error: {
            code: -32603,
            message: "DEFRAG MCP server failed.",
          },
          id: null,
        });
      }
    }
  };

  const getHandler = async (req: any, res: any) => {
    const sessionId = req.headers["mcp-session-id"] as string | undefined;
    if (!sessionId || !transports[sessionId]) {
      res.status(400).send("Invalid or missing MCP session ID.");
      return;
    }
    await transports[sessionId].handleRequest(req, res);
  };

  const deleteHandler = async (req: any, res: any) => {
    const sessionId = req.headers["mcp-session-id"] as string | undefined;
    if (!sessionId || !transports[sessionId]) {
      res.status(400).send("Invalid or missing MCP session ID.");
      return;
    }
    await transports[sessionId].handleRequest(req, res);
  };

  if (enforceBearer) {
    app.post("/mcp", authMiddleware, postHandler);
    app.get("/mcp", authMiddleware, getHandler);
    app.delete("/mcp", authMiddleware, deleteHandler);
  } else {
    app.post("/mcp", postHandler);
    app.get("/mcp", getHandler);
    app.delete("/mcp", deleteHandler);
  }

  return { app, env };
}

export function buildStartupLog(env: ReturnType<typeof getPreviewAuthEnv>) {
  return {
    mode: env.authMode,
    mcpUrl: `${env.mcpBaseUrl}/mcp`,
    authMetadataUrl: `${env.mcpBaseUrl}/.well-known/oauth-protected-resource/mcp`,
    authChallenge: buildAuthChallengeMeta(
      `${env.mcpBaseUrl}/.well-known/oauth-protected-resource/mcp`,
    ),
  };
}
