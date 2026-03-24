import { NextResponse } from "next/server";
import { validatePortalInput } from "../../../../lib/validation/stripe-requests";
import { getAuthenticatedUserOrNull } from "../../../../server/auth";
import { openBillingPortal } from "../../../../server/services/billing-service";

export async function POST(request: Request) {
  try {
    const user = await getAuthenticatedUserOrNull();
    if (!user) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const payload = validatePortalInput(await request.json());
    const result = await openBillingPortal({
      userId: user.userId,
      returnUrl: payload.returnUrl,
    });
    return NextResponse.json({ url: result.portalUrl });
  } catch (error) {
    const detail = String(error);
    if (detail.includes("no_customer_for_user") || detail.includes("stale_customer_for_user")) {
      return NextResponse.json({ error: detail.replace("Error: ", "") }, { status: 404 });
    }
    return NextResponse.json({ error: "portal_failed", detail }, { status: 400 });
  }
}
