import type { InsightEntry } from "@/lib/insights";

interface HistoryListProps {
  insights: InsightEntry[];
  activeId?: string;
  onSelect: (entry: InsightEntry) => void;
}

function summarize(entry: InsightEntry): string {
  return entry.prompt || entry.response.insight.what_may_be_happening;
}

export default function HistoryList({ insights, activeId, onSelect }: HistoryListProps) {
  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div style={{ display: "grid", gap: 4 }}>
        <p style={{ margin: 0, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-text-muted)" }}>
          Recent insights
        </p>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: "var(--color-text-secondary)" }}>
          Return to a prior interpretation or reopen the latest saved insight.
        </p>
      </div>

      <div style={{ padding: 14, borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", background: "var(--color-surface)" }}>
        <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-text-muted)" }}>Archive state</div>
        <div style={{ marginTop: 8, color: "var(--color-text-primary)", fontSize: 22 }}>{insights.length}</div>
        <div style={{ marginTop: 4, fontSize: 13, lineHeight: 1.6, color: "var(--color-text-secondary)" }}>
          Insights saved for this account and ready to reopen.
        </div>
      </div>

      <div style={{ display: "grid", gap: 10 }}>
        {insights.map((entry, index) => {
          const isActive = entry.id === activeId;

          return (
            <button
              key={entry.id}
              type="button"
              onClick={() => onSelect(entry)}
              style={{
                textAlign: "left",
                display: "grid",
                gap: 8,
                padding: 14,
                borderRadius: "var(--radius-md)",
                border: isActive ? "1px solid rgba(244,244,245,0.22)" : "1px solid var(--color-border)",
                background: isActive ? "var(--color-border)" : "var(--color-surface)",
                color: "var(--color-text-primary)",
                cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <span style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-text-muted)" }}>
                  {new Date(entry.createdAt).toLocaleDateString()}
                </span>
                {isActive ? <span style={{ fontSize: 11, color: "var(--color-text-secondary)" }}>Open</span> : null}
              </div>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: "var(--color-text-secondary)" }}>{summarize(entry)}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
