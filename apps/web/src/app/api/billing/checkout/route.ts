import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient as createSupabaseServerClient } from "@/utils/supabase/server";
import { isBillingBypassEmail } from '@/lib/billing-bypass';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const appUrl = process.env.NEXT_PUBLIC_APP_URL;

function requiredPrice(plan: string) {
  const mapping: Record<string, string | undefined> = {
    core: process.env.STRIPE_PRICE_CORE,
    studio: process.env.STRIPE_PRICE_STUDIO,
    realtime: process.env.STRIPE_PRICE_REALTIME,
  };

  const price = mapping[plan];
  if (!price) {
    throw new Error(`Missing Stripe price for plan: ${plan}`);
  }

  return price;
}

function createStripeClient() {
  if (!stripeSecretKey) {
    throw new Error("Missing STRIPE_SECRET_KEY");
  }

  return new Stripe(stripeSecretKey);
}

export async function POST(request: NextRequest) {
  if (!appUrl) {
    return NextResponse.json({ error: "Missing NEXT_PUBLIC_APP_URL" }, { status: 500 });
  }

  let user: { id?: string; email?: string } | null = null;
  try {
    const supabase = await createSupabaseServerClient();
    const result = await supabase.auth.getUser();
    user = result.data.user;
  } catch {
    return NextResponse.json(
      {
        error: "Checkout is unavailable in this environment until auth variables are configured.",
      },
      { status: 503 },
    );
  }

  if (!user?.id || !user.email) {
    return NextResponse.json({ error: "You must be signed in before starting checkout." }, { status: 401 });
  }

    if (isBillingBypassEmail(user.email)) {
    return NextResponse.json({
      url: `${appUrl}/app/studio?billing=bypass`,
      bypassBilling: true,
    });
  }

  const body = await request.json().catch(() => ({}));
  const plan = typeof body?.plan === "string" ? body.plan : "core";

  try {
    const stripe = createStripeClient();
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: user.email,
      line_items: [
        {
          price: requiredPrice(plan),
          quantity: 1,
        },
      ],
      success_url: `${appUrl}/membership/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/membership`,
      client_reference_id: user.id,
      metadata: {
        supabase_user_id: user.id,
        supabase_user_email: user.email,
        defrag_plan: plan,
      },
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unable to create checkout session.",
      },
      { status: 500 },
    );
  }
}
