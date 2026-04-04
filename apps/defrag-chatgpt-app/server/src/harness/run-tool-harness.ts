import { RESOURCE_MIME_TYPE } from "@modelcontextprotocol/ext-apps/server";
import {
  DEFRAG_TOOL_REGISTRY,
  accountEntitlementsOutputExample,
  billingPortalHandoffOutputExample,
  checkoutHandoffOutputExample,
  dynamicsGuidanceInputExample,
  relationshipInsightInputExample,
  worldSignalInputExample,
  type FutureToolName,
} from "../../../../../packages/platform/src";
import { getWidgetAssets } from "../../../web/src/index";
import { buildAuthChallengeMeta } from "../auth/runtime-auth";
import { DEFRAG_GOLDEN_PROMPTS } from "../metadata/golden-prompts";
import { MCP_WIDGET_RESOURCE_CONFIG, WIDGET_RESOURCE_URIS } from "../resources/register-widget-resources";
import { LOCAL_MCP_TOOL_DESCRIPTORS, createLocalToolInvokers } from "../tools/register-tools";
import {
  createAuthChallengeResult,
  formatBillingPortalResult,
  formatCheckoutResult,
} from "../tools/result-shapes";

const BASE_URL = "https://defrag.app";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

async function run() {
  const assets = getWidgetAssets();
  const invokers = createLocalToolInvokers(BASE_URL);

  for (const [toolName, entry] of Object.entries(DEFRAG_TOOL_REGISTRY) as Array<
    [FutureToolName, (typeof DEFRAG_TOOL_REGISTRY)[FutureToolName]]
  >) {
    const descriptor = LOCAL_MCP_TOOL_DESCRIPTORS[toolName];
    assert(descriptor.title.length > 0, `Missing title for ${toolName}`);
    assert(descriptor.description.startsWith("Use this when"), `Description must start with 'Use this when' for ${toolName}`);
    assert(descriptor._meta.ui.visibility.join(",") === "model,app", `Visibility drift for ${toolName}`);
    assert(typeof descriptor._meta.ui.resourceUri === "string", `Missing widget URI for ${toolName}`);
    assert(Array.isArray(descriptor._meta.securitySchemes), `Missing securitySchemes for ${toolName}`);
    assert(typeof descriptor.annotations.readOnlyHint === "boolean", `Missing readOnlyHint for ${toolName}`);
    assert(typeof descriptor.annotations.openWorldHint === "boolean", `Missing openWorldHint for ${toolName}`);
    assert(typeof descriptor.annotations.destructiveHint === "boolean", `Missing destructiveHint for ${toolName}`);
    assert(entry.display.maxInlineCtas <= 2, `Inline CTA count exceeded for ${toolName}`);
  }

  for (const resource of Object.values(MCP_WIDGET_RESOURCE_CONFIG)) {
    const asset = assets[resource.assetKey];
    assert(Boolean(asset), `Missing widget asset for ${resource.assetKey}`);
    assert(asset.html.includes("<!doctype html>"), `Widget HTML missing doctype for ${resource.assetKey}`);
    assert(resource.uri.startsWith("ui://defrag/"), `Unexpected widget URI for ${resource.assetKey}`);
    assert(RESOURCE_MIME_TYPE === "text/html;profile=mcp-app", "Unexpected resource mime type");
  }

  const dynamics = await invokers.get_dynamics_guidance(dynamicsGuidanceInputExample);
  const insight = await invokers.generate_relationship_insight(relationshipInsightInputExample);
  const world = await invokers.interpret_world_signal(worldSignalInputExample);
  const entitlements = await invokers.get_account_entitlements({ userId: accountEntitlementsOutputExample.userId });
  const checkout = await invokers.begin_upgrade_checkout({
    userId: checkoutHandoffOutputExample.metadata.auth.userId!,
    email: "user@example.com",
    plan: "core",
  });
  const portal = await invokers.open_billing_portal({
    userId: billingPortalHandoffOutputExample.metadata.auth.userId!,
  });

  assert((dynamics.structuredContent as Record<string, unknown>).what_changed, "Dynamics structuredContent missing what_changed");
  assert((insight.structuredContent as Record<string, unknown>).what_may_be_happening, "Insight structuredContent missing what_may_be_happening");
  assert((world.structuredContent as Record<string, unknown>).dominant_pattern, "World structuredContent missing dominant_pattern");
  assert((entitlements.structuredContent as Record<string, unknown>).plan, "Entitlements structuredContent missing plan");
  assert((checkout.structuredContent as Record<string, unknown>).redirect === true, "Checkout result should be redirect-shaped");
  assert((portal.structuredContent as Record<string, unknown>).redirect === true, "Portal result should be redirect-shaped");
  assert(Array.isArray(checkout.content) && checkout.content.length === 0, "Checkout result should stay minimal");
  assert(Array.isArray(portal.content) && portal.content.length === 0, "Portal result should stay minimal");

  const challenge = createAuthChallengeResult("Sign in to continue.", BASE_URL, {
    state: "unauthenticated",
    reason: "Sign in to continue.",
    redirectTarget: {
      path: "/login",
      label: "Sign in on defrag.app",
      intent: "continue",
      mode: "website-redirect",
    },
  });
  assert(challenge.isError === true, "Auth challenge should be an error result");
  assert(
    String(challenge._meta?.["mcp/www_authenticate"]).includes(
      buildAuthChallengeMeta(`${BASE_URL}/.well-known/oauth-protected-resource/mcp`),
    ) ||
      String(challenge._meta?.["mcp/www_authenticate"]).includes("resource_metadata="),
    "Auth challenge metadata mismatch",
  );

  const formattedCheckout = formatCheckoutResult(checkoutHandoffOutputExample);
  const formattedPortal = formatBillingPortalResult(billingPortalHandoffOutputExample);
  assert((formattedCheckout._meta as { widget?: { kind?: string } }).widget?.kind === "redirect-cta-card", "Checkout widget kind mismatch");
  assert((formattedPortal._meta as { widget?: { kind?: string } }).widget?.kind === "redirect-cta-card", "Portal widget kind mismatch");

  const promptCoverage = {
    direct: DEFRAG_GOLDEN_PROMPTS.direct.length,
    indirect: DEFRAG_GOLDEN_PROMPTS.indirect.length,
    redirect: DEFRAG_GOLDEN_PROMPTS.redirect.length,
    ambiguous: DEFRAG_GOLDEN_PROMPTS.ambiguous.length,
    negative: DEFRAG_GOLDEN_PROMPTS.negative.length,
  };
  assert(promptCoverage.negative >= 5, "Negative prompt coverage is too small");

  const widgetBindings = Object.fromEntries(
    Object.entries(LOCAL_MCP_TOOL_DESCRIPTORS).map(([toolName, descriptor]) => [
      toolName,
      descriptor._meta.ui.resourceUri,
    ]),
  );

  console.log(
    JSON.stringify(
      {
        ok: true,
        baseUrl: BASE_URL,
        resourceMimeType: RESOURCE_MIME_TYPE,
        widgetBindings,
        promptCoverage,
        widgetUris: WIDGET_RESOURCE_URIS,
      },
      null,
      2,
    ),
  );
}

await run();
