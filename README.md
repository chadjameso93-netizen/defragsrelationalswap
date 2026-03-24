# DEFRAG

DEFRAG is a relationship clarity product with two initial areas:
- **Companion** (`/companion`)
- **World alpha** (`/world`)

The repository preserves a shared architecture:
- `packages/core` for shared contracts/types
- `packages/billing` for plan/subscription/entitlement logic
- server-side Stripe + Supabase integration in `apps/web/src/server` and API routes

---

## 1) Local run commands (pnpm)

> Intended package manager: **pnpm**.

```bash
cd /Users/cjo/Documents/defragsrelationalswap
cp apps/web/.env.local.example apps/web/.env.local
pnpm install
pnpm dev
```

The local app runs at:

```bash
http://localhost:3001
```

Build/start:

```bash
pnpm build
pnpm start
```

Tests:

```bash
pnpm test
```

---

## 2) Environment variables

For local development, `pnpm dev` runs Next from `apps/web`, so env vars must live in:

```bash
apps/web/.env.local
```

The repo-root `.env.local` is not used for local run.

Example:

```env
# apps/web/.env.local
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

### Required now for local page load + Stripe checkout/portal
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_PRICE_CORE`
- `STRIPE_PRICE_STUDIO`
- `STRIPE_PRICE_REALTIME`

### Required later for local webhook sync
- `STRIPE_WEBHOOK_SECRET`

### Optional now
- `DEFRAG_REASONING_PROVIDER` (`heuristic` by default, `openai` to enable provider-backed insight generation)
- `OPENAI_API_KEY`
- `DEFRAG_OPENAI_MODEL`
- `DEFRAG_ENABLE_MODEL_GENERATION` (legacy compatibility flag)

### Future placeholders
- `STRIPE_PRICE_PROFESSIONAL`
- `STRIPE_PRICE_TEAM`
- `STRIPE_PRICE_API`
- `STRIPE_PRICE_ENTERPRISE`

Protected routes (`/companion`, `/account/billing`, `/world`) require:
1. valid Supabase env vars in `apps/web/.env.local`
2. Supabase migrations applied
3. a real Supabase auth user

---

## 3) Supabase migration/deploy commands

Apply migrations locally (Supabase CLI):

```bash
supabase db push
```

Or reset local DB and reapply migrations:

```bash
supabase db reset
```

This app depends on these tables/flows:
- `billing_accounts`
- `subscriptions`
- `processed_webhook_events`
- `companion_threads`
- `companion_insights`
- `companion_follow_up_actions`

---

## 4) Stripe local webhook testing

Webhook route:
- `POST /api/stripe/webhook`

Forward events to local app:

```bash
stripe listen --forward-to localhost:3001/api/stripe/webhook
```

Then copy the printed webhook signing secret into:
- `STRIPE_WEBHOOK_SECRET`

---

## 5) Vercel deployment path

1. Import repo into Vercel.
2. Keep **Root Directory** at the repo root and use the checked-in `vercel.json`.
3. Configure env vars (Preview + Production):
   - `NEXT_PUBLIC_APP_URL`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `STRIPE_PRICE_CORE`
   - `STRIPE_PRICE_STUDIO`
   - `STRIPE_PRICE_REALTIME`
   - optional: `DEFRAG_ENABLE_MODEL_GENERATION`
4. Deploy.
5. Configure Stripe webhook endpoint to:
   - `https://<your-domain>/api/stripe/webhook`

---

## 6) Required routes

- `/`
- `/companion`
- `/account/billing`
- `/world`
- `/api/stripe/checkout`
- `/api/stripe/portal`
- `/api/stripe/webhook`
- `/api/companion/insights`
- `/api/companion/actions`
- `/api/world/interpret`
