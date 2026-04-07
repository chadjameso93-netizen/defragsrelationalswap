import Link from "next/link";
import type { ReactNode } from "react";

export function PublicPageShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  children: ReactNode;
}) {
  const nav = [
    { href: "/home", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/membership", label: "Membership" },
    { href: "/privacy", label: "Privacy" },
  ];

  return (
    <main className="public-page">
      <style>{`
        .public-page {
          min-height: 100vh;
          background:
            radial-gradient(1400px 720px at 22% 0%, rgba(214, 195, 161, 0.08), transparent 55%),
            radial-gradient(900px 600px at 80% 40%, rgba(108, 99, 255, 0.055), transparent 60%),
            linear-gradient(165deg, #080808 0%, #0a0a0a 38%, #050505 100%);
          color: #f5f2ec;
        }

        /* Subtle ambient grid */
        .public-page::before {
          content: "";
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(245,242,236,0.01) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,242,236,0.01) 1px, transparent 1px);
          background-size: 44px 44px;
          opacity: 0.28;
          pointer-events: none;
          z-index: 0;
        }

        /* === PREMIUM NAV === */
        .public-nav {
          position: sticky;
          top: 0;
          z-index: 100;
          width: 100%;
          padding: 0 clamp(16px, 4vw, 56px);
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(8,8,8,0.72);
          backdrop-filter: blur(20px) saturate(1.5);
          border-bottom: 1px solid rgba(255,255,255,0.07);
          box-shadow: 0 1px 0 rgba(214,195,161,0.06), 0 8px 32px rgba(0,0,0,0.3);
        }

        .public-nav-logo {
          font-size: 18px;
          font-weight: 600;
          letter-spacing: -0.03em;
          font-family: var(--font-display), serif;
          color: #f5f2ec;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .public-nav-logo-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: rgba(214,195,161,0.85);
          box-shadow: 0 0 10px rgba(214,195,161,0.6);
          flex-shrink: 0;
        }

        .public-nav-links {
          display: flex;
          align-items: center;
          gap: 2px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .public-nav-links a {
          display: inline-flex;
          padding: 7px 14px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          color: rgba(245,242,236,0.62);
          text-decoration: none;
          transition: all 0.2s ease;
          letter-spacing: -0.005em;
        }

        .public-nav-links a:hover {
          color: rgba(245,242,236,0.96);
          background: rgba(255,255,255,0.06);
        }

        .public-nav-cta {
          display: inline-flex;
          align-items: center;
          padding: 8px 20px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: -0.01em;
          background: linear-gradient(165deg, #f5f2ec 0%, #e2ddd1 100%);
          color: #080808;
          text-decoration: none;
          border: 1px solid rgba(255,255,255,0.2);
          box-shadow: 0 0 20px rgba(245,242,236,0.15), 0 4px 14px rgba(0,0,0,0.3);
          transition: all 0.24s ease;
          margin-left: 8px;
        }

        .public-nav-cta:hover {
          transform: translateY(-1px);
          box-shadow: 0 0 32px rgba(245,242,236,0.28), 0 6px 20px rgba(0,0,0,0.4);
        }

        @media (max-width: 680px) {
          .public-nav-links { display: none; }
        }

        /* === PAGE CONTENT AREA === */
        .public-content {
          position: relative;
          z-index: 1;
        }

        /* === CARRY-FORWARD UTILITIES for child components === */
        :root {
          --space-xs: 0.5rem;
          --space-sm: 0.75rem;
          --space-md: 1rem;
          --space-lg: 1.5rem;
          --space-xl: 2rem;
          --space-2xl: 3rem;
          --type-overline: 0.7rem;
          --type-body: 1rem;
          --type-body-lg: 1.125rem;
          --type-title-sm: clamp(1.4rem, 2.4vw, 1.85rem);
          --type-title: clamp(2rem, 5.2vw, 3.5rem);
          --type-display: clamp(2.6rem, 8vw, 5.4rem);
        }

        .public-page, .public-frame {
          min-height: 100vh;
          color: #f5f2ec;
        }

        .public-frame {
          max-width: 1240px;
          margin: 0 auto;
          padding: var(--space-xl) var(--space-lg) var(--space-2xl);
          display: grid;
          gap: var(--space-xl);
        }

        .public-eyebrow {
          margin: 0;
          font-size: var(--type-overline);
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(245,242,236,0.44);
          font-weight: 600;
        }

        .public-display {
          margin: 0;
          font-size: var(--type-display);
          line-height: 1.04;
          letter-spacing: -0.04em;
          font-family: var(--font-display), serif;
        }

        .public-title {
          margin: 0;
          font-size: var(--type-title);
          line-height: 1.04;
          font-family: var(--font-display), serif;
        }

        .public-title-sm {
          margin: 0;
          font-size: var(--type-title-sm);
          line-height: 1.2;
          font-family: var(--font-display), serif;
        }

        .public-body, .public-list li {
          font-size: var(--type-body);
          line-height: 1.7;
        }

        .public-body-lg {
          margin: 0;
          font-size: var(--type-body-lg);
          line-height: 1.72;
          max-width: 74ch;
        }

        .public-muted {
          color: rgba(245,242,236,0.62);
        }

        .public-card {
          border: 1px solid rgba(255,255,255,0.08);
          background: linear-gradient(168deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.018) 100%), rgba(12,12,12,0.6);
          backdrop-filter: blur(16px);
          border-radius: 14px;
          position: relative;
          overflow: hidden;
          transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .public-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 0 48px rgba(214,195,161,0.13), 0 16px 40px rgba(0,0,0,0.4);
          border-color: rgba(255,255,255,0.13);
        }

        .public-stack-sm, .public-stack-md, .public-stack-lg { display: grid; }
        .public-stack-sm { gap: var(--space-sm); }
        .public-stack-md { gap: var(--space-md); }
        .public-stack-lg { gap: var(--space-lg); }
      `}</style>

      {/* Premium sticky nav */}
      <nav className="public-nav" aria-label="Main navigation">
        <Link className="public-nav-logo" href="/home">
          <span className="public-nav-logo-dot" aria-hidden="true" />
          Defrag
        </Link>
        <ul className="public-nav-links">
          {nav.map(({ href, label }) => (
            <li key={href}>
              <Link href={href}>{label}</Link>
            </li>
          ))}
        </ul>
        <Link className="public-nav-cta" href="/enter">Open Defrag</Link>
      </nav>

      {/* Page content */}
      <div className="public-content">
        {children}
      </div>
    </main>
  );
}
