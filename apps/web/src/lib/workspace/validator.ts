const BANNED_PHRASES = [
  'raise your frequency',
  'move into alignment',
  'diagnosis',
  'disorder',
  'narcissist',
];

export function validateWorkspaceText(parts: string[]) {
  const joined = parts.join(' ').toLowerCase();
  const bannedHits = BANNED_PHRASES.filter((phrase) => joined.includes(phrase));

  return {
    ok: bannedHits.length === 0,
    bannedHits,
  };
}
