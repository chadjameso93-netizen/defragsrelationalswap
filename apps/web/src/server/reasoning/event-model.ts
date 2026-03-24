export interface CompanionEventObservation {
  raw: string;
  timestampIso: string;
  hasConflictCue: boolean;
  hasWithdrawalCue: boolean;
  hasRepairCue: boolean;
  hasBoundaryCue: boolean;
  hasTimingPressureCue: boolean;
}

export function buildEventObservations(events: string[]): CompanionEventObservation[] {
  return events.map((event) => ({
    raw: event,
    timestampIso: new Date().toISOString(),
    hasConflictCue: /argue|fight|criticism|blame|tense|conflict/i.test(event),
    hasWithdrawalCue: /shut down|silent|withdrew|pulled away|distance/i.test(event),
    hasRepairCue: /apolog|repair|reset|check in|reconnect/i.test(event),
    hasBoundaryCue: /boundary|pressure|pushed|overstep/i.test(event),
    hasTimingPressureCue: /late|urgent|immediately|right now|delay|waiting/i.test(event),
  }));
}
