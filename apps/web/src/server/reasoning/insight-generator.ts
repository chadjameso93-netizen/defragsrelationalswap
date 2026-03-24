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

function inferUserExperience(text: string) {
  if (containsAny(text, [/silent/i, /pull(?:ed|ing)? back/i, /distance/i, /withdrew?/i])) {
    return "You may be feeling the distance more sharply because the connection still matters and the silence leaves too much room for guessing.";
  }

  if (containsAny(text, [/critic/i, /defens/i, /argu/i, /blame/i])) {
    return "You may be carrying both frustration and a wish to finally be understood, which can make the first words come out with more force than you mean.";
  }

  if (containsAny(text, [/family/i, /parent/i, /mother/i, /father/i, /sibling/i])) {
    return "You may be reacting to more than this single exchange, especially if older family roles or expectations were already close to the surface.";
  }

  return "You may be trying to make sense of a moment that felt heavier or less clear than it first appeared.";
}

function inferDynamicBetween(text: string) {
  if (containsAny(text, [/silent/i, /pull(?:ed|ing)? back/i, /distance/i, /withdrew?/i])) {
    return "One side seems to be reaching for contact while the other side is reducing intensity before they can stay present.";
  }

  if (containsAny(text, [/critic/i, /defens/i, /argu/i, /blame/i])) {
    return "The exchange may be moving too quickly from concern into self-protection for either side to feel fully met.";
  }

  if (containsAny(text, [/family/i, /parent/i, /mother/i, /father/i, /sibling/i])) {
    return "The current moment may be getting mixed with older family positions, which can make each person sound more fixed than they really are.";
  }

  return "Both sides may be reacting to pressure before the deeper need in the moment has been named clearly.";
}

function inferTimingAssessment(text: string) {
  if (containsAny(text, [/timing/i, /too soon/i, /not ready/i, /later/i, /high/i])) {
    return "This looks like a slower-timing moment. Meaning may land better after the intensity drops a little.";
  }

  if (containsAny(text, [/silent/i, /distance/i, /withdrew?/i])) {
    return "Reopening too fast may create more distance. A smaller first reach is likely to land better than a full repair attempt.";
  }

  return "This may be workable if the next step stays narrow, specific, and easy to answer.";
}

function inferConfidenceLevel(text: string): "low" | "medium" | "high" {
  if (containsAny(text, [/family/i, /parent/i, /mother/i, /father/i, /sibling/i, /critic/i, /defens/i, /argu/i, /silent/i, /distance/i])) {
    return "medium";
  }

  return "low";
}

function inferPatternCandidates(text: string) {
  if (containsAny(text, [/silent/i, /pull(?:ed|ing)? back/i, /distance/i, /withdrew?/i])) {
    return [
      { name: "pursue-withdraw", confidence: "medium" as const },
      { name: "timing mismatch", confidence: "low" as const },
    ];
  }

  if (containsAny(text, [/critic/i, /defens/i, /argu/i, /blame/i])) {
    return [
      { name: "criticism-defensiveness", confidence: "medium" as const },
      { name: "repair pressure", confidence: "low" as const },
    ];
  }

  if (containsAny(text, [/family/i, /parent/i, /mother/i, /father/i, /sibling/i])) {
    return [
      { name: "family role reactivation", confidence: "medium" as const },
      { name: "timing mismatch", confidence: "low" as const },
    ];
  }

  return [{ name: "shared pressure", confidence: "low" as const }];
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

  if (containsAny(text, [/family/i, /parent/i, /mother/i, /father/i, /sibling/i])) {
    return [
      "Naming the current moment without retelling the whole family history may keep the next exchange steadier.",
      "If older roles get named too early, people may defend the role instead of responding to the present concern.",
      "A smaller follow-up with one person first may create more room than trying to settle the whole family field at once.",
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
  const confidence = inferConfidenceLevel(normalized);
  const patternCandidates = inferPatternCandidates(normalized);

  return {
    insight: {
      what_may_be_happening: pattern.happening,
      what_it_may_be_causing: pattern.causing,
      what_to_try_next: pattern.next,
      tone: "soft",
    },
    structured_synthesis: {
      user_experience: inferUserExperience(normalized),
      other_experience: inferOtherExperience(normalized),
      dynamic_between: inferDynamicBetween(normalized),
      timing_assessment: inferTimingAssessment(normalized),
      help_needed: "insight + phrasing",
      confidence_level: confidence,
    },
    proof: {
      evidence_used: [
        `Grounded in the words and cues inside this request: ${normalized.slice(0, 120)}${normalized.length > 120 ? "…" : ""}`,
        "Uses lightweight pattern matching against timing, distance, blame, and role language.",
      ],
      pattern_candidates: patternCandidates,
      timing_notes: [inferTimingAssessment(normalized)],
      uncertainty_notes: [
        "This read is directional, not definitive.",
        "Real events and direct clarification matter more than any one interpretive frame.",
      ],
      confidence_reason:
        confidence === "medium"
          ? "The request includes specific relational cues that support a grounded directional read."
          : "The request is usable, but still broad enough that multiple explanations could fit.",
    },
  };
}

export function generateSimulationResponse(request: string): SimulationApiResponse {
  return {
    branches: inferSimulationBranches(normalize(request)),
  };
}
