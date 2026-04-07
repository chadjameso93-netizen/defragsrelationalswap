import { CinematicHomepage } from "../../components/marketing/cinematic-homepage";

import Link from "next/link";
import { HeroSection } from "../../components/marketing/HeroSection";
import { OutputVisibilitySection } from "../../components/marketing/OutputVisibilitySection";
import { CoreValueSection } from "../../components/marketing/CoreValueSection";
import { UseCasesSection } from "../../components/marketing/UseCasesSection";
import { marketingCopy } from "../../content/marketingCopy";
import { HowItWorksSection } from "../../components/marketing/HowItWorksSection";
import { ProductSystemSection } from "../../components/marketing/ProductSystemSection";
import { FaqSection } from "../../components/marketing/FaqSection";
import { ClosingCtaSection } from "../../components/marketing/ClosingCtaSection";

export default function StudioHomePage() {
  return (
    <main className="mk-page">
      <style>{`
        /* ===== DEFRAG PREMIUM DESIGN SYSTEM ===== */
        /* Multimillion-dollar AI platform aesthetic with cohesive visual language */

        .mk-page {
          min-height: 100vh;
          background:
            radial-gradient(1400px 720px at 22% 15%, rgba(214, 195, 161, 0.09), transparent 58%),
            radial-gradient(980px 680px at 78% 42%, rgba(108, 99, 255, 0.06), transparent 62%),
            radial-gradient(1200px 800px at 50% 85%, rgba(214, 195, 161, 0.05), transparent 64%),
            linear-gradient(165deg, #080808 0%, #0a0a0a 38%, #050505 100%);
          color: #f5f2ec;
          position: relative;
        }

        /* Ambient field overlay for depth */
        .mk-page::before {
          content: "";
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(245, 242, 236, 0.012) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245, 242, 236, 0.012) 1px, transparent 1px);
          background-size: 42px 42px;
          opacity: 0.3;
          pointer-events: none;
          z-index: 0;
        }

        .mk-shell {
          width: min(1280px, 100%);
          margin: 0 auto;
          padding: 48px clamp(20px, 4.2vw, 56px) 120px;
          display: grid;
          gap: 72px;
          position: relative;
          z-index: 1;
        }

        /* ===== TYPOGRAPHY SCALE ===== */
        .mk-kicker {
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(245, 242, 236, 0.48);
          font-weight: 600;
        }

        .mk-h1 {
          font-size: clamp(56px, 8vw, 96px);
          line-height: 0.92;
          letter-spacing: -0.04em;
          font-family: var(--font-display), serif;
          font-weight: 400;
          color: #f5f2ec;
        }

        .mk-h2 {
          font-size: clamp(38px, 5vw, 64px);
          line-height: 1.08;
          letter-spacing: -0.03em;
          font-family: var(--font-display), serif;
          font-weight: 400;
        }

        .mk-h3 {
          font-size: clamp(24px, 3.2vw, 36px);
          line-height: 1.22;
          letter-spacing: -0.02em;
          font-family: var(--font-display), serif;
          font-weight: 400;
        }

        .mk-lead {
          font-size: clamp(17px, 2vw, 20px);
          line-height: 1.68;
          color: rgba(245, 242, 236, 0.78);
          max-width: 720px;
        }

        .mk-body {
          font-size: 16px;
          line-height: 1.72;
          color: rgba(245, 242, 236, 0.7);
        }

        /* ===== PREMIUM GLASS CARD SYSTEM ===== */
        .mk-card {
          border: 1px solid rgba(255, 255, 255, 0.08);
          background:
            linear-gradient(168deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.018) 100%),
            rgba(12, 12, 12, 0.6);
          backdrop-filter: blur(16px);
          border-radius: 16px;
          position: relative;
          overflow: hidden;
          transition: all 0.32s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .mk-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(165deg, rgba(255, 255, 255, 0.12), transparent 42%, rgba(214, 195, 161, 0.08));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0.6;
          pointer-events: none;
        }

        .mk-card:hover {
          transform: translateY(-4px);
          box-shadow:
            0 0 60px rgba(214, 195, 161, 0.15),
            0 20px 50px rgba(0, 0, 0, 0.4);
          border-color: rgba(255, 255, 255, 0.14);
        }

        .mk-card-glow {
          box-shadow:
            0 0 80px rgba(214, 195, 161, 0.18),
            0 24px 60px rgba(0, 0, 0, 0.5);
        }

        /* ===== PREMIUM BUTTON SYSTEM ===== */
        .mk-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 15px 32px;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: -0.01em;
          text-decoration: none;
          transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .mk-btn-primary {
          background: linear-gradient(165deg, #f5f2ec 0%, #e8e4d8 100%);
          color: #0a0a0a;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow:
            0 0 30px rgba(245, 242, 236, 0.2),
            0 8px 24px rgba(0, 0, 0, 0.3);
        }

        .mk-btn-primary:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow:
            0 0 50px rgba(245, 242, 236, 0.35),
            0 12px 32px rgba(0, 0, 0, 0.4);
        }

        .mk-btn-secondary {
          background: rgba(255, 255, 255, 0.04);
          color: #f5f2ec;
          border: 1px solid rgba(255, 255, 255, 0.14);
          backdrop-filter: blur(12px);
        }

        .mk-btn-secondary:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.24);
          transform: translateY(-2px);
        }

        /* ===== SECTION LAYOUTS ===== */
        .mk-section {
          display: grid;
          gap: 32px;
        }

        .mk-section-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(214, 195, 161, 0.12) 50%, transparent 100%);
          margin: 48px 0;
        }

        .mk-grid-2 {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 420px), 1fr));
          gap: 24px;
        }

        .mk-grid-3 {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 340px), 1fr));
          gap: 24px;
        }

        .mk-grid-4 {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
          gap: 20px;
        }

        /* ===== COMPONENT-SPECIFIC OVERRIDES ===== */
        .mk-hero-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 28px;
          align-items: start;
        }

        @media (max-width: 1024px) {
          .mk-hero-grid {
            grid-template-columns: 1fr;
          }
          .mk-shell {
            gap: 56px;
            padding-top: 32px;
          }
        }

        .mk-feature-card {
          padding: 32px;
          display: grid;
          gap: 16px;
          align-content: start;
        }

        .mk-feature-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: linear-gradient(135deg, rgba(214, 195, 161, 0.15), rgba(214, 195, 161, 0.05));
          border: 1px solid rgba(214, 195, 161, 0.2);
          display: grid;
          place-items: center;
          font-size: 22px;
        }

        /* Ambient glow accents */
        .mk-glow-accent {
          position: relative;
        }

        .mk-glow-accent::after {
          content: "";
          position: absolute;
          inset: -120px;
          background: radial-gradient(circle at center, rgba(214, 195, 161, 0.08), transparent 64%);
          pointer-events: none;
          z-index: -1;
        }

        /* Muted text utility */
        .mk-muted {
          color: rgba(245, 242, 236, 0.58);
        }

        /* Fade-in animations */
        @keyframes mkFadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .mk-section {
          animation: mkFadeIn 0.6s ease-out;
        }
      `}</style>

      <div className="mk-shell">
        <HeroSection copy={marketingCopy.hero} />
        <div className="mk-section-divider" />
        <OutputVisibilitySection copy={marketingCopy.outputVisibility} />
        <div className="mk-section-divider" />
        <HowItWorksSection copy={marketingCopy.howItWorks} />
        <div className="mk-section-divider" />
        <CoreValueSection copy={marketingCopy.coreValue} />
        <div className="mk-section-divider" />
        <UseCasesSection copy={marketingCopy.useCases} />
        <div className="mk-section-divider" />
        <ProductSystemSection copy={marketingCopy.productSystem} />
        <div className="mk-section-divider" />
        <FaqSection copy={marketingCopy.faq} />
        <div className="mk-section-divider" />
        <ClosingCtaSection copy={marketingCopy.closingCta} />
      </div>
    </main>
  );
}
