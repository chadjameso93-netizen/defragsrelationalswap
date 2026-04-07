"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { ctaTokens, publicSpacing, publicTypeScale } from "./primitives";

export function PublicPageShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const nav = [
    { href: "/home", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/membership", label: "Membership" },
    { href: "/privacy", label: "Privacy" },
  ];

  return (
    <main className="public-page">
      <style>{`
        :root {
          --space-xs: ${publicSpacing.xs}; --space-sm: ${publicSpacing.sm}; --space-md: ${publicSpacing.md}; --space-lg: ${publicSpacing.lg}; --space-xl: ${publicSpacing.xl}; --space-2xl: ${publicSpacing["2xl"]};
          --type-overline: ${publicTypeScale.overline}; --type-body: ${publicTypeScale.body}; --type-body-lg: ${publicTypeScale.bodyLg}; --type-title-sm: ${publicTypeScale.titleSm}; --type-title: ${publicTypeScale.title}; --type-display: ${publicTypeScale.display};
        }
        .public-page { min-height:100vh; color:#f5f2ec; background:#050505; background-image: radial-gradient(circle at 0% 0%, rgba(214,195,161,0.12), transparent 28%), radial-gradient(circle at 100% 0%, rgba(255,255,255,0.05), transparent 24%); }
        .public-frame { max-width: 1240px; margin:0 auto; padding: var(--space-xl) var(--space-lg) var(--space-2xl); display:grid; gap:var(--space-xl); }
        .public-header { display:flex; justify-content:space-between; align-items:center; gap:var(--space-md); border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:var(--space-md); }
        .public-nav { display:flex; gap:var(--space-md); }
        .public-nav a { color:rgba(245,242,236,0.62); text-decoration:none; font-size:0.86rem; }
        .public-nav a.active { color:#fff; }
        .public-eyebrow { margin:0; font-size:var(--type-overline); letter-spacing:0.18em; text-transform:uppercase; color:rgba(245,242,236,0.44); font-weight:600; }
        .public-display { margin:0; font-size:var(--type-display); line-height:0.94; font-family:var(--font-display), serif; }
        .public-title { margin:0; font-size:var(--type-title); line-height:1.04; font-family:var(--font-display), serif; }
        .public-title-sm { margin:0; font-size:var(--type-title-sm); line-height:1.2; font-family:var(--font-display), serif; }
        .public-body, .public-list li { margin:0; font-size:var(--type-body); line-height:1.7; }
        .public-body-lg { margin:0; font-size:var(--type-body-lg); line-height:1.72; max-width:74ch; }
        .public-muted { color:rgba(245,242,236,0.66); }
        .public-card { border:1px solid rgba(255,255,255,0.1); background:linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015)); }
        .public-stack-sm, .public-stack-md, .public-stack-lg { display:grid; }
        .public-stack-sm { gap:var(--space-sm); } .public-stack-md { gap:var(--space-md); } .public-stack-lg { gap:var(--space-lg); }
        .public-hero { display:grid; gap:var(--space-lg); grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr); }
        .public-actions { display:flex; gap:var(--space-sm); flex-wrap:wrap; }
        .public-cta { display:inline-flex; align-items:center; justify-content:center; text-decoration:none; font-size:0.95rem; font-weight:600; padding:0.72rem 1rem; transition:transform .2s ease, opacity .2s ease; }
        .public-cta:hover { transform:translateY(-1px); }
        .public-cta-primary { background:${ctaTokens.primary.background}; color:${ctaTokens.primary.color}; border:${ctaTokens.primary.border}; }
        .public-cta-secondary { background:${ctaTokens.secondary.background}; color:${ctaTokens.secondary.color}; border:${ctaTokens.secondary.border}; }
        .public-list { margin:0; padding-left:1.1rem; display:grid; gap:var(--space-sm); }
        .public-quote { margin:0; font-size:clamp(1.2rem, 2.5vw, 1.9rem); line-height:1.42; color:white; }
        .public-legal-grid { display:grid; gap:var(--space-lg); }
        .public-legal-row { display:grid; grid-template-columns:70px minmax(0,1fr); gap:var(--space-md); padding-bottom:var(--space-lg); border-bottom:1px solid rgba(255,255,255,0.08); }
        @keyframes publicFadeUp { from { opacity:0; transform:translateY(8px);} to { opacity:1; transform:none;} }
        @keyframes publicSweep { from { left:-25%; } to { left:100%; } }
        @keyframes publicPulse { 0%,100% { transform:scale(1); opacity:.4;} 50% { transform:scale(1.05); opacity:.74;} }
        @keyframes publicFloat { 0%,100% { transform:translateY(0);} 50% { transform:translateY(-4px);} }
        @media (max-width: 960px) { .public-hero { grid-template-columns:1fr; } .public-nav { display:none; } }
      `}</style>
      <div className="public-frame">
        <header className="public-header">
          <Link href="/home" style={{ textDecoration: "none", color: "white", letterSpacing: "0.2em", fontWeight: 700, fontSize: "0.84rem" }}>DEFRAG</Link>
          <nav className="public-nav">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className={pathname.startsWith(item.href) ? "active" : ""}>{item.label}</Link>
            ))}
          </nav>
          <Link href="/enter" className="public-cta public-cta-secondary">Open Defrag</Link>
        </header>

        <section className="public-stack-md">
          {eyebrow ? <p className="public-eyebrow">{eyebrow}</p> : null}
          <h1 className="public-display">{title}</h1>
          {description ? <p className="public-body-lg public-muted">{description}</p> : null}
        </section>

        {children}
      </div>
    </main>
  );
}
