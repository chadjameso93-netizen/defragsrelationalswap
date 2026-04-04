# DEFRAG Vercel Realignment Runbook

## Goal

Keep one canonical Vercel project serving the DEFRAG consumer app.

## Canonical project

The only production project that should serve DEFRAG is the repo-root Vercel project that owns:

- `defrag.app`
- `www.defrag.app`

## Identify the canonical project

From the repo root:

```bash
vercel inspect defrag.app
```

Verify:

- project name matches the intended production project
- target is `production`
- aliases include `defrag.app` and `www.defrag.app`

## Legacy project risk

This repo has historically also been linked from `apps/web` to a separate Vercel project.

That nested link must not be used as an active deployment path for the consumer app.

If a nested `apps/web/.vercel/project.json` exists locally:

- treat it as legacy
- do not deploy from `apps/web`
- do not map production domains to that project

## Preview and production env vars

Preview and Production should both set, at minimum:

- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_PRICE_CORE`
- `STRIPE_PRICE_STUDIO`
- `STRIPE_PRICE_REALTIME`
- `STRIPE_WEBHOOK_SECRET`

Optional:

- `DEFRAG_REASONING_PROVIDER`
- `OPENAI_API_KEY`
- `DEFRAG_OPENAI_MODEL`
- `DEFRAG_ENABLE_MODEL_GENERATION`

If Preview does not have the same base envs as Production, treat Preview as partial only.

## Canonical deployment path

The only approved deployment path is:

1. push to GitHub
2. let Vercel Git integration create preview or production deploys from repo root

Manual CLI deploys should be reserved for recovery or explicit operator action.

## Production verification after redeploy

1. Confirm the deployment is READY:

```bash
vercel inspect defrag.app
```

2. Confirm aliases:

- `defrag.app`
- `www.defrag.app`

3. Verify the canonical routes:

- `/`
- `/login`
- `/dynamics`
- `/world`
- `/account`
- `/account/insights`
- `/account/billing`
- `/onboarding`

4. Verify billing and auth sanity:

- login renders
- signed-in account pages load
- checkout route responds
- portal route responds

## What should never be done again

- Do not keep multiple Vercel projects in active use for the same consumer product.
- Do not deploy the consumer app from `apps/web` to a separate production project.
- Do not treat GitHub Actions as the canonical production deployment system.
- Do not leave Preview envs half-configured and then treat preview behavior as authoritative.
- Do not let docs describe a different deployment architecture than the code and Vercel project actually use.
