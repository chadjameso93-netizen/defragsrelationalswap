# Vercel Project Map

## Project Identity
- **Team / Org:** `defragapp` (via ID `team_rcvZq3Q1TI9DBdow2aaTCbut`)
- **Project Name:** `v0-defrag-app`
- **Dashboard Path:** `https://vercel.com/defragapp/v0-defrag-app`

## Domains
- **Production URL:** `https://defrag.app`
- **Preview URLs:** Inherited automatically by `v0-defrag-app-*.vercel.app` on PRs and branched deployments.

## Environment Variable Discrepancies
### Stripe & Billing Envs
- **Production:** Fully populated (2d ago) including `STRIPE_PRICE_CORE`, `STRIPE_PRICE_STUDIO`, `STRIPE_PRICE_REALTIME`, and `STRIPE_WEBHOOK_SECRET`.
- **Preview & Development:** Contains basic `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (12d ago), but **lacks all specific price IDs and the webhook secret.** 

### `NEXT_PUBLIC_PREVIEW_MODE`
- This is not currently injected into either Production or Preview environments globally by Vercel.

## Actionable Requirements
1. The Vercel dashboard must be updated to include the test-mode Price IDs (`STRIPE_PRICE_CORE`, `STRIPE_PRICE_STUDIO`, `STRIPE_PRICE_REALTIME`) in the **Preview / Development** environments. Without these, the billing portal and checkout loop will instantly fail when validating new flows in staging.
2. The `STRIPE_WEBHOOK_SECRET` from the Stripe test dashboard must be added to the **Preview / Development** environment scoping.
