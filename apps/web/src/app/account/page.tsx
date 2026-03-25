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
    "User";

  return (
    <AppShell
      eyebrow="Conversations"
      title="See the pattern across your interaction history."
      description="Notice where pressure is clustering and which interactions need the most attention."
      accent="var(--color-accent)"
    >
      {!user ? (
        <PublicPreviewCta
          title="Sign in to see your overview."
          description="DEFRAG translates the timeline of an interaction to help you see the pattern and decide what to do next. Sign in to begin."
          primaryLabel="Try DEFRAG"
          secondaryLabel="Console"
          secondaryHref="/dynamics"
        />
      ) : null}
      <section
        className="premium-fade-up"
        data-delay="1"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 16,
          marginBottom: 18,
        }}
      >
        {[
          ["Conversations", String(mockPeople.length)],
          ["Status", user ? "Authenticated" : "Guest"],
          ["Next move", user ? "Open Console" : "Try DEFRAG"],
        ].map(([label, value]) => (
          <div key={label} style={{ padding: 24, borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)", background: "var(--color-surface)" }}>
            <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-accent)" }}>{label}</div>
            <div style={{ marginTop: 10, color: "var(--color-text-primary)", fontSize: 18, lineHeight: 1.5 }}>{value}</div>
          </div>
        ))}
      </section>

      <div
        className="premium-fade-up"
        data-delay="2"
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
          <section style={{ padding: 24, borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)", background: "var(--color-surface)", display: "grid", gap: 12 }}>
            <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-accent)" }}>Next step</div>
            <p style={{ margin: 0, color: "var(--color-text-primary)", fontSize: 18, lineHeight: 1.5 }}>
              Focus on one interaction in the Console.
            </p>
            <p style={{ margin: 0, color: "var(--color-text-secondary)", fontSize: 14, lineHeight: 1.7 }}>
              The overview helps you pick where to look. The Console gives you the specific moves to make.
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
              {user ? "Open Console" : "Try DEFRAG"}
            </Link>
          </section>

          <section style={{ padding: 24, borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)", background: "var(--color-surface)", display: "grid", gap: 12 }}>
            <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-text-muted)" }}>Personalize</div>
            <div style={{ color: "var(--color-text-secondary)", lineHeight: 1.75, fontSize: 14 }}>
              DEFRAG helps you understand what happened, see the pattern, and know what to do next. Use this view to pick an interaction, then move to the Console for specific guidance.
            </div>
          </section>
        </aside>
      </div>

      <style>{`
        @media (max-width: 900px) {
          div[style*="grid-template-columns: minmax(0, 1.25fr) minmax(280px, 0.75fr)"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </AppShell>
  );
}
