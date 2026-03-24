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
        eyebrow="Companion"
        title="A steadier read of one moment before it becomes a whole story."
        description="Preview the workspace structure, reading posture, and thread flow here. Sign in when you want your own private reasoning history and saved follow-up actions."
        accent="#d8c49f"
      >
        <div style={{ display: "grid", gap: 22 }}>
          <PublicPreviewCta
            title="Companion is visible in preview, private in use."
            description="You can inspect the thread rail, read architecture, and action rhythm without crossing the auth boundary. Sign in when you want to write, save, and keep an ongoing reasoning thread."
            primaryLabel="Sign in for your workspace"
            secondaryLabel="See billing"
            secondaryHref="/account/billing"
          />

          <section className="companion-preview-grid" style={{ display: "grid", gridTemplateColumns: "300px minmax(0, 1fr)", gap: 22, alignItems: "start" }}>
            <aside style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: 24, padding: 18, background: "radial-gradient(circle at top left, rgba(216,196,159,0.12), transparent 30%), linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))", display: "grid", gap: 16 }}>
              <div style={{ display: "grid", gap: 6 }}>
                <p style={{ margin: 0, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "#d8c49f" }}>Sample threads</p>
                <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: "#b4b8c1" }}>Recurring themes stay grouped so the read tracks pattern, not only the latest sentence.</p>
              </div>
              {[
                "After dinner repair attempt",
                "The message that changed the tone",
                "Family gathering residue",
              ].map((thread, index) => (
                <div key={thread} style={{ borderRadius: 18, border: index === 0 ? "1px solid #d8c49f" : "1px solid rgba(255,255,255,0.08)", background: index === 0 ? "rgba(216,196,159,0.08)" : "rgba(255,255,255,0.02)", padding: "14px 14px", display: "grid", gap: 6 }}>
                  <span style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: index === 0 ? "#d8c49f" : "#7d8593" }}>Thread</span>
                  <span style={{ lineHeight: 1.55, color: "#f5f5f5" }}>{thread}</span>
                </div>
              ))}
            </aside>

            <section style={{ display: "grid", gap: 18 }}>
              <section style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: 24, padding: 18, background: "radial-gradient(circle at top left, rgba(216,196,159,0.12), transparent 28%), linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.015))", display: "grid", gap: 18 }}>
                <div className="companion-preview-metrics" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 10 }}>
                  {[
                    ["Mode", "Lead read"],
                    ["Confidence", "Measured"],
                    ["Action", "One next move"],
                  ].map(([label, value]) => (
                    <div key={label} style={{ padding: 12, borderRadius: 16, background: "rgba(0,0,0,0.18)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <div style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "#8d8d95" }}>{label}</div>
                      <div style={{ marginTop: 8, fontSize: 14, color: "#f5f5f5" }}>{value}</div>
                    </div>
                  ))}
                </div>

                <div style={{ display: "grid", gap: 12, padding: 20, borderRadius: 18, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.025)" }}>
                  <p style={{ margin: 0, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#71717a" }}>Lead synthesis</p>
                  <p style={{ margin: 0, fontSize: 22, lineHeight: 1.4, color: "#f5f5f5" }}>
                    The pressure looks less like total incompatibility and more like two repair attempts arriving while both people still feel exposed.
                  </p>
                  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.75, color: "#b4b8c1" }}>
                    Companion keeps the tone gentle, names the likely pattern, and narrows the next move enough that you can try it without turning the whole relationship into a project.
                  </p>
                </div>

                <div className="companion-preview-columns" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 16 }}>
                  <div style={{ display: "grid", gap: 10, padding: 18, borderRadius: 18, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}>
                    <p style={{ margin: 0, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "#d8c49f" }}>Likely pattern</p>
                    <p style={{ margin: 0, color: "#f5f5f5", lineHeight: 1.7 }}>Protective pacing on one side, urgency on the other, and a loop where both read the other as pulling away.</p>
                  </div>
                  <div style={{ display: "grid", gap: 10, padding: 18, borderRadius: 18, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}>
                    <p style={{ margin: 0, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "#d8c49f" }}>Next move</p>
                    <p style={{ margin: 0, color: "#f5f5f5", lineHeight: 1.7 }}>Open with one observation about the moment itself before explaining impact or asking for repair.</p>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <Link href="/login" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "12px 18px", borderRadius: 999, background: "#f5f5f5", color: "#050505", textDecoration: "none", fontWeight: 700 }}>
                    Sign in to start a thread
                  </Link>
                  <Link href="/world" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "12px 18px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.14)", color: "#f5f5f5", textDecoration: "none" }}>
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
      eyebrow="Companion"
      title="A steadier read of one moment before it becomes a whole story."
      description="Thread-based reasoning, stored insight history, follow-up actions, and premium evidence views now sit inside one calmer workspace."
      accent="#d8c49f"
    >
      <CompanionWorkspace
        initialThreads={threads.map((thread) => ({ id: thread.id, title: thread.title }))}
        entitlements={entitlements}
      />
    </AppShell>
  );
}
