import type { NarrativeGrammar } from "../types/grammar";

export const invisibleLaborGrammar: NarrativeGrammar = {
  id: "invisibleLabor",
  label: "Invisible Labor",
  intent: "Make hidden effort visible and shareable.",
  beatTemplates: [
    {
      key: "inventory",
      title: "Load Inventory",
      focus: "hidden effort",
      plainOverlayTemplate: "List unseen effort in specific and neutral language.",
      cinematicOverlayTemplate: "Reveal backstage work that keeps the story moving.",
    },
    {
      key: "redistribute",
      title: "Fairer Distribution",
      focus: "shared load",
      plainOverlayTemplate: "Pick one concrete redistribution for this week.",
      cinematicOverlayTemplate: "Re-block the scene so effort is visibly shared.",
    },
  ],
};
