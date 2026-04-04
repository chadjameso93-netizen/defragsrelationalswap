# Billing Flow Validation Audit

## Overview
This document fulfills Step 5 of the immediate execution list, verifying the end-to-end integration between Stripe, the environment configuration, and the billing state container `packages/billing`.

## Stripe Mapping & Configuration
The logic in `packages/billing/src/stripe-mapping.ts` expects 7 configured Stripe Price IDs mapped across the `BillingPlan` hierarchy:
1. `STRIPE_PRICE_CORE` -> `core`
2. `STRIPE_PRICE_STUDIO` -> `studio`
3. `STRIPE_PRICE_REALTIME` -> `realtime`
4. `STRIPE_PRICE_PROFESSIONAL` -> `professional`
5. `STRIPE_PRICE_TEAM` -> `team`
6. `STRIPE_PRICE_API` -> `api`
7. `STRIPE_PRICE_ENTERPRISE` -> `enterprise`

This perfectly mirrors the established `PLAN_HIERARCHY` inside `entitlements.ts`. If an active Stripe subscription returns a price ID matching one of these, the application resolves to that specific plan level.

## Entitlement Logic Verification
Entitlements are calculated accurately based on active state (`trialing` or `active`) and the user's highest resolved plan:

| Entitlement | Logic | Output |
|---|---|---|
| `canUseDynamics` | Always true | Basic workspace features are free for all users. |
| `canUseDynamicsPremiumView` | `active` && `core` (or above) | Gates evidence lists and confidence markers. |
| `canUseInsights` (formerly `Studio`) | `active` && `studio` (or above) | Gates the standalone Insight capability. |
| `canUseRealtime` | `active` && `realtime` (or above) | Reserved for highest tier access. |
| `monthlySituationLimit` | `core`+ = 100, Free = 5 | Accurately throttles free-tier usage. |

## Terminology Drift Cleanup
The `canUseStudio` entitlement property was successfully renamed to `canUseInsights` in the core types, schemas, and usage layers to align with the complete removal of the "Insight Studio" generic noun established in Step 3. Note that the underlying billing *tier/plan* is still internally referred to by its likely Stripe product name, "Studio" (`BillingPlan = "studio"`).

## Verification Status
✅ The `packages/billing` methods strictly match `.env` expectations.
✅ Entitlement schemas and MCP tools are appropriately synchronized.
✅ `pnpm test` validates that all billing logic passes correctly.
