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
    "Preview visitor";

  return (
    <AppShell
      eyebrow="Landscape"
      title="See where care, distance, and timing are clustering."
      description={user
        ? "This page keeps the wider relational field in view so you can notice where attention may help before moving into a single insight."
        : "The account landscape stays visible in preview mode so you can inspect the wider field view before authentication turns it into your own working map."}
      accent="#9dd0be"
    >
      {!user ? (
        <PublicPreviewCta
          title="The landscape can be viewed before it becomes personal."
          description="Preview the wider relational field, orientation panels, and next-step flow here. Sign in when you want your actual people, stored profile, and linked account pages."
          primaryLabel="Sign in for your landscape"
          secondaryLabel="Open Insights preview"
          secondaryHref="/account/insights"
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
          ["People in frame", String(mockPeople.length)],
          ["Profile", profileLabel],
          ["Next move", user ? "Open Insights" : "Sign in to save"],
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
              Take one relationship moment from this map and open it in Insights.
            </p>
            <p style={{ margin: 0, color: "var(--color-text-secondary)", fontSize: 14, lineHeight: 1.7 }}>
              The map keeps the wider field visible. Insights gives you the closer view.
            </p>
            <Link
              href={user ? "/account/insights" : "/login"}
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
              {user ? "Open Insights" : "Sign in to open Insights"}
            </Link>
          </section>

          <section className="premium-fade-up" data-delay="3" style={{ padding: 24, borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)", background: "var(--color-surface)", display: "grid", gap: 12 }}>
            <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-text-muted)" }}>Orientation</div>
            <div style={{ color: "var(--color-text-secondary)", lineHeight: 1.75, fontSize: 14 }}>
              Use this page to notice where things feel charged or unfinished.
              Then move to Dynamics for pattern clarity or Insights for a more direct read on what to try next.
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
