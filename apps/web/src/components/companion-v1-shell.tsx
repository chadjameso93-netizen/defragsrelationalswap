import type { CompanionOutputContract, Entitlements } from "../../../../packages/core/src";

interface CompanionV1ShellProps {
  contract: CompanionOutputContract;
  entitlements: Entitlements;
}

function Section({ title, body }: { title: string; body: string }) {
  return (
    <section style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: 16 }}>
      <h3 style={{ marginTop: 0, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.15em", color: "#a1a1aa" }}>{title}</h3>
      <p style={{ marginBottom: 0, lineHeight: 1.6 }}>{body}</p>
    </section>
  );
}

export function CompanionV1Shell({ contract, entitlements }: CompanionV1ShellProps) {
  return (
    <div style={{ display: "grid", gap: 12 }}>
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
    </div>
  );
}
