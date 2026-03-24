import { NextResponse } from "next/server";
import { getAuthenticatedUserOrNull } from "../../../../server/auth";
import { resolveCompanionAction } from "../../../../server/services/companion-service";

interface ExecuteActionPayload {
  insightId: string;
  actionType: "show_evidence" | "rephrase" | "practice_conversation";
}

export async function POST(request: Request) {
  const user = await getAuthenticatedUserOrNull();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const payload = (await request.json()) as ExecuteActionPayload;

    if (!payload.insightId || !payload.actionType) {
      return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
    }

    const result = await resolveCompanionAction(user.userId, payload.insightId, payload.actionType);
    if ("error" in result) {
      return NextResponse.json({ error: result.error }, { status: result.error === "insight_not_found" ? 404 : 404 });
    }
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: "action_execution_failed", detail: String(error) }, { status: 400 });
  }
}
