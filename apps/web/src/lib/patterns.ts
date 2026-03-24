import type { InsightEntry } from "./insights";

export interface PatternSummary {
  summary: string;
}

export function derivePatternSummary(insights: InsightEntry[]): PatternSummary | null {
  if (insights.length === 0) {
    return null;
  }

  const latest = insights[0]?.response?.insight;
  if (!latest) {
    return null;
  }

  return {
    summary: `${latest.what_may_be_happening} This may be contributing to ${latest.what_it_may_be_causing.toLowerCase()}.`,
  };
}
