import { AppShell } from "@/components/app-shell";
import Link from "next/link";
import { cookies } from "next/headers";
import { enablePreviewMode, disablePreviewMode } from "./actions";

export default async function PreviewHub() {
  const cookieStore = await cookies();
  const previewPlan = cookieStore.get("__defrag_preview")?.value;
  const isPreviewActive = !!previewPlan;

  const routes = [
    { path: "/", label: "Homepage" },
    { path: "/login", label: "Login" },
    { path: "/account/billing", label: "Intelligence Tiers (Billing)" },
    { path: "/dynamics", label: "Console" },
    { path: "/about", label: "About DEFRAG" },
    { path: "/dynamics", label: "Console" },
    { path: "/account/insights", label: "Insight Generation" },
    { path: "/account/billing", label: "Billing & Subscriptions" },
    { path: "/not-found", label: "404 Error State" },
  ];

  return (
    <AppShell
      eyebrow="Development"
      title="Preview QA Hub"
      description="Navigate DEFRAG surfaces without live auth or real Stripe friction."
      accent="var(--color-accent)"
    >
      <div style={{ display: "grid", gap: 32, maxWidth: 620 }}>
        <section className="premium-panel" style={{ padding: 24, borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)", background: "var(--color-surface)", display: "grid", gap: 16 }}>
          <h2 style={{ margin: 0, fontSize: 18, color: "var(--color-text-primary)" }}>Preview State</h2>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: "var(--radius-pill)", border: "1px solid var(--color-border)", background: "rgba(0,0,0,0.3)", fontSize: 13, color: "var(--color-text-secondary)" }}>
              <span style={{ width: 8, height: 8, borderRadius: 8, background: isPreviewActive ? "#10b981" : "#ef4444" }} />
              {isPreviewActive ? `Active (Plan: ${previewPlan})` : "Inactive (Real Auth)"}
            </div>
          </div>
          
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
            <form action={enablePreviewMode.bind(null, "studio")}>
              <button style={btnStyle}>Enable Mock Premium</button>
            </form>
            <form action={enablePreviewMode.bind(null, "free")}>
              <button style={btnStyle}>Enable Mock Free</button>
            </form>
            <form action={disablePreviewMode}>
              <button style={{ ...btnStyle, border: "1px solid #ef4444" }}>Disable Preview</button>
            </form>
          </div>
        </section>

        <section style={{ display: "grid", gap: 16 }}>
          <h2 style={{ margin: 0, fontSize: 18, color: "var(--color-text-primary)" }}>Surface Directory</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {routes.map((route) => (
              <Link
                href={route.path}
                key={route.path}
                className="premium-panel"
                style={{
                  padding: "16px",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--color-border)",
                  background: "var(--color-surface)",
                  color: "var(--color-text-primary)",
                  textDecoration: "none",
                  fontSize: 14,
                }}
              >
                {route.label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}

const btnStyle = {
  padding: "10px 16px",
  borderRadius: "var(--radius-pill)",
  border: "1px solid var(--color-border)",
  background: "transparent",
  color: "var(--color-text-primary)",
  cursor: "pointer",
  fontSize: 13,
};
