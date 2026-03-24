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
              setError(String(err));
              setBusy(null);
            }
          }}
          style={{ padding: "10px 14px", borderRadius: 8, border: 0, cursor: "pointer" }}
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
              setError(String(err));
              setBusy(null);
            }
          }}
          style={{ padding: "10px 14px", borderRadius: 8, border: "1px solid #666", background: "transparent", color: "#f5f5f5", cursor: "pointer" }}
          disabled={busy !== null || !hasCustomer}
        >
          {busy === "manage" ? "Loading…" : hasCustomer ? "Manage billing" : "Manage billing unavailable"}
        </button>
      </div>

      {!hasCustomer ? (
        <p style={{ margin: 0, color: "#a1a1aa" }}>
          A Stripe customer record will be created the first time you start checkout.
        </p>
      ) : null}

      {error ? <p style={{ margin: 0, color: "#fca5a5" }}>{error}</p> : null}
    </div>
  );
}
