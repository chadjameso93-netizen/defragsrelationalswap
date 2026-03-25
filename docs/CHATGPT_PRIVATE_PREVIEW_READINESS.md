# DEFRAG ChatGPT private-preview readiness

## A. Complete

- Dedicated MCP app exists outside the website.
- Reusable reasoning root is `packages/reasoning`.
- Website auth server endpoints exist on `defrag.app` for authorization-code and refresh-token exchange.
- MCP app verifies production-signed access tokens and resolves identity against canonical DEFRAG auth.
- Tool-level entitlement gating is implemented.
- Redirect tools return canonical `defrag.app` billing/account URLs.
- Structured logging, readiness checks, and request rate limiting are implemented.
- Separate Vercel-project private-preview deployment target is defined for `mcp.defrag.app`.

## B. Complete but needs operator validation

- Real ChatGPT developer-mode account linking flow.
- Real entitlement checks against live subscription states.
- Real redirect-tool behavior in ChatGPT.
- Connector metadata validation against the deployed private-preview host.

## C. Implemented with known limitations

- Rate limiting is in-memory per preview instance, not distributed.
- Refresh-token handling is implemented, but private-preview operator validation is still required.
- Billing redirect safety relies on canonical handoff to `defrag.app/account/billing`, not a full in-app billing UI.

## D. Still blocked before private preview

- Operator must set shared auth secret and approved redirect origins on both the website and MCP host.
- Operator must deploy the MCP app to the chosen preview host and confirm `/ready` is clean.
- Operator must run the connector validation sequence in ChatGPT developer mode and record results.

## E. Explicitly deferred until public launch

- Public-launch scale observability and alerting
- Distributed rate limiting / abuse controls
- Public-launch security review and privacy review
- Any fullscreen expansion
- Directory submission / public connector packaging
