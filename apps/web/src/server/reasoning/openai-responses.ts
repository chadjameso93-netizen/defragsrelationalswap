interface StructuredOutputRequest {
  name: string;
  instructions: string;
  request: string;
  schema: Record<string, unknown>;
}

interface OpenAIResponseContent {
  type?: string;
  text?: string;
  refusal?: string;
}

interface OpenAIResponseItem {
  content?: OpenAIResponseContent[];
}

interface OpenAIResponsesPayload {
  output?: OpenAIResponseItem[];
  output_text?: string;
}

const OPENAI_RESPONSES_URL = "https://api.openai.com/v1/responses";

export function getReasoningProvider() {
  const provider = process.env.DEFRAG_REASONING_PROVIDER?.trim().toLowerCase();
  if (provider === "openai" || provider === "heuristic") {
    return provider;
  }

  return process.env.DEFRAG_ENABLE_MODEL_GENERATION === "true" ? "openai" : "heuristic";
}

export function canUseOpenAIReasoning() {
  return getReasoningProvider() === "openai" && Boolean(process.env.OPENAI_API_KEY);
}

export class OpenAIRefusalError extends Error {
  constructor() {
    super("openai_refusal");
  }
}

export async function requestStructuredOutput<T>({
  name,
  instructions,
  request,
  schema,
}: StructuredOutputRequest): Promise<T | null> {
  if (!canUseOpenAIReasoning()) {
    return null;
  }

  const response = await fetch(OPENAI_RESPONSES_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.DEFRAG_OPENAI_MODEL || "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content: [{ type: "input_text", text: instructions }],
        },
        {
          role: "user",
          content: [{ type: "input_text", text: request }],
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name,
          strict: true,
          schema,
        },
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`openai_responses_failed:${response.status}`);
  }

  const body = (await response.json()) as OpenAIResponsesPayload;
  const refusalDetected = body.output?.some((item) =>
    item.content?.some((content) => content.type === "refusal" || Boolean(content.refusal)),
  );

  if (refusalDetected) {
    throw new OpenAIRefusalError();
  }

  const outputText = body.output_text?.trim();
  if (!outputText) {
    return null;
  }

  return JSON.parse(outputText) as T;
}
