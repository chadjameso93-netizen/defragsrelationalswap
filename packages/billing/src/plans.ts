import type { BillingPlan } from "../../core/src";

export interface PlanDefinition {
  id: BillingPlan;
  name: string;
  monthlyPriceUsd: number | null;
  status: "active" | "placeholder";
}

export const PLAN_CATALOG: Record<BillingPlan, PlanDefinition> = {
  free: { id: "free", name: "Free", monthlyPriceUsd: 0, status: "active" },
  core: { id: "core", name: "Core", monthlyPriceUsd: 24, status: "active" },
  studio: { id: "studio", name: "Studio", monthlyPriceUsd: 79, status: "active" },
  realtime: { id: "realtime", name: "Realtime", monthlyPriceUsd: 149, status: "active" },
  professional: { id: "professional", name: "Professional", monthlyPriceUsd: null, status: "placeholder" },
  team: { id: "team", name: "Team", monthlyPriceUsd: null, status: "placeholder" },
  api: { id: "api", name: "API", monthlyPriceUsd: null, status: "placeholder" },
  enterprise: { id: "enterprise", name: "Enterprise", monthlyPriceUsd: null, status: "placeholder" },
};

const UPGRADE_PATH: Partial<Record<BillingPlan, BillingPlan>> = {
  free: "core",
  core: "studio",
  studio: "realtime",
};

export function getSuggestedUpgradePlan(plan: BillingPlan): BillingPlan | null {
  return UPGRADE_PATH[plan] ?? null;
}
