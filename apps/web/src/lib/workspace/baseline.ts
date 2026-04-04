export type WorkspaceBaselineCard = {
  label: string;
  value: string;
};

export function buildBaselineCards(message: string, participantNames: string[] = []) {
  const names = participantNames.filter(Boolean);
  const leadName = names[0] ?? 'You';
  const otherName = names[1] ?? 'Other person';
  const lower = message.toLowerCase();
  const mentionsFamily = /mom|mother|dad|father|sister|brother|family/.test(lower);

  return [
    {
      label: `${leadName} under strain`,
      value: 'may move toward clarity quickly because uncertainty can feel harder than a difficult truth.',
    },
    {
      label: `${otherName} under strain`,
      value: 'may slow down, get quieter, or protect themselves before they can respond clearly.',
    },
    {
      label: mentionsFamily ? 'Wider pattern' : 'What to watch',
      value: mentionsFamily
        ? 'the current moment may be touching a pattern that already has a place in the family.'
        : 'one person may push for clarity while the other person tries to lower pressure first.',
    },
  ];
}
