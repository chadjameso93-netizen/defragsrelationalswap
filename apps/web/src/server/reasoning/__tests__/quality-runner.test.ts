import { describe, expect, it } from "vitest";
import { runCompanionQualityEvaluation } from "../evaluation/quality-runner";

describe("companion quality evaluation", () => {
  it("scores all fixtures and enforces quality checks", async () => {
    const results = await runCompanionQualityEvaluation();

    expect(results.length).toBeGreaterThan(3);
    for (const result of results) {
      expect(result.scores.safety).toBeGreaterThanOrEqual(0.5);
      expect(result.scores.groundedness).toBeGreaterThanOrEqual(0.5);
    }
  });
});
