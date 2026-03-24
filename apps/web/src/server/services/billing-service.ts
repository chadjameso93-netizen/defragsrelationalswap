import { getStripePriceMappingFromEnv } from "../../../../../packages/billing/src";
import { createBillingService } from "../../../../../packages/platform-server/src";
import type { ToolResultMetadata } from "../../../../../packages/platform/src";
import type { BillingPlan } from "../../../../../packages/core/src";
import { getStripeServerClient } from "../../lib/stripe";
import { getBaseAppEnv } from "../env";
import { ensureBillingAccount, getBillingAccount, upsertCustomerForUser } from "../billing-state-store";

function createMetadata(input: {
  toolName: "get_account_entitlements" | "begin_upgrade_checkout" | "open_billing_portal";
  userId: string;
  plan: BillingPlan;
  status: string;
}): ToolResultMetadata {
  const intent = input.toolName === "begin_upgrade_checkout" ? "upgrade" : "manage";
  const label = input.toolName === "begin_upgrade_checkout" ? "Upgrade on defrag.app" : "Manage billing";
  const ctaKind = input.toolName === "begin_upgrade_checkout" ? "upgrade" : "manage_billing";

  return {
    toolName: input.toolName,
    auth: {
      state: input.toolName === "begin_upgrade_checkout" ? "upgrade_required" : "linked_entitled",
      userId: input.userId,
      plan: input.plan,
      entitlementStatus: input.status,
      redirectTarget: {
        path: "/account/billing",
        label,
        intent,
        mode: "website-redirect",
      },
    },
    display: {
      defaultMode: input.toolName === "get_account_entitlements" ? "inline-card" : "redirect-only",
      capability: input.toolName === "get_account_entitlements" ? "inline-only" : "redirect-only",
      inlineCardSufficient: input.toolName === "get_account_entitlements",
      fullscreenJustifiedLater: false,
      maxInlineCtas: 1,
      inlineFields: input.toolName === "get_account_entitlements" ? ["plan", "status", "entitlements"] : ["status"],
      omitFromInline: input.toolName === "get_account_entitlements" ? ["full billing history"] : ["portal internals", "checkout internals"],
    },
    linkBack: {
      path: "/account/billing",
      label,
      intent,
      mode: "website-redirect",
    },
    ctas: [
      {
        id: input.toolName,
        label,
        kind: ctaKind,
        target: {
          path: "/account/billing",
          label,
          intent,
          mode: "website-redirect",
        },
      },
    ],
  };
}

const service = createBillingService({
  state: {
    getBillingAccount,
    ensureBillingAccount,
    upsertCustomerForUser,
  },
  stripe: {
    async retrieveCustomer(customerId) {
      const stripe = getStripeServerClient();
      const customer = await stripe.customers.retrieve(customerId);
      return {
        id: customer.id,
        deleted: "deleted" in customer ? Boolean(customer.deleted) : false,
      };
    },
    async createCustomer(input) {
      const stripe = getStripeServerClient();
      const customer = await stripe.customers.create({
        email: input.email,
        metadata: { userId: input.userId },
      });
      return { id: customer.id };
    },
    async createCheckoutSession(input) {
      const stripe = getStripeServerClient();
      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        customer: input.customerId,
        client_reference_id: input.userId,
        line_items: [{ price: input.priceId, quantity: 1 }],
        success_url: input.successUrl,
        cancel_url: input.cancelUrl,
      });
      return { id: session.id, url: session.url };
    },
    async createBillingPortalSession(input) {
      const stripe = getStripeServerClient();
      const session = await stripe.billingPortal.sessions.create({
        customer: input.customerId,
        return_url: input.returnUrl,
      });
      return { url: session.url };
    },
  },
  getPriceId(plan) {
    return getStripePriceMappingFromEnv(process.env)[plan];
  },
  getBaseUrl() {
    return getBaseAppEnv().NEXT_PUBLIC_APP_URL;
  },
  createMetadata,
});

export const getAccountEntitlements = service.getAccountEntitlements;
export const beginUpgradeCheckout = service.beginUpgradeCheckout;
export const openBillingPortal = service.openBillingPortal;
