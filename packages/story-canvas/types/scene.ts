import type { StoryCanvasBeat } from "./beats";
import type { LensMode } from "./lens";

export type StoryCanvasScene = {
  id: string;
  title: string;
  grammarId: string;
  lens: LensMode;
  availableLenses: LensMode[];
  plainLanguageOverlay: string;
  context: {
    relationshipLabel: string;
    frictionPoint: string;
    sharedGoal: string;
    emotionalWeather: string;
  };
  beats: StoryCanvasBeat[];
};
