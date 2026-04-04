"use client";

import { useState } from 'react';

type PlanId = 'core' | 'studio' | 'realtime';

const PLANS: Array<{ id: PlanId; name: string; price: string; summary: string; points: string[] }> = [
  {
    id: 'core',
    name: 'Core',
    price: '$24/mo',
    summary: 'The main DEFRAG workspace and baseline flow.',
    points: ['Baseline intake', 'Relationship workspace', 'Mobile workspace'],
  },
  {
    id: 'studio',
    name: 'Studio',
    price: '$72/mo',
    summary: 'More room for guided sessions and family work.',
    points: ['Everything in Core', 'Deeper family layering', 'Longer guided sessions'],
  },
  {
    id: 'realtime',
    name: 'Realtime',
    price: '$149/mo',
    summary: 'The highest tier for the fastest product iteration path.',
    points: ['Everything in Studio', 'Priority workspace access', 'Future realtime features'],
  },
];

export default function StudioBillingPage() {
  const [loadingPlan, setLoadingPlan] = useState<PlanId | null>(null);
  const [portalLoading, setPortalLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function startCheckout(plan: PlanId) {
    setLoadingPlan(plan);
    setError(null);

    try {
      const res = await fetch('/api/billing/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();

      if (!res.ok || !data?.url) {
        throw new Error(data?.error || 'Unable to start checkout.');
      }

      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to start checkout.');
      setLoadingPlan(null);
    }
  }

  async function openPortal() {
    setPortalLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/billing/portal', { method: 'POST' });
      const data = await res.json();

      if (!res.ok || !data?.url) {
        throw new Error(data?.error || 'Unable to open billing portal.');
      }

      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to open billing portal.');
      setPortalLoading(false);
    }
  }

  return (
    <main style={{ minHeight: '100vh', background: '#040404', color: '#f5f2ec', padding: 22 }}>
      <style>{`
        .bill-shell { max-width: 1320px; margin: 0 auto; display: grid; gap: 24px; }
        .bill-card { border: 1px solid rgba(255,255,255,0.08); background: linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.015)); box-shadow: 0 16px 40px rgba(0,0,0,0.18); }
        .bill-hero { display: grid; grid-template-columns: 1.02fr 0.98fr; gap: 22px; }
        .bill-kicker { font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(245,242,236,0.42); }
        .bill-muted { color: rgba(245,242,236,0.62); }
        .bill-title { font-size: 72px; line-height: 0.9; letter-spacing: -0.03em; font-family: var(--font-display), serif; margin: 0; }
        .bill-overview { padding: 28px; display: grid; gap: 18px; }
        .bill-actions { display: flex; gap: 10px; flex-wrap: wrap; }
        .bill-btn { border: 1px solid rgba(255,255,255,0.08); padding: 13px 16px; background: rgba(255,255,255,0.02); color: #f5f2ec; font-weight: 600; }
        .bill-btn.primary { background: #f5f2ec; color: #050505; border: 0; }
        .bill-stage { position: relative; overflow: hidden; min-height: 420px; padding: 28px; display: grid; align-content: end; }
        .bill-stage::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 22% 18%, rgba(255,255,255,0.06), transparent 24%), radial-gradient(circle at 70% 22%, rgba(214,195,161,0.10), transparent 28%), radial-gradient(circle at 66% 78%, rgba(255,255,255,0.04), transparent 24%); }
        .bill-stage > * { position: relative; z-index: 1; }
        .bill-metrics { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 12px; }
        .bill-metric { padding: 14px; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.03); }
        .bill-plans { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 18px; }
        .bill-plan { padding: 20px; display: grid; gap: 14px; }
        .bill-step { padding: 12px 14px; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.03); line-height: 1.62; }
        @media (max-width: 1100px) { .bill-hero, .bill-plans { grid-template-columns: 1fr; } .bill-title { font-size: 54px; } }
        @media (max-width: 760px) { .bill-title { font-size: 42px; } .bill-metrics { grid-template-columns: 1fr; } }
      `}</style>

      <div className='bill-shell'>
        <section className='bill-hero'>
          <div className='bill-card bill-overview'>
            <div className='bill-kicker'>Premium plans</div>
            <h1 className='bill-title'>Choose your DEFRAG studio plan.</h1>
            <div className='bill-muted' style={{ lineHeight: 1.78, fontSize: 18 }}>
              Pick the level that fits how deeply you want to use DEFRAG. This page is wired to the live Stripe checkout and billing portal routes already in the branch.
            </div>
            <div className='bill-actions'>
              <button className='bill-btn primary' onClick={openPortal} disabled={portalLoading}>{portalLoading ? 'Opening portal...' : 'Open billing portal'}</button>
            </div>
            {error ? <div style={{ color: '#fca5a5' }}>{error}</div> : null}
          </div>

          <div className='bill-card bill-stage'>
            <div className='bill-metrics'>
              <div className='bill-metric'>
                <div className='bill-kicker'>Baseline</div>
                <div style={{ marginTop: 8, fontSize: 28, fontFamily: 'var(--font-display), serif' }}>Included</div>
              </div>
              <div className='bill-metric'>
                <div className='bill-kicker'>Workspace</div>
                <div style={{ marginTop: 8, fontSize: 28, fontFamily: 'var(--font-display), serif' }}>Desktop + mobile</div>
              </div>
              <div className='bill-metric'>
                <div className='bill-kicker'>Billing</div>
                <div style={{ marginTop: 8, fontSize: 28, fontFamily: 'var(--font-display), serif' }}>Live Stripe</div>
              </div>
            </div>
          </div>
        </section>

        <section className='bill-plans'>
          {PLANS.map((plan) => (
            <article key={plan.id} className='bill-card bill-plan'>
              <div style={{ display: 'grid', gap: 6 }}>
                <div className='bill-kicker'>{plan.name}</div>
                <div style={{ fontSize: 40, fontFamily: 'var(--font-display), serif' }}>{plan.price}</div>
                <div className='bill-muted' style={{ lineHeight: 1.72 }}>{plan.summary}</div>
              </div>
              <div style={{ display: 'grid', gap: 10 }}>
                {plan.points.map((point) => (
                  <div key={point} className='bill-step'>{point}</div>
                ))}
              </div>
              <button className='bill-btn primary' onClick={() => startCheckout(plan.id)} disabled={loadingPlan === plan.id}>
                {loadingPlan === plan.id ? 'Opening checkout...' : `Choose ${plan.name}`}
              </button>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
