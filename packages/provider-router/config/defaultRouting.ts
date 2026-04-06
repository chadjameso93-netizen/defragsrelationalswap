import type { Capability, ProviderId } from "../types/provider";

export const DEFAULT_ROUTING: Record<Capability, ProviderId[]> = {
  reasoning: ["openai", "google"],
  image: ["openai"],
  video: ["google"],
  narration: ["openai"],
};
