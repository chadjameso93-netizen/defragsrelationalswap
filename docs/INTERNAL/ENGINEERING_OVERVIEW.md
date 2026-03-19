# Engineering Overview

## System Layers

1. Input Layer
   - RequestContext JSON
   - events
   - relationship data

2. Reasoning Layer
   - structured_synthesis
   - insight
   - proof

3. Output Layer
   - strict JSON schema
   - validated responses

---

## Core Contracts

- request-context.schema.json
- insight-response.schema.json

These must not drift.

---

## Backend

- FastAPI
- Pydantic models
- schema validation

---

## Frontend

- Next.js
- API route calls
- simple UI for testing

---

## Deployment

- Vercel (frontend)
- GitHub Actions (CI)
- Supabase (data)

---

## Rule

If schema changes:
- update backend
- update frontend
- update docs

All three must stay aligned.
