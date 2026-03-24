import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

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
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 20px 60px" }}>
      <div style={{ display: "grid", gap: 12, marginBottom: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
          <div style={{ display: "grid", gap: 6 }}>
            <p style={{ margin: 0, fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "#71717a" }}>
              Relational Landscape
            </p>
            <h1 style={{ fontSize: 22, fontWeight: 600, margin: 0, letterSpacing: "-0.02em", color: "#f4f4f5" }}>
              Where things may need more care.
            </h1>
          </div>
          <Link
            href="/account/insights"
            style={{ fontSize: 12, color: "#a1a1aa", textDecoration: "none", border: "1px solid rgba(255,255,255,0.1)", padding: "8px 14px", borderRadius: 999, whiteSpace: "nowrap" }}
          >
            Insights
          </Link>
        </div>

        <p style={{ margin: 0, color: "#71717a", fontSize: 14, lineHeight: 1.6, maxWidth: 480 }}>
          This map helps you notice where connection may feel steady, where things may feel distant, and where a conversation may need more care.
        </p>
      </div>

      <MapView 
        user={{ name: profile?.display_name || user.email?.split("@")[0] || "You" }} 
        people={mockPeople} 
      />

      <StateSummary />
      <TimingHints />

      <div style={{ marginTop: 24, padding: 24, background: "rgba(255,255,255,0.02)", borderRadius: 16, border: "1px solid rgba(255,255,255,0.05)", display: "grid", gap: 12 }}>
        <div>
          <div style={{ display: "inline-block", padding: "4px 8px", background: "rgba(255,255,255,0.05)", borderRadius: 4, fontSize: 10, fontWeight: 600, color: "#a1a1aa", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>
            Best Next Step
          </div>
          <p style={{ color: "#f5f5f5", fontSize: 15, margin: "0 0 4px 0", fontWeight: 500 }}>
            Ready to explore a specific dynamic?
          </p>
          <p style={{ color: "#71717a", fontSize: 14, margin: 0, lineHeight: 1.6 }}>
            Look closer at a conversation, decision, or recurring pattern from multiple angles.
          </p>
        </div>
        <Link 
          href="/account/insights" 
          style={{ color: "#f4f4f5", textDecoration: "none", fontSize: 13, fontWeight: 500, display: "flex", alignItems: "center", gap: 6 }}
        >
          Start a new insight <span style={{ fontSize: 16 }}>→</span>
        </Link>
      </div>
    </div>
  );
}
