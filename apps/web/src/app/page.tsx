"use client";

import Link from "next/link";

const recognitionPairs = [
  ["What feels urgent to you", "may feel overwhelming to someone else."],
  ["What feels like clarity", "may land as pressure."],
  ["What feels like silence", "may actually be processing."],
  ["What feels like distance", "may be someone protecting stability."],
] as const;

const guidanceBullets = [
  "when pressure is rising",
  "how you are likely to respond",
  "when not to push",
  "when clarity is better received",
  "how to protect important relationships through timing",
] as const;

const steps = [
  "Create your account",
  "Enter your birth date, time, and place",
  "DEFRAG generates your baseline design profile",
  "The platform tracks active timing and relational pressure",
  "You receive subtle guidance, daily audio, and in-app intelligence designed to help you communicate with better timing",
] as const;

const dailyReadBullets = [
  "the current relational climate",
  "what to avoid",
  "what supports clarity",
  "whether to lean in, wait, simplify, or pause",
] as const;

const baselineSystems = ["astrology", "human design", "numerology", "I Ching", "Gene Keys"] as const;

const longTermBullets = [
  "recognize repeating pressure patterns",
  "understand their own pacing",
  "reduce avoidable conflict",
  "protect important relationships",
  "build trust through better timing and less force",
] as const;

