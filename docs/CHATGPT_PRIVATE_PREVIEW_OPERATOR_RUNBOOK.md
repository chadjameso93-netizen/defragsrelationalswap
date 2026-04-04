# DEFRAG ChatGPT private-preview operator runbook

## Required accounts and services

- GitHub access to this repo
- Vercel access for `defrag.app`
- Vercel access for a separate MCP project rooted at `apps/defrag-chatgpt-app`
- Supabase production project access
- ChatGPT developer-mode access for connector validation

## Env vars on defrag.app

Set these on the canonical website deployment:

- `DEFRAG_CHATGPT_AUTH_SECRET`
- `DEFRAG_CHATGPT_RESOURCE_AUDIENCE`
- `DEFRAG_CHATGPT_ALLOWED_REDIRECT_ORIGINS`
- `DEFRAG_CHATGPT_ACCESS_TOKEN_TTL_SECONDS`
- `DEFRAG_CHATGPT_REFRESH_TOKEN_TTL_SECONDS`
- `DEFRAG_CHATGPT_AUTH_CODE_TTL_SECONDS`

These power:

- `/api/chatgpt/oauth/authorize`
- `/api/chatgpt/oauth/token`

## Env vars on the Vercel MCP project

Set these on the separate Vercel MCP project:

- `DEFRAG_MCP_AUTH_MODE=preview`
- `DEFRAG_MCP_BASE_URL=https://mcp.defrag.app`
- `DEFRAG_CANONICAL_APP_URL=https://defrag.app`
- `DEFRAG_AUTH_BASE_URL=https://defrag.app`
- `DEFRAG_CHATGPT_AUTH_SECRET`
- `DEFRAG_CHATGPT_RESOURCE_AUDIENCE`
- `DEFRAG_CHATGPT_ALLOWED_REDIRECT_ORIGINS`
- `DEFRAG_CHATGPT_ACCESS_TOKEN_TTL_SECONDS`
- `DEFRAG_CHATGPT_REFRESH_TOKEN_TTL_SECONDS`
- `DEFRAG_CHATGPT_AUTH_CODE_TTL_SECONDS`
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `DEFRAG_MCP_RATE_LIMIT_REQUESTS`
- `DEFRAG_MCP_RATE_LIMIT_WINDOW_MS`
- `DEFRAG_REASONING_PROVIDER`
- `OPENAI_API_KEY` if OpenAI-backed preview is enabled
- `DEFRAG_OPENAI_MODEL` if OpenAI-backed preview is enabled

## Deploy steps

In Vercel, create a second project from the same GitHub repo with:

- Root Directory: `apps/defrag-chatgpt-app`
- Framework Preset: `Other`
- Install Command: `pnpm install --frozen-lockfile`
- Build Command: `pnpm --dir apps/defrag-chatgpt-app vercel-build`
- Output Directory: unset

Then from the repo root:

```bash
pnpm install
pnpm --dir apps/defrag-chatgpt-app check:preview
pnpm --dir apps/defrag-chatgpt-app build
```

After the Vercel project is connected:

- assign `mcp.defrag.app` to the MCP project
- ensure the canonical website project keeps only `defrag.app` and `www.defrag.app`
- redeploy the MCP project after env vars are set

## DNS and base URL assumptions

- `defrag.app` remains canonical for identity and billing
- the MCP app is hosted on a separate Vercel project
- `mcp.defrag.app` is the private-preview MCP host
- the protected-resource metadata and `/mcp` endpoints resolve from `mcp.defrag.app`
- OAuth authorization and token exchange resolve from `defrag.app`
- the website may reference the MCP host through `DEFRAG_MCP_APP_URL`

## Post-deploy smoke checks

```bash
DEFRAG_MCP_BASE_URL=https://mcp.defrag.app pnpm --dir apps/defrag-chatgpt-app smoke:preview
```

Expected checks:

- `/health` returns `200`
- `/ready` returns `200`
- protected-resource metadata returns `200`
- `/mcp` is reachable

## ChatGPT connector setup

1. Open ChatGPT developer mode.
2. Add the connector using `https://mcp.defrag.app/mcp`.
3. Confirm the connector advertises six tools.
4. Trigger a protected tool and confirm linking redirects to `defrag.app`.

## Auth-linking validation

- unauthenticated tool use triggers `_meta["mcp/www_authenticate"]`
- sign-in occurs on `defrag.app`
- linked user returns with a valid token
- relink-required user is sent back to `defrag.app/login`

## Entitlement validation

- entitled account can run dynamics, insight, and world tools
- unentitled account gets `upgrade_required`
- billing tools redirect back to `defrag.app/account/billing`

## Redirect validation

- `begin_upgrade_checkout` points to `defrag.app/account/billing?...`
- `open_billing_portal` points to `defrag.app/account/billing?...`
- no billing ownership moves to the MCP host

## Rollback / disable procedure

- remove the `mcp.defrag.app` domain from the MCP Vercel project or disable the project
- remove the ChatGPT connector from developer mode
- if auth must be disabled immediately, remove `DEFRAG_CHATGPT_AUTH_SECRET` from the MCP Vercel project and redeploy
