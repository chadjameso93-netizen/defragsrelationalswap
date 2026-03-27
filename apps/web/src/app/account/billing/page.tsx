import { AppShell } from "../../../components/app-shell";
import { BillingActions } from "../../../components/billing-actions";
import { getBillingStateForUser } from "../../../lib/billing-server";
import { getAuthenticatedUserOrNull } from "../../../server/auth";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function BillingPage() {
  const user = await getAuthenticatedUserOrNull();

  if (!user) {
    return (
      <AppShell
        eyebrow="Plans"
        title="Choose the level of access that fits how you want to use Defrag."
        description="Start with the workspace you need today. You can change your plan later."
      >
        <div style={{ maxWidth: 880, display: "grid", gap: 48 }}>
          <div style={{ display: "grid", gap: 16, maxWidth: 640 }}>
            <h3 style={{ margin: 0, fontSize: 22, fontWeight: 500, color: "white" }}>Sign in to choose a plan</h3>
            <p style={{ margin: 0, fontSize: 16, color: "rgba(245,245,245,0.64)", lineHeight: 1.7, fontWeight: 300 }}>
              Your account keeps your workspace, insights, and plan in one place. Sign in to continue.
            </p>
            <Link href="/login" style={{ display: "inline-flex", alignItems: "center", gap: 10, width: "fit-content", padding: "16px 28px", borderRadius: 14, background: "white", color: "#050505", textDecoration: "none", fontWeight: 600, fontSize: 16 }}>
              Sign in <ArrowRight style={{ width: 18, height: 18 }} />
            </Link>
          </div>

          <PlanBreakdown activePlanKey={null} />
        </div>
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
      <div style={{ maxWidth: 980, display: "grid", gap: 48 }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 24, paddingBottom: 32, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display: "grid", gap: 8 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,245,245,0.4)" }}>Current plan</div>
            <div style={{ fontSize: 30, fontWeight: 400, color: "white", letterSpacing: "-0.02em", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              {activePlanKey === "realtime" ? "Studio+" : activePlanKey === "studio" ? "Studio" : activePlanKey === "core" ? "Core" : "Base"}
              {isSubscribed ? (
                <span style={{ padding: "4px 10px", borderRadius: 9999, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", color: "#6ee7b7", fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase" }}>
                  Active
                </span>
              ) : null}
            </div>
            <p style={{ margin: 0, fontSize: 14, color: "rgba(245,245,245,0.52)" }}>{user.email}</p>
          </div>

          <BillingActions currentPlan={account.plan} hasCustomer={isSubscribed} />
        </div>

        <PlanBreakdown activePlanKey={activePlanKey} />
      </div>
    </AppShell>
  );
}

function PlanBreakdown({ activePlanKey }: { activePlanKey: string | null }) {
  const plans = [
    {
      key: "base",
      label: "Base",
      price: "Included",
      description: "A simple starting point for saving context and opening your workspace.",
    },
    {
      key: "core",
      label: "Core",
      price: "$15",
      period: "/ month",
      description: "Ongoing insight access for people who want regular support reading difficult interactions.",
    },
    {
      key: "studio",
      label: "Studio",
      price: "$45",
      period: "/ month",
      description: "Deeper pattern review for people who want a broader view across time, timing, and repeated tension.",
    },
  ];

  return (
    <div style={{ display: "grid", gap: 28 }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,245,245,0.4)" }}>Plans</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 28 }} className="plans-grid">
        {plans.map((plan) => {
          const isActive = activePlanKey === plan.key;
          return (
            <div key={plan.key} style={{ display: "grid", gap: 14, padding: 24, border: "1px solid rgba(255,255,255,0.08)", background: isActive ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)" }}>
              <div style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.14em", color: isActive ? "#ffffff" : "rgba(245,245,245,0.56)" }}>
                {plan.label}
              </div>
              <div style={{ fontSize: 28, fontWeight: 400, color: "white", letterSpacing: "-0.02em" }}>
                {plan.price}
                {plan.period ? <span style={{ fontSize: 15, color: "rgba(245,245,245,0.42)" }}> {plan.period}</span> : null}
              </div>
              <p style={{ margin: 0, color: "rgba(245,245,245,0.64)", lineHeight: 1.7, fontSize: 14, fontWeight: 300 }}>
                {plan.description}
              </p>
              {isActive ? <div style={{ fontSize: 12, color: "rgba(255,255,255,0.56)" }}>Current plan</div> : null}
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
