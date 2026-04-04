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
      eyebrow="Account"
      title="Your account overview."
      description="Review your activity, open your workspace, and keep moving with clarity."
      accent="#22d3ee"
    >
      {!user ? (
        <div style={{ marginBottom: 48 }}>
          <PublicPreviewCta
            title="Sign in to view your account."
            description="Defrag helps you review important interactions and decide what to do next. Sign in to get started."
            primaryLabel="Sign in"
            secondaryLabel="Open workspace"
            secondaryHref="/dynamics"
          />
        </div>
      ) : null}

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 16px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 56 }} className="dashboard-grid">
          <div style={{ display: "grid", gap: 48 }}>
            <MapView user={{ name: profileLabel }} people={mockPeople} />
            <StateSummary />
            <TimingHints />
          </div>

          <aside style={{ display: "flex", flexDirection: "column", gap: 36 }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245, 245, 245, 0.4)", marginBottom: 16 }}>Next step</div>
              <div style={{ display: "grid", gap: 14 }}>
                <p style={{ margin: 0, fontSize: 16, color: "white", fontWeight: 500, lineHeight: 1.4 }}>
                  Open your workspace and focus on one interaction.
                </p>
                <p style={{ margin: 0, fontSize: 14, color: "rgba(245, 245, 245, 0.58)", lineHeight: 1.6 }}>
                  Your account shows the broader picture. Your workspace helps you examine one exchange and decide what to do next.
                </p>
                <Link href="/dynamics" style={{ marginTop: 6, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, borderRadius: 16, background: "white", color: "#050505", padding: "16px 18px", textDecoration: "none", fontWeight: 600, fontSize: 16 }}>
                  Open workspace
                  <ArrowRight style={{ width: 18, height: 18 }} />
                </Link>
              </div>
            </div>

            <div style={{ paddingTop: 28, borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245, 245, 245, 0.4)", marginBottom: 18 }}>Account</div>
              <div style={{ display: "grid", gap: 18 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
                  <span style={{ fontSize: 13, color: "rgba(245,245,245,0.6)" }}>People tracked</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "white" }}>{mockPeople.length}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
                  <span style={{ fontSize: 13, color: "rgba(245,245,245,0.6)" }}>Access</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "white" }}>{user ? "Signed in" : "Guest"}</span>
                </div>
              </div>
            </div>

            <div style={{ paddingTop: 28, borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
              <div style={{ display: "flex", gap: 12, padding: 20, borderRadius: 20, background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <Sparkles style={{ width: 18, height: 18, color: "#22d3ee", flexShrink: 0 }} />
                <p style={{ margin: 0, fontSize: 12, lineHeight: 1.6, color: "rgba(245,245,245,0.48)" }}>
                  Use your account to stay organized, then move into the workspace when you want a clearer read on one moment.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .dashboard-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </AppShell>
  );
}
