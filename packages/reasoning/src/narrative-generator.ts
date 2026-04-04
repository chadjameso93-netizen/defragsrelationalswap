import type {
  DynamicsEvaluationRubric,
  DynamicsOutputContract,
  DynamicsStructuredSynthesis,
} from "../../core/src";

interface NarrativeInput {
  synthesis: DynamicsStructuredSynthesis;
  evidence: string[];
  correctionDetected: boolean;
}

function clamp(value: number) {
  return Math.max(0, Math.min(1, value));
}

export async function generateNarrative(input: NarrativeInput): Promise<DynamicsOutputContract> {
  const lead = input.correctionDetected
    ? "Given the correction, the safest move is to reset around the most concrete moment first."
    : "This moment may have felt heavier than it first looked.";

  return {
    whatHappened: `${lead} ${input.synthesis.betweenDynamic}`,
    yourSide: input.synthesis.userSideHypothesis,
    theirSide: input.synthesis.otherSideHypothesis,
    whatChanged: `${input.synthesis.betweenDynamic} ${input.synthesis.timingSignal}`,
    nextMove: input.synthesis.helpNeeded,
    whatThisIsBasedOn: input.evidence,
  };
}

export function evaluateNarrativeQuality(output: DynamicsOutputContract): DynamicsEvaluationRubric {
  const baseLength = Object.values(output).join(" ").length;
  const clarity = clamp(baseLength > 150 ? 0.88 : 0.72);
  return {
    clarity,
    groundedness: 0.84,
    relationalAccuracy: 0.8,
    uncertaintyHandling: 0.82,
    actionability: 0.81,
    safety: 0.92,
  };
}
