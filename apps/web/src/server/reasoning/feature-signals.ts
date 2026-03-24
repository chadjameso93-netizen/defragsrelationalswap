import type { CompanionEventObservation } from "./event-model";

export interface RelationalFeatureSignals {
  conflictFrequency: number;
  withdrawalTendency: number;
  repairAttemptFrequency: number;
  conversationDelayPressure: number;
  boundaryPressure: number;
}

function ratio(matchCount: number, total: number): number {
  if (total === 0) return 0;
  return Number((matchCount / total).toFixed(3));
}

export function computeRelationalFeatureSignals(events: CompanionEventObservation[]): RelationalFeatureSignals {
  const total = events.length;

  return {
    conflictFrequency: ratio(events.filter((event) => event.hasConflictCue).length, total),
    withdrawalTendency: ratio(events.filter((event) => event.hasWithdrawalCue).length, total),
    repairAttemptFrequency: ratio(events.filter((event) => event.hasRepairCue).length, total),
    conversationDelayPressure: ratio(events.filter((event) => event.hasTimingPressureCue).length, total),
    boundaryPressure: ratio(events.filter((event) => event.hasBoundaryCue).length, total),
  };
}
