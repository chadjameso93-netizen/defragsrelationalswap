import Link from "next/link";
import { AppShell } from "../../../components/app-shell";
import { BillingActions } from "../../../components/billing-actions";
import { PublicPreviewCta } from "../../../components/public-preview-cta";
import { getBillingStateForUser } from "../../../lib/billing-server";
import { getAuthenticatedUserOrNull } from "../../../server/auth";
import type { BillingPlan } from "../../../../../../packages/core/src";
import { PLAN_CATALOG } from "../../../../../../packages/billing/src";

function formatPeriodEnd(value: string | null): string {
  if (!value) {
    return "—";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export default async function BillingPage() {
  const user = await getAuthenticatedUserOrNull();
  const previewPlans = (["core", "studio", "realtime"] as BillingPlan[]).map((planId) => PLAN_CATALOG[planId]);

  if (!user) {
    return (
      <AppShell
        eyebrow="Account"
        title="Billing that stays operational, not mysterious."
        description="Preview the plan ladder, upgrade flow, and Stripe-backed account rhythm here. Sign in when you want checkout, portal, and live subscription state."
        accent="#cbb8ff"
      >
        <div style={{ display: "grid", gap: 22 }}>
          <PublicPreviewCta
            title="The billing page is visible before the account handoff."
            description="You can inspect the plan architecture and account language without starting checkout. Sign in when you want a real Stripe session and a saved billing record."
            primaryLabel="Sign in for billing"
            secondaryLabel="Open Companion preview"
            secondaryHref="/companion"
          />

          <section className="billing-preview-grid" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 20 }}>
            <section style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: 24, padding: 22, display: "grid", gap: 16, background: "rgba(255,255,255,0.025)" }}>
              <div style={{ fontSize: 11, color: "#8f7dd9", letterSpacing: "0.18em", textTransform: "uppercase" }}>Plan ladder</div>
              {previewPlans.map((plan, index) => (
                <div key={plan.id} style={{ display: "grid", gap: 8, padding: 16, borderRadius: 18, border: index === 1 ? "1px solid rgba(203,184,255,0.45)" : "1px solid rgba(255,255,255,0.08)", background: index === 1 ? "rgba(203,184,255,0.08)" : "rgba(255,255,255,0.02)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "baseline" }}>
                    <strong style={{ fontSize: 18 }}>{plan.name}</strong>
                    <span style={{ color: "#d4d4d8" }}>{plan.monthlyPriceUsd ? `$${plan.monthlyPriceUsd}/mo` : "Custom"}</span>
                  </div>
                  <p style={{ margin: 0, color: "#b8bac2", lineHeight: 1.7, fontSize: 14 }}>
                    {plan.id === "core"
                      ? "Entry access for calmer insights and basic guided flow."
                      : plan.id === "studio"
                        ? "Adds deeper support for ongoing reflection and heavier use."
                        : "Designed for faster iteration and more active guidance tools."}
                  </p>
                </div>
              ))}
            </section>

            <section style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24, padding: 22, display: "grid", gap: 16, background: "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015))" }}>
              <div style={{ fontSize: 11, color: "#71717a", letterSpacing: "0.18em", textTransform: "uppercase" }}>What happens after sign-in</div>
              {[
                "Upgrade actions open Stripe Checkout in test or production mode.",
                "Portal handoff appears once a customer record exists.",
                "Webhook sync updates plan status back into the app.",
              ].map((item) => (
                <div key={item} style={{ color: "rgba(245,245,245,0.74)", lineHeight: 1.7, paddingBottom: 10, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  {item}
                </div>
              ))}
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 8 }}>
                <Link href="/login" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "12px 18px", borderRadius: 999, background: "#f5f5f5", color: "#050505", textDecoration: "none", fontWeight: 700 }}>
                  Sign in for Checkout
                </Link>
                <Link href="/account/insights" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "12px 18px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.14)", color: "#f5f5f5", textDecoration: "none" }}>
                  Open Insights preview
                </Link>
              </div>
            </section>
          </section>
        </div>
        <style>{`
          @media (max-width: 860px) {
            .billing-preview-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </AppShell>
    );
  }

  const { account } = await getBillingStateForUser(user.userId);
  const currentPlan = PLAN_CATALOG[account.plan];

  return (
    <AppShell
      eyebrow="Account"
      title="Billing that stays operational, not mysterious."
      description={`Signed in as ${user.email}. Stripe-backed subscriptions, checkout, portal access, and entitlement sync are active on this branch.`}
      accent="#cbb8ff"
    >
      <section className="billing-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
        <section className="billing-card" style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: 22, padding: 22, display: "grid", gap: 16, background: "rgba(255,255,255,0.025)" }}>
          <div style={{ display: "grid", gap: 10 }}>
            <div style={{ fontSize: 11, color: "#71717a", letterSpacing: "0.18em", textTransform: "uppercase" }}>Current state</div>
            <div style={{ display: "grid", gap: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, paddingBottom: 10, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <span style={{ color: "rgba(245,245,245,0.58)" }}>Plan</span>
                <strong>{currentPlan.name}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, paddingBottom: 10, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <span style={{ color: "rgba(245,245,245,0.58)" }}>Billing status</span>
                <strong>{account.subscriptionState}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <span style={{ color: "rgba(245,245,245,0.58)" }}>Current period end</span>
                <strong>{formatPeriodEnd(account.currentPeriodEnd)}</strong>
              </div>
            </div>
          </div>

          <BillingActions currentPlan={account.plan} hasCustomer={Boolean(account.customerId)} />
        </section>

        <section className="billing-card" style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 22, padding: 22, display: "grid", gap: 14 }}>
          <div style={{ fontSize: 11, color: "#71717a", letterSpacing: "0.18em", textTransform: "uppercase" }}>Included in this slice</div>
          {[
            "Checkout session creation from the app",
            "Customer portal handoff for active billing accounts",
            "Webhook-driven subscription synchronization",
            "Plan-aware upgrade path across free, core, studio, and realtime",
          ].map((item) => (
            <div key={item} style={{ color: "rgba(245,245,245,0.74)", lineHeight: 1.7, paddingBottom: 10, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              {item}
            </div>
          ))}
        </section>
      </section>
      <style>{`
        @media (max-width: 720px) {
          .billing-grid {
            gap: 16px !important;
          }

          .billing-card {
            border-radius: 18px !important;
            padding: 18px !important;
          }
        }
      `}</style>
    </AppShell>
  );
}
