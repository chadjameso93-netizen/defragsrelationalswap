import type { NarrativeGrammar } from "../types/grammar";

export const exileAndReturnGrammar: NarrativeGrammar = {
  id: "exileAndReturn",
  label: "Exile and Return",
  intent: "Map distance and reconnection with grounded steps.",
  beatTemplates: [
    {
      key: "distance",
      title: "Distance Named",
      focus: "separation",
      plainOverlayTemplate: "Name the distance that formed and what each person needed.",
      cinematicOverlayTemplate: "Track the journey apart with attention to unmet needs.",
    },
    {
      key: "return",
      title: "Bridge Back",
      focus: "re-entry",
      plainOverlayTemplate: "Offer one low-pressure step for return and repair.",
      cinematicOverlayTemplate: "Build a bridge scene where return is steady and consent-based.",
    },
  ],
};
