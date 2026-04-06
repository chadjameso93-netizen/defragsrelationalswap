import { resolveFallback } from "./resolveFallback";
import { resolveProvider } from "./resolveProvider";
import type { ProviderId } from "../types/provider";
import type { RouteResult } from "../types/routing";
import type { Task } from "../types/tasks";

export function routeTask(task: Task, unavailableProviderId?: ProviderId): RouteResult {
  const primaryProvider = resolveProvider(task);

  if (!primaryProvider) {
    return {
      status: "no-route",
      reason: "no provider supports task",
    };
  }

  if (!unavailableProviderId || primaryProvider.id !== unavailableProviderId) {
    return {
      status: "ok",
      provider: primaryProvider.id,
      reason: "matched capability",
    };
  }

  const fallbackProvider = resolveFallback(task, unavailableProviderId);

  if (!fallbackProvider) {
    return {
      status: "no-route",
      reason: "no provider supports task",
    };
  }

  return {
    status: "ok",
    provider: fallbackProvider.id,
    reason: "fallback used",
  };
}
