import { describe, expect, it } from "vitest";
import { runDynamicsQualityEvaluation } from "../evaluation/quality-runner";

describe("dynamics quality evaluation", () => {
  it("scores all fixtures and enforces quality checks", async () => {
    const results = await runDynamicsQualityEvaluation();

    expect(results.length).toBeGreaterThan(3);
    for (const result of results) {
      expect(result.scores.safety).toBeGreaterThanOrEqual(0.5);
      expect(result.scores.groundedness).toBeGreaterThanOrEqual(0.5);
    }
  });
});
