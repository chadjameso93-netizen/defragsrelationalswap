import { guidancePhrasing } from "@/lib/guidance-rules";

export default function PhrasingSuggestions() {
  return (
    <div style={{ padding: "24px", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, background: "rgba(255,255,255,0.02)" }}>
      <h3 style={{ fontSize: 10, color: "#71717a", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 20 }}>Softer starts</h3>
      <div style={{ display: "grid", gap: 20 }}>
        {guidancePhrasing.phrasingSuggestions.map((item, i) => (
          <div key={i} style={{ display: "grid", gap: 6 }}>
            <p style={{ margin: 0, fontSize: 11, color: "#52525b", textDecoration: "line-through", opacity: 0.8 }}>{item.original}</p>
            <p style={{ margin: 0, fontSize: 13, color: "#f4f4f5", lineHeight: 1.6 }}>{item.better}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
