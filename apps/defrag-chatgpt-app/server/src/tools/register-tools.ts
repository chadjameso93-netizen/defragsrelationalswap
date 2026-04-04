import { registerAppTool } from "@modelcontextprotocol/ext-apps/server";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { AuthInfo } from "@modelcontextprotocol/sdk/server/auth/types.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import {
  DEFRAG_TOOL_REGISTRY,
  type BillingPortalHandoffInput,
  type CheckoutHandoffInput,
  type DynamicsGuidanceInput,
  type FutureToolName,
  type RelationshipInsightInput,
  type WorldSignalInput,
} from "../../../../../packages/platform/src";
import {
  DEMO_SECURITY_SCHEMES,
  getDemoAccount,
  getDemoAccountFromAuth,
  getFallbackUserId,
  getToolLinkBack,
  resolveToolAccess,
} from "../auth/runtime-auth";
import { getPreviewAuthEnv } from "../auth/env";
import { getIdentityFromAuthInfo, resolveProductionToolAccess } from "../auth/production-auth";
import { WIDGET_RESOURCE_URIS } from "../resources/register-widget-resources";
import { createDemoPlatformRuntime } from "../state/demo-runtime";
import { createPreviewPlatformRuntime } from "../state/preview-runtime";
import {
  createAuthChallengeResult,
  createUpgradeRequiredResult,
  formatBillingPortalResult,
  formatCheckoutResult,
  formatDynamicsResult,
  formatEntitlementsResult,
  formatInsightResult,
  formatWorldResult,
} from "./result-shapes";

const dynamicsInputSchema = {
  userId: z.string().describe("Canonical DEFRAG user ID used to resolve the linked account."),
  threadId: z.string().describe("Existing DEFRAG dynamics thread ID when continuing a thread.").optional(),
  threadTitle: z.string().describe("Short title for a new dynamics thread if one needs to be created.").optional(),
  situation: z.string().describe("One grounded description of the current relational moment."),
  recentEvents: z.array(z.string().describe("A recent concrete event or cue.")).describe("Optional recent events that anchor the guidance in real context.").optional(),
  corrections: z.array(z.string().describe("A correction to a prior interpretation.")).describe("Optional user corrections that should lower certainty and change the guidance.").optional(),
};

const relationshipInsightInputSchema = {
  userId: z.string().describe("Canonical DEFRAG user ID used to resolve the linked account."),
  request: z.string().describe("The relational situation to interpret into a structured insight."),
};

const worldSignalInputSchema = {
  userId: z.string().describe("Canonical DEFRAG user ID used to resolve the linked account."),
  scene: z.object({}).passthrough().describe("A DEFRAG world scene with nodes, edges, and optional event cues."),
};

const accountEntitlementsInputSchema = {
  userId: z.string().describe("Canonical DEFRAG user ID whose current plan and entitlements should be returned."),
};

const checkoutInputSchema = {
  userId: z.string().describe("Canonical DEFRAG user ID that owns the billing account."),
  email: z.string().describe("Account email used if a Stripe customer needs to be created."),
  plan: z.string().describe("Target DEFRAG plan for checkout on defrag.app."),
  successUrl: z.string().describe("Optional post-checkout success URL on defrag.app.").optional(),
  cancelUrl: z.string().describe("Optional post-checkout cancel URL on defrag.app.").optional(),
};

const billingPortalInputSchema = {
  userId: z.string().describe("Canonical DEFRAG user ID that owns the billing account."),
  returnUrl: z.string().describe("Optional return URL on defrag.app after billing management.").optional(),
};

const dynamicsOutputSchema = {
  threadId: z.string(),
  insightId: z.string(),
  reasoning: z.object({}).passthrough(),
  metadata: z.object({}).passthrough(),
};

const insightOutputSchema = {
  insight: z.object({}).passthrough(),
  metadata: z.object({}).passthrough(),
};

const worldOutputSchema = {
  interpretation: z.object({}).passthrough(),
  metadata: z.object({}).passthrough(),
};

const entitlementsOutputSchema = {
  userId: z.string(),
  plan: z.string(),
  status: z.string(),
  entitlements: z.object({}).passthrough(),
  metadata: z.object({}).passthrough(),
};

