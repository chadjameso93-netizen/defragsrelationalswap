# Engineering Overview

## Status

This document describes the current repo, not the original prototype plan.

There is no standalone backend app in this repository today.
The canonical implementation is the Next.js app in `apps/web` plus shared packages in `packages/*`.

## System Layers

1. Input Layer
   - browser input
   - route-handler requests
   - Supabase-backed account data

2. Reasoning Layer
   - structured_synthesis
   - insight
   - proof

3. Output Layer
   - typed shared contracts
   - JSON schema where available
   - validated responses in app APIs

---

## Core Contracts

- request-context.schema.json
- insight-response.schema.json

These must not drift where they are used.
The repo does not yet have universal schema coverage across all surfaces.

---

## Frontend

- Next.js
- App Router
- route handlers for internal APIs
- consumer product UI

---

## Deployment

- Vercel (canonical app deploy)
- GitHub Actions (CI)
- Supabase (data)

---

## Rule

If schema changes:
- update route handlers or shared services
- update frontend
- update docs

All three must stay aligned.
