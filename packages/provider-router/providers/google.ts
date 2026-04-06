import type { ProviderDefinition } from "../types/provider";

export const googleProvider: ProviderDefinition = {
  id: "google",
  capabilities: ["reasoning", "video"],
  priority: 50,
};
