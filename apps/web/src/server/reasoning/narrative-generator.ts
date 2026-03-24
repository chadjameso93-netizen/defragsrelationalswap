import type {
  CompanionEvaluationRubric,
  CompanionOutputContract,
  CompanionStructuredSynthesis,
} from "../../../../../packages/core/src";

interface NarrativeInput {
  synthesis: CompanionStructuredSynthesis;
  evidence: string[];
  correctionDetected: boolean;
}

export async function generateNarrative(input: NarrativeInput): Promise<CompanionOutputContract> {
  const { synthesis, evidence, correctionDetected } = input;

  // Model boundary placeholder: can be upgraded to provider-backed generation when credentials/tooling are available.
  if (process.env.DEFRAG_ENABLE_MODEL_GENERATION === "true") {
    return {
      whatHappened: `It may be that this moment carried more pressure than expected, especially around ${synthesis.timingSignal.toLowerCase()}.`,
      yourSide: synthesis.userSideHypothesis,
      theirSide: synthesis.otherSideHypothesis,
      whatChanged: synthesis.betweenDynamic,
      nextMove: synthesis.helpNeeded,
      whatThisIsBasedOn: evidence,
    };
  }

  const correctionLead = correctionDetected
    ? "Thank you for the correction. I’ve adjusted this view to better fit what you clarified. "
    : "";

  return {
    whatHappened: `${correctionLead}This moment may have felt heavier than it looked on the surface.`,
    yourSide: synthesis.userSideHypothesis,
    theirSide: synthesis.otherSideHypothesis,
    whatChanged: synthesis.betweenDynamic,
    nextMove: synthesis.helpNeeded,
    whatThisIsBasedOn: evidence,
  };
}

export function evaluateNarrativeQuality(output: CompanionOutputContract): CompanionEvaluationRubric {
  const text = `${output.whatHappened} ${output.yourSide} ${output.theirSide} ${output.whatChanged} ${output.nextMove}`.toLowerCase();
  const hasUncertainty = /may|might|seems|could/.test(text);
  const hasDirectiveOverreach = /must|always|never/.test(text);

  return {
    clarity: 0.8,
    groundedness: output.whatThisIsBasedOn.length >= 3 ? 0.84 : 0.66,
    relationalAccuracy: 0.74,
    uncertaintyHandling: hasUncertainty ? 0.88 : 0.55,
    actionability: output.nextMove.length > 20 ? 0.82 : 0.6,
    safety: hasDirectiveOverreach ? 0.52 : 0.9,
  };
}
