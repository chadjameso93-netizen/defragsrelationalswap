"use client";

import { useState } from "react";
import { getSuggestedUpgradePlan, PLAN_CATALOG } from "../../../../packages/billing/src";
import type { BillingPlan } from "../../../../packages/core/src";

interface BillingActionsProps {
  currentPlan: BillingPlan;
  hasCustomer: boolean;
}

async function postJson(url: string, payload: Record<string, unknown>) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const body = (await response.json()) as { url?: string; error?: string; detail?: string };

  if (!response.ok) {
    throw new Error(body.detail ?? body.error ?? "Request failed");
  }

  if (!body.url) {
    throw new Error("Missing redirect URL");
  }

  window.location.href = body.url;
}

export function BillingActions({ currentPlan, hasCustomer }: BillingActionsProps) {
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<"upgrade" | "manage" | null>(null);
  const upgradePlan = getSuggestedUpgradePlan(currentPlan);
  const upgradeDefinition = upgradePlan ? PLAN_CATALOG[upgradePlan] : null;
  const upgradeLabel = upgradeDefinition
    ? `Upgrade to ${upgradeDefinition.name}${upgradeDefinition.monthlyPriceUsd ? ` ($${upgradeDefinition.monthlyPriceUsd}/mo)` : ""}`
    : "No upgrade available";

  function presentError(err: unknown, action: "checkout" | "portal") {
    const message = err instanceof Error ? err.message : String(err);

    if (message.includes("stale_customer_for_user")) {
      return "Your billing profile needed a reset. Try checkout once more and the account will reconnect.";
    }

    if (action === "checkout") {
      return "Checkout could not start right now. Please try again in a moment.";
    }

    return "Billing portal could not open right now. Please try again in a moment.";
  }

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "flex", gap: 12 }}>
        <button
          type="button"
          onClick={async () => {
            if (!upgradePlan) {
              return;
            }

            setBusy("upgrade");
            setError(null);
            try {
              await postJson("/api/stripe/checkout", { plan: upgradePlan });
            } catch (err) {
              setError(presentError(err, "checkout"));
              setBusy(null);
            }
          }}
          className="premium-panel"
          style={{ padding: "12px 16px", borderRadius: "var(--radius-pill)", border: 0, cursor: "pointer", background: "var(--color-text-primary)", color: "var(--color-bg)", fontWeight: 700 }}
          disabled={busy !== null || !upgradePlan}
        >
          {busy === "upgrade" ? "Loading…" : upgradeLabel}
        </button>

        <button
          type="button"
          onClick={async () => {
            if (!hasCustomer) {
              return;
            }

            setBusy("manage");
            setError(null);
            try {
              await postJson("/api/stripe/portal", {});
            } catch (err) {
              setError(presentError(err, "portal"));
              setBusy(null);
            }
          }}
          className="premium-panel"
          style={{ padding: "12px 16px", borderRadius: "var(--radius-pill)", border: "1px solid rgba(255,255,255,0.18)", background: "transparent", color: "var(--color-text-primary)", cursor: "pointer" }}
          disabled={busy !== null || !hasCustomer}
        >
          {busy === "manage" ? "Loading…" : hasCustomer ? "Manage billing" : "Manage billing unavailable"}
        </button>
      </div>

      {!hasCustomer ? (
        <p style={{ margin: 0, color: "var(--color-text-secondary)" }}>
          A Stripe customer record will be created the first time you start checkout.
        </p>
      ) : null}

      {error ? <p style={{ margin: 0, color: "#fca5a5" }}>{error}</p> : null}
    </div>
  );
}
