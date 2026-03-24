import type { BillingPlan, SubscriptionState } from "../../core/src";
import { resolvePlanFromPriceId } from "./stripe-mapping";

export interface StripeSubscriptionLike {
  id: string;
  status: string;
  current_period_end?: number;
  items?: {
    data: Array<{ price?: { id?: string } }>;
  };
}

export interface NormalizedSubscription {
  subscriptionId: string;
  state: SubscriptionState;
  plan: BillingPlan;
  currentPeriodEnd: string | null;
}

export function normalizeStripeStatus(status: string): SubscriptionState {
  switch (status) {
    case "trialing":
    case "active":
    case "past_due":
    case "canceled":
    case "incomplete":
      return status;
    default:
      return "none";
  }
}

export function normalizeStripeSubscription(
  subscription: StripeSubscriptionLike,
  env: NodeJS.ProcessEnv,
): NormalizedSubscription {
  const firstPriceId = subscription.items?.data?.[0]?.price?.id;
  const plan = firstPriceId ? resolvePlanFromPriceId(firstPriceId, env) ?? "free" : "free";

  return {
    subscriptionId: subscription.id,
    state: normalizeStripeStatus(subscription.status),
    plan,
    currentPeriodEnd: subscription.current_period_end
      ? new Date(subscription.current_period_end * 1000).toISOString()
      : null,
  };
}
