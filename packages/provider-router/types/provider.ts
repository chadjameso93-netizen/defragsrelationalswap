export type ProviderId = "openai" | "google";

export type Capability = "reasoning" | "image" | "video" | "narration";

export type ProviderDefinition = {
  id: ProviderId;
  capabilities: Capability[];
  priority: number;
};
