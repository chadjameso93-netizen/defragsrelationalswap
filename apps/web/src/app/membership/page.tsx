import Link from "next/link";

const TIERS = [
  {
    name: "Preview",
    price: "$0",
    subtitle: "Best for trying the flow",
    points: [
      "Baseline intake preview",
      "Relationship workspace access",
      "Mobile workspace view",
    ],
    ctaHref: "/start",
    ctaLabel: "Start preview",
  },
  {
    name: "Core",
    price: "$24/mo",
    subtitle: "Best for regular personal use",
    points: [
      "Saved baseline profile",
      "Full workspace access",
      "Family overlays and focused threads",
    ],
    ctaHref: "/intake",
    ctaLabel: "Continue to intake",
  },
  {
    name: "Deep Work",
    price: "$72/mo",
    subtitle: "Best for extended reflection and family mapping",
    points: [
      "Expanded family layering",
      "Longer guided sessions",
      "Priority access to deeper workspace features",
    ],
    ctaHref: "/workspace/final",
    ctaLabel: "See workspace first",
  },
];

export default function MembershipPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#050505", color: "#f5f2ec" }}>
      <style>{`
        .member-shell { max-width: 1240px; margin: 0 auto; padding: 42px 22px 72px; display:grid; gap:24px; }
        .member-kicker { font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:rgba(245,242,236,0.42); }
        .member-muted { color:rgba(245,242,236,0.62); }
        .member-title { font-size:52px; line-height:0.96; font-family:var(--font-display), serif; }
        .member-grid { display:grid; border-top:1px solid rgba(255,255,255,0.1); }
        .member-band { display:grid; grid-template-columns:24px minmax(180px, 0.34fr) minmax(0, 1fr); gap:18px; padding:18px 0 22px; border-bottom:1px solid rgba(255,255,255,0.08); }
        .member-band-label { font-size:10px; letter-spacing:0.2em; text-transform:uppercase; color:rgba(245,242,236,0.38); font-weight:700; line-height:1.9; }
        .member-btn { display:inline-flex; align-items:center; justify-content:center; text-decoration:none; border:none; padding:13px 16px; font-weight:600; }
        .member-btn.primary { background:#f5f2ec; color:#050505; }
        .member-step { padding:0; line-height:1.72; color:rgba(245,242,236,0.74); }
        @media (max-width: 980px) { .member-band { grid-template-columns:1fr; gap:10px; } .member-title { font-size:42px; } }
      `}</style>

      <div className="member-shell">
        <section style={{ padding: "0 0 8px", display: "grid", gap: 16 }} aria-labelledby="membership-heading">
          <div className="member-kicker">DEFRAG membership</div>
          <h1 id="membership-heading" className="member-title" style={{ margin: 0 }}>Choose the way in</h1>
          <div className="member-muted" style={{ maxWidth: 780, lineHeight: 1.72 }}>
            This page gives the product a clear paywall and plan surface now. It can later be wired to the repo’s Stripe checkout and billing routes without changing the user-facing structure.
          </div>
        </section>

        <section className="member-grid" aria-label="Membership plans">
          {TIERS.map((tier) => (
            <article key={tier.name} className="member-band" aria-labelledby={`plan-${tier.name}`}>
              <div className="member-band-label" aria-hidden="true">P</div>
              <div style={{ display: "grid", gap: 8, alignContent: "start" }}>
                <div className="member-kicker">{tier.subtitle}</div>
                <h2 id={`plan-${tier.name}`} style={{ margin: 0, fontSize: 32, fontFamily: "var(--font-display), serif" }}>{tier.name}</h2>
                <div style={{ fontSize: 22 }}>{tier.price}</div>
              </div>
              <div style={{ display: "grid", gap: 12 }}>
                <div style={{ display: "grid", gap: 8 }}>
                  {tier.points.map((point) => (
                    <div key={point} className="member-step">{point}</div>
                  ))}
                </div>
                <div>
                  <Link className="member-btn primary" href={tier.ctaHref}>{tier.ctaLabel}</Link>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section style={{ display: "grid", gap: 12, borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 20 }}>
          <div className="member-kicker">Next implementation step</div>
          <div className="member-muted" style={{ lineHeight: 1.72 }}>
            Wire each plan button to the existing Stripe checkout path in the repo, then route successful payment into the intake or workspace depending on the selected plan.
          </div>
        </section>
      </div>
    </main>
  );
}
