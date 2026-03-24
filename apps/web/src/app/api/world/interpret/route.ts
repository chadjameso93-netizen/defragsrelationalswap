import { NextResponse } from "next/server";
import type { WorldScene } from "../../../../../../../packages/core/src";
import { getAuthenticatedUserOrNull } from "../../../../server/auth";
import { interpretWorldSignal } from "../../../../server/services/world-service";

export async function POST(request: Request) {
  const user = await getAuthenticatedUserOrNull();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const payload = (await request.json()) as WorldScene;

    if (!Array.isArray(payload.nodes) || !Array.isArray(payload.edges)) {
      return NextResponse.json({ error: "invalid_scene" }, { status: 400 });
    }

    const result = await interpretWorldSignal({
      userId: user.userId,
      scene: payload,
    });
    return NextResponse.json(result);
  } catch (error) {
    if (String(error) === "Error: FORBIDDEN") {
      return NextResponse.json({ error: "forbidden" }, { status: 403 });
    }
    return NextResponse.json({ error: "world_interpretation_failed", detail: String(error) }, { status: 400 });
  }
}
