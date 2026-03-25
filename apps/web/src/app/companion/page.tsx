import Link from "next/link";
import { AppShell } from "../../components/app-shell";
import { CompanionWorkspace } from "../../components/companion-workspace";
import { PublicPreviewCta } from "../../components/public-preview-cta";
import { getBillingStateForUser } from "../../lib/billing-server";
import { getAuthenticatedUserOrNull } from "../../server/auth";
import { listThreadsForUser } from "../../server/companion-store";

export default async function CompanionPage() {
  const user = await getAuthenticatedUserOrNull();

  if (!user) {
    return (
      <AppShell
        eyebrow="Dynamics"
        title="See the relationship pattern before the whole moment hardens into a story."
        description="Preview the dynamics workspace, thread flow, and next-step guidance here. Sign in when you want private history, saved follow-up actions, and account-linked access on DEFRAG."
        accent="#d8c49f"
      >
        <div style={{ display: "grid", gap: 22 }}>
          <PublicPreviewCta
            title="Dynamics is visible in preview, private in use."
            description="You can inspect the thread rail, pattern summary, and next-step flow without crossing the auth boundary. Sign in when you want to write, save, and keep an ongoing thread on your DEFRAG account."
            primaryLabel="Sign in for your workspace"
            secondaryLabel="See billing"
            secondaryHref="/account/billing"
          />

          <section className="companion-preview-grid premium-fade-up" data-delay="1" style={{ display: "grid", gridTemplateColumns: "300px minmax(0, 1fr)", gap: 24, alignItems: "start" }}>
            <aside style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", padding: 22, background: "var(--color-surface)", display: "grid", gap: 18 }}>
              <div style={{ display: "grid", gap: 6 }}>
                <p style={{ margin: 0, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-accent)" }}>Sample threads</p>
                <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: "var(--color-text-secondary)" }}>Recurring themes stay grouped so the guidance tracks pattern, not only the latest sentence.</p>
              </div>
              {[
                "After dinner repair attempt",
                "The message that changed the tone",
                "Family gathering residue",
              ].map((thread, index) => (
                <div key={thread} style={{ borderRadius: "var(--radius-md)", border: index === 0 ? "1px solid var(--color-accent)" : "1px solid var(--color-border)", background: index === 0 ? "color-mix(in srgb, var(--color-accent) 10%, transparent)" : "var(--color-surface-hover)", padding: "16px 16px", display: "grid", gap: 8 }}>
                  <span style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: index === 0 ? "var(--color-accent)" : "var(--color-text-muted)" }}>Thread</span>
                  <span style={{ lineHeight: 1.55, color: "var(--color-text-primary)" }}>{thread}</span>
                </div>
              ))}
            </aside>

            <section style={{ display: "grid", gap: 20 }}>
              <section style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", padding: 22, background: "linear-gradient(180deg, var(--color-surface), transparent)", display: "grid", gap: 20 }}>
                <div className="companion-preview-metrics" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12 }}>
                  {[
                    ["Mode", "Lead summary"],
                    ["Confidence", "Measured"],
                    ["Action", "One next move"],
                  ].map(([label, value]) => (
                    <div key={label} style={{ padding: 16, borderRadius: "var(--radius-md)", background: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
                      <div style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-text-muted)" }}>{label}</div>
                      <div style={{ marginTop: 8, fontSize: 14, color: "var(--color-text-primary)" }}>{value}</div>
                    </div>
                  ))}
                </div>

                <div style={{ display: "grid", gap: 14, padding: 24, borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", background: "var(--color-surface-hover)" }}>
                  <p style={{ margin: 0, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-text-muted)" }}>Lead synthesis</p>
                  <p style={{ margin: 0, fontSize: 24, lineHeight: 1.4, color: "var(--color-text-primary)" }}>
                    The pressure may be less about total incompatibility and more about two repair attempts arriving while both people still feel exposed.
                  </p>
                  <p style={{ margin: 0, fontSize: 15, lineHeight: 1.75, color: "var(--color-text-secondary)" }}>
                    DEFRAG keeps the tone gentle, names the likely pattern, and narrows the next move enough that you can try it without turning the whole relationship into a diagnosis or fixed story.
                  </p>
                </div>

                <div className="companion-preview-columns" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 16 }}>
                  <div style={{ display: "grid", gap: 12, padding: 22, borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", background: "var(--color-surface)" }}>
                    <p style={{ margin: 0, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-accent)" }}>Likely pattern</p>
                    <p style={{ margin: 0, color: "var(--color-text-primary)", lineHeight: 1.7 }}>Protective pacing on one side, urgency on the other, and a loop where both people may read the other as pulling away.</p>
                  </div>
                  <div style={{ display: "grid", gap: 12, padding: 22, borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", background: "var(--color-surface)" }}>
                    <p style={{ margin: 0, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-accent)" }}>Next move</p>
                    <p style={{ margin: 0, color: "var(--color-text-primary)", lineHeight: 1.7 }}>Open with one observation about the moment itself before explaining impact or asking for repair.</p>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", paddingTop: 8 }}>
                  <Link href="/login" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "14px 20px", borderRadius: "var(--radius-pill)", background: "var(--color-text-primary)", color: "var(--color-bg)", textDecoration: "none", fontWeight: 700 }}>
                    Sign in to start a thread
                  </Link>
                  <Link href="/world" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "14px 20px", borderRadius: "var(--radius-pill)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", textDecoration: "none" }}>
                    Open World preview
                  </Link>
                </div>
              </section>
            </section>
          </section>
        </div>
        <style>{`
          @media (max-width: 900px) {
            .companion-preview-grid {
              grid-template-columns: 1fr !important;
            }
          }

          @media (max-width: 720px) {
            .companion-preview-metrics,
            .companion-preview-columns {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </AppShell>
    );
  }

  const { entitlements } = await getBillingStateForUser(user.userId);
  const threads = await listThreadsForUser(user.userId);

  return (
      <AppShell
      eyebrow="Dynamics"
        title="See the relationship pattern before the whole moment hardens into a story."
        description="Thread-based guidance, saved insight history, follow-up actions, and evidence views now sit inside one calmer workspace on DEFRAG."
      accent="#d8c49f"
    >
      <CompanionWorkspace
        initialThreads={threads.map((thread) => ({ id: thread.id, title: thread.title }))}
        entitlements={entitlements}
      />
    </AppShell>
  );
}
