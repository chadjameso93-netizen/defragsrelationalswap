import type { WorldScene } from "../../../../../packages/core/src";
import { buildEventObservations } from "./event-model";
import { computeRelationalFeatureSignals } from "./feature-signals";
import { detectRelationalPatterns } from "./pattern-detection";
import { computeTimingSignals } from "./timing-layer";

export interface WorldInterpretation {
  dominantPattern: string;
  highestChargeNodeId: string | null;
  highestChargeNodeLabel: string | null;
  pressureLevel: "low" | "medium" | "high";
  repairWindow: "closed" | "narrow" | "open";
  strongestEdge: {
    id: string;
    from: string;
    to: string;
    type: string;
    intensity: number;
  } | null;
  nodeReadings: Array<{
    id: string;
    label: string;
    type: WorldScene["nodes"][number]["type"];
    charge: number;
    note: string;
  }>;
  nextMoves: string[];
  stabilizationHint: string;
  timingSummary: string;
}

export function interpretWorldScene(scene: WorldScene): WorldInterpretation {
  const observations = buildEventObservations(scene.events);
  const features = computeRelationalFeatureSignals(observations);
  const patterns = detectRelationalPatterns(features);
  const timing = computeTimingSignals(features);

  const highestChargeNode = [...scene.nodes].sort((a, b) => b.charge - a.charge)[0];
  const strongestEdge = [...scene.edges].sort((a, b) => b.intensity - a.intensity)[0];
  const dominantPattern = patterns[0]?.replaceAll("_", " ") ?? "no strong recurring pattern detected yet";

  const stabilizationHint = timing.delayRecommended
    ? "Lower pressure first, then revisit one concrete event with a slower pace."
    : "Use one clear request and keep the conversation focused on one moment at a time.";

  const nodeReadings = scene.nodes
    .slice()
    .sort((a, b) => b.charge - a.charge)
    .map((node) => ({
      id: node.id,
      label: node.label,
      type: node.type,
      charge: node.charge,
      note:
        node.charge > 0.75
          ? "Holding the most activation in the field right now."
          : node.charge > 0.55
            ? "Carrying noticeable tension or attention."
            : "Present, but not dominating the field.",
    }));

  const nextMoves = timing.delayRecommended
    ? [
        "Reduce pressure before trying to explain motives.",
        "Name one concrete event instead of summarizing the whole relationship.",
        "Wait for a steadier repair window before making a larger ask.",
      ]
    : [
        "Keep the next conversation focused on one moment only.",
        "Lead with one clean request rather than multiple interpretations.",
        "Use the strongest edge in the field as the first place to lower tension.",
      ];

  return {
    dominantPattern,
    highestChargeNodeId: highestChargeNode?.id ?? null,
    highestChargeNodeLabel: highestChargeNode?.label ?? null,
    pressureLevel: timing.pressureLevel,
    repairWindow: timing.repairWindow,
    strongestEdge: strongestEdge
      ? {
          id: strongestEdge.id,
          from: strongestEdge.from,
          to: strongestEdge.to,
          type: strongestEdge.type,
          intensity: strongestEdge.intensity,
        }
      : null,
    nodeReadings,
    nextMoves,
    stabilizationHint,
    timingSummary: `Pressure is ${timing.pressureLevel}; repair window is ${timing.repairWindow}.`,
  };
}
