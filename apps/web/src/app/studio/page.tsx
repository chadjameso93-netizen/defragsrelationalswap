import Link from "next/link";
import { ScenePrimitive } from "../../components/marketing/ScenePrimitive";
import { marketingCopy } from "../../content/marketingCopy";

export default function StudioHomePage() {
  const recognitionPoints = [
    "You care about the relationship and still feel misread.",
    "You want to respond clearly without fueling another spiral.",
    "You need practical wording, not abstract advice.",
  ];

  const exampleOutputs = [
    {
      label: "Thread pulse",
      body: "Tone shifted after a short reply. The emotional signal became distance, even though your intent was regulation.",
    },
    {
      label: "Perspective split",
      body: "Your likely intent: avoid escalation. Their likely read: avoidance or withdrawal.",
    },
    {
      label: "Sendable next line",
      body: '"I care about this and I went short earlier. I want to respond better."',
    },
  ];

  const whyThisMatters = [
    "Hard conversations rarely break from one big event — they break from repeated small misreads.",
    "The right next sentence can preserve trust, reduce pressure, and reopen signal.",
    "Defrag helps you make that sentence more deliberate.",
  ];

  return (
    <main className="mk-page">
      <style>{`
        .mk-page {
          min-height: 100vh;
          background: #050505;
          color: #f5f2ec;
        }
        .mk-shell {
          width: min(1120px, 100%);
          margin: 0 auto;
          padding: 24px clamp(16px, 4vw, 40px) 96px;
          display: grid;
          gap: 10px;
        }
        .mk-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 12px;
        }
        .mk-brand {
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(245, 242, 236, 0.55);
        }
        .mk-nav { display: flex; gap: 12px; }
        .mk-nav a {
          color: rgba(245, 242, 236, 0.84);
          text-decoration: none;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          border-bottom: 1px solid rgba(245, 242, 236, 0.24);
        }
        .mk-scene {
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 24px;
          padding: clamp(20px, 3vw, 34px);
          display: grid;
          gap: 16px;
          position: relative;
          overflow: hidden;
          margin-top: -1px;
        }
        .mk-scene::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.05), transparent 40%);
          opacity: 0.35;
        }
        .mk-scene__label {
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(245, 242, 236, 0.56);
        }
        .mk-scene__title {
          margin: 0;
          font-family: var(--font-display), serif;
          letter-spacing: -0.03em;
          line-height: 0.95;
          font-size: clamp(1.9rem, 5vw, 4rem);
          max-width: 14ch;
        }
        .mk-scene--quick .mk-scene__title { max-width: 18ch; font-size: clamp(1.6rem, 3.6vw, 2.4rem); }
        .mk-scene--linger .mk-scene__title { font-size: clamp(2.4rem, 7vw, 5.5rem); }
        .mk-scene__description,
        .mk-copy {
          margin: 0;
          max-width: 64ch;
          color: rgba(245, 242, 236, 0.78);
          line-height: 1.75;
        }
        .mk-scene__body { position: relative; z-index: 1; display: grid; gap: 14px; }

        .mk-scene--left .mk-scene__head { justify-items: start; text-align: left; }
        .mk-scene--center .mk-scene__head { justify-items: center; text-align: center; }
        .mk-scene--center .mk-scene__description { margin-inline: auto; }
        .mk-scene--split .mk-scene__head,
        .mk-scene--split .mk-scene__body { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; align-items: start; }
        .mk-scene--split .mk-scene__title,
        .mk-scene--split .mk-scene__description { grid-column: 1; }

        .mk-scene--dark { background: linear-gradient(152deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02)); }
        .mk-scene--mist { background: radial-gradient(circle at 80% 10%, rgba(222, 205, 171, 0.18), transparent 56%), linear-gradient(158deg, rgba(255,255,255,0.09), rgba(255,255,255,0.02)); }
        .mk-scene--ember { background: radial-gradient(circle at 15% 24%, rgba(243, 187, 129, 0.13), transparent 52%), linear-gradient(168deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02)); }

        .mk-btn-row { display: flex; gap: 12px; flex-wrap: wrap; }
        .mk-btn {
          display: inline-flex;
          text-decoration: none;
          padding: 12px 18px;
          border-radius: 999px;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .mk-btn--primary { background: #f5f2ec; color: #090909; font-weight: 600; }
        .mk-btn--ghost { color: #f5f2ec; border: 1px solid rgba(255,255,255,0.24); }

        .mk-grid-3 { display: grid; gap: 12px; grid-template-columns: repeat(3, minmax(0,1fr)); }
        .mk-grid-2 { display: grid; gap: 12px; grid-template-columns: repeat(2, minmax(0,1fr)); }
        .mk-card {
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 16px;
          padding: 14px;
          background: rgba(255,255,255,0.04);
          display: grid;
          gap: 8px;
        }
        .mk-kicker { font-size: 11px; letter-spacing: 0.13em; text-transform: uppercase; color: rgba(245,242,236,0.56); }
        .mk-list { margin: 0; padding-left: 1.1rem; display: grid; gap: 8px; color: rgba(245,242,236,0.82); }

        .mk-faq { display: grid; gap: 12px; }
        .mk-faq details {
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 14px;
          padding: 12px 14px;
          background: rgba(255,255,255,0.03);
        }
        .mk-faq summary { cursor: pointer; font-weight: 500; }

        @media (max-width: 880px) {
          .mk-grid-3,
          .mk-grid-2,
          .mk-scene--split .mk-scene__head,
          .mk-scene--split .mk-scene__body {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      <div className="mk-shell">
        <header className="mk-header">
          <div className="mk-brand">Defrag · Studio</div>
          <nav className="mk-nav">
            <Link href="/signin/studio">Sign in</Link>
            <Link href="/about">Learn more</Link>
            <Link href="/plans">Plans</Link>
          </nav>
        </header>

        <ScenePrimitive label={marketingCopy.hero.kicker} title={marketingCopy.hero.title} description={marketingCopy.hero.description} tone="mist" pace="linger" align="split">
          <div>
            <div className="mk-btn-row">
              <Link className="mk-btn mk-btn--primary" href={marketingCopy.hero.primaryCtaHref}>{marketingCopy.hero.primaryCtaLabel}</Link>
              <Link className="mk-btn mk-btn--ghost" href={marketingCopy.hero.secondaryCtaHref}>{marketingCopy.hero.secondaryCtaLabel}</Link>
            </div>
            <p className="mk-copy">{marketingCopy.hero.quietNote}</p>
          </div>
          <article className="mk-card">
            <div className="mk-kicker">Live read preview</div>
            <p className="mk-copy">Tone shifted after a single “Okay.” Your intent was calm; their read was distance.</p>
          </article>
        </ScenePrimitive>

        <ScenePrimitive label="Recognition" title="When the conversation matters, speed is usually the problem." tone="dark" pace="quick" align="left">
          <ul className="mk-list">
            {recognitionPoints.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </ScenePrimitive>

        <ScenePrimitive label={marketingCopy.outputVisibility.kicker} title={marketingCopy.outputVisibility.title} tone="ember" pace="steady" align="left">
          <div className="mk-grid-3">
            {marketingCopy.outputVisibility.items.map((item) => (
              <article key={item.title} className="mk-card">
                <h3>{item.title}</h3>
                <p className="mk-copy">{item.body}</p>
              </article>
            ))}
          </div>
        </ScenePrimitive>

        <ScenePrimitive label="Example outputs" title="See the format before you enter your own moment." tone="dark" pace="quick" align="split">
          {exampleOutputs.map((sample) => (
            <article key={sample.label} className="mk-card">
              <div className="mk-kicker">{sample.label}</div>
              <p className="mk-copy">{sample.body}</p>
            </article>
          ))}
        </ScenePrimitive>

        <ScenePrimitive label={marketingCopy.coreValue.kicker} title={marketingCopy.coreValue.title} description={marketingCopy.coreValue.description} tone="mist" pace="steady" align="left">
          <ul className="mk-list">
            {marketingCopy.coreValue.coreValueBullets.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </ScenePrimitive>

        <ScenePrimitive label="Product offering" title="What the product gives you in one pass." tone="ember" pace="quick" align="center">
          <div className="mk-grid-3">
            <article className="mk-card"><p className="mk-copy">Pattern clarity</p></article>
            <article className="mk-card"><p className="mk-copy">Perspective comparison</p></article>
            <article className="mk-card"><p className="mk-copy">Practical next move</p></article>
          </div>
        </ScenePrimitive>

        <ScenePrimitive label="Why different" title={marketingCopy.coreValue.productOfferingTitle} tone="dark" pace="steady" align="left">
          <ul className="mk-list">
            {marketingCopy.coreValue.productOfferingBullets.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </ScenePrimitive>

        <ScenePrimitive label={marketingCopy.useCases.kicker} title={marketingCopy.useCases.title} description={marketingCopy.useCases.intro} tone="mist" pace="quick" align="left">
          <ul className="mk-list">
            {marketingCopy.useCases.cases.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </ScenePrimitive>

        <ScenePrimitive id="how-it-works" label={marketingCopy.howItWorks.kicker} title={marketingCopy.howItWorks.title} tone="dark" pace="steady" align="left">
          <div className="mk-grid-3">
            {marketingCopy.howItWorks.steps.map((step) => (
              <article key={step.label} className="mk-card">
                <div className="mk-kicker">{step.label}</div>
                <p className="mk-copy">{step.body}</p>
              </article>
            ))}
          </div>
        </ScenePrimitive>

        <ScenePrimitive label={marketingCopy.productSystem.kicker} title={marketingCopy.productSystem.title} description={marketingCopy.productSystem.intro} tone="ember" pace="quick" align="left">
          <ul className="mk-list">
            {marketingCopy.productSystem.systemBullets.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </ScenePrimitive>

        <ScenePrimitive label="Why this matters" title="Every better relationship arc is made of better micro-replies." tone="mist" pace="steady" align="left">
          <ul className="mk-list">
            {whyThisMatters.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </ScenePrimitive>

        <ScenePrimitive label="FAQ" title="Common questions" tone="dark" pace="quick" align="left">
          <div className="mk-faq">
            {marketingCopy.faq.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p className="mk-copy">{item.answer}</p>
              </details>
            ))}
          </div>
        </ScenePrimitive>

        <ScenePrimitive label={marketingCopy.closingCta.kicker} title={marketingCopy.closingCta.title} description={marketingCopy.closingCta.description} tone="ember" pace="linger" align="center">
          <div className="mk-btn-row" style={{ justifyContent: "center" }}>
            <Link className="mk-btn mk-btn--primary" href={marketingCopy.closingCta.primaryCtaHref}>{marketingCopy.closingCta.primaryCtaLabel}</Link>
            <Link className="mk-btn mk-btn--ghost" href={marketingCopy.closingCta.secondaryCtaHref}>{marketingCopy.closingCta.secondaryCtaLabel}</Link>
          </div>
        </ScenePrimitive>
      </div>
    </main>
  );
}
