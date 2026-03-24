import type { InsightApiResponse, SimulationApiResponse } from "../../types/contracts";

function normalize(input: string) {
  return input.trim().replace(/\s+/g, " ");
}

function containsAny(text: string, patterns: RegExp[]) {
  return patterns.some((pattern) => pattern.test(text));
}

function inferPattern(text: string) {
  if (containsAny(text, [/silent/i, /pull(?:ed|ing)? back/i, /distance/i, /withdrew?/i])) {
    return {
      happening: "This may be a pursue-withdraw moment where one person is trying to stay connected while the other is reducing pressure.",
      causing: "That can make the exchange feel colder or more rejecting than either person intends.",
      next: [
        "Name the distance without accusing the other person of not caring.",
        "Ask for one short reset window instead of pressing for immediate repair.",
        "Stay with the most recent moment rather than reopening the whole pattern at once.",
      ],
    };
  }

  if (containsAny(text, [/critic/i, /defens/i, /argu/i, /blame/i])) {
    return {
      happening: "This may be a criticism-defensiveness loop where the pressure of the message is landing before the care inside it.",
      causing: "The conversation can then shift into self-protection instead of mutual understanding.",
      next: [
        "Lead with the observable moment before naming your interpretation.",
        "Trim the first ask down to one specific repair request.",
        "Acknowledge any part of the other person's effort that was already present.",
      ],
    };
  }

  if (containsAny(text, [/family/i, /parent/i, /mother/i, /father/i, /sibling/i])) {
    return {
      happening: "This may be reactivating an older family role faster than the current conversation deserves.",
      causing: "That can make everyone sound more fixed, younger, or more defensive than they usually are.",
      next: [
        "Separate the current event from the larger family history before responding.",
        "Say what felt heavy without assigning a permanent role.",
        "If possible, revisit the conversation when the emotional temperature is lower.",
      ],
    };
  }

  return {
    happening: "This may be a moment where both people are reacting to pressure before either person feels fully understood.",
    causing: "That can make the exchange sharper or more distant than the underlying need actually is.",
    next: [
      "Name the moment simply before trying to solve it.",
      "Lead with one concrete observation instead of a larger judgment.",
      "Ask for a small reset instead of pushing for full resolution immediately.",
    ],
  };
}

function inferOtherExperience(text: string) {
  if (containsAny(text, [/timing/i, /too soon/i, /not ready/i, /later/i])) {
    return "The other person may be hearing urgency first and meaning second, especially if the timing felt tight.";
  }

  if (containsAny(text, [/apolog/i, /repair/i])) {
    return "The other person may believe they already moved toward repair, which can make further pressure feel like failure rather than invitation.";
  }

  return "The other person may be hearing pressure first and meaning second, even if your intention is care.";
}

function inferSimulationBranches(text: string) {
  if (containsAny(text, [/silent/i, /distance/i, /withdrew?/i])) {
    return [
      "A softer reopening may lower the chance that distance gets mistaken for indifference.",
      "If the conversation starts with accumulated frustration, the other person may retreat further before they can hear your meaning.",
      "Keeping the first ask small may make reconnection more likely than pushing for full repair immediately.",
    ];
  }

  if (containsAny(text, [/critic/i, /defens/i, /argu/i])) {
    return [
      "A concrete observation may land more cleanly than explaining the whole pattern up front.",
      "If the opening sounds evaluative, the other person may move into self-protection instead of responsiveness.",
      "A narrow repair request may create more traction than trying to settle the whole disagreement.",
    ];
  }

  return [
    "A softer opening may lower defensiveness and make the next exchange more honest.",
    "If the conversation starts too forcefully, the other person may retreat into explanation instead of connection.",
    "Keeping the first ask narrow may make agreement easier.",
  ];
}

export function generateInsightResponse(request: string): InsightApiResponse {
  const normalized = normalize(request);
  const pattern = inferPattern(normalized);

  return {
    insight: {
      what_may_be_happening: pattern.happening,
      what_it_may_be_causing: pattern.causing,
      what_to_try_next: pattern.next,
    },
    structured_synthesis: {
      other_experience: inferOtherExperience(normalized),
    },
  };
}

export function generateSimulationResponse(request: string): SimulationApiResponse {
  return {
    branches: inferSimulationBranches(normalize(request)),
  };
}
