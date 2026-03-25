import type { AuthInfo } from "@modelcontextprotocol/sdk/server/auth/types.js";
import type { BillingPlan, BillingAccount } from "../../../../../packages/core/src";
import { getSuggestedUpgradePlan, resolveEntitlements } from "../../../../../packages/billing/src";
import type {
  FutureToolName,
  ToolAuthBoundaryState,
  ToolLinkBackTarget,
  ToolRegistryEntry,
} from "../../../../../packages/platform/src";

export interface DemoAccount extends BillingAccount {
  email: string;
  linkState?: "linked" | "relink_required";
}

const ACCOUNTS: Record<string, DemoAccount> = {
  user_123: {
    userId: "user_123",
    email: "user@example.com",
    customerId: "cus_demo_studio",
    subscriptionId: "sub_demo_studio",
    subscriptionState: "active",
    plan: "studio",
    currentPeriodEnd: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    linkState: "linked",
  },
  core_user: {
    userId: "core_user",
    email: "core@example.com",
    customerId: "cus_demo_core",
    subscriptionId: "sub_demo_core",
    subscriptionState: "active",
    plan: "core",
    currentPeriodEnd: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    linkState: "linked",
  },
  free_user: {
    userId: "free_user",
    email: "free@example.com",
    customerId: null,
    subscriptionId: null,
    subscriptionState: "none",
    plan: "free",
    currentPeriodEnd: null,
    updatedAt: new Date().toISOString(),
    linkState: "linked",
  },
  relink_user: {
    userId: "relink_user",
    email: "relink@example.com",
    customerId: "cus_demo_relink",
    subscriptionId: "sub_demo_relink",
    subscriptionState: "active",
    plan: "core",
    currentPeriodEnd: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    linkState: "relink_required",
  },
};

export interface ResolvedToolAccess {
  account: DemoAccount | null;
  auth: ToolAuthBoundaryState;
  allowed: boolean;
  requiresAuthChallenge: boolean;
}

export const DEMO_SECURITY_SCHEMES = [
  { type: "noauth" as const },
  { type: "oauth2" as const, scopes: ["defrag:read", "defrag:billing"] },
];

export function getDemoAccount(userId?: string): DemoAccount | null {
  if (!userId) {
    return null;
  }
  return ACCOUNTS[userId] ?? null;
}

export function getDemoAccountFromAuth(authInfo?: AuthInfo): DemoAccount | null {
  const userId = authInfo?.extra?.userId;
  return typeof userId === "string" ? getDemoAccount(userId) : null;
}

export function getFallbackUserId(input: unknown): string | undefined {
  if (!input || typeof input !== "object") {
    return undefined;
  }

  const userId = (input as { userId?: unknown }).userId;
  return typeof userId === "string" ? userId : undefined;
}

export function getToolLinkBack(toolName: FutureToolName): ToolLinkBackTarget {
  switch (toolName) {
    case "get_companion_guidance":
      return { path: "/companion", label: "Open Dynamics", intent: "continue", mode: "website-redirect" };
    case "generate_relationship_insight":
      return { path: "/account/insights", label: "Open Insights", intent: "review", mode: "website-redirect" };
    case "interpret_world_signal":
      return { path: "/world", label: "Open World", intent: "continue", mode: "website-redirect" };
    case "get_account_entitlements":
    case "begin_upgrade_checkout":
    case "open_billing_portal":
      return { path: "/account/billing", label: "Open billing on DEFRAG", intent: "manage", mode: "website-redirect" };
  }
}

function hasRequiredPlan(current: BillingPlan, required: BillingPlan) {
  const order: BillingPlan[] = ["free", "core", "studio", "realtime", "professional", "team", "api", "enterprise"];
  return order.indexOf(current) >= order.indexOf(required);
}

export function resolveToolAccess(
  entry: ToolRegistryEntry,
  account: DemoAccount | null,
  requestedUserId?: string,
): ResolvedToolAccess {
  if (!requestedUserId || !account) {
    return {
      account: null,
      allowed: false,
      requiresAuthChallenge: true,
      auth: {
        state: "unauthenticated",
        reason: "A linked DEFRAG account is required before this tool can run.",
        redirectTarget: {
          path: "/login",
          label: "Sign in on defrag.app",
          intent: "continue",
          mode: "website-redirect",
        },
      },
    };
  }

  if (account.linkState === "relink_required") {
    return {
      account,
      allowed: false,
      requiresAuthChallenge: true,
      auth: {
        state: "relink_required",
        userId: account.userId,
        plan: account.plan,
        entitlementStatus: account.subscriptionState,
        reason: "The linked DEFRAG account needs to be reconnected.",
        redirectTarget: {
          path: "/login",
          label: "Reconnect on defrag.app",
          intent: "continue",
          mode: "website-redirect",
        },
      },
    };
  }

  const entitlements = resolveEntitlements(account.plan, account.subscriptionState);
  const requiredPlan = entry.entitlementPolicy.requiredPlan;
  const active = account.subscriptionState === "active" || account.subscriptionState === "trialing";
  const entitled = requiredPlan ? active && hasRequiredPlan(account.plan, requiredPlan) : true;

  if (!entitled) {
    const suggestedPlan = getSuggestedUpgradePlan(account.plan) ?? requiredPlan ?? "core";
    return {
      account,
      allowed: false,
      requiresAuthChallenge: false,
      auth: {
        state: "upgrade_required",
        userId: account.userId,
        plan: account.plan,
        entitlementStatus: account.subscriptionState,
        reason: `This tool needs the ${requiredPlan} plan or higher.`,
        redirectTarget: {
          path: `/account/billing?upgrade=${suggestedPlan}`,
          label: `Upgrade on DEFRAG`,
          intent: "upgrade",
          mode: "website-redirect",
        },
      },
    };
  }

  return {
    account,
    allowed: true,
    requiresAuthChallenge: false,
    auth: {
      state: entitlements.plan === "free" ? "linked_unentitled" : "linked_entitled",
      userId: account.userId,
      plan: account.plan,
      entitlementStatus: account.subscriptionState,
    },
  };
}

export function buildAuthChallengeMeta(baseUrl: string) {
  return `Bearer realm="defrag", resource_metadata="${baseUrl}/.well-known/oauth-protected-resource/mcp"`;
}
