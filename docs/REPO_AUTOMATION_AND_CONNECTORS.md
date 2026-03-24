# Repo Automation and Connector Plan

## Purpose

This document keeps the repo workflow stable as the product evolves.
It defines:
- what is automated in GitHub
- what is handled by Vercel
- what is handled by Supabase and Stripe
- which connectors and generators are recommended
- which tools to avoid for now

## Current GitHub Automation

The repo now includes:
- `.github/workflows/ci.yml`
- `.github/workflows/auto-merge.yml`

### Intended behavior
- CI validates changes
- pull requests can auto-merge after checks pass
- Vercel Git integration handles preview and production deployment

## Recommended GitHub Settings

### Main branch
Recommended settings for `main`:
- Require a pull request before merging: ON
- Require pull request reviews before merging: OFF
- Require status checks to pass before merging: ON
- Allow auto-merge: ON

This keeps the system automated without requiring manual review.

## Recommended Deployment Ownership

### Preferred production split
- GitHub: source control + CI + auto-merge
- Vercel: preview and production deployment
- Supabase: database, auth, storage
- Stripe: billing and entitlements

## Recommended Free Connectors and Generators

### Strongly recommended
These are free or open-source and fit this repo well:

1. OpenAPI Generator
- Use for generating client/server types from API contracts
- Free and open-source

2. json-schema-to-typescript
- Use to generate TypeScript types from JSON Schemas
- Free and open-source

3. quicktype
- Useful for generating typed models from JSON examples
- Free and open-source

4. Pydantic
- Use as the Python validation source for backend models
- Free and open-source

5. Dependabot
- Free for GitHub repos
- Helps keep dependencies current

6. GitHub issue templates and Copilot instructions
- Helps keep AI work consistent
- Low overhead and free

### Not recommended as core dependencies right now
1. v0
- Useful for UI ideation
- Not ideal as a core free production connector for this repo
- Better as optional design inspiration, not build infrastructure

2. Heavy third-party GitHub Marketplace deploy wrappers
- Adds maintenance surface without enough benefit right now

## AI Guidance Rules

All future AI work should follow these rules:
- Keep architecture minimal
- Preserve the documented API contract
- Preserve calm, non-diagnostic language
- Treat symbolic data as weak prior only
- Treat real events and relationship context as stronger evidence
- Do not add new infrastructure unless clearly needed

## Next Recommended Repo Additions

1. `.github/copilot-instructions.md`
- repository-specific guidance for AI coding tools

2. `packages/schemas/`
- canonical JSON Schemas

3. `packages/contracts/`
- generated shared types

4. `apps/web/src/lib/api.ts`
- typed client calls

5. route-handler and shared-contract alignment inside `apps/web` and `packages/*`

## Change Control

Any future workflow or connector change should update this document.
This prevents drift and keeps the repo stable over time.
