export const insightResponseSchema = {
  type: "object",
  additionalProperties: false,
  required: ["insight", "structured_synthesis", "proof"],
  properties: {
    insight: {
      type: "object",
      additionalProperties: false,
      required: ["what_may_be_happening", "what_it_may_be_causing", "what_to_try_next", "tone"],
      properties: {
        what_may_be_happening: { type: "string" },
        what_it_may_be_causing: { type: "string" },
        what_to_try_next: { type: "array", minItems: 3, maxItems: 3, items: { type: "string" } },
        tone: { type: "string", enum: ["calm", "neutral", "soft", "direct"] },
      },
    },
    structured_synthesis: {
      type: "object",
      additionalProperties: false,
      required: ["user_experience", "other_experience", "dynamic_between", "timing_assessment", "help_needed", "confidence_level"],
      properties: {
        user_experience: { type: "string" },
        other_experience: { type: "string" },
        dynamic_between: { type: "string" },
        timing_assessment: { type: "string" },
        help_needed: { type: "string" },
        confidence_level: { type: "string", enum: ["low", "medium", "high"] },
      },
    },
    proof: {
      type: "object",
      additionalProperties: false,
      required: ["evidence_used", "pattern_candidates", "timing_notes", "uncertainty_notes", "confidence_reason"],
      properties: {
        evidence_used: { type: "array", minItems: 2, maxItems: 4, items: { type: "string" } },
        pattern_candidates: {
          type: "array",
          minItems: 1,
          maxItems: 3,
          items: {
            type: "object",
            additionalProperties: false,
            required: ["name", "confidence"],
            properties: {
              name: { type: "string" },
              confidence: { type: "string", enum: ["low", "medium", "high"] },
            },
          },
        },
        timing_notes: { type: "array", minItems: 1, maxItems: 2, items: { type: "string" } },
        uncertainty_notes: { type: "array", minItems: 2, maxItems: 3, items: { type: "string" } },
        confidence_reason: { type: "string" },
      },
    },
  },
} as const;

export const simulationResponseSchema = {
  type: "object",
  additionalProperties: false,
  required: ["branches"],
  properties: {
    branches: {
      type: "array",
      minItems: 3,
      maxItems: 3,
      items: { type: "string" },
    },
  },
} as const;
