# DEFRAG ChatGPT MCP app

This app is the separate DEFRAG MCP service project for ChatGPT and related integrations.

It is private-preview ready, not public-launch ready.
It does not replace the canonical website in `apps/web`.
It is not a second consumer-facing website.

## What it contains

- a local MCP server in `server/src/index.ts`
- real MCP tool descriptors wired from shared DEFRAG contracts
- inline-first widget resources served as `text/html;profile=mcp-app`
- real website-owned OAuth linking endpoints on `defrag.app`
- golden prompt assets and metadata tests
- a separate Vercel-project private-preview deployment target for `mcp.defrag.app`

## Install and run

From the repo root:

```bash
pnpm install
pnpm --dir apps/defrag-chatgpt-app build:web
pnpm --dir apps/defrag-chatgpt-app validate:tools
pnpm --dir apps/defrag-chatgpt-app typecheck
pnpm --dir apps/defrag-chatgpt-app dev
```

Default local endpoint:

```bash
http://127.0.0.1:3011/mcp
```

## Private-preview deployment target

See:

- `apps/defrag-chatgpt-app/vercel.json`
- `apps/defrag-chatgpt-app/.env.vercel.preview.example`

Vercel project root for the MCP service:

- `apps/defrag-chatgpt-app`

Canonical website Vercel project root:

- repo root for `defrag.app`

## Optional local auth mode

Bearer auth can be enabled for local testing:

```bash
DEFRAG_MCP_ENFORCE_BEARER=true pnpm --dir apps/defrag-chatgpt-app dev
```

Demo bearer tokens map to local demo accounts:

- `dev-user_123`
- `dev-core_user`
- `dev-free_user`
- `dev-relink_user`

## Widget assets

Build widget HTML assets:

```bash
pnpm --dir apps/defrag-chatgpt-app build:web
```

Generated files are written to:

- `apps/defrag-chatgpt-app/web/dist/*`

## Developer-mode runbook

See:

- [`docs/CHATGPT_DEVELOPER_MODE_RUNBOOK.md`](/Users/cjo/Documents/defragsrelationalswap/docs/CHATGPT_DEVELOPER_MODE_RUNBOOK.md)
- [`docs/CHATGPT_PRIVATE_PREVIEW_READINESS.md`](/Users/cjo/Documents/defragsrelationalswap/docs/CHATGPT_PRIVATE_PREVIEW_READINESS.md)
- [`docs/CHATGPT_PRODUCTION_GAPS.md`](/Users/cjo/Documents/defragsrelationalswap/docs/CHATGPT_PRODUCTION_GAPS.md)

## What is intentionally stubbed

- public-launch deployment hardening
- production connector submission
- fullscreen workflows
- any website-like account shell inside ChatGPT

## Do not build this wrong

- Do not import `apps/web` page components into this app.
- Do not let future tool code depend on `apps/web` internals.
- Do not move billing ownership away from `defrag.app`.
- Do not create a second production truth.
- Do not fake Apps SDK readiness without a real MCP server, real tool descriptors, and real widget resources.
- Do not overstuff `structuredContent`.
- Do not use fullscreen to recreate the website.
