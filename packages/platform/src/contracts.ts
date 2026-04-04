import type {
  BillingPlan,
  DynamicsEvaluationRubric,
  DynamicsOutputContract,
  DynamicsReasoningResult,
  DynamicsStructuredSynthesis,
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

export type FutureToolName =
  | "get_dynamics_guidance"
  | "generate_relationship_insight"
  | "interpret_world_signal"
  | "get_account_entitlements"
  | "begin_upgrade_checkout"
  | "open_billing_portal";

export type ToolDisplayMode = "inline-card" | "inline-carousel" | "fullscreen" | "redirect-only";
export type ToolDisplayCapability = "inline-only" | "inline-plus-fullscreen" | "redirect-only";
export type ToolExposure = "user-facing" | "helper-only" | "website-only";
export type ToolAuthPolicy = "required" | "optional";
export type ToolAuthStateKind =
  | "unauthenticated"
  | "linked_unentitled"
  | "linked_entitled"
  | "upgrade_required"
  | "relink_required";

export interface ToolLinkBackTarget {
  path: string;
  label: string;
  intent: "continue" | "manage" | "upgrade" | "review";
  mode: "website-redirect";
}

export interface ToolCallToAction {
  id: string;
  label: string;
  kind: "continue" | "open_fullscreen" | "upgrade" | "manage_billing" | "open_website";
  target?: ToolLinkBackTarget;
}

export interface ToolSessionReference {
  sessionId?: string;
  threadId?: string;
  insightId?: string;
  continuationId?: string;
  worldStateId?: string;
}

export interface ToolAuthBoundaryState {
  state: ToolAuthStateKind;
  userId?: string;
  plan?: BillingPlan;
  entitlementStatus?: string;
  redirectTarget?: ToolLinkBackTarget;
  reason?: string;
}

export interface ToolDisplaySpec {
  defaultMode: ToolDisplayMode;
  capability: ToolDisplayCapability;
  inlineCardSufficient: boolean;
  fullscreenJustifiedLater: boolean;
  maxInlineCtas: number;
  inlineFields: string[];
  omitFromInline: string[];
}

export interface ToolResultMetadata {
  toolName: FutureToolName;
  session?: ToolSessionReference;
  auth: ToolAuthBoundaryState;
  display: ToolDisplaySpec;
  linkBack: ToolLinkBackTarget | null;
  ctas: ToolCallToAction[];
}

export interface ToolEntitlementPolicy {
  requiredPlan: BillingPlan | null;
  requiresActiveSubscription: boolean;
}

export interface ToolRegistryEntry<Input = unknown, Output = unknown> {
  name: FutureToolName;
  title: string;
  description: string;
  authPolicy: ToolAuthPolicy;
  entitlementPolicy: ToolEntitlementPolicy;
  exposure: ToolExposure;
  userFacing: boolean;
  helperOnly: boolean;
  websiteOnlyForNow: boolean;
  redirectToWebsite: boolean;
  display: ToolDisplaySpec;
  inputSchema: Record<string, unknown>;
  outputSchema: Record<string, unknown>;
  inputExample: Input;
  outputExample: Output;
}

export type DynamicsActionType = "show_evidence" | "rephrase" | "practice_conversation";

export interface DynamicsActionResult {
  title: string;
  lines: string[];
  confidence: number;
}

export interface DynamicsActionResolution {
  action: {
    type: DynamicsActionType;
    label: string;
    payload?: Record<string, unknown>;
  };
  result: DynamicsActionResult;
}

export interface DynamicsGuidanceInput {
  userId: string;
  threadId?: string;
  threadTitle?: string;
  situation: string;
  recentEvents?: string[];
  corrections?: string[];
}

export interface DynamicsGuidanceOutput {
  threadId: string;
  insightId: string;
  reasoning: DynamicsReasoningResult;
  metadata: ToolResultMetadata;
}

export interface RelationshipInsightInput {
  userId: string;
  request: string;
}

export interface RelationshipInsightOutput {
  insight: InsightApiResponse;
  metadata: ToolResultMetadata;
}

export interface RelationshipSimulationOutput {
  simulation: SimulationApiResponse;
  metadata: ToolResultMetadata;
}

export interface WorldSignalInput {
  userId: string;
  scene: WorldScene;
}

export interface WorldSignalOutput {
  interpretation: WorldInterpretation;
  metadata: ToolResultMetadata;
}

export interface AccountEntitlementsOutput {
  userId: string;
  plan: BillingPlan;
  status: string;
  entitlements: Entitlements;
  metadata: ToolResultMetadata;
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
  metadata: ToolResultMetadata;
}

export interface BillingPortalHandoffInput {
  userId: string;
  returnUrl?: string;
}

export interface BillingPortalHandoffOutput {
  portalUrl: string;
  metadata: ToolResultMetadata;
}

export interface DynamicsInsightListItem {
  id: string;
  contract: DynamicsOutputContract;
  createdAt: string;
  synthesis?: DynamicsStructuredSynthesis | null;
  evaluation?: DynamicsEvaluationRubric | null;
}
