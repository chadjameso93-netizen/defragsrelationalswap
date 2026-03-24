import type { InsightApiResponse } from "../types/contracts";
import { createClient } from "@/utils/supabase/client";

export interface InsightEntry {
  id: string;
  createdAt: string;
  prompt?: string;
  response: InsightApiResponse;
}

interface InsightReadRow {
  id: string;
  prompt: string | null;
  response: InsightApiResponse;
  created_at: string;
}

const storageKey = (userId: string) => `defrag-insights:${userId}`;

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export async function getRecentInsights(userId: string): Promise<InsightEntry[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("insight_reads")
      .select("id,prompt,response,created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(12);

    if (!error && Array.isArray(data)) {
      return (data as InsightReadRow[]).map((entry) => ({
        id: entry.id,
        prompt: entry.prompt ?? undefined,
        response: entry.response,
        createdAt: entry.created_at,
      }));
    }
  } catch {
    // Fall back to local storage until the account-backed table is available everywhere.
  }

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
  const prompt =
    typeof payload === "object" && payload && "user_request" in payload && typeof (payload as { user_request?: unknown }).user_request === "string"
      ? (payload as { user_request: string }).user_request
      : undefined;

  try {
    const supabase = createClient();
    const { error } = await supabase.from("insight_reads").insert(
      {
        user_id: userId,
        prompt,
        response,
      } as never,
    );

    if (!error) {
      return;
    }
  } catch {
    // Fall back to local storage until the account-backed table is available everywhere.
  }

  if (!canUseStorage()) {
    return;
  }

  const current = await getRecentInsights(userId);
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
