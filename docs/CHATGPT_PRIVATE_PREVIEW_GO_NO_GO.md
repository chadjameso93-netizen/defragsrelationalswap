# DEFRAG ChatGPT private-preview go / no-go checklist

## Must-pass automated checks

- `pnpm --dir apps/defrag-chatgpt-app check:preview`
- `pnpm --dir apps/defrag-chatgpt-app validate:tools`
- `pnpm --dir apps/defrag-chatgpt-app typecheck`
- `pnpm --dir apps/web typecheck`
- `pnpm test`

## Must-pass post-deploy checks

- deployed `/health` returns `200`
- deployed `/ready` returns `200`
- protected-resource metadata returns `200`
- deployed `/mcp` is reachable
- deployed host is the dedicated Vercel MCP project alias, not `defrag.app`

## Must-pass ChatGPT developer-mode checks

- connector links successfully through `defrag.app`
- dynamics tool works for an entitled user
- insight tool blocks correctly for an unentitled user
- billing redirect tools land on canonical `defrag.app` billing/account surfaces
- negative prompts do not invoke DEFRAG tools

## Do not start preview if any of these are true

- auth secrets are not aligned between website and MCP host
- redirect origins are missing or overly broad
- `mcp.defrag.app` is not attached only to the MCP Vercel project
- `/ready` fails on the deployed preview host
- auth-linking does not return to DEFRAG-owned identity
- entitlement checks do not match live billing state

## Acceptable for private preview but not public launch

- in-memory rate limiting
- limited operator-only logging
- no public-launch monitoring/alerting
- no fullscreen expansion
