# Dynamics to Dynamics Rename Audit

## Executive Summary
This document fulfills Step 1 of the DEFRAG executing list. It provides a classified inventory of the 464 occurrences of `dynamics` found via `ripgrep` across the monorepo and outlines the immediate action for each.

## 1. User-Facing Copy
- **Hits:** 
  - `apps/web/src/components/app-shell.tsx` (Route href is `/dynamics`)
  - `apps/web/src/app/dynamics/page.tsx`
  - Various UI strings in `dynamics-workspace.tsx` and insight preview components.
- **Action:** **Rename Now**. Replace with `Dynamics` or `dynamics`. The brand must be completely cohesive to the end user.

## 2. Component & File Names
- **Hits:**
  - `apps/web/src/components/dynamics-v1-shell.tsx`
  - `apps/web/src/components/dynamics-workspace.tsx`
  - `apps/web/src/server/dynamics-store.ts`
  - `packages/platform-server/src/dynamics-service.ts`
  - `packages/reasoning/src/dynamics-reasoner.ts`
- **Action:** **Rename Now**. Rename files to `dynamics-*` (e.g., `dynamics-workspace.tsx`, `dynamics-v1-shell.tsx`, `dynamics-service.ts`).

## 3. Route Names & API Paths
- **Hits:**
  - Web route: `apps/web/src/app/dynamics`
  - API routes: `apps/web/src/app/api/dynamics/actions/route.ts`, `apps/web/src/app/api/dynamics/insights/route.ts`
- **Action:** **Rename Now**. Move directories to `apps/web/src/app/dynamics` and `apps/web/src/app/api/dynamics`. Update all internal `fetch()` calls on the frontend to the new paths.

## 4. Exported TypeScript Symbols (Types, Interfaces, Logic)
- **Hits:**
  - `packages/core/src/contracts.ts`: `DynamicsOutputContract`, `DynamicsEvaluationRubric`, `DynamicsStructuredSynthesis`, `DynamicsIntakeInput`, `DynamicsReasoningResult`
  - `packages/core/src/types.ts`: `DynamicsThread`, `DynamicsInsight`, `DynamicsFollowUpAction`
  - `packages/billing/src/entitlements.ts`: `canUseDynamics`, `canUseDynamicsPremiumView`
  - `packages/reasoning/src/dynamics-reasoner.ts`: `runDynamicsReasoning`
- **Action:** **Rename Now**. Perform a strict find-and-replace to enforce the `Dynamics` interface layer throughout the application code (e.g., `DynamicsOutputContract`, `canUseDynamicsPremiumView`).

## 5. DB Table / Column Names (Persistence)
- **Hits:**
  - Tables: `companion_threads`, `companion_insights`, `companion_follow_up_actions`
  - SQL Migrations: `supabase/migrations/20260323_companion_threads_insights.sql`, etc.
  - Supabase generated types in `apps/web/src/types/supabase.ts`
- **Action:** **Alias For Now**. To prevent destructive breakage of stable tables, keep the database table names as `companion_*`. We will update `apps/web/src/server/dynamics-store.ts` to act as an anti-corruption layer. It will accept and return `DynamicsThread`, `DynamicsInsight` types to the rest of the application, but will execute queries against `.from('companion_insights')` internally.

## 6. Schema Names (MCP & Tooling)
- **Hits:**
  - `packages/schemas/dynamics-guidance.schema.json`
  - `packages/schemas/dynamics-input.schema.json`
  - `packages/platform/src/tool-registry.ts` (`get_dynamics_guidance`)
- **Action:** **Rename Now**. Rename schemas to `dynamics-guidance.schema.json`, change `$id` references, and rename the MCP tool name to `get_dynamics_guidance`.

## 7. Tests
- **Hits:**
  - `packages/billing/src/__tests__/entitlements.test.ts`
  - `packages/platform/src/__tests__/tool-registry.test.ts`
- **Action:** **Rename Now**. Tests must correspond to the newly renamed application logic strings.

## 8. Docs
- **Hits:**
  - `docs/ARCHITECTURE.md`
  - `docs/CHATGPT_PLATFORM_BOUNDARY.md`
  - `README.md`
- **Action:** **Rename Now**. All internal documentation files should reflect the 1.0 architecture naming.

## 9. Env/Config Comments
- **Hits:** `scripts/copy-guard.mjs` checks for `dynamics` paths.
- **Action:** **Rename Now**. Update guards and config to reference the new paths.
