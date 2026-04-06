import type { NarrativeGrammar } from "../types/grammar";

export const royalHierarchyGrammar: NarrativeGrammar = {
  id: "royalHierarchy",
  label: "Royal Hierarchy",
  intent: "Clarify role pressure without blame.",
  beatTemplates: [
    {
      key: "protocol",
      title: "Protocol Pressure",
      focus: "unspoken rules",
      plainOverlayTemplate: "Name the rule both people are reacting to in simple terms.",
      cinematicOverlayTemplate: "Frame the room as a court where status signals shape the next move.",
    },
    {
      key: "alignment",
      title: "Shared Charter",
      focus: "aligned agreements",
      plainOverlayTemplate: "Translate status conflict into one shared agreement.",
      cinematicOverlayTemplate: "Shift from throne conflict to a signed charter for the next scene.",
    },
  ],
};
