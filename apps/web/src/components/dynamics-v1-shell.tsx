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

export function DynamicsV1Shell({ contract, entitlements, synthesis }: DynamicsV1ShellProps) {
  // Editorial rendering over generic bordered cards
  return (
    <div style={{ display: "grid", gap: 32, paddingBottom: 16 }}>
      
      {/* PRIMARY INTERPRETATION */}
      {synthesis ? (
        <section className="premium-fade-up" data-delay="1" style={{ display: "grid", gap: 24 }}>
          {/* Metadata Row / Confidence */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--color-border-hover)", paddingBottom: 16 }}>
            <span style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--color-accent)" }}>
              Analysis
            </span>
            <span style={{ fontSize: 11, letterSpacing: "0.12em", color: "var(--color-text-muted)" }}>
              CONFIDENCE {Math.round(synthesis.confidence * 100)}%
            </span>
          </div>

          {/* Main Interpretation */}
          <div>
            <h2 style={{ 
              margin: 0, 
              color: "var(--color-text-primary)", 
              fontSize: "clamp(24px, 4vw, 32px)", 
              lineHeight: 1.35, 
              fontWeight: 400,
              letterSpacing: "-0.02em",
              maxWidth: 840 
            }}>
              {synthesis.betweenDynamic}
            </h2>
          </div>
        </section>
      ) : (
        <section className="premium-fade-up" data-delay="1" style={{ display: "grid", gap: 24 }}>
          <div style={{ borderBottom: "1px solid var(--color-border-hover)", paddingBottom: 16 }}>
             <span style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--color-accent)" }}>
              Analysis
            </span>
          </div>
          <h2 style={{ margin: 0, color: "var(--color-text-primary)", fontSize: "clamp(24px, 4vw, 32px)", lineHeight: 1.35, fontWeight: 400, letterSpacing: "-0.02em", maxWidth: 840 }}>
            {contract.whatHappened}
          </h2>
        </section>
      )}

      {/* CLUSTER: TIMING, PRESSURE, NEXT MOVE */}
      <section 
        className="premium-fade-up" 
        data-delay="2" 
        style={{ 
          background: "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, transparent 100%)",
          borderTop: "1px solid var(--color-border)",
          borderBottom: "1px solid var(--color-border)",
          padding: "32px 0",
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", 
          gap: 40 
        }}
      >
        <div style={{ display: "grid", gap: 10 }}>
          <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--color-text-muted)" }}>Current Moment</div>
          <div style={{ color: "var(--color-text-primary)", fontSize: 16, lineHeight: 1.6 }}>
            {synthesis ? contract.whatHappened : contract.whatChanged}
          </div>
        </div>

        {synthesis && (
          <div style={{ display: "grid", gap: 10 }}>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--color-text-muted)" }}>Timing Window</div>
            <div style={{ color: "var(--color-text-primary)", fontSize: 16, lineHeight: 1.6 }}>
              {synthesis.timingSignal}
            </div>
          </div>
        )}
        
        <div style={{ display: "grid", gap: 10 }}>
          <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--color-accent)" }}>What to try next</div>
          <div style={{ color: "var(--color-text-primary)", fontSize: 16, lineHeight: 1.6 }}>
            {synthesis ? synthesis.helpNeeded : contract.nextMove}
          </div>
        </div>
      </section>

      {/* DETAILED STRUCTURAL LAYOUT */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 40, marginTop: 16 }}>
        
        {/* Sides */}
        <div style={{ display: "grid", gap: 32 }}>
          <div style={{ display: "grid", gap: 8 }}>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--color-text-muted)" }}>Your Side</div>
            <p style={{ margin: 0, color: "var(--color-text-secondary)", lineHeight: 1.7, fontSize: 15 }}>{contract.yourSide}</p>
          </div>
          <div style={{ display: "grid", gap: 8 }}>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--color-text-muted)" }}>Their Side</div>
            <p style={{ margin: 0, color: "var(--color-text-secondary)", lineHeight: 1.7, fontSize: 15 }}>{contract.theirSide}</p>
          </div>
        </div>

        {/* What to Hold */}
        <div style={{ display: "grid", gap: 20 }}>
          <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--color-accent)" }}>Structuring the response</div>
          <div style={{ display: "grid", gap: 16 }}>
            {[
              contract.nextMove,
              ...(synthesis ? [synthesis.userSideHypothesis, synthesis.otherSideHypothesis] : [])
            ].map((item, index) => (
              <div key={`${index}-${item}`} style={{ display: "grid", gridTemplateColumns: "18px 1fr", gap: 12, alignItems: "start" }}>
                <span style={{ color: "var(--color-text-muted)", fontSize: 11, paddingTop: 4, fontFamily: "var(--font-mono)", borderTop: "1px solid var(--color-border)", width: "100%" }}>
                  0{index + 1}
                </span>
                <span style={{ color: "var(--color-text-primary)", lineHeight: 1.6, fontSize: 15, paddingTop: 1 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* PATTERNS & EVIDENCE */}
      <div style={{ display: "grid", gap: 24, marginTop: 16, paddingTop: 32, borderTop: "1px solid var(--color-border)" }}>
        
        {synthesis && synthesis.detectedPatterns.length > 0 && (
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--color-text-muted)", paddingRight: 8 }}>Patterns</span>
            {synthesis.detectedPatterns.map((pattern: string) => (
              <span
                key={pattern}
                style={{
                  padding: "6px 14px",
                  borderRadius: "var(--radius-pill)",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid var(--color-border-hover)",
                  color: "var(--color-text-secondary)",
                  fontSize: 12,
                }}
              >
                {pattern.replaceAll("_", " ")}
              </span>
            ))}
          </div>
        )}

        {entitlements.canUseDynamicsPremiumView ? (
          <div style={{ display: "grid", gap: 12 }}>
            <span style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--color-text-muted)" }}>Evidence</span>
            <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.7, color: "var(--color-text-secondary)", fontSize: 14 }}>
              {contract.whatThisIsBasedOn.map((item) => (
                <li key={item} style={{ paddingBottom: 6 }}>{item}</li>
              ))}
            </ul>
          </div>
        ) : (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 16, background: "var(--color-surface)", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)" }}>
            <span style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>Upgrade to DEFRAG Premium to view evidence breakdown.</span>
            <a href="/account/billing" style={{ fontSize: 12, fontWeight: 500, color: "var(--color-accent)", textDecoration: "none" }}>View Pricing</a>
          </div>
        )}
      </div>

    </div>
  );
}
