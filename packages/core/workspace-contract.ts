export type WorkspaceOutput = {
  whatIsHappening: string;
  whatEachPersonMayBeCarrying: string;
  nextClearStep: string;
};

export type WorkspaceParticipantSummary = {
  id: string;
  name: string;
  role?: string;
  stateLabel: string;
  plainLanguageSummary: string;
};

export type WorkspaceSessionShape = {
  summary: WorkspaceOutput;
  participants: WorkspaceParticipantSummary[];
  overlays?: Array<{
    id: string;
    label: string;
    body: string;
  }>;
  suggestions?: string[];
};
