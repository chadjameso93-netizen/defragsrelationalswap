import { createInsightService } from "../../../../../packages/platform-server/src";
import type { ToolResultMetadata } from "../../../../../packages/platform/src";
import { generateInsightResponseWithProvider, generateSimulationResponse } from "../reasoning/insight-generator";

function createMetadata(input: {
  toolName: "generate_relationship_insight";
  userId: string;
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
      plan: "studio",
      entitlementStatus: "active",
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
  generateInsight: async (request) => generateInsightResponseWithProvider(request),
  generateSimulation: async (request) => generateSimulationResponse(request),
  createMetadata,
});

export const generateRelationshipInsight = service.generateInsight;
export const generateRelationshipSimulation = service.generateSimulation;
