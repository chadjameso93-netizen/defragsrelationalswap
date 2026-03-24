# DEFRAG Architecture Contract

## Canonical app now

- `apps/web` is the only current consumer-facing product app.
- It contains both the Next.js UI routes and the internal route-handler APIs used by that UI.
- Shared product logic lives in `packages/*`.

## Canonical deployment path now

- GitHub is the source of truth for code.
- Vercel Git integration is the canonical preview and production deployment system.
- Repo root is the canonical Vercel deploy root.
- `vercel.json` defines the checked-in deployment contract.
- `defrag.app` and `www.defrag.app` must resolve only to the canonical Vercel project.

## Current platform layers

### Consumer web app

- `apps/web/src/app/*`
- `apps/web/src/components/*`

### Internal app APIs

- `apps/web/src/app/api/companion/*`
- `apps/web/src/app/api/insights/*`
- `apps/web/src/app/api/world/*`
- `apps/web/src/app/api/stripe/*`

### Shared contracts and business logic

- `packages/core`
- `packages/billing`
- `packages/schemas`

### Platform dependencies

- Supabase for auth and persistence
- Stripe for billing and subscription state
- Vercel for hosting and previews

## Future ChatGPT/OpenAI integration boundary

The future ChatGPT/OpenAI-compatible integration must be a separate app surface.

Suggested location:

- `apps/defrag-chatgpt-app`

That future app should reuse:

- shared contracts from `packages/core`
- schemas from `packages/schemas`
- billing and entitlement logic from `packages/billing`
- existing server-side reasoning capabilities where they can be safely exposed

It should not:

- replace `apps/web`
- become a second consumer website
- own the canonical billing or account shell

## What remains website-specific

- marketing and product framing
- auth/session handling tied to browser cookies
- account, onboarding, and billing pages
- Stripe checkout and portal handoff
- preview/public route behavior

## What is reusable later

- output contracts
- plan and entitlement logic
- schema definitions
- reasoning layers
- account-backed storage concepts

## Current honesty check

The repo is not currently Apps SDK-ready.

What exists today:

- one internal OpenAI Responses API helper for Insight Studio
- env-gated provider usage
- internal route handlers for the website

What does not exist today:

- ChatGPT app surface
- Apps SDK server
- MCP server
- tool manifest
- ChatGPT-facing auth/tool boundary
