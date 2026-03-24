import type { CompanionGuidanceInput, CompanionGuidanceOutput } from "../../../../../packages/platform/src";
import {
  createInsightForThread,
  createThread,
  getInsightById,
  listActionsForInsight,
  listInsightsForThread,
  listRecentActionsForUser,
  listRecentInsightsForUser,
  listThreadsForUser,
} from "../companion-store";
import { runCompanionReasoning } from "../reasoning/companion-reasoner";

export async function listCompanionThreads(userId: string) {
  return listThreadsForUser(userId);
}

export async function listCompanionInsights(userId: string, threadId: string) {
  return listInsightsForThread(userId, threadId);
}

export async function createCompanionGuidance(input: CompanionGuidanceInput): Promise<CompanionGuidanceOutput> {
  const thread = input.threadId
    ? { id: input.threadId }
    : await createThread(input.userId, input.threadTitle?.trim() || "Untitled thread");

  const [priorInsights, priorActions] = await Promise.all([
    listRecentInsightsForUser(input.userId),
    listRecentActionsForUser(input.userId),
  ]);

  const reasoning = await runCompanionReasoning({
    userId: input.userId,
    threadId: thread.id,
    situationText: input.situation,
    recentEvents: input.recentEvents?.length ? input.recentEvents : [input.situation],
    userCorrections: input.corrections ?? [],
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
    input.userId,
    thread.id,
    reasoning.output,
    reasoning.synthesis,
    reasoning.evaluation,
    reasoning.followUpActions,
  );

  return {
    threadId: thread.id,
    insightId: insight.id,
    reasoning,
  };
}

export async function resolveCompanionAction(userId: string, insightId: string, actionType: "show_evidence" | "rephrase" | "practice_conversation") {
  const insight = await getInsightById(userId, insightId);
  if (!insight) {
    return { error: "insight_not_found" as const };
  }

  const actions = await listActionsForInsight(insight.id);
  const selected = actions.find((action) => action.type === actionType);

  if (!selected) {
    return { error: "action_not_available" as const };
  }

  if (selected.type === "show_evidence") {
    return {
      action: selected,
      result: {
        title: "What this is based on",
        lines: insight.contract.whatThisIsBasedOn,
        confidence: insight.confidence,
      },
    };
  }

  if (selected.type === "rephrase") {
    return {
      action: selected,
      result: {
        title: "A calmer phrasing",
        lines: [
          `I want to understand this better. ${insight.synthesis?.timingSignal ?? "Could we pick a steadier moment?"}`,
          `What I’m hoping for is: ${insight.synthesis?.helpNeeded ?? insight.contract.nextMove}`,
        ],
        confidence: insight.confidence,
      },
    };
  }

  const pressure = insight.synthesis?.timing.pressureLevel ?? "medium";
  const patternHint = insight.synthesis?.detectedPatterns?.[0]?.replaceAll("_", " ") ?? "interaction loop";

  return {
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
  };
}
