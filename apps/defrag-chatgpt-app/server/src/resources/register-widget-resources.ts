import { registerAppResource, RESOURCE_MIME_TYPE } from "@modelcontextprotocol/ext-apps/server";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { WidgetAsset } from "../../../web/src/index";

export const WIDGET_RESOURCE_URIS = {
  dynamics: "ui://defrag/dynamics-summary-card.html",
  insight: "ui://defrag/insight-summary-card.html",
  world: "ui://defrag/world-interpretation-card.html",
  entitlements: "ui://defrag/entitlement-status-card.html",
  redirect: "ui://defrag/redirect-cta-card.html",
} as const;

export const MCP_WIDGET_RESOURCE_CONFIG = {
  dynamics: {
    title: "Dynamics summary card",
    uri: WIDGET_RESOURCE_URIS.dynamics,
    description: "Inline dynamics summary card for DEFRAG relationship guidance.",
    assetKey: "dynamics",
  },
  insight: {
    title: "Insight summary card",
    uri: WIDGET_RESOURCE_URIS.insight,
    description: "Inline insight summary card for DEFRAG insight results.",
    assetKey: "insight",
  },
  world: {
    title: "World interpretation card",
    uri: WIDGET_RESOURCE_URIS.world,
    description: "Inline world interpretation card for DEFRAG field interpretation results.",
    assetKey: "world",
  },
  entitlements: {
    title: "Entitlement status card",
    uri: WIDGET_RESOURCE_URIS.entitlements,
    description: "Inline entitlement status card for DEFRAG account status.",
    assetKey: "entitlements",
  },
  redirect: {
    title: "Redirect CTA card",
    uri: WIDGET_RESOURCE_URIS.redirect,
    description: "Inline redirect CTA card for DEFRAG billing and checkout handoffs.",
    assetKey: "redirect",
  },
} as const;

export function registerWidgetResources(server: McpServer, assets: Record<string, WidgetAsset>) {
  for (const resource of Object.values(MCP_WIDGET_RESOURCE_CONFIG)) {
    registerAppResource(
      server,
      resource.title,
      resource.uri,
      {
        description: resource.description,
      },
      async () => ({
        contents: [
          {
            uri: resource.uri,
            mimeType: RESOURCE_MIME_TYPE,
            text: assets[resource.assetKey].html,
            _meta: { ui: { prefersBorder: true } },
          },
        ],
      }),
    );
  }
}
