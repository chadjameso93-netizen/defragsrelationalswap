import type { LensMode } from "./lens";

export type StoryCanvasBeat = {
  id: string;
  order: number;
  title: string;
  focus: string;
  plainOverlay: string;
  cinematicOverlay: string;
  selectedOverlay: string;
  lens: LensMode;
  constructiveFrame: string;
};
