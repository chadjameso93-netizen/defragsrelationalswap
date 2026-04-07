import { ClosingScene, HeroScene, ListScene, StepScene, TitleCardScene } from "../../components/public/primitives";
import { PublicPageShell } from "../../components/public/page-shell";
import Link from "next/link";

const pillars = ["Simple language", "Relationship workspace", "Perspective comparison", "Practical next-step guidance"];
const PREVIEW_MESSAGES = [
  { role: "You", body: "I feel like nothing I say lands the way I mean it." },
  { role: "Defrag", body: "That pattern often shows up when two people are both trying to be heard at the same time. Let's look at what may be happening on both sides." },
];
const STEPS = [
  { label: "01 — Understand", body: "Paste a message, conversation, or situation. Defrag reads the relational context and surfaces what may actually be happening." },
  { label: "02 — Compare", body: "See both perspectives side by side. Understand how the other person may be interpreting the same exchange." },
  { label: "03 — Move", body: "Get one clear, practical next step — not therapy, not advice. Just the move that fits the moment." },
];
export default function LandingPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#050505", color: "#f5f2ec" }}>
      <style>{`
        .land-shell { max-width: 1320px; margin: 0 auto; padding: 34px 22px 80px; display:grid; gap:24px; }
        .land-card { border:1px solid rgba(255,255,255,0.08); background:linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015)); }
        .land-kicker { font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:rgba(245,242,236,0.42); }
        .land-muted { color:rgba(245,242,236,0.62); }
        .land-hero { display:grid; grid-template-columns: 1.02fr 0.98fr; gap:22px; }
        .land-title { font-size:76px; line-height:0.92; letter-spacing:-0.03em; font-family:var(--font-display), serif; }
        .land-btn { display:inline-flex; align-items:center; justify-content:center; text-decoration:none; padding:13px 16px; font-weight:600; }
        .land-btn.primary { background:#f5f2ec; color:#050505; }
        .land-btn.secondary { border:1px solid rgba(255,255,255,0.1); color:#f5f2ec; }
        .land-preview { position:relative; min-height:640px; overflow:hidden; }
        .land-preview::before { content:""; position:absolute; inset:0; background:radial-gradient(circle at 50% 50%, rgba(214,195,161,0.10), transparent 34%), radial-gradient(circle at 20% 20%, rgba(255,255,255,0.06), transparent 26%), radial-gradient(circle at 74% 74%, rgba(255,255,255,0.04), transparent 24%); }
        .land-preview::after { content:""; position:absolute; inset:0; background-image:linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px); background-size:34px 34px; opacity:0.12; }
        .land-thread { position:absolute; left:24px; top:24px; width:360px; display:grid; gap:12px; z-index:2; }
        .land-bubble { padding:14px 16px; border:1px solid rgba(255,255,255,0.08); line-height:1.65; backdrop-filter: blur(8px); }
        .land-bubble.user { background:rgba(255,255,255,0.03); }
        .land-bubble.assistant { background:rgba(214,195,161,0.08); }
        .land-fieldline { position:absolute; left:50%; top:48%; width:320px; height:2px; transform:translate(-50%, -50%); background:linear-gradient(90deg, rgba(214,195,161,0), rgba(214,195,161,0.35), rgba(255,255,255,0.42), rgba(214,195,161,0.35), rgba(214,195,161,0)); overflow:hidden; z-index:1; }
        .land-fieldline::after { content:""; position:absolute; left:-25%; top:0; bottom:0; width:25%; background:linear-gradient(90deg, transparent, rgba(255,255,255,0.65), transparent); animation:landSweep 3s linear infinite; }
        .land-node { position:absolute; width:156px; height:156px; border-radius:999px; display:grid; place-items:center; text-align:center; border:1px solid rgba(255,255,255,0.14); background:radial-gradient(circle at center, rgba(255,255,255,0.08), rgba(255,255,255,0.015)); backdrop-filter:blur(8px); z-index:2; animation:landFloat 5.2s ease-in-out infinite; }
        .land-node::before { content:""; position:absolute; inset:-14px; border-radius:999px; border:1px solid rgba(214,195,161,0.14); animation:landPulse 3.2s ease-in-out infinite; }
        .land-summary { position:absolute; left:24px; right:24px; bottom:24px; display:grid; gap:12px; z-index:2; }
        .land-chip { display:inline-flex; padding:8px 10px; border:1px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.03); font-size:12px; color:rgba(245,242,236,0.72); }
        .land-grid { display:grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap:18px; }
        .land-step { padding:18px; border:1px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.02); line-height:1.68; }
        @keyframes landSweep { from { left:-25%; } to { left:100%; } }
        @keyframes landPulse { 0%, 100% { transform:scale(1); opacity:0.4; } 50% { transform:scale(1.05); opacity:0.74; } }
        @keyframes landFloat { 0%, 100% { transform:translate(-50%, -50%) translateY(0px); } 50% { transform:translate(-50%, -50%) translateY(-5px); } }
        @media (max-width: 1080px) {
          .land-hero, .land-grid { grid-template-columns: 1fr; }
          .land-title { font-size:58px; }
          .land-thread { position:relative; left:auto; top:auto; width:auto; padding:20px 20px 0; }
          .land-preview { min-height:760px; }
        }
        @media (max-width: 720px) {
          .land-title { font-size:44px; }
          .land-preview { min-height:860px; }
          .land-node { width:138px; height:138px; }
        }
      `}</style>

      <div className="land-shell">
        <section className="land-hero">
          <div className="land-card" style={{ padding: 26, display: "grid", gap: 20, alignContent: "start" }}>
            <div className="land-kicker">Relational intelligence for real life</div>
            <div className="land-title">The tool you reach for before replying.</div>
            <div className="land-muted" style={{ maxWidth: 700, lineHeight: 1.76, fontSize: 18 }}>
              Defrag helps you understand why something landed badly, how the other person may be seeing it, and what to do next — before a text, conversation, or misunderstanding becomes a bigger problem.
            </div>
            <div className="land-muted" style={{ maxWidth: 700, lineHeight: 1.72 }}>
              Start with your baseline, then move into workspace analysis to see the pattern, compare perspectives, and choose your next move.
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link className="land-btn primary" href="/enter">Open Defrag</Link>
              <Link className="land-btn secondary" href="/studio#how-it-works">See how it works</Link>
              <Link className="land-btn secondary" href="/membership">View plans</Link>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <span className="land-chip">Simple language</span>
              <span className="land-chip">Relationship workspace</span>
              <span className="land-chip">Mobile view included</span>
            </div>
          </div>

          <section className="land-card land-preview">
            <div className="land-thread">
              {PREVIEW_MESSAGES.map((entry) => (
                <div key={entry.role} className={`land-bubble ${entry.role === "You" ? "user" : "assistant"}`}>
                  <div className="land-kicker" style={{ marginBottom: 8 }}>{entry.role}</div>
                  <div>{entry.body}</div>
                </div>
              ))}
            </div>

            <div className="land-fieldline" />

            <div className="land-node" style={{ left: "38%", top: "44%" }}>
              <div className="land-kicker" style={{ fontSize: 10 }}>self</div>
              <div style={{ fontSize: 28, fontFamily: "var(--font-display), serif" }}>You</div>
              <div className="land-muted" style={{ fontSize: 13 }}>trying to be heard</div>
            </div>

            <div className="land-node" style={{ left: "68%", top: "48%" }}>
              <div className="land-kicker" style={{ fontSize: 10 }}>family</div>
              <div style={{ fontSize: 28, fontFamily: "var(--font-display), serif" }}>Mother</div>
              <div className="land-muted" style={{ fontSize: 13 }}>guarded</div>
            </div>

            <div className="land-summary">
              <div className="land-card" style={{ padding: 16, display: "grid", gap: 10 }}>
                <div className="land-kicker">Workspace preview</div>
                <div style={{ fontSize: 24, fontFamily: "var(--font-display), serif" }}>What may be happening</div>
                <div className="land-muted" style={{ lineHeight: 1.7 }}>
                  Both people may care about the relationship, but may be reacting in ways that make each other harder to hear.
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 10 }}>
                <div className="land-step">See the main pattern more clearly.</div>
                <div className="land-step">Open a focused view for the other side.</div>
                <div className="land-step">Choose one healthier next step.</div>
              </div>
            </div>
          </section>
        </section>

        <section className="land-grid">
          {STEPS.map((step) => (
            <article key={step.label} className="land-card" style={{ padding: 20, display: "grid", gap: 12 }}>
              <div className="land-kicker">{step.label}</div>
              <div className="land-muted" style={{ lineHeight: 1.7 }}>{step.body}</div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
