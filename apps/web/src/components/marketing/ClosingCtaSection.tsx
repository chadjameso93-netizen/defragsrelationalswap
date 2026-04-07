import Link from "next/link";
import type { ClosingCtaCopy } from "../../content/marketingCopy";

interface ClosingCtaSectionProps {
  copy: ClosingCtaCopy;
}

export function ClosingCtaSection({ copy }: ClosingCtaSectionProps) {
  return (
    <section className="mk-section mk-band-block">
      <div className="mk-kicker">{copy.kicker}</div>
      <h2 className="mk-h2">{copy.title}</h2>
      <p className="mk-body">{copy.description}</p>
      <div className="mk-actions">
        <Link className="mk-btn mk-btn-primary" href={copy.primaryCtaHref}>
          {copy.primaryCtaLabel}
        </Link>
        <Link className="mk-btn mk-btn-secondary" href={copy.secondaryCtaHref}>
          {copy.secondaryCtaLabel}
        </Link>
      </div>
    </section>
  );
}
