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
