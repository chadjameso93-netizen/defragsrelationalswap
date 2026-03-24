import type { InsightEntry } from "./insights";

export interface PatternSummary {
  summary: string;
}

export function derivePatternSummary(_insights: InsightEntry[]): PatternSummary | null {
  return null;
}
