import { describe, expect, it } from "vitest";
import { buildEventObservations } from "../event-model";
import { computeRelationalFeatureSignals } from "../feature-signals";
import { detectRelationalPatterns } from "../pattern-detection";
import { computeTimingSignals } from "../timing-layer";
import { runCompanionReasoning } from "../companion-reasoner";

describe("reasoning layers", () => {
  it("computes features and detects baseline patterns", () => {
    const events = buildEventObservations([
      "We argued and then they shut down.",
      "I tried to repair but they pulled away.",
    ]);

    const features = computeRelationalFeatureSignals(events);
    const patterns = detectRelationalPatterns(features);
    const timing = computeTimingSignals(features);

    expect(features.blameScore + features.silenceScore + features.repairScore).toBeGreaterThan(0);
    expect(patterns.length).toBeGreaterThan(0);
    expect(["low", "medium", "high"]).toContain(timing.pressureLevel);
  });

  it("lowers confidence when correction signals appear", async () => {
    const baseline = await runCompanionReasoning({
      userId: "u1",
      situationText: "We had a hard conversation yesterday.",
      recentEvents: ["We had a hard conversation yesterday."],
    });

    const corrected = await runCompanionReasoning({
      userId: "u1",
      situationText: "That is not accurate, this is not what happened.",
      recentEvents: ["That is not accurate, this is not what happened."],
    });

    expect(corrected.synthesis.confidence).toBeLessThanOrEqual(baseline.synthesis.confidence);
  });
});
