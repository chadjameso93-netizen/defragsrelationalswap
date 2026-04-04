import Link from "next/link";

export default function StartPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#050505", color: "#f5f2ec" }}>
      <style>{`
        .start-shell { max-width: 1240px; margin: 0 auto; padding: 42px 22px 72px; display:grid; gap:24px; }
        .start-hero { display:grid; grid-template-columns: 1.05fr 0.95fr; gap:22px; }
        .start-card { border:1px solid rgba(255,255,255,0.08); background:linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015)); }
        .start-kicker { font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:rgba(245,242,236,0.42); }
        .start-muted { color:rgba(245,242,236,0.62); }
        .start-title { font-size:52px; line-height:0.96; font-family:var(--font-display), serif; }
        .start-grid { display:grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap:18px; }
        .start-btn { display:inline-flex; align-items:center; justify-content:center; text-decoration:none; border:none; padding:13px 16px; font-weight:600; }
        .start-btn.primary { background:#f5f2ec; color:#050505; }
        .start-btn.secondary { border:1px solid rgba(255,255,255,0.1); color:#f5f2ec; }
        .start-step { padding:16px; border:1px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.02); line-height:1.65; }
        @media (max-width: 980px) {
          .start-hero, .start-grid { grid-template-columns: 1fr; }
          .start-title { font-size:42px; }
        }
      `}</style>

      <div className="start-shell">
        <section className="start-hero">
          <div className="start-card" style={{ padding: 24, display: "grid", gap: 18 }}>
            <div className="start-kicker">Defrag start</div>
            <div className="start-title">A clearer path into DEFRAG</div>
            <div className="start-muted" style={{ lineHeight: 1.72, maxWidth: 720 }}>
              Start with your baseline, then move into the relationship workspace to see what may be happening with another person in simple language.
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link className="start-btn primary" href="/intake">Start with your baseline</Link>
              <Link className="start-btn secondary" href="/workspace/final">Open the workspace</Link>
              <Link className="start-btn secondary" href="/workspace/mobile">Open mobile view</Link>
            </div>
          </div>

          <div className="start-card" style={{ padding: 24, display: "grid", gap: 14, alignContent: "start" }}>
            <div className="start-kicker">How it flows</div>
            <div className="start-step">1. Enter the key birth details that shape your baseline view.</div>
            <div className="start-step">2. Read the first plain-language summary of how you may react, cope, and relate.</div>
            <div className="start-step">3. Bring that into the relationship workspace to understand what may be happening with another person.</div>
          </div>
        </section>

        <section className="start-grid">
          <div className="start-card" style={{ padding: 20, display: "grid", gap: 12 }}>
            <div className="start-kicker">Baseline intake</div>
            <div style={{ fontSize: 28, fontFamily: "var(--font-display), serif" }}>Simple intake</div>
            <div className="start-muted" style={{ lineHeight: 1.7 }}>
              Collect the core natal details and generate a first plain-language preview before entering the workspace.
            </div>
            <Link className="start-btn secondary" href="/intake">Open intake</Link>
          </div>

          <div className="start-card" style={{ padding: 20, display: "grid", gap: 12 }}>
            <div className="start-kicker">Relationship workspace</div>
            <div style={{ fontSize: 28, fontFamily: "var(--font-display), serif" }}>Desktop view</div>
            <div className="start-muted" style={{ lineHeight: 1.7 }}>
              Use the main thread, live field, and guided side panels to understand one situation more clearly.
            </div>
            <Link className="start-btn secondary" href="/workspace/final">Open desktop workspace</Link>
          </div>

          <div className="start-card" style={{ padding: 20, display: "grid", gap: 12 }}>
            <div className="start-kicker">iPhone-optimized</div>
            <div style={{ fontSize: 28, fontFamily: "var(--font-display), serif" }}>Mobile view</div>
            <div className="start-muted" style={{ lineHeight: 1.7 }}>
              Use the chat-first mobile layout with tabbed thread, field, and guide views.
            </div>
            <Link className="start-btn secondary" href="/workspace/mobile">Open mobile workspace</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
