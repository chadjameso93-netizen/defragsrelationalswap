# DEFRAG ChatGPT private-preview validation runbook

## Purpose

Use this runbook to validate the DEFRAG ChatGPT app in two environments:

- local developer mode
- deployed private-preview mode on the dedicated MCP host

The canonical consumer product remains the website on `defrag.app`.
DEFRAG guidance should stay grounded in relationship dynamics, pattern clarity, and next-step orientation rather than diagnosis or fixed labeling.

## Private-preview deployment target

Private preview is implemented as a separate Vercel project using:

- [vercel.json](/Users/cjo/Documents/defragsrelationalswap/apps/defrag-chatgpt-app/vercel.json)
- [.env.vercel.preview.example](/Users/cjo/Documents/defragsrelationalswap/apps/defrag-chatgpt-app/.env.vercel.preview.example)

Recommended Vercel project settings:

- Root Directory: `apps/defrag-chatgpt-app`
- Framework Preset: `Other`
- Install Command: `pnpm install --frozen-lockfile`
- Build Command: `pnpm --dir apps/defrag-chatgpt-app vercel-build`
- Output Directory: none

Expected deployed base URL:

- `https://mcp.defrag.app`

Expected deployed MCP endpoints:

- health: `https://mcp.defrag.app/health`
- readiness: `https://mcp.defrag.app/ready`
- MCP: `https://mcp.defrag.app/mcp`
- protected resource metadata: `https://mcp.defrag.app/.well-known/oauth-protected-resource/mcp`

## Exact private-preview environment setup

Set these secrets on the private-preview host:

- `DEFRAG_MCP_AUTH_MODE=preview`
- `DEFRAG_MCP_BASE_URL=https://mcp.defrag.app`
- `DEFRAG_CANONICAL_APP_URL=https://defrag.app`
- `DEFRAG_AUTH_BASE_URL=https://defrag.app`
- `DEFRAG_CHATGPT_AUTH_SECRET=<long random secret>`
- `DEFRAG_CHATGPT_RESOURCE_AUDIENCE=defrag-chatgpt-app`
- `DEFRAG_CHATGPT_ALLOWED_REDIRECT_ORIGINS=<approved ChatGPT redirect origins>`
- `NEXT_PUBLIC_SUPABASE_URL=<production Supabase URL>`
- `SUPABASE_SERVICE_ROLE_KEY=<production service role key>`
- `DEFRAG_MCP_RATE_LIMIT_REQUESTS=60`
- `DEFRAG_MCP_RATE_LIMIT_WINDOW_MS=60000`
- `DEFRAG_REASONING_PROVIDER=heuristic` or `openai`
- `OPENAI_API_KEY=<optional if OpenAI-backed preview is enabled>`
- `DEFRAG_OPENAI_MODEL=<optional>`

Set these DEFRAG website env vars on `apps/web`:

- `DEFRAG_CHATGPT_AUTH_SECRET=<same long random secret>`
- `DEFRAG_CHATGPT_RESOURCE_AUDIENCE=defrag-chatgpt-app`
- `DEFRAG_CHATGPT_ALLOWED_REDIRECT_ORIGINS=<same approved redirect origins>`
- `DEFRAG_CHATGPT_ACCESS_TOKEN_TTL_SECONDS=900`
- `DEFRAG_CHATGPT_REFRESH_TOKEN_TTL_SECONDS=2592000`
- `DEFRAG_CHATGPT_AUTH_CODE_TTL_SECONDS=300`

## Exact local startup steps

```bash
cd /Users/cjo/Documents/defragsrelationalswap
pnpm install
pnpm --dir apps/defrag-chatgpt-app build:web
pnpm --dir apps/defrag-chatgpt-app validate:tools
pnpm --dir apps/defrag-chatgpt-app typecheck
pnpm --dir apps/defrag-chatgpt-app dev
```

Expected local endpoints:

- `http://127.0.0.1:3011/health`
- `http://127.0.0.1:3011/ready`
- `http://127.0.0.1:3011/mcp`

## Exact local HTTPS / tunnel expectations

If ChatGPT developer mode requires HTTPS:

```bash
cloudflared tunnel --url http://127.0.0.1:3011
DEFRAG_MCP_BASE_URL=https://<subdomain>.trycloudflare.com pnpm --dir apps/defrag-chatgpt-app dev
```

