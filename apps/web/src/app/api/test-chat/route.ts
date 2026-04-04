import { NextRequest, NextResponse } from "next/server";

type TopLevelClass =
  | "interpretation_request"
  | "conversation_preparation"
  | "emotional_processing"
  | "relationship_pattern_question"
  | "timing_question"
  | "active_conflict_situation"
  | "identity_or_transition_question";

type RequestObject = {
  message: string;
  messageClass: TopLevelClass;
  primaryRelationship: string | null;
  userGoal: string;
  riskType: string | null;
  emotionalTone: string[];
  outputNeed: string[];
};

type SynthesisObject = {
  whatMayBeHappeningForUser: string;
  whatMayBeHappeningForOtherPerson: string;
  dynamicPattern: string;
  timingSuggestion: string;
  usefulResponseType: string[];
  safety: {
    nonDiagnostic: true;
    uncertaintyLevel: "low" | "medium" | "high";
  };
};

type StructuredChatResult = {
  requestObject: RequestObject;
  synthesisObject: SynthesisObject;
  userFacingResponse: string;
  model: string;
  provider: "openai" | "local_fallback";
};

function classifyMessage(message: string): TopLevelClass {
  const lower = message.toLowerCase();

  if (lower.includes("fight") || lower.includes("argue") || lower.includes("conflict")) {
    return "active_conflict_situation";
  }
  if (
    lower.includes("what should i say") ||
    lower.includes("how do i say") ||
    lower.includes("talk to")
  ) {
    return "conversation_preparation";
  }
  if (lower.includes("when should") || lower.includes("tonight") || lower.includes("timing")) {
    return "timing_question";
  }
  if (lower.includes("pattern") || lower.includes("always happens")) {
    return "relationship_pattern_question";
  }
  if (lower.includes("feel") || lower.includes("processing")) {
    return "emotional_processing";
  }
  if (lower.includes("who am i") || lower.includes("transition")) {
    return "identity_or_transition_question";
  }
  return "interpretation_request";
}

function detectPrimaryRelationship(message: string): string | null {
  const lower = message.toLowerCase();
  const candidates = [
    "mom",
    "mother",
    "dad",
    "father",
    "partner",
    "boyfriend",
    "girlfriend",
    "wife",
    "husband",
    "friend",
    "boss",
    "coworker",
    "sister",
    "brother",
    "family",
    "team",
  ];

  for (const candidate of candidates) {
    if (lower.includes(candidate)) return candidate;
  }
  return null;
}

function detectEmotionalTone(message: string): string[] {
  const lower = message.toLowerCase();
  const tones: string[] = [];

  if (lower.includes("anxious") || lower.includes("nervous") || lower.includes("worried")) {
    tones.push("anxiety");
  }
  if (lower.includes("angry") || lower.includes("mad") || lower.includes("furious")) {
    tones.push("anger");
  }
  if (lower.includes("sad") || lower.includes("hurt")) {
    tones.push("hurt");
  }
  if (lower.includes("confused") || lower.includes("don't understand") || lower.includes("dont understand")) {
    tones.push("confusion");
  }
  if (lower.includes("frustrated") || lower.includes("annoyed")) {
    tones.push("frustration");
  }
  if (tones.length === 0) tones.push("mixed");

  return tones;
}

function inferUserGoal(message: string, messageClass: TopLevelClass): string {
  const lower = message.toLowerCase();

  if (lower.includes("what should i say") || lower.includes("how do i say")) {
    return "phrasing help";
  }
  if (lower.includes("should i wait") || lower.includes("is tonight a good time")) {
    return "timing guidance";
  }
  if (lower.includes("what is happening") || lower.includes("why")) {
    return "understanding the dynamic";
  }

  switch (messageClass) {
    case "conversation_preparation":
      return "conversation planning";
    case "timing_question":
      return "timing guidance";
    case "active_conflict_situation":
      return "de-escalation";
    default:
      return "relational understanding";
  }
}

function inferRiskType(message: string): string | null {
  const lower = message.toLowerCase();

  if (lower.includes("fight") || lower.includes("blow up") || lower.includes("escalate")) {
    return "escalation";
  }
  if (lower.includes("ignore") || lower.includes("withdraw")) {
    return "withdrawal";
  }
  if (lower.includes("boundary")) {
    return "boundary pressure";
  }

  return null;
}

function inferOutputNeed(messageClass: TopLevelClass, message: string): string[] {
  const lower = message.toLowerCase();
  const needs = new Set<string>();

  if (messageClass === "conversation_preparation") needs.add("phrasing help");
  if (messageClass === "timing_question") needs.add("timing guidance");
  if (messageClass === "active_conflict_situation") needs.add("de-escalation guidance");
  if (lower.includes("practice")) needs.add("simulation");
  if (lower.includes("say") || lower.includes("text")) needs.add("wording");
  if (needs.size === 0) needs.add("perspective");

  return [...needs];
}

function buildRequestObject(message: string): RequestObject {
  const messageClass = classifyMessage(message);

  return {
    message,
    messageClass,
    primaryRelationship: detectPrimaryRelationship(message),
    userGoal: inferUserGoal(message, messageClass),
    riskType: inferRiskType(message),
    emotionalTone: detectEmotionalTone(message),
    outputNeed: inferOutputNeed(messageClass, message),
  };
}

