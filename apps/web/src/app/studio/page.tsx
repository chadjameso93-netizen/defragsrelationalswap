import Link from "next/link";

const FLOW_STEPS = [
  {
    title: "Start with your baseline",
    body: "Enter core birth details in simple language so Defrag can map how pressure may land for you.",
  },
  {
    title: "Read one relationship moment",
    body: "Open the live field to see where people may be missing each other and what each side may be carrying.",
  },
  {
    title: "Choose one healthier next step",
    body: "Leave with a grounded move you can actually use in the next conversation.",
  },
];

export default function StudioHomePage() {
  return (
    <main style={{ minHeight: "100vh", background: "#050505", color: "#f5f2ec" }}>
      <style>{`
        .studio-page { position: relative; overflow: hidden; isolation: isolate; background: radial-gradient(980px 620px at 78% 8%, rgba(214,195,161,0.12), transparent 68%), radial-gradient(760px 540px at 12% 26%, rgba(255,255,255,0.06), transparent 72%), linear-gradient(164deg, #090909 0%, #050505 46%, #080808 100%); }
        .studio-page::before { content: ''; position: absolute; inset: 0; opacity: 0.22; background-image: linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px); background-size: 40px 40px; pointer-events: none; }
        .studio-shell { position: relative; z-index: 1; width: min(1520px, 100%); margin: 0 auto; padding: 34px clamp(18px, 3.2vw, 48px) 120px; display: grid; gap: clamp(56px, 10vw, 124px); }
        .studio-topbar { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; }
        .studio-brand { display: grid; gap: 6px; }
        .studio-kicker { font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(245,242,236,0.42); }
        .studio-muted { color: rgba(245,242,236,0.68); }
        .studio-nav { display: flex; gap: 10px; flex-wrap: wrap; }
        .studio-navlink { text-decoration: none; color: #f5f2ec; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; padding: 10px 0; border-bottom: 1px solid rgba(245,242,236,0.24); opacity: 0.78; }
        .studio-navlink:hover { opacity: 1; border-color: rgba(245,242,236,0.58); }

        .studio-hero { display: grid; grid-template-columns: minmax(0,1.04fr) minmax(0,0.96fr); gap: clamp(28px, 5vw, 80px); align-items: start; }
        .studio-left { display: grid; gap: clamp(30px, 4.4vw, 52px); align-content: start; padding-top: clamp(14px, 5vw, 96px); }
        .studio-title { margin: 0; font-family: var(--font-display), serif; font-size: clamp(3rem, 8.2vw, 7.2rem); line-height: 0.88; letter-spacing: -0.044em; max-width: 13ch; text-wrap: balance; }
        .studio-copy { margin: 0; line-height: 1.84; font-size: clamp(1rem, 1.42vw, 1.15rem); max-width: 54ch; }
        .studio-cta { display: flex; gap: 12px; flex-wrap: wrap; }
        .studio-btn { display: inline-flex; align-items: center; justify-content: center; border-radius: 999px; text-decoration: none; padding: 14px 22px; letter-spacing: 0.08em; text-transform: uppercase; font-size: 12px; transition: transform 160ms ease, opacity 160ms ease; }
        .studio-btn:hover { transform: translateY(-1px); }
        .studio-btn.primary { background: #f5f2ec; color: #050505; font-weight: 600; }
        .studio-btn.secondary { border: 1px solid rgba(255,255,255,0.18); color: #f5f2ec; background: rgba(255,255,255,0.03); }
        .studio-btn.tertiary { padding-inline: 10px; color: rgba(245,242,236,0.72); border-bottom: 1px solid rgba(245,242,236,0.34); border-radius: 0; }

        .studio-field { position: relative; min-height: 780px; border-radius: 30px; border: 1px solid rgba(255,255,255,0.12); overflow: hidden; background: radial-gradient(circle at 18% 24%, rgba(255,255,255,0.09), transparent 36%), radial-gradient(circle at 76% 70%, rgba(214,195,161,0.16), transparent 42%), linear-gradient(168deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015)); box-shadow: 0 24px 60px rgba(0,0,0,0.34), 0 0 90px rgba(214,195,161,0.08); }
        .studio-field::after { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,0.024) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.024) 1px, transparent 1px); background-size: 34px 34px; opacity: 0.12; }
        .studio-thread { position: absolute; left: 24px; top: 24px; width: min(420px, calc(100% - 48px)); display: grid; gap: 12px; z-index: 3; }
        .studio-bubble { padding: 15px 16px; border: 1px solid rgba(255,255,255,0.1); backdrop-filter: blur(10px); line-height: 1.72; background: rgba(255,255,255,0.038); }
        .studio-bubble.assistant { margin-left: 28px; background: linear-gradient(140deg, rgba(214,195,161,0.2), rgba(255,255,255,0.04)); }
        .studio-linkline { position: absolute; left: 56%; top: 46%; width: 340px; height: 2px; transform: translate(-50%, -50%); background: linear-gradient(90deg, rgba(214,195,161,0), rgba(214,195,161,0.34), rgba(255,255,255,0.68), rgba(214,195,161,0.34), rgba(214,195,161,0)); z-index: 2; overflow: hidden; }
        .studio-linkline::after { content: ''; position: absolute; top: 0; left: -28%; width: 28%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.72), transparent); animation: studioSweep 3.6s linear infinite; }
        .studio-node { position: absolute; width: 170px; height: 170px; border-radius: 999px; display: grid; place-items: center; text-align: center; border: 1px solid rgba(255,255,255,0.14); background: radial-gradient(circle at center, rgba(255,255,255,0.11), rgba(255,255,255,0.018)); backdrop-filter: blur(10px); box-shadow: 0 0 56px rgba(255,255,255,0.05); z-index: 3; animation: studioFloat 5.8s ease-in-out infinite; }
        .studio-node.you { left: 40%; top: 40%; }
        .studio-node.other { left: 70%; top: 46%; animation-delay: -1.3s; }
        .studio-summary { position: absolute; left: 24px; right: 24px; bottom: 24px; z-index: 3; display: grid; gap: 12px; }
        .studio-summarycard { padding: 16px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.04); }
        .studio-summarygrid { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 10px; }

        .studio-flow { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 20px; }
        .studio-flowitem { padding: 22px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.03); display: grid; gap: 12px; }
        .studio-flowitem strong { font-size: 34px; font-family: var(--font-display), serif; font-weight: 500; line-height: 1; }

        .studio-trust { display: grid; grid-template-columns: minmax(0,1.1fr) minmax(0,0.9fr); gap: 20px; align-items: start; }
        .studio-panel { border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.03); padding: clamp(20px, 3vw, 34px); display: grid; gap: 14px; }
        .studio-list { margin: 0; padding-left: 18px; line-height: 1.75; color: rgba(245,242,236,0.72); display: grid; gap: 10px; }

        .studio-close { display: grid; gap: 20px; justify-items: start; max-width: 820px; }

        @keyframes studioSweep { from { left: -28%; } to { left: 100%; } }
        @keyframes studioFloat { 0%, 100% { transform: translate(-50%, -50%) translateY(0px); } 50% { transform: translate(-50%, -50%) translateY(-6px); } }

        @media (max-width: 1120px) {
          .studio-hero, .studio-flow, .studio-trust { grid-template-columns: 1fr; }
          .studio-field { min-height: 900px; }
          .studio-title { font-size: clamp(2.7rem, 11vw, 5.3rem); }
        }
        @media (max-width: 760px) {
          .studio-shell { padding-bottom: 88px; }
          .studio-topbar { flex-direction: column; }
          .studio-field { min-height: 980px; }
          .studio-node { width: 146px; height: 146px; }
          .studio-summarygrid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="studio-page">
        <div className="studio-shell">
          <header className="studio-topbar">
            <div className="studio-brand">
              <div className="studio-kicker">Defrag · Relationship intelligence</div>
              <div>Premium studio for emotionally clear conversations</div>
            </div>
            <nav className="studio-nav">
              <Link className="studio-navlink" href="/workspace">
                Workspace
              </Link>
              <Link className="studio-navlink" href="/signin/studio">
                Sign in
              </Link>
              <Link className="studio-navlink" href="/billing/studio">
                Plans
              </Link>
            </nav>
          </header>

          <section className="studio-hero">
            <div className="studio-left">
              <div className="studio-kicker">Flagship relationship environment</div>
              <h1 className="studio-title">See what may be happening between people, with calm clarity.</h1>
              <p className="studio-copy studio-muted">
                Defrag helps you read difficult relationship moments in plain language. The studio turns one hard interaction into a clear map,
                a steadier understanding, and one practical next step.
              </p>
              <div className="studio-cta">
                <Link className="studio-btn primary" href="/enter">
                  Open Defrag
                </Link>
                <Link className="studio-btn secondary" href="/signup/studio">
                  Create account
                </Link>
                <Link className="studio-btn tertiary" href="/workspace">
                  Preview workspace
                </Link>
              </div>
              <div className="studio-kicker">Built for emotional safety · plain-language guidance · high-trust material quality</div>
            </div>

            <section className="studio-field">
              <div className="studio-thread">
                <div className="studio-bubble">
                  <div className="studio-kicker" style={{ marginBottom: 8 }}>
                    You
                  </div>
                  I want to talk to my mom tonight, but I think we may miss each other again.
                </div>
                <div className="studio-bubble assistant">
                  <div className="studio-kicker" style={{ marginBottom: 8 }}>
                    Defrag
                  </div>
                  This may be a moment where both of you care about the relationship, but may react in ways that make each other harder to hear.
                </div>
              </div>

              <div className="studio-linkline" />
              <div className="studio-node you">
                <div className="studio-kicker" style={{ fontSize: 10 }}>
                  self
                </div>
                <div style={{ fontSize: 30, fontFamily: "var(--font-display), serif" }}>You</div>
                <div className="studio-muted" style={{ fontSize: 13 }}>
                  trying to be heard
                </div>
              </div>
              <div className="studio-node other">
                <div className="studio-kicker" style={{ fontSize: 10 }}>
                  family
                </div>
                <div style={{ fontSize: 30, fontFamily: "var(--font-display), serif" }}>Mother</div>
                <div className="studio-muted" style={{ fontSize: 13 }}>
                  guarded and tired
                </div>
              </div>

              <div className="studio-summary">
                <div className="studio-summarycard">
                  <div className="studio-kicker">Field summary</div>
                  <div style={{ fontSize: 26, fontFamily: "var(--font-display), serif", marginTop: 6 }}>What may be happening right now</div>
                  <div className="studio-muted" style={{ lineHeight: 1.72, marginTop: 8 }}>
                    Both people may want connection, but pressure may be steering tone faster than either person intends.
                  </div>
                </div>
                <div className="studio-summarygrid">
                  {[
                    "See the central pattern more clearly.",
                    "Open a focused view of the other side.",
                    "Choose one lower-pressure next move.",
                  ].map((item) => (
                    <div key={item} className="studio-summarycard" style={{ lineHeight: 1.68 }}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </section>

          <section className="studio-flow">
            {FLOW_STEPS.map((step, index) => (
              <article key={step.title} className="studio-flowitem">
                <div className="studio-kicker">Step {index + 1}</div>
                <strong>{step.title}</strong>
                <div className="studio-muted" style={{ lineHeight: 1.74 }}>
                  {step.body}
                </div>
              </article>
            ))}
          </section>

          <section className="studio-trust">
            <article className="studio-panel">
              <div className="studio-kicker">Trust and safety</div>
              <div style={{ fontSize: 38, lineHeight: 0.96, fontFamily: "var(--font-display), serif" }}>Built to reduce emotional friction, not increase it.</div>
              <div className="studio-muted" style={{ lineHeight: 1.8 }}>
                Defrag is designed for steady interpretation, plain-language insight, and practical next steps. It helps you slow down reaction cycles without
                forcing clinical framing or manipulative tactics.
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
        </div>
      </div>
    </main>
  );
}
