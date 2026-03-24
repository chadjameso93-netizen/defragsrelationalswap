import { NextResponse } from "next/server";
import { validateCheckoutInput } from "../../../../lib/validation/stripe-requests";
import { getAuthenticatedUserOrNull } from "../../../../server/auth";
import { beginUpgradeCheckout } from "../../../../server/services/billing-service";

export async function POST(request: Request) {
  try {
    const user = await getAuthenticatedUserOrNull();
    if (!user) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const payload = validateCheckoutInput(await request.json());
    const result = await beginUpgradeCheckout({
      userId: user.userId,
      email: user.email,
      plan: payload.plan,
      successUrl: payload.successUrl,
      cancelUrl: payload.cancelUrl,
    });
    return NextResponse.json({ id: result.sessionId, url: result.checkoutUrl });
  } catch (error) {
    return NextResponse.json({ error: "checkout_failed", detail: String(error) }, { status: 400 });
  }
}
