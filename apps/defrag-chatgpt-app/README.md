# DEFRAG ChatGPT App Stub

This directory is reserved for a future ChatGPT/OpenAI-compatible DEFRAG integration.

It is intentionally documentation-only right now.

## Not deployable yet

There is no app implementation here.
Do not wire this directory into Vercel, CI, or production routing.

## Boundary

The future app should:

- reuse shared contracts from `packages/core`
- reuse billing and entitlement logic from `packages/billing`
- reuse schemas from `packages/schemas`
- reuse future tool contracts from `packages/platform`

The future app should not:

- clone the website
- replace `apps/web`
- own canonical billing or account management
