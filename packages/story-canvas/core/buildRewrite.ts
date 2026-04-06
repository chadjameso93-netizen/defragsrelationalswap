import type { Annotation, RewritePath } from "../types/annotations";
import type { StoryCanvasScene } from "../types/scene";

export function buildRewrite(scene: StoryCanvasScene, annotations: Annotation[]): RewritePath[] {
  const relationship = scene.context.relationshipLabel;
  const friction = scene.context.frictionPoint;
  const goal = scene.context.sharedGoal;

  return scene.beats.map((beat, index) => {
    const annotation = annotations[index];
    const actionLine =
      annotation?.category === "coordination"
        ? "Can we choose one owner and one date for this step?"
        : annotation?.category === "repair"
          ? "Would you be open to one small reset conversation this week?"
          : annotation?.category === "regulation"
            ? "Could we pause for ten minutes and return when both of us are steadier?"
            : "Can we restate the point in one sentence each before we respond?";

    return {
      id: `rewrite:${scene.id}:${index + 1}`,
      title: `${beat.title}: clearer next wording`,
      before: `When ${relationship} gets tense around "${friction}", we slip into ${beat.focus} and lose the thread.`,
      after: `I want us to move toward ${goal}. I think ${beat.selectedOverlay.toLowerCase()} ${actionLine}`,
      rationale:
        "This rewrite keeps the language concrete, non-diagnostic, and collaborative while preserving clear boundaries.",
    };
  });
}
