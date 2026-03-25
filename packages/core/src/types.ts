export type EntityId = string;

export interface User {
  id: EntityId;
  email: string;
  displayName?: string;
  createdAt: string;
}

export interface Relationship {
  id: EntityId;
  userId: EntityId;
  label: string;
  participants: string[];
  createdAt: string;
}

export interface TimingWindow {
  phase: "cooldown" | "stabilizing" | "repair" | "active";
  confidence: number;
  notes: string;
}

export interface Situation {
  id: EntityId;
  relationshipId: EntityId;
  title: string;
  summary: string;
  timingWindow: TimingWindow;
  createdAt: string;
}

export interface Event {
  id: EntityId;
  situationId: EntityId;
  happenedAt: string;
  description: string;
  actor: "self" | "other" | "group";
  intensity: number;
}

export interface Insight {
  id: EntityId;
  situationId: EntityId;
  summary: string;
  confidence: number;
  evidenceEventIds: EntityId[];
  createdAt: string;
}

export interface SimulationRun {
  id: EntityId;
  situationId: EntityId;
  createdAt: string;
  status: "queued" | "running" | "complete" | "failed";
  notes?: string;
}

export interface OrbScene {
  id: EntityId;
  simulationRunId: EntityId;
  headline: string;
  signalStrength: number;
  generatedAt: string;
}

export type BillingPlan =
  | "free"
  | "core"
  | "studio"
  | "realtime"
  | "professional"
  | "team"
  | "api"
  | "enterprise";

export type SubscriptionState =
  | "none"
  | "trialing"
  | "active"
  | "past_due"
  | "canceled"
  | "incomplete";

export interface Entitlements {
  plan: BillingPlan;
  canUseDynamics: boolean;
  canUseDynamicsPremiumView: boolean;
  canUseStudio: boolean;
  canUseRealtime: boolean;
  monthlySituationLimit: number;
}

export interface BillingAccount {
  userId: EntityId;
  customerId: string | null;
  subscriptionId: string | null;
  subscriptionState: SubscriptionState;
  plan: BillingPlan;
  currentPeriodEnd: string | null;
  updatedAt: string;
}


export interface DynamicsThread {
  id: EntityId;
  userId: EntityId;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export type DynamicsFollowUpActionType = "show_evidence" | "rephrase" | "practice_conversation";

export interface DynamicsFollowUpAction {
  id: EntityId;
  insightId: EntityId;
  type: DynamicsFollowUpActionType;
  label: string;
  payload?: Record<string, unknown>;
  createdAt: string;
}

export interface DynamicsInsight {
  id: EntityId;
  userId: EntityId;
  threadId: EntityId;
  output: {
    whatHappened: string;
    yourSide: string;
    theirSide: string;
    whatChanged: string;
    nextMove: string;
    whatThisIsBasedOn: string[];
  };
  createdAt: string;
}
