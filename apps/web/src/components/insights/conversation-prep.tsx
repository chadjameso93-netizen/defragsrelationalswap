import { guidancePhrasing } from "@/lib/guidance-rules";

export default function ConversationPrep() {
  return (
    <div
      style={{
        padding: 24,
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 16,
        background: "rgba(255,255,255,0.02)",
        display: "grid",
        gap: 18,
      }}
    >
      <div style={{ display: "grid", gap: 8 }}>
        <p
          style={{
            margin: 0,
            fontSize: 10,
            color: "#71717a",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
          }}
        >
          A steadier way to begin
        </p>
        <p
          style={{
            margin: 0,
            fontSize: 14,
            lineHeight: 1.7,
            color: "#a1a1aa",
            maxWidth: 560,
          }}
        >
          If this feels sensitive, it may help to start in a way that gives each person a little more room to stay open.
        </p>
      </div>

      <div style={{ display: "grid", gap: 12 }}>
        {guidancePhrasing.simpleWaysToBegin.map((item, i) => (
          <div
            key={i}
            style={{
              padding: "16px 16px 18px",
              borderRadius: 12,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.04)",
              display: "grid",
              gap: 6,
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: 10,
                color: "#71717a",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              {item.label}
            </p>
            <p style={{ margin: 0, fontSize: 13, color: "#f4f4f5", lineHeight: 1.6 }}>
              {item.text}
            </p>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gap: 12,
          paddingTop: 18,
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <p style={{ margin: 0, fontSize: 13, color: "#f4f4f5", fontWeight: 500 }}>
          What may help this land more clearly
        </p>
        <div style={{ display: "grid", gap: 10 }}>
          {guidancePhrasing.conversationPrep.slice(0, 3).map((tip, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "28px 1fr",
                gap: 10,
                alignItems: "start",
              }}
            >
              <span style={{ fontSize: 11, color: "#52525b", paddingTop: 3 }}>
                0{i + 1}
              </span>
              <p style={{ margin: 0, fontSize: 13, color: "#a1a1aa", lineHeight: 1.65 }}>
                {tip}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          padding: "16px 16px 18px",
          borderRadius: 12,
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.05)",
          display: "grid",
          gap: 8,
        }}
      >
        <p style={{ margin: 0, fontSize: 13, color: "#f4f4f5", fontWeight: 500 }}>
          If more than one person is involved
        </p>
        <p style={{ margin: 0, fontSize: 13, color: "#a1a1aa", lineHeight: 1.7 }}>
          It may help to keep the first step small, clear, and easy to hear. When several people are involved, a calmer opening can make it easier for each person to respond without feeling pulled into a side.
        </p>
      </div>
    </div>
  );
}
