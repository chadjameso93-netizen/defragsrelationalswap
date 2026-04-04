"use client";

import { useEffect, useMemo, useState } from 'react';

type SessionResponse = {
  workspace: {
    assistant_message: {
      title: string;
      body: string;
      next_steps: string[];
    };
    field_update: {
      thread: {
        id: string;
        title: string;
        summary: string;
      };
      participants: Array<{
        id: string;
        name: string;
        role?: string;
        current_state: {
          state_label: string;
          expression: string;
          openness: number;
          steadiness: number;
        };
      }>;
      field_state: {
        overall_state: string;
        dominant_pattern: string;
        readiness_for_repair: number;
      };
      branch_suggestions: Array<{
        id: string;
        label: string;
        type: string;
      }>;
      visual_state: {
        nodes: Array<{
          id: string;
          label: string;
          role?: string;
          x: number;
          y: number;
          size: number;
          state: string;
          pulse: number;
        }>;
      };
    };
  };
  branch: {
    title: string;
    body: string;
    suggestions: string[];
  };
  overlay: {
    title: string;
    body: string;
    cards: Array<{
      label: string;
      value: string;
    }>;
  };
};

const INITIAL_MESSAGE = 'I want to talk to my mom tonight, but I think we may end up missing each other again.';
const QUICK_PROMPTS = ['Show me the other side', 'Help me say this more calmly', 'Show the family pattern'];

function percent(value: number | undefined) {
  return `${Math.round((value ?? 0) * 100)}%`;
}

