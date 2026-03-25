import { describe, expect, it } from "vitest";
import { resolveEntitlements } from "../entitlements";

describe("resolveEntitlements", () => {
  it("gives free users limited access", () => {
    const entitlements = resolveEntitlements("free", "none");
    expect(entitlements.canUseDynamics).toBe(true);
    expect(entitlements.canUseDynamicsPremiumView).toBe(false);
    expect(entitlements.monthlySituationLimit).toBe(5);
  });

  it("unlocks premium dynamics on active core", () => {
    const entitlements = resolveEntitlements("core", "active");
    expect(entitlements.canUseDynamicsPremiumView).toBe(true);
  });
});
