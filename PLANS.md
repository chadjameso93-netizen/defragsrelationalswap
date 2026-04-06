# ExecPlan — Defrag Phase 4: Story Canvas foundation

## 1) Context
- We need an additive, package-local foundation package at `packages/story-canvas` for Defrag’s visual narrative layer.
- Scope is strictly limited to `packages/story-canvas/**` and `PLANS.md`; no app wiring, no root config changes, and no edits to existing packages.
- Implementation must mirror existing repo package patterns (TypeScript, pure-function modules, package-local tests).
- Functional baseline required in this phase:
  - types for beats, scenes, grammars, lens, annotations
  - grammar registry with six named grammars
  - pure builders for scene, beats, annotations, rewrite paths
  - sample fixture and package-local tests
- Product policy constraints must be encoded in outputs and tests:
  - plain-language overlays
  - constructive, anti-stigma framing
  - no villain framing, humiliation, manipulation, or exaggerated diagnosis language
  - default lens support for `plain` and `cinematic`

## 2) Plan
1. Create `packages/story-canvas` with the exact required folder/file layout and a minimal package manifest with package-local `test` script.
2. Define strict, composable types in `types/*` for all required domain models.
3. Add six grammar definitions in `grammars/*` and aggregate them through a registry exported from package root.
4. Implement deterministic pure builders in `core/*`:
   - `buildScene` to normalize scene shape and lens defaults
   - `buildBeats` to derive beats from dynamic input and grammar
   - `buildAnnotations` to enforce policy-safe overlays
   - `buildRewrite` to generate constructive rewrite path options
5. Add `fixtures/sampleDynamic.ts` with representative input.
6. Add package-local tests for scene construction and grammar registry/constraints.
7. Run package-local tests via `pnpm --filter @defrag/story-canvas test` and confirm no out-of-scope changes.

## 3) Steps
1. Scaffold files under `packages/story-canvas` exactly as required.
2. Add `package.json` and `index.ts` export surface (types, grammars, core builders, fixture).
3. Implement `types/beats.ts` and `types/scene.ts` with stable IDs, ordering, and constructive framing fields.
4. Implement `types/grammar.ts` and six grammar modules with deterministic metadata and narrative templates.
5. Implement `types/lens.ts` with default-safe lens union (`plain` and `cinematic`) and helper defaults.
6. Implement `types/annotations.ts` including annotation severity/category and rewrite-path models.
7. Implement `core/buildScene.ts` as a pure constructor applying lens defaults and scene normalization.
8. Implement `core/buildBeats.ts` to derive ordered beats from fixture-compatible dynamic input plus selected grammar.
9. Implement `core/buildAnnotations.ts` to produce plain-language, anti-stigma annotations and filter disallowed framing.
10. Implement `core/buildRewrite.ts` to output constructive rewrite options with deterministic ordering.
11. Add fixture in `fixtures/sampleDynamic.ts` to support tests.
12. Write tests:
    - `scene.test.ts` for lens defaults, deterministic scene/beat output, and constructive constraints.
    - `grammars.test.ts` for registry integrity (all six grammars) and policy-safe content checks.
13. Execute package-local tests and ensure git diff only includes allowed paths.

## 4) Validation
- Command: `pnpm --filter @defrag/story-canvas test`
- Assertions to verify:
  - all required files compile and export correctly from `index.ts`
  - scene builder defaults lens behavior to support `plain` + `cinematic`
  - grammar registry includes all six required grammars
  - builders remain pure/deterministic (same input => same output)
  - annotations and rewrite paths enforce anti-stigma, non-manipulative language constraints
  - no edits outside `packages/story-canvas/**` and `PLANS.md`

## 5) Recovery
- If tests fail due type/export mismatches:
  - reconcile `index.ts` exports first, then align test imports.
- If policy constraint assertions fail:
  - tighten annotation/rewrite text generation and grammar copy to remove prohibited framing.
- If deterministic assertions fail:
  - remove non-deterministic values (timestamps/randomness) and enforce stable ordering.
