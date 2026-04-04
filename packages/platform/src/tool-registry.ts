import billingHandoffSchema from "../../schemas/billing-handoff.schema.json";
import dynamicsGuidanceSchema from "../../schemas/dynamics-guidance.schema.json";
import dynamicsInputSchema from "../../schemas/dynamics-input.schema.json";
import entitlementStatusSchema from "../../schemas/entitlement-status.schema.json";
import insightResponseSchema from "../../schemas/insight-response.schema.json";
import toolResponseMetadataSchema from "../../schemas/tool-response-metadata.schema.json";
import worldInterpretationSchema from "../../schemas/world-interpretation.schema.json";
import worldSceneSchema from "../../schemas/world-scene.schema.json";
import type {
  AccountEntitlementsOutput,
  BillingPortalHandoffOutput,
  CheckoutHandoffOutput,
  DynamicsGuidanceInput,
  DynamicsGuidanceOutput,
  RelationshipInsightInput,
  RelationshipInsightOutput,
  ToolRegistryEntry,
  WorldSignalInput,
  WorldSignalOutput,
} from "./contracts";
import {
  accountEntitlementsOutputExample,
  billingPortalHandoffOutputExample,
  checkoutHandoffOutputExample,
  dynamicsGuidanceInputExample,
  dynamicsGuidanceOutputExample,
  relationshipInsightInputExample,
  relationshipInsightOutputExample,
  worldSignalInputExample,
  worldSignalOutputExample,
} from "./examples";

const relationshipInsightInputSchema = {
  type: "object",
  additionalProperties: false,
  required: ["userId", "request"],
  properties: {
    userId: { type: "string" },
    request: { type: "string" },
  },
} as const;

const accountEntitlementsInputSchema = {
  type: "object",
  additionalProperties: false,
  required: ["userId"],
  properties: {
    userId: { type: "string" },
  },
} as const;

const worldSignalInputSchema = {
  type: "object",
  additionalProperties: false,
  required: ["userId", "scene"],
  properties: {
    userId: { type: "string" },
    scene: worldSceneSchema,
  },
} as const;

const checkoutHandoffInputSchema = {
  type: "object",
  additionalProperties: false,
  required: ["userId", "email", "plan"],
  properties: {
    userId: { type: "string" },
    email: { type: "string" },
    plan: {
      type: "string",
      enum: ["free", "core", "studio", "realtime", "professional", "team", "api", "enterprise"],
    },
    successUrl: { type: "string" },
    cancelUrl: { type: "string" },
  },
} as const;

const billingPortalInputSchema = {
  type: "object",
  additionalProperties: false,
  required: ["userId"],
  properties: {
    userId: { type: "string" },
    returnUrl: { type: "string" },
  },
} as const;

