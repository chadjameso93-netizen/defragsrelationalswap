import Link from "next/link";
import type { ReactNode } from "react";

export const publicSpacing = {
  "2xs": "0.25rem",
  xs: "0.5rem",
  sm: "0.75rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
  "2xl": "3rem",
  "3xl": "4rem",
} as const;

export const publicTypeScale = {
  overline: "0.7rem",
  bodySm: "0.92rem",
  body: "1rem",
  bodyLg: "1.125rem",
  titleSm: "clamp(1.4rem, 2.4vw, 1.85rem)",
  title: "clamp(2rem, 5.2vw, 3.5rem)",
  display: "clamp(2.6rem, 8vw, 5.4rem)",
} as const;

export const publicBackground = {
  page: "#050505",
  card: "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015))",
  border: "1px solid rgba(255,255,255,0.1)",
  muted: "rgba(245, 242, 236, 0.66)",
} as const;

export const publicMotion = {
  fadeUp: "publicFadeUp 420ms ease both",
  sweep: "publicSweep 3s linear infinite",
  pulse: "publicPulse 3.2s ease-in-out infinite",
  float: "publicFloat 5.2s ease-in-out infinite",
} as const;

export const ctaTokens = {
  primary: {
    background: "#f5f2ec",
    color: "#050505",
    border: "1px solid transparent",
  },
  secondary: {
    background: "rgba(255,255,255,0.02)",
    color: "#f5f2ec",
    border: "1px solid rgba(255,255,255,0.15)",
  },
} as const;

export function TitleCardScene({ eyebrow, title, body, actions }: { eyebrow?: string; title: string; body?: string; actions?: ReactNode }) {
  return (
    <section className="public-card public-stack-lg" style={{ padding: "var(--space-xl)", animation: publicMotion.fadeUp }}>
      {eyebrow ? <div className="public-eyebrow">{eyebrow}</div> : null}
      <h1 className="public-display">{title}</h1>
      {body ? <p className="public-body-lg public-muted">{body}</p> : null}
      {actions ? <div className="public-actions">{actions}</div> : null}
    </section>
  );
}

export function HeroScene({ lead, visual }: { lead: ReactNode; visual?: ReactNode }) {
  return (
    <section className="public-hero">
      <div>{lead}</div>
      {visual ? <div className="public-card" style={{ padding: "var(--space-xl)", minHeight: 360 }}>{visual}</div> : null}
    </section>
  );
}

export function TextScene({ title, body }: { title: string; body: string }) {
  return (
    <article className="public-stack-md">
      <h2 className="public-title">{title}</h2>
      <p className="public-body public-muted">{body}</p>
    </article>
  );
}

export function ListScene({ title, items }: { title?: string; items: string[] }) {
  return (
    <section className="public-card public-stack-md" style={{ padding: "var(--space-xl)" }}>
      {title ? <h3 className="public-title-sm">{title}</h3> : null}
      <ul className="public-list">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export function QuoteScene({ quote, byline }: { quote: string; byline?: string }) {
  return (
    <section className="public-card public-stack-md" style={{ padding: "var(--space-xl)" }}>
      <blockquote className="public-quote">“{quote}”</blockquote>
      {byline ? <div className="public-eyebrow">{byline}</div> : null}
    </section>
  );
}

export function StepScene({ step, title, body }: { step: string; title: string; body: string }) {
  return (
    <article className="public-card public-stack-sm" style={{ padding: "var(--space-lg)" }}>
      <div className="public-eyebrow">{step}</div>
      <h3 className="public-title-sm">{title}</h3>
      <p className="public-body public-muted">{body}</p>
    </article>
  );
}

export function LegalTextScene({ sections }: { sections: Array<{ number: string; title: string; body: string }> }) {
  return (
    <section className="public-card" style={{ padding: "var(--space-xl)" }}>
      <div className="public-legal-grid">
        {sections.map((section) => (
          <article key={section.title} className="public-legal-row">
            <div className="public-eyebrow">{section.number}</div>
            <div className="public-stack-sm">
              <h2 className="public-title-sm">{section.title}</h2>
              <p className="public-body public-muted">{section.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ClosingScene({ title, body, primaryCta, secondaryCta }: { title: string; body: string; primaryCta: { href: string; label: string }; secondaryCta?: { href: string; label: string } }) {
  return (
    <section className="public-card public-stack-md" style={{ padding: "var(--space-xl)" }}>
      <h2 className="public-title">{title}</h2>
      <p className="public-body public-muted">{body}</p>
      <div className="public-actions">
        <Link className="public-cta public-cta-primary" href={primaryCta.href}>{primaryCta.label}</Link>
        {secondaryCta ? <Link className="public-cta public-cta-secondary" href={secondaryCta.href}>{secondaryCta.label}</Link> : null}
      </div>
    </section>
  );
}
