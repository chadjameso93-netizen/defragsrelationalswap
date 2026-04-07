import Link from "next/link";
import type { HeroCopy } from "../../content/marketingCopy";

interface HeroSectionProps {
  copy: HeroCopy;
}

export function HeroSection({ copy }: HeroSectionProps) {
  return (
    <section className="mk-section mk-hero">
      <div className="mk-hero-grid">
        <div className="mk-hero-copy">
          <div className="mk-kicker">{copy.kicker}</div>
          <h1 className="mk-title">{copy.title}</h1>
          <p className="mk-lead">{copy.description}</p>
          <div className="mk-actions">
            <Link className="mk-cta mk-cta-primary" href={copy.primaryCtaHref}>
              {copy.primaryCtaLabel}
            </Link>
            <Link className="mk-cta mk-cta-secondary" href={copy.secondaryCtaHref}>
              {copy.secondaryCtaLabel}
            </Link>
          </div>
          <div className="mk-note">{copy.quietNote}</div>
        </div>
        <aside className="mk-hero-frame" aria-hidden="true">
          <div className="mk-hero-frame-label">Live read preview</div>
          <div className="mk-hero-frame-line">Tone shifted after a single “Okay.”</div>
          <div className="mk-hero-frame-split">
            <span>Your intent: keep things steady.</span>
            <span>Their read: you pulled away.</span>
          </div>
          <div className="mk-hero-frame-next">Next move: acknowledgment before explanation.</div>
        </aside>
      </div>
    </section>
  );
}
