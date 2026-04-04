import type { InsightApiResponse, SimulationApiResponse } from "../types/contracts";

async function postJson<T>(url: string, payload: Record<string, unknown>): Promise<T> {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const body = (await response.json()) as T & { error?: string; detail?: string };

  if (!response.ok) {
    throw new Error(body.detail ?? body.error ?? "Request failed");
  }

  return body;
}

function extractRequest(payload: unknown): string {
  if (typeof payload === "object" && payload && "request" in payload && typeof (payload as { request?: unknown }).request === "string") {
    return (payload as { request: string }).request;
  }

  if (
    typeof payload === "object" &&
    payload &&
    "user_request" in payload &&
    typeof (payload as { user_request?: unknown }).user_request === "string"
  ) {
    return (payload as { user_request: string }).user_request;
  }

  if (
    typeof payload === "object" &&
    payload &&
    "recent_events" in payload &&
    Array.isArray((payload as { recent_events?: unknown }).recent_events)
  ) {
    const first = (payload as { recent_events: Array<{ description?: string }> }).recent_events[0];
    return first?.description ?? "";
  }

  return "";
}

export async function fetchInsight(payload: unknown): Promise<InsightApiResponse> {
  return postJson<InsightApiResponse>("/api/insights", {
    request: extractRequest(payload),
  });
}

export async function fetchSimulation(payload: unknown): Promise<SimulationApiResponse> {
  return postJson<SimulationApiResponse>("/api/insights/simulate", {
    request: extractRequest(payload),
  });
}
