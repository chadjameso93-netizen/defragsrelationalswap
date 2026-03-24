import type { CompanionTimingSignals } from "../../../../../packages/core/src";
import type { RelationalFeatureSignals } from "./feature-signals";

export function computeTimingSignals(features: RelationalFeatureSignals): CompanionTimingSignals {
  const pressureScore = features.conversationDelayPressure + features.conflictFrequency;

  const pressureLevel: CompanionTimingSignals["pressureLevel"] =
    pressureScore > 0.9 ? "high" : pressureScore > 0.45 ? "medium" : "low";

  const conversationFavorability: CompanionTimingSignals["conversationFavorability"] =
    pressureLevel === "high" ? "low" : pressureLevel === "medium" ? "medium" : "high";

  const repairWindow: CompanionTimingSignals["repairWindow"] =
    pressureLevel === "high" ? "closed" : pressureLevel === "medium" ? "narrow" : "open";

  return {
    pressureLevel,
    conversationFavorability,
    repairWindow,
    delayRecommended: pressureLevel === "high",
  };
}
