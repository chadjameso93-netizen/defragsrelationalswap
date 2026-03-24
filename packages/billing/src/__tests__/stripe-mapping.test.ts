import { describe, expect, it } from "vitest";
import { getSuggestedUpgradePlan } from "../plans";
import { resolvePlanFromPriceId } from "../stripe-mapping";

describe("resolvePlanFromPriceId", () => {
  it("maps configured price ids back to plans", () => {
    const plan = resolvePlanFromPriceId(
      "price_core",
      {
        STRIPE_PRICE_CORE: "price_core",
      } as NodeJS.ProcessEnv,
    );

    expect(plan).toBe("core");
  });

  it("returns upgrade plan from billing helper", () => {
    expect(getSuggestedUpgradePlan("free")).toBe("core");
    expect(getSuggestedUpgradePlan("realtime")).toBeNull();
  });
});
