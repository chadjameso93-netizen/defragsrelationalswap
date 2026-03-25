# Preview Mode Matrix

DEFRAG's `/preview` QA hub enables rigorous validation of user interfaces, entitlement logic, and OpenAPI surfaces without interacting with real transactional persistence boundaries.

## Activation
Preview mode is triggered exclusively via two seams (which are disabled in nominal production flows):
- Environment Variable: `NEXT_PUBLIC_PREVIEW_MODE=1`
- Server action cookie override: visiting `/preview` and selecting a mock tier.

## Supported Feature Flags
When activated via cookie `__defrag_preview`:
- `getAuthenticatedUserOrNull()` injects the deterministic user: `preview-user-{tier}`
- `getBillingAccount()` intercepts `preview-user-*` lookups and conditionally yields full mock Stripe customer records mapped to active Premium cycles.
  - E.g. A cookie value of `studio` forces `canUseInsights: true` and `canUseDynamicsPremiumView: true`.

## Limitations
- Actual Stripe checkout URLs are not spawned using the preview user in the frontend (the session IDs are strictly mocked strings).
- Database insertions performed by the preview user (like threads) *will* save to `companion_threads` via Supabase with `user_id = preview-user-*`, but they act transactionally like standard anonymous trials.

## Launch Security
This mechanism utilizes the absolute lowest-conflict perimeter. Because it intercepts Auth at the `server/auth.ts` level, no downstream API endpoints, components, or services had to be rewritten to handle "is this a preview". The system organically treats the QA process under maximum realism.
