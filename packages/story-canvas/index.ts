export { buildScene } from "./core/buildScene";
export { buildBeats } from "./core/buildBeats";
export { buildAnnotations } from "./core/buildAnnotations";
export { buildRewrite } from "./core/buildRewrite";

export { sampleDynamic } from "./fixtures/sampleDynamic";

export { royalHierarchyGrammar } from "./grammars/royalHierarchy";
export { cursedHouseGrammar } from "./grammars/cursedHouse";
export { maskedProtectorGrammar } from "./grammars/maskedProtector";
export { exileAndReturnGrammar } from "./grammars/exileAndReturn";
export { repeatingTriangleGrammar } from "./grammars/repeatingTriangle";
export { invisibleLaborGrammar } from "./grammars/invisibleLabor";

import { royalHierarchyGrammar } from "./grammars/royalHierarchy";
import { cursedHouseGrammar } from "./grammars/cursedHouse";
import { maskedProtectorGrammar } from "./grammars/maskedProtector";
import { exileAndReturnGrammar } from "./grammars/exileAndReturn";
import { repeatingTriangleGrammar } from "./grammars/repeatingTriangle";
import { invisibleLaborGrammar } from "./grammars/invisibleLabor";

export const storyCanvasGrammarRegistry = {
  royalHierarchy: royalHierarchyGrammar,
  cursedHouse: cursedHouseGrammar,
  maskedProtector: maskedProtectorGrammar,
  exileAndReturn: exileAndReturnGrammar,
  repeatingTriangle: repeatingTriangleGrammar,
  invisibleLabor: invisibleLaborGrammar,
} as const;

export type { StoryCanvasBeat } from "./types/beats";
export type { StoryCanvasScene } from "./types/scene";
export type { NarrativeGrammar, GrammarBeatTemplate } from "./types/grammar";
export type { LensMode } from "./types/lens";
export { DEFAULT_LENS_MODE, SUPPORTED_LENS_MODES } from "./types/lens";
export type { Annotation, RewritePath, AnnotationCategory } from "./types/annotations";
