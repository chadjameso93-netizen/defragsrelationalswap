"use client";

import type { InsightApiResponse } from "@/types/contracts";
import GuidanceNote from "./guidance-note";
import PhrasingSuggestions from "./phrasing-suggestions";
import ConversationPrep from "./conversation-prep";
import PerspectiveNote from "./perspective-note";
import PlaybackButton from "./playback-button";
import ReturnNote from "./return-note";
import InsightShareStudio from "./insight-share-studio";
import { guidancePhrasing } from "@/lib/guidance-rules";

interface InsightResultProps {
  result: InsightApiResponse;
  request?: string;
  onReset: () => void;
}

function confidenceTone(level?: string) {
  if (level === "high") return { label: "Grounded", color: "#d9c49f" };
  if (level === "medium") return { label: "Directional", color: "#cddcf8" };
  return { label: "Open view", color: "#c4c4c9" };
}

export default function InsightResult({ result, request, onReset }: InsightResultProps) {
  const { structured_synthesis, insight, proof } = result;
  const confidence = confidenceTone(structured_synthesis?.confidence_level);

  return (
    <div style={{ display: "grid", gap: 24 }}>
      <section
        style={{
          padding: "28px 22px",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 22,
          background:
            "radial-gradient(circle at top left, rgba(217,196,159,0.12), transparent 28%), linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <h2 style={{ fontSize: 10, color: "#71717a", textTransform: "uppercase", letterSpacing: "0.2em", margin: 0 }}>A closer look</h2>
          <span style={{ fontSize: 10, padding: "6px 10px", background: "rgba(255,255,255,0.05)", borderRadius: 999, color: confidence.color, textTransform: "uppercase", letterSpacing: "0.12em" }}>
            {confidence.label}
          </span>
        </div>
        <div style={{ display: "grid", gap: 20 }}>
          <div style={{ display: "grid", gap: 8 }}>
            <h3 style={{ margin: 0, color: "#f5f5f5", fontSize: 28, lineHeight: 1.2, fontFamily: "var(--font-display), serif" }}>
              {guidancePhrasing.soften(insight.what_may_be_happening)}
            </h3>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: "rgba(245,245,245,0.64)", maxWidth: 720 }}>
              {guidancePhrasing.soften(structured_synthesis?.dynamic_between ?? insight.what_it_may_be_causing)}
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
            <div style={{ padding: 14, borderRadius: 16, background: "rgba(0,0,0,0.18)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#8d8d95" }}>Timing</div>
              <p style={{ margin: "10px 0 0 0", color: "#f5f5f5", lineHeight: 1.6 }}>
                {structured_synthesis?.timing_assessment ?? "A smaller, calmer next step is likely to land better than a bigger push."}
              </p>
            </div>
            <div style={{ padding: 14, borderRadius: 16, background: "rgba(0,0,0,0.18)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#8d8d95" }}>Uncertainty</div>
              <p style={{ margin: "10px 0 0 0", color: "#f5f5f5", lineHeight: 1.6 }}>
                {proof?.uncertainty_notes?.[0] ?? "Use this as orientation, not proof. The real event still matters more than the summary."}
              </p>
            </div>
            <div style={{ padding: 14, borderRadius: 16, background: "rgba(0,0,0,0.18)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#8d8d95" }}>Best use</div>
              <p style={{ margin: "10px 0 0 0", color: "#f5f5f5", lineHeight: 1.6 }}>
                {structured_synthesis?.help_needed ?? "Use this to steady your next move, not to settle the whole story."}
              </p>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: 14, fontWeight: 500, marginBottom: 6, color: "#f4f4f5" }}>Lead insight</h3>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: "#a1a1aa", margin: 0 }}>{guidancePhrasing.soften(insight.what_may_be_happening)}</p>
          </div>
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 500, marginBottom: 6, color: "#f4f4f5" }}>What this may be causing</h3>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: "#a1a1aa", margin: 0 }}>{guidancePhrasing.soften(insight.what_it_may_be_causing)}</p>
          </div>
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 500, marginBottom: 6, color: "#f4f4f5" }}>How this may land</h3>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: "#a1a1aa", margin: 0 }}>
              {guidancePhrasing.soften(
                structured_synthesis?.other_experience ??
                  "The other person may be reacting to tone, timing, or pressure before they can respond to your intent.",
              )}
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 500, marginBottom: 12, color: "#f4f4f5" }}>What to try next</h3>
            <div style={{ display: "grid", gap: 10 }}>
              {insight.what_to_try_next.map((item, index) => (
                <div key={item} style={{ display: "grid", gridTemplateColumns: "26px 1fr", gap: 10, alignItems: "start" }}>
                  <span style={{ fontSize: 11, color: "#d9c49f", paddingTop: 3 }}>0{index + 1}</span>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: "#a1a1aa", margin: 0 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 12 }}>
          <PlaybackButton />
        </div>
        <div style={{ marginTop: 10 }}>
          <ReturnNote />
        </div>
      </section>
      {proof ? (
        <section
          style={{
            display: "grid",
            gap: 16,
            padding: 22,
            borderRadius: 20,
            border: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(255,255,255,0.02)",
          }}
        >
          <div style={{ display: "grid", gap: 6 }}>
            <p style={{ margin: 0, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#71717a" }}>What this is based on</p>
            <p style={{ margin: 0, color: "#a1a1aa", lineHeight: 1.7 }}>
              The insight is strongest when the details are recent and concrete. This keeps the reasoning grounded instead of overreaching.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
            <div style={{ padding: 16, borderRadius: 16, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#71717a" }}>Context used</div>
              <ul style={{ margin: "10px 0 0 18px", padding: 0, color: "#d4d4d8", lineHeight: 1.7 }}>
                {(proof.evidence_used ?? []).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div style={{ padding: 16, borderRadius: 16, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#71717a" }}>Pattern candidates</div>
              <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
                {(proof.pattern_candidates ?? []).map((candidate) => (
                  <span key={`${candidate.name}-${candidate.confidence}`} style={{ padding: "8px 12px", borderRadius: 999, background: "rgba(255,255,255,0.04)", color: "#f5f5f5", fontSize: 12 }}>
                    {candidate.name} · {candidate.confidence}
                  </span>
                ))}
              </div>
              <p style={{ margin: "12px 0 0 0", color: "#a1a1aa", lineHeight: 1.7 }}>{proof.confidence_reason}</p>
            </div>
          </div>
        </section>
      ) : null}

      <InsightShareStudio result={result} request={request} />
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
