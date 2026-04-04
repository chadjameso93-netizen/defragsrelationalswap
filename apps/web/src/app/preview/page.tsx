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
    { path: "/about", label: "Approach" },
    { path: "/dynamics", label: "Console" },
    { path: "/account", label: "Account Overview" },
    { path: "/account/billing", label: "Billing & Tiers" },
    { path: "/pricing", label: "Public Pricing" },
    { path: "/terms", label: "Terms" },
    { path: "/privacy", label: "Privacy" },
    { path: "/onboarding", label: "Onboarding" },
    { path: "/not-found", label: "404 Error State" },
  ];

  return (
    <AppShell
      eyebrow="Development"
      title="Preview QA Hub"
      description="Navigate DEFRAG surfaces without live auth or real Stripe friction."
      accent="#22d3ee"
    >
      <div style={{ display: "grid", gap: 48, maxWidth: 640 }}>
        <div style={{ display: "grid", gap: 20 }}>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 500, color: "white" }}>Preview State</h2>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 9999, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", fontSize: 13, color: "rgba(245,245,245,0.6)" }}>
              <span style={{ width: 8, height: 8, borderRadius: 8, background: isPreviewActive ? "#10b981" : "#ef4444" }} />
              {isPreviewActive ? `Active (Plan: ${previewPlan})` : "Inactive (Real Auth)"}
            </div>
          </div>
          
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <form action={enablePreviewMode.bind(null, "studio")}>
              <button style={btnStyle}>Enable Mock Premium</button>
            </form>
            <form action={enablePreviewMode.bind(null, "free")}>
              <button style={btnStyle}>Enable Mock Free</button>
            </form>
            <form action={disablePreviewMode}>
              <button style={{ ...btnStyle, borderColor: "#ef4444" }}>Disable Preview</button>
            </form>
          </div>
        </div>

        <div style={{ paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.08)", display: "grid", gap: 20 }}>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 500, color: "white" }}>Surface Directory</h2>
          <div style={{ display: "grid", gap: 1 }}>
            {routes.map((route) => (
              <Link
                href={route.path}
                key={`${route.path}-${route.label}`}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "16px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  color: "white",
                  textDecoration: "none",
                  fontSize: 14,
                }}
              >
                <span>{route.label}</span>
                <span style={{ fontSize: 12, color: "rgba(245,245,245,0.3)" }}>{route.path}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

const btnStyle: React.CSSProperties = {
  padding: "10px 16px",
  borderRadius: 9999,
  border: "1px solid rgba(255,255,255,0.1)",
  background: "transparent",
  color: "white",
  cursor: "pointer",
  fontSize: 13,
};
