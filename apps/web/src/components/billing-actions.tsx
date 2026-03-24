"use client";

import { useState } from "react";
import { getSuggestedUpgradePlan } from "../../../../packages/billing/src";
import type { BillingPlan } from "../../../../packages/core/src";

interface BillingActionsProps {
  currentPlan: BillingPlan;
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

export function BillingActions({ currentPlan }: BillingActionsProps) {
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<"upgrade" | "manage" | null>(null);
  const upgradePlan = getSuggestedUpgradePlan(currentPlan);

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
          {busy === "upgrade" ? "Loading…" : upgradePlan ? `Upgrade (${upgradePlan})` : "No upgrade available"}
        </button>

        <button
          type="button"
          onClick={async () => {
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
          disabled={busy !== null}
        >
          {busy === "manage" ? "Loading…" : "Manage billing"}
        </button>
      </div>

      {error ? <p style={{ margin: 0, color: "#fca5a5" }}>{error}</p> : null}
    </div>
  );
}
