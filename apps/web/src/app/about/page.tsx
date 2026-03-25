import Link from "next/link";
import { AppShell } from "../../components/app-shell";

export default function AboutPage() {
  return (
    <AppShell
      eyebrow="About"
      title="DEFRAG is the public shell, the trust layer, and the account owner."
      description="The website carries the brand, product context, legal pages, authentication, billing, and account management. ChatGPT and MCP integrations extend DEFRAG without becoming a second website."
      accent="#c8d8a2"
    >
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.2fr) minmax(280px, 0.8fr)",
          gap: 22,
          alignItems: "start",
        }}
      >
        <section
          style={{
            display: "grid",
            gap: 18,
            padding: 22,
            borderRadius: 24,
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.025)",
          }}
        >
          {[
            {
              title: "What DEFRAG is for",
              body: "DEFRAG helps people slow down charged exchanges, understand what patterns may be active between people, and choose one next move that creates more room for repair.",
            },
            {
              title: "What the website owns",
              body: "The website at defrag.app owns sign-in, account state, subscriptions, upgrade, billing portal access, legal pages, and the public explanation of the product. It is the canonical product shell.",
            },
            {
              title: "What integrations are for",
              body: "MCP and ChatGPT surfaces are DEFRAG service layers. They help a user reach guidance or account state from another environment, but they always hand back to defrag.app for identity, billing, and account management.",
            },
            {
              title: "What DEFRAG does not do",
              body: "DEFRAG does not diagnose people, assign fixed personality labels, or pretend to know more than the actual events support. It stays with observable dynamics, timing, and pattern clarity.",
            },
          ].map((section) => (
            <div key={section.title} style={{ display: "grid", gap: 8 }}>
              <h2 style={{ margin: 0, fontSize: 26 }}>{section.title}</h2>
              <p style={{ margin: 0, color: "rgba(245,245,245,0.72)", lineHeight: 1.8 }}>
                {section.body}
              </p>
            </div>
          ))}
        </section>

        <aside
          style={{
            display: "grid",
            gap: 16,
            padding: 22,
            borderRadius: 24,
            border: "1px solid rgba(255,255,255,0.08)",
            background: "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015))",
          }}
        >
          <div style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "#c8d8a2" }}>
            Canonical entry points
          </div>
          {[
            ["Dynamics", "/companion"],
            ["Insights", "/account/insights"],
            ["World", "/world"],
            ["Billing", "/account/billing"],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              style={{
                display: "inline-flex",
                justifyContent: "space-between",
                textDecoration: "none",
                color: "#f5f5f5",
                paddingBottom: 10,
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <span>{label}</span>
              <span style={{ color: "rgba(245,245,245,0.5)" }}>Open</span>
            </Link>
          ))}
          <div style={{ display: "grid", gap: 10, marginTop: 6 }}>
            <Link
              href="/login"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "12px 16px",
                borderRadius: 999,
                background: "#f5f5f5",
                color: "#050505",
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              Sign in
            </Link>
            <Link
              href="/privacy"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "12px 16px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.14)",
                color: "#f5f5f5",
                textDecoration: "none",
              }}
            >
              Review privacy
            </Link>
          </div>
        </aside>
      </section>
    </AppShell>
  );
}
