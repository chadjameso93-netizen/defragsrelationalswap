import { ClosingScene, HeroScene, QuoteScene, StepScene, TitleCardScene } from "../../components/public/primitives";
import { PublicPageShell } from "../../components/public/page-shell";

const steps = [
  {
    step: "Step 01",
    title: "Start with your baseline",
    body: "Share core details once so Defrag can frame your communication tendencies in plain language.",
  },
  {
    step: "Step 02",
    title: "Inspect the pattern",
    body: "Open the relationship workspace to map how each person may be reading the same moment differently.",
  },
  {
    step: "Step 03",
    title: "Choose your next move",
    body: "Use guided outputs to pick one lower-pressure next step before you respond.",
  },
];

export default function HomePage() {
  return (
    <main style={{ minHeight: "100vh", background: "#050505", color: "#f5f2ec" }}>
      <style>{`
        .home-shell { max-width: 1320px; margin: 0 auto; padding: 36px 22px 84px; display:grid; gap:34px; }
        .home-band { background:linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01)); }
        .home-kicker { font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:rgba(245,242,236,0.42); }
        .home-muted { color:rgba(245,242,236,0.62); }
        .home-hero { display:grid; grid-template-columns: 1.02fr 0.98fr; gap:22px; }
        .home-title { font-size:78px; line-height:0.9; letter-spacing:-0.03em; font-family:var(--font-display), serif; }
        .home-btn { display:inline-flex; align-items:center; justify-content:center; text-decoration:none; padding:12px 16px; font-weight:600; border-radius:12px; letter-spacing:0.04em; transition:transform 180ms ease, color 180ms ease, border-color 180ms ease; }
        .home-btn:hover { transform:translateY(-1px); }
        .home-btn.primary { background:#f3ede2; color:#050505; border:1px solid rgba(243,237,226,0.82); box-shadow:0 8px 20px rgba(0,0,0,0.22); }
        .home-btn.secondary { border:1px solid rgba(255,255,255,0.18); background:transparent; color:rgba(245,242,236,0.92); font-weight:500; }
        .home-btn.secondary:hover { border-color:rgba(255,255,255,0.34); color:#ffffff; }
        .home-stage { position:relative; min-height:660px; overflow:hidden; }
        .home-stage::before { content:""; position:absolute; inset:0; background:radial-gradient(circle at 50% 50%, rgba(214,195,161,0.10), transparent 34%), radial-gradient(circle at 20% 20%, rgba(255,255,255,0.06), transparent 24%), radial-gradient(circle at 78% 76%, rgba(255,255,255,0.04), transparent 24%); }
        .home-stage::after { content:""; position:absolute; inset:0; background-image:linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px); background-size:34px 34px; opacity:0.12; }
        .home-thread { position:absolute; left:24px; top:24px; width:360px; display:grid; gap:12px; z-index:2; }
        .home-bubble { padding:14px 16px; line-height:1.66; backdrop-filter:blur(8px); }
        .home-bubble.user { background:rgba(255,255,255,0.03); }
        .home-bubble.assistant { background:rgba(214,195,161,0.08); }
        .home-line { position:absolute; left:50%; top:47%; width:320px; height:2px; transform:translate(-50%, -50%); background:linear-gradient(90deg, rgba(214,195,161,0), rgba(214,195,161,0.35), rgba(255,255,255,0.42), rgba(214,195,161,0.35), rgba(214,195,161,0)); overflow:hidden; z-index:1; }
        .home-line::after { content:""; position:absolute; left:-25%; top:0; bottom:0; width:25%; background:linear-gradient(90deg, transparent, rgba(255,255,255,0.65), transparent); animation:homeSweep 3s linear infinite; }
        .home-node { position:absolute; width:156px; height:156px; border-radius:999px; display:grid; place-items:center; text-align:center; border:1px solid rgba(255,255,255,0.14); background:radial-gradient(circle at center, rgba(255,255,255,0.08), rgba(255,255,255,0.015)); backdrop-filter:blur(8px); z-index:2; animation:homeFloat 5.2s ease-in-out infinite; }
        .home-node::before { content:""; position:absolute; inset:-14px; border-radius:999px; border:1px solid rgba(214,195,161,0.14); animation:homePulse 3.2s ease-in-out infinite; }
        .home-summary { position:absolute; left:24px; right:24px; bottom:24px; display:grid; gap:12px; z-index:2; }
        .home-chip { display:inline-flex; padding:8px 10px; background:rgba(255,255,255,0.05); font-size:12px; color:rgba(245,242,236,0.72); }
        .home-grid { display:grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap:18px; }
        .home-step { padding:18px 0; background:linear-gradient(180deg, rgba(255,255,255,0.04), transparent 80%); line-height:1.68; }
        @keyframes homeSweep { from { left:-25%; } to { left:100%; } }
        @keyframes homePulse { 0%, 100% { transform:scale(1); opacity:0.4; } 50% { transform:scale(1.05); opacity:0.74; } }
        @keyframes homeFloat { 0%, 100% { transform:translate(-50%, -50%) translateY(0px); } 50% { transform:translate(-50%, -50%) translateY(-5px); } }
        @media (max-width: 1080px) { .home-hero, .home-grid { grid-template-columns:1fr; } .home-title { font-size:58px; } .home-thread { position:relative; left:auto; top:auto; width:auto; padding:20px 20px 0; } .home-stage { min-height:760px; } }
        @media (max-width: 720px) { .home-title { font-size:44px; } .home-stage { min-height:860px; } .home-node { width:138px; height:138px; } .home-btn.primary { width:100%; } .home-btn.secondary { border:none; padding-inline:4px; text-transform:none; letter-spacing:0.01em; color:rgba(245,242,236,0.72); justify-content:flex-start; } }
      `}</style>

      <div className="home-shell">
        <section className="home-hero">
          <div className="home-band" style={{ padding: "28px 0", display: "grid", gap: 20, alignContent: "start" }}>
            <div className="home-kicker">Defrag</div>
            <div className="home-title">Understand hard relationship patterns in simple language.</div>
            <div className="home-muted" style={{ maxWidth: 720, lineHeight: 1.76, fontSize: 18 }}>
              Start with your baseline. Then move into a live relationship workspace that helps you see what may be happening, what each person may be carrying, and what could help next.
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link className="home-btn primary" href="/enter">Open DEFRAG</Link>
              <Link className="home-btn secondary" href="/signup">Create account</Link>
              <Link className="home-btn secondary" href="/billing">View plans</Link>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <span className="home-chip">Simple language</span>
              <span className="home-chip">Relationship workspace</span>
              <span className="home-chip">Baseline + mobile included</span>
            </div>
          </div>

          <section className="home-band home-stage">
            <div className="home-thread">
              <div className="home-bubble user">
                <div className="home-kicker" style={{ marginBottom: 8 }}>You</div>
                <div>I want to talk to my mom tonight, but I think we may end up missing each other again.</div>
              </div>
              <div className="home-bubble assistant">
                <div className="home-kicker" style={{ marginBottom: 8 }}>Defrag</div>
                <div>This may be a moment where both of you care about the relationship, but may be reacting in ways that make each other harder to hear.</div>
              </div>
            </div>

            <div className="home-line" />
            <div className="home-node" style={{ left: "38%", top: "44%" }}>
              <div className="home-kicker" style={{ fontSize: 10 }}>self</div>
              <div style={{ fontSize: 28, fontFamily: "var(--font-display), serif" }}>You</div>
              <div className="home-muted" style={{ fontSize: 13 }}>trying to be heard</div>
            </div>
            <div className="home-node" style={{ left: "68%", top: "48%" }}>
              <div className="home-kicker" style={{ fontSize: 10 }}>family</div>
              <div style={{ fontSize: 28, fontFamily: "var(--font-display), serif" }}>Mother</div>
              <div className="home-muted" style={{ fontSize: 13 }}>guarded</div>
            </div>

            <div className="home-summary">
              <div className="home-band" style={{ padding: "16px 0", display: "grid", gap: 10 }}>
                <div className="home-kicker">Live workspace preview</div>
                <div style={{ fontSize: 24, fontFamily: "var(--font-display), serif" }}>What may be happening</div>
                <div className="home-muted" style={{ lineHeight: 1.7 }}>Both people may care about the relationship, but may be reacting in ways that make each other harder to hear.</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 10 }}>
                <div className="home-step">See the main pattern more clearly.</div>
                <div className="home-step">Open a focused view for the other side.</div>
                <div className="home-step">Choose one healthier next step.</div>
              </div>
            </div>
          </section>
        </section>

        <section className="home-grid">
          <article className="home-band" style={{ padding: "20px 0", display: "grid", gap: 12 }}>
            <div className="home-kicker">Start with your baseline</div>
            <div className="home-muted" style={{ lineHeight: 1.7 }}>Enter the core birth details that help DEFRAG translate how you tend to react, cope, and relate into simple language.</div>
          </article>
          <article className="home-band" style={{ padding: "20px 0", display: "grid", gap: 12 }}>
            <div className="home-kicker">See the relationship more clearly</div>
            <div className="home-muted" style={{ lineHeight: 1.7 }}>Bring that baseline into the workspace to understand what may be happening between you and another person.</div>
          </article>
          <article className="home-band" style={{ padding: "20px 0", display: "grid", gap: 12 }}>
            <div className="home-kicker">Move toward a healthier next step</div>
            <div className="home-muted" style={{ lineHeight: 1.7 }}>Use the guided thread, visual field, and focused views to choose what may help next.</div>
          </article>
        </section>
      </div>
    </main>
  );
}
