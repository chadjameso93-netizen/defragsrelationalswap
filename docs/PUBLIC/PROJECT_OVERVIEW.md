# DEFRAG Overview

DEFRAG is a public website and account shell on `defrag.app` with integration-capable service layers behind it.

It does not diagnose or label people.

It helps users:
- understand what may be happening
- see patterns between people
- respond more clearly

---

## How It Works

The product looks at:
- recent interactions
- communication patterns
- timing and repetition

It currently produces:

1. structured_synthesis
2. insight
3. proof

---

## Design Principles

- simple language
- no stigma
- no fixed personality labels
- grounded in real events
- transparent uncertainty

---

## Example Output

- what may be happening for you
- what may be happening for the other person
- what may be happening between you
- what timing suggests
- what to try next

---

## Goal

Help users:
- see clearly
- act intentionally
- reduce unnecessary conflict

## Current delivery model

- `defrag.app` is the canonical public product shell
- the website owns brand, trust, legal, account, billing, and upgrade flows
- preview and authenticated product views live in the same canonical website app
- a separate MCP / ChatGPT service project can run behind the website for integrations
- Supabase-backed auth and storage remain canonical
- Stripe-backed billing remains canonical on `defrag.app`
