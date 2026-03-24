import type {
  AccountEntitlementsOutput,
  BillingPortalHandoffOutput,
  CheckoutHandoffOutput,
  CompanionGuidanceInput,
  CompanionGuidanceOutput,
  RelationshipInsightInput,
  RelationshipInsightOutput,
  WorldSignalInput,
  WorldSignalOutput,
} from "./contracts";

export const companionGuidanceInputExample: CompanionGuidanceInput = {
  userId: "user_123",
  threadTitle: "After the missed callback",
  situation: "They said they would call after work and never did. I sent a follow-up and now the silence feels heavier than the original miss.",
  recentEvents: [
    "They said they would call after work.",
    "The call did not happen.",
    "I sent a follow-up text asking if we were okay.",
  ],
};

export const companionGuidanceOutputExample: CompanionGuidanceOutput = {
  threadId: "thread_123",
  insightId: "insight_123",
  reasoning: {
    synthesis: {
      userSideHypothesis: "You may be trying to regain steadiness after a missed point of contact.",
      otherSideHypothesis: "They may be hearing pressure first and delaying because they do not know how to repair quickly.",
      betweenDynamic: "The exchange may be moving toward distance before either side has named the missed moment cleanly.",
      timingSignal: "Timing seems workable for a short and grounded follow-up.",
      helpNeeded: "A short reset conversation focused on one event may help.",
      confidence: 0.71,
      detectedPatterns: ["pursue_withdraw_cycle"],
      timing: {
        pressureLevel: "medium",
        conversationFavorability: "medium",
        repairWindow: "narrow",
        delayRecommended: false,
      },
    },
    output: {
      whatHappened: "A missed callback has started to stand in for a larger question about reliability and care.",
      yourSide: "You seem to want clarity before the silence hardens into a bigger story.",
      theirSide: "They may be avoiding the follow-up because they are already behind and do not know how to re-enter cleanly.",
      whatChanged: "The moment shifted from logistics into uncertainty about the relationship.",
      nextMove: "Ask for one concrete reset instead of reopening the whole pattern.",
      whatThisIsBasedOn: [
        "The sequence moved from a missed event into silence.",
        "The follow-up happened before repair had started.",
      ],
    },
    evaluation: {
      clarity: 0.88,
      groundedness: 0.86,
      relationalAccuracy: 0.8,
      uncertaintyHandling: 0.84,
      actionability: 0.82,
      safety: 0.93,
    },
    followUpActions: [
      { type: "show_evidence", label: "Show me what this is based on" },
      { type: "rephrase", label: "Help me say it another way" },
      { type: "practice_conversation", label: "Practice the conversation" },
    ],
  },
  metadata: {
    toolName: "get_companion_guidance",
    session: {
      sessionId: "session_123",
      threadId: "thread_123",
      insightId: "insight_123",
      continuationId: "thread_123:1",
    },
    auth: {
      state: "linked_entitled",
      userId: "user_123",
      plan: "core",
      entitlementStatus: "active",
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
      { id: "continue", label: "Continue in Companion", kind: "continue", target: { path: "/companion", label: "Open Companion", intent: "continue", mode: "website-redirect" } },
    ],
  },
};

export const relationshipInsightInputExample: RelationshipInsightInput = {
  userId: "user_123",
  request: "We keep revisiting the same argument about effort. Every time I bring it up, they say I only notice what went wrong.",
};

export const relationshipInsightOutputExample: RelationshipInsightOutput = {
  insight: {
    insight: {
      what_may_be_happening: "This may be a criticism-defensiveness loop where effort is being measured through different lenses.",
      what_it_may_be_causing: "The conversation may be shifting into self-protection before either person feels understood.",
      what_to_try_next: [
        "Lead with one observable moment before naming the larger pattern.",
        "Make one narrow repair request.",
        "Acknowledge any effort that is already visible.",
      ],
      tone: "soft",
    },
    structured_synthesis: {
      user_experience: "You may be trying to get recognition for the effort behind your concern.",
      other_experience: "They may be hearing accusation before they hear the request for repair.",
      dynamic_between: "The conversation may be moving from disappointment into mutual self-protection too quickly.",
      timing_assessment: "A narrower first step is likely to land better than a whole-pattern summary.",
      help_needed: "insight + phrasing",
      confidence_level: "medium",
    },
    proof: {
      evidence_used: [
        "The request contains direct effort and blame language.",
        "The pattern is grounded in the immediate wording, not a fixed label.",
      ],
      pattern_candidates: [
        { name: "criticism-defensiveness", confidence: "medium" },
        { name: "repair pressure", confidence: "low" },
      ],
      timing_notes: [
        "A concrete first example is likely to land better than reopening the whole conflict.",
      ],
      uncertainty_notes: [
        "This interpretation is directional, not definitive.",
        "Direct clarification matters more than any one frame.",
      ],
      confidence_reason: "The request includes specific relational cues that support a grounded directional interpretation.",
    },
  },
  metadata: {
    toolName: "generate_relationship_insight",
    session: {
      sessionId: "session_456",
      insightId: "insight_456",
      continuationId: "insight_456:v1",
    },
    auth: {
      state: "linked_entitled",
      userId: "user_123",
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
      { id: "open-insights", label: "Open Insights", kind: "open_website", target: { path: "/account/insights", label: "Open Insights", intent: "review", mode: "website-redirect" } },
    ],
  },
};

