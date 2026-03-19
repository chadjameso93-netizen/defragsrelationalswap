# DEFRAG repository instructions

## Purpose

This repository builds a relational reasoning platform.

The system must stay:
- calm
- grounded
- non-diagnostic
- schema-driven
- easy to test

## Core rules

1. Do not generate product logic from generic assistant behavior.
2. Always follow the documented API contract and schema files.
3. Use simple, universal, non-stigmatizing language.
4. Treat birth-based symbolic data as a weak prior, not as truth.
5. Treat real events, relationship context, and user corrections as stronger evidence.
6. Do not make fixed claims about identity, motive, or fate.
7. Do not add new infrastructure unless clearly needed.
8. Keep architecture minimal and production-safe.
9. Prefer explicit contracts over hidden assumptions.
10. Preserve user agency in all output.

## Required response structure for relational outputs

Every relational output should support:
1. what may be happening
2. what it may be causing
3. what to try next

When proof is requested, separate:
- observed evidence
- possible pattern
- timing notes
- uncertainty

## Inference restraint rules

Do not:
- infer deliberate intent without direct evidence
- infer coping mechanisms from sparse signals
- treat two events as a confirmed long-term pattern
- use diagnostic language
- use mystical certainty

Prefer:
- may
- might
- could
- based on the current pattern
- the reason is still unclear

## Build priorities

Build in this order:
1. schemas
2. shared contracts
3. backend models
4. insight endpoint
5. proof endpoint
6. simulation endpoint
7. minimal UI

## Current stack direction

Keep the repo aligned to:
- Next.js frontend
- FastAPI backend
- Supabase for auth and database
- Stripe for billing
- GitHub Actions for CI
- Vercel for deployment

## Avoid drift

Do not introduce:
- extra databases
- extra queues
- speculative microservices
- heavy framework churn
- freeform AI outputs without schema alignment

## Documentation rule

If a code change affects system behavior, update the relevant docs in `/docs`.

## Default coding preference

- keep files small
- keep naming explicit
- validate inputs
- return structured outputs
- prefer reliability over cleverness
