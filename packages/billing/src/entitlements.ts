import type { BillingPlan, Entitlements, SubscriptionState } from "../../core/src";

const PLAN_HIERARCHY: BillingPlan[] = [
  "free",
  "core",
  "studio",
  "realtime",
  "professional",
  "team",
  "api",
  "enterprise",
];

function hasAtLeastPlan(current: BillingPlan, required: BillingPlan): boolean {
  return PLAN_HIERARCHY.indexOf(current) >= PLAN_HIERARCHY.indexOf(required);
}

export function resolveEntitlements(plan: BillingPlan, subscriptionState: SubscriptionState): Entitlements {
  const active = subscriptionState === "active" || subscriptionState === "trialing";

  return {
    plan,
    canUseDynamics: true,
    canUseDynamicsPremiumView: active && hasAtLeastPlan(plan, "core"),
    canUseInsights: active && hasAtLeastPlan(plan, "studio"),
    canUseRealtime: active && hasAtLeastPlan(plan, "realtime"),
    monthlySituationLimit: hasAtLeastPlan(plan, "core") && active ? 100 : 5,
  };
}
