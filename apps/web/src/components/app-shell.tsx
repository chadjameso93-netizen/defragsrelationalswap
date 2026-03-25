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
}

export function AppShell({ eyebrow, title, description, children, accent = "#d6c3a1" }: AppShellProps) {
  const pathname = usePathname();
  const navItems = [
    { href: "/", label: "Home", match: (value: string) => value === "/" },
    { href: "/about", label: "About", match: (value: string) => value.startsWith("/about") },
    { href: "/dynamics", label: "Dynamics", match: (value: string) => value.startsWith("/dynamics") },
    { href: "/account/insights", label: "Insights", match: (value: string) => value.startsWith("/account/insights") },
    { href: "/account/billing", label: "Billing", match: (value: string) => value.startsWith("/account/billing") },
    { href: "/world", label: "World", match: (value: string) => value.startsWith("/world") },
  ];
  const footerItems = [
    { href: "/about", label: "About" },
    { href: "/account/billing", label: "Pricing & Billing" },
    { href: "/terms", label: "Terms" },
    { href: "/privacy", label: "Privacy" },
    { href: "/login", label: "Login" },
  ];

  return (
    <main
      className="premium-fade-up"
      style={{
        minHeight: "100vh",
        color: "#f5f5f5",
        background:
          "radial-gradient(circle at top left, rgba(214,195,161,0.16), transparent 28%), radial-gradient(circle at 80% 20%, rgba(111,145,201,0.14), transparent 24%), linear-gradient(180deg, #06070a 0%, #090b11 45%, #050505 100%)",
      }}
    >
      <div
        className="app-shell-frame"
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "28px 24px 72px",
          display: "grid",
          gap: 28,
        }}
      >
        <header
          className="app-shell-header"
          style={{
            display: "grid",
            gap: 20,
            paddingBottom: 18,
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          <div
            className="app-shell-brand-row"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 20,
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "grid", gap: 4 }}>
              <Link href="/" style={{ textDecoration: "none", color: "#f5f5f5", fontSize: 18, letterSpacing: "0.28em", textTransform: "uppercase" }}>
                DEFRAG
              </Link>
              <span style={{ color: "rgba(245,245,245,0.44)", fontSize: 12 }}>Clarity for real conversations</span>
            </div>

            <div
              className="app-shell-status"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 12px",
                borderRadius: "var(--radius-pill)",
                border: "1px solid var(--color-border)",
                background: "var(--color-surface)",
                color: "var(--color-text-secondary)",
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "var(--radius-pill)",
                  background: "var(--color-accent)",
                  boxShadow: "var(--shadow-glow)",
                }}
              />
              Preview available
            </div>
          </div>

          <nav
            className="app-shell-nav"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
            }}
          >
            {navItems.map((item) => {
              const active = item.match(pathname);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="app-shell-nav-link premium-panel"
                  data-active={active ? "true" : "false"}
                  style={{
                    textDecoration: "none",
                    fontSize: 12,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    padding: "10px 14px",
                    borderRadius: "var(--radius-pill)",
                    border: active ? "1px solid var(--color-accent)" : "1px solid var(--color-border)",
                    color: active ? "var(--color-bg)" : "var(--color-text-secondary)",
                    background: active ? "var(--color-accent)" : "transparent",
                    boxShadow: active ? "var(--shadow-glow)" : "none",
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </header>

        <section
          className="premium-fade-up"
          data-delay="1"
          style={{
            display: "grid",
            gap: 12,
            padding: "8px 0 4px",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 11,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: accent,
            }}
          >
            {eyebrow}
          </p>
          <h1
            style={{
              margin: 0,
              maxWidth: 760,
              fontSize: "clamp(2.6rem, 6vw, 5.2rem)",
              lineHeight: 0.96,
              letterSpacing: "-0.04em",
            }}
          >
            {title}
          </h1>
          <p
            style={{
              margin: 0,
              maxWidth: 620,
              fontSize: 16,
              lineHeight: 1.75,
              color: "var(--color-text-secondary)",
            }}
          >
            {description}
          </p>
        </section>

        {children}

        <footer
          style={{
            marginTop: 16,
            paddingTop: 22,
            borderTop: "1px solid rgba(255,255,255,0.08)",
            display: "grid",
            gap: 12,
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ color: "rgba(245,245,245,0.54)", fontSize: 13 }}>
              DEFRAG owns the website, account, billing, and legal surfaces. MCP and ChatGPT stay integration-side.
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {footerItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    textDecoration: "none",
                    color: "rgba(245,245,245,0.72)",
                    fontSize: 13,
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </footer>
      </div>
      <style>{`
        @media (max-width: 720px) {
          .app-shell-frame {
            padding: 20px 16px 48px !important;
            gap: 22px !important;
          }

          .app-shell-header {
            gap: 16px !important;
          }

          .app-shell-brand-row {
            gap: 14px !important;
          }

          .app-shell-status {
            width: 100%;
            justify-content: center;
          }

          .app-shell-nav {
            display: grid !important;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 8px !important;
          }

          .app-shell-nav-link {
            text-align: center;
            padding: 12px 10px !important;
          }
        }

        @media (max-width: 520px) {
          .app-shell-nav {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}
