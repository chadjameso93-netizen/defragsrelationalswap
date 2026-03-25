import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/app-shell";

import MapView from "@/components/field/map-view";
import { PublicPreviewCta } from "@/components/public-preview-cta";
import StateSummary from "@/components/field/state-summary";
import TimingHints from "@/components/field/timing-hints";

export default async function AccountPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user && !user.user_metadata?.onboarding_completed) {
    redirect("/onboarding");
  }

  const initialConnections = user?.user_metadata?.initial_connections || [];
  const mockPeople = initialConnections.length > 0 
    ? initialConnections.map((p: any, i: number) => ({ id: String(i), name: p.name }))
    : [
        { id: "1", name: "Sarah" },
        { id: "2", name: "David" },
        { id: "3", name: "Alex" }
      ];
  const profileLabel =
    (typeof user?.user_metadata?.display_name === "string" && user.user_metadata.display_name) ||
    user?.email?.split("@")[0] ||
    "Observer";

  return (
    <AppShell
      eyebrow="Landscape"
      title="See where care, distance, and timing are clustering."
      description="This topology keeps the wider relational field in view, so you can notice where attention may help before diving into single events."
      accent="var(--color-accent)"
    >
      {!user ? (
        <PublicPreviewCta
          title="The landscape must be anchored to an observer."
          description="In order to map dynamics accurately, the system must orient around a central perspective. Link your identity to initialize a true relational map."
          primaryLabel="Anchor Perspective"
          secondaryLabel="Open Dynamics"
          secondaryHref="/dynamics"
        />
      ) : null}
      <section
        className="account-hero-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 16,
          marginBottom: 18,
        }}
      >
        {[
          ["Nodes in Frame", String(mockPeople.length)],
          ["Observer", profileLabel],
          ["Next move", user ? "Open DEFRAG AI Workspace" : "Authenticate to save view"],
        ].map(([label, value]) => (
          <div key={label} className="premium-fade-up" data-delay="1" style={{ padding: 24, borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)", background: "var(--color-surface)" }}>
            <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-accent)" }}>{label}</div>
            <div style={{ marginTop: 10, color: "var(--color-text-primary)", fontSize: 18, lineHeight: 1.5 }}>{value}</div>
          </div>
        ))}
      </section>

      <div
        className="account-main-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.25fr) minmax(280px, 0.75fr)",
          gap: 22,
          alignItems: "start",
        }}
      >
        <div style={{ display: "grid", gap: 18 }}>
          <MapView
            user={{ name: profileLabel }}
            people={mockPeople}
          />
          <StateSummary />
          <TimingHints />
        </div>

        <aside style={{ display: "grid", gap: 16 }}>
          <section className="premium-fade-up" data-delay="2" style={{ padding: 24, borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)", background: "var(--color-surface)", display: "grid", gap: 12 }}>
            <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-accent)" }}>Best next step</div>
            <p style={{ margin: 0, color: "var(--color-text-primary)", fontSize: 18, lineHeight: 1.5 }}>
              Take one relationship moment from this map and isolate it in DEFRAG AI.
            </p>
            <p style={{ margin: 0, color: "var(--color-text-secondary)", fontSize: 14, lineHeight: 1.7 }}>
              The map keeps the wider field visible. DEFRAG AI provides the closer mechanism for extraction.
            </p>
            <Link
              href={user ? "/dynamics" : "/login"}
              style={{
                marginTop: 6,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "14px 20px",
                borderRadius: "var(--radius-pill)",
                background: "var(--color-text-primary)",
                color: "var(--color-bg)",
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              {user ? "Open DEFRAG AI" : "Authenticate to Proceed"}
            </Link>
          </section>

          <section className="premium-fade-up" data-delay="3" style={{ padding: 24, borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)", background: "var(--color-surface)", display: "grid", gap: 12 }}>
            <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-text-muted)" }}>Orientation</div>
            <div style={{ color: "var(--color-text-secondary)", lineHeight: 1.75, fontSize: 14 }}>
              Use this page to notice where things feel charged or unfinished. Then move to DEFRAG AI for pattern clarity and a direct read on what to try next.
            </div>
          </section>
        </aside>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .account-main-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </AppShell>
  );
}
