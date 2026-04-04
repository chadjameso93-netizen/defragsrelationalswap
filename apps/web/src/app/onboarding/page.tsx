"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { createClient } from "@/utils/supabase/client";
import { ArrowRight, User } from "lucide-react";

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
  const title = "Finish setting up your account.";
  const description = isInviteFlow
    ? "Before you open the shared summary, add your name so we can finish your setup."
    : "Add your name to continue to your workspace.";

  return (
    <AppShell
      eyebrow={eyebrow}
      title={title}
      description={description}
      accent="#22d3ee"
    >
      <div style={{ maxWidth: 640, marginTop: 32 }}>
        <div style={{ display: "grid", gap: 28 }}>
          <div style={{ display: "grid", gap: 12 }}>
            <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245, 245, 245, 0.4)" }}>
              Your full name
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: 14, borderRadius: 16, border: "1px solid rgba(255, 255, 255, 0.1)", background: "rgba(0,0,0,0.2)", padding: "16px 20px" }}>
              <User style={{ width: 18, height: 18, color: "rgba(245, 245, 245, 0.4)" }} />
              <input
                value={displayName}
                onChange={(event) => setDisplayName(event.target.value)}
                placeholder="Jane Doe"
                autoFocus
                style={{
                  width: "100%",
                  border: "none",
                  background: "transparent",
                  color: "white",
                  fontSize: 17,
                  outline: "none",
                  fontWeight: 400,
                }}
              />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
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
                width: "fit-content",
                padding: "16px 28px",
                borderRadius: 14,
                border: 0,
                background: "white",
                color: "#050505",
                fontWeight: 600,
                fontSize: 16,
                cursor: busy || !displayName.trim() ? "default" : "pointer",
                opacity: busy || !displayName.trim() ? 0.6 : 1,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              {busy ? "Saving..." : isInviteFlow ? "Open summary" : "Continue to workspace"}
              {!busy && <ArrowRight style={{ width: 18, height: 18 }} />}
            </button>

            <p style={{ margin: 0, fontSize: 13, color: "rgba(245, 245, 245, 0.44)", lineHeight: 1.6, maxWidth: 440 }}>
              Your account helps keep your workspace available when you come back. You stay in control of what you keep and share.
            </p>
          </div>

          {error ? (
            <div style={{ padding: 14, borderRadius: 14, background: "rgba(220, 38, 38, 0.1)", border: "1px solid rgba(220, 38, 38, 0.2)", color: "#fca5a5", fontSize: 13 }}>
              {error}
            </div>
          ) : null}
        </div>
      </div>
    </AppShell>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "#050505" }} />}>
      <OnboardingContent />
    </Suspense>
  );
}
