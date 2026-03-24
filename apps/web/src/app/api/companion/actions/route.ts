import { NextResponse } from "next/server";
import { getAuthenticatedUserOrNull } from "../../../../server/auth";
import { getInsightById, listActionsForInsight } from "../../../../server/companion-store";

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

    const insight = await getInsightById(user.userId, payload.insightId);
    if (!insight) {
      return NextResponse.json({ error: "insight_not_found" }, { status: 404 });
    }

    const actions = await listActionsForInsight(insight.id);
    const selected = actions.find((action) => action.type === payload.actionType);

    if (!selected) {
      return NextResponse.json({ error: "action_not_available" }, { status: 404 });
    }

    if (selected.type === "show_evidence") {
      return NextResponse.json({
        action: selected,
        result: {
          title: "What this is based on",
          lines: insight.contract.whatThisIsBasedOn,
          confidence: insight.confidence,
        },
      });
    }

    if (selected.type === "rephrase") {
      return NextResponse.json({
        action: selected,
        result: {
          title: "A calmer phrasing",
          lines: [
            `I want to understand this better. ${insight.synthesis?.timingSignal ?? "Could we pick a steadier moment?"}`,
            `What I’m hoping for is: ${insight.synthesis?.helpNeeded ?? insight.contract.nextMove}`,
          ],
          confidence: insight.confidence,
        },
      });
    }

    const pressure = insight.synthesis?.timing.pressureLevel ?? "medium";
    const patternHint = insight.synthesis?.detectedPatterns?.[0]?.replaceAll("_", " ") ?? "interaction loop";

    return NextResponse.json({
      action: selected,
      result: {
        title: "Practice possibilities",
        lines: [
          `Possibility A (gentle start): "I care about us, and I’d like to revisit one moment with you."`,
          `Possibility B (fact-first): "Can I share one specific moment, then hear your side before we interpret it?"`,
          `Context for this simulation: pressure is ${pressure}, and a likely pattern is ${patternHint}.`,
          `This is a simulation, not certainty. Confidence is currently ${Math.round(insight.confidence * 100)}%.`,
        ],
        confidence: insight.confidence,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "action_execution_failed", detail: String(error) }, { status: 400 });
  }
}
