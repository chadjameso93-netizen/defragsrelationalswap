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
        <p style={{ margin: 0, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#71717a" }}>
          Recent reads
        </p>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: "#a1a1aa" }}>
          Return to a prior interpretation or reopen the latest saved read.
        </p>
      </div>

      <div style={{ padding: 14, borderRadius: 16, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.03)" }}>
        <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#71717a" }}>Archive state</div>
        <div style={{ marginTop: 8, color: "#f5f5f5", fontSize: 22 }}>{insights.length}</div>
        <div style={{ marginTop: 4, fontSize: 13, lineHeight: 1.6, color: "#a1a1aa" }}>
          Reads saved for this account and ready to reopen.
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
                borderRadius: 14,
                border: isActive ? "1px solid rgba(244,244,245,0.22)" : "1px solid rgba(255,255,255,0.06)",
                background: isActive ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.02)",
                color: "#f5f5f5",
                cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <span style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#71717a" }}>
                  {new Date(entry.createdAt).toLocaleDateString()}
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