export default function StudioWorkspacePage() {
  const [message, setMessage] = useState(INITIAL_MESSAGE);
  const [session, setSession] = useState<SessionResponse | null>(null);
  const [overlayMode, setOverlayMode] = useState<'baseline' | 'family' | 'compare'>('baseline');
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<'thread' | 'field' | 'guide'>('thread');

  const participants = session?.workspace.field_update.participants ?? [];

  const transcript = useMemo(() => {
    if (!session) return [];
    return [
      { role: 'user', body: message },
      { role: 'assistant', body: session.workspace.assistant_message.body },
    ];
  }, [message, session]);

  async function loadSession(mode: 'baseline' | 'family' | 'compare' = overlayMode) {
    setLoading(true);
    try {
      const res = await fetch('/api/workspace/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          overlayMode: mode,
          participants: [
            { id: 'self', name: 'You', role: 'self' },
            { id: 'mother', name: 'Mother', role: 'family' },
          ],
        }),
      });
      const data = (await res.json()) as SessionResponse;
      setSession(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSession('baseline');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function changeOverlay(mode: 'baseline' | 'family' | 'compare') {
    setOverlayMode(mode);
    loadSession(mode);
  }

  function usePrompt(prompt: string) {
    if (prompt === 'Show me the other side') {
      changeOverlay('compare');
      return;
    }
    if (prompt === 'Show the family pattern') {
      changeOverlay('family');
      return;
    }
    setMessage('Help me say this in a calmer and clearer way so the other person can hear it.');
  }

  return (
    <main style={{ minHeight: '100vh', background: '#040404', color: '#f5f2ec' }}>
      <style>{`
        .studio-workspace { position: relative; min-height: 100vh; overflow: hidden; }
        .studio-workspace::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 18% 18%, rgba(255,255,255,0.05), transparent 24%), radial-gradient(circle at 70% 22%, rgba(214,195,161,0.10), transparent 26%), radial-gradient(circle at 64% 78%, rgba(255,255,255,0.04), transparent 24%), linear-gradient(180deg, rgba(255,255,255,0.015), rgba(255,255,255,0)); pointer-events: none; }
        .studio-shell { position: relative; z-index: 1; display: grid; grid-template-columns: 430px minmax(0,1fr) 380px; min-height: 100vh; }
        .studio-col { border-right: 1px solid rgba(255,255,255,0.07); backdrop-filter: blur(10px); }
        .studio-col:last-child { border-right: none; }
        .studio-topbar { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 18px 22px; border-bottom: 1px solid rgba(255,255,255,0.07); background: rgba(255,255,255,0.015); }
        .studio-brand { display: flex; align-items: center; gap: 12px; }
        .studio-mark { width: 30px; height: 30px; border-radius: 999px; border: 1px solid rgba(214,195,161,0.25); background: radial-gradient(circle at center, rgba(214,195,161,0.18), rgba(255,255,255,0.03)); box-shadow: 0 0 20px rgba(214,195,161,0.07); }
        .studio-kicker { font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(245,242,236,0.42); }
        .studio-muted { color: rgba(245,242,236,0.62); }
        .studio-title { font-size: 34px; line-height: 1.02; font-family: var(--font-display), serif; }
        .studio-chip { display: inline-flex; align-items: center; justify-content: center; gap: 6px; border: 1px solid rgba(255,255,255,0.09); background: rgba(255,255,255,0.02); color: #f5f2ec; padding: 9px 11px; font-size: 12px; }
        .studio-chip.active { border-color: rgba(214,195,161,0.35); background: rgba(214,195,161,0.08); }
        .studio-threadwrap { display: grid; grid-template-rows: auto 1fr auto; min-height: calc(100vh - 67px); }
        .studio-header { padding: 22px; display: grid; gap: 12px; }
        .studio-card { border: 1px solid rgba(255,255,255,0.08); background: linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.015)); box-shadow: 0 16px 40px rgba(0,0,0,0.18); }
        .studio-thread { display: grid; gap: 18px; padding: 0 22px 22px; align-content: start; }
        .studio-msg { display: grid; gap: 12px; }
        .studio-msg.assistant { grid-template-columns: 40px minmax(0,1fr); }
        .studio-msg.user { grid-template-columns: minmax(0,1fr) 40px; }
        .studio-avatar { width: 40px; height: 40px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.03); display: grid; place-items: center; font-size: 11px; color: rgba(245,242,236,0.78); }
        .studio-bubble { padding: 16px 18px; border: 1px solid rgba(255,255,255,0.08); line-height: 1.76; }
        .studio-bubble.assistant { background: rgba(214,195,161,0.08); }
        .studio-bubble.user { background: rgba(255,255,255,0.02); }
        .studio-composer { margin-top: auto; padding: 18px 22px 24px; border-top: 1px solid rgba(255,255,255,0.07); background: linear-gradient(180deg, rgba(4,4,4,0), rgba(4,4,4,0.96) 20%); }
        .studio-input { width: 100%; min-height: 118px; resize: vertical; border: 1px solid rgba(255,255,255,0.1); background: #0a0a0a; color: #f5f2ec; padding: 15px; }
        .studio-btn { border: none; background: #f5f2ec; color: #050505; padding: 12px 16px; font-weight: 600; }
        .studio-btn.secondary { background: transparent; color: #f5f2ec; border: 1px solid rgba(255,255,255,0.1); }
        .studio-promptrow { display: flex; gap: 8px; flex-wrap: wrap; }
        .studio-prompt { border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.02); color: #f5f2ec; padding: 9px 11px; font-size: 12px; }
        .studio-main { display: grid; grid-template-rows: auto 1fr; }
        .studio-fieldhead { padding: 22px; display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; border-bottom: 1px solid rgba(255,255,255,0.07); }
        .studio-canvas { position: relative; overflow: hidden; min-height: calc(100vh - 112px); }
        .studio-canvas::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 50% 50%, rgba(214,195,161,0.10), transparent 36%), radial-gradient(circle at 18% 20%, rgba(255,255,255,0.06), transparent 26%), radial-gradient(circle at 78% 76%, rgba(255,255,255,0.05), transparent 22%); }
        .studio-canvas::after { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px); background-size: 36px 36px; opacity: 0.1; mask-image: radial-gradient(circle at center, black 28%, transparent 88%); }
        .studio-orb { position: absolute; border-radius: 999px; filter: blur(34px); opacity: 0.34; animation: studioDrift 10s ease-in-out infinite; }
        .studio-orb.a { width: 260px; height: 260px; left: 10%; top: 12%; background: rgba(214,195,161,0.18); }
        .studio-orb.b { width: 180px; height: 180px; right: 16%; top: 18%; background: rgba(255,255,255,0.12); animation-delay: -4s; }
        .studio-orb.c { width: 220px; height: 220px; left: 40%; bottom: 8%; background: rgba(255,255,255,0.07); animation-delay: -7s; }
        .studio-line { position: absolute; left: 50%; top: 50%; width: 340px; height: 2px; transform: translate(-50%, -50%); background: linear-gradient(90deg, rgba(214,195,161,0), rgba(214,195,161,0.32), rgba(255,255,255,0.44), rgba(214,195,161,0.32), rgba(214,195,161,0)); overflow: hidden; }
        .studio-line::after { content: ''; position: absolute; left: -25%; top: 0; bottom: 0; width: 25%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.65), transparent); animation: studioSweep 3s linear infinite; }
        .studio-node { position: absolute; width: 162px; height: 162px; border-radius: 999px; display: grid; place-items: center; text-align: center; border: 1px solid rgba(255,255,255,0.14); background: radial-gradient(circle at center, rgba(255,255,255,0.09), rgba(255,255,255,0.015)); backdrop-filter: blur(10px); animation: studioFloat 5.4s ease-in-out infinite; box-shadow: 0 0 44px rgba(255,255,255,0.04); }
        .studio-node::before { content: ''; position: absolute; inset: -14px; border-radius: 999px; border: 1px solid rgba(214,195,161,0.16); animation: studioPulse 3.2s ease-in-out infinite; }
        .studio-reading { position: absolute; left: 22px; right: 22px; bottom: 22px; display: grid; gap: 12px; }
        .studio-readinggrid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px,1fr)); gap: 10px; }
        .studio-step { padding: 13px 14px; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.03); line-height: 1.62; }
        .studio-guide { padding: 22px; display: grid; gap: 16px; align-content: start; }
        .studio-meter { display: grid; gap: 8px; }
        .studio-meterbar { width: 100%; height: 8px; border-radius: 999px; background: rgba(255,255,255,0.06); overflow: hidden; }
        .studio-meterfill { height: 100%; border-radius: 999px; background: linear-gradient(90deg, rgba(214,195,161,0.72), rgba(245,242,236,0.86)); }
        .studio-participant { padding: 16px; display: grid; gap: 12px; }
        .studio-tooltip { padding: 10px 12px; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.02); font-size: 13px; color: rgba(245,242,236,0.74); }
        .studio-tabbar { display: none; }
        .studio-statusgrid { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 10px; }
        @keyframes studioSweep { from { left: -25%; } to { left: 100%; } }
        @keyframes studioPulse { 0%, 100% { transform: scale(1); opacity: 0.36; } 50% { transform: scale(1.05); opacity: 0.72; } }
        @keyframes studioFloat { 0%, 100% { transform: translate(-50%, -50%) translateY(0px); } 50% { transform: translate(-50%, -50%) translateY(-6px); } }
        @keyframes studioDrift { 0%, 100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(16px,-12px,0); } }
        @media (max-width: 1180px) { .studio-shell { grid-template-columns: 390px minmax(0,1fr) 340px; } .studio-node { width: 148px; height: 148px; } }
        @media (max-width: 1080px) {
          .studio-shell { grid-template-columns: 1fr; }
          .studio-col { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.07); display: none; }
          .studio-col.active { display: block; }
          .studio-threadwrap { min-height: auto; }
          .studio-canvas { min-height: 640px; }
          .studio-tabbar { position: sticky; bottom: 0; display: grid; grid-template-columns: repeat(3,1fr); border-top: 1px solid rgba(255,255,255,0.07); background: rgba(4,4,4,0.96); backdrop-filter: blur(12px); }
          .studio-tabbtn { border: none; background: transparent; color: #f5f2ec; padding: 14px 12px; }
          .studio-tabbtn.active { background: rgba(214,195,161,0.08); }
        }
        @media (max-width: 760px) {
          .studio-title { font-size: 28px; }
          .studio-fieldhead, .studio-topbar, .studio-header, .studio-guide, .studio-composer { padding-left: 18px; padding-right: 18px; }
          .studio-thread { padding-left: 18px; padding-right: 18px; }
          .studio-readinggrid, .studio-statusgrid { grid-template-columns: 1fr; }
          .studio-node { width: 138px; height: 138px; }
        }
      `}</style>

      <div className='studio-workspace'>
        <div className='studio-shell'>
          <section className={`studio-col ${tab === 'thread' ? 'active' : ''}`}>
            <div className='studio-topbar'>
              <div className='studio-brand'>
                <div className='studio-mark' />
                <div style={{ display: 'grid', gap: 4 }}>
                  <div className='studio-kicker'>Defrag workspace</div>
                  <div>Relationship workspace</div>
                </div>
              </div>
              <div className='studio-chip' title='The thread stays simple, human, and free of labels.'>Plain language</div>
            </div>

            <div className='studio-threadwrap'>
              <div className='studio-header'>
                <div className='studio-card' style={{ padding: 16, display: 'grid', gap: 10 }}>
                  <div className='studio-kicker'>Current read</div>
                  <div style={{ fontSize: 26, fontFamily: 'var(--font-display), serif' }}>{session?.workspace.assistant_message.title ?? 'Reading the situation'}</div>
                  <div className='studio-muted' style={{ lineHeight: 1.72 }}>{session?.workspace.field_update.thread.summary ?? 'DEFRAG helps you see what may be happening, what each person may be carrying, and what could help next.'}</div>
                </div>
                <div className='studio-statusgrid'>
                  <div className='studio-card' style={{ padding: 14, display: 'grid', gap: 6 }}>
                    <div className='studio-kicker'>Current pattern</div>
                    <div>{session?.workspace.field_update.field_state.dominant_pattern ?? 'Loading'}</div>
                  </div>
                  <div className='studio-card' style={{ padding: 14, display: 'grid', gap: 6 }}>
                    <div className='studio-kicker'>Opening</div>
                    <div>{percent(session?.workspace.field_update.field_state.readiness_for_repair)} ready for a healthier next step</div>
                  </div>
                </div>
              </div>

              <div className='studio-thread'>
                {transcript.map((entry, index) => (
                  <div key={`${entry.role}-${index}`} className={`studio-msg ${entry.role}`}>
                    {entry.role === 'assistant' ? <div className='studio-avatar'>DF</div> : null}
                    <div className={`studio-bubble ${entry.role}`}>
                      <div className='studio-kicker' style={{ marginBottom: 8 }}>{entry.role === 'assistant' ? 'Defrag' : 'You'}</div>
                      <div>{entry.body}</div>
                    </div>
                    {entry.role === 'user' ? <div className='studio-avatar'>YU</div> : null}
                  </div>
                ))}
                {loading ? (
                  <div className='studio-msg assistant'>
                    <div className='studio-avatar'>DF</div>
                    <div className='studio-bubble assistant'>
                      <div className='studio-kicker' style={{ marginBottom: 8 }}>Defrag</div>
                      <div className='studio-muted'>Reading the situation…</div>
                    </div>
                  </div>
                ) : null}
              </div>

              <div className='studio-composer'>
                <div style={{ display: 'grid', gap: 12 }}>
                  <div className='studio-promptrow'>
                    {QUICK_PROMPTS.map((prompt) => (
                      <button key={prompt} className='studio-prompt' onClick={() => usePrompt(prompt)}>{prompt}</button>
                    ))}
                  </div>
                  <textarea className='studio-input' value={message} onChange={(e) => setMessage(e.target.value)} />
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <button className='studio-btn' onClick={() => loadSession()} disabled={loading}>{loading ? 'Reading the situation...' : 'Update the field'}</button>
                    <button className='studio-btn secondary' onClick={() => setMessage(INITIAL_MESSAGE)}>Reset example</button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className={`studio-col studio-main ${tab === 'field' ? 'active' : ''}`}>
            <div className='studio-fieldhead'>
              <div style={{ display: 'grid', gap: 8 }}>
                <div className='studio-kicker'>Live field</div>
                <div className='studio-title'>See the situation more clearly</div>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                <div className='studio-chip' title='This is the path the situation may keep falling into right now.'>{session?.workspace.field_update.field_state.dominant_pattern ?? 'Loading pattern'}</div>
                <div className='studio-chip' title='This is a simple read on how open the situation may be to a healthier next step.'>Opening {percent(session?.workspace.field_update.field_state.readiness_for_repair)}</div>
              </div>
            </div>

            <div className='studio-canvas'>
              <div className='studio-orb a' />
              <div className='studio-orb b' />
              <div className='studio-orb c' />
              <div className='studio-line' />
              {(session?.workspace.field_update.visual_state.nodes ?? []).map((node) => (
                <div key={node.id} className='studio-node' style={{ left: `${node.x * 100}%`, top: `${node.y * 100}%` }}>
                  <div className='studio-kicker' style={{ fontSize: 10 }}>{node.role ?? 'person'}</div>
                  <div style={{ fontSize: 30, fontFamily: 'var(--font-display), serif' }}>{node.label}</div>
                  <div className='studio-muted' style={{ fontSize: 13 }}>{node.state}</div>
                </div>
              ))}
              <div className='studio-reading'>
                <div className='studio-card' style={{ padding: 18, display: 'grid', gap: 10 }}>
                  <div className='studio-kicker'>Field reading</div>
                  <div style={{ fontSize: 26, fontFamily: 'var(--font-display), serif' }}>{session?.workspace.assistant_message.title ?? 'Reading the situation'}</div>
                  <div className='studio-muted' style={{ lineHeight: 1.72 }}>{session?.workspace.assistant_message.body ?? 'Loading response'}</div>
                </div>
                <div className='studio-readinggrid'>
                  {(session?.workspace.assistant_message.next_steps ?? []).map((step) => (
                    <div key={step} className='studio-step'>{step}</div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <aside className={`studio-col studio-guide ${tab === 'guide' ? 'active' : ''}`}>
            <div style={{ display: 'grid', gap: 8 }}>
              <div className='studio-kicker'>Guided views</div>
              <div className='studio-title' style={{ fontSize: 30 }}>Branches and overlays</div>
              <div className='studio-muted' style={{ lineHeight: 1.7 }}>Use overlays for simpler explainers, and use the guided thread for one side of the situation at a time.</div>
            </div>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {[
                { id: 'baseline', label: 'Baseline' },
                { id: 'family', label: 'Family' },
                { id: 'compare', label: 'Compare' },
              ].map((item) => (
                <button key={item.id} className={`studio-chip ${overlayMode === item.id ? 'active' : ''}`} onClick={() => changeOverlay(item.id as 'baseline' | 'family' | 'compare')}>{item.label}</button>
              ))}
            </div>

            <div className='studio-card' style={{ padding: 16, display: 'grid', gap: 12 }}>
              <div className='studio-kicker'>{session?.overlay.title ?? 'Overlay'}</div>
              <div className='studio-muted' style={{ lineHeight: 1.72 }}>{session?.overlay.body ?? 'Loading overlay'}</div>
              <div style={{ display: 'grid', gap: 10 }}>
                {(session?.overlay.cards ?? []).map((card) => (
                  <div key={card.label} className='studio-step'>
                    <div className='studio-kicker' style={{ marginBottom: 6 }}>{card.label}</div>
                    <div>{card.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gap: 12 }}>
              {participants.map((participant) => (
                <div key={participant.id} className='studio-card studio-participant'>
                  <div style={{ display: 'grid', gap: 4 }}>
                    <div className='studio-kicker'>{participant.role ?? 'person'}</div>
                    <div style={{ fontSize: 24, fontFamily: 'var(--font-display), serif' }}>{participant.name}</div>
                    <div className='studio-muted'>{participant.current_state.expression}</div>
                  </div>
                  <div className='studio-meter'>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}><span className='studio-muted'>Openness</span><span>{percent(participant.current_state.openness)}</span></div>
                    <div className='studio-meterbar'><div className='studio-meterfill' style={{ width: percent(participant.current_state.openness) }} /></div>
                  </div>
                  <div className='studio-meter'>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}><span className='studio-muted'>Steadiness</span><span>{percent(participant.current_state.steadiness)}</span></div>
                    <div className='studio-meterbar'><div className='studio-meterfill' style={{ width: percent(participant.current_state.steadiness) }} /></div>
                  </div>
                </div>
              ))}
            </div>

            <div className='studio-card' style={{ padding: 16, display: 'grid', gap: 12 }}>
              <div className='studio-kicker'>Focused thread</div>
              <div style={{ fontSize: 24, fontFamily: 'var(--font-display), serif' }}>{session?.branch.title ?? 'Loading branch'}</div>
              <div className='studio-muted' style={{ lineHeight: 1.72 }}>{session?.branch.body ?? 'Loading branch'}</div>
              <div style={{ display: 'grid', gap: 10 }}>
                {(session?.branch.suggestions ?? []).map((item) => (
                  <div key={item} className='studio-step'>{item}</div>
                ))}
              </div>
            </div>

            <div className='studio-card' style={{ padding: 16, display: 'grid', gap: 10 }}>
              <div className='studio-kicker'>Simple explainers</div>
              <div className='studio-tooltip' title='What each person may be carrying means what may already be shaping how they hear the moment before the words are even finished.'>What each person may be carrying</div>
              <div className='studio-tooltip' title='What keeps repeating means the path the situation tends to fall into again and again.'>What keeps repeating</div>
              <div className='studio-tooltip' title='What could help next means a small step that may make the situation easier to understand, not a guaranteed result.'>What could help next</div>
            </div>
          </aside>
        </div>

        <div className='studio-tabbar'>
          <button className={`studio-tabbtn ${tab === 'thread' ? 'active' : ''}`} onClick={() => setTab('thread')}>Thread</button>
          <button className={`studio-tabbtn ${tab === 'field' ? 'active' : ''}`} onClick={() => setTab('field')}>Field</button>
          <button className={`studio-tabbtn ${tab === 'guide' ? 'active' : ''}`} onClick={() => setTab('guide')}>Guide</button>
        </div>
      </div>
    </main>
  );
}
