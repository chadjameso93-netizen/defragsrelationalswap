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
    { href: "/companion", label: "Companion", match: (value: string) => value.startsWith("/companion") },
    { href: "/account/insights", label: "Insights", match: (value: string) => value.startsWith("/account/insights") },
    { href: "/account/billing", label: "Billing", match: (value: string) => value.startsWith("/account/billing") },
    { href: "/world", label: "World", match: (value: string) => value.startsWith("/world") },
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
            borderBottom: "1px solid rgba(255,255,255,0.08)",
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
              <span style={{ color: "rgba(245,245,245,0.44)", fontSize: 12 }}>Relational reasoning system</span>
            </div>

            <div
              className="app-shell-status"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 12px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.03)",
                color: "rgba(245,245,245,0.68)",
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  background: accent,
                  boxShadow: `0 0 18px ${accent}`,
                }}
              />
              Live reasoning surfaces
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
                    borderRadius: 999,
                    border: active ? `1px solid ${accent}` : "1px solid rgba(255,255,255,0.08)",
                    color: active ? "#050505" : "rgba(245,245,245,0.72)",
                    background: active ? accent : "rgba(255,255,255,0.03)",
                    boxShadow: active ? `0 12px 30px color-mix(in srgb, ${accent} 28%, transparent)` : "none",
                    transition: "background-color 180ms ease, border-color 180ms ease, color 180ms ease, transform 180ms var(--motion-spring), box-shadow 180ms ease",
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
              color: "rgba(245,245,245,0.68)",
            }}
          >
            {description}
          </p>
        </section>

        {children}
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