function buildFallbackSynthesisObject(req: RequestObject): SynthesisObject {
  const relationship = req.primaryRelationship ?? "the other person";

  let dynamicPattern = "communication strain under pressure";
  if (req.riskType === "escalation") dynamicPattern = "escalation loop risk";
  if (req.riskType === "withdrawal") dynamicPattern = "pursue-withdraw pattern";
  if (req.riskType === "boundary pressure") dynamicPattern = "boundary pressure";

  let timingSuggestion = "A softer opening may work better than pushing for full resolution immediately.";
  if (req.riskType === "escalation") {
    timingSuggestion = "If the moment already feels charged, delay slightly and lead with stabilization before content.";
  }

  return {
    whatMayBeHappeningForUser:
      "You may be trying to reduce confusion or tension, but pressure in the moment could make your message come out more intensely than you intend.",
    whatMayBeHappeningForOtherPerson:
      `The message may land with ${relationship} as criticism, pressure, or a demand for immediate emotional processing, even if that is not your goal.`,
    dynamicPattern,
    timingSuggestion,
    usefulResponseType: req.outputNeed,
    safety: {
      nonDiagnostic: true,
      uncertaintyLevel: "medium",
    },
  };
}

function buildFallbackUserFacingResponse(req: RequestObject, syn: SynthesisObject): string {
  const lead =
    "That makes sense. This sounds like one of those moments where timing, tone, and pressure all matter as much as the topic itself.";

  const perspective =
    "You may be trying to create clarity, while the other person may experience the same move as intensity or criticism if the moment is already tight.";

  const action =
    req.userGoal === "phrasing help" || req.outputNeed.includes("wording")
      ? "A better opening is usually brief, specific, and lower-pressure: say what you want to understand or repair, rather than leading with everything that feels wrong."
      : "It may help to lower pressure first, then move into the actual topic once the interaction feels steadier.";

  return [lead, perspective, action, syn.timingSuggestion].join(" ");
}

function extractResponseText(payload: any): string {
  if (typeof payload?.output_text === "string" && payload.output_text.trim()) {
    return payload.output_text;
  }

  const outputs = Array.isArray(payload?.output) ? payload.output : [];
  const texts: string[] = [];

  for (const item of outputs) {
    const contents = Array.isArray(item?.content) ? item.content : [];
    for (const content of contents) {
      if (typeof content?.text === "string") {
        texts.push(content.text);
      }
    }
  }

  return texts.join("\n").trim();
}

async function generateWithOpenAI(requestObject: RequestObject): Promise<StructuredChatResult> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured");
  }

  const model = process.env.OPENAI_TEST_CHAT_MODEL || "gpt-4.1";

  const schema = {
    type: "object",
    additionalProperties: false,
    properties: {
      synthesisObject: {
        type: "object",
        additionalProperties: false,
        properties: {
          whatMayBeHappeningForUser: { type: "string" },
          whatMayBeHappeningForOtherPerson: { type: "string" },
          dynamicPattern: { type: "string" },
          timingSuggestion: { type: "string" },
          usefulResponseType: {
            type: "array",
            items: { type: "string" },
          },
          safety: {
            type: "object",
            additionalProperties: false,
            properties: {
              nonDiagnostic: { type: "boolean" },
              uncertaintyLevel: {
                type: "string",
                enum: ["low", "medium", "high"],
              },
            },
            required: ["nonDiagnostic", "uncertaintyLevel"],
          },
        },
        required: [
          "whatMayBeHappeningForUser",
          "whatMayBeHappeningForOtherPerson",
          "dynamicPattern",
          "timingSuggestion",
          "usefulResponseType",
          "safety",
        ],
      },
      userFacingResponse: { type: "string" },
    },
    required: ["synthesisObject", "userFacingResponse"],
  };

  const developerPrompt = [
    "You are generating structured relational guidance for Defrag test chat.",
    "Be calm, emotionally grounded, non-diagnostic, and uncertainty-aware.",
    "Do not use framework jargon.",
    "Focus on relational understanding, timing, phrasing, and user agency.",
    "The final userFacingResponse should be plain-language and practical.",
  ].join(" ");

  const input = [
    {
      role: "developer",
      content: [{ type: "input_text", text: developerPrompt }],
    },
    {
      role: "user",
      content: [
        {
          type: "input_text",
          text: `Return JSON matching the schema. Request object:\n${JSON.stringify(requestObject, null, 2)}`,
        },
      ],
    },
  ];

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      input,
      text: {
        format: {
          type: "json_schema",
          name: "defrag_test_chat_result",
          strict: true,
          schema,
        },
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI request failed: ${response.status} ${errorText}`);
  }

  const payload = await response.json();
  const jsonText = extractResponseText(payload);
  const parsed = JSON.parse(jsonText) as {
    synthesisObject: SynthesisObject;
    userFacingResponse: string;
  };

  return {
    requestObject,
    synthesisObject: parsed.synthesisObject,
    userFacingResponse: parsed.userFacingResponse,
    model,
    provider: "openai",
  };
}

function buildFallbackResult(requestObject: RequestObject): StructuredChatResult {
  const synthesisObject = buildFallbackSynthesisObject(requestObject);

  return {
    requestObject,
    synthesisObject,
    userFacingResponse: buildFallbackUserFacingResponse(requestObject, synthesisObject),
    model: "local-fallback",
    provider: "local_fallback",
  };
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const message = typeof body?.message === "string" ? body.message.trim() : "";

  if (!message) {
    return NextResponse.json({ error: "Missing message" }, { status: 400 });
  }

  const requestObject = buildRequestObject(message);

  try {
    const result = await generateWithOpenAI(requestObject);
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    const fallback = buildFallbackResult(requestObject);
    return NextResponse.json({
      ok: true,
      ...fallback,
      warning: error instanceof Error ? error.message : "OpenAI generation failed; returned fallback result.",
    });
  }
}
