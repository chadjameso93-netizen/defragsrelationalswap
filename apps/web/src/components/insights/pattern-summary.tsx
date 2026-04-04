import type { PatternSummary } from "@/lib/patterns";

export default function PatternSummaryDisplay({ summary }: { summary: PatternSummary }) {
  return (
    <section
      style={{
        display: "grid",
        gap: 10,
        padding: 20,
        borderRadius: "var(--radius-md)",
        border: "1px solid var(--color-border)",
        background: "var(--color-surface)",
        maxWidth: 640,
      }}
    >
      <p style={{ margin: 0, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-text-muted)" }}>
        Pattern summary
      </p>
      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: "var(--color-text-secondary)" }}>{summary.summary}</p>
    </section>
  );
}
