import { describe, expect, it } from "vitest";
import {
  DEFRAG_TOOL_REGISTRY,
  billingPortalHandoffOutputExample,
  checkoutHandoffOutputExample,
} from "../../../../../packages/platform/src";
import { DEFRAG_GOLDEN_PROMPTS } from "../metadata/golden-prompts";
import { MCP_WIDGET_RESOURCE_CONFIG, WIDGET_RESOURCE_URIS } from "../resources/register-widget-resources";
import { LOCAL_MCP_TOOL_DESCRIPTORS, MCP_TOOL_RUNTIME_CONFIG } from "../tools/register-tools";
import {
  formatBillingPortalResult,
  formatCheckoutResult,
} from "../tools/result-shapes";

describe("DEFRAG MCP metadata", () => {
  it("keeps every tool description discoverable and inline-safe", () => {
    for (const entry of Object.values(DEFRAG_TOOL_REGISTRY)) {
      expect(entry.description.startsWith("Use this when")).toBe(true);
      expect(entry.display.maxInlineCtas).toBeLessThanOrEqual(2);
      expect(entry.title.length).toBeGreaterThan(5);
    }
  });

  it("keeps tool annotations, visibility, and widget bindings explicit", () => {
    for (const [toolName, runtimeConfig] of Object.entries(MCP_TOOL_RUNTIME_CONFIG)) {
      expect(runtimeConfig.visibility).toEqual(["model", "app"]);
      expect(runtimeConfig.annotations).toMatchObject({
        readOnlyHint: expect.any(Boolean),
        openWorldHint: expect.any(Boolean),
        destructiveHint: expect.any(Boolean),
      });
      expect(LOCAL_MCP_TOOL_DESCRIPTORS[toolName as keyof typeof LOCAL_MCP_TOOL_DESCRIPTORS]._meta.ui.resourceUri).toBe(
        runtimeConfig.widgetUri,
      );
      expect(DEFRAG_TOOL_REGISTRY[toolName as keyof typeof DEFRAG_TOOL_REGISTRY]).toBeDefined();
    }
  });

  it("maps prompt sets to real tool expectations and no-tool cases", () => {
    for (const prompt of [
      ...DEFRAG_GOLDEN_PROMPTS.direct,
      ...DEFRAG_GOLDEN_PROMPTS.indirect,
      ...DEFRAG_GOLDEN_PROMPTS.redirect,
      ...DEFRAG_GOLDEN_PROMPTS.ambiguous,
    ]) {
      expect(Object.prototype.hasOwnProperty.call(DEFRAG_TOOL_REGISTRY, prompt.expectedTool)).toBe(true);
      expect(prompt.expectedOutcome.length).toBeGreaterThan(20);
    }

    for (const prompt of DEFRAG_GOLDEN_PROMPTS.negative) {
      expect(prompt.expectedTool).toBeNull();
      expect(prompt.expectedOutcome).toContain("No DEFRAG tool");
    }
  });

  it("keeps redirect tools minimal and redirect-shaped", () => {
    const checkoutResult = formatCheckoutResult(checkoutHandoffOutputExample);
    const portalResult = formatBillingPortalResult(billingPortalHandoffOutputExample);

    expect(checkoutResult.structuredContent as Record<string, unknown>).toMatchObject({ redirect: true });
    expect(portalResult.structuredContent as Record<string, unknown>).toMatchObject({ redirect: true });
    expect(checkoutResult._meta).toHaveProperty("redirect.url");
    expect(portalResult._meta).toHaveProperty("redirect.url");
    expect(checkoutResult.content).toEqual([]);
    expect(portalResult.content).toEqual([]);
  });

  it("keeps widget resources lightweight and aligned to known URIs", () => {
    for (const resource of Object.values(MCP_WIDGET_RESOURCE_CONFIG)) {
      expect(resource.uri).toContain("ui://defrag/");
      expect(resource.description.length).toBeGreaterThan(20);
      expect(Object.values(WIDGET_RESOURCE_URIS)).toContain(resource.uri);
    }
  });
});
