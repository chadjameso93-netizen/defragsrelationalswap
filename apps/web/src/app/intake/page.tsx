"use client";

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
  "I want a clearer understanding of how I tend to react, what may help me feel steadier, and how that may affect my relationships.";

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
        .intake-shell { max-width: 1220px; margin: 0 auto; padding: 40px 22px 72px; display:grid; grid-template-columns: 1.05fr 0.95fr; gap: 22px; }
        .intake-card { border:1px solid rgba(255,255,255,0.08); background:linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015)); }
        .intake-kicker { font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:rgba(245,242,236,0.42); }
        .intake-muted { color:rgba(245,242,236,0.62); }
        .intake-title { font-size:42px; line-height:1.02; font-family:var(--font-display), serif; }
        .intake-grid { display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); gap:14px; }
        .intake-field { display:grid; gap:8px; }
        .intake-input { width:100%; border:1px solid rgba(255,255,255,0.1); background:#0a0a0a; color:#f5f2ec; padding:13px 14px; }
        .intake-textarea { min-height:140px; resize:vertical; }
        .intake-btn { border:none; background:#f5f2ec; color:#050505; padding:12px 16px; font-weight:600; }
        .intake-btn.secondary { background:transparent; color:#f5f2ec; border:1px solid rgba(255,255,255,0.1); }
        .intake-step { padding:14px; border:1px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.02); line-height:1.62; }
        @media (max-width: 980px) {
          .intake-shell { grid-template-columns: 1fr; }
          .intake-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="intake-shell">
        <section className="intake-card" style={{ padding: 22, display: "grid", gap: 18, alignContent: "start" }}>
          <div style={{ display: "grid", gap: 8 }}>
            <div className="intake-kicker">Defrag intake</div>
            <div className="intake-title">Start with your baseline</div>
            <div className="intake-muted" style={{ lineHeight: 1.7 }}>
              Enter the core details that help DEFRAG generate a first baseline view in simple language before you enter the relationship workspace.
            </div>
          </div>

          <div className="intake-grid">
            <label className="intake-field">
              <span className="intake-kicker">Name</span>
              <input className="intake-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </label>
            <label className="intake-field">
              <span className="intake-kicker">Date of birth</span>
              <input type="date" className="intake-input" value={form.dob} onChange={(e) => setForm({ ...form, dob: e.target.value })} />
            </label>
            <label className="intake-field">
              <span className="intake-kicker">Birth time</span>
              <input type="time" className="intake-input" value={form.birth_time} onChange={(e) => setForm({ ...form, birth_time: e.target.value })} />
            </label>
            <label className="intake-field">
              <span className="intake-kicker">Birth place</span>
              <input className="intake-input" value={form.birth_place} onChange={(e) => setForm({ ...form, birth_place: e.target.value })} placeholder="City, State, Country" />
            </label>
            <label className="intake-field">
              <span className="intake-kicker">Current location</span>
              <input className="intake-input" value={form.current_location} onChange={(e) => setForm({ ...form, current_location: e.target.value })} placeholder="Optional" />
            </label>
          </div>

          <label className="intake-field">
            <span className="intake-kicker">What you want help with</span>
            <textarea className="intake-input intake-textarea" value={form.context} onChange={(e) => setForm({ ...form, context: e.target.value })} />
          </label>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button className="intake-btn" onClick={generatePreview} disabled={!ready || loading}>
              {loading ? "Generating baseline..." : "Generate baseline preview"}
            </button>
            <a className="intake-btn secondary" href="/workspace/final" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center" }}>
              Go to workspace
            </a>
          </div>
        </section>

        <aside style={{ display: "grid", gap: 18, alignContent: "start" }}>
          <div className="intake-card" style={{ padding: 22, display: "grid", gap: 12 }}>
            <div className="intake-kicker">How this works</div>
            <div className="intake-step">1. Start with the key details that shape your baseline.</div>
            <div className="intake-step">2. Read the first plain-language summary of how you may react, cope, and relate.</div>
            <div className="intake-step">3. Bring that into the relationship workspace to see what may be happening with another person.</div>
          </div>

          <div className="intake-card" style={{ padding: 22, display: "grid", gap: 12 }}>
            <div className="intake-kicker">Baseline preview</div>
            {result?.ok ? (
              <>
                <div style={{ fontSize: 26, fontFamily: "var(--font-display), serif" }}>
                  {result.baselineObject?.baseline?.core_design ?? "Your baseline summary"}
                </div>
                <div className="intake-muted" style={{ lineHeight: 1.7 }}>
                  Confidence: {result.baselineObject?.meta?.confidence_level ?? "medium"}
                </div>
                <div style={{ display: "grid", gap: 10 }}>
                  {(result.baselineObject?.baseline?.practical_guidance ?? []).map((item) => (
                    <div key={item} className="intake-step">{item}</div>
                  ))}
                </div>
                {result.baselineObject?.baseline?.one_clear_next_step ? (
                  <div className="intake-step">
                    <div className="intake-kicker" style={{ marginBottom: 6 }}>One clear next step</div>
                    <div>{result.baselineObject.baseline.one_clear_next_step}</div>
                  </div>
                ) : null}
              </>
            ) : (
              <div className="intake-muted" style={{ lineHeight: 1.7 }}>
                Generate a preview to see the first baseline summary here before moving into the workspace.
              </div>
            )}
            {result?.warning ? <div className="intake-step">{result.warning}</div> : null}
          </div>
        </aside>
      </div>
    </main>
  );
}
