import Link from "next/link";
import { AppShell } from "../../../components/app-shell";
import { BillingActions } from "../../../components/billing-actions";
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
        eyebrow="Coverage"
        title="Structured Intelligence Tiers"
        description="The environment scales based on your relational mapping and pattern frequency needs. Secure your capacity block below."
        accent="#cbb8ff"
      >
        <div style={{ display: "grid", gap: 22 }}>
          <section className="billing-preview-grid premium-fade-up" data-delay="1" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 24, alignItems: "start" }}>
            <section style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", padding: 24, display: "grid", gap: 16, background: "var(--color-surface)" }}>
              <div style={{ fontSize: 11, color: "var(--color-accent)", letterSpacing: "0.18em", textTransform: "uppercase" }}>Available Tiers</div>
              {previewPlans.map((plan, index) => (
                <div key={plan.id} style={{ display: "grid", gap: 8, padding: 18, borderRadius: "var(--radius-md)", border: index === 1 ? "1px solid var(--color-accent)" : "1px solid var(--color-border)", background: index === 1 ? "color-mix(in srgb, var(--color-accent) 15%, transparent)" : "var(--color-surface-hover)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "baseline" }}>
                    <strong style={{ fontSize: 18, color: "var(--color-text-primary)", letterSpacing: "0.05em", textTransform: "uppercase" }}>{plan.name}</strong>
                    <span style={{ color: "var(--color-text-secondary)" }}>{plan.monthlyPriceUsd ? `$${plan.monthlyPriceUsd}/mo` : "Custom"}</span>
                  </div>
                  <p style={{ margin: 0, color: "var(--color-text-secondary)", lineHeight: 1.7, fontSize: 14 }}>
                    {plan.id === "core"
                      ? "Entry capacity for mapping individual repeating loops."
                      : plan.id === "studio"
                        ? "Expanded capacity for deep historical analysis, relationship mapping, and proactive tracking."
                        : "Designed for immediate, real-time guidance streams."}
                  </p>
                </div>
              ))}
            </section>

            <section className="premium-fade-up" data-delay="2" style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", padding: 24, display: "grid", gap: 16, background: "linear-gradient(180deg, var(--color-surface), transparent)" }}>
              <div style={{ fontSize: 11, color: "var(--color-text-muted)", letterSpacing: "0.18em", textTransform: "uppercase" }}>Requirements</div>
              <div style={{ color: "var(--color-text-secondary)", lineHeight: 1.7, paddingBottom: 10 }}>
                Access is restricted to authenticated individuals. Please authenticate to verify available provisioning and initialize a dedicated environment.
              </div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
                <Link href="/login" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "14px 20px", borderRadius: "var(--radius-pill)", background: "var(--color-text-primary)", color: "var(--color-bg)", textDecoration: "none", fontWeight: 700 }}>
                  Authenticate to Continue
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
      eyebrow="Access"
      title="Intelligence Architecture"
      description="Manage your current environment allowances and intelligence layer expansion."
      accent="#cbb8ff"
    >
      <section className="billing-grid premium-fade-up" data-delay="1" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
        <section className="billing-card" style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", padding: 26, display: "grid", gap: 18, background: "var(--color-surface)" }}>
          <div style={{ display: "grid", gap: 10 }}>
            <div style={{ fontSize: 11, color: "var(--color-text-muted)", letterSpacing: "0.18em", textTransform: "uppercase" }}>Provisioned Status</div>
            <div style={{ display: "grid", gap: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, paddingBottom: 12, borderBottom: "1px solid var(--color-border)" }}>
                <span style={{ color: "var(--color-text-secondary)" }}>Tier</span>
                <strong style={{ color: "var(--color-text-primary)", textTransform: "uppercase" }}>{currentPlan.name}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, paddingBottom: 12, borderBottom: "1px solid var(--color-border)" }}>
                <span style={{ color: "var(--color-text-secondary)" }}>Uptime cycle</span>
                <strong style={{ color: "var(--color-text-primary)", textTransform: "capitalize" }}>{account.subscriptionState}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <span style={{ color: "var(--color-text-secondary)" }}>Renewal</span>
                <strong style={{ color: "var(--color-text-primary)" }}>{formatPeriodEnd(account.currentPeriodEnd)}</strong>
              </div>
            </div>
          </div>

          <BillingActions currentPlan={account.plan} hasCustomer={Boolean(account.customerId)} />
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
