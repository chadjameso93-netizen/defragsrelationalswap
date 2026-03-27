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
  accent = "#22d3ee",
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
          "radial-gradient(circle at 0% 0%, rgba(34, 211, 238, 0.04), transparent 30%), radial-gradient(circle at 100% 0%, rgba(79, 70, 229, 0.03), transparent 30%)",
        backgroundAttachment: "fixed",
      }}
    >
      <div
        className="app-shell-frame"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "40px 24px 80px",
          display: "grid",
          gap: 64,
        }}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: 0,
            gap: 24,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <Link
              href="/"
              style={{
                textDecoration: "none",
                color: "white",
                fontSize: 16,
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              DEFRAG
            </Link>

            <nav style={{ display: "flex", gap: 24 }} className="desktop-nav">
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
                      color: active ? "white" : "rgba(245, 245, 245, 0.45)",
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
              padding: "8px 16px",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(245,245,245,0.05)",
            }}
          >
            Sign in
          </Link>
        </header>

        {!hideHero && (
          <section className="premium-fade-up" style={{ display: "grid", gap: 20 }}>
            {eyebrow && (
              <p
                style={{
                  margin: 0,
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  color: accent,
                }}
              >
                {eyebrow}
              </p>
            )}
            <h1
              style={{
                margin: 0,
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                fontWeight: 500,
                letterSpacing: "-0.04em",
                lineHeight: 1,
                color: "white",
              }}
            >
              {title}
            </h1>
            <p
              style={{
                margin: 0,
                maxWidth: 680,
                fontSize: 18,
                lineHeight: 1.6,
                color: "rgba(245, 245, 245, 0.6)",
                fontWeight: 300,
              }}
            >
              {description}
            </p>
          </section>
        )}

        <div style={{ minHeight: "60vh" }}>{children}</div>

        <footer style={{ marginTop: 80, paddingTop: 40, borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 40 }}>
            <div style={{ display: "grid", gap: 16, maxWidth: 420 }}>
              <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "white" }}>
                DEFRAG
              </div>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "rgba(245, 245, 245, 0.5)" }}>
                Defrag helps people understand difficult interactions by showing what may be happening, where pressure changed, and what to do next.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 140px)", gap: 40 }}>
              <div style={{ display: "grid", gap: 12 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(245, 245, 245, 0.3)" }}>
                  Explore
                </div>
                {navItems.slice(0, 3).map((item) => (
                  <Link key={item.href} href={item.href} style={{ fontSize: 13, textDecoration: "none", color: "rgba(245,245,245,0.6)" }}>
                    {item.label}
                  </Link>
                ))}
              </div>
              <div style={{ display: "grid", gap: 12 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(245, 245, 245, 0.3)" }}>
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
          <div style={{ marginTop: 64, fontSize: 12, color: "rgba(245, 245, 245, 0.3)" }}>© 2026 DEFRAG.</div>
        </footer>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .app-shell-frame { padding: 24px 16px 40px !important; gap: 40px !important; }
        }
        .premium-fade-up {
          animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}
