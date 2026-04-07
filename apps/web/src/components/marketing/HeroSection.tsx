import Link from "next/link";
import type { HeroCopy } from "../../content/marketingCopy";

interface HeroSectionProps {
  copy: HeroCopy;
}

export function HeroSection({ copy }: HeroSectionProps) {
  return (
    <section className="mk-section mk-glow-accent">
      <style>{`
        .mk-hero {
          display: grid;
          gap: 28px;
        }

        .mk-hero-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 24px;
          align-items: start;
        }

        @media (max-width: 1024px) {
          .mk-hero-grid { grid-template-columns: 1fr; }
        }

        .mk-hero-copy {
          padding: 40px 40px 40px 40px;
          display: grid;
          gap: 24px;
          align-content: start;
        }

        .mk-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          align-items: center;
          margin-top: 8px;
        }

        .mk-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 14px 28px;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: -0.01em;
          text-decoration: none;
          transition: all 0.26s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .mk-cta.mk-cta-primary {
          background: linear-gradient(165deg, #f5f2ec 0%, #e2ddd1 100%);
          color: #080808;
          border: 1px solid rgba(255,255,255,0.25);
          box-shadow: 0 0 32px rgba(245,242,236,0.22), 0 8px 24px rgba(0,0,0,0.3);
        }

        .mk-cta.mk-cta-primary:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 0 56px rgba(245,242,236,0.38), 0 14px 32px rgba(0,0,0,0.4);
        }

        .mk-cta.mk-cta-secondary {
          background: rgba(255,255,255,0.04);
          color: rgba(245,242,236,0.92);
          border: 1px solid rgba(255,255,255,0.13);
          backdrop-filter: blur(10px);
        }

        .mk-cta.mk-cta-secondary:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.22);
          transform: translateY(-2px);
        }

        .mk-note {
          font-size: 13px;
          color: rgba(245,242,236,0.42);
          letter-spacing: 0.01em;
          margin-top: 4px;
        }

        /* Right side preview card */
        .mk-hero-frame {
          padding: 32px;
          display: grid;
          gap: 20px;
          align-content: start;
          min-height: 380px;
        }

        .mk-hero-frame-label {
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(214,195,161,0.6);
          font-weight: 600;
        }

        .mk-hero-frame-line {
          font-size: 15px;
          color: rgba(245,242,236,0.82);
          line-height: 1.6;
          padding: 16px 18px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 10px;
        }

        .mk-hero-frame-split {
          display: grid;
          gap: 10px;
        }

        .mk-hero-frame-split span {
          display: block;
          font-size: 13px;
          color: rgba(245,242,236,0.6);
          padding: 10px 14px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 8px;
          line-height: 1.5;
        }

        .mk-hero-frame-next {
          font-size: 14px;
          color: rgba(214,195,161,0.88);
          padding: 14px 18px;
          background: linear-gradient(135deg, rgba(214,195,161,0.1), rgba(214,195,161,0.04));
          border: 1px solid rgba(214,195,161,0.18);
          border-radius: 10px;
          line-height: 1.6;
        }
      `}</style>

      <div className="mk-hero">
        <div className="mk-hero-grid">
          {/* Left: headline + CTAs */}
          <div className="mk-card mk-hero-copy">
            <div className="mk-kicker">{copy.kicker}</div>
            <h1 className="mk-h1">{copy.title}</h1>
            <p className="mk-lead">{copy.description}</p>
            <div className="mk-actions">
              <Link className="mk-cta mk-cta-primary" href={copy.primaryCtaHref}>
                {copy.primaryCtaLabel}
              </Link>
              <Link className="mk-cta mk-cta-secondary" href={copy.secondaryCtaHref}>
                {copy.secondaryCtaLabel}
              </Link>
            </div>
            {copy.quietNote && (
              <div className="mk-note">{copy.quietNote}</div>
            )}
          </div>

          {/* Right: ambient live preview */}
          <div className="mk-card mk-card-glow mk-hero-frame" aria-hidden="true">
            <div className="mk-hero-frame-label">Live read preview</div>
            <div className="mk-hero-frame-line">{copy.primaryCtaLabel === "Open Defrag" ? "Tone shifted after a single \u201cOkay.\u201d" : "Tone shifted after a single \u201cOkay.\u201d"}</div>
            <div className="mk-hero-frame-split">
              <span>Your intent: keep things steady.</span>
              <span>Their read: you pulled away.</span>
            </div>
            <div className="mk-hero-frame-next">Next move: acknowledgment before explanation.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
