import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { AppShell } from "@/components/app-shell";

import MapView from "@/components/field/map-view";
import StateSummary from "@/components/field/state-summary";
import TimingHints from "@/components/field/timing-hints";

interface ProfileRow {
  display_name: string | null;
}

export default async function AccountPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  if (!user.user_metadata?.onboarding_completed) {
    redirect("/onboarding");
  }

  const { data: profileData } = await supabase
    .from("profiles")
    .select("display_name")
    .eq("id", user.id)
    .single();
  const profile = profileData as ProfileRow | null;

  const initialConnections = user.user_metadata?.initial_connections || [];
  const mockPeople = initialConnections.length > 0 
    ? initialConnections.map((p: any, i: number) => ({ id: String(i), name: p.name }))
    : [
        { id: "1", name: "Sarah" },
        { id: "2", name: "David" },
        { id: "3", name: "Alex" }
      ];

  return (
    <AppShell
      eyebrow="Landscape"
      title="See where care, distance, and timing are clustering."
      description="This surface keeps the wider relational field in view so you can notice where attention may help before dropping into a single read."
      accent="#9dd0be"
    >
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
          ["Profile", profile?.display_name || user.email?.split("@")[0] || "You"],
          ["Next move", "Open Insights"],
        ].map(([label, value]) => (
          <div key={label} style={{ padding: 18, borderRadius: 20, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.025)" }}>
            <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#8ab7a7" }}>{label}</div>
            <div style={{ marginTop: 10, color: "#f5f5f5", fontSize: 18, lineHeight: 1.5 }}>{value}</div>
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
            user={{ name: profile?.display_name || user.email?.split("@")[0] || "You" }}
            people={mockPeople}
          />
          <StateSummary />
          <TimingHints />
        </div>

        <aside style={{ display: "grid", gap: 16 }}>
          <section style={{ padding: 20, borderRadius: 22, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.025)", display: "grid", gap: 10 }}>
            <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#8ab7a7" }}>Best next step</div>
            <p style={{ margin: 0, color: "#f5f5f5", fontSize: 18, lineHeight: 1.5 }}>
              Take one relationship moment from this map and open it inside Insight Studio.
            </p>
            <p style={{ margin: 0, color: "#a1a1aa", fontSize: 14, lineHeight: 1.7 }}>
              The map keeps the wider field visible. Insights gives you the closer read.
            </p>
            <Link
              href="/account/insights"
              style={{
                marginTop: 6,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "12px 16px",
                borderRadius: 999,
                background: "#f5f5f5",
                color: "#050505",
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              Open Insight Studio
            </Link>
          </section>

          <section style={{ padding: 20, borderRadius: 22, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)", display: "grid", gap: 10 }}>
            <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#71717a" }}>Orientation</div>
            <div style={{ color: "#d4d4d8", lineHeight: 1.75, fontSize: 14 }}>
              Use this page to notice where things feel charged or unfinished.
              Then move to Companion for a relational read or Insights for a more direct interpretation.
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
