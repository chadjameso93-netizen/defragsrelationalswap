export interface InsightApiResponse {
  insight: {
    what_may_be_happening: string;
    what_it_may_be_causing: string;
    what_to_try_next: string[];
  };
  structured_synthesis?: {
    other_experience?: string;
  };
}

export interface SimulationApiResponse {
  branches: string[];
}
