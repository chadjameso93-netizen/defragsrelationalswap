import { DEFAULT_ROUTING } from "../config/defaultRouting";
import { googleProvider } from "../providers/google";
import { openaiProvider } from "../providers/openai";
import type { ProviderDefinition, ProviderId } from "../types/provider";
import type { Task } from "../types/tasks";

const PROVIDERS: Record<ProviderId, ProviderDefinition> = {
  openai: openaiProvider,
  google: googleProvider,
};

export function resolveProvider(task: Task): ProviderDefinition | null {
  const candidateProviderIds = DEFAULT_ROUTING[task.type as keyof typeof DEFAULT_ROUTING];

  if (!candidateProviderIds) {
    return null;
  }

  for (const providerId of candidateProviderIds) {
    const provider = PROVIDERS[providerId];
    if (provider.capabilities.includes(task.type)) {
      return provider;
    }
  }

  return null;
}
