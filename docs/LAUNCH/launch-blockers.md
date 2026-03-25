# Launch Blockers

| ID | Title | Severity | Surface | Owner | Reproduction | Expected Behavior | Current Behavior | Fix Commit | Status |
|---|---|---|---|---|---|---|---|---|---|
| B01 | Missing Webhook & Price Envs in Staging | High | Billing / Deployment | Operator/Vercel | Launch Vercel Preview deployment, trigger `useCheckout` for any core/studio plan. | Staging initializes checkout using test-mode Stripe keys. Webhook verifies test-mode payment correctly. | Vercel Preview environment missing `STRIPE_PRICE_*` IDs and `STRIPE_WEBHOOK_SECRET`. | - | Untriaged |
| B02 | Preview Mode Missing | High | QA / Shell | Antigravity | Hit `/preview` directly or append `?preview=1` | A unified QA hub appears allowing mock overrides of auth and billing without real Stripe checkout. | Path 404s. `AppShell` lacks preview state mutations. | - | In Progress |
| B03 | Unfinished MCP/Chat Surfaces | Medium | Chat Handoff | Antigravity | Check usage of AI entrypoints on `/dynamics` and ChatGPT widget layer | All AI paths route to one shared prompt/response standard | Still assessing scope of divergence and unfinished artifacts | - | Pending Audit |
