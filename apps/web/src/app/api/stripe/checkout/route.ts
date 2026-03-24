import { NextResponse } from "next/server";
import { getStripePriceMappingFromEnv } from "../../../../../../../packages/billing/src";
import { validateCheckoutInput } from "../../../../lib/validation/stripe-requests";
import { getStripeServerClient } from "../../../../lib/stripe";
import { getAuthenticatedUserOrNull } from "../../../../server/auth";
import { ensureBillingAccount, upsertCustomerForUser } from "../../../../server/billing-state-store";
import { getAppEnv } from "../../../../server/env";

export async function POST(request: Request) {
  try {
    const user = await getAuthenticatedUserOrNull();
    if (!user) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const payload = validateCheckoutInput(await request.json());
    const env = getAppEnv();
    const account = await ensureBillingAccount(user.userId);
    const priceMapping = getStripePriceMappingFromEnv(process.env);
    const priceId = priceMapping[payload.plan];

    if (!priceId) {
      return NextResponse.json({ error: `No Stripe price configured for plan: ${payload.plan}` }, { status: 400 });
    }

    const stripe = getStripeServerClient();
    let customerId = account.customerId;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          userId: user.userId,
        },
      });
      customerId = customer.id;
      await upsertCustomerForUser(user.userId, customerId);
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customerId,
      client_reference_id: user.userId,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: payload.successUrl ?? `${env.NEXT_PUBLIC_APP_URL}/account/billing?checkout=success`,
      cancel_url: payload.cancelUrl ?? `${env.NEXT_PUBLIC_APP_URL}/account/billing?checkout=cancelled`,
    });

    return NextResponse.json({ id: checkoutSession.id, url: checkoutSession.url });
  } catch (error) {
    return NextResponse.json({ error: "checkout_failed", detail: String(error) }, { status: 400 });
  }
}
