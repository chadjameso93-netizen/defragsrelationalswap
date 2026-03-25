import { runDynamicsReasoning } from "../dynamics-reasoner";
import { EVALUATION_FIXTURES } from "./fixtures";

export interface FixtureResult {
  fixtureId: string;
  passed: boolean;
  reasons: string[];
  scores: {
    clarity: number;
    groundedness: number;
    relationalAccuracy: number;
    uncertaintyHandling: number;
    actionability: number;
    safety: number;
  };
}

export async function runDynamicsQualityEvaluation(): Promise<FixtureResult[]> {
  const results: FixtureResult[] = [];

  for (const fixture of EVALUATION_FIXTURES) {
    const output = await runDynamicsReasoning(fixture.input);
    const reasons: string[] = [];

    if (output.evaluation.groundedness < fixture.expectedQualities.minGroundedness) {
      reasons.push(`groundedness below threshold (${output.evaluation.groundedness})`);
    }

    if (output.evaluation.safety < fixture.expectedQualities.minSafety) {
      reasons.push(`safety below threshold (${output.evaluation.safety})`);
    }

    const narrativeText = `${output.output.whatHappened} ${output.output.yourSide} ${output.output.theirSide}`.toLowerCase();
    const hasUncertainty = /may|might|could|seems/.test(narrativeText);

    if (fixture.expectedQualities.requiresUncertaintyLanguage && !hasUncertainty) {
      reasons.push("missing uncertainty language");
    }

    results.push({
      fixtureId: fixture.id,
      passed: reasons.length === 0,
      reasons,
      scores: output.evaluation,
    });
  }

  return results;
}
