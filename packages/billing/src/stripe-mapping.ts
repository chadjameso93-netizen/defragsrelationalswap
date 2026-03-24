import type { BillingPlan } from "../../core/src";

export function getStripePriceMappingFromEnv(env: NodeJS.ProcessEnv): Partial<Record<BillingPlan, string>> {
  return {
    free: "",
    core: env.STRIPE_PRICE_CORE,
    studio: env.STRIPE_PRICE_STUDIO,
    realtime: env.STRIPE_PRICE_REALTIME,
    professional: env.STRIPE_PRICE_PROFESSIONAL,
    team: env.STRIPE_PRICE_TEAM,
    api: env.STRIPE_PRICE_API,
    enterprise: env.STRIPE_PRICE_ENTERPRISE,
  };
}

export function resolvePlanFromPriceId(priceId: string, env: NodeJS.ProcessEnv): BillingPlan | null {
  const mapping = getStripePriceMappingFromEnv(env);

  for (const [plan, mappedPriceId] of Object.entries(mapping)) {
    if (mappedPriceId && mappedPriceId === priceId) {
      return plan as BillingPlan;
    }
  }

  return null;
}
