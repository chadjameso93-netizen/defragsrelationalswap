"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { createClient } from "@/utils/supabase/client";

export default function OnboardingPage() {
  const router = useRouter();
  const supabase = createClient();
  const [displayName, setDisplayName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <AppShell
      eyebrow="Onboarding"
      title="Set the workspace once, then move freely."
      description="This is a minimal handoff that marks the account ready for the private surfaces. You can refine everything else later."
      accent="#9dd0be"
    >
      <section
        style={{
          maxWidth: 720,
          display: "grid",
          gap: 18,
          padding: 24,
          borderRadius: 24,
          border: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(255,255,255,0.025)",
        }}
      >
        <div style={{ display: "grid", gap: 8 }}>
          <p style={{ margin: 0, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#9dd0be" }}>
            Workspace setup
          </p>
          <p style={{ margin: 0, color: "rgba(245,245,245,0.74)", lineHeight: 1.7 }}>
            Add the name you want the product to use, then continue into your account. This avoids the dead-end redirect and gives the private routes a stable profile label.
          </p>
        </div>

        <label style={{ display: "grid", gap: 8 }}>
          <span style={{ fontSize: 13, color: "#f5f5f5" }}>Display name</span>
          <input
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
            placeholder="Your name"
            style={{
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.02)",
              color: "#f5f5f5",
              padding: "14px 16px",
            }}
          />
        </label>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={async () => {
              setBusy(true);
              setError(null);
              try {
                const {
                  data: { user },
                } = await supabase.auth.getUser();

                if (!user) {
                  router.push("/login");
                  return;
                }

                const metadata = {
                  ...user.user_metadata,
                  display_name: displayName.trim() || user.user_metadata?.display_name,
                  onboarding_completed: true,
                };

                const updateResult = await supabase.auth.updateUser({ data: metadata });
                if (updateResult.error) {
                  throw updateResult.error;
                }

                router.push("/account");
                router.refresh();
              } catch (err) {
                setError(err instanceof Error ? err.message : "Unable to complete onboarding");
              } finally {
                setBusy(false);
              }
            }}
            disabled={busy}
            style={{
              padding: "12px 18px",
              borderRadius: 999,
              border: 0,
              background: "#f5f5f5",
              color: "#050505",
              fontWeight: 700,
              cursor: busy ? "default" : "pointer",
            }}
          >
            {busy ? "Saving…" : "Enter workspace"}
          </button>
        </div>

        {error ? <p style={{ margin: 0, color: "#fca5a5" }}>{error}</p> : null}
      </section>
    </AppShell>
  );
}
