import type { InsightApiResponse } from "../types/contracts";

export interface InsightEntry {
  id: string;
  createdAt: string;
  prompt?: string;
  response: InsightApiResponse;
}

const storageKey = (userId: string) => `defrag-insights:${userId}`;

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export async function getRecentInsights(userId: string): Promise<InsightEntry[]> {
  if (!canUseStorage()) {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(storageKey(userId));
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as InsightEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function saveInsight(userId: string, payload: unknown, response: InsightApiResponse) {
  if (!canUseStorage()) {
    return;
  }

  const current = await getRecentInsights(userId);
  const prompt =
    typeof payload === "object" && payload && "user_request" in payload && typeof (payload as { user_request?: unknown }).user_request === "string"
      ? (payload as { user_request: string }).user_request
      : undefined;

  const next: InsightEntry[] = [
    {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      prompt,
      response,
    },
    ...current,
  ].slice(0, 12);

  window.localStorage.setItem(storageKey(userId), JSON.stringify(next));
}
