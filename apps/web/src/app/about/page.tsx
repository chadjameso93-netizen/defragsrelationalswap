import Link from "next/link";
import { AppShell } from "../../components/app-shell";

export default function AboutPage() {
  return (
    <AppShell
      eyebrow="Approach"
      title="A practical approach to difficult interactions."
      description="DEFRAG helps you understand what happened, see the pattern, and know what to do next."
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
              body: "DEFRAG shows you the behavioral pattern you default to under stress and helps you interrupt it before it repeats.",
            },
            {
              title: "Seeing the pattern",
              body: "When a tense moment occurs, our first response is often based on past tension instead of the current event. The details matter less than the recurring timeline of the conflict. By documenting what happened, we can see the pattern instead of getting caught in it.",
            },
            {
              title: "What DEFRAG does not do",
              body: "DEFRAG is not a therapist and not a mystic. It does not diagnose people or assign labels. It stays with observable events, helping you understand both sides and decide what to do next.",
            },
            {
              title: "Changing what happens next",
              body: "Once you see the pattern, DEFRAG provides guidance grounded in wording and timing. It helps you notice pressure and respond clearly, preserving the interaction without sacrificing your perspective.",
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
          <div style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-accent)" }}>
            The Approach
          </div>
          {[
            ["Console", "/dynamics"],
            ["Pricing", "/account/billing"],
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
