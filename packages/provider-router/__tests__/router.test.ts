import { describe, expect, it } from "vitest";
import { routeTask } from "../core/router";
import type { Task } from "../types/tasks";

describe("routeTask", () => {
  it("routes reasoning tasks to openai", () => {
    expect(routeTask({ type: "reasoning", input: "analyze" })).toEqual({
      status: "ok",
      provider: "openai",
      reason: "matched capability",
    });
  });

  it("routes image tasks to openai", () => {
    expect(routeTask({ type: "image", prompt: "a mountain" })).toEqual({
      status: "ok",
      provider: "openai",
      reason: "matched capability",
    });
  });

  it("routes video tasks to google", () => {
    expect(routeTask({ type: "video", prompt: "a tutorial" })).toEqual({
      status: "ok",
      provider: "google",
      reason: "matched capability",
    });
  });

  it("routes narration tasks to openai", () => {
    expect(routeTask({ type: "narration", text: "read this" })).toEqual({
      status: "ok",
      provider: "openai",
      reason: "matched capability",
    });
  });

  it("returns no-route for unsupported task", () => {
    const unsupportedTask = { type: "unsupported", input: "unknown" } as unknown as Task;

    expect(routeTask(unsupportedTask)).toEqual({
      status: "no-route",
      reason: "no provider supports task",
    });
  });
});
