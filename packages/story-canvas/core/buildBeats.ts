import type { SampleDynamicInput } from "../fixtures/sampleDynamic";
import type { NarrativeGrammar } from "../types/grammar";
import type { LensMode } from "../types/lens";
import type { StoryCanvasBeat } from "../types/beats";

type GrammarFlavor = {
  pressureFrames: string[];
  actionFrames: string[];
  cinematicFrames: string[];
};

const FLAVOR_BY_GRAMMAR: Record<string, GrammarFlavor> = {
  royalHierarchy: {
    pressureFrames: [
      "Role pressure is shaping tone before intent is heard",
      "Status cues are steering the exchange more than content",
    ],
    actionFrames: [
      "Name the shared rule you both want to follow this week",
      "Replace rank guessing with one explicit agreement",
    ],
    cinematicFrames: [
      "Shift from throne-room tension to a shared table conversation",
      "Move from protocol theater to a direct co-authored brief",
    ],
  },
  cursedHouse: {
    pressureFrames: [
      "A familiar stress loop is replaying with small variations",
      "The same hallway moment keeps returning under pressure",
    ],
    actionFrames: [
      "Interrupt the loop with one low-stakes change in sequence",
      "Choose a different first sentence to break the replay",
    ],
    cinematicFrames: [
      "Open a window in the scene so pacing can reset",
      "Change one camera angle to avoid repeating the same reaction shot",
    ],
  },
  maskedProtector: {
    pressureFrames: [
      "Protection is present, but delivery may sound sharp",
      "Care is active, yet armor is obscuring the signal",
    ],
    actionFrames: [
      "Keep the boundary and soften the entry line",
      "Name the care first, then state one clear limit",
    ],
    cinematicFrames: [
      "Lower the shield enough for care to become audible",
      "Let the mask tilt so intent can be seen without threat",
    ],
  },
  exileAndReturn: {
    pressureFrames: [
      "Distance is carrying unmet needs from earlier moments",
      "Separation has protected both sides but delayed repair",
    ],
    actionFrames: [
      "Offer one consent-based re-entry step with clear timing",
      "Create a return path that is small, specific, and voluntary",
    ],
    cinematicFrames: [
      "Build a bridge scene with room for pauses and choice",
      "Stage the return as a gentle crossing, not a forced reunion",
    ],
  },
  repeatingTriangle: {
    pressureFrames: [
      "Indirect routes are increasing noise around the core issue",
      "A third-point relay is carrying pressure meant for two voices",
    ],
    actionFrames: [
      "Move one message back to direct dialogue between primary people",
      "Remove one relay step and keep the exchange person-to-person",
    ],
    cinematicFrames: [
      "Narrow the frame from three corners to one clear thread",
      "Fade side channels so two direct voices can be heard",
    ],
  },
  invisibleLabor: {
    pressureFrames: [
      "Hidden effort is shaping tension without being named",
      "Unseen coordination load is distorting fairness signals",
    ],
    actionFrames: [
      "List one invisible task and rebalance ownership concretely",
      "Turn hidden maintenance into one shared weekly commitment",
    ],
    cinematicFrames: [
      "Bring backstage work into the light with concrete credits",
      "Re-block the scene so care work is visible and shareable",
    ],
  },
};

function compact(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

function summarize(value: string, max = 96): string {
  const normalized = compact(value);
  if (normalized.length <= max) {
    return normalized;
  }
  return `${normalized.slice(0, max - 1).trimEnd()}…`;
}

function deterministicIndex(seed: string, length: number): number {
  let total = 0;
  for (let index = 0; index < seed.length; index += 1) {
    total = (total + seed.charCodeAt(index) * (index + 3)) % 2147483647;
  }
  return length === 0 ? 0 : total % length;
}

export function buildBeats(input: SampleDynamicInput, grammar: NarrativeGrammar, lens: LensMode): StoryCanvasBeat[] {
  const flavor = FLAVOR_BY_GRAMMAR[grammar.id] ?? FLAVOR_BY_GRAMMAR.royalHierarchy;
  const relationshipLabel = compact(input.relationshipLabel);
  const friction = summarize(input.frictionPoint, 112);
  const goal = summarize(input.sharedGoal, 92);
  const weather = summarize(input.emotionalWeather, 96);

  return grammar.beatTemplates.map((template, index) => {
    const seed = `${grammar.id}:${template.key}:${relationshipLabel}:${friction}:${goal}:${weather}`;
    const pressureFrame = flavor.pressureFrames[deterministicIndex(`${seed}:pressure`, flavor.pressureFrames.length)];
    const actionFrame = flavor.actionFrames[deterministicIndex(`${seed}:action`, flavor.actionFrames.length)];
    const cinematicFrame = flavor.cinematicFrames[deterministicIndex(`${seed}:cinematic`, flavor.cinematicFrames.length)];

    const plainOverlay = `${template.plainOverlayTemplate} In ${relationshipLabel}, "${friction}" suggests ${pressureFrame.toLowerCase()}. Practical move: ${actionFrame}.`;
    const cinematicOverlay = `${template.cinematicOverlayTemplate} Scene weather: ${weather}. ${cinematicFrame}. Keep the next move aligned with ${goal}.`;

    return {
      id: `${grammar.id}:${template.key}`,
      order: index + 1,
      title: template.title,
      focus: template.focus,
      plainOverlay,
      cinematicOverlay,
      selectedOverlay: lens === "cinematic" ? cinematicOverlay : plainOverlay,
      lens,
      constructiveFrame: `For ${relationshipLabel}, support ${goal} through one specific, respectful action that both sides can understand.`,
    };
  });
}
