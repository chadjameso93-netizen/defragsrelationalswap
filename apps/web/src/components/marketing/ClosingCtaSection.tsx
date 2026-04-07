import Link from "next/link";
import type { ClosingCtaCopy } from "../../content/marketingCopy";

interface ClosingCtaSectionProps {
  copy: ClosingCtaCopy;
}

export function ClosingCtaSection({ copy }: ClosingCtaSectionProps) {
  return (
    <section className="mk-section">
      <style>{`
        .mk-cta-block {
          padding: 64px clamp(32px, 6vw, 80px);
          display: grid;
          gap: 28px;
          text-align: center;
          justify-items: center;
          position: relative;
          overflow: hidden;
          border-radius: 20px;
        }

        /* Radial glow from center */
        .mk-cta-block::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 50% 100%, rgba(214,195,161,0.14), transparent 64%),
            radial-gradient(ellipse 60% 40% at 50% 0%, rgba(255,255,255,0.04), transparent 60%);
          pointer-events: none;
          z-index: 0;
        }

        .mk-cta-block > * {
          position: relative;
          z-index: 1;
        }

        .mk-cta-eyebrow {
          font-size: 12px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(214,195,161,0.7);
          font-weight: 600;
        }

        .mk-cta-title {
          font-size: clamp(36px, 5vw, 64px);
          line-height: 1.06;
          letter-spacing: -0.035em;
          font-family: var(--font-display), serif;
          font-weight: 400;
          color: #f5f2ec;
          max-width: 760px;
        }

        .mk-cta-desc {
          font-size: clamp(16px, 1.8vw, 19px);
          line-height: 1.68;
          color: rgba(245,242,236,0.68);
          max-width: 560px;
        }

        .mk-cta-actions {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 8px;
        }

        .mk-cta-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 16px 36px;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          letter-spacing: -0.01em;
          text-decoration: none;
          transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .mk-cta-btn.primary {
          background: linear-gradient(165deg, #f5f2ec 0%, #ddd8cc 100%);
          color: #080808;
          border: 1px solid rgba(255,255,255,0.22);
          box-shadow: 0 0 40px rgba(245,242,236,0.25), 0 10px 28px rgba(0,0,0,0.35);
        }

        .mk-cta-btn.primary:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 0 64px rgba(245,242,236,0.42), 0 16px 40px rgba(0,0,0,0.45);
        }

        .mk-cta-btn.secondary {
          background: rgba(255,255,255,0.04);
          color: rgba(245,242,236,0.9);
          border: 1px solid rgba(255,255,255,0.13);
          backdrop-filter: blur(10px);
        }

        .mk-cta-btn.secondary:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.22);
          transform: translateY(-2px);
        }
      `}</style>

      <div className="mk-card mk-card-glow mk-cta-block">
        <div className="mk-cta-eyebrow">{copy.kicker}</div>
        <h2 className="mk-cta-title">{copy.title}</h2>
        <p className="mk-cta-desc">{copy.description}</p>
        <div className="mk-cta-actions">
          <Link className="mk-cta-btn primary" href={copy.primaryCtaHref}>
            {copy.primaryCtaLabel}
          </Link>
          <Link className="mk-cta-btn secondary" href={copy.secondaryCtaHref}>
            {copy.secondaryCtaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
