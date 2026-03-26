import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/app-shell";

import MapView from "@/components/field/map-view";
import { PublicPreviewCta } from "@/components/public-preview-cta";
import StateSummary from "@/components/field/state-summary";
import TimingHints from "@/components/field/timing-hints";
import { ArrowRight, Sparkles } from "lucide-react";

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
    "User";

  return (
    <AppShell
      eyebrow="Conversations"
      title="See the pattern across your interaction history."
      description="Notice where pressure is clustering and which interactions need the most attention."
      accent="#22d3ee"
    >
      {!user ? (
        <div style={{ marginBottom: 64 }}>
           <PublicPreviewCta
             title="Sign in to see your overview."
             description="DEFRAG translates the timeline of an interaction to help you see the pattern and decide what to do next. Sign in to begin."
             primaryLabel="Try DEFRAG"
             secondaryLabel="Console"
             secondaryHref="/dynamics"
           />
        </div>
      ) : null}

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 16px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 80 }} className="dashboard-grid">
           
           <div style={{ display: "grid", gap: 64 }}>
              <MapView user={{ name: profileLabel }} people={mockPeople} />
              <StateSummary />
              <TimingHints />
           </div>

           <aside style={{ display: "flex", flexDirection: "column", gap: 48 }}>
              <div>
                 <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245, 245, 245, 0.4)", marginBottom: 20 }}>Next Step</div>
                 <div style={{ display: "grid", gap: 16 }}>
                    <p style={{ margin: 0, fontSize: 16, color: "white", fontWeight: 500, lineHeight: 1.4 }}>
                       Focus on one interaction in the Console.
                    </p>
                    <p style={{ margin: 0, fontSize: 14, color: "rgba(245, 245, 245, 0.5)", lineHeight: 1.6 }}>
                       The overview helps you pick where to look. The Console gives you the specific moves to make.
                    </p>
                    <Link href="/dynamics" style={{ marginTop: 8, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, borderRadius: 16, background: "white", color: "#050505", padding: "18px", textDecoration: "none", fontWeight: 600, fontSize: 16 }}>
                       Open Console
                       <ArrowRight style={{ width: 18, height: 18 }} />
                    </Link>
                 </div>
              </div>

              <div style={{ paddingTop: 40, borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
                 <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245, 245, 245, 0.4)", marginBottom: 24 }}>System State</div>
                 <div style={{ display: "grid", gap: 24 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 13, color: "rgba(245,245,245,0.6)" }}>Conversations in field</span>
                        <span style={{ fontSize: 13, fontWeight: 600, color: "white" }}>{mockPeople.length}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 13, color: "rgba(245,245,245,0.6)" }}>Session Role</span>
                        <span style={{ fontSize: 13, fontWeight: 600, color: "white" }}>{user ? "Authenticated" : "Guest"}</span>
                    </div>
                 </div>
              </div>

              <div style={{ paddingTop: 40, borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
                 <div style={{ display: "flex", gap: 12, padding: 24, borderRadius: 24, background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <Sparkles style={{ width: 18, height: 18, color: "#22d3ee", flexShrink: 0 }} />
                    <p style={{ margin: 0, fontSize: 12, lineHeight: 1.6, color: "rgba(245,245,245,0.45)" }}>
                      DEFRAG helps you understand what happened. Use this view to pick an interaction, then move to the Console for specific guidance.
                    </p>
                 </div>
              </div>
           </aside>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .dashboard-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </AppShell>
  );
}
