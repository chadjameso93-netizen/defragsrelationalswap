import type { WorldScene } from "../../../../../packages/core/src";
import { buildEventObservations } from "./event-model";
import { computeRelationalFeatureSignals } from "./feature-signals";
import { detectRelationalPatterns } from "./pattern-detection";
import { computeTimingSignals } from "./timing-layer";

export interface WorldInterpretation {
  dominantPattern: string;
  highestChargeNodeId: string | null;
  stabilizationHint: string;
  timingSummary: string;
}

export function interpretWorldScene(scene: WorldScene): WorldInterpretation {
  const observations = buildEventObservations(scene.events);
  const features = computeRelationalFeatureSignals(observations);
  const patterns = detectRelationalPatterns(features);
  const timing = computeTimingSignals(features);

  const highestChargeNode = [...scene.nodes].sort((a, b) => b.charge - a.charge)[0];
  const dominantPattern = patterns[0]?.replaceAll("_", " ") ?? "no strong recurring pattern detected yet";

  const stabilizationHint = timing.delayRecommended
    ? "Lower pressure first, then revisit one concrete event with a slower pace."
    : "Use one clear request and keep the conversation focused on one moment at a time.";

  return {
    dominantPattern,
    highestChargeNodeId: highestChargeNode?.id ?? null,
    stabilizationHint,
    timingSummary: `Pressure is ${timing.pressureLevel}; repair window is ${timing.repairWindow}.`,
  };
}
