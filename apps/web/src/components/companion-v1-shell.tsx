import type {
  CompanionEvaluationRubric,
  CompanionOutputContract,
  CompanionStructuredSynthesis,
  Entitlements,
} from "../../../../packages/core/src";

interface CompanionV1ShellProps {
  contract: CompanionOutputContract;
  entitlements: Entitlements;
  synthesis?: CompanionStructuredSynthesis | null;
  evaluation?: CompanionEvaluationRubric | null;
}

function Section({ title, body, tone = "default" }: { title: string; body: string; tone?: "default" | "accent" }) {
  return (
    <section
      style={{
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 18,
        padding: 18,
        background: tone === "accent" ? "rgba(216,196,159,0.06)" : "rgba(255,255,255,0.025)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)",
      }}
    >
      <h3 style={{ marginTop: 0, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.18em", color: tone === "accent" ? "#d8c49f" : "#a1a1aa" }}>{title}</h3>
      <p style={{ marginBottom: 0, lineHeight: 1.75, color: "#e5e7eb" }}>{body}</p>
    </section>
  );
}

export function CompanionV1Shell({ contract, entitlements, synthesis, evaluation }: CompanionV1ShellProps) {
  return (
    <div style={{ display: "grid", gap: 18 }}>
      {synthesis ? (
        <section
          style={{
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 22,
            padding: 20,
            background:
              "radial-gradient(circle at top left, rgba(216,196,159,0.12), transparent 28%), linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.018))",
            display: "grid",
            gap: 14,
          }}
        >
          <div style={{ display: "grid", gap: 6 }}>
            <h3 style={{ margin: 0, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.18em", color: "#d8c49f" }}>
              Companion view
            </h3>
            <p style={{ margin: 0, color: "#f3f4f6", fontSize: 22, lineHeight: 1.45, maxWidth: 840 }}>{synthesis.betweenDynamic}</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
            <section style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 14, background: "rgba(0,0,0,0.14)" }}>
              <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.15em", color: "#8e97a5" }}>Timing</div>
              <p style={{ margin: "10px 0 0 0", color: "#f5f5f5", lineHeight: 1.7 }}>{synthesis.timingSignal}</p>
            </section>
            <section style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 14, background: "rgba(0,0,0,0.14)" }}>
              <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.15em", color: "#8e97a5" }}>What may help</div>
              <p style={{ margin: "10px 0 0 0", color: "#f5f5f5", lineHeight: 1.7 }}>{synthesis.helpNeeded}</p>
            </section>
            <section style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 14, background: "rgba(0,0,0,0.14)" }}>
              <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.15em", color: "#8e97a5" }}>Confidence</div>
              <p style={{ margin: "10px 0 0 0", color: "#f5f5f5", lineHeight: 1.6, fontSize: 24, fontWeight: 600 }}>
                {Math.round(synthesis.confidence * 100)}%
              </p>
            </section>
          </div>

          {synthesis.detectedPatterns.length > 0 ? (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {synthesis.detectedPatterns.map((pattern: string) => (
                <span
                  key={pattern}
                  style={{
                    padding: "8px 12px",
                    borderRadius: 999,
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#d4d4d8",
                    fontSize: 12,
                    background: "rgba(255,255,255,0.03)",
                  }}
                >
                  {pattern.replaceAll("_", " ")}
                </span>
              ))}
            </div>
          ) : null}
        </section>
      ) : null}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
        <Section title="What Happened" body={contract.whatHappened} tone="accent" />
        <Section title="What Changed" body={contract.whatChanged} />
      </div>

      <Section title="Your Side" body={contract.yourSide} />
      <Section title="Their Side" body={contract.theirSide} />
      <Section title="Next Move" body={contract.nextMove} tone="accent" />

      {entitlements.canUseCompanionPremiumView ? (
        <section style={{ border: "1px solid rgba(255,255,255,0.2)", borderRadius: 18, padding: 18, background: "rgba(255,255,255,0.04)" }}>
          <h3 style={{ marginTop: 0, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.18em", color: "#d8c49f" }}>
            What This Is Based On
          </h3>
          <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.85, color: "#e5e7eb" }}>
            {contract.whatThisIsBasedOn.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ) : (
        <section style={{ border: "1px dashed rgba(255,255,255,0.2)", borderRadius: 18, padding: 18 }}>
          <h3 style={{ marginTop: 0, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.18em", color: "#a1a1aa" }}>
            Premium Companion View
          </h3>
          <p style={{ marginBottom: 0, color: "#a1a1aa", lineHeight: 1.75 }}>
            Upgrade to Core to unlock the "What This Is Based On" evidence breakdown.
          </p>
        </section>
      )}

      {evaluation ? (
        <section style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, padding: 18, background: "rgba(255,255,255,0.02)" }}>
          <h3 style={{ marginTop: 0, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.18em", color: "#a1a1aa" }}>
            Quality checks
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 10 }}>
            {Object.entries(evaluation).map(([label, score]: [string, number]) => (
              <div key={label} style={{ borderRadius: 14, background: "rgba(255,255,255,0.03)", padding: 14, border: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em", color: "#71717a" }}>
                  {label}
                </div>
                <div style={{ marginTop: 8, fontSize: 22, color: "#f5f5f5", fontWeight: 600 }}>{score}/1</div>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
