"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

const PREVIEW_ENV_ERROR =
  "Onboarding is unavailable in this preview environment. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to continue.";

type OnboardingStep = 1 | 2 | 3;

function OnboardingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next");
  const safeNextPath = nextPath && nextPath.startsWith("/") ? nextPath : "/intake";

  const [step, setStep] = useState<OnboardingStep>(1);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadedUser, setLoadedUser] = useState(false);

  const [displayName, setDisplayName] = useState("");
  const [dob, setDob] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [uncertainBirthTime, setUncertainBirthTime] = useState(false);
  const [uncertainBirthPlace, setUncertainBirthPlace] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      let supabase;
      try {
        supabase = createClient();
      } catch {
        if (mounted) {
          setError(PREVIEW_ENV_ERROR);
          setLoadedUser(true);
        }
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!mounted) return;
      if (!user) {
        router.push("/signin/studio?next=/onboarding");
        return;
      }

      setDisplayName(typeof user.user_metadata?.display_name === "string" ? user.user_metadata.display_name : "");
      setDob(typeof user.user_metadata?.dob === "string" ? user.user_metadata.dob : "");
      setBirthTime(typeof user.user_metadata?.birth_time === "string" ? user.user_metadata.birth_time : "");
      setBirthPlace(typeof user.user_metadata?.birth_place === "string" ? user.user_metadata.birth_place : "");
      setCurrentLocation(
        typeof user.user_metadata?.current_location === "string" ? user.user_metadata.current_location : "",
      );
      setUncertainBirthTime(Boolean(user.user_metadata?.uncertain_birth_time));
      setUncertainBirthPlace(Boolean(user.user_metadata?.uncertain_birth_place));
      setLoadedUser(true);
    })();

    return () => {
      mounted = false;
    };
  }, [router]);

  const progress = useMemo(() => Math.round((step / 3) * 100), [step]);
  const canContinueFromStep1 = displayName.trim().length > 1;
  const canContinueFromStep2 = dob.length > 0;
  const canSubmit = canContinueFromStep1 && canContinueFromStep2;

  async function completeOnboarding() {
    if (!canSubmit) return;
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
        router.push("/signin/studio?next=/onboarding");
        return;
      }

      const metadata = {
        ...user.user_metadata,
        display_name: displayName.trim(),
        dob,
        birth_time: uncertainBirthTime ? "" : birthTime,
        birth_place: uncertainBirthPlace ? "" : birthPlace,
        current_location: currentLocation.trim(),
        uncertain_birth_time: uncertainBirthTime,
        uncertain_birth_place: uncertainBirthPlace,
        onboarding_completed: true,
      };

      const updateResult = await supabase.auth.updateUser({ data: metadata });
      if (updateResult.error) {
        throw updateResult.error;
      }

      router.push(`${safeNextPath}${safeNextPath.includes("?") ? "&" : "?"}from=onboarding`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to complete onboarding");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main style={{ minHeight: "100vh", background: "#050505", color: "#f5f2ec" }}>
      <style>{`
        .on-page { min-height: 100vh; background: radial-gradient(880px 620px at 80% 8%, rgba(214,195,161,0.12), transparent 70%), radial-gradient(760px 520px at 10% 20%, rgba(255,255,255,0.06), transparent 72%), linear-gradient(162deg, #090909, #050505 50%, #070707); }
        .on-shell { width: min(1080px, 100%); margin: 0 auto; padding: clamp(20px, 3vw, 40px); display: grid; gap: 22px; }
        .on-kicker { font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(245,242,236,0.42); }
        .on-panel { border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.03); padding: clamp(20px, 3vw, 32px); display: grid; gap: 16px; }
        .on-title { margin: 0; font-family: var(--font-display), serif; font-size: clamp(2rem, 4vw, 3.2rem); line-height: 0.92; letter-spacing: -0.03em; }
        .on-muted { color: rgba(245,242,236,0.66); line-height: 1.72; }
        .on-label { font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(245,242,236,0.5); }
        .on-input { width: 100%; border: 1px solid rgba(255,255,255,0.12); background: rgba(0,0,0,0.36); color: #f5f2ec; padding: 13px 14px; }
        .on-row { display: grid; gap: 10px; }
        .on-grid { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 12px; }
        .on-btn { border: 1px solid rgba(255,255,255,0.1); background: #f5f2ec; color: #050505; padding: 13px 18px; font-weight: 600; }
        .on-btn.secondary { background: rgba(255,255,255,0.03); color: #f5f2ec; }
        .on-progress { height: 8px; background: rgba(255,255,255,0.08); overflow: hidden; }
        .on-progress > div { height: 100%; background: linear-gradient(90deg, #f5f2ec, #d6c3a1); transition: width 0.2s ease; }
        @media (max-width: 760px) { .on-grid { grid-template-columns: 1fr; } }
      `}</style>

      <div className="on-page">
        <div className="on-shell">
          <div style={{ display: "grid", gap: 8 }}>
            <div className="on-kicker">Onboarding</div>
            <div className="on-progress">
              <div style={{ width: `${progress}%` }} />
            </div>
            <div className="on-muted" style={{ fontSize: 13 }}>Step {step} of 3</div>
          </div>

          <section className="on-panel">
            {!loadedUser ? (
              <div className="on-muted">Loading your onboarding profile...</div>
            ) : null}

            {step === 1 ? (
              <>
                <h1 className="on-title">Let’s set up your profile.</h1>
                <p className="on-muted">Start with your name so your sessions stay personal and easy to revisit.</p>
                <label className="on-row">
                  <span className="on-label">Your name</span>
                  <input className="on-input" value={displayName} onChange={(event) => setDisplayName(event.target.value)} placeholder="Jane Doe" />
                </label>
              </>
            ) : null}

            {step === 2 ? (
              <>
                <h1 className="on-title">Add your natal timing details.</h1>
                <p className="on-muted">
                  This helps Defrag understand timing, pressure, pacing, and perspective.
                </p>
                <div className="on-grid">
                  <label className="on-row">
                    <span className="on-label">Date of birth</span>
                    <input type="date" className="on-input" value={dob} onChange={(event) => setDob(event.target.value)} />
                    <span className="on-muted" style={{ fontSize: 13 }}>Used as the baseline anchor for timing patterns.</span>
                  </label>
                  <label className="on-row">
                    <span className="on-label">Birth time</span>
                    <input type="time" className="on-input" value={birthTime} onChange={(event) => setBirthTime(event.target.value)} disabled={uncertainBirthTime} />
                    <span className="on-muted" style={{ fontSize: 13 }}>Improves pacing and timing precision when known.</span>
                  </label>
                  <label className="on-row" style={{ gridColumn: "1 / -1" }}>
                    <span className="on-label">Birth location</span>
                    <input className="on-input" value={birthPlace} onChange={(event) => setBirthPlace(event.target.value)} placeholder="City, State, Country" disabled={uncertainBirthPlace} />
                    <span className="on-muted" style={{ fontSize: 13 }}>Helps anchor perspective and context around your baseline.</span>
                  </label>
                  <label className="on-row" style={{ gridColumn: "1 / -1" }}>
                    <span className="on-label">Current location (optional)</span>
                    <input className="on-input" value={currentLocation} onChange={(event) => setCurrentLocation(event.target.value)} placeholder="City, State, Country" />
                    <span className="on-muted" style={{ fontSize: 13 }}>Used for present-day context and can be updated later.</span>
                  </label>
                </div>
                <div style={{ display: "grid", gap: 8 }}>
                  <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <input type="checkbox" checked={uncertainBirthTime} onChange={(event) => setUncertainBirthTime(event.target.checked)} />
                    <span className="on-muted" style={{ fontSize: 14 }}>I’m not sure of my birth time yet.</span>
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <input type="checkbox" checked={uncertainBirthPlace} onChange={(event) => setUncertainBirthPlace(event.target.checked)} />
                    <span className="on-muted" style={{ fontSize: 14 }}>I’m not sure of my birth location yet.</span>
                  </label>
                </div>
              </>
            ) : null}

            {step === 3 ? (
              <>
                <h1 className="on-title">You’re ready for your first output.</h1>
                <p className="on-muted">
                  We’ll save your onboarding details and take you to baseline intake so you can generate your first useful read right away.
                </p>
                <div style={{ display: "grid", gap: 8 }}>
                  <div className="on-muted"><strong>Name:</strong> {displayName || "Not set"}</div>
                  <div className="on-muted"><strong>Date of birth:</strong> {dob || "Not set"}</div>
                  <div className="on-muted"><strong>Birth time:</strong> {uncertainBirthTime ? "Not sure yet" : birthTime || "Not set"}</div>
                  <div className="on-muted"><strong>Birth place:</strong> {uncertainBirthPlace ? "Not sure yet" : birthPlace || "Not set"}</div>
                </div>
              </>
            ) : null}

            {error ? (
              <div style={{ padding: 12, border: "1px solid rgba(240,166,166,0.4)", background: "rgba(240,166,166,0.1)", color: "#f0a6a6", lineHeight: 1.6 }}>
                {error}
              </div>
            ) : null}

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {step > 1 ? (
                <button type="button" className="on-btn secondary" onClick={() => setStep((value) => (value - 1) as OnboardingStep)} disabled={busy}>
                  Back
                </button>
              ) : null}
              {step < 3 ? (
                <button
                  type="button"
                  className="on-btn"
                  onClick={() => setStep((value) => (value + 1) as OnboardingStep)}
                  disabled={(step === 1 && !canContinueFromStep1) || (step === 2 && !canContinueFromStep2)}
                >
                  Continue
                </button>
              ) : (
                <button type="button" className="on-btn" onClick={completeOnboarding} disabled={busy || !canSubmit}>
                  {busy ? "Saving..." : "Save and continue to baseline"}
                </button>
              )}
            </div>
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
