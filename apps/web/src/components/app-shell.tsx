"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

interface AppShellProps {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  accent?: string;
  hideHero?: boolean;
}

export function AppShell({
  eyebrow,
  title,
  description,
  children,
  accent = "var(--color-accent)",
  hideHero = false,
}: AppShellProps) {
  const pathname = usePathname();
  const navItems = [
    { href: "/", label: "Home", match: (value: string) => value === "/" },
    { href: "/about", label: "How it works", match: (value: string) => value.startsWith("/about") },
    { href: "/account/billing", label: "Plans", match: (value: string) => value.startsWith("/account/billing") || value.startsWith("/pricing") },
    { href: "/login", label: "Sign in", match: (value: string) => value.startsWith("/login") },
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        color: "#f5f5f5",
        backgroundColor: "#050505",
        backgroundImage:
          "radial-gradient(circle at 0% 0%, rgba(159,179,164,0.06), transparent 28%), radial-gradient(circle at 100% 0%, rgba(255,255,255,0.035), transparent 22%)",
        backgroundAttachment: "fixed",
      }}
    >
      <div
        className="app-shell-frame"
        style={{
          maxWidth: 1380,
          margin: "0 auto",
          padding: "34px 24px 96px",
          display: "grid",
          gap: 72,
        }}
      >
        <header style={{ display: "grid", gap: 18 }}>
          <div style={{ height: 1, background: "linear-gradient(90deg, rgba(255,255,255,0.16), rgba(255,255,255,0.03) 55%, transparent)" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 34 }}>
              <Link href="/" style={{ textDecoration: "none", color: "white", fontSize: 14, fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase" }}>
                DEFRAG
              </Link>
              <nav className="desktop-nav" style={{ display: "flex", gap: 22 }}>
                {navItems.map((item) => {
                  const active = item.match(pathname);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      style={{
                        textDecoration: "none",
                        fontSize: 13,
                        fontWeight: 500,
                        color: active ? "white" : "rgba(245,245,245,0.48)",
                        transition: "color 0.2s ease",
                      }}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <Link
              href="/login"
              style={{
                textDecoration: "none",
                color: "white",
                fontSize: 13,
                fontWeight: 500,
                padding: "11px 18px",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.03)",
              }}
            >
              Sign in
            </Link>
          </div>
        </header>

        {!hideHero && (
          <section className="premium-fade-up" style={{ display: "grid", gap: 18, maxWidth: 1040 }}>
            {eyebrow ? (
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: accent }}>
                {eyebrow}
              </div>
            ) : null}
            <h1 className="font-display" style={{ margin: 0, fontSize: "clamp(4rem, 7vw, 7rem)", lineHeight: 0.88, color: "white", maxWidth: 1020 }}>
              {title}
            </h1>
            <p style={{ margin: 0, maxWidth: 760, fontSize: 18, lineHeight: 1.72, color: "rgba(245,245,245,0.62)", fontWeight: 300 }}>
              {description}
            </p>
          </section>
        )}

        <div style={{ minHeight: "56vh" }}>{children}</div>

        <footer style={{ marginTop: 36, paddingTop: 28, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 320px", gap: 32 }} className="shell-footer-grid">
            <div style={{ display: "grid", gap: 12, maxWidth: 460 }}>
              <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "white" }}>DEFRAG</div>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.72, color: "rgba(245,245,245,0.5)" }}>
                Defrag helps people understand difficult interactions by showing what may be happening, where pressure changed, and what move makes sense next.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: 20 }}>
              <div style={{ display: "grid", gap: 10 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,245,245,0.34)" }}>Explore</div>
                <Link href="/about" style={{ fontSize: 13, color: "rgba(245,245,245,0.62)", textDecoration: "none" }}>How it works</Link>
                <Link href="/account/billing" style={{ fontSize: 13, color: "rgba(245,245,245,0.62)", textDecoration: "none" }}>Plans</Link>
                <Link href="/login" style={{ fontSize: 13, color: "rgba(245,245,245,0.62)", textDecoration: "none" }}>Sign in</Link>
              </div>
              <div style={{ display: "grid", gap: 10 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,245,245,0.34)" }}>Trust</div>
                <Link href="/terms" style={{ fontSize: 13, color: "rgba(245,245,245,0.62)", textDecoration: "none" }}>Terms</Link>
                <Link href="/privacy" style={{ fontSize: 13, color: "rgba(245,245,245,0.62)", textDecoration: "none" }}>Privacy</Link>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 48, fontSize: 12, color: "rgba(245,245,245,0.28)" }}>© 2026 DEFRAG.</div>
        </footer>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .app-shell-frame { padding: 22px 16px 48px !important; gap: 48px !important; }
          .shell-footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
