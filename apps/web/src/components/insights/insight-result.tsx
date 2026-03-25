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
  if (level === "high") return { label: "Grounded", color: "var(--color-accent)" };
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
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-lg)",
          background:
            "radial-gradient(circle at top left, rgba(217,196,159,0.12), transparent 28%), linear-gradient(180deg, var(--color-surface-hover), var(--color-surface))",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <h2 style={{ fontSize: 10, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.2em", margin: 0 }}>A closer look</h2>
          <span style={{ fontSize: 10, padding: "6px 10px", background: "var(--color-surface-hover)", borderRadius: "var(--radius-pill)", color: confidence.color, textTransform: "uppercase", letterSpacing: "0.12em" }}>
            {confidence.label}
          </span>
        </div>
        <div style={{ display: "grid", gap: 20 }}>
          <div style={{ display: "grid", gap: 8 }}>
            <h3 style={{ margin: 0, color: "var(--color-text-primary)", fontSize: 28, lineHeight: 1.2, fontFamily: "var(--font-display), serif" }}>
              {guidancePhrasing.soften(insight.what_may_be_happening)}
            </h3>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: "var(--color-text-secondary)", maxWidth: 720 }}>
              {guidancePhrasing.soften(structured_synthesis?.dynamic_between ?? insight.what_it_may_be_causing)}
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
            <div style={{ padding: 14, borderRadius: "var(--radius-md)", background: "rgba(0,0,0,0.18)", border: "1px solid var(--color-border)" }}>
              <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-text-muted)" }}>Timing</div>
              <p style={{ margin: "10px 0 0 0", color: "var(--color-text-primary)", lineHeight: 1.6 }}>
                {structured_synthesis?.timing_assessment ?? "A smaller, calmer next step is likely to land better than a bigger push."}
              </p>
            </div>
            <div style={{ padding: 14, borderRadius: "var(--radius-md)", background: "rgba(0,0,0,0.18)", border: "1px solid var(--color-border)" }}>
              <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-text-muted)" }}>Uncertainty</div>
              <p style={{ margin: "10px 0 0 0", color: "var(--color-text-primary)", lineHeight: 1.6 }}>
                {proof?.uncertainty_notes?.[0] ?? "Use this as orientation, not proof. The real event still matters more than the summary."}
              </p>
            </div>
            <div style={{ padding: 14, borderRadius: "var(--radius-md)", background: "rgba(0,0,0,0.18)", border: "1px solid var(--color-border)" }}>
              <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-text-muted)" }}>Best use</div>
              <p style={{ margin: "10px 0 0 0", color: "var(--color-text-primary)", lineHeight: 1.6 }}>
                {structured_synthesis?.help_needed ?? "Use this to steady your next move, not to settle the whole story."}
              </p>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: 14, fontWeight: 500, marginBottom: 6, color: "#f4f4f5" }}>Lead insight</h3>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--color-text-secondary)", margin: 0 }}>{guidancePhrasing.soften(insight.what_may_be_happening)}</p>
          </div>
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 500, marginBottom: 6, color: "#f4f4f5" }}>What this may be causing</h3>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--color-text-secondary)", margin: 0 }}>{guidancePhrasing.soften(insight.what_it_may_be_causing)}</p>
          </div>
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 500, marginBottom: 6, color: "#f4f4f5" }}>How this may land</h3>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--color-text-secondary)", margin: 0 }}>
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
                  <span style={{ fontSize: 11, color: "var(--color-accent)", paddingTop: 3 }}>0{index + 1}</span>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--color-text-secondary)", margin: 0 }}>{item}</p>
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
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--color-border)",
            background: "var(--color-surface)",
          }}
        >
          <div style={{ display: "grid", gap: 6 }}>
            <p style={{ margin: 0, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-text-muted)" }}>What this is based on</p>
            <p style={{ margin: 0, color: "var(--color-text-secondary)", lineHeight: 1.7 }}>
              The insight is strongest when the details are recent and concrete. This keeps the reasoning grounded instead of overreaching.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
            <div style={{ padding: 16, borderRadius: "var(--radius-md)", background: "var(--color-surface)", border: "1px solid var(--color-surface-hover)" }}>
              <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-text-muted)" }}>Context used</div>
              <ul style={{ margin: "10px 0 0 18px", padding: 0, color: "var(--color-text-secondary)", lineHeight: 1.7 }}>
                {(proof.evidence_used ?? []).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div style={{ padding: 16, borderRadius: "var(--radius-md)", background: "var(--color-surface)", border: "1px solid var(--color-surface-hover)" }}>
              <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-text-muted)" }}>Pattern candidates</div>
              <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
                {(proof.pattern_candidates ?? []).map((candidate) => (
                  <span key={`${candidate.name}-${candidate.confidence}`} style={{ padding: "8px 12px", borderRadius: "var(--radius-pill)", background: "var(--color-surface-hover)", color: "var(--color-text-primary)", fontSize: 12 }}>
                    {candidate.name} · {candidate.confidence}
                  </span>
                ))}
              </div>
              <p style={{ margin: "12px 0 0 0", color: "var(--color-text-secondary)", lineHeight: 1.7 }}>{proof.confidence_reason}</p>
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
            color: "var(--color-text-muted)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-pill)",
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
