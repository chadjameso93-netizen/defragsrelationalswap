export interface DynamicsOutputContract {
  whatHappened: string;
  yourSide: string;
  theirSide: string;
  whatChanged: string;
  nextMove: string;
  whatThisIsBasedOn: string[];
}

export interface DynamicsTimingSignals {
  pressureLevel: "low" | "medium" | "high";
  conversationFavorability: "low" | "medium" | "high";
  repairWindow: "closed" | "narrow" | "open";
  delayRecommended: boolean;
}

export interface DynamicsEvaluationRubric {
  clarity: number;
  groundedness: number;
  relationalAccuracy: number;
  uncertaintyHandling: number;
  actionability: number;
  safety: number;
}

export interface DynamicsStructuredSynthesis {
  userSideHypothesis: string;
  otherSideHypothesis: string;
  betweenDynamic: string;
  timingSignal: string;
  helpNeeded: string;
  confidence: number;
  detectedPatterns: string[];
  timing: DynamicsTimingSignals;
}

export interface DynamicsIntakeInput {
  userId: string;
  threadId?: string;
  situationText: string;
  recentEvents: string[];
  userCorrections?: string[];
  priorInsights?: Array<{
    whatChanged: string;
    nextMove: string;
  }>;
  priorActions?: Array<{
    type: "show_evidence" | "rephrase" | "practice_conversation";
    label: string;
  }>;
}

export interface DynamicsReasoningResult {
  synthesis: DynamicsStructuredSynthesis;
  output: DynamicsOutputContract;
  evaluation: DynamicsEvaluationRubric;
  followUpActions: Array<{
    type: "show_evidence" | "rephrase" | "practice_conversation";
    label: string;
    payload?: Record<string, unknown>;
  }>;
}
