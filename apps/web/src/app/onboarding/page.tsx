"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

const PREVIEW_ENV_ERROR =
  "Onboarding is unavailable in this preview environment. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to continue.";

function OnboardingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [displayName, setDisplayName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const nextPath = searchParams.get("next");
  const isInviteFlow = nextPath?.includes("/share/");

  const eyebrow = isInviteFlow ? "Almost there" : "Welcome";
  const title = isInviteFlow ? "Finish setup and open the shared summary." : "Finish setup and enter your workspace.";
  const description = isInviteFlow
    ? "Add your name so we can complete your account setup before opening the summary."
    : "Add your name once so your workspace stays ready when you come back.";

  return (
    <main style={{ minHeight: "100vh", background: "#050505", color: "#f5f2ec" }}>
      <style>{`
        .on-page { min-height: 100vh; background: radial-gradient(880px 620px at 80% 8%, rgba(214,195,161,0.12), transparent 70%), radial-gradient(760px 520px at 10% 20%, rgba(255,255,255,0.06), transparent 72%), linear-gradient(162deg, #090909, #050505 50%, #070707); }
        .on-shell { width: min(1180px, 100%); margin: 0 auto; padding: clamp(24px, 3.5vw, 46px); display: grid; gap: 22px; }
        .on-kicker { font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(245,242,236,0.42); }
        .on-muted { color: rgba(245,242,236,0.66); }
        .on-grid { display: grid; grid-template-columns: minmax(0,1.02fr) minmax(0,0.98fr); gap: 22px; }
        .on-panel { border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.03); }
        .on-left { padding: clamp(24px, 4vw, 44px); display: grid; gap: clamp(18px, 3vw, 30px); align-content: start; min-height: 640px; }
        .on-title { margin: 0; font-family: var(--font-display), serif; font-size: clamp(2.35rem, 5.6vw, 4.6rem); line-height: 0.92; letter-spacing: -0.032em; max-width: 12ch; }
        .on-stage { border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.035); padding: 16px; line-height: 1.72; }

        .on-right { padding: clamp(24px, 3.4vw, 40px); display: grid; gap: 14px; align-content: start; }
        .on-label { font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(245,242,236,0.48); }
        .on-input { width: 100%; border: 1px solid rgba(255,255,255,0.12); background: rgba(0,0,0,0.36); color: #f5f2ec; padding: 14px 15px; }
        .on-input:focus { outline: 1px solid rgba(214,195,161,0.38); border-color: rgba(214,195,161,0.4); }
        .on-btn { width: fit-content; border: 1px solid rgba(255,255,255,0.08); background: #f5f2ec; color: #050505; padding: 14px 22px; font-weight: 600; cursor: pointer; }
        .on-btn:disabled { opacity: 0.65; cursor: default; }

        @media (max-width: 920px) {
          .on-grid { grid-template-columns: 1fr; }
          .on-left { min-height: auto; }
        }
      `}</style>

      <div className="on-page">
        <div className="on-shell">
          <div className="on-kicker">{eyebrow}</div>
          <section className="on-grid">
            <article className="on-panel on-left">
              <h1 className="on-title">{title}</h1>
              <p className="on-muted" style={{ margin: 0, lineHeight: 1.82, maxWidth: 540 }}>
                {description}
              </p>
              <div style={{ display: "grid", gap: 10 }}>
                <div className="on-stage">This setup takes one step and keeps your account ready across baseline, workspace, and follow-up sessions.</div>
                <div className="on-stage">Your name helps keep your workspace personal and easier to navigate when you return.</div>
                <div className="on-stage">You stay in control of what you keep, share, and revisit later.</div>
              </div>
            </article>

            <section className="on-panel on-right">
              <div style={{ display: "grid", gap: 8 }}>
                <div className="on-kicker">Account setup</div>
                <div style={{ fontFamily: "var(--font-display), serif", fontSize: 40, lineHeight: 0.94 }}>Add your name</div>
              </div>

              <label style={{ display: "grid", gap: 8 }}>
                <span className="on-label">Your full name</span>
                <input
                  value={displayName}
                  onChange={(event) => setDisplayName(event.target.value)}
                  placeholder="Jane Doe"
                  autoFocus
                  className="on-input"
                />
              </label>

              <button
                type="button"
                onClick={async () => {
                  setBusy(true);
                  setError(null);

                  let supabase;
                  try {
                    supabase = createClient();
                  } catch {
                    setError(PREVIEW_ENV_ERROR);
                    setBusy(false);
                    return;
                  }

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
                className="on-btn"
              >
                {busy ? "Saving..." : isInviteFlow ? "Open summary" : "Continue to workspace"}
              </button>

              <p className="on-muted" style={{ margin: 0, fontSize: 14, lineHeight: 1.72, maxWidth: 520 }}>
                This keeps your workspace stable so you can return without repeating setup.
              </p>

              {error ? (
                <div style={{ padding: 12, border: "1px solid rgba(240,166,166,0.4)", background: "rgba(240,166,166,0.1)", color: "#f0a6a6", lineHeight: 1.6 }}>
                  {error}
                </div>
              ) : null}
            </section>
          </section>
        </div>
      </div>
    </main>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "#050505" }} />}>
      <OnboardingContent />
    </Suspense>
  );
}