export const DEFRAG_TOOL_REGISTRY = {
  get_dynamics_guidance: {
    name: "get_dynamics_guidance",
    title: "Dynamics next-step guidance",
    description: "Use this when the user needs grounded help with one current relational moment, what patterns may be active, and what to try next.",
    authPolicy: "required",
    entitlementPolicy: { requiredPlan: "core", requiresActiveSubscription: true },
    exposure: "user-facing",
    userFacing: true,
    helperOnly: false,
    websiteOnlyForNow: false,
    redirectToWebsite: false,
    display: {
      defaultMode: "inline-card",
      capability: "inline-plus-fullscreen",
      inlineCardSufficient: true,
      fullscreenJustifiedLater: true,
      maxInlineCtas: 2,
      inlineFields: ["whatChanged", "nextMove", "timingSignal"],
      omitFromInline: ["full evidence panel", "complete thread history"],
    },
    inputSchema: dynamicsInputSchema,
    outputSchema: {
      type: "object",
      additionalProperties: false,
      required: ["threadId", "insightId", "reasoning", "metadata"],
      properties: {
        threadId: { type: "string" },
        insightId: { type: "string" },
        reasoning: (dynamicsGuidanceSchema as { properties: Record<string, unknown> }).properties.reasoning as Record<string, unknown>,
        metadata: toolResponseMetadataSchema,
      },
    },
    inputExample: dynamicsGuidanceInputExample,
    outputExample: dynamicsGuidanceOutputExample,
  } satisfies ToolRegistryEntry<DynamicsGuidanceInput, DynamicsGuidanceOutput>,
  generate_relationship_insight: {
    name: "generate_relationship_insight",
    title: "Structured relationship insight",
    description: "Use this when the user wants a structured relationship insight grounded in observable dynamics that they can review, save, or return to later.",
    authPolicy: "required",
    entitlementPolicy: { requiredPlan: "studio", requiresActiveSubscription: true },
    exposure: "user-facing",
    userFacing: true,
    helperOnly: false,
    websiteOnlyForNow: false,
    redirectToWebsite: false,
    display: {
      defaultMode: "inline-card",
      capability: "inline-plus-fullscreen",
      inlineCardSufficient: true,
      fullscreenJustifiedLater: true,
      maxInlineCtas: 2,
      inlineFields: ["what_may_be_happening", "what_to_try_next"],
      omitFromInline: ["full proof/context notes", "share studio"],
    },
    inputSchema: relationshipInsightInputSchema,
    outputSchema: {
      type: "object",
      additionalProperties: false,
      required: ["insight", "metadata"],
      properties: {
        insight: insightResponseSchema,
        metadata: toolResponseMetadataSchema,
      },
    },
    inputExample: relationshipInsightInputExample,
    outputExample: relationshipInsightOutputExample,
  } satisfies ToolRegistryEntry<RelationshipInsightInput, RelationshipInsightOutput>,
  interpret_world_signal: {
    name: "interpret_world_signal",
    title: "World signal interpretation",
    description: "Use this when the user already has a DEFRAG world scene and wants charge, timing, and stabilization guidance grounded in the current field.",
    authPolicy: "required",
    entitlementPolicy: { requiredPlan: "core", requiresActiveSubscription: true },
    exposure: "user-facing",
    userFacing: true,
    helperOnly: false,
    websiteOnlyForNow: false,
    redirectToWebsite: false,
    display: {
      defaultMode: "inline-card",
      capability: "inline-plus-fullscreen",
      inlineCardSufficient: true,
      fullscreenJustifiedLater: true,
      maxInlineCtas: 2,
      inlineFields: ["dominantPattern", "pressureLevel", "repairWindow", "nextMoves"],
      omitFromInline: ["full canvas editing", "deep node inspection"],
    },
    inputSchema: worldSignalInputSchema,
    outputSchema: {
      type: "object",
      additionalProperties: false,
      required: ["interpretation", "metadata"],
      properties: {
        interpretation: worldInterpretationSchema,
        metadata: toolResponseMetadataSchema,
      },
    },
    inputExample: worldSignalInputExample,
    outputExample: worldSignalOutputExample,
  } satisfies ToolRegistryEntry<WorldSignalInput, WorldSignalOutput>,
  get_account_entitlements: {
    name: "get_account_entitlements",
    title: "Account plan and entitlements",
    description: "Use this when the user needs their current DEFRAG plan, billing status, or feature access before taking the next step.",
    authPolicy: "required",
    entitlementPolicy: { requiredPlan: null, requiresActiveSubscription: false },
    exposure: "user-facing",
    userFacing: true,
    helperOnly: false,
    websiteOnlyForNow: false,
    redirectToWebsite: false,
    display: {
      defaultMode: "inline-card",
      capability: "inline-only",
      inlineCardSufficient: true,
      fullscreenJustifiedLater: false,
      maxInlineCtas: 1,
      inlineFields: ["plan", "status", "entitlements"],
      omitFromInline: ["full billing history"],
    },
    inputSchema: accountEntitlementsInputSchema,
    outputSchema: {
      type: "object",
      additionalProperties: false,
      required: ["userId", "plan", "status", "entitlements", "metadata"],
      properties: {
        userId: { type: "string" },
        plan: { type: "string" },
        status: { type: "string" },
        entitlements: (entitlementStatusSchema as { properties: Record<string, unknown> }).properties.entitlements as Record<string, unknown>,
        metadata: toolResponseMetadataSchema,
      },
    },
    inputExample: { userId: "user_123" },
    outputExample: accountEntitlementsOutputExample,
  } satisfies ToolRegistryEntry<{ userId: string }, AccountEntitlementsOutput>,
  begin_upgrade_checkout: {
    name: "begin_upgrade_checkout",
    title: "Upgrade on defrag.app",
    description: "Use this when the user clearly wants to upgrade and should be redirected to canonical checkout on defrag.app.",
    authPolicy: "required",
    entitlementPolicy: { requiredPlan: null, requiresActiveSubscription: false },
    exposure: "helper-only",
    userFacing: false,
    helperOnly: true,
    websiteOnlyForNow: false,
    redirectToWebsite: true,
    display: {
      defaultMode: "redirect-only",
      capability: "redirect-only",
      inlineCardSufficient: false,
      fullscreenJustifiedLater: false,
      maxInlineCtas: 1,
      inlineFields: ["plan"],
      omitFromInline: ["checkout internals", "billing management UI"],
    },
    inputSchema: checkoutHandoffInputSchema,
    outputSchema: billingHandoffSchema,
    inputExample: { userId: "user_123", email: "user@example.com", plan: "core" },
    outputExample: checkoutHandoffOutputExample,
  } satisfies ToolRegistryEntry<{ userId: string; email: string; plan: string }, CheckoutHandoffOutput>,
  open_billing_portal: {
    name: "open_billing_portal",
    title: "Open billing on defrag.app",
    description: "Use this when the user clearly wants to manage billing and should be redirected to canonical billing on defrag.app.",
    authPolicy: "required",
    entitlementPolicy: { requiredPlan: null, requiresActiveSubscription: false },
    exposure: "helper-only",
    userFacing: false,
    helperOnly: true,
    websiteOnlyForNow: false,
    redirectToWebsite: true,
    display: {
      defaultMode: "redirect-only",
      capability: "redirect-only",
      inlineCardSufficient: false,
      fullscreenJustifiedLater: false,
      maxInlineCtas: 1,
      inlineFields: ["status"],
      omitFromInline: ["portal internals"],
    },
    inputSchema: billingPortalInputSchema,
    outputSchema: billingHandoffSchema,
    inputExample: { userId: "user_123" },
    outputExample: billingPortalHandoffOutputExample,
  } satisfies ToolRegistryEntry<{ userId: string }, BillingPortalHandoffOutput>,
} as const;

export const FUTURE_TOOL_CATALOG = Object.values(DEFRAG_TOOL_REGISTRY).map((entry) => ({
  name: entry.name,
  purpose: entry.description,
  authRequired: entry.authPolicy === "required",
  entitlementRequired: entry.entitlementPolicy.requiredPlan,
  structuredContent: true,
  presentation: {
    primaryMode: entry.display.defaultMode,
    supportsFullscreen: entry.display.capability === "inline-plus-fullscreen",
    websiteBacklink: entry.redirectToWebsite ? entry.outputExample.metadata.linkBack?.path ?? null : entry.outputExample.metadata.linkBack?.path ?? null,
  },
  websiteOnly: entry.websiteOnlyForNow,
}));
