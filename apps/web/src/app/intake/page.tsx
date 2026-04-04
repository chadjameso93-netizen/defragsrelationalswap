'use client';

import { useMemo, useState } from 'react';

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
  'I want a clearer understanding of how I tend to react, what helps me feel steadier, and how that may affect my relationships.';

export default function IntakePage() {
  const [form, setForm] = useState({
    name: '',
    dob: '',
    birth_time: '',
    birth_place: '',
    current_location: '',
    context: DEFAULT_CONTEXT,
  });
  const [result, setResult] = useState<BaselineApiResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const ready = useMemo(() => !!form.dob, [form.dob]);

  async function generatePreview() {
    setLoading(true);
    try {
      const res = await fetch('/api/test-baseline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as BaselineApiResponse;
      setResult(data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ minHeight: '100vh', background: '#040404', color: '#f5f2ec' }}>
      <style>{`
        .intake-shell { max-width: 1360px; margin: 0 auto; padding: 30px 22px 90px; display: grid; gap: 24px; }
        .intake-topbar { display: flex; align-items: center; justify-content: space-between; gap: 14px; padding: 14px 16px; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.02); backdrop-filter: blur(10px); }
        .intake-brand { display: flex; align-items: center; gap: 12px; }
        .intake-mark { width: 36px; height: 36px; border-radius: 999px; border: 1px solid rgba(214,195,161,0.24); display: grid; place-items: center; background: radial-gradient(circle at center, rgba(214,195,161,0.2), rgba(255,255,255,0.03)); box-shadow: 0 0 30px rgba(214,195,161,0.08); }
        .intake-mark::after { content: ''; width: 16px; height: 16px; border-radius: 999px; background: rgba(245,242,236,0.82); box-shadow: 0 0 18px rgba(245,242,236,0.2); }
        .intake-nav { display: flex; gap: 10px; flex-wrap: wrap; }
        .intake-link { display: inline-flex; align-items: center; justify-content: center; text-decoration: none; padding: 9px 11px; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.02); color: #f5f2ec; font-size: 12px; }
        .intake-grid { display: grid; grid-template-columns: 1.02fr 0.98fr; gap: 22px; }
        .intake-card { border: 1px solid rgba(255,255,255,0.08); background: linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.015)); box-shadow: 0 16px 40px rgba(0,0,0,0.18); }
        .intake-copy { padding: 28px; display: grid; gap: 18px; align-content: start; }
        .intake-kicker { font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(245,242,236,0.42); }
        .intake-muted { color: rgba(245,242,236,0.64); }
        .intake-title { margin: 0; font-size: 64px; line-height: 0.92; letter-spacing: -0.04em; font-family: var(--font-display), serif; }
        .intake-stage { position: relative; overflow: hidden; min-height: 620px; }
        .intake-stage::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 22% 18%, rgba(255,255,255,0.06), transparent 24%), radial-gradient(circle at 72% 22%, rgba(214,195,161,0.10), transparent 28%), radial-gradient(circle at 66% 76%, rgba(255,255,255,0.04), transparent 24%); }
        .intake-stage::after { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px); background-size: 34px 34px; opacity: 0.12; }
        .intake-stage > * { position: relative; z-index: 1; }
        .intake-formgrid { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 14px; }
        .intake-field { display: grid; gap: 8px; }
        .intake-input { width: 100%; border: 1px solid rgba(255,255,255,0.1); background: #0a0a0a; color: #f5f2ec; padding: 13px 14px; }
        .intake-textarea { min-height: 140px; resize: vertical; }
        .intake-btnrow { display: flex; gap: 10px; flex-wrap: wrap; }
        .intake-btn { display: inline-flex; align-items: center; justify-content: center; text-decoration: none; border: none; background: #f5f2ec; color: #050505; padding: 13px 16px; font-weight: 600; }
        .intake-btn.secondary { background: transparent; color: #f5f2ec; border: 1px solid rgba(255,255,255,0.1); }
        .intake-stepgrid { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 10px; }
        .intake-step { padding: 14px 16px; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.03); line-height: 1.66; }
        .intake-preview { display: grid; gap: 16px; align-content: start; }
        .intake-orb { position: absolute; border-radius: 999px; filter: blur(34px); opacity: 0.35; animation: intakeDrift 10s ease-in-out infinite; }
        .intake-orb.a { width: 250px; height: 250px; left: -40px; top: 34px; background: rgba(214,195,161,0.16); }
        .intake-orb.b { width: 180px; height: 180px; right: 30px; top: 120px; background: rgba(255,255,255,0.12); animation-delay: -4s; }
        .intake-previewbox { padding: 24px; display: grid; gap: 14px; }
        @keyframes intakeDrift { 0%, 100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(16px,-12px,0); } }
        @media (max-width: 1120px) {
          .intake-grid, .intake-stepgrid { grid-template-columns: 1fr; }
          .intake-title { font-size: 48px; }
          .intake-stage { min-height: auto; }
        }
        @media (max-width: 760px) {
          .intake-formgrid { grid-template-columns: 1fr; }
          .intake-title { font-size: 40px; }
          .intake-topbar { align-items: flex-start; flex-direction: column; }
        }
      `}</style>

      <div className='intake-shell'>
        <header className='intake-topbar'>
          <div className='intake-brand'>
            <div className='intake-mark' />
            <div style={{ display: 'grid', gap: 4 }}>
              <div className='intake-kicker'>Defrag</div>
              <div>Baseline intake</div>
            </div>
          </div>
          <nav className='intake-nav'>
            <a className='intake-link' href='/studio'>Home</a>
            <a className='intake-link' href='/workspace'>Workspace</a>
            <a className='intake-link' href='/billing'>Billing</a>
          </nav>
        </header>

        <section className='intake-grid'>
          <section className='intake-card intake-copy'>
            <div className='intake-kicker'>Begin here</div>
            <h1 className='intake-title'>Start with the details that shape your baseline.</h1>
            <div className='intake-muted' style={{ fontSize: 18, lineHeight: 1.78 }}>
              DEFRAG turns the basics of your profile into simple language you can actually use.
            </div>
            <div className='intake-muted' style={{ lineHeight: 1.78 }}>
              Fill in the core details below, generate a preview, and then carry that into the relationship workspace.
            </div>

            <div className='intake-formgrid'>
              <label className='intake-field'>
                <span className='intake-kicker'>Name</span>
                <input className='intake-input' value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder='Optional' />
              </label>
              <label className='intake-field'>
                <span className='intake-kicker'>Date of birth</span>
                <input type='date' className='intake-input' value={form.dob} onChange={(e) => setForm({ ...form, dob: e.target.value })} />
              </label>
              <label className='intake-field'>
                <span className='intake-kicker'>Birth time</span>
                <input type='time' className='intake-input' value={form.birth_time} onChange={(e) => setForm({ ...form, birth_time: e.target.value })} />
              </label>
              <label className='intake-field'>
                <span className='intake-kicker'>Birth place</span>
                <input className='intake-input' value={form.birth_place} onChange={(e) => setForm({ ...form, birth_place: e.target.value })} placeholder='City, State, Country' />
              </label>
              <label className='intake-field'>
                <span className='intake-kicker'>Current location</span>
                <input className='intake-input' value={form.current_location} onChange={(e) => setForm({ ...form, current_location: e.target.value })} placeholder='Optional' />
              </label>
            </div>

            <label className='intake-field'>
              <span className='intake-kicker'>What you want help with</span>
              <textarea className='intake-input intake-textarea' value={form.context} onChange={(e) => setForm({ ...form, context: e.target.value })} />
            </label>

            <div className='intake-btnrow'>
              <button className='intake-btn' onClick={generatePreview} disabled={!ready || loading}>
                {loading ? 'Generating preview...' : 'Generate preview'}
              </button>
              <a className='intake-btn secondary' href='/workspace'>Open workspace</a>
            </div>
          </section>

          <aside className='intake-card intake-stage'>
            <div className='intake-orb a' />
            <div className='intake-orb b' />
            <div className='intake-previewbox'>
              <div className='intake-kicker'>What you will get</div>
              <div className='intake-stepgrid'>
                <div className='intake-step'>A first read on how you may react and relate.</div>
                <div className='intake-step'>A simple summary you can carry into the workspace.</div>
                <div className='intake-step'>One clear next step to start with.</div>
              </div>
            </div>

            <div className='intake-previewbox intake-preview'>
              <div className='intake-kicker'>Preview</div>
              {result?.ok ? (
                <>
                  <div style={{ fontSize: 34, lineHeight: 1.04, fontFamily: 'var(--font-display), serif' }}>
                    {result.baselineObject?.baseline?.core_design ?? 'Your baseline summary'}
                  </div>
                  <div className='intake-muted' style={{ lineHeight: 1.74 }}>
                    Confidence: {result.baselineObject?.meta?.confidence_level ?? 'medium'}
                  </div>
                  <div style={{ display: 'grid', gap: 10 }}>
                    {(result.baselineObject?.baseline?.practical_guidance ?? []).map((item) => (
                      <div key={item} className='intake-step'>{item}</div>
                    ))}
                  </div>
                  {result.baselineObject?.baseline?.one_clear_next_step ? (
                    <div className='intake-step'>
                      <div className='intake-kicker' style={{ marginBottom: 6 }}>One clear next step</div>
                      <div>{result.baselineObject.baseline.one_clear_next_step}</div>
                    </div>
                  ) : null}
                </>
              ) : (
                <div className='intake-muted' style={{ lineHeight: 1.74 }}>
                  Generate a preview to see your first plain-language baseline here before moving into the workspace.
                </div>
              )}
              {result?.warning ? <div className='intake-step'>{result.warning}</div> : null}
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
