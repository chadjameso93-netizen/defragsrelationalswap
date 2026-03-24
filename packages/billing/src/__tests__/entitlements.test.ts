import { describe, expect, it } from "vitest";
import { resolveEntitlements } from "../entitlements";

describe("resolveEntitlements", () => {
  it("gives free users limited access", () => {
    const entitlements = resolveEntitlements("free", "none");
    expect(entitlements.canUseCompanion).toBe(true);
    expect(entitlements.canUseCompanionPremiumView).toBe(false);
    expect(entitlements.monthlySituationLimit).toBe(5);
  });

  it("unlocks premium companion on active core", () => {
    const entitlements = resolveEntitlements("core", "active");
    expect(entitlements.canUseCompanionPremiumView).toBe(true);
  });
});
