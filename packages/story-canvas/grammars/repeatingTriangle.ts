import type { NarrativeGrammar } from "../types/grammar";

export const repeatingTriangleGrammar: NarrativeGrammar = {
  id: "repeatingTriangle",
  label: "Repeating Triangle",
  intent: "Reduce third-point escalation and restore direct dialogue.",
  beatTemplates: [
    {
      key: "triangle",
      title: "Triangle Pattern",
      focus: "indirect pressure",
      plainOverlayTemplate: "Point out where a third point is carrying stress for the pair.",
      cinematicOverlayTemplate: "Trace the triangle lines and then simplify the camera to two voices.",
    },
    {
      key: "direct",
      title: "Direct Thread",
      focus: "two-person clarity",
      plainOverlayTemplate: "Move the message back to direct, respectful dialogue.",
      cinematicOverlayTemplate: "Cut away noise so two clear voices can connect.",
    },
  ],
};
