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
        .member-card { border:1px solid rgba(255,255,255,0.08); background:linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015)); }
        .member-kicker { font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:rgba(245,242,236,0.42); }
        .member-muted { color:rgba(245,242,236,0.62); }
        .member-title { font-size:52px; line-height:0.96; font-family:var(--font-display), serif; }
        .member-grid { display:grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap:18px; }
        .member-btn { display:inline-flex; align-items:center; justify-content:center; text-decoration:none; border:none; padding:13px 16px; font-weight:600; }
        .member-btn.primary { background:#f5f2ec; color:#050505; }
        .member-step { padding:12px 14px; border:1px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.02); line-height:1.62; }
        @media (max-width: 980px) { .member-grid { grid-template-columns: 1fr; } .member-title { font-size:42px; } }
      `}</style>

      <div className="member-shell">
        <section className="member-card" style={{ padding: 24, display: "grid", gap: 16 }}>
          <div className="member-kicker">DEFRAG membership</div>
          <div className="member-title">Choose the way in</div>
          <div className="member-muted" style={{ maxWidth: 780, lineHeight: 1.72 }}>
            This page gives the product a clear paywall and plan surface now. It can later be wired to the repo’s Stripe checkout and billing routes without changing the user-facing structure.
          </div>
        </section>

        <section className="member-grid">
          {TIERS.map((tier) => (
            <article key={tier.name} className="member-card" style={{ padding: 20, display: "grid", gap: 14 }}>
              <div className="member-kicker">{tier.subtitle}</div>
              <div style={{ display: "grid", gap: 6 }}>
                <div style={{ fontSize: 32, fontFamily: "var(--font-display), serif" }}>{tier.name}</div>
                <div style={{ fontSize: 22 }}>{tier.price}</div>
              </div>
              <div style={{ display: "grid", gap: 10 }}>
                {tier.points.map((point) => (
                  <div key={point} className="member-step">{point}</div>
                ))}
              </div>
              <Link className="member-btn primary" href={tier.ctaHref}>{tier.ctaLabel}</Link>
            </article>
          ))}
        </section>

        <section className="member-card" style={{ padding: 24, display: "grid", gap: 12 }}>
          <div className="member-kicker">Next implementation step</div>
          <div className="member-muted" style={{ lineHeight: 1.72 }}>
            Wire each plan button to the existing Stripe checkout path in the repo, then route successful payment into the intake or workspace depending on the selected plan.
          </div>
        </section>
      </div>
    </main>
  );
}
