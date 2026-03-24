import type {
  CompanionActionResolution,
  CompanionActionType,
  CompanionGuidanceInput,
  CompanionGuidanceOutput,
  CompanionInsightListItem,
  ToolResultMetadata,
} from "../../platform/src";
import type { CompanionIntakeInput, CompanionReasoningResult } from "../../core/src";

interface CompanionThreadRecord {
  id: string;
  userId: string;
  title: string;
  createdAt: string;
}

interface FollowUpActionRecord {
  id: string;
  insightId: string;
  type: CompanionActionType;
  label: string;
  payload?: Record<string, unknown>;
  createdAt: string;
}

interface CompanionInsightRecord extends CompanionInsightListItem {
  threadId: string;
  confidence: number;
}

interface CompanionStoreAdapter {
  listThreadsForUser(userId: string): Promise<CompanionThreadRecord[]>;
  listRecentInsightsForUser(userId: string): Promise<CompanionInsightRecord[]>;
  listRecentActionsForUser(userId: string): Promise<FollowUpActionRecord[]>;
  listInsightsForThread(userId: string, threadId: string): Promise<CompanionInsightRecord[]>;
  createThread(userId: string, title: string): Promise<CompanionThreadRecord>;
  createInsightForThread(
    userId: string,
    threadId: string,
    output: CompanionReasoningResult["output"],
    synthesis: CompanionReasoningResult["synthesis"],
    evaluation: CompanionReasoningResult["evaluation"],
    followUpActions: CompanionReasoningResult["followUpActions"],
  ): Promise<{ id: string }>;
  getInsightById(userId: string, insightId: string): Promise<CompanionInsightRecord | null>;
  listActionsForInsight(insightId: string): Promise<FollowUpActionRecord[]>;
}

interface CompanionServiceDeps {
  store: CompanionStoreAdapter;
  runReasoning(input: CompanionIntakeInput): Promise<CompanionReasoningResult>;
  createMetadata(input: {
    toolName: "get_companion_guidance";
    userId: string;
    plan: "core" | "studio" | "realtime";
    status: string;
    threadId: string;
    insightId: string;
  }): ToolResultMetadata;
}

export function createCompanionService(deps: CompanionServiceDeps) {
  return {
    async listThreads(userId: string) {
      return deps.store.listThreadsForUser(userId);
    },

    async listInsights(userId: string, threadId: string) {
      return deps.store.listInsightsForThread(userId, threadId);
    },

    async createGuidance(input: CompanionGuidanceInput): Promise<CompanionGuidanceOutput> {
      const thread = input.threadId
        ? { id: input.threadId }
        : await deps.store.createThread(input.userId, input.threadTitle?.trim() || "Untitled thread");

      const [priorInsights, priorActions] = await Promise.all([
        deps.store.listRecentInsightsForUser(input.userId),
        deps.store.listRecentActionsForUser(input.userId),
      ]);

      const reasoning = await deps.runReasoning({
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

      const insight = await deps.store.createInsightForThread(
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
        metadata: deps.createMetadata({
          toolName: "get_companion_guidance",
          userId: input.userId,
          plan: "core",
          status: "active",
          threadId: thread.id,
          insightId: insight.id,
        }),
      };
    },

    async resolveAction(userId: string, insightId: string, actionType: CompanionActionType): Promise<CompanionActionResolution | { error: "insight_not_found" | "action_not_available" }> {
      const insight = await deps.store.getInsightById(userId, insightId);
      if (!insight) {
        return { error: "insight_not_found" };
      }

      const actions = await deps.store.listActionsForInsight(insight.id);
      const selected = actions.find((action) => action.type === actionType);

      if (!selected) {
        return { error: "action_not_available" };
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
    },
  };
}
