import { NextResponse } from "next/server";
import { getAuthenticatedUserOrNull } from "../../../../server/auth";
import {
  createInsightForThread,
  createThread,
  listInsightsForThread,
  listRecentActionsForUser,
  listRecentInsightsForUser,
  listThreadsForUser,
} from "../../../../server/companion-store";
import { runCompanionReasoning } from "../../../../server/reasoning/companion-reasoner";

interface CreateInsightPayload {
  threadId?: string;
  threadTitle?: string;
  situation: string;
  recentEvents?: string[];
  corrections?: string[];
}

export async function GET(request: Request) {
  const user = await getAuthenticatedUserOrNull();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const threadId = url.searchParams.get("threadId");

  if (!threadId) {
    const threads = await listThreadsForUser(user.userId);
    return NextResponse.json({ threads });
  }

  const insights = await listInsightsForThread(user.userId, threadId);
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

    const thread = payload.threadId
      ? { id: payload.threadId }
      : await createThread(user.userId, payload.threadTitle?.trim() || "Untitled thread");

    const [priorInsights, priorActions] = await Promise.all([
      listRecentInsightsForUser(user.userId),
      listRecentActionsForUser(user.userId),
    ]);

    const reasoning = await runCompanionReasoning({
      userId: user.userId,
      threadId: thread.id,
      situationText: payload.situation,
      recentEvents: payload.recentEvents?.length ? payload.recentEvents : [payload.situation],
      userCorrections: payload.corrections ?? [],
      priorInsights: priorInsights.map((insight) => ({
        whatChanged: insight.contract.whatChanged,
        nextMove: insight.contract.nextMove,
      })),
      priorActions: priorActions.map((action) => ({
        type: action.type,
        label: action.label,
      })),
    });

    const insight = await createInsightForThread(
      user.userId,
      thread.id,
      reasoning.output,
      reasoning.synthesis,
      reasoning.evaluation,
      reasoning.followUpActions,
    );

    return NextResponse.json({ insight, threadId: thread.id, actions: reasoning.followUpActions });
  } catch (error) {
    return NextResponse.json({ error: "companion_insight_failed", detail: String(error) }, { status: 400 });
  }
}
