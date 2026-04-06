"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

const PREVIEW_ENV_ERROR =
  "Sign in is unavailable in this preview environment. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to continue.";

export default function StudioSignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    let supabase;
    try {
      supabase = createClient();
    } catch {
      setError(PREVIEW_ENV_ERROR);
      setLoading(false);
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    router.push("/account");
    router.refresh();
  }

  return (
    <main style={{ minHeight: "100vh", background: "#050505", color: "#f5f2ec" }}>
      <style>{`
        .si-page { min-height: 100vh; position: relative; overflow: hidden; background: radial-gradient(900px 620px at 80% 4%, rgba(214,195,161,0.12), transparent 70%), radial-gradient(800px 520px at 12% 18%, rgba(255,255,255,0.07), transparent 72%), linear-gradient(160deg, #090909, #050505 48%, #080808); }
        .si-shell { width: min(1320px, 100%); margin: 0 auto; padding: clamp(22px, 3vw, 40px); display: grid; grid-template-columns: minmax(0,1.06fr) minmax(0,0.94fr); gap: clamp(20px, 3vw, 32px); }
        .si-panel { border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.03); }
        .si-kicker { font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(245,242,236,0.42); }
        .si-muted { color: rgba(245,242,236,0.68); }

        .si-left { padding: clamp(24px, 4vw, 44px); display: grid; gap: clamp(20px, 3vw, 34px); align-content: start; min-height: 760px; position: relative; overflow: hidden; }
        .si-left::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 16% 18%, rgba(255,255,255,0.08), transparent 30%), radial-gradient(circle at 72% 22%, rgba(214,195,161,0.14), transparent 34%), radial-gradient(circle at 66% 74%, rgba(255,255,255,0.06), transparent 28%); opacity: 0.9; }
        .si-left > * { position: relative; z-index: 1; }
        .si-title { margin: 0; font-family: var(--font-display), serif; font-size: clamp(2.5rem, 6.4vw, 5.4rem); line-height: 0.9; letter-spacing: -0.036em; max-width: 11ch; }

        .si-field { border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.032); padding: 14px; line-height: 1.7; }
        .si-nodewrap { display: flex; justify-content: center; padding-top: 8px; }
        .si-node { width: 170px; height: 170px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.16); background: radial-gradient(circle at center, rgba(255,255,255,0.1), rgba(255,255,255,0.016)); display: grid; place-items: center; text-align: center; box-shadow: 0 0 54px rgba(214,195,161,0.1); }

        .si-form { padding: clamp(24px, 3.4vw, 40px); display: grid; gap: 14px; align-content: start; }
        .si-label { font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(245,242,236,0.48); }
        .si-input { width: 100%; border: 1px solid rgba(255,255,255,0.12); background: rgba(0,0,0,0.36); color: #f5f2ec; padding: 14px 15px; }
        .si-input:focus { outline: 1px solid rgba(214,195,161,0.38); border-color: rgba(214,195,161,0.4); }
        .si-btn { border: 1px solid rgba(255,255,255,0.08); background: #f5f2ec; color: #050505; padding: 14px 18px; font-weight: 600; cursor: pointer; }
        .si-btn:disabled { opacity: 0.65; cursor: default; }
        .si-legal { color: rgba(245,242,236,0.58); line-height: 1.7; font-size: 14px; }

        @media (max-width: 980px) {
          .si-shell { grid-template-columns: 1fr; }
          .si-left { min-height: auto; }
        }
      `}</style>

      <div className="si-page">
        <section className="si-shell">
          <article className="si-panel si-left">
            <div className="si-kicker">Sign in</div>
            <h1 className="si-title">Return to Defrag.</h1>
            <div className="si-muted" style={{ lineHeight: 1.8, maxWidth: 560 }}>
              Sign in to pick up your last conversation read, open your workspace, and keep your progress in one place.
            </div>

            <div style={{ display: "grid", gap: 10 }}>
              <div className="si-field">Review what happened and where the conversation turned.</div>
              <div className="si-field">Compare perspectives before you send your next message.</div>
              <div className="si-field">Choose one grounded next step and keep moving.</div>
            </div>

            <div className="si-nodewrap">
              <div className="si-node">
                <div>
                  <div className="si-kicker" style={{ fontSize: 10 }}>
                    Defrag
                  </div>
                  <div style={{ fontFamily: "var(--font-display), serif", fontSize: 32 }}>Studio</div>
                  <div className="si-muted" style={{ fontSize: 13 }}>
                    calm clarity
                  </div>
                </div>
              </div>
            </div>
          </article>

          <form onSubmit={handleSubmit} className="si-panel si-form">
            <div style={{ display: "grid", gap: 8, marginBottom: 8 }}>
              <div className="si-kicker">Sign in</div>
              <div style={{ fontFamily: "var(--font-display), serif", fontSize: 42, lineHeight: 0.94 }}>Continue into your workspace</div>
              <div className="si-muted" style={{ lineHeight: 1.75 }}>
                Use your Defrag account to continue safely where you left off.
              </div>
            </div>

            <label style={{ display: "grid", gap: 8 }}>
              <span className="si-label">Email</span>
              <input className="si-input" value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
            </label>
            <label style={{ display: "grid", gap: 8 }}>
              <span className="si-label">Password</span>
              <input className="si-input" value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
            </label>

            {error ? <div style={{ color: "#f0a6a6", lineHeight: 1.65 }}>{error}</div> : null}

            <button type="submit" disabled={loading} className="si-btn">
              {loading ? "Signing in..." : "Open workspace"}
            </button>

            <div className="si-legal">
              <Link href="/forgot-password" style={{ color: "#f5f2ec" }}>
                Forgot password?
              </Link>
            </div>

            <div className="si-legal">
              New here?{" "}
              <Link href="/signup/studio" style={{ color: "#f5f2ec" }}>
                Create your account
              </Link>
              .
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
