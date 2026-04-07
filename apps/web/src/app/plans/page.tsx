import Link from "next/link";
import { PLAN_CATALOG } from "../../../../../packages/billing/src";
import { PublicMarketingShell } from "../../components/marketing/public-marketing-shell";

const PUBLIC_PLAN_IDS = ["free", "core", "studio", "realtime"] as const;

const PUBLIC_PLANS = PUBLIC_PLAN_IDS.map((planId) => {
  const plan = PLAN_CATALOG[planId];
  return {
    key: plan.id,
    label: plan.name,
    price: plan.monthlyPriceUsd === 0 ? "$0" : `$${plan.monthlyPriceUsd}`,
    period: plan.monthlyPriceUsd === 0 ? "" : "/ month",
  };
});

export default function PlansPage() {
  return (
    <PublicMarketingShell>
      <section className="mk-section mk-card">
        <div className="mk-kicker">Public plans</div>
        <h1 className="mk-h2">Choose your Defrag depth.</h1>
        <p className="mk-body">Browse plans publicly, then continue to your account billing surface to subscribe or manage access.</p>
      </section>

      <section className="mk-section">
        <div className="mk-get-grid plans-grid">
          {PUBLIC_PLANS.map((plan) => (
            <article key={plan.key} className="mk-card" style={{ display: "grid", gap: 12 }}>
              <div className="mk-kicker">{plan.label}</div>
              <div style={{ fontSize: 36, lineHeight: 1, letterSpacing: "-0.03em" }}>
                {plan.price}
                {plan.period ? <span style={{ fontSize: 14, color: "rgba(245,242,236,0.58)" }}> {plan.period}</span> : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mk-section mk-card">
        <div className="mk-kicker">Billing handoff</div>
        <h2 className="mk-h2">Manage checkout and subscriptions in account billing.</h2>
        <p className="mk-body">Billing stays separate from public marketing pages. Sign in to continue to the account billing routes.</p>
        <div className="mk-actions">
          <Link className="mk-btn mk-btn-primary" href="/signin/studio">Sign in to continue</Link>
          <Link className="mk-btn mk-btn-secondary" href="/account/billing">Open account billing</Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 980px) {
          .plans-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </PublicMarketingShell>
  );
}
