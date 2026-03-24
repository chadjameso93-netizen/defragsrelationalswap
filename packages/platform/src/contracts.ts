import type {
  BillingPlan,
  CompanionReasoningResult,
  Entitlements,
  WorldScene,
} from "../../core/src";

export interface InsightApiResponse {
  insight: {
    what_may_be_happening: string;
    what_it_may_be_causing: string;
    what_to_try_next: string[];
    tone?: "calm" | "neutral" | "soft" | "direct";
  };
  structured_synthesis?: {
    user_experience?: string;
    other_experience?: string;
    dynamic_between?: string;
    timing_assessment?: string;
    help_needed?: string;
    confidence_level?: "low" | "medium" | "high";
  };
  proof?: {
    evidence_used?: string[];
    pattern_candidates?: Array<{
      name: string;
      confidence: "low" | "medium" | "high";
    }>;
    timing_notes?: string[];
    uncertainty_notes?: string[];
    confidence_reason?: string;
  };
}

export interface SimulationApiResponse {
  branches: string[];
}

export interface WorldInterpretation {
  dominantPattern: string;
  highestChargeNodeId: string | null;
  highestChargeNodeLabel: string | null;
  pressureLevel: "low" | "medium" | "high";
  repairWindow: "closed" | "narrow" | "open";
  strongestEdge: {
    id: string;
    from: string;
    to: string;
    type: string;
    intensity: number;
  } | null;
  nodeReadings: Array<{
    id: string;
    label: string;
    type: WorldScene["nodes"][number]["type"];
    charge: number;
    note: string;
  }>;
  nextMoves: string[];
  stabilizationHint: string;
  timingSummary: string;
}

export type ToolDisplayMode = "inline-card" | "inline-carousel" | "fullscreen" | "website-redirect-only";

export interface ToolPresentation {
  primaryMode: ToolDisplayMode;
  supportsFullscreen: boolean;
  websiteBacklink: string | null;
}

export interface ToolCatalogEntry {
  name: string;
  purpose: string;
  authRequired: boolean;
  entitlementRequired: BillingPlan | null;
  structuredContent: boolean;
  presentation: ToolPresentation;
  websiteOnly: boolean;
}

export interface CompanionGuidanceInput {
  userId: string;
  threadId?: string;
  threadTitle?: string;
  situation: string;
  recentEvents?: string[];
  corrections?: string[];
}

export interface CompanionGuidanceOutput {
  threadId: string;
  insightId: string;
  reasoning: CompanionReasoningResult;
}

export interface RelationshipInsightInput {
  userId: string;
  request: string;
}

export interface RelationshipInsightOutput {
  insight: InsightApiResponse;
}

export interface RelationshipSimulationOutput {
  simulation: SimulationApiResponse;
}

export interface WorldSignalInput {
  userId: string;
  scene: WorldScene;
}

export interface WorldSignalOutput {
  interpretation: WorldInterpretation;
}

export interface AccountEntitlementsOutput {
  userId: string;
  plan: BillingPlan;
  status: string;
  entitlements: Entitlements;
}

export interface CheckoutHandoffInput {
  userId: string;
  email: string;
  plan: BillingPlan;
  successUrl?: string;
  cancelUrl?: string;
}

export interface CheckoutHandoffOutput {
  checkoutUrl: string;
  sessionId: string;
}

export interface BillingPortalHandoffInput {
  userId: string;
  returnUrl?: string;
}

export interface BillingPortalHandoffOutput {
  portalUrl: string;
}
