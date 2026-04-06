"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

const PREVIEW_ENV_ERROR =
  "Account creation is unavailable in this preview environment. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to continue.";

export default function StudioSignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    let supabase;
    try {
      supabase = createClient();
    } catch {
      setError(PREVIEW_ENV_ERROR);
      setLoading(false);
      return;
    }

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/onboarding?next=/intake`,
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    router.push("/onboarding?next=/intake");
    router.refresh();
  }

  return (
    <main style={{ minHeight: "100vh", background: "#050505", color: "#f5f2ec" }}>
      <style>{`
        .su-page { min-height: 100vh; position: relative; overflow: hidden; background: radial-gradient(920px 620px at 82% 6%, rgba(214,195,161,0.14), transparent 68%), radial-gradient(720px 560px at 14% 22%, rgba(255,255,255,0.06), transparent 70%), linear-gradient(160deg, #090909, #050505 52%, #070707); }
        .su-shell { width: min(1320px, 100%); margin: 0 auto; padding: clamp(22px, 3vw, 40px); display: grid; grid-template-columns: minmax(0,1.05fr) minmax(0,0.95fr); gap: clamp(20px, 3vw, 32px); }
        .su-panel { border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.03); }
        .su-kicker { font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(245,242,236,0.42); }
        .su-muted { color: rgba(245,242,236,0.66); }

        .su-left { padding: clamp(24px, 4vw, 44px); display: grid; gap: clamp(20px, 3vw, 34px); align-content: start; min-height: 760px; position: relative; overflow: hidden; }
        .su-left::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 22% 16%, rgba(255,255,255,0.08), transparent 28%), radial-gradient(circle at 72% 28%, rgba(214,195,161,0.16), transparent 34%), radial-gradient(circle at 66% 74%, rgba(255,255,255,0.06), transparent 30%); opacity: 0.94; }
        .su-left > * { position: relative; z-index: 1; }
        .su-title { margin: 0; font-family: var(--font-display), serif; font-size: clamp(2.45rem, 6.2vw, 5.2rem); line-height: 0.9; letter-spacing: -0.035em; max-width: 11ch; }
        .su-step { border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.035); padding: 14px; line-height: 1.7; }

        .su-form { padding: clamp(24px, 3.4vw, 40px); display: grid; gap: 14px; align-content: start; }
        .su-label { font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(245,242,236,0.48); }
        .su-input { width: 100%; border: 1px solid rgba(255,255,255,0.12); background: rgba(0,0,0,0.36); color: #f5f2ec; padding: 14px 15px; }
        .su-input:focus { outline: 1px solid rgba(214,195,161,0.38); border-color: rgba(214,195,161,0.4); }
        .su-btn { border: 1px solid rgba(255,255,255,0.08); background: #f5f2ec; color: #050505; padding: 14px 18px; font-weight: 600; cursor: pointer; }
        .su-btn:disabled { opacity: 0.65; cursor: default; }

        @media (max-width: 980px) {
          .su-shell { grid-template-columns: 1fr; }
          .su-left { min-height: auto; }
        }
      `}</style>

      <div className="su-page">
        <section className="su-shell">
          <article className="su-panel su-left">
            <div className="su-kicker">Create account</div>
            <h1 className="su-title">Create your Defrag account.</h1>
            <div className="su-muted" style={{ lineHeight: 1.8, maxWidth: 560 }}>
              Create your account, complete onboarding, and get to your first useful Defrag output quickly.
            </div>
            <div style={{ display: "grid", gap: 10 }}>
              <div className="su-step">Step 1: Create your account.</div>
              <div className="su-step">Step 2: Add your onboarding details at your own pace.</div>
              <div className="su-step">Step 3: Generate your first baseline and open workspace.</div>
            </div>
          </article>

          <form onSubmit={handleSubmit} className="su-panel su-form">
            <div style={{ display: "grid", gap: 8, marginBottom: 8 }}>
              <div className="su-kicker">Create account</div>
              <div style={{ fontFamily: "var(--font-display), serif", fontSize: 42, lineHeight: 0.94 }}>Start your studio access</div>
              <div className="su-muted" style={{ lineHeight: 1.75 }}>
                Create your credentials once, then continue into onboarding.
              </div>
            </div>

            <label style={{ display: "grid", gap: 8 }}>
              <span className="su-label">Email</span>
              <input className="su-input" value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
            </label>
            <label style={{ display: "grid", gap: 8 }}>
              <span className="su-label">Password</span>
              <input className="su-input" value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
            </label>
            <label style={{ display: "grid", gap: 8 }}>
              <span className="su-label">Confirm password</span>
              <input className="su-input" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" required />
            </label>

            {error ? <div style={{ color: "#f0a6a6", lineHeight: 1.65 }}>{error}</div> : null}

            <button type="submit" disabled={loading} className="su-btn">
              {loading ? "Creating account..." : "Create account"}
            </button>

            <div className="su-muted" style={{ lineHeight: 1.75 }}>
              Already have an account?{" "}
              <Link href="/signin/studio" style={{ color: "#f5f2ec" }}>
                Sign in
              </Link>
              .
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
