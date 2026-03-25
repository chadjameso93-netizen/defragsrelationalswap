import Link from "next/link";
import { AppShell } from "../../components/app-shell";

export default function AboutPage() {
  return (
    <AppShell
      eyebrow="Worldview"
      title="DEFRAG provides structural clarity for charged interactions."
      description="We believe that misunderstandings escalate when people react to the moment instead of recognizing the historical pattern. DEFRAG maps these dynamics to help you see what is actually happening."
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
            padding: 24,
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--color-border)",
            background: "var(--color-surface)",
          }}
        >
          {[
            {
              title: "What DEFRAG is for",
              body: "DEFRAG helps people slow down charged exchanges, understand what patterns may be active between people, and choose one next move that creates more room for repair.",
            },
            {
              title: "How relational patterns form",
              body: "When an event occurs, our initial response is often based on an accumulation of past, unresolved tension. The specific details matter less than the recurring structure of the conflict. By documenting this structure, we can observe the pattern instead of getting caught in it.",
            },
            {
              title: "What DEFRAG does not do",
              body: "DEFRAG does not diagnose people, assign fixed personality labels, or pretend to know more than the actual events support. It stays with observable dynamics, timing, and pattern clarity. Birth-based symbolic attributes are treated as weaker information compared to actual repeated behavior.",
            },
            {
              title: "Changing what happens next",
              body: "Once you recognize a pattern is repeating, DEFRAG provides guidance that stays grounded in timing and phrasing. It lowers the heat so both people can return to a neutral baseline without sacrificing their needs.",
            },
          ].map((section) => (
            <div key={section.title} className="premium-fade-up" data-delay="1" style={{ display: "grid", gap: 10 }}>
              <h2 style={{ margin: 0, fontSize: 26, color: "var(--color-text-primary)" }}>{section.title}</h2>
              <p style={{ margin: 0, color: "var(--color-text-secondary)", lineHeight: 1.8 }}>
                {section.body}
              </p>
            </div>
          ))}
        </section>

        <aside
          className="premium-fade-up" data-delay="2"
          style={{
            display: "grid",
            gap: 16,
            padding: 24,
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--color-border)",
            background: "linear-gradient(180deg, var(--color-surface), transparent)",
          }}
        >
          <div style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "#c8d8a2" }}>
            The System
          </div>
          {[
            ["Dynamics Workspace", "/dynamics"],
            ["Intelligence Architecture", "/account/billing"],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              style={{
                display: "inline-flex",
                justifyContent: "space-between",
                textDecoration: "none",
                color: "var(--color-text-primary)",
                paddingBottom: 10,
                borderBottom: "1px solid var(--color-border)",
              }}
            >
              <span>{label}</span>
              <span style={{ color: "var(--color-text-muted)" }}>Open</span>
            </Link>
          ))}
          <div style={{ display: "grid", gap: 10, marginTop: 6 }}>
            <Link
              href="/login"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "12px 18px",
                borderRadius: "var(--radius-pill)",
                background: "var(--color-text-primary)",
                color: "var(--color-bg)",
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
                padding: "12px 18px",
                borderRadius: "var(--radius-pill)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text-primary)",
                textDecoration: "none",
              }}
            >
              Review policy
            </Link>
          </div>
        </aside>
      </section>
    </AppShell>
  );
}
