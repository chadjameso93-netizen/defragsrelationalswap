# Public Brand Surface Audit & Execution

**Status**: Green (Completed)
**Scope**: `apps/web/src/app`
**Objective**: Enforce hard-edged, premium structural design. Strip all internal architectural language, routing copy, and generic SaaS UI patterns. Bring the worldview ("See the relationship pattern before the moment hardens") forward.

## What was verified and altered
- **`app/page.tsx`**: Removed all infrastructure and integration boundary phrasing. Adopted the "structural intelligence" messaging with a focus on pattern recognition over "startup friendly" apps.
- **`app/about/page.tsx`**: Trashed architectural integration notes. Inserted the Canonical DEFRAG worldview—stating exactly what DEFRAG does and what it does not do (i.e. we do not diagnose or assign permanent labels).
- **`app/dynamics/page.tsx`**: The unauthenticated `Dynamics` preview removed "preview environment" terminology entirely and replaced it with value-prop language around "Analysis Tracing" and "Pattern Extraction."
- **`app/account/page.tsx`**: The logged-out "landscape" explanation was tightened to remove words like *Preview mode* and *auth boundary*. Renamed placeholder UI inputs. Removed linkages to the incomplete `/account/insights` directory in favor of the canonical `/dynamics` workflow.
- **`app/account/billing/page.tsx`**: Stripped "Stripe-backed rhythms" and internal subscription mechanics text. Repositioned as "Intelligence Architecture" provisioning nodes.
- **`app/login/page.tsx`** & **`app/onboarding/page.tsx`**: Replaced generic authentication messaging with "Perspective/Baseline initialization" and worldview alignment text.
- **`components/app-shell.tsx`**: Banned terms (Preview available, World, Integration logic) removed globally from navigation and footers.
- **`app/layout.tsx` (CSS Tokens)**: Pillowy SaaS UI has been destroyed. Reduced global radii from 16px/24px/9999px down to a sharp 2px/4px structural paneling.

## Remaining Blockers
- **B01 (Stripe Staging)**: Test environment requires the `STRIPE_PRICE_*` webhook and keys configured directly inside the active `v0-defrag-app` Vercel dashboard. (Pending sub-agent/execution).
