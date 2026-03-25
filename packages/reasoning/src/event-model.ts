export interface EventObservation {
  raw: string;
  mentionsSilence: boolean;
  mentionsTiming: boolean;
  mentionsBlame: boolean;
  mentionsRepair: boolean;
}

export function buildEventObservations(events: string[]): EventObservation[] {
  return events
    .map((raw) => raw.trim())
    .filter(Boolean)
    .map((raw) => ({
      raw,
      mentionsSilence: /silent|silence|no reply|ignored|left me on read|pull(?:ed|ing)? back|distance|withdrew?/i.test(raw),
      mentionsTiming: /timing|later|too soon|not ready|after work|another time|wait/i.test(raw),
      mentionsBlame: /critic|blame|always|never|fault|defens|argu/i.test(raw),
      mentionsRepair: /repair|apolog|reset|reconnect|talk it through|try again/i.test(raw),
    }));
}
