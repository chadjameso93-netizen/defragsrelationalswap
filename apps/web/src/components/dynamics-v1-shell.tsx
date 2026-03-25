import type {
  DynamicsEvaluationRubric,
  DynamicsOutputContract,
  DynamicsStructuredSynthesis,
  Entitlements,
} from "../../../../packages/core/src";

interface DynamicsV1ShellProps {
  contract: DynamicsOutputContract;
  entitlements: Entitlements;
  synthesis?: DynamicsStructuredSynthesis | null;
  evaluation?: DynamicsEvaluationRubric | null;
}

function Section({ title, body, tone = "default" }: { title: string; body: string; tone?: "default" | "accent" }) {
  return (
    <section
      className="premium-fade-up"
      data-delay="2"
      style={{
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-md)",
        padding: 20,
        background: tone === "accent" ? "color-mix(in srgb, var(--color-accent) 15%, transparent)" : "var(--color-surface)",
      }}
    >
      <h3 style={{ marginTop: 0, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.18em", color: tone === "accent" ? "var(--color-accent)" : "var(--color-text-muted)" }}>{title}</h3>
      <p style={{ marginBottom: 0, lineHeight: 1.75, color: "var(--color-text-primary)" }}>{body}</p>
    </section>
  );
}

export function DynamicsV1Shell({ contract, entitlements, synthesis, evaluation }: DynamicsV1ShellProps) {
  const qualityChips = evaluation
    ? [
        ["Clarity", evaluation.clarity],
        ["Grounded", evaluation.groundedness],
        ["Safety", evaluation.safety],
      ]
    : [];

  return (
    <div style={{ display: "grid", gap: 18 }}>
      {synthesis ? (
        <section
          className="premium-fade-up"
          data-delay="1"
          style={{
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-lg)",
            padding: 24,
            background: "linear-gradient(180deg, var(--color-surface), transparent)",
            display: "grid",
            gap: 16,
          }}
        >
          <div style={{ display: "grid", gap: 8 }}>
            <h3 style={{ margin: 0, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--color-accent)" }}>
              Dynamics view
            </h3>
            <p style={{ margin: 0, color: "var(--color-text-primary)", fontSize: 22, lineHeight: 1.45, maxWidth: 840 }}>{synthesis.betweenDynamic}</p>
            <p style={{ margin: 0, color: "var(--color-text-secondary)", lineHeight: 1.7, maxWidth: 760 }}>
              This is a grounded summary, not a diagnosis or fixed label. Use it to steady the next move, then return to the actual event.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14 }}>
            <section style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", padding: 18, background: "var(--color-surface-hover)" }}>
              <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--color-text-muted)" }}>Timing</div>
              <p style={{ margin: "10px 0 0 0", color: "var(--color-text-primary)", lineHeight: 1.7 }}>{synthesis.timingSignal}</p>
            </section>
            <section style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", padding: 18, background: "var(--color-surface-hover)" }}>
              <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--color-text-muted)" }}>What may help</div>
              <p style={{ margin: "10px 0 0 0", color: "var(--color-text-primary)", lineHeight: 1.7 }}>{synthesis.helpNeeded}</p>
            </section>
            <section style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", padding: 18, background: "var(--color-surface-hover)" }}>
              <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--color-text-muted)" }}>Confidence</div>
              <p style={{ margin: "10px 0 0 0", color: "var(--color-text-primary)", lineHeight: 1.6, fontSize: 24, fontWeight: 600 }}>
                {Math.round(synthesis.confidence * 100)}%
              </p>
            </section>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.4fr) minmax(260px, 0.9fr)", gap: 16 }}>
            <section
              style={{
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
                padding: 20,
                background: "var(--color-surface)",
                display: "grid",
                gap: 12,
              }}
            >
              <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--color-text-muted)" }}>Current moment</div>
              <p style={{ margin: 0, color: "var(--color-text-primary)", lineHeight: 1.7, fontSize: 18 }}>{contract.whatHappened}</p>
            </section>

            <section
              style={{
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
                padding: 20,
                background: "var(--color-surface-hover)",
                display: "grid",
                gap: 12,
              }}
            >
              <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--color-text-muted)" }}>What to hold</div>
              <div style={{ display: "grid", gap: 10 }}>
                {[
                  contract.nextMove,
                  synthesis.userSideHypothesis,
                  synthesis.otherSideHypothesis,
                ].map((item, index) => (
                  <div key={`${index}-${item}`} style={{ display: "grid", gridTemplateColumns: "20px 1fr", gap: 10, alignItems: "start" }}>
                    <span style={{ color: "var(--color-accent)", fontSize: 11, paddingTop: 3 }}>0{index + 1}</span>
                    <span style={{ color: "var(--color-text-primary)", lineHeight: 1.6 }}>{item}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {synthesis.detectedPatterns.length > 0 ? (
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {synthesis.detectedPatterns.map((pattern: string) => (
                <span
                  key={pattern}
                  style={{
                    padding: "10px 16px",
                    borderRadius: "var(--radius-pill)",
                    border: "1px solid var(--color-border)",
                    color: "var(--color-text-secondary)",
                    fontSize: 12,
                    background: "var(--color-surface)",
                  }}
                >
                  {pattern.replaceAll("_", " ")}
                </span>
              ))}
            </div>
          ) : null}

          {qualityChips.length > 0 ? (
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 4 }}>
              {qualityChips.map(([label, score]) => (
                <span
                  key={label}
                  style={{
                    padding: "10px 16px",
                    borderRadius: "var(--radius-pill)",
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    color: "var(--color-text-secondary)",
                    fontSize: 12,
                  }}
                >
                  {label} · {Math.round(Number(score) * 100)}%
                </span>
              ))}
            </div>
          ) : null}
        </section>
      ) : null}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
        <Section title="What Happened" body={contract.whatHappened} tone="accent" />
        <Section title="What Changed" body={contract.whatChanged} />
      </div>

      <Section title="Your Side" body={contract.yourSide} />
      <Section title="Their Side" body={contract.theirSide} />
      <Section title="Next Move" body={contract.nextMove} tone="accent" />

      {entitlements.canUseDynamicsPremiumView ? (
        <section className="premium-fade-up" data-delay="3" style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", padding: 22, background: "var(--color-surface)" }}>
          <h3 style={{ marginTop: 0, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--color-accent)" }}>
            What This Is Based On
          </h3>
          <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.85, color: "var(--color-text-primary)" }}>
            {contract.whatThisIsBasedOn.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ) : (
        <section className="premium-fade-up" data-delay="3" style={{ border: "1px dashed var(--color-border)", borderRadius: "var(--radius-md)", padding: 22 }}>
          <h3 style={{ marginTop: 0, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--color-text-muted)" }}>
            Premium dynamics view
          </h3>
          <p style={{ marginBottom: 0, color: "var(--color-text-secondary)", lineHeight: 1.75 }}>
            Upgrade on DEFRAG to unlock the "What This Is Based On" evidence breakdown.
          </p>
        </section>
      )}

      {evaluation ? (
        <section className="premium-fade-up" data-delay="4" style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", padding: 22, background: "var(--color-surface)" }}>
          <h3 style={{ marginTop: 0, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--color-text-muted)" }}>
            Quality checks
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 14 }}>
            {Object.entries(evaluation).map(([label, score]: [string, number]) => (
              <div key={label} style={{ borderRadius: "var(--radius-md)", background: "var(--color-surface-hover)", padding: 16, border: "1px solid var(--color-border)" }}>
                <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--color-text-muted)" }}>
                  {label}
                </div>
                <div style={{ marginTop: 10, fontSize: 24, color: "var(--color-text-primary)", fontWeight: 600 }}>{score}/1</div>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
