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

function Section({ title, body }: { title: string; body: string }) {
  return (
    <section style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: 16 }}>
      <h3 style={{ marginTop: 0, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.15em", color: "#a1a1aa" }}>{title}</h3>
      <p style={{ marginBottom: 0, lineHeight: 1.6 }}>{body}</p>
    </section>
  );
}

export function CompanionV1Shell({ contract, entitlements, synthesis, evaluation }: CompanionV1ShellProps) {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      {synthesis ? (
        <section
          style={{
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 14,
            padding: 16,
            background: "rgba(255,255,255,0.03)",
            display: "grid",
            gap: 14,
          }}
        >
          <div style={{ display: "grid", gap: 6 }}>
            <h3 style={{ margin: 0, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.15em", color: "#e4e4e7" }}>
              Companion read
            </h3>
            <p style={{ margin: 0, color: "#d4d4d8", lineHeight: 1.7 }}>{synthesis.betweenDynamic}</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10 }}>
            <section style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: 12 }}>
              <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.15em", color: "#71717a" }}>Timing</div>
              <p style={{ margin: "8px 0 0 0", color: "#f5f5f5", lineHeight: 1.6 }}>{synthesis.timingSignal}</p>
            </section>
            <section style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: 12 }}>
              <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.15em", color: "#71717a" }}>What may help</div>
              <p style={{ margin: "8px 0 0 0", color: "#f5f5f5", lineHeight: 1.6 }}>{synthesis.helpNeeded}</p>
            </section>
            <section style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: 12 }}>
              <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.15em", color: "#71717a" }}>Confidence</div>
              <p style={{ margin: "8px 0 0 0", color: "#f5f5f5", lineHeight: 1.6 }}>
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
                    padding: "7px 10px",
                    borderRadius: 999,
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#d4d4d8",
                    fontSize: 12,
                  }}
                >
                  {pattern.replaceAll("_", " ")}
                </span>
              ))}
            </div>
          ) : null}
        </section>
      ) : null}

      <Section title="What Happened" body={contract.whatHappened} />
      <Section title="Your Side" body={contract.yourSide} />
      <Section title="Their Side" body={contract.theirSide} />
      <Section title="What Changed" body={contract.whatChanged} />
      <Section title="Next Move" body={contract.nextMove} />

      {entitlements.canUseCompanionPremiumView ? (
        <section style={{ border: "1px solid rgba(255,255,255,0.2)", borderRadius: 12, padding: 16, background: "rgba(255,255,255,0.04)" }}>
          <h3 style={{ marginTop: 0, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.15em", color: "#e4e4e7" }}>
            What This Is Based On
          </h3>
          <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.7 }}>
            {contract.whatThisIsBasedOn.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ) : (
        <section style={{ border: "1px dashed rgba(255,255,255,0.2)", borderRadius: 12, padding: 16 }}>
          <h3 style={{ marginTop: 0, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.15em", color: "#a1a1aa" }}>
            Premium Companion View
          </h3>
          <p style={{ marginBottom: 0, color: "#a1a1aa" }}>
            Upgrade to Core to unlock the "What This Is Based On" evidence breakdown.
          </p>
        </section>
      )}

      {evaluation ? (
        <section style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: 16 }}>
          <h3 style={{ marginTop: 0, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.15em", color: "#a1a1aa" }}>
            Quality checks
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 10 }}>
            {Object.entries(evaluation).map(([label, score]: [string, number]) => (
              <div key={label} style={{ borderRadius: 10, background: "rgba(255,255,255,0.03)", padding: 12 }}>
                <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em", color: "#71717a" }}>
                  {label}
                </div>
                <div style={{ marginTop: 6, fontSize: 18, color: "#f5f5f5", fontWeight: 600 }}>{score}/1</div>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
