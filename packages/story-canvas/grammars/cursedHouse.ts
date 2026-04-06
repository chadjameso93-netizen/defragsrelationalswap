import type { NarrativeGrammar } from "../types/grammar";

export const cursedHouseGrammar: NarrativeGrammar = {
  id: "cursedHouse",
  label: "Cursed House",
  intent: "Surface repeating stress loops with care.",
  beatTemplates: [
    {
      key: "echo",
      title: "Echoed Hallway",
      focus: "repeating loop",
      plainOverlayTemplate: "Identify the repeating moment without labeling either person as the problem.",
      cinematicOverlayTemplate: "Show the same hallway scene replaying until one gentle change is made.",
    },
    {
      key: "light",
      title: "Window Opened",
      focus: "interrupt loop",
      plainOverlayTemplate: "Choose one small interruption that lowers pressure.",
      cinematicOverlayTemplate: "A window opens and fresh air changes the pacing of the scene.",
    },
  ],
};