export default function HomePage() {
  return (
    <main className="homepage">
      <header className="site-header reveal">
        <div className="brand">DEFRAG</div>
        <nav aria-label="Primary navigation" className="site-nav">
          <a href="#how-it-works">How It Works</a>
          <Link href="/login">Log In</Link>
          <Link href="/login" className="cta-small">
            Create Account
          </Link>
        </nav>
      </header>

      <section className="hero reveal">
        <h1 className="font-display">Know when to lean in, when to wait, and how to avoid unnecessary damage.</h1>
        <p>
          DEFRAG uses your natal design and active timing cycles to help you navigate relationships with better pacing, clearer
          perception, and fewer preventable ruptures.
        </p>
        <div className="hero-actions">
          <Link href="/login" className="cta-primary">
            Create Account
          </Link>
          <a href="#how-it-works" className="cta-secondary">
            See How It Works
          </a>
        </div>
      </section>

      <section className="section reveal">
        <h2 className="font-display">The wrong conversation at the wrong time can change everything.</h2>
        <div className="pair-grid">
          {recognitionPairs.map(([lead, follow]) => (
            <div className="pair-card" key={lead}>
              <p className="pair-lead">{lead}</p>
              <p className="pair-follow">{follow}</p>
            </div>
          ))}
        </div>
        <p className="section-close">DEFRAG helps you recognize the difference before tension becomes damage.</p>
      </section>

      <section className="section reveal">
        <h2 className="font-display">Personalized relational guidance, timed to the moment.</h2>
        <p>
          DEFRAG builds a baseline design from your birth data, tracks active timing pressure, and translates both into practical
          guidance for communication, pacing, and relational decision-making.
        </p>
        <p>It helps you understand:</p>
        <ul>
          {guidanceBullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section id="how-it-works" className="section reveal" aria-labelledby="how-it-works-title">
        <h2 id="how-it-works-title" className="font-display">
          How it works
        </h2>
        <ol>
          {steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="section reveal">
        <h2 className="font-display">A daily read for the moments that matter.</h2>
        <p>Each day, DEFRAG can generate a short audio and written guidance layer based on your design and timing.</p>
        <p>It tells you:</p>
        <ul>
          {dailyReadBullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="section reveal">
        <h2 className="font-display">Built on a deeper profile than ordinary apps.</h2>
        <p>DEFRAG synthesizes:</p>
        <ul>
          {baselineSystems.map((system) => (
            <li key={system}>{system}</li>
          ))}
        </ul>
        <p>into one coherent baseline model that supports timing-aware relational guidance.</p>
        <p>The product translates these systems into practical language people can use in everyday life.</p>
      </section>

      <section className="section reveal">
        <h2 className="font-display">Better timing creates better relationships.</h2>
        <p>Over time, DEFRAG helps users:</p>
        <ul>
          {longTermBullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="final-cta reveal" aria-labelledby="final-cta-title">
        <h2 id="final-cta-title" className="font-display">
          Build your DEFRAG profile.
        </h2>
        <p>Create your account, generate your design, and begin receiving timing-aware relational guidance.</p>
        <Link href="/login" className="cta-primary">
          Create Account
        </Link>
      </section>

      <footer className="site-footer">
        <div>© 2026 DEFRAG</div>
        <div className="footer-links">
          <Link href="/terms">Terms</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/login">Log In</Link>
        </div>
      </footer>

      <style>{`
        :root {
          --obsidian: #080808;
          --carbon: #111111;
          --graphite: #1a1a1a;
          --smoke: #2b2b2b;
          --bone: #f5f3ee;
          --soft-white: #eae7e0;
          --steel: #8e949b;
          --lunar: #63676d;
          --deep-blue-black: #0e1320;
          --gold-ash: #a38a63;
          --pearl: #bfc6cf;
        }

        .homepage {
          max-width: 1140px;
          margin: 0 auto;
          padding: 20px 16px 80px;
          color: var(--soft-white);
          display: grid;
          gap: 72px;
        }

        .site-header {
          position: sticky;
          top: 0;
          z-index: 20;
          backdrop-filter: blur(10px);
          background: linear-gradient(180deg, rgba(8, 8, 8, 0.94), rgba(8, 8, 8, 0.82));
          border: 1px solid rgba(142, 148, 155, 0.24);
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          align-items: center;
          justify-content: space-between;
          padding: 14px 16px;
        }

        .brand {
          font-size: 0.78rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--bone);
          font-weight: 700;
        }

        .site-nav {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .site-nav a {
          color: var(--soft-white);
          border: 1px solid transparent;
          padding: 8px 12px;
          font-size: 0.9rem;
        }

        .cta-small {
          border-color: rgba(163, 138, 99, 0.5) !important;
          background: rgba(163, 138, 99, 0.12);
        }

        .hero {
          background: radial-gradient(circle at 70% 0%, rgba(14, 19, 32, 0.72), transparent 42%),
            linear-gradient(180deg, rgba(17, 17, 17, 0.96), rgba(8, 8, 8, 0.96));
          border: 1px solid rgba(142, 148, 155, 0.28);
          padding: 40px 22px;
          display: grid;
          gap: 20px;
        }

        .hero h1 {
          font-size: clamp(2.1rem, 8vw, 4.8rem);
          line-height: 0.95;
          color: var(--bone);
        }

        .hero p,
        .section p,
        li {
          color: var(--soft-white);
          line-height: 1.75;
          font-size: clamp(1rem, 2.4vw, 1.15rem);
          max-width: 72ch;
        }

        .hero-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .cta-primary,
        .cta-secondary {
          padding: 12px 18px;
          border: 1px solid rgba(142, 148, 155, 0.44);
          font-weight: 600;
          color: var(--bone);
          width: fit-content;
        }

        .cta-primary {
          background: rgba(191, 198, 207, 0.11);
          border-color: rgba(191, 198, 207, 0.44);
        }

        .cta-secondary {
          background: rgba(43, 43, 43, 0.38);
        }

        .section,
        .final-cta {
          border-top: 1px solid rgba(142, 148, 155, 0.28);
          padding-top: 28px;
          display: grid;
          gap: 18px;
        }

        .section h2,
        .final-cta h2 {
          color: var(--bone);
          font-size: clamp(1.9rem, 7vw, 3.6rem);
          line-height: 1;
        }

        .pair-grid {
          display: grid;
          gap: 12px;
        }

        .pair-card {
          border: 1px solid rgba(99, 103, 109, 0.5);
          background: linear-gradient(180deg, rgba(26, 26, 26, 0.6), rgba(17, 17, 17, 0.45));
          padding: 16px;
        }

        .pair-lead {
          color: var(--bone);
          font-weight: 600;
        }

        .pair-follow {
          color: var(--steel);
        }

        .section-close {
          color: var(--pearl);
        }

        ul,
        ol {
          margin: 0;
          padding-left: 22px;
          display: grid;
          gap: 10px;
        }

        ol li::marker,
        ul li::marker {
          color: var(--gold-ash);
        }

        .final-cta {
          background: linear-gradient(180deg, rgba(14, 19, 32, 0.5), rgba(17, 17, 17, 0.3));
          border: 1px solid rgba(142, 148, 155, 0.28);
          padding: 28px 20px;
        }

        .site-footer {
          border-top: 1px solid rgba(142, 148, 155, 0.26);
          padding-top: 20px;
          color: var(--steel);
          display: flex;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
        }

        .footer-links {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        a:focus-visible {
          outline: 2px solid var(--pearl);
          outline-offset: 2px;
          border-color: var(--pearl);
        }

        .reveal {
          animation: revealBlur 560ms ease-out both;
        }

        @keyframes revealBlur {
          from {
            opacity: 0;
            filter: blur(6px);
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            filter: blur(0px);
            transform: translateY(0px);
          }
        }

        @media (min-width: 900px) {
          .homepage {
            padding: 34px 28px 120px;
            gap: 94px;
          }

          .pair-grid {
            grid-template-columns: 1fr 1fr;
          }

          .site-header {
            padding: 16px 20px;
          }

          .hero {
            padding: 68px 52px;
          }

          .final-cta {
            padding: 40px 36px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }

          .reveal {
            animation: none;
          }

          *,
          *::before,
          *::after {
            transition-duration: 0.01ms !important;
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
          }
        }
      `}</style>
    </main>
  );
}
