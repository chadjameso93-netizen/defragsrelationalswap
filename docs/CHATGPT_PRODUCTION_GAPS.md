# DEFRAG ChatGPT production gaps

## A. Already complete

- Private-preview MCP app exists in `apps/defrag-chatgpt-app`.
- The future ChatGPT path imports only from shared packages, not `apps/web`.
- Shared reasoning now lives in `packages/reasoning`.
- Shared tool registry and runtime descriptors exist.
- Inline widget resources are registered with MCP Apps resource MIME handling.
- Production-capable auth/token helpers and `_meta["mcp/www_authenticate"]` helpers exist.
- Redirect tools keep billing ownership on `defrag.app`.
- Separate Vercel-project private-preview deployment target is defined.

## B. Validated locally

- Local MCP server boots and exposes `/mcp`, `/health`, and protected-resource metadata.
- Local MCP server exposes `/ready`.
- Widget assets build locally.
- Tool harness validates descriptor shape, widget bindings, auth challenges, and redirect results.
- Metadata tests cover direct, indirect, redirect, ambiguous, and negative prompt expectations.

## C. Still stubbed

- Production-safe secret management on the real deployed preview host.
- Full ChatGPT developer-mode validation history against a real connector session.
- Fullscreen experiences beyond inline cards.
- Production monitoring, error telemetry, and incident handling.

## D. Required before private preview

- Operator-configured separate Vercel project on `mcp.defrag.app`.
- End-to-end ChatGPT developer-mode validation with saved evidence for every golden prompt.
- Domain, CSP, and security review for widget resources and any hosted assets.
- Billing redirect safety review for upgrade and portal flows.
- Entitlement enforcement review against production subscription states.
- Operator confirmation that auth envs are aligned between `defrag.app` and the MCP preview host.

## E. Required before public launch

- Production OAuth fully implemented and reviewed.
- Persistent auth/session lifecycle with revocation and relink handling.
- Monitoring, alerting, and abuse controls sized for public traffic.
- Connector metadata tuned from real developer-mode evaluation data.
- Formal privacy and security review for tool payloads and widget `_meta`.
- Final fullscreen justification review if any fullscreen surface is added later.
- Launch checklist proving the ChatGPT app is not a second website and does not own billing.
