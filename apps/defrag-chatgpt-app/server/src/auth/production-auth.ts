import type { AuthInfo } from "@modelcontextprotocol/sdk/server/auth/types.js";
import { resolveEntitlements } from "../../../../../packages/billing/src";
import { verifyAccessToken } from "../../../../../packages/platform-server/src";
import type {
  FutureToolName,
  ToolAuthBoundaryState,
  ToolLinkBackTarget,
  ToolRegistryEntry,
} from "../../../../../packages/platform/src";
import type { BillingPlan, SubscriptionState } from "../../../../../packages/core/src";
import { getPreviewAuthEnv } from "./env";
import { createSupabaseAdminClient } from "./supabase-admin";

interface BillingAccountRow {
  user_id: string;
  stripe_customer_id: string | null;
  current_plan: BillingPlan;
  subscription_state: SubscriptionState;
}

export interface ProductionIdentity {
  userId: string;
  email?: string;
}

export interface ResolvedToolAccess {
  identity: ProductionIdentity | null;
  auth: ToolAuthBoundaryState;
  allowed: boolean;
  requiresAuthChallenge: boolean;
}

function getToolLinkBack(toolName: FutureToolName): ToolLinkBackTarget {
  switch (toolName) {
    case "get_dynamics_guidance":
      return { path: "/dynamics", label: "Open Dynamics", intent: "continue", mode: "website-redirect" };
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

function appLoginRedirect(pathname: string) {
  const env = getPreviewAuthEnv();
  return {
    path: `/login?next=${encodeURIComponent(pathname)}`,
    label: "Sign in on defrag.app",
    intent: "continue" as const,
    mode: "website-redirect" as const,
  };
}

export function buildAuthChallengeMeta(resourceMetadataUrl: string) {
  return `Bearer realm="defrag", resource_metadata="${resourceMetadataUrl}"`;
}

export async function verifyProductionAccessToken(token: string) {
  const env = getPreviewAuthEnv();
  if (!env.authSecret) {
    throw new Error("missing_auth_secret");
  }

  return verifyAccessToken(
    {
      issuer: env.authBaseUrl,
      audience: env.resourceAudience,
      secret: env.authSecret,
      allowedRedirectOrigins: env.allowedRedirectOrigins,
      accessTokenTtlSeconds: env.accessTokenTtlSeconds,
      refreshTokenTtlSeconds: env.refreshTokenTtlSeconds,
      authorizationCodeTtlSeconds: env.authCodeTtlSeconds,
    },
    token.replace(/^Bearer\s+/i, ""),
  );
}

async function getIdentityById(userId: string): Promise<ProductionIdentity | null> {
  const env = getPreviewAuthEnv();
  if (!env.supabaseUrl || !env.supabaseServiceRoleKey) {
    throw new Error("missing_supabase_admin_env");
  }

  const supabase = createSupabaseAdminClient(env.supabaseUrl, env.supabaseServiceRoleKey);
  const { data, error } = await supabase.auth.admin.getUserById(userId);
  if (error) {
    throw error;
  }

  if (!data.user) {
    return null;
  }

  return {
    userId: data.user.id,
    email: data.user.email ?? undefined,
  };
}

async function getBillingAccount(userId: string) {
  const env = getPreviewAuthEnv();
  if (!env.supabaseUrl || !env.supabaseServiceRoleKey) {
    throw new Error("missing_supabase_admin_env");
  }

  const supabase = createSupabaseAdminClient(env.supabaseUrl, env.supabaseServiceRoleKey);
  const { data, error } = await supabase
    .from("billing_accounts")
    .select("user_id,stripe_customer_id,current_plan,subscription_state")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return (data as BillingAccountRow | null) ?? {
    user_id: userId,
    stripe_customer_id: null,
    current_plan: "free" as const,
    subscription_state: "none" as const,
  };
}

export async function getIdentityFromAuthInfo(authInfo?: AuthInfo): Promise<ProductionIdentity | null> {
  const userId = authInfo?.extra?.userId;
  const email = authInfo?.extra?.email;
  if (typeof userId !== "string") {
    return null;
  }
  return { userId, email: typeof email === "string" ? email : undefined };
}

export async function resolveProductionToolAccess(
  entry: ToolRegistryEntry,
  identity: ProductionIdentity | null,
): Promise<ResolvedToolAccess> {
  const linkBack = getToolLinkBack(entry.name);

  if (!identity) {
    return {
      identity: null,
      allowed: false,
      requiresAuthChallenge: true,
      auth: {
        state: "unauthenticated",
        reason: "A linked DEFRAG account is required before this tool can run.",
        redirectTarget: appLoginRedirect(linkBack.path),
      },
    };
  }

  const canonicalIdentity = await getIdentityById(identity.userId);
  if (!canonicalIdentity) {
    return {
      identity,
      allowed: false,
      requiresAuthChallenge: true,
      auth: {
        state: "relink_required",
        userId: identity.userId,
        reason: "The linked DEFRAG account could not be confirmed and needs to be reconnected.",
        redirectTarget: appLoginRedirect(linkBack.path),
      },
    };
  }

  const account = await getBillingAccount(identity.userId);
  const entitlements = resolveEntitlements(account.current_plan, account.subscription_state);
  const requiredPlan = entry.entitlementPolicy.requiredPlan;
  const active = account.subscription_state === "active" || account.subscription_state === "trialing";
  const entitled = requiredPlan ? active && hasRequiredPlan(account.current_plan, requiredPlan) : true;

  if (!entitled) {
    return {
      identity: canonicalIdentity,
      allowed: false,
      requiresAuthChallenge: false,
      auth: {
        state: "upgrade_required",
        userId: canonicalIdentity.userId,
        plan: account.current_plan,
        entitlementStatus: account.subscription_state,
        reason: `This tool needs the ${requiredPlan} plan or higher.`,
        redirectTarget: {
          path: `/account/billing?upgrade=${requiredPlan ?? "core"}`,
          label: `Upgrade on defrag.app`,
          intent: "upgrade",
          mode: "website-redirect",
        },
      },
    };
  }

  return {
    identity: canonicalIdentity,
    allowed: true,
    requiresAuthChallenge: false,
    auth: {
      state: entitlements.plan === "free" ? "linked_unentitled" : "linked_entitled",
      userId: canonicalIdentity.userId,
      plan: account.current_plan,
      entitlementStatus: account.subscription_state,
    },
  };
}
