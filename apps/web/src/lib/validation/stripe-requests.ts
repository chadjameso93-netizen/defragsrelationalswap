import type { BillingPlan } from "../../../../../packages/core/src";
import { PLAN_CATALOG } from "../../../../../packages/billing/src";

interface CheckoutInput {
  plan: BillingPlan;
  successUrl?: string;
  cancelUrl?: string;
}

interface PortalInput {
  returnUrl?: string;
}

function isActiveCheckoutPlan(value: string): value is BillingPlan {
  if (!(value in PLAN_CATALOG)) {
    return false;
  }

  return PLAN_CATALOG[value as BillingPlan].status === "active" && value !== "free";
}

export function validateCheckoutInput(payload: unknown): CheckoutInput {
  if (!payload || typeof payload !== "object") {
    throw new Error("Invalid request body");
  }

  const plan = (payload as Record<string, unknown>).plan;
  const successUrl = (payload as Record<string, unknown>).successUrl;
  const cancelUrl = (payload as Record<string, unknown>).cancelUrl;

  if (typeof plan !== "string" || !isActiveCheckoutPlan(plan)) {
    throw new Error("Invalid or non-checkout plan value");
  }

  if (successUrl && typeof successUrl !== "string") {
    throw new Error("successUrl must be a string");
  }

  if (cancelUrl && typeof cancelUrl !== "string") {
    throw new Error("cancelUrl must be a string");
  }

  return { plan, successUrl: successUrl as string | undefined, cancelUrl: cancelUrl as string | undefined };
}

export function validatePortalInput(payload: unknown): PortalInput {
  if (!payload || typeof payload !== "object") {
    return {};
  }

  const returnUrl = (payload as Record<string, unknown>).returnUrl;

  if (returnUrl && typeof returnUrl !== "string") {
    throw new Error("returnUrl must be a string");
  }

  return { returnUrl: returnUrl as string | undefined };
}
