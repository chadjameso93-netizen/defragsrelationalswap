import Link from "next/link";
import { AppShell } from "../../components/app-shell";
import { DynamicsWorkspace } from "../../components/dynamics-workspace";
import { PublicPreviewCta } from "../../components/public-preview-cta";
import { getBillingStateForUser } from "../../lib/billing-server";
import { getAuthenticatedUserOrNull } from "../../server/auth";
import { listThreadsForUser } from "../../server/dynamics-store";
import DefragAISurface from "../../components/defrag-ai-surface";

export default async function DynamicsPage() {
  const user = await getAuthenticatedUserOrNull();

  if (!user) {
    return (
      <AppShell
        eyebrow="Console"
        title="See what's happening."
        description="The primary intelligence environment for mapping conversations, identifying pressure, and taking structural action."
        accent="#22d3ee"
      >
        <div style={{ display: "grid", gap: 22 }}>
          <PublicPreviewCta
            title="Analysis requires a connected session."
            description="The console tracks exchanges over time to help you identify what to do next. Start a session to begin."
            primaryLabel="Try it"
            secondaryLabel="Pricing"
            secondaryHref="/account/billing"
          />

          <section className="dynamics-preview-grid premium-fade-up" data-delay="1" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 300px", gap: 24, alignItems: "start" }}>

            <section style={{ display: "grid", gap: 20 }}>
              <section style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", padding: 22, background: "linear-gradient(180deg, var(--color-surface), transparent)", display: "grid", gap: 20 }}>
                <div className="dynamics-preview-metrics" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12 }}>
                  {[
                    ["Field Mapping", "Live Relational Node Extractor"],
                    ["Analysis", "Structured Interaction Pattern"],
                    ["Scenario", "Next-Move Simulation"],
                  ].map(([label, value]) => (
                    <div key={label} style={{ padding: 16, borderRadius: "var(--radius-md)", background: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
                      <div style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-text-muted)" }}>{label}</div>
                      <div style={{ marginTop: 8, fontSize: 14, color: "var(--color-text-primary)" }}>{value}</div>
                    </div>
                  ))}
                </div>

                <div style={{ display: "grid", gap: 14, padding: 24, borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", background: "var(--color-surface-hover)" }}>
                  <p style={{ margin: 0, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-text-muted)" }}>Insight Overlay</p>
                  <p style={{ margin: 0, fontSize: 24, lineHeight: 1.4, color: "var(--color-text-primary)" }}>
                    The tension stems less from foundational incompatibility, and more from parallel repair attempts intersecting while both parties remain highly defensive.
                  </p>
                  <p style={{ margin: 0, fontSize: 15, lineHeight: 1.75, color: "var(--color-text-secondary)" }}>
                    DEFRAG AI distills the precise architectural pattern causing friction without assigning character flaws or leaning into permanent diagnosis.
                  </p>
                </div>
                
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", paddingTop: 8 }}>
                  <Link href="/login" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "14px 20px", borderRadius: "var(--radius-pill)", background: "var(--color-text-primary)", color: "var(--color-bg)", textDecoration: "none", fontWeight: 700 }}>
                    Try it
                  </Link>
                </div>
              </section>
            </section>

            <aside style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", padding: 22, background: "var(--color-surface)", display: "grid", gap: 18 }}>
              <div style={{ display: "grid", gap: 6 }}>
                <p style={{ margin: 0, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-accent)" }}>Structural Tracing</p>
                <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: "var(--color-text-secondary)" }}>Recurring themes are mapped continuously in the live relational field to ensure guidance reflects the holistic pattern, not a singular reaction.</p>
              </div>
              {[
                "Conflict de-escalation mapping",
                "Tone shifting anomalies",
                "Repetitive post-event stress cycles",
              ].map((thread, index) => (
                <div key={thread} style={{ borderRadius: "var(--radius-md)", border: index === 0 ? "1px solid var(--color-accent)" : "1px solid var(--color-border)", background: index === 0 ? "color-mix(in srgb, var(--color-accent) 10%, transparent)" : "var(--color-surface-hover)", padding: "16px 16px", display: "grid", gap: 8 }}>
                  <span style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: index === 0 ? "var(--color-accent)" : "var(--color-text-muted)" }}>Analysis Trace</span>
                  <span style={{ lineHeight: 1.55, color: "var(--color-text-primary)" }}>{thread}</span>
                </div>
              ))}
            </aside>
          </section>
        </div>
        <style>{`
          @media (max-width: 900px) {
            .dynamics-preview-grid {
              grid-template-columns: 1fr !important;
            }
          }
          @media (max-width: 720px) {
            .dynamics-preview-metrics {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </AppShell>
    );
  }

  const { entitlements } = await getBillingStateForUser(user.userId);
  const threads = await listThreadsForUser(user.userId);
  return <DefragAISurface />;
}
