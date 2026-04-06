import type { StoryCanvasScene } from "../types/scene";
import type { Annotation } from "../types/annotations";

const BANNED_PATTERNS = [/villain/i, /humiliat/i, /manipulat/i, /diagnos/i, /crazy/i, /broken/i];

function enforcePolicyLanguage(message: string): string {
  let normalized = message;
  for (const pattern of BANNED_PATTERNS) {
    normalized = normalized.replace(pattern, "harmful framing");
  }

  return normalized;
}

function categoryForFocus(focus: string): Annotation["category"] {
  if (/loop|pressure|status|signal|clarity|thread|rule/i.test(focus)) {
    return "clarity";
  }
  if (/repair|return|re-entry|bridge/i.test(focus)) {
    return "repair";
  }
  if (/load|shared|distribution|agreement|coordination/i.test(focus)) {
    return "coordination";
  }
  return "regulation";
}

export function buildAnnotations(scene: StoryCanvasScene): Annotation[] {
  const relationship = scene.context.relationshipLabel;
  const friction = scene.context.frictionPoint;

  return scene.beats.map((beat, index) => {
    const category = categoryForFocus(beat.focus);
    const beatLead = index === 0 ? "First, orient the moment." : "Next, translate this into an action.";
    const categoryGuide =
      category === "clarity"
        ? "Name what is happening without assigning character judgments."
        : category === "repair"
          ? "Keep the repair step voluntary, small, and specific."
          : category === "coordination"
            ? "Define who does what and when in concrete terms."
            : "Keep pacing calm so both sides can stay present.";

    return {
      id: `annotation:${beat.id}`,
      beatId: beat.id,
      category,
      message: enforcePolicyLanguage(
        `${beatLead} In ${relationship}, ${beat.focus} is active around "${friction}". ${categoryGuide} Keep both people in dignity and choose language that stays concrete.`,
      ),
      constructive: true,
    };
  });
}
