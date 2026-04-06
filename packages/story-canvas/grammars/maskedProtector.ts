import type { NarrativeGrammar } from "../types/grammar";

export const maskedProtectorGrammar: NarrativeGrammar = {
  id: "maskedProtector",
  label: "Masked Protector",
  intent: "Honor protective intent while improving delivery.",
  beatTemplates: [
    {
      key: "shield",
      title: "Shield Raised",
      focus: "protective impulse",
      plainOverlayTemplate: "Describe what is being protected in plain language.",
      cinematicOverlayTemplate: "The mask drops just enough to reveal the care under the defense.",
    },
    {
      key: "unmask",
      title: "Signal Without Armor",
      focus: "clean signal",
      plainOverlayTemplate: "Rewrite the protective message so it lands without threat.",
      cinematicOverlayTemplate: "Replace armor with a clear signal that keeps dignity intact.",
    },
  ],
};
