export type GrammarBeatTemplate = {
  key: string;
  title: string;
  focus: string;
  plainOverlayTemplate: string;
  cinematicOverlayTemplate: string;
};

export type NarrativeGrammar = {
  id: string;
  label: string;
  intent: string;
  beatTemplates: GrammarBeatTemplate[];
};
