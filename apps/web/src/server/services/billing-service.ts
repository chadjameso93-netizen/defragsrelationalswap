import type {
  AccountEntitlementsOutput,
  BillingPortalHandoffInput,
  BillingPortalHandoffOutput,
  CheckoutHandoffInput,
  CheckoutHandoffOutput,
} from "../../../../../packages/platform/src";
import { getStripePriceMappingFromEnv } from "../../../../../packages/billing/src";
import { getStripeServerClient } from "../../lib/stripe";
import { getBaseAppEnv } from "../env";
import { ensureBillingAccount, getBillingAccount, upsertCustomerForUser } from "../billing-state-store";
import { resolveEntitlements } from "../../../../../packages/billing/src";

async function ensureStripeCustomerId(existingCustomerId: string | null, input: { userId: string; email: string }) {
  const stripe = getStripeServerClient();

  if (existingCustomerId) {
    try {
      const customer = await stripe.customers.retrieve(existingCustomerId);
      if (!("deleted" in customer && customer.deleted)) {
        return existingCustomerId;
      }
    } catch {
      // recreate below
    }
  }

  const customer = await stripe.customers.create({
    email: input.email,
    metadata: { userId: input.userId },
  });

  await upsertCustomerForUser(input.userId, customer.id);
  return customer.id;
}

export async function getAccountEntitlements(userId: string): Promise<AccountEntitlementsOutput> {
  const account = await getBillingAccount(userId);
  return {
    userId,
    plan: account.plan,
    status: account.subscriptionState,
    entitlements: resolveEntitlements(account.plan, account.subscriptionState),
  };
}

export async function beginUpgradeCheckout(input: CheckoutHandoffInput): Promise<CheckoutHandoffOutput> {
  const env = getBaseAppEnv();
  const account = await ensureBillingAccount(input.userId);
  const priceMapping = getStripePriceMappingFromEnv(process.env);
  const priceId = priceMapping[input.plan];

  if (!priceId) {
    throw new Error(`No Stripe price configured for plan: ${input.plan}`);
  }

  const stripe = getStripeServerClient();
  const customerId = await ensureStripeCustomerId(account.customerId, input);
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    client_reference_id: input.userId,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: input.successUrl ?? `${env.NEXT_PUBLIC_APP_URL}/account/billing?checkout=success`,
    cancel_url: input.cancelUrl ?? `${env.NEXT_PUBLIC_APP_URL}/account/billing?checkout=cancelled`,
  });

  return {
    checkoutUrl: session.url ?? "",
    sessionId: session.id,
  };
}

export async function openBillingPortal(input: BillingPortalHandoffInput): Promise<BillingPortalHandoffOutput> {
  const env = getBaseAppEnv();
  const account = await getBillingAccount(input.userId);

  if (!account.customerId) {
    throw new Error("no_customer_for_user");
  }

  const stripe = getStripeServerClient();
  try {
    const customer = await stripe.customers.retrieve(account.customerId);
    if ("deleted" in customer && customer.deleted) {
      throw new Error("stale_customer_for_user");
    }
  } catch {
    throw new Error("stale_customer_for_user");
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: account.customerId,
    return_url: input.returnUrl ?? `${env.NEXT_PUBLIC_APP_URL}/account/billing`,
  });

  return {
    portalUrl: session.url,
  };
}
