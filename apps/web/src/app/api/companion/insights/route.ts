import { NextResponse } from "next/server";
import type { CompanionEvaluationRubric, CompanionOutputContract, CompanionStructuredSynthesis } from "../../../../../../../packages/core/src";
import { getAuthenticatedUserOrNull } from "../../../../server/auth";
import { createCompanionGuidance, listCompanionInsights, listCompanionThreads } from "../../../../server/services/companion-service";

interface CreateInsightPayload {
  threadId?: string;
  threadTitle?: string;
  situation: string;
  recentEvents?: string[];
  corrections?: string[];
}

interface InsightRecord {
  id: string;
  contract: CompanionOutputContract;
  createdAt: string;
  synthesis?: CompanionStructuredSynthesis | null;
  evaluation?: CompanionEvaluationRubric | null;
}

export async function GET(request: Request) {
  const user = await getAuthenticatedUserOrNull();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const threadId = url.searchParams.get("threadId");

  if (!threadId) {
    const threads = await listCompanionThreads(user.userId);
    return NextResponse.json({ threads });
  }

  const insights = await listCompanionInsights(user.userId, threadId);
  return NextResponse.json({ insights });
}

export async function POST(request: Request) {
  const user = await getAuthenticatedUserOrNull();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const payload = (await request.json()) as CreateInsightPayload;

    if (!payload.situation || payload.situation.trim().length < 8) {
      return NextResponse.json({ error: "situation_too_short" }, { status: 400 });
    }

    const guidance = await createCompanionGuidance({
      userId: user.userId,
      threadId: payload.threadId,
      threadTitle: payload.threadTitle,
      situation: payload.situation,
      recentEvents: payload.recentEvents,
      corrections: payload.corrections,
    });
    const insight: InsightRecord = {
      id: guidance.insightId,
      contract: guidance.reasoning.output,
      createdAt: new Date().toISOString(),
      synthesis: guidance.reasoning.synthesis,
      evaluation: guidance.reasoning.evaluation,
    };
    return NextResponse.json({
      insight,
      threadId: guidance.threadId,
      reasoning: guidance.reasoning,
      actions: guidance.reasoning.followUpActions,
    });
  } catch (error) {
    return NextResponse.json({ error: "companion_insight_failed", detail: String(error) }, { status: 400 });
  }
}
