import { describe, expect, it } from "vitest";
import { resolveEntitlements } from "../../../../../../packages/billing/src";

describe("billing state access helpers", () => {
  it("derives entitlements from persisted billing state shape", () => {
    const entitlements = resolveEntitlements("studio", "active");
    expect(entitlements.canUseStudio).toBe(true);
  });
});
