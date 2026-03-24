import type { InsightApiResponse } from "../types/contracts";

export interface InsightEntry {
  id: string;
  response: InsightApiResponse;
}

export async function getRecentInsights(): Promise<InsightEntry[]> {
  return [];
}

export async function saveInsight(_userId?: string, _payload?: unknown, _response?: InsightApiResponse) {
  return;
}
