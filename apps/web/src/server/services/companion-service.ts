import { createCompanionService } from "../../../../../packages/platform-server/src";
import type { ToolResultMetadata } from "../../../../../packages/platform/src";
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

function createMetadata(input: {
  toolName: "get_companion_guidance";
  userId: string;
  plan: "core" | "studio" | "realtime";
  status: string;
  threadId: string;
  insightId: string;
}): ToolResultMetadata {
  return {
    toolName: input.toolName,
    session: {
      sessionId: input.threadId,
      threadId: input.threadId,
      insightId: input.insightId,
      continuationId: `${input.threadId}:${input.insightId}`,
    },
    auth: {
      state: "linked_entitled",
      userId: input.userId,
      plan: input.plan,
      entitlementStatus: input.status,
    },
    display: {
      defaultMode: "inline-card",
      capability: "inline-plus-fullscreen",
      inlineCardSufficient: true,
      fullscreenJustifiedLater: true,
      maxInlineCtas: 2,
      inlineFields: ["whatChanged", "nextMove", "timingSignal"],
      omitFromInline: ["full evidence panel", "complete thread history"],
    },
    linkBack: {
      path: "/companion",
      label: "Open Companion",
      intent: "continue",
      mode: "website-redirect",
    },
    ctas: [
      {
        id: "continue-companion",
        label: "Continue in Companion",
        kind: "continue",
        target: {
          path: "/companion",
          label: "Open Companion",
          intent: "continue",
          mode: "website-redirect",
        },
      },
    ],
  };
}

const service = createCompanionService({
  store: {
    listThreadsForUser,
    listRecentInsightsForUser,
    listRecentActionsForUser,
    listInsightsForThread,
    createThread,
    createInsightForThread,
    getInsightById,
    listActionsForInsight,
  },
  runReasoning: runCompanionReasoning,
  createMetadata,
});

export const listCompanionThreads = service.listThreads;
export const listCompanionInsights = service.listInsights;
export const createCompanionGuidance = service.createGuidance;
export const resolveCompanionAction = service.resolveAction;
