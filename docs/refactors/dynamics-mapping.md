# Dynamics Mapping (Rename Refactor Architecture)

## Overview
This document records the completion of Step 2: "The Great Rename." The application layer has successfully been migrated to exclusively use the `Dynamics` nomenclature, while preserving backwards compatibility with the underlying persistent tables.

## Terminology Mapping & Boundaries

| Domain | Former Terminology | New Terminology (App Layer) | DB/Persistence Mapping (Supabase) |
|---|---|---|---|
| Core Interface | `CompanionOutputContract` | `DynamicsOutputContract` | N/A |
| Web Route | `/companion` | `/dynamics` | N/A |
| API Route | `/api/companion/*` | `/api/dynamics/*` | N/A |
| Thread Model | `CompanionThread` | `DynamicsThreadRecord` | `.from('companion_threads')` |
| Insight Model | `CompanionInsight` | `DynamicsInsightRecord` | `.from('companion_insights')` |
| Action Model | `CompanionFollowUpAction` | `DynamicsActionType` | `.from('companion_follow_up_actions')` |
| Entitlements | `canUseCompanion` | `canUseDynamics` | JSON schema fields in raw data |
| MCP Tools | `get_companion_guidance` | `get_dynamics_guidance` | Schema IDs migrated to `dynamics-guidance.schema.json` |

## Anti-Corruption Layer
The primary persistence anti-corruption layer acts as a strict boundary. In `apps/web/src/server/dynamics-store.ts`, typescript returns `Dynamics*` types seamlessly to components, but generates Supabase SQL targeting the `companion_*` physical tables. 

**DO NOT** attempt to execute destructive DB renames on the tables; any future migrations covering these tables will require this explicit mapping until a dedicated DB rename migration is safely planned and executed outside of the 1.0 scope.

**Status:** Completed. All vitest specs and TypeScript compilations conform correctly.
