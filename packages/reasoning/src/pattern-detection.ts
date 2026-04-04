import type { RelationalFeatureSignals } from "./feature-signals";

export function detectRelationalPatterns(features: RelationalFeatureSignals): string[] {
  const patterns: string[] = [];

  if (features.silenceScore >= 0.34) {
    patterns.push("pursue_withdraw_cycle");
  }

  if (features.blameScore >= 0.25) {
    patterns.push("criticism_defensiveness_loop");
  }

  if (features.timingScore >= 0.25) {
    patterns.push("timing_mismatch");
  }

  if (features.repairScore >= 0.25 && features.blameScore >= 0.25) {
    patterns.push("repair_pressure");
  }

  if (patterns.length === 0) {
    patterns.push("shared_pressure");
  }

  return patterns;
}
