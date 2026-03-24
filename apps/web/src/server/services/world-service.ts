import { createWorldService } from "../../../../../packages/platform-server/src";
import type { ToolResultMetadata } from "../../../../../packages/platform/src";
import { getBillingStateForUser } from "../../lib/billing-server";
import { interpretWorldScene } from "../reasoning/world-field";

function createMetadata(input: {
  toolName: "interpret_world_signal";
  userId: string;
  continuationId?: string;
}): ToolResultMetadata {
  return {
    toolName: input.toolName,
    session: {
      sessionId: input.continuationId,
      worldStateId: input.continuationId,
      continuationId: input.continuationId,
    },
    auth: {
      state: "linked_entitled",
      userId: input.userId,
      plan: "core",
      entitlementStatus: "active",
    },
    display: {
      defaultMode: "inline-card",
      capability: "inline-plus-fullscreen",
      inlineCardSufficient: true,
      fullscreenJustifiedLater: true,
      maxInlineCtas: 2,
      inlineFields: ["dominantPattern", "pressureLevel", "repairWindow", "nextMoves"],
      omitFromInline: ["full canvas editing", "deep node inspection"],
    },
    linkBack: {
      path: "/world",
      label: "Open World",
      intent: "continue",
      mode: "website-redirect",
    },
    ctas: [
      {
        id: "open-world",
        label: "Open World",
        kind: "open_website",
        target: {
          path: "/world",
          label: "Open World",
          intent: "continue",
          mode: "website-redirect",
        },
      },
    ],
  };
}

const service = createWorldService({
  resolveWorldEntitlement: async (userId) => {
    const { entitlements } = await getBillingStateForUser(userId);
    return { allowed: entitlements.canUseCompanion };
  },
  interpret: interpretWorldScene,
  createMetadata,
});

export const interpretWorldSignal = service.interpret;
