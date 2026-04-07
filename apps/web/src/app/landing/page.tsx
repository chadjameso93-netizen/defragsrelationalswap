import Link from "next/link";

const PREVIEW_MESSAGES = [
  { role: "You", body: "I feel like nothing I say lands the way I mean it." },
  { role: "Defrag", body: "That pattern often shows up when two people are both trying to be heard at the same time. Let\u2019s look at what may be happening on both sides." },
];

const STEPS = [
  { label: "01 \u2014 Understand", body: "Paste a message, conversation, or situation. Defrag reads the relational context and surfaces what may actually be happening." },
  { label: "02 \u2014 Compare", body: "See both perspectives side by side. Understand how the other person may be interpreting the same exchange." },
  { label: "03 \u2014 Move", body: "Get one clear, practical next step \u2014 not therapy, not advice. Just the move that fits the moment." },
];

const PILLARS = ["Simple language", "Relationship workspace", "Perspective comparison", "Practical next-step guidance"];

export default function LandingPage() {
  return (
    <main style={{ minHeight: "100vh",
      background: `radial-gradient(1400px 720px at 22% 15%, rgba(214, 195, 161, 0.09), transparent 58%),
        radial-gradient(980px 680px at 78% 42%, rgba(108, 99, 255, 0.06), transparent 62%),
        linear-gradient(165deg, #080808 0%, #0a0a0a 38%, #050505 100%)`,
      color: "#f5f2ec"
    }}>
      <style>{`
        .lp-shell {
          width: min(1320px, 100%);
          margin: 0 auto;
          padding: 56px clamp(20px, 4.2vw, 64px) 120px;
          display: grid;
          gap: 80px;
        }

        /* === HERO === */
        .lp-hero {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 24px;
          align-items: start;
        }

        @media (max-width: 1080px) {
          .lp-hero { grid-template-columns: 1fr; }
          .lp-preview { min-height: 420px; }
        }

        .lp-glass {
          border: 1px solid rgba(255,255,255,0.08);
          background: linear-gradient(168deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.018) 100%), rgba(12,12,12,0.6);
          backdrop-filter: blur(16px);
          border-radius: 16px;
          position: relative;
          overflow: hidden;
        }

        .lp-glass::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(165deg, rgba(255,255,255,0.1), transparent 42%, rgba(214,195,161,0.07));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        .lp-copy {
          padding: 40px;
          display: grid;
          gap: 22px;
          align-content: start;
        }

        .lp-kicker {
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(245,242,236,0.46);
          font-weight: 600;
        }

        .lp-title {
          font-size: clamp(52px, 7.5vw, 96px);
          line-height: 0.92;
          letter-spacing: -0.04em;
          font-family: var(--font-display), serif;
          font-weight: 400;
        }

        .lp-desc {
          font-size: clamp(16px, 1.8vw, 19px);
          line-height: 1.7;
          color: rgba(245,242,236,0.74);
          max-width: 640px;
        }

        .lp-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 4px;
        }

        .lp-btn {
          display: inline-flex;
          align-items: center;
          padding: 14px 28px;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: -0.01em;
          text-decoration: none;
          transition: all 0.26s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .lp-btn.primary {
          background: linear-gradient(165deg, #f5f2ec 0%, #e2ddd1 100%);
          color: #080808;
          border: 1px solid rgba(255,255,255,0.22);
          box-shadow: 0 0 32px rgba(245,242,236,0.2), 0 8px 24px rgba(0,0,0,0.3);
        }

        .lp-btn.primary:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 0 54px rgba(245,242,236,0.35), 0 14px 32px rgba(0,0,0,0.4);
        }

        .lp-btn.secondary {
          background: rgba(255,255,255,0.04);
          color: rgba(245,242,236,0.9);
          border: 1px solid rgba(255,255,255,0.12);
          backdrop-filter: blur(10px);
        }

        .lp-btn.secondary:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.2);
          transform: translateY(-2px);
        }

        .lp-chips {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-top: 4px;
        }

        .lp-chip {
          display: inline-flex;
          padding: 6px 12px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.03);
          border-radius: 999px;
          font-size: 12px;
          color: rgba(245,242,236,0.62);
          letter-spacing: 0.02em;
        }

        /* Preview panel */
        .lp-preview {
          padding: 28px;
          display: grid;
          gap: 16px;
          align-content: start;
          min-height: 420px;
          box-shadow: 0 0 80px rgba(214,195,161,0.14), 0 24px 60px rgba(0,0,0,0.5);
        }

        .lp-preview-label {
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(214,195,161,0.6);
          font-weight: 600;
        }

        .lp-bubble {
          padding: 14px 16px;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 10px;
          font-size: 14px;
          line-height: 1.65;
        }

        .lp-bubble.user {
          background: rgba(255,255,255,0.03);
          color: rgba(245,242,236,0.72);
        }

        .lp-bubble.assistant {
          background: linear-gradient(135deg, rgba(214,195,161,0.1), rgba(214,195,161,0.04));
          border-color: rgba(214,195,161,0.12);
          color: rgba(245,242,236,0.88);
        }

        .lp-bubble-role {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(214,195,161,0.6);
          margin-bottom: 6px;
        }

        .lp-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(214,195,161,0.12) 50%, transparent 100%);
        }

        /* Steps grid */
        .lp-steps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
          gap: 20px;
        }

        .lp-step {
          padding: 28px;
          display: grid;
          gap: 12px;
          transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .lp-step:hover {
          transform: translateY(-4px);
          box-shadow: 0 0 44px rgba(214,195,161,0.12), 0 16px 40px rgba(0,0,0,0.4);
        }

        .lp-step-num {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.2em;
          color: rgba(214,195,161,0.7);
        }

        .lp-step-label {
          font-size: 17px;
          font-weight: 600;
          letter-spacing: -0.015em;
          line-height: 1.3;
        }

        .lp-step-body {
          font-size: 15px;
          line-height: 1.7;
          color: rgba(245,242,236,0.68);
        }
      `}</style>

      <div className="lp-shell">

        {/* HERO */}
        <section className="lp-hero">
          <div className="lp-glass lp-copy">
            <div className="lp-kicker">Relational intelligence for real life</div>
            <h1 className="lp-title">The tool you reach for before replying.</h1>
            <p className="lp-desc">
              Defrag helps you understand why something landed badly, how the other person may be seeing it,
              and what to do next \u2014 before a text, conversation, or misunderstanding becomes a bigger problem.
            </p>
            <div className="lp-actions">
              <Link className="lp-btn primary" href="/enter">Open Defrag</Link>
              <Link className="lp-btn secondary" href="/studio#how-it-works">See how it works</Link>
              <Link className="lp-btn secondary" href="/membership">View plans</Link>
            </div>
            <div className="lp-chips">
              {PILLARS.map(p => <span key={p} className="lp-chip">{p}</span>)}
            </div>
          </div>

          <div className="lp-glass lp-preview">
            <div className="lp-preview-label">Live read preview</div>
            {PREVIEW_MESSAGES.map(m => (
              <div key={m.role} className={`lp-bubble ${m.role === "You" ? "user" : "assistant"}`}>
                <div className="lp-bubble-role">{m.role}</div>
                <div>{m.body}</div>
              </div>
            ))}
            <div className="lp-glass" style={{ padding: "16px 18px", marginTop: 4 }}>
              <div className="lp-kicker" style={{ marginBottom: 8 }}>Workspace preview</div>
              <div style={{ fontSize: 18, fontFamily: "var(--font-display), serif", marginBottom: 8 }}>What may be happening</div>
              <div style={{ fontSize: 14, lineHeight: 1.65, color: "rgba(245,242,236,0.66)" }}>
                Both people may care about the relationship, but may be reacting in ways that make each other harder to hear.
              </div>
            </div>
          </div>
        </section>

        <div className="lp-divider" />

        {/* STEPS */}
        <section>
          <div style={{ display: "grid", gap: 36 }}>
            <div>
              <div className="lp-kicker" style={{ marginBottom: 12 }}>How it works</div>
              <h2 style={{ fontSize: "clamp(32px, 4.5vw, 54px)", lineHeight: 1.1, letterSpacing: "-0.03em", fontFamily: "var(--font-display), serif", fontWeight: 400 }}>
                Three moves to clarity.
              </h2>
            </div>
            <div className="lp-steps">
              {STEPS.map((step) => (
                <article key={step.label} className="lp-glass lp-step">
                  <div className="lp-step-num">{step.label.split(" ")[0]}</div>
                  <div className="lp-step-label">{step.label.split(" ").slice(2).join(" ")}</div>
                  <p className="lp-step-body">{step.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
