export const DEFRAG_BANNED_TERMS = [
  'pressure',
  'resonance',
  'alignment',
  'dynamic field',
  'shadow work',
  'heavy saturn return',
  'open spleen',
  '5/1',
  'fracture',
  'frequency',
] as const;

export const DEFRAG_APPROVED_TERMS = {
  whatIsHappening: 'What may be happening',
  whatEachPersonMayBeCarrying: 'What each person may be carrying',
  nextClearStep: 'What could help next',
  baseline: 'Baseline',
  workspace: 'Workspace',
  familyView: 'Family view',
  otherSide: 'Other side',
  calmerWay: 'A calmer way to say it',
} as const;

export const DEFRAG_COPY_RULES = {
  style: ['simple', 'direct', 'human', 'clear', 'non-judgmental'],
  readabilityTarget: '6th-8th grade',
  avoid: ['jargon', 'diagnosis', 'false certainty', 'inflated claims'],
} as const;

export function containsBannedTerm(input: string) {
  const lower = input.toLowerCase();
  return DEFRAG_BANNED_TERMS.some((term) => lower.includes(term.toLowerCase()));
}
