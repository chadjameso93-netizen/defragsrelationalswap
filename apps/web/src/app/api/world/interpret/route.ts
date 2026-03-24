import { NextResponse } from "next/server";
import type { WorldScene } from "../../../../../../../packages/core/src";
import { getBillingStateForUser } from "../../../../lib/billing-server";
import { getAuthenticatedUserOrNull } from "../../../../server/auth";
import { interpretWorldScene } from "../../../../server/reasoning/world-field";

export async function POST(request: Request) {
  const user = await getAuthenticatedUserOrNull();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { entitlements } = await getBillingStateForUser(user.userId);
  if (!entitlements.canUseCompanion) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  try {
    const payload = (await request.json()) as WorldScene;

    if (!Array.isArray(payload.nodes) || !Array.isArray(payload.edges)) {
      return NextResponse.json({ error: "invalid_scene" }, { status: 400 });
    }

    const interpretation = interpretWorldScene(payload);
    return NextResponse.json({ interpretation });
  } catch (error) {
    return NextResponse.json({ error: "world_interpretation_failed", detail: String(error) }, { status: 400 });
  }
}
