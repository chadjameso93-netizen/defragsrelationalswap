# DEFRAG Launch Blockers

| ID | Priority | Surface | Issue Summary | Status |
|---|---|---|---|---|
| B01 | **P0** | Vercel Deployment | Staging/Preview environments lack the necessary Stripe Price IDs (`STRIPE_PRICE_CORE`, etc.) and `STRIPE_WEBHOOK_SECRET` causing billing flows to crash outside of `/preview`. | Active |
| B02 | **P0** | Brand & Public Copy | The public app shell, billing, login, and homepages were leaking internal SaaS architectural labels ("auth boundary", "preview mode") and generic SaaS UI styles. | **Fixed** |
| B03 | **P1** | AI Surface Exposure | The legacy `/account/insights` surface and `/world` surface were exposed publicly but do not strictly conform to the primary stable `/dynamics` reasoning contract. | **Fixed** (Hidden from brand nav) |

## Change Log
- **2026-03:** Enforced the strict "Defrag Worldview" rule across `apps/web/src/app` (pages: `login`, `onboarding`, `account`, `account/billing`, `dynamics`, `about`, `layout`, `app-shell`). Stripped all generic SaaS branding and "pillowy" card interfaces to 2-4px tight structural radii. Banned terms (Companion, World, Preview Mode) purged from public entry points.
