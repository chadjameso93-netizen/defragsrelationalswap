// Web-local baseline generator
// Adapted from packages/reasoning/src/baseline-generator.ts
// All imports resolved locally - no cross-package dependencies

export interface ReasoningProviderConfig {
  provider?: "openai" | "heuristic";
  apiKey?: string;
  model?: string;
  enableModelGeneration?: boolean;
}

export interface BaselineDesignInput {
  name?: string;
  dob: string;
  birth_time?: string;
  birth_place?: string;
  current_location?: string;
  context?: string;
  symbolic_inputs?: Record<string, unknown>;
}

export interface BaselineDesignResponse {
  baseline: {
    core_design: string;
    strengths_and_gifts: string[];
    pressure_points_and_drift_patterns: string[];
    relationship_and_communication_tendencies: string[];
    grounding_supports: string[];
    active_now: string[];
    practical_guidance: string[];
    one_clear_next_step: string;
  };
  meta: {
    confidence_level: "low" | "medium" | "high";
    uncertainty_notes: string[];
    safety_notes: string[];
    source_layers: string[];
  };
}

function clean(text: string) {
  return text.trim().replace(/\s+/g, " ");
}

function sanitizeLine(text: string) {
  return clean(
    text
      .replace(/diagnosis|diagnostic|therapy|clinical|disorder|narcissist|avoidant/gi, "pattern")
      .replace(/always/gi, "often")
      .replace(/never/gi, "rarely")
      .replace(/proves/gi, "suggests"),
  );
}

function buildSourceLayers(input: BaselineDesignInput): string[] {
  const layers: string[] = [];
  if (input.symbolic_inputs?.astrology) layers.push("astrology");
  if (input.symbolic_inputs?.human_design) layers.push("human_design");
  if (input.symbolic_inputs?.gene_keys) layers.push("gene_keys");
  if (input.symbolic_inputs?.numerology) layers.push("numerology");
  if (input.symbolic_inputs?.i_ching) layers.push("i_ching");
  if (input.current_location) layers.push("current_location");
  if (input.context) layers.push("current_context");
  return layers.length > 0 ? layers : ["birth_data_only"];
}

function fallbackBaseline(input: BaselineDesignInput): BaselineDesignResponse {
  const hasContext = Boolean(input.context?.trim());
  const sourceLayers = buildSourceLayers(input);
  return {
    baseline: {
      core_design:
        "This baseline suggests a person who benefits from understanding their own rhythm clearly before forcing direction. A common pattern here is doing better when pressure is named early and the next step stays simple.",
      strengths_and_gifts: [
        "You may have a natural ability to notice patterns beneath the surface of situations.",
        "You may do well when your decisions come from clarity instead of urgency.",
        "You may bring steadiness when you understand what matters most in the moment.",
      ],
      pressure_points_and_drift_patterns: [
        "Pressure may turn into overthinking if too many meanings get attached at once.",
        "A common drift pattern here is forcing movement before your inner sense is settled.",
        "When stressed, you may confuse urgency with truth and lose simplicity.",
      ],
      relationship_and_communication_tendencies: [
        "You may need communication that feels clear, honest, and low-pressure.",
        "You may pull back from conversations that feel too forceful or emotionally crowded.",
        "Directness may work best when it stays calm and specific.",
      ],
      grounding_supports: [
        "Slowing the pace before a decision may help you hear yourself more clearly.",
        "Simple language and one-step-at-a-time structure may reduce overwhelm.",
        "Clear boundaries around what is yours and what is not yours may help you stay steady.",
      ],
      active_now: hasContext
        ? [
            "Your current context may be amplifying the need for clarity before action.",
            "This may be a period where timing matters as much as insight.",
          ]
        : [
            "Without present-life context, the most active theme appears to be learning your rhythm before forcing outcomes.",
          ],
      practical_guidance: [
        "Stay with one real pattern instead of trying to interpret your whole life at once.",
        "Use this baseline as a guide for reflection, not as a fixed identity.",
        "Let the next move be small enough that you can actually follow through on it.",
      ],
      one_clear_next_step:
        "Pick one current area of pressure and describe it in plain language before asking what it means.",
    },
    meta: {
      confidence_level: sourceLayers.length >= 3 ? "medium" : "low",
      uncertainty_notes: [
        "This is a directional baseline, not a final definition of the person.",
        "Symbolic systems can offer useful pattern language, but they should not be treated as certainty.",
      ],
      safety_notes: [
        "This output is for reflection and guidance, not diagnosis.",
        "Real behavior, present context, and direct communication matter more than any one interpretive frame.",
      ],
      source_layers: sourceLayers,
    },
  };
}

