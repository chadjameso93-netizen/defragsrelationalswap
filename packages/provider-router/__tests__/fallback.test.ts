import { describe, expect, it } from "vitest";
import { resolveFallback } from "../core/resolveFallback";
import { routeTask } from "../core/router";

describe("fallback routing", () => {
  it("uses fallback provider when primary is unavailable", () => {
    expect(routeTask({ type: "reasoning", input: "analyze" }, "openai")).toEqual({
      status: "ok",
      provider: "google",
      reason: "fallback used",
    });
  });

  it("is deterministic across repeated fallback calls", () => {
    const task = { type: "reasoning", input: "repeatability" } as const;

    const firstFallback = resolveFallback(task, "openai");
    const secondFallback = resolveFallback(task, "openai");

    expect(firstFallback?.id).toBe("google");
    expect(secondFallback?.id).toBe("google");
  });

  it("returns no-route when fallback does not exist", () => {
    expect(routeTask({ type: "image", prompt: "a tree" }, "openai")).toEqual({
      status: "no-route",
      reason: "no provider supports task",
    });
  });
});
