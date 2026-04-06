import Link from "next/link";
import type { HeroCopy } from "../../content/marketingCopy";

interface HeroSectionProps {
  copy: HeroCopy;
}

export function HeroSection({ copy }: HeroSectionProps) {
  return (
    <section className="mk-section mk-hero">
      <div className="mk-kicker">{copy.kicker}</div>
      <h1 className="mk-title">{copy.title}</h1>
      <p className="mk-lead">{copy.description}</p>
      <div className="mk-actions">
        <Link className="mk-btn mk-btn-primary" href={copy.primaryCtaHref}>
          {copy.primaryCtaLabel}
        </Link>
        <Link className="mk-btn mk-btn-secondary" href={copy.secondaryCtaHref}>
          {copy.secondaryCtaLabel}
        </Link>
      </div>
      <div className="mk-note">{copy.quietNote}</div>
    </section>
  );
}