- If package-local test execution fails due config resolution:
  - add package-local Vitest config inside `packages/story-canvas` only; do not touch root config.
- If any required fix appears to require out-of-scope changes:
  - stop implementation and report the exact blocked file and reason before proceeding.

---

# ExecPlan — Phase 5: Web shell hardening

## Context
- Harden the live `apps/web` shell toward a premium dark mono workspace without changing routes, billing/auth logic, schemas, or package contracts.

## Plan
1. Refine the primary `/workspace` shell into a clearer left / center / right structure.
2. Add safe, typed placeholder surfaces for Story Canvas, Dynamics, Practice, and Timeline/Field Weather.
3. Keep existing interpret workflow and route behavior intact.

## Steps
1. Update `apps/web/src/app/workspace/page.tsx` styles/layout hierarchy for dark mono shell clarity.
2. Add right-rail placeholder panels for future integration surfaces.
3. Keep API calls/transcript behavior unchanged and maintain responsive behavior.
4. Run `pnpm --dir apps/web typecheck`.

## Validation
- Workspace route renders with refined shell and placeholders.
- Existing interaction flow (interpret, transcript, visual field) remains functional.
- Typecheck passes for `apps/web`.

## Recovery
- If typecheck fails, revert the smallest shell change causing typing drift and re-run checks.
- If layout regression appears, preserve current behavior and reduce only the styling delta.

---

# ExecPlan — Phase 6: Story Canvas web integration

## Context
- Integrate the existing `packages/story-canvas` foundation into `apps/web` so `/workspace` shows a real Story Canvas output panel using live workspace state.

## Plan
1. Wire `apps/web` workspace route to consume Story Canvas builders (`buildScene`, `buildAnnotations`, `buildRewrite`) from the package.
2. Derive Story Canvas input from current workspace message/interpret response.
3. Render a real Story Canvas section with scene title, overlay, ordered beats, annotations, and a constructive rewrite path.
4. Preserve existing workspace flow and dark mono presentation.

## Steps
1. Update `apps/web/src/app/workspace/page.tsx` imports and typed memoized Story Canvas data construction.
2. Replace one placeholder panel with real Story Canvas content while retaining the existing right-rail structure.
3. Keep remaining placeholders additive and non-destructive.
4. Run `pnpm --dir apps/web typecheck`.

## Validation
- `/workspace` compiles with real Story Canvas package usage.
- Story Canvas panel displays all required fields from live page state.
- Existing interpret behavior remains unchanged.

## Recovery
- If type integration fails, align import paths and input shaping without changing route topology.
- If render density regresses UX, keep data output but reduce visual weight in panel styling.

---

# ExecPlan — Phase 7: Web build reliability (font hardening)

## Context
- Current `apps/web` production build fails when `next/font/google` cannot fetch font files in restricted/cloud environments.

## Plan
1. Remove network-dependent Google font imports in `apps/web` layout.
2. Replace with system-safe font stacks and explicit CSS variables for display/body serif usage.
3. Preserve dark premium mono styling and existing route behavior.
4. Validate with typecheck and build.

## Steps
1. Update `apps/web/src/app/layout.tsx` to remove `next/font/google` usage.
2. Define local CSS font variables (`--font-display`, `--font-sans`, `--font-cormorant`) with safe fallback stacks.
3. Keep existing global styles unchanged except font sourcing.
4. Run `pnpm --dir apps/web typecheck` and `pnpm --dir apps/web build`.

## Validation
- Web app typecheck passes.
- Web app build passes without external font fetch failures.

## Recovery
- If typography regresses visually, tune fallback stacks while keeping them network-independent.

---

# ExecPlan — Phase 8: Deployable web build and env audit

## Context
- Move `apps/web` to a clean, deployable state by removing build-time fragility and documenting concrete env requirements from real code paths.

## Plan
1. Audit required env vars from `apps/web` code that can block build/prerender/runtime.
2. Harden auth-related client routes so missing browser Supabase env does not crash prerender/build.
3. Keep product copy plain-language and Defrag-branded in touched auth/workflow surfaces.
4. Run full web typecheck and build to verify green checks.

