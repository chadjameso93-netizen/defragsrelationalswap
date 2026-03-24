import { redirect } from "next/navigation";
import { AppShell } from "../../../components/app-shell";
import { BillingActions } from "../../../components/billing-actions";
import { getBillingStateForUser } from "../../../lib/billing-server";
import { getAuthenticatedUserOrNull } from "../../../server/auth";
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

  if (!user) {
    redirect("/login");
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
            "Checkout session creation from the app surface",
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
