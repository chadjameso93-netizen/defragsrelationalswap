import { NextResponse } from "next/server";
import { validatePortalInput } from "../../../../lib/validation/stripe-requests";
import { getStripeServerClient } from "../../../../lib/stripe";
import { getAuthenticatedUserOrNull } from "../../../../server/auth";
import { getBaseAppEnv } from "../../../../server/env";
import { getBillingAccount } from "../../../../server/billing-state-store";

export async function POST(request: Request) {
  try {
    const user = await getAuthenticatedUserOrNull();
    if (!user) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const payload = validatePortalInput(await request.json());
    const env = getBaseAppEnv();
    const account = await getBillingAccount(user.userId);

    if (!account.customerId) {
      return NextResponse.json({ error: "no_customer_for_user" }, { status: 404 });
    }

    const stripe = getStripeServerClient();
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: account.customerId,
      return_url: payload.returnUrl ?? `${env.NEXT_PUBLIC_APP_URL}/account/billing`,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (error) {
    return NextResponse.json({ error: "portal_failed", detail: String(error) }, { status: 400 });
  }
}
