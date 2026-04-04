import { resolveEntitlements } from "../../billing/src";
import type { BillingAccount, BillingPlan } from "../../core/src";
import type {
  AccountEntitlementsOutput,
  BillingPortalHandoffInput,
  BillingPortalHandoffOutput,
  CheckoutHandoffInput,
  CheckoutHandoffOutput,
  ToolResultMetadata,
} from "../../platform/src";

interface StripeCustomerSummary {
  id: string;
  deleted?: boolean;
}

interface BillingStateAdapter {
  getBillingAccount(userId: string): Promise<BillingAccount>;
  ensureBillingAccount(userId: string): Promise<BillingAccount>;
  upsertCustomerForUser(userId: string, customerId: string): Promise<BillingAccount>;
}

interface BillingStripeAdapter {
  retrieveCustomer(customerId: string): Promise<StripeCustomerSummary>;
  createCustomer(input: { email: string; userId: string }): Promise<{ id: string }>;
  createCheckoutSession(input: {
    customerId: string;
    userId: string;
    priceId: string;
    successUrl: string;
    cancelUrl: string;
  }): Promise<{ id: string; url: string | null }>;
  createBillingPortalSession(input: {
    customerId: string;
    returnUrl: string;
  }): Promise<{ url: string }>;
}

interface BillingServiceDeps {
  state: BillingStateAdapter;
  stripe: BillingStripeAdapter;
  getPriceId(plan: BillingPlan): string | undefined;
  getBaseUrl(): string;
  createMetadata(input: {
    toolName: "get_account_entitlements" | "begin_upgrade_checkout" | "open_billing_portal";
    userId: string;
    plan: BillingPlan;
    status: string;
  }): ToolResultMetadata;
}

async function ensureStripeCustomerId(
  stripe: BillingStripeAdapter,
  state: BillingStateAdapter,
  existingCustomerId: string | null,
  input: { userId: string; email: string },
) {
  if (existingCustomerId) {
    try {
      const customer = await stripe.retrieveCustomer(existingCustomerId);
      if (!customer.deleted) {
        return existingCustomerId;
      }
    } catch {
      // recreate below
    }
  }

  const customer = await stripe.createCustomer({
    email: input.email,
    userId: input.userId,
  });

  await state.upsertCustomerForUser(input.userId, customer.id);
  return customer.id;
}

export function createBillingService(deps: BillingServiceDeps) {
  return {
    async getAccountEntitlements(userId: string): Promise<AccountEntitlementsOutput> {
      const account = await deps.state.getBillingAccount(userId);
      return {
        userId,
        plan: account.plan,
        status: account.subscriptionState,
        entitlements: resolveEntitlements(account.plan, account.subscriptionState),
        metadata: deps.createMetadata({
          toolName: "get_account_entitlements",
          userId,
          plan: account.plan,
          status: account.subscriptionState,
        }),
      };
    },

    async beginUpgradeCheckout(input: CheckoutHandoffInput): Promise<CheckoutHandoffOutput> {
      const account = await deps.state.ensureBillingAccount(input.userId);
      const priceId = deps.getPriceId(input.plan);

      if (!priceId) {
        throw new Error(`No Stripe price configured for plan: ${input.plan}`);
      }

      const customerId = await ensureStripeCustomerId(deps.stripe, deps.state, account.customerId, input);
      const baseUrl = deps.getBaseUrl();
      const session = await deps.stripe.createCheckoutSession({
        customerId,
        userId: input.userId,
        priceId,
        successUrl: input.successUrl ?? `${baseUrl}/account/billing?checkout=success`,
        cancelUrl: input.cancelUrl ?? `${baseUrl}/account/billing?checkout=cancelled`,
      });

      return {
        checkoutUrl: session.url ?? "",
        sessionId: session.id,
        metadata: deps.createMetadata({
          toolName: "begin_upgrade_checkout",
          userId: input.userId,
          plan: input.plan,
          status: account.subscriptionState,
        }),
      };
    },

    async openBillingPortal(input: BillingPortalHandoffInput): Promise<BillingPortalHandoffOutput> {
      const account = await deps.state.getBillingAccount(input.userId);

      if (!account.customerId) {
        throw new Error("no_customer_for_user");
      }

      try {
        const customer = await deps.stripe.retrieveCustomer(account.customerId);
        if (customer.deleted) {
          throw new Error("stale_customer_for_user");
        }
      } catch {
        throw new Error("stale_customer_for_user");
      }

      const session = await deps.stripe.createBillingPortalSession({
        customerId: account.customerId,
        returnUrl: input.returnUrl ?? `${deps.getBaseUrl()}/account/billing`,
      });

      return {
        portalUrl: session.url,
        metadata: deps.createMetadata({
          toolName: "open_billing_portal",
          userId: input.userId,
          plan: account.plan,
          status: account.subscriptionState,
        }),
      };
    },
  };
}
