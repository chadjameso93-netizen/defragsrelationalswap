import { AppShell } from "../components/app-shell";
import Link from "next/link";

export default function NotFound() {
  return (
    <AppShell
      eyebrow="System State"
      title="Signal lost."
      description="The requested view or coordinate does not exist."
      accent="var(--color-text-muted)"
    >
      <div
        className="premium-fade-up premium-panel"
        data-delay="2"
        style={{
          padding: 32,
          borderRadius: "var(--radius-lg)",
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          maxWidth: 620,
          display: "grid",
          gap: 16,
        }}
      >
        <p style={{ margin: 0, color: "var(--color-text-secondary)", fontSize: 16, lineHeight: 1.6 }}>
          It may have been moved, deleted, or you might have stepped outside the known boundaries of your DEFRAG session.
        </p>
        <div style={{ marginTop: 8 }}>
          <Link
            href="/"
            style={{
              textDecoration: "none",
              border: "1px solid var(--color-border)",
              background: "var(--color-text-primary)",
              color: "var(--color-bg)",
              padding: "12px 20px",
              borderRadius: "var(--radius-pill)",
              fontSize: 13,
              letterSpacing: "0.06em",
              fontWeight: 500,
              display: "inline-block",
            }}
          >
            Return to known coordinates
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