function sanitizeBaselineResponse(response: BaselineDesignResponse): BaselineDesignResponse {
  return {
    baseline: {
      core_design: sanitizeLine(response.baseline.core_design),
      strengths_and_gifts: response.baseline.strengths_and_gifts.slice(0, 8).map(sanitizeLine),
      pressure_points_and_drift_patterns: response.baseline.pressure_points_and_drift_patterns
        .slice(0, 8)
        .map(sanitizeLine),
      relationship_and_communication_tendencies: response.baseline.relationship_and_communication_tendencies
        .slice(0, 8)
        .map(sanitizeLine),
      grounding_supports: response.baseline.grounding_supports.slice(0, 8).map(sanitizeLine),
      active_now: response.baseline.active_now.slice(0, 8).map(sanitizeLine),
      practical_guidance: response.baseline.practical_guidance.slice(0, 8).map(sanitizeLine),
      one_clear_next_step: sanitizeLine(response.baseline.one_clear_next_step),
    },
    meta: {
      confidence_level: response.meta.confidence_level,
      uncertainty_notes: response.meta.uncertainty_notes.slice(0, 5).map(sanitizeLine),
      safety_notes: response.meta.safety_notes.slice(0, 5).map(sanitizeLine),
      source_layers: response.meta.source_layers.slice(0, 10).map(sanitizeLine),
    },
  };
}

function safeBaselineRefusal(input: BaselineDesignInput): BaselineDesignResponse {
  return {
    baseline: {
      core_design:
        "There is not enough safe or specific material here for a reliable baseline yet.",
      strengths_and_gifts: [
        "A more grounded reading becomes possible when the input is clearer and more complete.",
      ],
      pressure_points_and_drift_patterns: [
        "Broad or missing inputs can create interpretations that overreach.",
      ],
      relationship_and_communication_tendencies: [
        "The current input is too limited to describe another person's style responsibly.",
      ],
      grounding_supports: [
        "Return with one clean baseline input set before asking for deeper interpretation.",
      ],
      active_now: [
        "The most useful move now is narrowing the input instead of expanding the meaning.",
      ],
      practical_guidance: [
        "Confirm the birth details and symbolic input layers before generating a full baseline.",
      ],
      one_clear_next_step:
        "Provide one complete baseline input set with birth data and any symbolic layers you want interpreted.",
    },
    meta: {
      confidence_level: "low",
      uncertainty_notes: [
        "This response is intentionally limited because the input is too incomplete for a trustworthy baseline.",
      ],
      safety_notes: [
        "A baseline should not be generated from guesswork when the input is too thin.",
      ],
      source_layers: buildSourceLayers(input),
    },
  };
}

async function requestOpenAIBaseline(
  input: BaselineDesignInput,
  apiKey: string,
  model: string,
): Promise<BaselineDesignResponse | null> {
  const systemPrompt = [
    "Generate a grounded DEFRAG baseline design report.",
    "Translate symbolic systems like astrology, human design, gene keys, i-ching, and numerology into plain language.",
    "Do not diagnose.",
    "Do not claim destiny or fixed certainty.",
    "Do not make supernatural claims.",
    "Use calm, direct, simple language.",
    "Treat symbolic systems as pattern language, not proof.",
    "Return ONLY a valid JSON object matching this exact structure with no markdown fences:",
    JSON.stringify({
      baseline: {
        core_design: "string",
        strengths_and_gifts: ["string"],
        pressure_points_and_drift_patterns: ["string"],
        relationship_and_communication_tendencies: ["string"],
        grounding_supports: ["string"],
        active_now: ["string"],
        practical_guidance: ["string"],
        one_clear_next_step: "string",
      },
      meta: {
        confidence_level: "low|medium|high",
        uncertainty_notes: ["string"],
        safety_notes: ["string"],
        source_layers: ["string"],
      },
    }),
  ].join(" ");

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: JSON.stringify(input, null, 2) },
      ],
      temperature: 0.4,
      max_tokens: 1800,
    }),
  });

  if (!res.ok) return null;

  const data = await res.json();
  const text: string = data?.choices?.[0]?.message?.content ?? "";

  try {
    const parsed = JSON.parse(text) as BaselineDesignResponse;
    if (parsed?.baseline?.core_design && parsed?.meta?.confidence_level) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

export async function generateBaselineDesignWithProvider(
  input: BaselineDesignInput,
  config?: ReasoningProviderConfig,
): Promise<BaselineDesignResponse> {
  const provider = config?.provider ?? "heuristic";
  const apiKey = config?.apiKey ?? "";
  const model = config?.model ?? "gpt-4.1-mini";

  if (provider === "openai" && apiKey) {
    try {
      const result = await requestOpenAIBaseline(input, apiKey, model);
      if (result) {
        return sanitizeBaselineResponse(result);
      }
      return sanitizeBaselineResponse(fallbackBaseline(input));
    } catch {
      return sanitizeBaselineResponse(fallbackBaseline(input));
    }
  }

  return sanitizeBaselineResponse(fallbackBaseline(input));
}
