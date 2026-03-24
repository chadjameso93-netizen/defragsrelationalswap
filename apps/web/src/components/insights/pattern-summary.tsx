import type { PatternSummary } from "@/lib/patterns";

export default function PatternSummaryDisplay({ summary }: { summary: PatternSummary }) {
  return (
    <section
      style={{
        display: "grid",
        gap: 10,
        padding: 20,
        borderRadius: 16,
        border: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(255,255,255,0.02)",
        maxWidth: 640,
      }}
    >
      <p style={{ margin: 0, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#71717a" }}>
        Pattern summary
      </p>
      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: "#d4d4d8" }}>{summary.summary}</p>
    </section>
  );
}
