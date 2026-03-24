import { NextResponse } from "next/server";
import { getAuthenticatedUserOrNull } from "../../../server/auth";
import { generateRelationshipInsight } from "../../../server/services/insight-service";

export async function POST(request: Request) {
  const user = await getAuthenticatedUserOrNull();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as { request?: string };
    const prompt = body.request?.trim() ?? "";

    if (prompt.length < 8) {
      return NextResponse.json({ error: "request_too_short" }, { status: 400 });
    }

    const result = await generateRelationshipInsight({
      userId: user.userId,
      request: prompt,
    });
    return NextResponse.json(result.insight);
  } catch (error) {
    return NextResponse.json({ error: "insight_generation_failed", detail: String(error) }, { status: 400 });
  }
}
