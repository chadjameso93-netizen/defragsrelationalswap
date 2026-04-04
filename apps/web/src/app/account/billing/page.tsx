import { AppShell } from "../../../components/app-shell";
import { BillingActions } from "../../../components/billing-actions";
import { getBillingStateForUser } from "../../../lib/billing-server";
import { getAuthenticatedUserOrNull } from "../../../server/auth";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const PLANS = [
  {
    key: "base",
    label: "Free",
    price: "Included",
    description: "An introduction to relational awareness and access to the Defrag workspace.",
    features: ["workspace access", "basic relational context", "account-linked entry"],
  },
  {
    key: "core",
    label: "Solo",
    price: "$15",
    period: "/ month",
    description: "Full personal relational intelligence for people who want regular support understanding difficult interactions.",
    features: ["personal pattern analysis", "1:1 interaction analysis", "structured next-step guidance"],
  },
  {
    key: "studio",
    label: "Team",
    price: "$45",
    period: "/ month",
    description: "Relational intelligence across collaborative systems, recurring pressure, and broader multi-person dynamics.",
    features: ["multi-person system analysis", "perspective comparison", "broader team and family dynamics"],
  },
];

export default async function BillingPage() {
  const user = await getAuthenticatedUserOrNull();

  if (!user) {
    return (
      <AppShell
        eyebrow="Plans"
        title="Choose the level of access that fits how you want to use Defrag."
        description="Start with the workspace you need today. You can change your plan later."
      >
        <div style={{ maxWidth: 1160, display: "grid", gap: 56 }}>
          <section style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 320px", gap: 40 }} className="billing-top-grid">
            <div style={{ display: "grid", gap: 14, maxWidth: 720 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,245,245,0.38)" }}>
                Access and billing
              </div>
              <h2 className="font-display" style={{ margin: 0, fontSize: "clamp(2.3rem, 5vw, 4rem)", lineHeight: 0.96, color: "white" }}>
                Sign in to choose a plan.
              </h2>
              <p style={{ margin: 0, fontSize: 16, color: "rgba(245,245,245,0.62)", lineHeight: 1.78, fontWeight: 300 }}>
                Your account keeps your workspace, saved context, and paid access in one place. Sign in to continue to checkout.
              </p>
            </div>

            <div style={{ display: "grid", alignContent: "start", gap: 14, padding: 24, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,245,245,0.38)" }}>
                Get started
              </div>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: "rgba(245,245,245,0.58)" }}>
                Use your Defrag account to choose a plan and manage billing in one place.
              </p>
              <Link href="/login" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10, width: "fit-content", padding: "16px 28px", borderRadius: 14, background: "white", color: "#050505", textDecoration: "none", fontWeight: 600, fontSize: 16 }}>
                Sign in <ArrowRight style={{ width: 18, height: 18 }} />
              </Link>
            </div>
          </section>

          <PlanBreakdown activePlanKey={null} />
        </div>

        <style>{`
          @media (max-width: 960px) {
            .billing-top-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </AppShell>
    );
  }

  const { account } = await getBillingStateForUser(user.userId);
  const activePlanKey = account.plan;
  const isSubscribed = account.subscriptionState === "active" || account.subscriptionState === "trialing";

  return (
    <AppShell
      eyebrow="Plans"
      title="Manage your Defrag access."
      description="Review your current plan, change access when needed, and keep your workspace ready."
    >
      <div style={{ maxWidth: 1160, display: "grid", gap: 56 }}>
        <section style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 360px", gap: 40, alignItems: "start" }} className="billing-top-grid">
          <div style={{ display: "grid", gap: 16, paddingBottom: 24, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,245,245,0.38)" }}>Current access</div>
            <div style={{ fontSize: 40, fontWeight: 400, color: "white", letterSpacing: "-0.03em", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              {activePlanKey === "realtime" ? "Studio+" : activePlanKey === "studio" ? "Team" : activePlanKey === "core" ? "Solo" : "Free"}
              {isSubscribed ? (
                <span style={{ padding: "5px 10px", border: "1px solid rgba(159,179,164,0.2)", color: "#c8d8a2", fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" }}>
                  Current
                </span>
              ) : null}
            </div>
            <p style={{ margin: 0, fontSize: 14, color: "rgba(245,245,245,0.5)" }}>{user.email}</p>
          </div>

          <div style={{ display: "grid", gap: 18, padding: 24, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,245,245,0.38)" }}>
              Billing actions
            </div>
            <BillingActions currentPlan={account.plan} hasCustomer={isSubscribed} />
          </div>
        </section>

        <PlanBreakdown activePlanKey={activePlanKey} />
      </div>

      <style>{`
        @media (max-width: 960px) {
          .billing-top-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </AppShell>
  );
}

function PlanBreakdown({ activePlanKey }: { activePlanKey: string | null }) {
  return (
    <div style={{ display: "grid", gap: 28 }}>
      <div style={{ display: "grid", gap: 10, maxWidth: 760 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,245,245,0.38)" }}>Access tiers</div>
        <p style={{ margin: 0, fontSize: 16, lineHeight: 1.75, color: "rgba(245,245,245,0.58)" }}>
          Defrag is structured as an intelligence tier system. Choose the level that matches the depth of analysis and ongoing support you need.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 24 }} className="plans-grid">
        {PLANS.map((plan) => {
          const isActive = activePlanKey === plan.key || (!activePlanKey && plan.key === "base");
          return (
            <div key={plan.key} style={{ display: "grid", gap: 18, padding: 26, border: isActive ? "1px solid rgba(255,255,255,0.18)" : "1px solid rgba(255,255,255,0.08)", background: isActive ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)" }}>
              <div style={{ display: "grid", gap: 10 }}>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: isActive ? "white" : "rgba(245,245,245,0.52)" }}>
                  {plan.label}
                </div>
                <div style={{ fontSize: 34, fontWeight: 400, color: "white", letterSpacing: "-0.03em", lineHeight: 1 }}>
                  {plan.price}
                  {plan.period ? <span style={{ fontSize: 15, color: "rgba(245,245,245,0.42)" }}> {plan.period}</span> : null}
                </div>
                <p style={{ margin: 0, color: "rgba(245,245,245,0.62)", lineHeight: 1.72, fontSize: 14, fontWeight: 300 }}>
                  {plan.description}
                </p>
              </div>

              <div style={{ display: "grid", gap: 10, paddingTop: 8, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                {plan.features.map((feature) => (
                  <div key={feature} style={{ fontSize: 13, color: "rgba(245,245,245,0.82)", lineHeight: 1.6 }}>
                    {feature}
                  </div>
                ))}
              </div>

              {isActive ? <div style={{ fontSize: 12, color: "rgba(255,255,255,0.56)" }}>Current access</div> : null}
            </div>
          );
        })}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .plans-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
