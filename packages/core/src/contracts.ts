export interface CompanionOutputContract {
  whatHappened: string;
  yourSide: string;
  theirSide: string;
  whatChanged: string;
  nextMove: string;
  whatThisIsBasedOn: string[];
}

export interface CompanionTimingSignals {
  pressureLevel: "low" | "medium" | "high";
  conversationFavorability: "low" | "medium" | "high";
  repairWindow: "closed" | "narrow" | "open";
  delayRecommended: boolean;
}

export interface CompanionEvaluationRubric {
  clarity: number;
  groundedness: number;
  relationalAccuracy: number;
  uncertaintyHandling: number;
  actionability: number;
  safety: number;
}

export interface CompanionStructuredSynthesis {
  userSideHypothesis: string;
  otherSideHypothesis: string;
  betweenDynamic: string;
  timingSignal: string;
  helpNeeded: string;
  confidence: number;
  detectedPatterns: string[];
  timing: CompanionTimingSignals;
}

export interface CompanionIntakeInput {
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

export interface CompanionReasoningResult {
  synthesis: CompanionStructuredSynthesis;
  output: CompanionOutputContract;
  evaluation: CompanionEvaluationRubric;
  followUpActions: Array<{
    type: "show_evidence" | "rephrase" | "practice_conversation";
    label: string;
    payload?: Record<string, unknown>;
  }>;
}