## Steps
1. Remove eager Supabase client instantiation from prerendered client pages (`/signin`, `/signup`, `/signin/studio`, `/signup/studio`, `/onboarding`).
2. Instantiate Supabase client only inside user actions and surface a clear preview-env message if keys are absent.
3. Keep semantics unchanged for successful configured environments.
4. Run `pnpm --dir apps/web typecheck` and `pnpm --dir apps/web build`.

## Validation
- Typecheck passes.
- Build passes in this environment.
- Env checklist is extracted from real code paths.

## Recovery
- If a route still fails prerender due env reads, defer env access to user-triggered handlers or server-only runtime paths without changing route topology.


---

# ExecPlan — Phase 9: Product polish pass

## Context
- Keep the now-green web build state and polish high-traffic product surfaces for clearer Defrag positioning, simpler language, and premium dark consistency.

## Plan
1. Tighten copy and CTA hierarchy on landing and login/signup surfaces.
2. Clarify billing/checkout entry messaging without changing billing logic.
3. Polish natal baseline walkthrough wording in intake.
4. Refine workspace/Story Canvas entry copy to feel less placeholder-like.

## Validation
- Run `pnpm --dir apps/web typecheck`
- Run `pnpm --dir apps/web build`

---

# ExecPlan — Phase 10: Story Canvas intelligence upgrade

## Context
- Story Canvas is integrated and stable, but current outputs can read templated.
- We need deeper grammar differentiation and more contextual, product-grade language while preserving deterministic, anti-stigma behavior.

## Plan
1. Upgrade `packages/story-canvas` builders to inject deterministic, context-aware variation using relationship, friction, goal, and weather inputs.
2. Improve annotation categorization and rewrite usefulness while keeping non-manipulative, non-diagnostic framing.
3. Refine workspace Story Canvas panel presentation so richer output is legible and clearly structured.

## Validation
- Run `pnpm --filter @defrag/story-canvas test`
- Run `pnpm --dir apps/web typecheck`
- Run `pnpm --dir apps/web build`

---

# ExecPlan — Phase 11: Journey coherence polish (intake → workspace → billing)

## Context
- The shell is stable and build-green, but the shipping flow still has wording density and minor continuity gaps between intake, workspace entry, and billing entry.

## Plan
1. Refine intake walkthrough pacing and labels to reduce form fatigue and make value/steps clearer.
2. Tighten workspace entry copy so it reads as a direct continuation from baseline intake.
3. Simplify billing/plan language for faster scan and clearer CTA expectations.

## Validation
- Run `git status --short`
- Run `git branch --show-current`
- Run `git log --oneline -n 5`
- Run `pnpm --dir apps/web typecheck`
- Run `pnpm --dir apps/web build`

---

# ExecPlan — Phase 13: Premium visual redesign (/studio)

## Context
- Functional quality is stable; the remaining gap is visual authority on the public product surface.

## Plan
1. Rebuild `/studio` with a cinematic hero environment, stronger composition, and premium dark editorial rhythm.
2. Reduce boxed/grid commodity patterns and improve CTA hierarchy and typography.
3. Keep messaging calm, plain-language, and anti-stigma while raising visual differentiation.

## Validation
- Run `pnpm --dir apps/web typecheck`
- Run `pnpm --dir apps/web build`
- Run `git status --short`

---

# ExecPlan — Phase 12: Final product completion pass

## Context
- Core features are implemented and stable; this phase focuses on final UX/copy completion so the full shipped journey feels cohesive and premium.

## Plan
1. Finalize landing, auth, onboarding, and intake wording for cleaner hierarchy and stronger continuity.
2. Tighten workspace + Story Canvas first-run guidance and panel labels for immediate comprehension.
3. Finalize billing entry copy across public/studio/account surfaces for plan clarity and CTA confidence.

## Validation
- Run `git status --short`
- Run `git branch --show-current`
- Run `git log --oneline -n 5`
- Run `pnpm --dir apps/web typecheck`
- Run `pnpm --dir apps/web build`
