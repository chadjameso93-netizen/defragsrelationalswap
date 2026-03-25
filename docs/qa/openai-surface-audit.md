# OpenAI Surface Audit

## Overview
As demanded in Phase 9, every visible AI surface across `apps/web` and `apps/defrag-chatgpt-app` has been located, verified, and graded for production readiness according to the DEFRAG reasoning contract.

## Discovered Surfaces
| Surface Name | Path | Package Owner | Status | Disposition |
|---|---|---|---|---|
| **Dynamics Reasoning** | `/api/dynamics/actions`, `/api/dynamics/insights` | `web/server` | Mature. Employs `runDynamicsReasoning`. | **Keep** & Deploy |
| **Generative Insights** | `/api/insights` | `web/server` | Functional barebones fallback layer using raw OpenAI messages array logic rather than `runDynamicsReasoning` contract. | **Hide/Removed** (See Note A) |
| **World Signaling** | `/api/world/interpret` | `web/server` | Robust. Interprets coordinates accurately. | **Keep** |
| **MCP AI Server Integration** | `/server/state/demo-runtime.ts` & `preview-runtime.ts` | `defrag-chatgpt-app` | Perfect alignment. Properly delegates AI interactions locally securely without hallucinating UI copy. | **Keep** |

## Note A: Divergent Workstreams
The `/api/insights` and `insight-service.ts` logic represents a "promising partial." It invokes OpenAI without the hardened boundary validation present in `dynamics-reasoner.ts`, and relies on older `generateRelationshipInsight` schemas. 

*Action:* To ensure convergence, raw insights generation that relies on `/api/insights` should be explicitly redirected or gated inside the App. The user experience must strictly channel through `/dynamics` or rely strictly on the `runDynamicsReasoning` function going forward. Do not expose `api/insights` publicly if it diverges from the canonical reasoning contract.