export const worldSignalInputExample: WorldSignalInput = {
  userId: "user_123",
  scene: {
    nodes: [
      { id: "self", label: "Me", type: "self_part", x: 0.2, y: 0.6, charge: 0.82 },
      { id: "other", label: "Them", type: "person", x: 0.8, y: 0.5, charge: 0.67 },
    ],
    edges: [{ id: "edge_1", from: "self", to: "other", type: "tension", intensity: 0.74 }],
    events: ["A tense text exchange followed by silence."],
  },
};

export const worldSignalOutputExample: WorldSignalOutput = {
  interpretation: {
    dominantPattern: "pursue withdraw cycle",
    highestChargeNodeId: "self",
    highestChargeNodeLabel: "Me",
    pressureLevel: "medium",
    repairWindow: "narrow",
    strongestEdge: { id: "edge_1", from: "self", to: "other", type: "pressure", intensity: 0.74 },
    nodeReadings: [{ id: "self", label: "Me", type: "self_part", charge: 0.82, note: "Holding the most activation in the field right now." }],
    nextMoves: ["Reduce pressure before trying to explain motives."],
    stabilizationHint: "Lower pressure first, then revisit one concrete event with a slower pace.",
    timingSummary: "Pressure is medium; repair window is narrow.",
  },
  metadata: {
    toolName: "interpret_world_signal",
    session: {
      sessionId: "session_world_1",
      worldStateId: "world_123",
      continuationId: "world_123:v1",
    },
    auth: {
      state: "linked_entitled",
      userId: "user_123",
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
      { id: "open-world", label: "Open World", kind: "open_website", target: { path: "/world", label: "Open World", intent: "continue", mode: "website-redirect" } },
    ],
  },
};

export const accountEntitlementsOutputExample: AccountEntitlementsOutput = {
  userId: "user_123",
  plan: "core",
  status: "active",
  entitlements: {
    plan: "core",
    canUseCompanion: true,
    canUseCompanionPremiumView: true,
    canUseStudio: false,
    canUseRealtime: false,
    monthlySituationLimit: 100,
  },
  metadata: {
    toolName: "get_account_entitlements",
    auth: {
      state: "linked_entitled",
      userId: "user_123",
      plan: "core",
      entitlementStatus: "active",
    },
    display: {
      defaultMode: "inline-card",
      capability: "inline-only",
      inlineCardSufficient: true,
      fullscreenJustifiedLater: false,
      maxInlineCtas: 1,
      inlineFields: ["plan", "status", "entitlements"],
      omitFromInline: ["full billing history"],
    },
    linkBack: {
      path: "/account/billing",
      label: "Manage billing",
      intent: "manage",
      mode: "website-redirect",
    },
    ctas: [
      { id: "manage-billing", label: "Manage billing", kind: "manage_billing", target: { path: "/account/billing", label: "Manage billing", intent: "manage", mode: "website-redirect" } },
    ],
  },
};

export const checkoutHandoffOutputExample: CheckoutHandoffOutput = {
  checkoutUrl: "https://defrag.app/account/billing?checkout=redirect",
  sessionId: "cs_test_123",
  metadata: {
    toolName: "begin_upgrade_checkout",
    auth: {
      state: "upgrade_required",
      userId: "user_123",
      plan: "free",
      entitlementStatus: "none",
      redirectTarget: {
        path: "/account/billing",
        label: "Upgrade on defrag.app",
        intent: "upgrade",
        mode: "website-redirect",
      },
    },
    display: {
      defaultMode: "redirect-only",
      capability: "redirect-only",
      inlineCardSufficient: false,
      fullscreenJustifiedLater: false,
      maxInlineCtas: 1,
      inlineFields: ["plan"],
      omitFromInline: ["checkout internals", "billing management UI"],
    },
    linkBack: {
      path: "/account/billing",
      label: "Upgrade on defrag.app",
      intent: "upgrade",
      mode: "website-redirect",
    },
    ctas: [
      { id: "upgrade", label: "Upgrade on defrag.app", kind: "upgrade", target: { path: "/account/billing", label: "Upgrade on defrag.app", intent: "upgrade", mode: "website-redirect" } },
    ],
  },
};

export const billingPortalHandoffOutputExample: BillingPortalHandoffOutput = {
  portalUrl: "https://billing.stripe.com/session/test",
  metadata: {
    toolName: "open_billing_portal",
    auth: {
      state: "linked_entitled",
      userId: "user_123",
      plan: "core",
      entitlementStatus: "active",
      redirectTarget: {
        path: "/account/billing",
        label: "Open billing on defrag.app",
        intent: "manage",
        mode: "website-redirect",
      },
    },
    display: {
      defaultMode: "redirect-only",
      capability: "redirect-only",
      inlineCardSufficient: false,
      fullscreenJustifiedLater: false,
      maxInlineCtas: 1,
      inlineFields: ["status"],
      omitFromInline: ["portal internals"],
    },
    linkBack: {
      path: "/account/billing",
      label: "Open billing on defrag.app",
      intent: "manage",
      mode: "website-redirect",
    },
    ctas: [
      { id: "open-billing", label: "Open billing on defrag.app", kind: "manage_billing", target: { path: "/account/billing", label: "Open billing on defrag.app", intent: "manage", mode: "website-redirect" } },
    ],
  },
};
