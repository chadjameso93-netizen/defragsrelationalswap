import { describe, expect, it } from "vitest";
import { normalizeStripeStatus, normalizeStripeSubscription } from "../subscriptions";

describe("subscriptions normalization", () => {
  it("normalizes supported Stripe statuses", () => {
    expect(normalizeStripeStatus("active")).toBe("active");
    expect(normalizeStripeStatus("unknown_status")).toBe("none");
  });

  it("normalizes subscription payload into app shape", () => {
    const normalized = normalizeStripeSubscription(
      {
        id: "sub_123",
        status: "trialing",
        current_period_end: 1735689600,
        items: { data: [{ price: { id: "price_core" } }] },
      },
      {
        STRIPE_PRICE_CORE: "price_core",
      } as NodeJS.ProcessEnv,
    );

    expect(normalized.plan).toBe("core");
    expect(normalized.state).toBe("trialing");
  });
});
