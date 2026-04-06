import Link from "next/link";

const FLOW = [
  {
    label: "Baseline",
    body: "Start with a short natal baseline so Defrag understands how pressure may land for you.",
  },
  {
    label: "Field read",
    body: "Open one live relationship moment and map what may be happening between people.",
  },
  {
    label: "Next move",
    body: "Leave with one clear step that protects dignity and lowers distortion.",
  },
];

export default function StudioHomePage() {
  return (
    <main style={{ minHeight: "100vh", background: "#050505", color: "#f5f2ec" }}>
      <style>{`
        .st-page {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          min-height: 100vh;
          background:
            radial-gradient(1200px 680px at 78% -8%, rgba(235, 219, 190, 0.12), transparent 64%),
            radial-gradient(920px 620px at 18% 20%, rgba(255, 255, 255, 0.05), transparent 68%),
            linear-gradient(160deg, #080808 0%, #050505 42%, #090909 100%);
        }

        .st-page::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.26;
          background-image:
            radial-gradient(circle at 18% 24%, rgba(255, 255, 255, 0.16) 0.7px, transparent 0.8px),
            radial-gradient(circle at 74% 80%, rgba(255, 255, 255, 0.13) 0.7px, transparent 0.8px);
          background-size: 3px 3px, 4px 4px;
          mix-blend-mode: soft-light;
          z-index: 0;
        }

        .st-shell {
          position: relative;
          z-index: 1;
          width: min(1560px, 100%);
          margin: 0 auto;
          padding: 36px clamp(18px, 3.4vw, 48px) 120px;
          display: grid;
          gap: clamp(54px, 9vw, 118px);
        }

        .st-topbar {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 18px;
        }

        .st-brand { display: grid; gap: 4px; }
        .st-kicker {
          font-size: 10px;
          letter-spacing: 0.21em;
          text-transform: uppercase;
          color: rgba(245, 242, 236, 0.5);
        }
        .st-muted { color: rgba(245, 242, 236, 0.68); }

        .st-nav { display: flex; gap: 10px; flex-wrap: wrap; }
        .st-link {
          color: #f5f2ec;
          text-decoration: none;
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 9px 0;
          border-bottom: 1px solid rgba(245, 242, 236, 0.22);
          opacity: 0.8;
          transition: opacity 160ms ease, border-color 160ms ease;
        }
        .st-link:hover { opacity: 1; border-color: rgba(245, 242, 236, 0.5); }

        .st-hero {
          display: grid;
          grid-template-columns: minmax(0, 1.06fr) minmax(0, 0.94fr);
          gap: clamp(28px, 5vw, 80px);
          align-items: start;
        }

        .st-intro {
          display: grid;
          gap: clamp(32px, 4.4vw, 52px);
          padding-top: clamp(28px, 7vw, 120px);
          max-width: 760px;
        }

        .st-title {
          margin: 0;
          font-family: var(--font-display), serif;
          font-size: clamp(3rem, 8.6vw, 7.8rem);
          line-height: 0.84;
          letter-spacing: -0.048em;
          text-wrap: balance;
          max-width: 13ch;
        }

        .st-lead {
          margin: 0;
          font-size: clamp(1rem, 1.6vw, 1.16rem);
          line-height: 1.88;
          max-width: 54ch;
        }

        .st-actions { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; }
        .st-btn {
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          transition: transform 160ms ease, box-shadow 160ms ease, background-color 160ms ease;
        }
        .st-btn:hover { transform: translateY(-1px); }

        .st-btn-primary {
          background: linear-gradient(135deg, #faf6ee 0%, #e7d7b8 92%);
          color: #090909;
          font-weight: 600;
          font-size: 13px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 15px 24px;
          box-shadow: 0 0 0 1px rgba(243, 231, 209, 0.2), 0 12px 32px rgba(10, 10, 10, 0.4);
        }
        .st-btn-secondary {
          color: #f5f2ec;
          border: 1px solid rgba(255, 255, 255, 0.26);
          background: rgba(255, 255, 255, 0.03);
          font-size: 12px;
          letter-spacing: 0.09em;
          text-transform: uppercase;
          padding: 14px 20px;
        }
        .st-btn-tertiary {
          color: rgba(245, 242, 236, 0.78);
          font-size: 12px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 10px 4px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.3);
        }

        .st-quiet-note {
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(245, 242, 236, 0.44);
        }

        .st-field {
          position: relative;
          min-height: 760px;
          padding-top: clamp(8px, 3vw, 40px);
        }

        .st-field::before {
          content: "";
          position: absolute;
          right: -6%;
          top: 15%;
          width: 92%;
          height: 74%;
          border-radius: 46% 54% 50% 50%;
          background:
            radial-gradient(circle at 20% 24%, rgba(255, 255, 255, 0.1), transparent 44%),
            radial-gradient(circle at 76% 66%, rgba(233, 214, 183, 0.16), transparent 48%),
            linear-gradient(168deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.02));
          filter: blur(0.2px);
          opacity: 0.85;
        }

        .st-thread {
          position: absolute;
          left: 0;
          top: 0;
          width: min(420px, 88%);
          display: grid;
          gap: 14px;
          z-index: 4;
        }

        .st-bubble {
          padding: 16px 18px;
          backdrop-filter: blur(14px);
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: rgba(255, 255, 255, 0.038);
          line-height: 1.72;
          font-size: 14px;
        }

        .st-bubble.assistant {
          margin-left: 42px;
          background: linear-gradient(140deg, rgba(226, 207, 175, 0.21), rgba(255, 255, 255, 0.04));
        }

        .st-preview {
          position: absolute;
          inset: 118px 0 0 54px;
          border-radius: 28px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background:
            radial-gradient(circle at 18% 28%, rgba(255, 255, 255, 0.08), transparent 34%),
            radial-gradient(circle at 74% 42%, rgba(222, 201, 169, 0.14), transparent 40%),
            linear-gradient(160deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.015));
        }

        .st-scan {
          position: absolute;
          inset: 0;
          opacity: 0.2;
          background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 100% 36px;
          animation: stScan 8s linear infinite;
        }

        .st-orbit {
          position: absolute;
          left: 55%;
          top: 45%;
          width: min(440px, 84%);
          aspect-ratio: 1;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .st-orbit::before,
        .st-orbit::after {
          content: "";
          position: absolute;
          inset: 12%;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .st-orbit::after { inset: 28%; }

        .st-line {
          position: absolute;
          left: 56%;
          top: 47%;
          width: 340px;
          height: 1px;
          transform: translate(-50%, -50%);
          background: linear-gradient(90deg, rgba(228, 210, 179, 0), rgba(228, 210, 179, 0.4), rgba(255, 255, 255, 0.68), rgba(228, 210, 179, 0.4), rgba(228, 210, 179, 0));
        }

        .st-line::after {
          content: "";
          position: absolute;
          left: -28%;
          top: -1px;
          width: 24%;
          height: 3px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.78), transparent);
          animation: stSweep 3.6s linear infinite;
        }

        .st-node {
          position: absolute;
          width: 170px;
          aspect-ratio: 1;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.18);
          background: radial-gradient(circle at 50% 40%, rgba(255, 255, 255, 0.13), rgba(255, 255, 255, 0.03));
          display: grid;
          place-items: center;
          text-align: center;
          z-index: 3;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .st-node.you { left: 37%; top: 41%; transform: translate(-50%, -50%); }
        .st-node.other { left: 73%; top: 47%; transform: translate(-50%, -50%); }

        .st-summary {
          position: absolute;
          left: 24px;
          right: 24px;
          bottom: 22px;
          padding: 18px 20px;
          background: linear-gradient(180deg, rgba(6, 6, 6, 0.48), rgba(10, 10, 10, 0.72));
          border-top: 1px solid rgba(255, 255, 255, 0.12);
          z-index: 5;
          display: grid;
          gap: 9px;
        }

        .st-summary-title {
          margin: 0;
          font-family: var(--font-display), serif;
          font-size: clamp(1.5rem, 3.1vw, 2rem);
          line-height: 1;
          letter-spacing: -0.02em;
        }

        .st-flow-wrap {
          display: grid;
          grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
          gap: clamp(22px, 5vw, 58px);
          align-items: end;
        }

        .st-manifesto {
          max-width: 520px;
          display: grid;
          gap: 18px;
          padding-right: 20px;
        }

        .st-manifesto h2 {
          margin: 0;
          font-family: var(--font-display), serif;
          font-size: clamp(2.1rem, 4.4vw, 4rem);
          line-height: 0.9;
          letter-spacing: -0.036em;
          max-width: 12ch;
        }

        .st-flow {
          display: grid;
          gap: 0;
          border-left: 1px solid rgba(255, 255, 255, 0.18);
          padding-left: clamp(18px, 2vw, 28px);
        }

        .st-flow-item {
          display: grid;
          gap: 8px;
          padding: 18px 0 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
        }

        .st-flow-item:last-child { border-bottom: 0; padding-bottom: 0; }

        .st-flow-label {
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(245, 242, 236, 0.46);
        }

        @keyframes stSweep { from { left: -28%; } to { left: 106%; } }
        @keyframes stScan {
          from { transform: translateY(-6px); }
          50% { transform: translateY(6px); }
          to { transform: translateY(-6px); }
        }

        @media (max-width: 1180px) {
          .st-hero,
          .st-flow-wrap {
            grid-template-columns: 1fr;
          }

          .st-intro { padding-top: 10px; max-width: 100%; }
          .st-field { min-height: 800px; }
          .st-preview { inset: 178px 0 0 0; }
        }

        @media (max-width: 760px) {
          .st-shell { padding: 24px 16px 90px; gap: 68px; }
          .st-topbar { flex-direction: column; }
          .st-title { font-size: clamp(2.4rem, 13.5vw, 4rem); }
          .st-thread { position: relative; width: 100%; }
          .st-bubble.assistant { margin-left: 24px; }
          .st-field { min-height: 760px; }
          .st-preview { inset: 168px 0 0 0; border-radius: 22px; }
          .st-line { width: 220px; }
          .st-node { width: 126px; }
          .st-node.you { left: 35%; top: 44%; }
          .st-node.other { left: 71%; top: 50%; }
          .st-summary-title { font-size: 1.35rem; }
        }
      `}</style>

      <div className="st-page">
        <div className="st-shell">
          <header className="st-topbar">
            <div className="st-brand">
              <div className="st-kicker">Defrag</div>
              <div>Studio</div>
            </div>

            <nav className="st-nav">
              <Link className="st-link" href="/signin">Sign in</Link>
              <Link className="st-link" href="/signup">Create account</Link>
              <Link className="st-link" href="/workspace">Workspace preview</Link>
            </nav>
          </header>

          <section className="st-hero">
            <div className="st-intro">
              <div style={{ display: "grid", gap: 22 }}>
                <div className="st-kicker">Relationship intelligence, rendered clearly</div>
                <h1 className="st-title">See what is happening between people.</h1>
                <p className="st-lead st-muted">
                  Defrag turns difficult relationship moments into calm, plain-language field reads so you can decide what to do next with steadiness.
                </p>
              </div>

              <div style={{ display: "grid", gap: 15 }}>
                <div className="st-actions">
                  <Link className="st-btn st-btn-primary" href="/enter">Open Defrag</Link>
                  <Link className="st-btn st-btn-secondary" href="/start">Start baseline</Link>
                  <Link className="st-btn st-btn-tertiary" href="/billing">View plans</Link>
                </div>

                <div className="st-quiet-note">Built for emotional safety • plain-language first • desktop + mobile</div>
              </div>
            </div>

            <div className="st-field">
              <div className="st-thread">
                <div className="st-bubble user">
                  <div className="st-kicker" style={{ marginBottom: 8 }}>You</div>
                  I want to talk to my mom tonight, but I think we may miss each other again.
                </div>
                <div className="st-bubble assistant">
                  <div className="st-kicker" style={{ marginBottom: 8 }}>Defrag</div>
                  This may be a moment where both people care, but pressure is distorting how each side hears the other.
                </div>
              </div>

              <div className="st-preview">
                <div className="st-scan" />
                <div className="st-orbit" />
                <div className="st-line" />

                <div className="st-node you">
                  <div className="st-kicker" style={{ fontSize: 10 }}>self</div>
                  <div style={{ fontSize: 28, fontFamily: "var(--font-display), serif" }}>You</div>
                  <div className="st-muted" style={{ fontSize: 12 }}>trying to be heard</div>
                </div>

                <div className="st-node other">
                  <div className="st-kicker" style={{ fontSize: 10 }}>family</div>
                  <div style={{ fontSize: 28, fontFamily: "var(--font-display), serif" }}>Mother</div>
                  <div className="st-muted" style={{ fontSize: 12 }}>guarded</div>
                </div>

                <div className="st-summary">
                  <div className="st-kicker">Live field preview</div>
                  <h2 className="st-summary-title">What may be happening</h2>
                  <div className="st-muted" style={{ lineHeight: 1.72 }}>
                    Both people may be trying to protect the relationship, but the pace of the exchange is making each side harder to hear.
                  </div>
                </div>
              </div>
            </article>
            <article className="studio-panel">
              <div className="studio-kicker">What stays consistent</div>
              <ul className="studio-list">
                <li>Simple language you can use in real conversations.</li>
                <li>Guidance that protects dignity for both people.</li>
                <li>A consistent environment across intake, workspace, and account surfaces.</li>
              </ul>
            </article>
          </section>

          <section className="studio-close">
            <div className="studio-kicker">Start when you are ready</div>
            <div style={{ fontSize: 48, lineHeight: 0.92, fontFamily: "var(--font-display), serif" }}>Enter the studio and open one relationship moment clearly.</div>
            <div className="studio-cta">
              <Link className="studio-btn primary" href="/enter">
                Open Defrag
              </Link>
              <Link className="studio-btn secondary" href="/signin/studio">
                Sign in to continue
              </Link>
            </div>
          </section>

          <section className="st-flow-wrap">
            <article className="st-manifesto">
              <div className="st-kicker">How the flow feels</div>
              <h2>From baseline to live field, with one coherent rhythm.</h2>
              <p className="st-muted" style={{ margin: 0, lineHeight: 1.84 }}>
                The experience is designed to reduce noise. You begin with baseline context, then move into one interaction, compare perspectives, and leave with one grounded next move.
              </p>
            </article>

            <aside className="st-flow">
              {FLOW.map((item) => (
                <div key={item.label} className="st-flow-item">
                  <div className="st-flow-label">{item.label}</div>
                  <div className="st-muted" style={{ lineHeight: 1.75 }}>{item.body}</div>
                </div>
              ))}
            </aside>
          </section>
        </div>
      </div>
    </main>
  );
}
