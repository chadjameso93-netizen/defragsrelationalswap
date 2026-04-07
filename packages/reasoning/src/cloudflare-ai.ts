// Cloudflare Workers AI adapter for @defrag/reasoning
// Mirrors the StructuredOutputRequest contract used by openai-responses.ts
// and routes to the Cloudflare AI REST API when provider === "cloudflare".

export interface CloudflareAIRequest {
  name: string;
  instructions: string;
  request: string;
  schema: Record<string, unknown>;
  accountId?: string;
  apiToken?: string;
  model?: string;
  provider?: "openai" | "heuristic" | "cloudflare";
  enableModelGeneration?: boolean;
}

// Default model – llama-3.1-8b-instruct is widely available on Workers AI
// and supports JSON mode. Swap for @cf/meta/llama-3.3-70b-instruct-fp8-fast
// if you need higher quality reasoning.
export const CLOUDFLARE_AI_DEFAULT_MODEL =
  "@cf/meta/llama-3.1-8b-instruct";

/** Build the Cloudflare AI REST endpoint for a given account + model. */
export function buildCloudflareAIUrl(
  accountId: string,
  model: string = CLOUDFLARE_AI_DEFAULT_MODEL
): string {
  return `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${model}`;
}

/** Returns true when the config is wired up to use Cloudflare AI. */
export function canUseCloudflareAI(
  config: Pick<CloudflareAIRequest, "provider" | "accountId" | "apiToken" | "enableModelGeneration">
): boolean {
  const provider = resolveCloudflareProvider(config);
  return (
    provider === "cloudflare" &&
    Boolean(config.accountId) &&
    Boolean(config.apiToken)
  );
}

/** Resolve which provider to use, parallel to getReasoningProvider in openai-responses.ts. */
export function resolveCloudflareProvider(
  config?: Pick<CloudflareAIRequest, "provider" | "enableModelGeneration">
): string {
  const provider = config?.provider?.trim().toLowerCase();
  if (provider === "cloudflare") return "cloudflare";
  // Fall back to the existing heuristic when no explicit provider is set
  return config?.enableModelGeneration ? "openai" : "heuristic";
}

interface CloudflareAIMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface CloudflareAIResponseResult {
  response?: string;
}

interface CloudflareAIResponse {
  success: boolean;
  result?: CloudflareAIResponseResult;
  errors?: { message: string }[];
}

/**
 * Send a structured-output request to Cloudflare Workers AI.
 *
 * The adapter:
 *  1. Builds a system prompt that instructs the model to reply with JSON
 *     matching the provided schema.
 *  2. POSTs to the Cloudflare AI REST API.
 *  3. Parses + returns the typed result, or null when the response is empty.
 *
 * Schema enforcement is prompt-based (Cloudflare AI does not yet expose
 * an OpenAI-style `response_format` / `json_schema` field on all models).
 */
export async function requestCloudflareAIOutput<T>(
  config: CloudflareAIRequest
): Promise<T | null> {
  const {
    name,
    instructions,
    request,
    schema,
    accountId,
    apiToken,
    model,
    provider,
    enableModelGeneration,
  } = config;

  if (!canUseCloudflareAI({ provider, accountId, apiToken, enableModelGeneration })) {
    return null;
  }

  const resolvedModel = model || CLOUDFLARE_AI_DEFAULT_MODEL;
  const url = buildCloudflareAIUrl(accountId!, resolvedModel);

  const schemaHint = JSON.stringify(schema, null, 2);
  const systemPrompt = [
    instructions,
    "",
    `You MUST reply with a single JSON object that strictly matches the following JSON Schema (schema name: "${name}"). Do not include any explanation or markdown — only the raw JSON object.`,
    "",
    "JSON Schema:",
    schemaHint,
  ].join("\n");

  const messages: CloudflareAIMessage[] = [
    { role: "system", content: systemPrompt },
    { role: "user", content: request },
  ];

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messages }),
  });

  if (!response.ok) {
    throw new Error(`cloudflare_ai_failed:${response.status}`);
  }

  const body = (await response.json()) as CloudflareAIResponse;

  if (!body.success) {
    const errMsg = body.errors?.map((e) => e.message).join(", ") ?? "unknown";
    throw new Error(`cloudflare_ai_error:${errMsg}`);
  }

  const raw = body.result?.response?.trim();
  if (!raw) return null;

  // Strip markdown code fences if the model wraps output in ```json ... ```
  const cleaned = raw
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();

  return JSON.parse(cleaned) as T;
}
