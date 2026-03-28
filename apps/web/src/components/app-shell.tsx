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

  const footerItems = [
    { href: "/about", label: "How it works" },
    { href: "/account/billing", label: "Plans" },
    { href: "/terms", label: "Terms" },
    { href: "/privacy", label: "Privacy" },
    { href: "/login", label: "Sign in" },
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        color: "#f5f5f5",
        backgroundColor: "#050505",
        backgroundImage:
          "radial-gradient(circle at 0% 0%, rgba(159,179,164,0.05), transparent 28%), radial-gradient(circle at 100% 0%, rgba(255,255,255,0.04), transparent 20%)",
        backgroundAttachment: "fixed",
      }}
    >
      <div
        className="app-shell-frame"
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "48px 24px 88px",
          display: "grid",
          gap: 84,
        }}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 24,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 34 }}>
            <Link
              href="/"
              style={{
                textDecoration: "none",
                color: "white",
                fontSize: 15,
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
              }}
            >
              DEFRAG
            </Link>

            <nav style={{ display: "flex", gap: 22 }} className="desktop-nav">
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
                      color: active ? "white" : "rgba(245, 245, 245, 0.48)",
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
              fontSize: 13,
              fontWeight: 500,
              color: "white",
              textDecoration: "none",
              padding: "10px 18px",
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(245,245,245,0.04)",
            }}
          >
            Sign in
          </Link>
        </header>

        {!hideHero && (
          <section className="premium-fade-up" style={{ display: "grid", gap: 18, maxWidth: 980 }}>
            {eyebrow && (
              <p
                style={{
                  margin: 0,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  color: accent,
                }}
              >
                {eyebrow}
              </p>
            )}
            <h1
              className="font-display"
              style={{
                margin: 0,
                fontSize: "clamp(3.6rem, 7vw, 6.4rem)",
                lineHeight: 0.9,
                color: "white",
                maxWidth: 980,
              }}
            >
              {title}
            </h1>
            <p
              style={{
                margin: 0,
                maxWidth: 760,
                fontSize: 18,
                lineHeight: 1.72,
                color: "rgba(245, 245, 245, 0.62)",
                fontWeight: 300,
              }}
            >
              {description}
            </p>
          </section>
        )}

        <div style={{ minHeight: "56vh" }}>{children}</div>

        <footer style={{ marginTop: 48, paddingTop: 34, borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 48 }}>
            <div style={{ display: "grid", gap: 14, maxWidth: 420 }}>
              <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "white" }}>
                DEFRAG
              </div>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.72, color: "rgba(245, 245, 245, 0.5)" }}>
                Defrag helps people understand difficult interactions by showing what may be happening, where pressure changed, and what to do next.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 150px)", gap: 40 }}>
              <div style={{ display: "grid", gap: 12 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(245, 245, 245, 0.34)" }}>
                  Explore
                </div>
                {navItems.slice(0, 3).map((item) => (
                  <Link key={item.href} href={item.href} style={{ fontSize: 13, textDecoration: "none", color: "rgba(245,245,245,0.6)" }}>
                    {item.label}
                  </Link>
                ))}
              </div>
              <div style={{ display: "grid", gap: 12 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(245, 245, 245, 0.34)" }}>
                  Legal
                </div>
                {footerItems.slice(2, 4).map((item) => (
                  <Link key={item.href} href={item.href} style={{ fontSize: 13, textDecoration: "none", color: "rgba(245,245,245,0.6)" }}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 54, fontSize: 12, color: "rgba(245, 245, 245, 0.28)" }}>© 2026 DEFRAG.</div>
        </footer>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .app-shell-frame { padding: 24px 16px 44px !important; gap: 48px !important; }
        }
      `}</style>
    </main>
  );
}
