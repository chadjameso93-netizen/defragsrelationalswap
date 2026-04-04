import Link from 'next/link';

const STEPS = [
  {
    title: 'Start with your baseline',
    body: 'Enter the core birth details that help DEFRAG translate how you tend to react, cope, and relate into simple language.',
  },
  {
    title: 'See the relationship more clearly',
    body: 'Bring that baseline into the workspace to understand what may be happening between you and another person.',
  },
  {
    title: 'Move toward a healthier next step',
    body: 'Use the guided thread, visual field, and focused views to choose what may help next.',
  },
];

export default function StudioHomePage() {
  return (
    <main style={{ minHeight: '100vh', background: '#040404', color: '#f5f2ec' }}>
      <style>{`
        .studio-shell { max-width: 1380px; margin: 0 auto; padding: 30px 22px 90px; display: grid; gap: 24px; }
        .studio-topbar { display: flex; align-items: center; justify-content: space-between; gap: 14px; padding: 14px 16px; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.02); backdrop-filter: blur(10px); }
        .studio-brand { display: flex; align-items: center; gap: 12px; }
        .studio-mark { width: 36px; height: 36px; border-radius: 999px; border: 1px solid rgba(214,195,161,0.24); display: grid; place-items: center; background: radial-gradient(circle at center, rgba(214,195,161,0.2), rgba(255,255,255,0.03)); box-shadow: 0 0 30px rgba(214,195,161,0.08); }
        .studio-mark::after { content: ''; width: 16px; height: 16px; border-radius: 999px; background: rgba(245,242,236,0.82); box-shadow: 0 0 18px rgba(245,242,236,0.2); }
        .studio-kicker { font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(245,242,236,0.42); }
        .studio-muted { color: rgba(245,242,236,0.64); }
        .studio-nav { display: flex; gap: 10px; flex-wrap: wrap; }
        .studio-link, .studio-chip { display: inline-flex; align-items: center; justify-content: center; text-decoration: none; padding: 9px 11px; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.02); color: #f5f2ec; font-size: 12px; }
        .studio-hero { display: grid; grid-template-columns: 1.02fr 0.98fr; gap: 22px; }
        .studio-card { position: relative; overflow: hidden; border: 1px solid rgba(255,255,255,0.08); background: linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.015)); }
        .studio-copy { padding: 34px; display: grid; gap: 20px; align-content: start; }
        .studio-title { margin: 0; font-size: 84px; line-height: 0.9; letter-spacing: -0.04em; font-family: var(--font-display), serif; max-width: 860px; }
        .studio-actions { display: flex; gap: 10px; flex-wrap: wrap; }
        .studio-btn { display: inline-flex; align-items: center; justify-content: center; text-decoration: none; padding: 14px 18px; font-weight: 600; border: 1px solid rgba(255,255,255,0.08); }
        .studio-btn.primary { background: #f5f2ec; color: #050505; }
        .studio-btn.secondary { color: #f5f2ec; background: rgba(255,255,255,0.02); }
        .studio-stage { min-height: 740px; }
        .studio-stage::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 50% 50%, rgba(214,195,161,0.12), transparent 36%), radial-gradient(circle at 18% 16%, rgba(255,255,255,0.06), transparent 26%), radial-gradient(circle at 82% 74%, rgba(255,255,255,0.04), transparent 24%); }
        .studio-stage::after { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px); background-size: 34px 34px; opacity: 0.12; }
        .studio-thread { position: absolute; left: 24px; top: 24px; width: 360px; display: grid; gap: 12px; z-index: 2; }
        .studio-bubble { padding: 14px 16px; border: 1px solid rgba(255,255,255,0.08); line-height: 1.68; backdrop-filter: blur(10px); box-shadow: 0 10px 30px rgba(0,0,0,0.18); }
        .studio-bubble.user { background: rgba(255,255,255,0.03); }
        .studio-bubble.assistant { background: rgba(214,195,161,0.08); }
        .studio-orb { position: absolute; border-radius: 999px; filter: blur(30px); opacity: 0.35; animation: studioDrift 10s ease-in-out infinite; }
        .studio-orb.a { width: 240px; height: 240px; background: rgba(214,195,161,0.18); left: -60px; top: 40px; }
        .studio-orb.b { width: 190px; height: 190px; background: rgba(255,255,255,0.1); right: 16px; top: 120px; animation-delay: -3s; }
        .studio-line { position: absolute; left: 56%; top: 46%; width: 330px; height: 2px; transform: translate(-50%, -50%); background: linear-gradient(90deg, rgba(214,195,161,0), rgba(214,195,161,0.34), rgba(255,255,255,0.46), rgba(214,195,161,0.34), rgba(214,195,161,0)); overflow: hidden; z-index: 1; }
        .studio-line::after { content: ''; position: absolute; left: -25%; top: 0; bottom: 0; width: 25%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.65), transparent); animation: studioSweep 3.2s linear infinite; }
        .studio-node { position: absolute; width: 166px; height: 166px; border-radius: 999px; display: grid; place-items: center; text-align: center; border: 1px solid rgba(255,255,255,0.14); background: radial-gradient(circle at center, rgba(255,255,255,0.09), rgba(255,255,255,0.015)); backdrop-filter: blur(10px); z-index: 2; animation: studioFloat 5.6s ease-in-out infinite; box-shadow: 0 0 44px rgba(255,255,255,0.04); }
        .studio-node::before { content: ''; position: absolute; inset: -14px; border-radius: 999px; border: 1px solid rgba(214,195,161,0.16); animation: studioPulse 3.3s ease-in-out infinite; }
        .studio-node.you { left: 42%; top: 42%; }
        .studio-node.other { left: 72%; top: 47%; animation-delay: -1.2s; }
        .studio-summary { position: absolute; left: 24px; right: 24px; bottom: 24px; display: grid; gap: 12px; z-index: 2; }
        .studio-summarygrid { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 10px; }
        .studio-step { padding: 16px; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.03); line-height: 1.66; }
        .studio-steps { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 18px; }
        .studio-metric { padding: 20px; display: grid; gap: 12px; }
        .studio-metric strong { font-size: 34px; font-family: var(--font-display), serif; font-weight: 500; }
        @keyframes studioSweep { from { left: -25%; } to { left: 100%; } }
        @keyframes studioPulse { 0%, 100% { transform: scale(1); opacity: 0.36; } 50% { transform: scale(1.05); opacity: 0.72; } }
        @keyframes studioFloat { 0%, 100% { transform: translate(-50%, -50%) translateY(0px); } 50% { transform: translate(-50%, -50%) translateY(-6px); } }
        @keyframes studioDrift { 0%, 100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(12px,-10px,0); } }
        @media (max-width: 1120px) {
          .studio-hero, .studio-steps { grid-template-columns: 1fr; }
          .studio-title { font-size: 60px; }
          .studio-stage { min-height: 880px; }
          .studio-thread { width: auto; right: 24px; }
        }
        @media (max-width: 760px) {
          .studio-title { font-size: 46px; }
          .studio-stage { min-height: 980px; }
          .studio-thread { position: relative; left: auto; top: auto; padding: 24px 24px 0; }
          .studio-node { width: 142px; height: 142px; }
          .studio-summarygrid { grid-template-columns: 1fr; }
          .studio-copy { padding: 24px; }
          .studio-topbar { align-items: flex-start; flex-direction: column; }
        }
      `}</style>

      <div className='studio-shell'>
        <header className='studio-topbar'>
          <div className='studio-brand'>
            <div className='studio-mark' />
            <div style={{ display: 'grid', gap: 4 }}>
              <div className='studio-kicker'>Defrag</div>
              <div>Relationship workspace</div>
            </div>
          </div>
          <nav className='studio-nav'>
            <Link className='studio-link' href='/workspace'>Workspace</Link>
            <Link className='studio-link' href='/billing'>Billing</Link>
            <Link className='studio-link' href='/signin'>Sign in</Link>
          </nav>
        </header>

        <section className='studio-hero'>
          <div className='studio-card studio-copy'>
            <div className='studio-kicker'>Premium relationship clarity</div>
            <h1 className='studio-title'>See what is happening between people.</h1>
            <div className='studio-muted' style={{ fontSize: 18, lineHeight: 1.78 }}>
              DEFRAG helps people understand hard relationship patterns in simple language, so they can respond in a healthier way.
            </div>
            <div className='studio-muted' style={{ lineHeight: 1.78 }}>
              Start with your baseline. Then move into a live workspace that helps you see what may be happening, what each person may be carrying, and what could help next.
            </div>
            <div className='studio-actions'>
              <Link className='studio-btn primary' href='/enter'>Open DEFRAG</Link>
              <Link className='studio-btn secondary' href='/signup'>Create account</Link>
              <Link className='studio-btn secondary' href='/workspace'>Preview workspace</Link>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <span className='studio-chip'>Simple language</span>
              <span className='studio-chip'>Live field</span>
              <span className='studio-chip'>Desktop + mobile</span>
            </div>
          </div>

          <section className='studio-card studio-stage'>
            <div className='studio-orb a' />
            <div className='studio-orb b' />
            <div className='studio-thread'>
              <div className='studio-bubble user'>
                <div className='studio-kicker' style={{ marginBottom: 8 }}>You</div>
                <div>I want to talk to my mom tonight, but I think we may end up missing each other again.</div>
              </div>
              <div className='studio-bubble assistant'>
                <div className='studio-kicker' style={{ marginBottom: 8 }}>Defrag</div>
                <div>This may be a moment where both of you care about the relationship, but may be reacting in ways that make each other harder to hear.</div>
              </div>
            </div>
            <div className='studio-line' />
            <div className='studio-node you'>
              <div className='studio-kicker' style={{ fontSize: 10 }}>self</div>
              <div style={{ fontSize: 30, fontFamily: 'var(--font-display), serif' }}>You</div>
              <div className='studio-muted' style={{ fontSize: 13 }}>trying to be heard</div>
            </div>
            <div className='studio-node other'>
              <div className='studio-kicker' style={{ fontSize: 10 }}>family</div>
              <div style={{ fontSize: 30, fontFamily: 'var(--font-display), serif' }}>Mother</div>
              <div className='studio-muted' style={{ fontSize: 13 }}>guarded</div>
            </div>
            <div className='studio-summary'>
              <div className='studio-card' style={{ padding: 16, display: 'grid', gap: 10 }}>
                <div className='studio-kicker'>Live workspace preview</div>
                <div style={{ fontSize: 26, fontFamily: 'var(--font-display), serif' }}>What may be happening</div>
                <div className='studio-muted' style={{ lineHeight: 1.74 }}>
                  Both people may care about the relationship, but may be reacting in ways that make each other harder to hear.
                </div>
              </div>
              <div className='studio-summarygrid'>
                {['See the main pattern more clearly.','Open a focused view for the other side.','Choose one healthier next step.'].map((step) => (
                  <div key={step} className='studio-step'>{step}</div>
                ))}
              </div>
            </div>
          </section>
        </section>

        <section className='studio-steps'>
          {STEPS.map((step, index) => (
            <article key={step.title} className='studio-card studio-metric'>
              <div className='studio-kicker'>Step {index + 1}</div>
              <strong>{step.title}</strong>
              <div className='studio-muted' style={{ lineHeight: 1.74 }}>{step.body}</div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
