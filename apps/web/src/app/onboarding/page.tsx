"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { createClient } from "@/utils/supabase/client";

function OnboardingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  
  const [displayName, setDisplayName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const nextPath = searchParams.get("next");
  const isInviteFlow = nextPath?.includes("/share/");

  const eyebrow = isInviteFlow ? "Almost there" : "Welcome";
  const title = "Setting up your workspace.";
  const description = isInviteFlow 
    ? "Before you view the shared summary, enter your name. Your work stays private until you choose to share it back."
    : "This helps us personalize how you usually respond under pressure and what helps you feel steady.";

  return (
    <AppShell
      eyebrow={eyebrow}
      title={title}
      description={description}
      accent="var(--color-accent)"
    >
      <section
        className="premium-fade-up"
        style={{
          maxWidth: 640,
          marginTop: 24,
          display: "grid",
          gap: 24,
          padding: 32,
          borderRadius: "var(--radius-lg)",
          background: "rgba(6, 7, 10, 0.4)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid var(--color-border)",
        }}
      >
        <div style={{ display: "grid", gap: 12 }}>
          <label style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-primary)" }}>Your name</label>
          <input
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
            placeholder="Jane Doe"
            style={{
              width: "100%",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--color-border)",
              background: "rgba(0,0,0,0.5)",
              color: "var(--color-text-primary)",
              padding: "16px",
              fontSize: 16,
              outline: "none",
              boxSizing: "border-box"
            }}
          />
        </div>

        <button
          type="button"
          onClick={async () => {
             setBusy(true);
             setError(null);
             try {
                const { data: { user } } = await supabase.auth.getUser();

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

                router.push(nextPath && nextPath.startsWith("/") ? nextPath : "/dynamics");
                router.refresh();
             } catch (err) {
                setError(err instanceof Error ? err.message : "Unable to complete setup");
             } finally {
                setBusy(false);
             }
          }}
          disabled={busy || !displayName.trim()}
          style={{
            width: "100%",
            padding: "16px",
            borderRadius: "var(--radius-pill)",
            border: 0,
            background: "var(--color-text-primary)",
            color: "var(--color-bg)",
            fontWeight: 600,
            fontSize: 15,
            cursor: busy || !displayName.trim() ? "default" : "pointer",
            opacity: busy || !displayName.trim() ? 0.7 : 1,
            transition: "all 0.2s ease"
          }}
        >
          {busy ? "Saving..." : isInviteFlow ? "View summary" : "Continue to DEFRAG"}
        </button>

        {error ? (
          <div style={{ padding: 12, borderRadius: 8, background: "rgba(220, 38, 38, 0.1)", border: "1px solid rgba(220, 38, 38, 0.2)", color: "#fca5a5", fontSize: 13, textAlign: "center" }}>
            {error}
          </div>
        ) : null}
      </section>
    </AppShell>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OnboardingContent />
    </Suspense>
  );
}
