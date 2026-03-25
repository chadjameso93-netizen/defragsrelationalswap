export interface StructuredOutputRequest {
  name: string;
  instructions: string;
  request: string;
  schema: Record<string, unknown>;
  apiKey?: string;
  model?: string;
  provider?: "openai" | "heuristic";
  enableModelGeneration?: boolean;
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

export function getReasoningProvider(config?: Pick<StructuredOutputRequest, "provider" | "enableModelGeneration">) {
  const provider = config?.provider?.trim().toLowerCase();
  if (provider === "openai" || provider === "heuristic") {
    return provider;
  }

  return config?.enableModelGeneration ? "openai" : "heuristic";
}

export function canUseOpenAIReasoning(config: Pick<StructuredOutputRequest, "provider" | "apiKey" | "enableModelGeneration">) {
  return getReasoningProvider(config) === "openai" && Boolean(config.apiKey);
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
  apiKey,
  model,
  provider,
  enableModelGeneration,
}: StructuredOutputRequest): Promise<T | null> {
  if (!canUseOpenAIReasoning({ provider, apiKey, enableModelGeneration })) {
    return null;
  }

  const response = await fetch(OPENAI_RESPONSES_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: model || "gpt-4.1-mini",
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
