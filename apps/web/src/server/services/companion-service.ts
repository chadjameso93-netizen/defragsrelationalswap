import { createCompanionService } from "../../../../../packages/platform-server/src";
import type { BillingPlan } from "../../../../../packages/core/src";
import type { ToolResultMetadata } from "../../../../../packages/platform/src";
import { runCompanionReasoning } from "../../../../../packages/reasoning/src";
import { getBillingAccount } from "../billing-state-store";
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

function createMetadata(input: {
  toolName: "get_companion_guidance";
  userId: string;
  plan: BillingPlan;
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
      label: "Open Dynamics",
      intent: "continue",
      mode: "website-redirect",
    },
    ctas: [
      {
        id: "continue-companion",
        label: "Continue in Dynamics",
        kind: "continue",
        target: {
          path: "/companion",
          label: "Open Dynamics",
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
  async resolveMetadataContext(userId) {
    const account = await getBillingAccount(userId);
    return {
      plan: account.plan,
      status: account.subscriptionState,
    };
  },
  createMetadata,
});

export const listCompanionThreads = service.listThreads;
export const listCompanionInsights = service.listInsights;
export const createCompanionGuidance = service.createGuidance;
export const resolveCompanionAction = service.resolveAction;
