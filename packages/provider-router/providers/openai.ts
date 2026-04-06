import type { ProviderDefinition } from "../types/provider";

export const openaiProvider: ProviderDefinition = {
  id: "openai",
  capabilities: ["reasoning", "image", "narration"],
  priority: 100,
};
