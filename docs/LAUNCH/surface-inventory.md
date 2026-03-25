# Surface Inventory

Log of all visible surfaces in the DEFRAG platform and their required launch action.

### Web Boundaries (`apps/web`)
* **`/` (Homepage):** Needs rewrite + visual token normalization.
* **`/login`:** Normalization complete. Needs preview toggles.
* **`/onboarding`:** Normalization complete. Needs preview toggles.
* **`/account`:** Normalization complete. Needs preview toggles.
* **`/world`:** Normalization complete. Needs preview toggles.
* **`/dynamics`:** Normalization complete (Companion to Dynamics done). Needs AI response audit.
* **`/account/insights`:** Copy updated. Needs to be inspected under AI testing pass.
* **`/account/billing`:** Needs structural pricing updates matching non-SaaS "infrastructure" guidelines. Needs Vercel Stripe fixes.
* **`AppShell` Preview Surfaces:** In progress. Needs `/preview` unified hub.

### Application Services & AI
* **MCP Extension (`apps/defrag-chatgpt-app`):** Hardened. Tools properly renamed. UX UX-Patterns documented. Needs confirmation that the tool behavior exactly matches the new Defrag response contract.
* **Internal APIs (`/api/insights`, `/api/world`, `/api/dynamics`):** Hardened and audited.

### Disposition Status
* **Keep & Harden:** All `/api/*`, MCP Server, `/dynamics`
* **Implement & Complete:** `/preview` QA hub, Unified Pricing styles.
* **Fix/Hide:** Unfinished exploratory models (To be audited).
