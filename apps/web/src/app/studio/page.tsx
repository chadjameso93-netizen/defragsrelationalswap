import Link from "next/link";
import { ClosingCtaSection } from "../../components/marketing/ClosingCtaSection";
import { HeroSection } from "../../components/marketing/HeroSection";
import { HowItWorksSection } from "../../components/marketing/HowItWorksSection";
import { OutputVisibilitySection } from "../../components/marketing/OutputVisibilitySection";
import { ProofBlockSection } from "../../components/marketing/ProofBlockSection";
import { marketingCopy } from "../../content/marketingCopy";

export default function StudioHomePage() {
  return (
    <main className="mk-page">
      <style>{`
        .mk-page {
          min-height: 100vh;
          background:
            radial-gradient(1200px 680px at 78% -8%, rgba(234, 218, 181, 0.16), transparent 64%),
            radial-gradient(940px 700px at -8% 18%, rgba(255, 255, 255, 0.06), transparent 70%),
            linear-gradient(168deg, #060606 0%, #090909 48%, #050505 100%);
          color: #f5f2ec;
          position: relative;
          overflow: clip;
        }
        .mk-page::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          background: repeating-linear-gradient(
            120deg,
            rgba(255, 255, 255, 0.018) 0,
            rgba(255, 255, 255, 0.018) 1px,
            transparent 1px,
            transparent 6px
          );
          opacity: 0.24;
          mix-blend-mode: soft-light;
        }
        .mk-shell {
          width: min(1160px, 100%);
          margin: 0 auto;
          padding: 24px clamp(16px, 3.8vw, 42px) 86px;
          display: grid;
          gap: 44px;
          position: relative;
          z-index: 1;
        }
        .mk-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 14px;
        }
        .mk-brand {
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(245, 242, 236, 0.56);
        }
        .mk-nav { display: flex; gap: 12px; flex-wrap: wrap; }
        .mk-nav a {
          color: rgba(245, 242, 236, 0.84);
          text-decoration: none;
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          border-bottom: 1px solid rgba(245, 242, 236, 0.24);
          padding: 6px 0;
          transition: border-color 180ms ease, color 180ms ease;
        }
        .mk-nav a:hover {
          color: #fff;
          border-color: rgba(245, 242, 236, 0.64);
        }
        .mk-section {
          display: grid;
          gap: 12px;
          animation: mk-rise 700ms ease both;
          animation-delay: calc(var(--mk-delay, 0) * 80ms);
        }
        .mk-hero {
          --mk-delay: 0;
          padding-top: 12px;
          min-height: min(64vh, 660px);
          align-content: center;
          position: relative;
          isolation: isolate;
        }
        .mk-hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(260px, 0.76fr);
          gap: clamp(18px, 3vw, 36px);
          align-items: end;
        }
        .mk-hero-copy { display: grid; gap: 12px; }
        .mk-hero::after {
          content: "";
          position: absolute;
          right: -6%;
          top: 12%;
          width: min(510px, 52vw);
          height: min(510px, 52vw);
          border-radius: 28px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          background:
            radial-gradient(70% 60% at 62% 22%, rgba(237, 222, 187, 0.2), transparent 70%),
            linear-gradient(150deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.01));
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.02), 0 40px 90px rgba(0, 0, 0, 0.48);
          filter: blur(0.2px) saturate(112%);
          z-index: -1;
          animation: mk-drift 16s ease-in-out infinite;
        }
        .mk-hero-frame {
          justify-self: end;
          width: min(420px, 100%);
          border-radius: 22px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          background:
            radial-gradient(120% 140% at 84% -10%, rgba(237, 220, 183, 0.18), transparent 58%),
            linear-gradient(145deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.02));
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 26px 58px rgba(0, 0, 0, 0.45);
          padding: 18px;
          display: grid;
          gap: 10px;
          transform: translateY(4px);
          animation: mk-rise 900ms ease both;
        }
        .mk-hero-frame-label {
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(245, 242, 236, 0.52);
        }
        .mk-hero-frame-line,
        .mk-hero-frame-next {
          font-size: 0.95rem;
          line-height: 1.6;
          color: rgba(245, 242, 236, 0.78);
        }
        .mk-hero-frame-split {
          display: grid;
          gap: 8px;
        }
        .mk-hero-frame-split span {
          display: block;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.025);
          border-radius: 14px;
          padding: 10px;
          font-size: 0.86rem;
          color: rgba(245, 242, 236, 0.72);
        }
        .mk-kicker {
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(245, 242, 236, 0.52);
        }
        .mk-title {
          margin: 0;
          font-family: var(--font-display), serif;
          font-size: clamp(2.8rem, 8.8vw, 7.2rem);
          line-height: 0.88;
          letter-spacing: -0.05em;
          max-width: 11ch;
          text-wrap: balance;
        }
        .mk-h2 {
          margin: 0;
          font-family: var(--font-display), serif;
          font-size: clamp(1.8rem, 4.2vw, 3.1rem);
          line-height: 0.92;
          letter-spacing: -0.03em;
          text-wrap: balance;
        }
        .mk-h3 {
          margin: 0;
          font-size: 1.08rem;
          letter-spacing: -0.01em;
          color: #fff;
          font-weight: 500;
        }
        .mk-lead,
        .mk-body {
          margin: 0;
          color: rgba(245, 242, 236, 0.74);
          line-height: 1.64;
          font-size: clamp(0.96rem, 1.3vw, 1.05rem);
          max-width: 58ch;
        }
        .mk-actions { display: flex; gap: 12px; flex-wrap: wrap; padding-top: 6px; }
        .mk-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          border-radius: 999px;
          padding: 13px 22px;
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
        }
        .mk-btn:hover { transform: translateY(-1px); }
        .mk-btn-primary {
          background: linear-gradient(135deg, #fbf7f0 0%, #e6d7b8 92%);
          color: #090909;
          font-weight: 600;
          box-shadow: 0 10px 28px rgba(224, 201, 153, 0.26);
        }
        .mk-btn-secondary {
          color: #f5f2ec;
          border: 1px solid rgba(255, 255, 255, 0.26);
          background: rgba(255, 255, 255, 0.03);
        }
        .mk-btn-secondary:hover { border-color: rgba(255, 255, 255, 0.42); }
        .mk-note {
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(245, 242, 236, 0.44);
        }
        .mk-card {
          background: linear-gradient(160deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02));
          border: 1px solid rgba(255, 255, 255, 0.13);
          border-radius: 20px;
          padding: 22px;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04), 0 18px 50px rgba(0, 0, 0, 0.35);
        }
        .mk-get-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
        }
        .mk-get-card { gap: 8px; display: grid; }
        .mk-steps {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
        }
        .mk-step {
          border-radius: 18px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.02);
          padding: 16px;
          display: grid;
          gap: 8px;
        }
        .mk-step-label {
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(245, 242, 236, 0.58);
        }
        .mk-proof-card {
          border-radius: 22px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          background:
            radial-gradient(100% 140% at 84% -18%, rgba(230, 206, 160, 0.13), transparent 56%),
            linear-gradient(160deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02));
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 24px 56px rgba(0, 0, 0, 0.4);
          padding: clamp(20px, 4.5vw, 30px);
          display: grid;
          gap: 18px;
        }
        .mk-proof-line {
          display: grid;
          gap: 8px;
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .mk-proof-line:last-child {
          padding-bottom: 0;
          border-bottom: 0;
        }
        .mk-proof-label {
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(245, 242, 236, 0.56);
        }
        .mk-proof-reads {
          display: grid;
          gap: 6px;
        }
        .mk-proof-reads-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
        }
        .mk-proof-read {
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.02);
          padding: 10px;
          display: grid;
          gap: 8px;
        }
        .mk-proof-chip {
          display: inline-flex;
          width: fit-content;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: rgba(245, 242, 236, 0.74);
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 3px 8px;
        }
        @keyframes mk-rise {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes mk-drift {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(10px) translateX(-8px); }
        }
        @media (max-width: 980px) {
          .mk-shell { gap: 40px; }
          .mk-hero { min-height: auto; padding-top: 6px; }
          .mk-hero-grid {
            grid-template-columns: 1fr;
            align-items: start;
          }
          .mk-hero-frame {
            justify-self: start;
            max-width: 460px;
          }
          .mk-hero::after {
            width: min(400px, 78vw);
            height: min(400px, 78vw);
            right: -10%;
            top: 26%;
          }
          .mk-get-grid,
          .mk-steps {
            grid-template-columns: 1fr;
          }
          .mk-proof-reads-grid {
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

        <HeroSection copy={marketingCopy.hero} />
        <OutputVisibilitySection copy={marketingCopy.outputVisibility} />
        <HowItWorksSection copy={marketingCopy.howItWorks} />
        <ProofBlockSection copy={marketingCopy.proofBlock} />
        <ClosingCtaSection copy={marketingCopy.closingCta} />
      </div>
    </main>
  );
}
