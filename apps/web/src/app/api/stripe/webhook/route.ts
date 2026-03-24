import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { normalizeStripeStatus, normalizeStripeSubscription } from "../../../../../../../packages/billing/src";
import { getStripeServerClient } from "../../../../lib/stripe";
import {
  getUserIdByCustomerId,
  hasProcessedWebhookEvent,
  markSubscriptionStateForUser,
  recordProcessedWebhookEvent,
  upsertSubscriptionForUser,
} from "../../../../server/billing-state-store";
import { getAppEnv } from "../../../../server/env";

function extractSubscription(event: Stripe.Event): Stripe.Subscription | null {
  if (
    event.type === "customer.subscription.created" ||
    event.type === "customer.subscription.updated" ||
    event.type === "customer.subscription.deleted"
  ) {
    return event.data.object as Stripe.Subscription;
  }

  return null;
}

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing stripe signature" }, { status: 400 });
  }

  try {
    const env = getAppEnv();
    const stripe = getStripeServerClient();
    const rawBody = await request.text();
    const event = stripe.webhooks.constructEvent(rawBody, signature, env.STRIPE_WEBHOOK_SECRET);

    if (await hasProcessedWebhookEvent(event.id)) {
      return NextResponse.json({ received: true, duplicate: true });
    }

    const subscription = extractSubscription(event);

    if (!subscription) {
      await recordProcessedWebhookEvent(event.id);
      return NextResponse.json({ received: true, ignored: event.type });
    }

    const customerId = typeof subscription.customer === "string" ? subscription.customer : subscription.customer.id;
    const userId = await getUserIdByCustomerId(customerId);

    if (!userId) {
      return NextResponse.json({ error: "no_user_for_customer", customerId }, { status: 404 });
    }

    if (event.type === "customer.subscription.deleted") {
      const account = await markSubscriptionStateForUser(userId, "canceled", "free");
      await recordProcessedWebhookEvent(event.id);
      return NextResponse.json({ received: true, account });
    }

    const normalized = normalizeStripeSubscription(
      {
        id: subscription.id,
        status: subscription.status,
        current_period_end: subscription.current_period_end,
        items: {
          data: subscription.items.data.map((item) => ({ price: { id: item.price.id } })),
        },
      },
      process.env,
    );

    const normalizedState = normalizeStripeStatus(subscription.status);
    if (!["active", "trialing", "past_due", "canceled", "incomplete"].includes(normalizedState)) {
      return NextResponse.json({ error: "unsupported_subscription_state", state: normalizedState }, { status: 400 });
    }

    const account = await upsertSubscriptionForUser(userId, normalized);
    await recordProcessedWebhookEvent(event.id);

    return NextResponse.json({ received: true, account });
  } catch (error) {
    return NextResponse.json({ error: "webhook_failed", detail: String(error) }, { status: 400 });
  }
}
