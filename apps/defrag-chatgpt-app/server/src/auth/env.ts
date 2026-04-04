export interface PreviewAuthEnv {
  authMode: "local" | "preview";
  canonicalAppUrl: string;
  mcpBaseUrl: string;
  authBaseUrl: string;
  authSecret?: string;
  resourceAudience: string;
  supabaseUrl?: string;
  supabaseServiceRoleKey?: string;
  accessTokenTtlSeconds: number;
  refreshTokenTtlSeconds: number;
  authCodeTtlSeconds: number;
  allowedRedirectOrigins: string[];
  rateLimitRequests: number;
  rateLimitWindowMs: number;
}

function integer(name: string, fallback: number) {
  const value = process.env[name];
  if (!value) {
    return fallback;
  }

  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new Error(`Invalid integer env var: ${name}`);
  }

  return parsed;
}

function parseUrl(name: string, fallback?: string) {
  const value = process.env[name]?.trim() || fallback;
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error(`Invalid URL env var: ${name}`);
  }

  return url.toString().replace(/\/$/, "");
}

function parseOrigins(name: string) {
  return (process.env[name] ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((origin) => {
      try {
        const url = new URL(origin);
        return url.origin;
      } catch {
        throw new Error(`Invalid origin in ${name}: ${origin}`);
      }
    });
}

export function getPreviewAuthEnv(): PreviewAuthEnv {
  const authMode = process.env.DEFRAG_MCP_AUTH_MODE === "preview" ? "preview" : "local";
  const canonicalAppUrl = parseUrl("DEFRAG_CANONICAL_APP_URL", "https://defrag.app");
  const mcpBaseUrl = parseUrl("DEFRAG_MCP_BASE_URL", "http://127.0.0.1:3011");
  const authBaseUrl = parseUrl("DEFRAG_AUTH_BASE_URL", canonicalAppUrl);

  return {
    authMode,
    canonicalAppUrl,
    mcpBaseUrl,
    authBaseUrl,
    authSecret: process.env.DEFRAG_CHATGPT_AUTH_SECRET?.trim(),
    resourceAudience:
      process.env.DEFRAG_CHATGPT_RESOURCE_AUDIENCE?.trim() || "defrag-chatgpt-app",
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL?.trim(),
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY?.trim(),
    accessTokenTtlSeconds: integer("DEFRAG_CHATGPT_ACCESS_TOKEN_TTL_SECONDS", 900),
    refreshTokenTtlSeconds: integer(
      "DEFRAG_CHATGPT_REFRESH_TOKEN_TTL_SECONDS",
      60 * 60 * 24 * 30,
    ),
    authCodeTtlSeconds: integer("DEFRAG_CHATGPT_AUTH_CODE_TTL_SECONDS", 300),
    allowedRedirectOrigins: parseOrigins("DEFRAG_CHATGPT_ALLOWED_REDIRECT_ORIGINS"),
    rateLimitRequests: integer("DEFRAG_MCP_RATE_LIMIT_REQUESTS", 60),
    rateLimitWindowMs: integer("DEFRAG_MCP_RATE_LIMIT_WINDOW_MS", 60_000),
  };
}

export function validatePreviewEnv(env: PreviewAuthEnv) {
  const errors: string[] = [];
  const canonicalOrigin = new URL(env.canonicalAppUrl).origin;
  const authOrigin = new URL(env.authBaseUrl).origin;
  const mcpOrigin = new URL(env.mcpBaseUrl).origin;

  if (env.authMode === "preview") {
    if (!env.authSecret) {
      errors.push("Missing DEFRAG_CHATGPT_AUTH_SECRET");
    } else if (env.authSecret.length < 32) {
      errors.push("DEFRAG_CHATGPT_AUTH_SECRET must be at least 32 characters");
    }

    if (!env.supabaseUrl) {
      errors.push("Missing NEXT_PUBLIC_SUPABASE_URL");
    }

    if (!env.supabaseServiceRoleKey) {
      errors.push("Missing SUPABASE_SERVICE_ROLE_KEY");
    }

    if (env.allowedRedirectOrigins.length === 0) {
      errors.push("DEFRAG_CHATGPT_ALLOWED_REDIRECT_ORIGINS must include at least one origin");
    }

    if (!env.authBaseUrl.startsWith("https://")) {
      errors.push("DEFRAG_AUTH_BASE_URL must use https in preview mode");
    }

    if (!env.mcpBaseUrl.startsWith("https://")) {
      errors.push("DEFRAG_MCP_BASE_URL must use https in preview mode");
    }

    if (authOrigin !== canonicalOrigin) {
      errors.push("DEFRAG_AUTH_BASE_URL must share the same origin as DEFRAG_CANONICAL_APP_URL");
    }

    if (mcpOrigin === canonicalOrigin) {
      errors.push("DEFRAG_MCP_BASE_URL must be a separate MCP host, not the canonical app origin");
    }
  }

  if (env.accessTokenTtlSeconds > env.refreshTokenTtlSeconds) {
    errors.push("DEFRAG_CHATGPT_ACCESS_TOKEN_TTL_SECONDS must not exceed refresh-token TTL");
  }

  if (env.authCodeTtlSeconds > env.accessTokenTtlSeconds) {
    errors.push("DEFRAG_CHATGPT_AUTH_CODE_TTL_SECONDS must not exceed access-token TTL");
  }

  return {
    ok: errors.length === 0,
    errors,
  };
}