## Exact connector metadata expectations

The connector must expose exactly these tools:

- `get_dynamics_guidance`
- `generate_relationship_insight`
- `interpret_world_signal`
- `get_account_entitlements`
- `begin_upgrade_checkout`
- `open_billing_portal`

The resource metadata must advertise:

- OAuth authorization endpoint on `https://defrag.app/api/chatgpt/oauth/authorize`
- OAuth token endpoint on `https://defrag.app/api/chatgpt/oauth/token`
- protected resource metadata on `https://mcp.defrag.app/.well-known/oauth-protected-resource/mcp`, not on `defrag.app`

## Exact auth-linking validation steps

1. Open the connector in ChatGPT developer mode.
2. Trigger any protected tool while unauthenticated.
3. Confirm `_meta["mcp/www_authenticate"]` is present.
4. Confirm the linking flow returns to `https://defrag.app/api/chatgpt/oauth/authorize`.
5. Sign in on `defrag.app` if required.
6. Confirm token exchange succeeds and the connector becomes linked.

Pass criteria:

- unauthenticated users are challenged, not silently failed
- DEFRAG website remains the canonical sign-in domain
- linked users return to the MCP connector with a valid token

## Exact entitlement validation steps

Run these user cases:

- entitled user → `generate_relationship_insight` succeeds
- free/unentitled user → `generate_relationship_insight` returns `upgrade_required`
- relink-required user → any protected tool returns `relink_required`

Pass criteria:

- entitlement checks are tool-specific
- upgrade-required states point back to `defrag.app/account/billing`
- relink-required states point back to `defrag.app/login`

## Exact tool validation sequence

### User-facing tools

- `Use DEFRAG to help me figure out what may be happening after a missed callback and tell me what to try next.`
  Expected tool: `get_dynamics_guidance`
  Expected outcome: grounded dynamics guidance with explicit uncertainty
- `Generate a DEFRAG relationship insight about a criticism-defensiveness loop.`
  Expected tool: `generate_relationship_insight`
  Expected outcome: observable pattern framing, not a personality label
- `Interpret this world signal in DEFRAG and tell me the repair window.`
  Expected tool: `interpret_world_signal`
  Expected outcome: timing and stabilization guidance, not certainty
- `What does my DEFRAG plan include right now?`
  Expected tool: `get_account_entitlements`

### Redirect tools

- `Upgrade my DEFRAG account.`
  Expected tool: `begin_upgrade_checkout`
  Expected redirect: `https://defrag.app/account/billing?upgrade=<plan>&source=chatgpt`
- `Open my DEFRAG billing portal.`
  Expected tool: `open_billing_portal`
  Expected redirect: `https://defrag.app/account/billing?source=chatgpt`

### Negative prompts

No DEFRAG tool should be chosen for:

- `Write a generic poem about spring.`
- `Debug my Next.js image optimization config.`
- `Tell me the capital of Belgium.`
- `Draft a meal plan for four days.`
- `Summarize the plot of Dune.`

## Exact widget rendering checks

For each successful user-facing tool:

- initial render is inline
- no more than two actions are visible
- no deep navigation appears inside the widget
- no widget reproduces the full website shell

Expected widget bindings:

- dynamics → `ui://defrag/dynamics-summary-card.html`
- insight → `ui://defrag/insight-summary-card.html`
- world → `ui://defrag/world-interpretation-card.html`
- entitlements → `ui://defrag/entitlement-status-card.html`
- redirect → `ui://defrag/redirect-cta-card.html`

## Exact local harness check

```bash
pnpm --dir apps/defrag-chatgpt-app validate:tools
```

Pass criteria:

- exits `0`
- prints `ok: true`
- prints widget bindings
- prints prompt coverage

## Pass/fail checklist

- `/health` returns `200`
- `/ready` returns `200` in preview with no missing envs
- connector metadata shows six tools
- auth challenge appears when unauthenticated
- linking lands on `defrag.app`
- entitled tools succeed for entitled users
- upgrade-required tools redirect to `defrag.app/account/billing`
- negative prompts do not invoke DEFRAG tools
- widgets stay inline-first and lightweight

## What remains deferred

- public-launch scale monitoring
- public-launch abuse controls beyond current rate limiting
- any fullscreen expansion
