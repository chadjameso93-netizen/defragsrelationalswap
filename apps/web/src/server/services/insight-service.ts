import { createInsightService } from "../../../../../packages/platform-server/src";
import type { BillingPlan } from "../../../../../packages/core/src";
import type { ToolResultMetadata } from "../../../../../packages/platform/src";
import { generateInsightResponseWithProvider, generateSimulationResponse } from "../../../../../packages/reasoning/src";
import { getBillingAccount } from "../billing-state-store";

function createMetadata(input: {
  toolName: "generate_relationship_insight";
  userId: string;
  plan: BillingPlan;
  status: string;
  insightId?: string;
  continuationId?: string;
}): ToolResultMetadata {
  return {
    toolName: input.toolName,
    session: {
      sessionId: input.continuationId,
      insightId: input.insightId,
      continuationId: input.continuationId,
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
      inlineFields: ["what_may_be_happening", "what_to_try_next"],
      omitFromInline: ["full proof/context notes", "share studio"],
    },
    linkBack: {
      path: "/account/insights",
      label: "Open Insights",
      intent: "review",
      mode: "website-redirect",
    },
    ctas: [
      {
        id: "open-insights",
        label: "Open Insights",
        kind: "open_website",
        target: {
          path: "/account/insights",
          label: "Open Insights",
          intent: "review",
          mode: "website-redirect",
        },
      },
    ],
  };
}

const service = createInsightService({
  generateInsight: async (request) =>
    generateInsightResponseWithProvider(request, {
      provider: process.env.DEFRAG_REASONING_PROVIDER === "openai" ? "openai" : "heuristic",
      apiKey: process.env.OPENAI_API_KEY,
      model: process.env.DEFRAG_OPENAI_MODEL,
      enableModelGeneration: process.env.DEFRAG_REASONING_PROVIDER === "openai",
    }),
  generateSimulation: async (request) =>
    generateSimulationResponse(request, {
      provider: process.env.DEFRAG_REASONING_PROVIDER === "openai" ? "openai" : "heuristic",
      apiKey: process.env.OPENAI_API_KEY,
      model: process.env.DEFRAG_OPENAI_MODEL,
      enableModelGeneration: process.env.DEFRAG_REASONING_PROVIDER === "openai",
    }),
  async resolveMetadataContext(userId) {
    const account = await getBillingAccount(userId);
    return {
      plan: account.plan,
      status: account.subscriptionState,
    };
  },
  createMetadata,
});

export const generateRelationshipInsight = service.generateInsight;
export const generateRelationshipSimulation = service.generateSimulation;
