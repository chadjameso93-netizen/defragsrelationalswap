# DEFRAG Future ChatGPT / OpenAI Integration Boundary

## Purpose

This document defines what a future ChatGPT-compatible DEFRAG app should reuse, what should remain owned by the website, and what should never be built as a second consumer product.

## What stays website-only now

- marketing and homepage framing
- onboarding flow
- account shell
- billing page
- Stripe checkout
- Stripe customer portal
- canonical subscription management
- deep preview/public route behavior

These are owned by `apps/web` and `defrag.app`.

## What is reusable platform capability

- shared contracts in `packages/core`
- billing plans, entitlements, and Stripe plan mapping in `packages/billing`
- structured schemas in `packages/schemas`
- tool catalog and future tool IO contracts in `packages/platform`
- server-side reasoning and orchestration through service boundaries in:
  - `apps/web/src/server/services/companion-service.ts`
  - `apps/web/src/server/services/insight-service.ts`
  - `apps/web/src/server/services/world-service.ts`
  - `apps/web/src/server/services/billing-service.ts`

## Likely future ChatGPT tools

### `get_companion_guidance`

- purpose: generate grounded guidance for one relational moment
- inputs: situation text, optional recent events, optional corrections, optional thread context
- outputs: structured guidance summary, supporting reasoning, suggested next moves, thread reference
- auth: required
- entitlement: `core`
- primary display mode: inline card
- deeper mode later: fullscreen
- canonical website backlink: `/companion`

### `generate_relationship_insight`

- purpose: generate a structured relationship insight and optional simulations for one request
- inputs: request text
- outputs: insight summary, structured synthesis, proof/context, optional simulation branches
- auth: required
- entitlement: `studio`
- primary display mode: inline card
- deeper mode later: fullscreen
- canonical website backlink: `/account/insights`

### `interpret_world_signal`

- purpose: interpret a relational field scene and return charge, timing, and stabilization guidance
- inputs: world scene graph with nodes and edges
- outputs: dominant pattern, pressure, repair window, node notes, strongest edge, next moves
- auth: required
- entitlement: `core`
- primary display mode: inline card
- deeper mode later: fullscreen
- canonical website backlink: `/world`

### `get_account_entitlements`

- purpose: return current plan, billing status, and entitlement flags
- inputs: none beyond authenticated account context
- outputs: plan, status, entitlement booleans
- auth: required
- entitlement: none
- primary display mode: inline card
- deeper mode later: none
- canonical website backlink: `/account/billing`

### `begin_upgrade_checkout`

- purpose: begin the canonical paid upgrade flow without moving billing ownership out of DEFRAG
- inputs: selected plan and optional success/cancel return URLs
- outputs: checkout session id and DEFRAG-owned checkout URL
- auth: required
- entitlement: none
- primary display mode: website redirect only
- canonical website backlink: `/account/billing`

### `open_billing_portal`

- purpose: open the canonical Stripe billing portal for the signed-in DEFRAG account
- inputs: optional return URL
- outputs: DEFRAG-owned billing portal URL
- auth: required
- entitlement: none
- primary display mode: website redirect only
- canonical website backlink: `/account/billing`

## Website-only surfaces for now

These should not be exposed as ChatGPT tools in the first pass:

- homepage marketing
- login and onboarding UI
- full account shell navigation
- deep billing management UI
- full preview/public browsing behavior

## Display-mode guidance

Future ChatGPT UX should start inline.

Use inline first for:

- short structured guidance
- entitlement summaries
- concise insight cards
- compact field interpretations

Use fullscreen only for:

- multi-step refinement
- richer evidence panels
- longer guided workflows

Do not use fullscreen to recreate the whole website.

## Auth and account-linking direction

High-level expectation:

- website remains canonical for account creation and management
- future ChatGPT integration should link to an existing DEFRAG account
- entitlements remain canonical on DEFRAG infrastructure
- ChatGPT-facing tools should read entitlement state, not own it

## Billing ownership

Canonical billing ownership remains on `defrag.app`.

Even if a future ChatGPT app can initiate upgrade intent, the actual checkout handoff should resolve to DEFRAG-owned billing infrastructure unless an approved native monetization path is intentionally adopted later.

## Do not build this wrong

- Do not port the full website into ChatGPT.
- Do not create multiple production truths.
- Do not move canonical billing ownership away from `defrag.app`.
- Do not claim Apps SDK readiness before a real ChatGPT app surface, tool server, auth boundary, and deploy path exist.
- Do not couple future tool contracts directly to page components.

## Optional future app location

If a future ChatGPT app is created, place it separately, for example:

- `apps/defrag-chatgpt-app`

That future app should be documentation- and contract-led first, not UI-clone-led.
