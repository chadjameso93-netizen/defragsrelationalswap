import type { RelationalFeatureSignals } from "./feature-signals";

export type DetectedPattern =
  | "pursue_withdraw_cycle"
  | "criticism_defensiveness_loop"
  | "repair_blockage"
  | "boundary_pressure";

export function detectRelationalPatterns(features: RelationalFeatureSignals): DetectedPattern[] {
  const patterns: DetectedPattern[] = [];

  if (features.conflictFrequency > 0.3 && features.withdrawalTendency > 0.3) {
    patterns.push("pursue_withdraw_cycle");
  }

  if (features.conflictFrequency > 0.4) {
    patterns.push("criticism_defensiveness_loop");
  }

  if (features.repairAttemptFrequency < 0.2 && features.conflictFrequency > 0.25) {
    patterns.push("repair_blockage");
  }

  if (features.boundaryPressure > 0.25) {
    patterns.push("boundary_pressure");
  }

  return patterns;
}
