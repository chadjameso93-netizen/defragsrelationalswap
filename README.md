# DEFRAG

DEFRAG is a relational reasoning system with two initial product surfaces:
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
# from repo root
pnpm install
pnpm dev
```

Alternative explicit app command:

```bash
pnpm --dir apps/web dev
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

Copy and fill `.env.example`:

```bash
cp .env.example .env.local
```

### Required now
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_CORE`
- `STRIPE_PRICE_STUDIO`
- `STRIPE_PRICE_REALTIME`

### Optional now
- `DEFRAG_ENABLE_MODEL_GENERATION` (`false` by default)

### Future placeholders
- `STRIPE_PRICE_PROFESSIONAL`
- `STRIPE_PRICE_TEAM`
- `STRIPE_PRICE_API`
- `STRIPE_PRICE_ENTERPRISE`

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
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Then copy the printed webhook signing secret into:
- `STRIPE_WEBHOOK_SECRET`

---

## 5) Vercel deployment path

1. Import repo into Vercel.
2. Set **Root Directory** to `apps/web`.
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
