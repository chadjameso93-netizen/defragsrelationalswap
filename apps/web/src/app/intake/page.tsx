"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect } from "react";
import { useMemo, useState } from "react";

type BaselineApiResponse = {
  ok: boolean;
  inputObject: {
    name?: string;
    dob?: string;
    birth_time?: string;
    birth_place?: string;
    current_location?: string;
    context?: string;
  };
  baselineObject?: {
    baseline?: {
      core_design?: string;
      practical_guidance?: string[];
      one_clear_next_step?: string;
    };
    meta?: {
      confidence_level?: string;
    };
  };
  warning?: string;
};

const DEFAULT_CONTEXT =
  "I want a clearer understanding of how I tend to react, what helps me feel steadier, and how that may affect my relationships.";

export default function IntakePage() {
  const [form, setForm] = useState({
    name: "",
    dob: "",
    birth_time: "",
    birth_place: "",
    current_location: "",
    context: DEFAULT_CONTEXT,
  });
  const [result, setResult] = useState<BaselineApiResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const ready = useMemo(() => !!form.dob, [form.dob]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      let supabase;
      try {
        supabase = createClient();
      } catch {
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!mounted || !user) return;

      setForm((prev) => ({
        ...prev,
        name: typeof user.user_metadata?.display_name === "string" ? user.user_metadata.display_name : prev.name,
        dob: typeof user.user_metadata?.dob === "string" ? user.user_metadata.dob : prev.dob,
        birth_time:
          typeof user.user_metadata?.birth_time === "string" ? user.user_metadata.birth_time : prev.birth_time,
        birth_place:
          typeof user.user_metadata?.birth_place === "string" ? user.user_metadata.birth_place : prev.birth_place,
        current_location:
          typeof user.user_metadata?.current_location === "string"
            ? user.user_metadata.current_location
            : prev.current_location,
      }));
    })();
    return () => {
      mounted = false;
    };
  }, []);

  async function generatePreview() {
    setLoading(true);
    try {
      const res = await fetch("/api/test-baseline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as BaselineApiResponse;
      setResult(data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ minHeight: "100vh", background: "#050505", color: "#f5f2ec" }}>
      <style>{`
        .in-page { min-height: 100vh; background: radial-gradient(940px 620px at 82% 6%, rgba(214,195,161,0.13), transparent 68%), radial-gradient(780px 560px at 10% 24%, rgba(255,255,255,0.06), transparent 72%), linear-gradient(160deg, #090909, #050505 52%, #080808); }
        .in-shell { width: min(1480px, 100%); margin: 0 auto; padding: clamp(24px, 3.2vw, 44px) clamp(18px, 3vw, 42px) 90px; display: grid; gap: clamp(26px, 4vw, 40px); }
        .in-kicker { font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(245,242,236,0.42); }
        .in-muted { color: rgba(245,242,236,0.68); }

        .in-top { display: flex; justify-content: space-between; gap: 14px; align-items: flex-start; }
        .in-nav { display: flex; gap: 10px; flex-wrap: wrap; }
        .in-link { text-decoration: none; color: #f5f2ec; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; padding: 10px 0; border-bottom: 1px solid rgba(245,242,236,0.22); opacity: 0.8; }

        .in-grid { display: grid; grid-template-columns: minmax(0,1.02fr) minmax(0,0.98fr); gap: 22px; }
        .in-panel { border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.03); }

        .in-left { padding: clamp(22px, 3.2vw, 40px); display: grid; gap: 16px; align-content: start; }
        .in-title { margin: 0; font-family: var(--font-display), serif; font-size: clamp(2.35rem, 5.6vw, 5.3rem); line-height: 0.9; letter-spacing: -0.036em; max-width: 11ch; }
        .in-stepbar { display: flex; gap: 8px; flex-wrap: wrap; }
        .in-chip { padding: 8px 10px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.03); font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(245,242,236,0.62); }

        .in-formgrid { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 12px; }
        .in-field { display: grid; gap: 8px; }
        .in-label { font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(245,242,236,0.48); }
        .in-input { width: 100%; border: 1px solid rgba(255,255,255,0.12); background: rgba(0,0,0,0.36); color: #f5f2ec; padding: 13px 14px; }
        .in-input:focus { outline: 1px solid rgba(214,195,161,0.38); border-color: rgba(214,195,161,0.4); }
        .in-textarea { min-height: 150px; resize: vertical; }

        .in-cta { display: flex; gap: 10px; flex-wrap: wrap; }
        .in-btn { border: 1px solid rgba(255,255,255,0.08); background: #f5f2ec; color: #050505; padding: 13px 16px; font-weight: 600; cursor: pointer; }
        .in-btn:disabled { opacity: 0.65; cursor: default; }
        .in-btn.secondary { background: rgba(255,255,255,0.03); color: #f5f2ec; border-color: rgba(255,255,255,0.12); text-decoration: none; display: inline-flex; align-items: center; }

        .in-right { padding: clamp(22px, 3.2vw, 36px); display: grid; gap: 14px; align-content: start; position: relative; overflow: hidden; }
        .in-right::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08), transparent 30%), radial-gradient(circle at 72% 20%, rgba(214,195,161,0.14), transparent 36%), radial-gradient(circle at 72% 74%, rgba(255,255,255,0.06), transparent 30%); }
        .in-right > * { position: relative; z-index: 1; }
        .in-stepgrid { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 10px; }
        .in-card { border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.035); padding: 14px; line-height: 1.66; }

        @media (max-width: 1120px) {
          .in-grid, .in-stepgrid { grid-template-columns: 1fr; }
        }
        @media (max-width: 760px) {
          .in-top { flex-direction: column; }
          .in-formgrid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="in-page">
        <div className="in-shell">
          <header className="in-top">
            <div style={{ display: "grid", gap: 5 }}>
              <div className="in-kicker">Defrag intake</div>
              <div>Personal baseline setup</div>
            </div>
            <nav className="in-nav">
              <a className="in-link" href="/studio">
                Studio
              </a>
              <a className="in-link" href="/workspace">
                Workspace
              </a>
              <a className="in-link" href="/billing/studio">
                Plans
              </a>
            </nav>
          </header>

          <section className="in-grid">
            <section className="in-panel in-left">
              <div className="in-kicker">Guided baseline sequence</div>
              <h1 className="in-title">Create your baseline in one calm pass.</h1>
              <div className="in-stepbar">
                <span className="in-chip">Step 1 · core birth details</span>
                <span className="in-chip">Step 2 · context note</span>
                <span className="in-chip">Step 3 · preview + next step</span>
              </div>
              <p className="in-muted" style={{ margin: 0, lineHeight: 1.8, maxWidth: 650 }}>
                You only need your date of birth to begin. Add more details when available for a fuller baseline read.
              </p>

              <div className="in-formgrid">
                <label className="in-field">
                  <span className="in-label">Name</span>
                  <input className="in-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Optional" />
                </label>
                <label className="in-field">
                  <span className="in-label">Date of birth</span>
                  <input type="date" className="in-input" value={form.dob} onChange={(e) => setForm({ ...form, dob: e.target.value })} />
                  <span className="in-muted" style={{ fontSize: 13 }}>Used to anchor timing and pacing in your baseline.</span>
                </label>
                <label className="in-field">
                  <span className="in-label">Birth time</span>
                  <input type="time" className="in-input" value={form.birth_time} onChange={(e) => setForm({ ...form, birth_time: e.target.value })} />
                  <span className="in-muted" style={{ fontSize: 13 }}>Optional if unknown. Adds precision when available.</span>
                </label>
                <label className="in-field">
                  <span className="in-label">Birth place</span>
                  <input
                    className="in-input"
                    value={form.birth_place}
                    onChange={(e) => setForm({ ...form, birth_place: e.target.value })}
                    placeholder="City, State, Country"
                  />
                  <span className="in-muted" style={{ fontSize: 13 }}>Used to ground perspective context.</span>
                </label>
                <label className="in-field" style={{ gridColumn: "1 / -1" }}>
                  <span className="in-label">Current location</span>
                  <input
                    className="in-input"
                    value={form.current_location}
                    onChange={(e) => setForm({ ...form, current_location: e.target.value })}
                    placeholder="Optional"
                  />
                  <span className="in-muted" style={{ fontSize: 13 }}>Optional and editable later.</span>
                </label>
              </div>

              <label className="in-field">
                <span className="in-label">Relationship context</span>
                <textarea className="in-input in-textarea" value={form.context} onChange={(e) => setForm({ ...form, context: e.target.value })} />
              </label>

              <div className="in-cta">
                <button className="in-btn" onClick={generatePreview} disabled={!ready || loading}>
                  {loading ? "Creating preview..." : "Create baseline preview"}
                </button>
                <a className="in-btn secondary" href="/workspace">
                  Continue to workspace
                </a>
              </div>
            </section>

            <aside className="in-panel in-right">
              <div className="in-kicker">What you receive</div>
              <div className="in-stepgrid">
                <div className="in-card">A plain-language read of your core pattern.</div>
                <div className="in-card">A concise baseline summary for workspace use.</div>
                <div className="in-card">One steady next step you can use quickly.</div>
              </div>

              <div className="in-kicker" style={{ marginTop: 4 }}>
                Preview
              </div>
              {result?.ok ? (
                <>
                  <div style={{ fontSize: 34, lineHeight: 1.02, fontFamily: "var(--font-display), serif" }}>
                    {result.baselineObject?.baseline?.core_design ?? "Your baseline summary"}
                  </div>
                  <div className="in-muted" style={{ lineHeight: 1.72 }}>
                    Confidence: {result.baselineObject?.meta?.confidence_level ?? "medium"}
                  </div>
                  <div style={{ display: "grid", gap: 10 }}>
                    {(result.baselineObject?.baseline?.practical_guidance ?? []).map((item) => (
                      <div key={item} className="in-card">
                        {item}
                      </div>
                    ))}
                  </div>
                  {result.baselineObject?.baseline?.one_clear_next_step ? (
                    <div className="in-card">
                      <div className="in-kicker" style={{ marginBottom: 6 }}>
                        One clear next step
                      </div>
                      {result.baselineObject.baseline.one_clear_next_step}
                    </div>
                  ) : null}
                </>
              ) : (
                <div className="in-muted" style={{ lineHeight: 1.76 }}>
                  Generate a preview to see your baseline before entering workspace interpretation.
                </div>
              )}
              {result?.warning ? <div className="in-card">{result.warning}</div> : null}
            </aside>
          </section>
        </div>
      </div>
    </main>
  );
}