const billingHandoffOutputSchema = {
  metadata: z.object({}).passthrough(),
};

export const MCP_TOOL_RUNTIME_CONFIG: Record<
  FutureToolName,
  {
    widgetUri: string;
    annotations: { readOnlyHint: boolean; openWorldHint: boolean; destructiveHint: boolean };
    visibility: ["model", "app"];
  }
> = {
  get_dynamics_guidance: {
    widgetUri: WIDGET_RESOURCE_URIS.dynamics,
    annotations: { readOnlyHint: false, openWorldHint: false, destructiveHint: false },
    visibility: ["model", "app"],
  },
  generate_relationship_insight: {
    widgetUri: WIDGET_RESOURCE_URIS.insight,
    annotations: { readOnlyHint: false, openWorldHint: false, destructiveHint: false },
    visibility: ["model", "app"],
  },
  interpret_world_signal: {
    widgetUri: WIDGET_RESOURCE_URIS.world,
    annotations: { readOnlyHint: false, openWorldHint: false, destructiveHint: false },
    visibility: ["model", "app"],
  },
  get_account_entitlements: {
    widgetUri: WIDGET_RESOURCE_URIS.entitlements,
    annotations: { readOnlyHint: true, openWorldHint: false, destructiveHint: false },
    visibility: ["model", "app"],
  },
  begin_upgrade_checkout: {
    widgetUri: WIDGET_RESOURCE_URIS.redirect,
    annotations: { readOnlyHint: false, openWorldHint: true, destructiveHint: false },
    visibility: ["model", "app"],
  },
  open_billing_portal: {
    widgetUri: WIDGET_RESOURCE_URIS.redirect,
    annotations: { readOnlyHint: false, openWorldHint: true, destructiveHint: false },
    visibility: ["model", "app"],
  },
};

function descriptorDescription(description: string) {
  return description.startsWith("Use this when")
    ? description
    : `Use this when ${description.charAt(0).toLowerCase()}${description.slice(1)}`;
}

function resolveRequestedUserId(authInfo: AuthInfo | undefined, args: unknown) {
  return getDemoAccountFromAuth(authInfo)?.userId ?? getFallbackUserId(args);
}

function getSecuritySchemes() {
  const env = getPreviewAuthEnv();
  return env.authMode === "preview"
    ? [{ type: "oauth2" as const, scopes: ["defrag:read", "defrag:billing"] }]
    : DEMO_SECURITY_SCHEMES;
}

function createToolDescriptor<TInputSchema, TOutputSchema>(
  entry: (typeof DEFRAG_TOOL_REGISTRY)[FutureToolName],
  inputSchema: TInputSchema,
  outputSchema: TOutputSchema,
) {
  return {
    title: entry.title,
    description: descriptorDescription(entry.description),
    inputSchema,
    outputSchema,
    annotations: MCP_TOOL_RUNTIME_CONFIG[entry.name].annotations,
    _meta: {
      ui: {
        resourceUri: MCP_TOOL_RUNTIME_CONFIG[entry.name].widgetUri,
        visibility: MCP_TOOL_RUNTIME_CONFIG[entry.name].visibility,
      },
      securitySchemes: getSecuritySchemes(),
      linkBack: getToolLinkBack(entry.name),
    },
  };
}

export const LOCAL_MCP_TOOL_DESCRIPTORS = {
  get_dynamics_guidance: createToolDescriptor(
    DEFRAG_TOOL_REGISTRY.get_dynamics_guidance,
    dynamicsInputSchema,
    dynamicsOutputSchema,
  ),
  generate_relationship_insight: createToolDescriptor(
    DEFRAG_TOOL_REGISTRY.generate_relationship_insight,
    relationshipInsightInputSchema,
    insightOutputSchema,
  ),
  interpret_world_signal: createToolDescriptor(
    DEFRAG_TOOL_REGISTRY.interpret_world_signal,
    worldSignalInputSchema,
    worldOutputSchema,
  ),
  get_account_entitlements: createToolDescriptor(
    DEFRAG_TOOL_REGISTRY.get_account_entitlements,
    accountEntitlementsInputSchema,
    entitlementsOutputSchema,
  ),
  begin_upgrade_checkout: createToolDescriptor(
    DEFRAG_TOOL_REGISTRY.begin_upgrade_checkout,
    checkoutInputSchema,
    billingHandoffOutputSchema,
  ),
  open_billing_portal: createToolDescriptor(
    DEFRAG_TOOL_REGISTRY.open_billing_portal,
    billingPortalInputSchema,
    billingHandoffOutputSchema,
  ),
} as const;

