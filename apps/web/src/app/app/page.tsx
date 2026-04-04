import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient as createSupabaseServerClient } from "@/utils/supabase/server";

export default async function AppHomePage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main style={{ minHeight: "100vh", background: "#050505", color: "#f5f2ec", padding: 24 }}>
      <section style={{ maxWidth: 1240, margin: "0 auto", display: "grid", gap: 24 }}>
        <div style={{ display: "grid", gap: 8, border: "1px solid rgba(255,255,255,0.08)", background: "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015))", padding: 24 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,242,236,0.42)" }}>Signed in</div>
          <h1 style={{ margin: 0, fontSize: 52, lineHeight: 0.96, fontFamily: "var(--font-display), serif" }}>Welcome back to DEFRAG</h1>
          <div style={{ color: "rgba(245,242,236,0.62)", lineHeight: 1.72 }}>
            Signed in as {user.email}. This page is the clean signed-in home for production routing once the live domain starts sending authenticated users into the new flow.
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 18 }}>
          <Link href="/intake" style={{ padding: 20, textDecoration: "none", color: "#f5f2ec", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}>
            <div style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,242,236,0.42)" }}>Baseline</div>
            <div style={{ marginTop: 8, fontSize: 30, fontFamily: "var(--font-display), serif" }}>Continue intake</div>
          </Link>
          <Link href="/workspace/final" style={{ padding: 20, textDecoration: "none", color: "#f5f2ec", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}>
            <div style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,242,236,0.42)" }}>Workspace</div>
            <div style={{ marginTop: 8, fontSize: 30, fontFamily: "var(--font-display), serif" }}>Open workspace</div>
          </Link>
          <Link href="/billing" style={{ padding: 20, textDecoration: "none", color: "#f5f2ec", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}>
            <div style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,242,236,0.42)" }}>Billing</div>
            <div style={{ marginTop: 8, fontSize: 30, fontFamily: "var(--font-display), serif" }}>Manage plan</div>
          </Link>
        </div>
      </section>
    </main>
  );
}
