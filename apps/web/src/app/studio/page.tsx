import Link from "next/link";
import { ClosingCtaSection } from "../../components/marketing/ClosingCtaSection";
import { CoreValueSection } from "../../components/marketing/CoreValueSection";
import { FaqSection } from "../../components/marketing/FaqSection";
import { HeroSection } from "../../components/marketing/HeroSection";
import { HowItWorksSection } from "../../components/marketing/HowItWorksSection";
import { OutputVisibilitySection } from "../../components/marketing/OutputVisibilitySection";
import { ProductSystemSection } from "../../components/marketing/ProductSystemSection";
import { UseCasesSection } from "../../components/marketing/UseCasesSection";
import { marketingCopy } from "../../content/marketingCopy";

export default function StudioHomePage() {
  return (
    <main className="mk-page">
      <style>{`
        .mk-page {
          min-height: 100vh;
          background:
            radial-gradient(1200px 680px at 78% -8%, rgba(235, 219, 190, 0.12), transparent 64%),
            radial-gradient(920px 620px at 18% 20%, rgba(255, 255, 255, 0.05), transparent 68%),
            linear-gradient(160deg, #080808 0%, #050505 42%, #090909 100%);
          color: #f5f2ec;
        }
        .mk-shell {
          width: min(1120px, 100%);
          margin: 0 auto;
          padding: 30px clamp(16px, 3.4vw, 40px) 96px;
          display: grid;
          gap: 56px;
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
        }
        .mk-section { display: grid; gap: 14px; }
        .mk-hero { padding-top: 10px; }
        .mk-kicker {
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(245, 242, 236, 0.52);
        }
        .mk-title {
          margin: 0;
          font-family: var(--font-display), serif;
          font-size: clamp(2.7rem, 8vw, 6.4rem);
          line-height: 0.9;
          letter-spacing: -0.045em;
          max-width: 13ch;
        }
        .mk-h2 {
          margin: 0;
          font-family: var(--font-display), serif;
          font-size: clamp(1.7rem, 4.2vw, 3rem);
          line-height: 0.95;
          letter-spacing: -0.03em;
        }
        .mk-h3 {
          margin: 0;
          font-size: 1.1rem;
          letter-spacing: -0.01em;
          color: #fff;
        }
        .mk-lead,
        .mk-body {
          margin: 0;
          color: rgba(245, 242, 236, 0.72);
          line-height: 1.8;
          font-size: clamp(0.98rem, 1.35vw, 1.08rem);
          max-width: 70ch;
        }
        .mk-actions { display: flex; gap: 12px; flex-wrap: wrap; padding-top: 4px; }
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
        }
        .mk-btn-primary {
          background: linear-gradient(135deg, #faf6ee 0%, #e7d7b8 92%);
          color: #090909;
          font-weight: 600;
        }
        .mk-btn-secondary {
          color: #f5f2ec;
          border: 1px solid rgba(255, 255, 255, 0.26);
          background: rgba(255, 255, 255, 0.03);
        }
        .mk-note {
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(245, 242, 236, 0.44);
        }
        .mk-list {
          margin: 0;
          padding-left: 20px;
          display: grid;
          gap: 10px;
          color: rgba(245, 242, 236, 0.72);
          line-height: 1.75;
        }
        .mk-list-tight { gap: 6px; }
        .mk-grid-2 {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(280px, 0.86fr);
          gap: 24px;
          align-items: start;
        }
        .mk-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 22px;
        }
        .mk-steps { display: grid; gap: 12px; }
        .mk-step {
          border-left: 1px solid rgba(255, 255, 255, 0.22);
          padding-left: 16px;
          display: grid;
          gap: 8px;
        }
        .mk-step-label {
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(245, 242, 236, 0.58);
        }
        .mk-faq-grid {
          display: grid;
          gap: 12px;
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }
        @media (max-width: 960px) {
          .mk-grid-2,
          .mk-faq-grid { grid-template-columns: 1fr; }
          .mk-shell { gap: 44px; }
        }
      `}</style>
      <div className="mk-shell">
        <header className="mk-header">
          <div className="mk-brand">Defrag · Studio</div>
          <nav className="mk-nav">
            <Link href="/signin">Sign in</Link>
            <Link href="/about">About</Link>
            <Link href="/pricing">Pricing</Link>
          </nav>
        </header>

        <HeroSection copy={marketingCopy.hero} />
        <OutputVisibilitySection copy={marketingCopy.outputVisibility} />
        <CoreValueSection copy={marketingCopy.coreValue} />
        <UseCasesSection copy={marketingCopy.useCases} />
        <HowItWorksSection copy={marketingCopy.howItWorks} />
        <ProductSystemSection copy={marketingCopy.productSystem} />
        <FaqSection items={marketingCopy.faq} />
        <ClosingCtaSection copy={marketingCopy.closingCta} />
      </div>
    </main>
  );
}
