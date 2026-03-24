import type { InsightEntry } from "@/lib/insights";

interface HistoryListProps {
  insights: InsightEntry[];
  activeId?: string;
  onSelect: (entry: InsightEntry) => void;
}

function summarize(entry: InsightEntry): string {
  return entry.response.insight.what_may_be_happening;
}

export default function HistoryList({ insights, activeId, onSelect }: HistoryListProps) {
  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div style={{ display: "grid", gap: 4 }}>
        <p style={{ margin: 0, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#71717a" }}>
          Recent reads
        </p>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: "#a1a1aa" }}>
          Return to a prior interpretation or re-open the latest thread.
        </p>
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
                borderRadius: 14,
                border: isActive ? "1px solid rgba(244,244,245,0.22)" : "1px solid rgba(255,255,255,0.06)",
                background: isActive ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.02)",
                color: "#f5f5f5",
                cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <span style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#71717a" }}>
                  Read {index + 1}
                </span>
                {isActive ? <span style={{ fontSize: 11, color: "#d4d4d8" }}>Open</span> : null}
              </div>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: "#d4d4d8" }}>{summarize(entry)}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
