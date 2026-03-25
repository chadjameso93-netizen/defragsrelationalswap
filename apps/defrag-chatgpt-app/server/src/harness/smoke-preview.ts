import { getPreviewAuthEnv } from "../auth/env";

async function fetchJson(url: string, init?: RequestInit) {
  const response = await fetch(url, init);
  const text = await response.text();
  let json: unknown = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = text;
  }
  return { status: response.status, json, headers: response.headers };
}

async function main() {
  const env = getPreviewAuthEnv();
  const base = env.mcpBaseUrl;

  const health = await fetchJson(`${base}/health`);
  const ready = await fetchJson(`${base}/ready`);
  const metadata = await fetchJson(`${base}/.well-known/oauth-protected-resource/mcp`);
  const mcp = await fetch(`${base}/mcp`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ jsonrpc: "2.0", id: "ping", method: "ping", params: {} }) });

  console.log(
    JSON.stringify(
      {
        ok: health.status === 200 && ready.status === 200 && metadata.status === 200,
        checks: {
          health: health.status,
          readiness: ready.status,
          protectedResourceMetadata: metadata.status,
          mcpEndpoint: mcp.status,
        },
        expected: {
          health: 200,
          readiness: 200,
          protectedResourceMetadata: 200,
          mcpEndpoint: "reachable",
        },
      },
      null,
      2,
    ),
  );
}

await main();
