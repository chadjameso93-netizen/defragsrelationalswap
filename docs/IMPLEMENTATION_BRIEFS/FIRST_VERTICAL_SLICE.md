# First Vertical Slice

## Goal

Build a working insight endpoint.

---

## Input

RequestContext JSON

---

## Endpoint

POST /api/v1/insights

---

## Output

Must match:

- structured_synthesis
- insight
- proof

---

## Requirements

- schema valid
- no hallucination
- grounded in events
- includes uncertainty
- returns 1–3 actionable options

---

## Success Criteria

- passes schema validation
- produces stable output
- deploys on Vercel
- callable from frontend

---

## Notes

Do not add:
- auth
- payments
- complex UI

Focus only on:
input → reasoning → output
