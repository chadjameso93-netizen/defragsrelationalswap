# DEFRAG

DEFRAG is a single consumer web product deployed from this repository.
It helps people understand relationship dynamics, notice repeating patterns between people, and decide what to do next without diagnosing or labeling anyone.

## Canonical app

- The only consumer-facing app in this repo is `apps/web`.
- The canonical production domains are `defrag.app` and `www.defrag.app`.
- The canonical Vercel project is the repo-root project that serves those domains.
- Vercel PR previews are the only preview deployment system.
- The MCP / ChatGPT app is a separate Vercel project rooted at `apps/defrag-chatgpt-app` and should be aliased to `mcp.defrag.app`.

Do not use any nested or legacy Vercel project linked from `apps/web`.

## Current product surfaces

Consumer routes in the canonical app:

- `/`
- `/about`
- `/login`
- `/onboarding`
- `/companion`
- `/world`
- `/account`
- `/account/insights`
- `/account/billing`
- `/terms`
- `/privacy`

Internal product APIs in the same app:

- `/api/companion/insights`
- `/api/companion/actions`
- `/api/insights`
- `/api/insights/simulate`
- `/api/world/interpret`
- `/api/stripe/checkout`
- `/api/stripe/portal`
- `/api/stripe/webhook`

Route behavior today:

- `/` and `/login` are public
- `/about`, `/terms`, and `/privacy` are public trust/legal surfaces
- `/onboarding` is part of the authenticated account flow
- `/companion`, `/world`, `/account`, `/account/insights`, and `/account/billing` render public previews when signed out and private/account-linked behavior when signed in

## Monorepo layout

- `apps/web`: canonical Next.js app
- `packages/core`: shared product contracts and types
- `packages/billing`: shared plan, entitlement, and Stripe mapping logic
- `packages/platform`: future tool contracts, registry, auth/display/state metadata, and examples
- `packages/platform-server`: reusable server-safe orchestration for future tool surfaces
- `packages/reasoning`: shared reasoning engines used by both the website and the local MCP app
- `packages/schemas`: JSON schemas used for structured-output alignment
- `apps/defrag-chatgpt-app`: MCP app for ChatGPT private preview, deployed as a separate Vercel project
- `supabase/migrations`: database schema and data-flow migrations
- `docs`: product, architecture, and operator documentation

There is no `apps/api` service in the current repo.

## Local development

```bash
cd /Users/cjo/Documents/defragsrelationalswap
cp apps/web/.env.local.example apps/web/.env.local
pnpm install
pnpm dev
```

Local app:

```bash
http://localhost:3001
```

Validation:

```bash
pnpm test
pnpm typecheck
pnpm build
pnpm --dir apps/defrag-chatgpt-app build:web
pnpm --dir apps/defrag-chatgpt-app typecheck
```

## Environment contract

Local development uses:

```bash
apps/web/.env.local
```

The repo-root `.env.local` is reference-only and is not the canonical local runtime file.

### Required for local, preview, and production

```env
NEXT_PUBLIC_APP_URL=...
DEFRAG_MCP_APP_URL=...
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
STRIPE_SECRET_KEY=...
STRIPE_PRICE_CORE=...
STRIPE_PRICE_STUDIO=...
STRIPE_PRICE_REALTIME=...
STRIPE_WEBHOOK_SECRET=...
```

### Optional now

```env
DEFRAG_REASONING_PROVIDER=heuristic
OPENAI_API_KEY=
DEFRAG_OPENAI_MODEL=gpt-4.1-mini
DEFRAG_ENABLE_MODEL_GENERATION=false
```

### Preview environments

Preview deployments must have the same base Supabase and Stripe variables as production if you expect preview routes to function end-to-end.

If Preview does not have those values set, preview deployments should be treated as partial UI previews only.

## Supabase

The current app depends on these tables and flows:

- `profiles`
- `billing_accounts`
- `subscriptions`
- `processed_webhook_events`
- `companion_threads`
- `companion_insights`
- `companion_follow_up_actions`
- `insight_reads`

Apply migrations with the Supabase CLI or the Supabase dashboard SQL runner.

## Stripe

Webhook route:

```bash
POST /api/stripe/webhook
```

Local forwarding:

```bash
stripe listen --forward-to localhost:3001/api/stripe/webhook
```

## Deployment contract

Canonical deployment truth:

1. GitHub is the source of truth for code.
2. Vercel Git integration is the canonical deployment system.
3. The main website project root is the repo root.
4. `vercel.json` is the checked-in deployment contract.
5. `defrag.app` and `www.defrag.app` must point only to the canonical Vercel project.
6. The MCP project root is `apps/defrag-chatgpt-app`.
7. `mcp.defrag.app` must point only to the separate MCP Vercel project rooted at `apps/defrag-chatgpt-app`.

Do not:

- deploy from `apps/web` to a separate project
- keep multiple Vercel projects in active use for the same consumer app
- treat GitHub Actions as the canonical production deployment path

See:

- [`docs/ARCHITECTURE.md`](/Users/cjo/Documents/defragsrelationalswap/docs/ARCHITECTURE.md)
- [`docs/OPERATOR_VERCEL_RUNBOOK.md`](/Users/cjo/Documents/defragsrelationalswap/docs/OPERATOR_VERCEL_RUNBOOK.md)
- [`docs/CHATGPT_PLATFORM_BOUNDARY.md`](/Users/cjo/Documents/defragsrelationalswap/docs/CHATGPT_PLATFORM_BOUNDARY.md)
- [`docs/CHATGPT_DEVELOPER_MODE_RUNBOOK.md`](/Users/cjo/Documents/defragsrelationalswap/docs/CHATGPT_DEVELOPER_MODE_RUNBOOK.md)
- [`docs/CHATGPT_PRIVATE_PREVIEW_READINESS.md`](/Users/cjo/Documents/defragsrelationalswap/docs/CHATGPT_PRIVATE_PREVIEW_READINESS.md)
- [`docs/CHATGPT_PRODUCTION_GAPS.md`](/Users/cjo/Documents/defragsrelationalswap/docs/CHATGPT_PRODUCTION_GAPS.md)

## Future ChatGPT/OpenAI-compatible integration

The current DEFRAG product is the website in `apps/web`.

Any future ChatGPT/OpenAI-compatible integration must be a separate app surface, for example:

- `apps/defrag-chatgpt-app`

The MCP service project lives there for developer mode and private preview. It should reuse:

- `packages/core`
- `packages/billing`
- `packages/platform`
- `packages/reasoning`
- `packages/platform-server`
- `packages/schemas`
- platform capabilities already exposed by Supabase, Stripe, and shared reasoning logic

It should not replace the website or become a second consumer website.
For private preview, deploy it as a separate Vercel project and alias it to `mcp.defrag.app`.

It must not import page components, route handlers, or server internals from `apps/web`.
