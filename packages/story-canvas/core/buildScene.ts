import { buildBeats } from "./buildBeats";
import { DEFAULT_LENS_MODE, SUPPORTED_LENS_MODES, type LensMode } from "../types/lens";
import type { NarrativeGrammar } from "../types/grammar";
import type { StoryCanvasScene } from "../types/scene";
import type { SampleDynamicInput } from "../fixtures/sampleDynamic";

export type BuildSceneOptions = {
  lens?: LensMode;
};

function compact(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

export function buildScene(input: SampleDynamicInput, grammar: NarrativeGrammar, options: BuildSceneOptions = {}): StoryCanvasScene {
  const lens = options.lens ?? DEFAULT_LENS_MODE;
  const relationshipLabel = compact(input.relationshipLabel);
  const sharedGoal = compact(input.sharedGoal);
  const frictionPoint = compact(input.frictionPoint);
  const emotionalWeather = compact(input.emotionalWeather);
  const sceneId = `${grammar.id}:${relationshipLabel.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;

  return {
    id: sceneId,
    title: `${grammar.label} for ${relationshipLabel}`,
    grammarId: grammar.id,
    lens,
    availableLenses: [...SUPPORTED_LENS_MODES],
    plainLanguageOverlay: `${relationshipLabel}: keep the focus on ${sharedGoal} while addressing "${frictionPoint}" in a calm, specific way. Current weather: ${emotionalWeather}.`,
    context: {
      relationshipLabel,
      frictionPoint,
      sharedGoal,
      emotionalWeather,
    },
    beats: buildBeats(input, grammar, lens),
  };
}
