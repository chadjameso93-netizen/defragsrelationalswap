import { AppShell } from "../../../components/app-shell";
import { BillingActions } from "../../../components/billing-actions";
import { getBillingStateForUser } from "../../../lib/billing-server";
import { getAuthenticatedUserOrNull } from "../../../server/auth";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PLAN_CATALOG } from "../../../../../../packages/billing/src";
import type { BillingPlan } from "../../../../../../packages/core/src";

const PUBLIC_PLAN_IDS = ["free", "core", "studio", "realtime"] as const;

type PublicPlanId = (typeof PUBLIC_PLAN_IDS)[number];

const PLAN_COPY: Record<PublicPlanId, { description: string; features: string[] }> = {
  free: {
    description: "An introduction to relational awareness with access to the Defrag workspace.",
    features: ["Workspace access", "Basic relational context", "Account-linked entry"],
  },
  core: {
    description: "Personal relational intelligence for regular support through difficult interactions.",
    features: ["Personal pattern analysis", "1:1 interaction analysis", "Structured next-step guidance"],
  },
  studio: {
    description: "Expanded support for recurring multi-person dynamics and relational systems.",
    features: ["Multi-person system analysis", "Perspective comparison", "Broader system context"],
  },
  realtime: {
    description: "High-intensity, real-time relational support for complex and fast-moving situations.",
    features: ["Priority processing", "Realtime guidance mode", "Advanced relational depth"],
  },
};

const PUBLIC_PLANS = PUBLIC_PLAN_IDS.map((planId) => {
  const plan = PLAN_CATALOG[planId];
  return {
    key: plan.id,
    label: plan.name,
    price: plan.monthlyPriceUsd === 0 ? "$0" : `$${plan.monthlyPriceUsd}`,
    period: plan.monthlyPriceUsd === 0 ? null : "/ month",
    description: PLAN_COPY[planId].description,
    features: PLAN_COPY[planId].features,
  };
});

function getPlanLabel(plan: BillingPlan): string {
  return PLAN_CATALOG[plan]?.name ?? "Free";
}

export default async function BillingPage() {
  const user = await getAuthenticatedUserOrNull();

  if (!user) {
    return (
      <AppShell
        eyebrow="Plans"
        title="Choose the Defrag access level that fits your workflow."
        description="Start with what you need now. You can change plans anytime."
      >
        <div style={{ maxWidth: 1160, display: "grid", gap: 56 }}>
          <section style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 320px", gap: 40 }} className="billing-top-grid">
            <div style={{ display: "grid", gap: 14, maxWidth: 720 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,245,245,0.38)" }}>
                Access and billing
              </div>
              <h2 className="font-display" style={{ margin: 0, fontSize: "clamp(2.3rem, 5vw, 4rem)", lineHeight: 0.96, color: "white" }}>
                Sign in to choose your plan.
              </h2>
              <p style={{ margin: 0, fontSize: 16, color: "rgba(245,245,245,0.62)", lineHeight: 1.78, fontWeight: 300 }}>
                Your account keeps your workspace, saved context, and paid access in one place. Sign in to continue to checkout and plan management.
              </p>
            </div>

            <div style={{ display: "grid", alignContent: "start", gap: 14, padding: 24, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,245,245,0.38)" }}>
                Get started
              </div>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: "rgba(245,245,245,0.58)" }}>
                Use your Defrag account to choose a plan and manage billing in one place.
              </p>
              <Link href="/signin/studio" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10, width: "fit-content", padding: "16px 28px", borderRadius: 14, background: "white", color: "#050505", textDecoration: "none", fontWeight: 600, fontSize: 16 }}>
                Sign in to continue <ArrowRight style={{ width: 18, height: 18 }} />
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

  let account: Awaited<ReturnType<typeof getBillingStateForUser>>["account"] | null = null;
  let billingLoadError: string | null = null;
  try {
    const billingState = await getBillingStateForUser(user.userId);
    account = billingState.account;
  } catch {
    billingLoadError =
      "We couldn’t load your billing status right now. You can still review plans, then try billing actions again in a moment.";
  }

  if (!account) {
    return (
      <AppShell
        eyebrow="Plans"
        title="Plans are available. Billing status is temporarily unavailable."
        description="Review plan options now. If your account details are unavailable, refresh in a moment or open billing again."
      >
        <div style={{ maxWidth: 1160, display: "grid", gap: 32 }}>
          {billingLoadError ? (
            <div style={{ padding: 16, border: "1px solid rgba(252,165,165,0.4)", background: "rgba(252,165,165,0.08)", color: "#fecaca", lineHeight: 1.65 }}>
              {billingLoadError}
            </div>
          ) : null}
          <PlanBreakdown activePlanKey={null} />
        </div>
      </AppShell>
    );
  }

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
              {getPlanLabel(activePlanKey)}
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

function PlanBreakdown({ activePlanKey }: { activePlanKey: BillingPlan | null }) {
  return (
    <div style={{ display: "grid", gap: 28 }}>
      <div style={{ display: "grid", gap: 10, maxWidth: 760 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,245,245,0.38)" }}>Plan tiers</div>
        <p style={{ margin: 0, fontSize: 16, lineHeight: 1.75, color: "rgba(245,245,245,0.58)" }}>
          Choose the level of support you need now. Upgrade any time when your workflow needs more depth.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 24 }} className="plans-grid">
        {PUBLIC_PLANS.map((plan) => {
          const isActive = activePlanKey === plan.key || (!activePlanKey && plan.key === "free");
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
