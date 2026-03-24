"use client";

import Link from "next/link";
import type { ReactNode } from "react";

interface AppShellProps {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  accent?: string;
}

const navLinkStyle = {
  color: "rgba(245,245,245,0.72)",
  textDecoration: "none",
  fontSize: 13,
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
};

export function AppShell({ eyebrow, title, description, children, accent = "#d6c3a1" }: AppShellProps) {
  return (
    <main
      style={{
        minHeight: "100vh",
        color: "#f5f5f5",
        background:
          "radial-gradient(circle at top left, rgba(214,195,161,0.16), transparent 28%), radial-gradient(circle at 80% 20%, rgba(111,145,201,0.14), transparent 24%), linear-gradient(180deg, #06070a 0%, #090b11 45%, #050505 100%)",
      }}
    >
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "28px 24px 72px",
          display: "grid",
          gap: 28,
        }}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 20,
            paddingBottom: 18,
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div style={{ display: "grid", gap: 4 }}>
            <Link href="/" style={{ textDecoration: "none", color: "#f5f5f5", fontSize: 18, letterSpacing: "0.28em", textTransform: "uppercase" }}>
              DEFRAG
            </Link>
            <span style={{ color: "rgba(245,245,245,0.44)", fontSize: 12 }}>Relational reasoning system</span>
          </div>
          <nav style={{ display: "flex", flexWrap: "wrap", gap: 18 }}>
            <Link href="/companion" style={navLinkStyle}>
              Companion
            </Link>
            <Link href="/account/billing" style={navLinkStyle}>
              Billing
            </Link>
            <Link href="/world" style={navLinkStyle}>
              World
            </Link>
          </nav>
        </header>

        <section
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
    </main>
  );
}