export function createLocalToolInvokers(baseUrl: string) {
  const env = getPreviewAuthEnv();
  const runtime = env.authMode === "preview" ? createPreviewPlatformRuntime() : createDemoPlatformRuntime(baseUrl);

  async function resolveAccess(entry: (typeof DEFRAG_TOOL_REGISTRY)[FutureToolName], args: unknown, authInfo?: AuthInfo) {
    if (env.authMode === "preview") {
      const identity = await getIdentityFromAuthInfo(authInfo);
      return resolveProductionToolAccess(entry, identity);
    }

    const userId = resolveRequestedUserId(authInfo, args);
    return resolveToolAccess(entry, getDemoAccount(userId), userId);
  }

  function resolvedUserId(args: unknown, authInfo?: AuthInfo) {
    if (env.authMode === "preview") {
      const userId = authInfo?.extra?.userId;
      return typeof userId === "string" ? userId : undefined;
    }
    return resolveRequestedUserId(authInfo, args);
  }

  return {
    async get_dynamics_guidance(args: DynamicsGuidanceInput, extra: { authInfo?: AuthInfo } = {}): Promise<CallToolResult> {
      const userId = resolvedUserId(args, extra.authInfo);
      const access = await resolveAccess(DEFRAG_TOOL_REGISTRY.get_dynamics_guidance, args, extra.authInfo);
      if (access.requiresAuthChallenge) {
        return createAuthChallengeResult(access.auth.reason ?? "Sign in to continue.", baseUrl, access.auth);
      }
      if (!access.allowed) {
        return createUpgradeRequiredResult(access.auth.reason ?? "Upgrade required.", access.auth);
      }

      const result = await runtime.dynamicsService.createGuidance({
        userId: userId!,
        threadId: typeof args.threadId === "string" ? args.threadId : undefined,
        threadTitle: typeof args.threadTitle === "string" ? args.threadTitle : undefined,
        situation: args.situation,
        recentEvents: Array.isArray(args.recentEvents) ? args.recentEvents : undefined,
        corrections: Array.isArray(args.corrections) ? args.corrections : undefined,
      });

      return formatDynamicsResult(result, DEFRAG_TOOL_REGISTRY.get_dynamics_guidance);
    },

    async generate_relationship_insight(args: RelationshipInsightInput, extra: { authInfo?: AuthInfo } = {}): Promise<CallToolResult> {
      const userId = resolvedUserId(args, extra.authInfo);
      const access = await resolveAccess(DEFRAG_TOOL_REGISTRY.generate_relationship_insight, args, extra.authInfo);
      if (access.requiresAuthChallenge) {
        return createAuthChallengeResult(access.auth.reason ?? "Sign in to continue.", baseUrl, access.auth);
      }
      if (!access.allowed) {
        return createUpgradeRequiredResult(access.auth.reason ?? "Upgrade required.", access.auth);
      }

      const result = await runtime.insightService.generateInsight({ userId: userId!, request: args.request });
      return formatInsightResult(result, DEFRAG_TOOL_REGISTRY.generate_relationship_insight);
    },

    async interpret_world_signal(args: WorldSignalInput, extra: { authInfo?: AuthInfo } = {}): Promise<CallToolResult> {
      const userId = resolvedUserId(args, extra.authInfo);
      const access = await resolveAccess(DEFRAG_TOOL_REGISTRY.interpret_world_signal, args, extra.authInfo);
      if (access.requiresAuthChallenge) {
        return createAuthChallengeResult(access.auth.reason ?? "Sign in to continue.", baseUrl, access.auth);
      }
      if (!access.allowed) {
        return createUpgradeRequiredResult(access.auth.reason ?? "Upgrade required.", access.auth);
      }

      const result = await runtime.worldService.interpret({
        userId: userId!,
        scene: args.scene as WorldSignalInput["scene"],
      });
      return formatWorldResult(result, DEFRAG_TOOL_REGISTRY.interpret_world_signal);
    },

    async get_account_entitlements(args: { userId: string }, extra: { authInfo?: AuthInfo } = {}): Promise<CallToolResult> {
      const userId = resolvedUserId(args, extra.authInfo);
      const access = await resolveAccess(DEFRAG_TOOL_REGISTRY.get_account_entitlements, args, extra.authInfo);
      if (access.requiresAuthChallenge) {
        return createAuthChallengeResult(access.auth.reason ?? "Sign in to continue.", baseUrl, access.auth);
      }

      const result = await runtime.billingService.getAccountEntitlements(userId!);
      return formatEntitlementsResult(result, DEFRAG_TOOL_REGISTRY.get_account_entitlements);
    },

    async begin_upgrade_checkout(args: CheckoutHandoffInput, extra: { authInfo?: AuthInfo } = {}): Promise<CallToolResult> {
      const userId = resolvedUserId(args, extra.authInfo);
      const access = await resolveAccess(DEFRAG_TOOL_REGISTRY.begin_upgrade_checkout, args, extra.authInfo);
      if (access.requiresAuthChallenge) {
        return createAuthChallengeResult(access.auth.reason ?? "Sign in to continue.", baseUrl, access.auth);
      }

      const result = await runtime.billingService.beginUpgradeCheckout({
        userId: userId!,
        email: args.email,
        plan: args.plan as CheckoutHandoffInput["plan"],
        successUrl: args.successUrl,
        cancelUrl: args.cancelUrl,
      });
      return formatCheckoutResult(result);
    },

    async open_billing_portal(args: BillingPortalHandoffInput, extra: { authInfo?: AuthInfo } = {}): Promise<CallToolResult> {
      const userId = resolvedUserId(args, extra.authInfo);
      const access = await resolveAccess(DEFRAG_TOOL_REGISTRY.open_billing_portal, args, extra.authInfo);
      if (access.requiresAuthChallenge) {
        return createAuthChallengeResult(access.auth.reason ?? "Sign in to continue.", baseUrl, access.auth);
      }

      const result = await runtime.billingService.openBillingPortal({
        userId: userId!,
        returnUrl: args.returnUrl,
      });
      return formatBillingPortalResult(result);
    },
  } as const;
}

