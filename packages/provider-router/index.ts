export { routeTask } from "./core/router";
export { resolveProvider } from "./core/resolveProvider";
export { resolveFallback } from "./core/resolveFallback";

export { openaiProvider } from "./providers/openai";
export { googleProvider } from "./providers/google";

export { DEFAULT_ROUTING } from "./config/defaultRouting";

export type { Task } from "./types/tasks";
export type { Capability, ProviderDefinition, ProviderId } from "./types/provider";
export type { RouteResult } from "./types/routing";
