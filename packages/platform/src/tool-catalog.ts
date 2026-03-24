import type { ToolCatalogEntry } from "./contracts";

export const FUTURE_TOOL_CATALOG: ToolCatalogEntry[] = [
  {
    name: "get_companion_guidance",
    purpose: "Generate grounded guidance for one relational moment and return a structured summary with next steps.",
    authRequired: true,
    entitlementRequired: "core",
    structuredContent: true,
    presentation: {
      primaryMode: "inline-card",
      supportsFullscreen: true,
      websiteBacklink: "/companion",
    },
    websiteOnly: false,
  },
  {
    name: "generate_relationship_insight",
    purpose: "Generate a structured relationship insight and optional simulation branches for one moment.",
    authRequired: true,
    entitlementRequired: "studio",
    structuredContent: true,
    presentation: {
      primaryMode: "inline-card",
      supportsFullscreen: true,
      websiteBacklink: "/account/insights",
    },
    websiteOnly: false,
  },
  {
    name: "interpret_world_signal",
    purpose: "Interpret a relational field scene and return charge, timing, and stabilization guidance.",
    authRequired: true,
    entitlementRequired: "core",
    structuredContent: true,
    presentation: {
      primaryMode: "inline-card",
      supportsFullscreen: true,
      websiteBacklink: "/world",
    },
    websiteOnly: false,
  },
  {
    name: "get_account_entitlements",
    purpose: "Return the caller's current plan, billing state, and entitlement flags.",
    authRequired: true,
    entitlementRequired: null,
    structuredContent: true,
    presentation: {
      primaryMode: "inline-card",
      supportsFullscreen: false,
      websiteBacklink: "/account/billing",
    },
    websiteOnly: false,
  },
  {
    name: "begin_upgrade_checkout",
    purpose: "Begin canonical upgrade flow by returning a checkout handoff owned by defrag.app.",
    authRequired: true,
    entitlementRequired: null,
    structuredContent: true,
    presentation: {
      primaryMode: "website-redirect-only",
      supportsFullscreen: false,
      websiteBacklink: "/account/billing",
    },
    websiteOnly: false,
  },
  {
    name: "open_billing_portal",
    purpose: "Open the canonical billing portal owned by DEFRAG infrastructure.",
    authRequired: true,
    entitlementRequired: null,
    structuredContent: true,
    presentation: {
      primaryMode: "website-redirect-only",
      supportsFullscreen: false,
      websiteBacklink: "/account/billing",
    },
    websiteOnly: false,
  },
];
