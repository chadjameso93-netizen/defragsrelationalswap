"use client";

import type { InsightApiResponse } from "@/types/contracts";
import GuidanceNote from "./guidance-note";
import PhrasingSuggestions from "./phrasing-suggestions";
import ConversationPrep from "./conversation-prep";
import PerspectiveNote from "./perspective-note";
import { guidancePhrasing } from "@/lib/guidance-rules";

interface InsightResultProps {
  result: InsightApiResponse;
  onReset: () => void;
}

export default function InsightResult({ result, onReset }: InsightResultProps) {
  const { structured_synthesis, insight } = result;

  return (
    <div style={{ display: "grid", gap: 24 }}>
      <section style={{ padding: "28px 22px", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, background: "rgba(255,255,255,0.02)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <h2 style={{ fontSize: 10, color: "#71717a", textTransform: "uppercase", letterSpacing: "0.2em", margin: 0 }}>A closer look</h2>
          <span style={{ fontSize: 9, padding: "4px 8px", background: "rgba(255,255,255,0.05)", borderRadius: 4, color: "#71717a", textTransform: "uppercase" }}>Grounded tone</span>
        </div>
        <div style={{ display: "grid", gap: 20 }}>
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 500, marginBottom: 6, color: "#f4f4f5" }}>First read</h3>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: "#a1a1aa", margin: 0 }}>{guidancePhrasing.soften(insight.what_may_be_happening)}</p>
          </div>
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 500, marginBottom: 6, color: "#f4f4f5" }}>What this may be causing</h3>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: "#a1a1aa", margin: 0 }}>{guidancePhrasing.soften(insight.what_it_may_be_causing)}</p>
          </div>
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 500, marginBottom: 6, color: "#f4f4f5" }}>How this may land</h3>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: "#a1a1aa", margin: 0 }}>{guidancePhrasing.soften(structured_synthesis.other_experience)}</p>
          </div>
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 500, marginBottom: 12, color: "#f4f4f5" }}>A gentler place to start</h3>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: "#a1a1aa", margin: 0 }}>{guidancePhrasing.simpleWaysToBegin[0].text}</p>
          </div>
        </div>
      </section>
      <PhrasingSuggestions />
      <ConversationPrep />
      <PerspectiveNote />
      <GuidanceNote />

      <div style={{ marginTop: 32 }}>
        <button
          onClick={onReset}
          style={{
            padding: "12px 24px",
            background: "transparent",
            color: "#71717a",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 999,
            fontSize: 13,
            cursor: "pointer"
          }}
        >
          Look at another situation
        </button>
      </div>
    </div>
  );
}
