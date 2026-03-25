import type { DynamicsTimingSignals } from "../../core/src";
import type { RelationalFeatureSignals } from "./feature-signals";

export function computeTimingSignals(features: RelationalFeatureSignals): DynamicsTimingSignals {
  const pressureScore = Math.max(features.blameScore, features.silenceScore * 0.8);
  const pressureLevel = pressureScore > 0.66 ? "high" : pressureScore > 0.33 ? "medium" : "low";
  const repairWindow = pressureLevel === "high" ? "closed" : pressureLevel === "medium" ? "narrow" : "open";
  const conversationFavorability =
    features.repairScore > 0.5 ? "high" : features.repairScore > 0.2 ? "medium" : "low";

  return {
    pressureLevel,
    conversationFavorability,
    repairWindow,
    delayRecommended: pressureLevel === "high" || (pressureLevel === "medium" && features.timingScore > 0.2),
  };
}
