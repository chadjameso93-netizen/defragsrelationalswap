# MCP UX Patterns

This document defines the standard user experience (UX) patterns and architectural decisions utilized in the DEFRAG ChatGPT MCP (Model Context Protocol) Integration. All future tools and extensions should adhere to these principles to maintain a consistent conversational UI and boundary integration with the canonical `defrag.app`.

## 1. Authentication & Entitlement Bouncing
**Pattern:** Strict Boundary Rejection with Guided Links
The MCP server never silently fails or hallucinates an error state when billing or authentication fails. Instead, it explicitly throws actionable responses using `ResolvedToolAccess` logic.

```typescript
// Example: Bouncing an unauthenticated user gracefully
return {
  allowed: false,
  requiresAuthChallenge: true, // Triggers standard MCP client OAuth challenge
  auth: {
    state: "unauthenticated",
    reason: "A linked DEFRAG account is required before this tool can run.",
    redirectTarget: {
      path: "/login?next=/dynamics",
      label: "Sign in on defrag.app",
      intent: "continue",
      mode: "website-redirect"
    }
  }
}
```

## 2. Rich Status Indicators (Resources)
**Pattern:** Injecting branded UI widgets directly into the canvas
The DEFRAG MCP uses predefined HTML payloads mapped to `ui://` protocols. When returning data to the AI, we can hint to the host client (e.g., ChatGPT) to render these resources inline instead of plain text.

- **Entitlement Status Card:** `ui://defrag/entitlement-status.html`
- **Dynamics Summary:** `ui://defrag/dynamics-summary-card.html`

## 3. The `LinkBack` Handoff
**Pattern:** Escaping the Chat Context
Not all interactions belong in ChatGPT. Activities like intensive multi-node mapping (World), billing upgrades, and managing saved insights must occur on the first-party `defrag.app` surface.

For these operations, MCP tools return a `linkBack` property alongside the raw data.
- **Example Use:** "To analyze this World map interactively, tap the link below."
- **Properties:**
  - `path`: The absolute or relative router path (e.g. `/world`).
  - `label`: Human-readable prompt (e.g. `Open World`).
  - `intent`: `continue`, `review`, `upgrade`, `manage`.

## 4. Grounded Output Contracts
**Pattern:** Zero-hallucination structured responses
The LLM is provided explicit `OutputContracts` using JSON schema definitions and Zod types. 
Tools like `get_dynamics_guidance` never return raw LLM streams directly to the MCP layer. Instead they process internal pipelines and only yield strongly-typed contracts so that the ChatGPT interface uniformly receives `situation`, `primaryPattern`, `nextMove`, and `timing`.

## 5. Vocabulary Restraint
**Pattern:** Exact, Calm Nouns
The system prompts injected into the MCP configuration explicitly instruct the AI *not* to invent features. The only recognized product nouns are **Dynamics** (threaded, real-time guidance), **Insights** (single-shot summaries), and **World** (topological mapping). Legacy nouns like "Companion" and "Studio" are banned from the AI's instruction set.
