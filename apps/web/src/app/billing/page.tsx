"use client";

import { useState } from "react";

type PlanId = "core" | "studio" | "realtime";

const PLANS: Array<{ id: PlanId; name: string; price: string; summary: string; points: string[] }> = [
  {
    id: "core",
    name: "Core",
    price: "$24/mo",
    summary: "Best for one person starting with baseline + workspace.",
    points: ["Baseline intake", "Relationship workspace", "Mobile workspace"],
  },
  {
    id: "studio",
    name: "Studio",
    price: "$72/mo",
    summary: "Best for recurring family or team patterns.",
    points: ["Everything in Core", "Deeper family layering", "Longer guided sessions"],
  },
  {
    id: "realtime",
    name: "Realtime",
    price: "$149/mo",
    summary: "Best for intensive ongoing support and priority access.",
    points: ["Everything in Studio", "Priority workspace access", "Future realtime features"],
  },
];

export default function BillingPage() {
  const [loadingPlan, setLoadingPlan] = useState<PlanId | null>(null);
  const [portalLoading, setPortalLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function startCheckout(plan: PlanId) {
    setLoadingPlan(plan);
    setError(null);

    try {
      const res = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();

      if (!res.ok || !data?.url) {
        throw new Error(data?.error || "Unable to start checkout.");
      }

      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to start checkout.");
      setLoadingPlan(null);
    }
  }

  async function openPortal() {
    setPortalLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/billing/portal", { method: "POST" });
      const data = await res.json();

      if (!res.ok || !data?.url) {
        throw new Error(data?.error || "Unable to open billing portal.");
      }

      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to open billing portal.");
      setPortalLoading(false);
    }
  }

  return (
    <main style={{ minHeight: "100vh", background: "#050505", color: "#f5f2ec", padding: 24 }}>
      <section style={{ maxWidth: 1240, margin: "0 auto", display: "grid", gap: 24 }}>
        <div style={{ display: "grid", gap: 8, border: "1px solid rgba(255,255,255,0.08)", background: "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015))", padding: 24 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,242,236,0.42)" }}>Billing</div>
          <h1 style={{ margin: 0, fontSize: 52, lineHeight: 0.96, fontFamily: "var(--font-display), serif" }}>Choose your Defrag plan</h1>
          <div style={{ color: "rgba(245,242,236,0.62)", maxWidth: 760, lineHeight: 1.72 }}>
            Choose the plan that fits your workflow, then use billing portal access any time to manage your subscription.
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button onClick={openPortal} disabled={portalLoading} style={{ border: 0, padding: "13px 16px", background: "#f5f2ec", color: "#050505", fontWeight: 700 }}>
              {portalLoading ? "Opening portal..." : "Manage billing"}
            </button>
          </div>
          {error ? <div style={{ color: "#fca5a5" }}>{error}</div> : null}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18 }}>
          {PLANS.map((plan) => (
            <article key={plan.id} style={{ display: "grid", gap: 14, border: "1px solid rgba(255,255,255,0.08)", background: "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015))", padding: 20 }}>
              <div style={{ display: "grid", gap: 6 }}>
                <div style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,242,236,0.42)" }}>{plan.name}</div>
                <div style={{ fontSize: 34, fontFamily: "var(--font-display), serif" }}>{plan.price}</div>
                <div style={{ color: "rgba(245,242,236,0.62)", lineHeight: 1.7 }}>{plan.summary}</div>
              </div>
              <div style={{ display: "grid", gap: 10 }}>
                {plan.points.map((point) => (
                  <div key={point} style={{ padding: 12, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)", lineHeight: 1.6 }}>{point}</div>
                ))}
              </div>
              <button onClick={() => startCheckout(plan.id)} disabled={loadingPlan === plan.id} style={{ border: 0, padding: "13px 16px", background: "#f5f2ec", color: "#050505", fontWeight: 700 }}>
                {loadingPlan === plan.id ? "Opening checkout..." : `Start ${plan.name}`}
              </button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
