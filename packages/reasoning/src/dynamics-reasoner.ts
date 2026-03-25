import type {
  DynamicsIntakeInput,
  DynamicsReasoningResult,
  DynamicsStructuredSynthesis,
} from "../../core/src";
import { buildEventObservations } from "./event-model";
import { computeRelationalFeatureSignals } from "./feature-signals";
import { generateNarrative, evaluateNarrativeQuality } from "./narrative-generator";
import { detectRelationalPatterns } from "./pattern-detection";
import { computeTimingSignals } from "./timing-layer";

interface ParsedSituation {
  keyEvent: string;
  inferredNeed: string;
  correctionSignal: boolean;
}

function intake(input: DynamicsIntakeInput): DynamicsIntakeInput {
  return {
    ...input,
    situationText: input.situationText.trim(),
  };
}

function parseSituation(input: DynamicsIntakeInput): ParsedSituation {
  const keyEvent = input.recentEvents[0] ?? input.situationText;

  const inferredNeed = /ignored|dismissed|unheard/i.test(input.situationText)
    ? "to feel heard and taken seriously"
    : "to feel understood and steady";

  const correctionSignal = /not accurate|that'?s wrong|no, actually|not what happened/i.test(input.situationText);

  return { keyEvent, inferredNeed, correctionSignal };
}

function retrieveContext(input: DynamicsIntakeInput) {
  const observations = buildEventObservations(input.recentEvents);
  const features = computeRelationalFeatureSignals(observations);
  const patterns = detectRelationalPatterns(features);
  const timing = computeTimingSignals(features);

  return {
    observations,
    features,
    patterns,
    timing,
    corrections: input.userCorrections ?? [],
    priorInsights: input.priorInsights ?? [],
    priorActions: input.priorActions ?? [],
  };
}

function synthesize(parsed: ParsedSituation, context: ReturnType<typeof retrieveContext>): DynamicsStructuredSynthesis {
  const confidenceBase = 0.68;
  const correctionPenalty = parsed.correctionSignal || context.corrections.length > 0 ? 0.2 : 0;
  const confidence = Math.max(0.24, confidenceBase - correctionPenalty);

  const timingSignalText = context.timing.delayRecommended
    ? "Timing may be tight; delaying briefly may improve the chance of a calmer conversation."
    : "Timing seems workable for a short and grounded follow-up.";

  const betweenDynamic = context.patterns.includes("pursue_withdraw_cycle")
    ? "A pursue-withdraw rhythm may be active, where urgency and distance amplify each other."
    : context.patterns.includes("criticism_defensiveness_loop")
      ? "A criticism-defensiveness loop may be shaping this exchange."
      : "The interaction may have shifted from one event into broader meaning a little too quickly.";

  return {
    userSideHypothesis: `You may be trying ${parsed.inferredNeed}.`,
    otherSideHypothesis:
      "They may be trying to reduce pressure or uncertainty, which can look distant without telling the whole story of what they feel.",
    betweenDynamic,
    timingSignal: timingSignalText,
    helpNeeded: parsed.correctionSignal
      ? "Given your correction, a slower fact-checking reset may help before interpreting motives."
      : "A brief reset conversation with one concrete example and one request may help.",
    confidence,
    detectedPatterns: context.patterns,
    timing: context.timing,
  };
}

function buildEvidence(parsed: ParsedSituation, context: ReturnType<typeof retrieveContext>): string[] {
  const evidence: string[] = [];

  if (context.observations.length > 0) {
    evidence.push(`Observed event: ${context.observations[0].raw}`);
  }
  if (context.patterns.length > 0) {
    evidence.push(`Repeated pattern: ${context.patterns[0].replaceAll("_", " ")}`);
  }
  if (context.corrections.length > 0 || parsed.correctionSignal) {
    evidence.push(`User correction signal: ${context.corrections[0] ?? "You indicated parts of prior interpretation may be inaccurate."}`);
  }

  evidence.push(`Timing context: pressure ${context.timing.pressureLevel}, repair window ${context.timing.repairWindow}.`);

  if ((context.priorInsights?.length ?? 0) > 0) {
    evidence.push("Lighter prior context: earlier thread summaries suggest this dynamic may repeat under stress.");
  } else {
    evidence.push("Lighter prior context: people often protect themselves or simplify the story when conversations feel loaded.");
  }

  return evidence;
}

function followUpActions(synthesis: DynamicsStructuredSynthesis): DynamicsReasoningResult["followUpActions"] {
  return [
    { type: "show_evidence", label: "Show me what this is based on", payload: { mode: "evidence" } },
    { type: "rephrase", label: "Help me say it another way", payload: { style: "calm-clarity" } },
    {
      type: "practice_conversation",
      label: "Practice the conversation",
      payload: {
        mode: "light-simulation",
        confidence: synthesis.confidence,
        timing: synthesis.timing,
        patterns: synthesis.detectedPatterns,
      },
    },
  ];
}

function safetyCheck(result: DynamicsReasoningResult): DynamicsReasoningResult {
  const scrub = (text: string) =>
    text
      .replace(/always/gi, "sometimes")
      .replace(/never/gi, "rarely")
      .replace(/is a narcissist|is avoidant|is disordered/gi, "may be under strain")
      .replace(/they are clearly/gi, "they may be")
      .replace(/this proves/gi, "this may suggest");

  return {
    ...result,
    output: {
      ...result.output,
      whatHappened: scrub(result.output.whatHappened),
      yourSide: scrub(result.output.yourSide),
      theirSide: scrub(result.output.theirSide),
      whatChanged: scrub(result.output.whatChanged),
      nextMove: scrub(result.output.nextMove),
      whatThisIsBasedOn: result.output.whatThisIsBasedOn.map(scrub),
    },
  };
}

export async function runDynamicsReasoning(input: DynamicsIntakeInput): Promise<DynamicsReasoningResult> {
  const accepted = intake(input);
  const parsed = parseSituation(accepted);
  const context = retrieveContext(accepted);
  const synthesis = synthesize(parsed, context);
  const evidence = buildEvidence(parsed, context);
  const output = await generateNarrative({
    synthesis,
    evidence,
    correctionDetected: parsed.correctionSignal || context.corrections.length > 0,
  });
  const evaluation = evaluateNarrativeQuality(output);

  const response = {
    synthesis,
    output,
    evaluation,
    followUpActions: followUpActions(synthesis),
  } satisfies DynamicsReasoningResult;

  return safetyCheck(response);
}
