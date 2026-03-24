import type { InsightApiResponse, SimulationApiResponse } from "../types/contracts";

export async function fetchInsight(_payload: unknown): Promise<InsightApiResponse> {
  return {
    insight: {
      what_may_be_happening: "This may be a moment where both people are reacting to tension before naming what they need.",
      what_it_may_be_causing: "The exchange may feel sharper or more distant than either person intends.",
      what_to_try_next: [
        "Name the moment simply before trying to solve it.",
        "Lead with one concrete observation instead of a larger judgment.",
        "Ask for a small reset instead of pushing for full resolution immediately.",
      ],
    },
    structured_synthesis: {
      other_experience: "The other person may be hearing pressure first and meaning second, even if your intention is care.",
    },
  };
}

export async function fetchSimulation(_payload: unknown): Promise<SimulationApiResponse> {
  return {
    branches: [
      "A softer opening may lower defensiveness and make the next exchange more honest.",
      "If the conversation starts too forcefully, the other person may retreat into explanation instead of connection.",
      "Keeping the first ask narrow may make agreement easier.",
    ],
  };
}