export function registerTools(server: McpServer, baseUrl: string) {
  const invokers = createLocalToolInvokers(baseUrl);

  registerAppTool(server, "get_dynamics_guidance", LOCAL_MCP_TOOL_DESCRIPTORS.get_dynamics_guidance, (args, extra) =>
    invokers.get_dynamics_guidance(args as DynamicsGuidanceInput, extra),
  );
  registerAppTool(server, "generate_relationship_insight", LOCAL_MCP_TOOL_DESCRIPTORS.generate_relationship_insight, (args, extra) =>
    invokers.generate_relationship_insight(args as RelationshipInsightInput, extra),
  );
  registerAppTool(server, "interpret_world_signal", LOCAL_MCP_TOOL_DESCRIPTORS.interpret_world_signal, (args, extra) =>
    invokers.interpret_world_signal(args as unknown as WorldSignalInput, extra),
  );
  registerAppTool(server, "get_account_entitlements", LOCAL_MCP_TOOL_DESCRIPTORS.get_account_entitlements, (args, extra) =>
    invokers.get_account_entitlements(args as { userId: string }, extra),
  );
  registerAppTool(server, "begin_upgrade_checkout", LOCAL_MCP_TOOL_DESCRIPTORS.begin_upgrade_checkout, (args, extra) =>
    invokers.begin_upgrade_checkout(args as unknown as CheckoutHandoffInput, extra),
  );
  registerAppTool(server, "open_billing_portal", LOCAL_MCP_TOOL_DESCRIPTORS.open_billing_portal, (args, extra) =>
    invokers.open_billing_portal(args as BillingPortalHandoffInput, extra),
  );
}
