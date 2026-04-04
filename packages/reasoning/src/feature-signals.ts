import type { EventObservation } from "./event-model";

export interface RelationalFeatureSignals {
  silenceScore: number;
  blameScore: number;
  repairScore: number;
  timingScore: number;
}

export function computeRelationalFeatureSignals(observations: EventObservation[]): RelationalFeatureSignals {
  const count = Math.max(observations.length, 1);

  const silenceScore = observations.filter((item) => item.mentionsSilence).length / count;
  const blameScore = observations.filter((item) => item.mentionsBlame).length / count;
  const repairScore = observations.filter((item) => item.mentionsRepair).length / count;
  const timingScore = observations.filter((item) => item.mentionsTiming).length / count;

  return {
    silenceScore,
    blameScore,
    repairScore,
    timingScore,
  };
}
