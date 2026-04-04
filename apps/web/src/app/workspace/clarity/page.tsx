"use client";

import { useEffect, useMemo, useState } from 'react';

type SessionResponse = {
  workspace: {
    summary: {
      whatIsHappening: string;
      whatEachPersonMayBeCarrying: string;
      nextClearStep: string;
    };
    assistant_message: {
      title: string;
      body: string;
      next_steps: string[];
    };
    field_update: {
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
        dominant_pattern: string;
        readiness_for_repair: number;
      };
      visual_state: {
        nodes: Array<{
          id: string;
          label: string;
          role?: string;
          x: number;
          y: number;
          state: string;
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

export default function WorkspaceClarityPage() {
  const [message, setMessage] = useState(INITIAL_MESSAGE);
  const [session, setSession] = useState<SessionResponse | null>(null);
  const [overlayMode, setOverlayMode] = useState<'baseline' | 'family' | 'compare'>('baseline');
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<'thread' | 'field' | 'guide'>('thread');

  const summary = session?.workspace.summary;
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
        .workspace { position: relative; min-height: 100vh; overflow: hidden; }
        .workspace::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 18% 18%, rgba(255,255,255,0.05), transparent 24%), radial-gradient(circle at 70% 22%, rgba(214,195,161,0.10), transparent 26%), radial-gradient(circle at 64% 78%, rgba(255,255,255,0.04), transparent 24%), linear-gradient(180deg, rgba(255,255,255,0.015), rgba(255,255,255,0)); pointer-events: none; }
        .shell { position: relative; z-index: 1; display: grid; grid-template-columns: 430px minmax(0,1fr) 380px; min-height: 100vh; }
        .col { border-right: 1px solid rgba(255,255,255,0.07); backdrop-filter: blur(10px); }
        .col:last-child { border-right: none; }
        .topbar { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 18px 22px; border-bottom: 1px solid rgba(255,255,255,0.07); background: rgba(255,255,255,0.015); }
        .brand { display: flex; align-items: center; gap: 12px; }
        .mark { width: 30px; height: 30px; border-radius: 999px; border: 1px solid rgba(214,195,161,0.25); background: radial-gradient(circle at center, rgba(214,195,161,0.18), rgba(255,255,255,0.03)); box-shadow: 0 0 20px rgba(214,195,161,0.07); }
        .kicker { font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(245,242,236,0.42); }
        .muted { color: rgba(245,242,236,0.62); }
        .title { font-size: 34px; line-height: 1.02; font-family: var(--font-display), serif; }
        .chip { display: inline-flex; align-items: center; justify-content: center; gap: 6px; border: 1px solid rgba(255,255,255,0.09); background: rgba(255,255,255,0.02); color: #f5f2ec; padding: 9px 11px; font-size: 12px; }
        .chip.active { border-color: rgba(214,195,161,0.35); background: rgba(214,195,161,0.08); }
        .threadwrap { display: grid; grid-template-rows: auto 1fr auto; min-height: calc(100vh - 67px); }
        .header { padding: 22px; display: grid; gap: 12px; }
        .card { border: 1px solid rgba(255,255,255,0.08); background: linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.015)); box-shadow: 0 16px 40px rgba(0,0,0,0.18); }
        .thread { display: grid; gap: 18px; padding: 0 22px 22px; align-content: start; }
        .msg { display: grid; gap: 12px; }
        .msg.assistant { grid-template-columns: 40px minmax(0,1fr); }
        .msg.user { grid-template-columns: minmax(0,1fr) 40px; }
        .avatar { width: 40px; height: 40px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.03); display: grid; place-items: center; font-size: 11px; color: rgba(245,242,236,0.78); }
        .bubble { padding: 16px 18px; border: 1px solid rgba(255,255,255,0.08); line-height: 1.76; }
        .bubble.assistant { background: rgba(214,195,161,0.08); }
        .bubble.user { background: rgba(255,255,255,0.02); }
        .composer { margin-top: auto; padding: 18px 22px 24px; border-top: 1px solid rgba(255,255,255,0.07); background: linear-gradient(180deg, rgba(4,4,4,0), rgba(4,4,4,0.96) 20%); }
        .input { width: 100%; min-height: 118px; resize: vertical; border: 1px solid rgba(255,255,255,0.1); background: #0a0a0a; color: #f5f2ec; padding: 15px; }
        .btn { border: none; background: #f5f2ec; color: #050505; padding: 12px 16px; font-weight: 600; }
        .btn.secondary { background: transparent; color: #f5f2ec; border: 1px solid rgba(255,255,255,0.1); }
        .promptrow { display: flex; gap: 8px; flex-wrap: wrap; }
        .prompt { border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.02); color: #f5f2ec; padding: 9px 11px; font-size: 12px; }
        .main { display: grid; grid-template-rows: auto 1fr; }
        .fieldhead { padding: 22px; display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; border-bottom: 1px solid rgba(255,255,255,0.07); }
        .canvas { position: relative; overflow: hidden; min-height: calc(100vh - 112px); }
        .canvas::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 50% 50%, rgba(214,195,161,0.10), transparent 36%), radial-gradient(circle at 18% 20%, rgba(255,255,255,0.06), transparent 26%), radial-gradient(circle at 78% 76%, rgba(255,255,255,0.05), transparent 22%); }
        .canvas::after { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px); background-size: 36px 36px; opacity: 0.1; mask-image: radial-gradient(circle at center, black 28%, transparent 88%); }
        .orb { position: absolute; border-radius: 999px; filter: blur(34px); opacity: 0.34; animation: drift 10s ease-in-out infinite; }
        .orb.a { width: 260px; height: 260px; left: 10%; top: 12%; background: rgba(214,195,161,0.18); }
        .orb.b { width: 180px; height: 180px; right: 16%; top: 18%; background: rgba(255,255,255,0.12); animation-delay: -4s; }
        .orb.c { width: 220px; height: 220px; left: 40%; bottom: 8%; background: rgba(255,255,255,0.07); animation-delay: -7s; }
        .line { position: absolute; left: 50%; top: 50%; width: 340px; height: 2px; transform: translate(-50%, -50%); background: linear-gradient(90deg, rgba(214,195,161,0), rgba(214,195,161,0.32), rgba(255,255,255,0.44), rgba(214,195,161,0.32), rgba(214,195,161,0)); overflow: hidden; }
        .line::after { content: ''; position: absolute; left: -25%; top: 0; bottom: 0; width: 25%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.65), transparent); animation: sweep 3s linear infinite; }
        .node { position: absolute; width: 162px; height: 162px; border-radius: 999px; display: grid; place-items: center; text-align: center; border: 1px solid rgba(255,255,255,0.14); background: radial-gradient(circle at center, rgba(255,255,255,0.09), rgba(255,255,255,0.015)); backdrop-filter: blur(10px); animation: float 5.4s ease-in-out infinite; box-shadow: 0 0 44px rgba(255,255,255,0.04); }
        .reading { position: absolute; left: 22px; right: 22px; bottom: 22px; display: grid; gap: 12px; }
        .readinggrid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px,1fr)); gap: 10px; }
        .step { padding: 13px 14px; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.03); line-height: 1.62; }
        .guide { padding: 22px; display: grid; gap: 16px; align-content: start; }
        .meter { display: grid; gap: 8px; }
        .meterbar { width: 100%; height: 8px; border-radius: 999px; background: rgba(255,255,255,0.06); overflow: hidden; }
        .meterfill { height: 100%; border-radius: 999px; background: linear-gradient(90deg, rgba(214,195,161,0.72), rgba(245,242,236,0.86)); }
        .participant { padding: 16px; display: grid; gap: 12px; }
        .tooltip { padding: 10px 12px; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.02); font-size: 13px; color: rgba(245,242,236,0.74); }
        .tabbar { display: none; }
        .statusgrid { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 10px; }
        @keyframes sweep { from { left: -25%; } to { left: 100%; } }
        @keyframes float { 0%, 100% { transform: translate(-50%, -50%) translateY(0px); } 50% { transform: translate(-50%, -50%) translateY(-6px); } }
        @keyframes drift { 0%, 100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(16px,-12px,0); } }
        @media (max-width: 1180px) { .shell { grid-template-columns: 390px minmax(0,1fr) 340px; } .node { width: 148px; height: 148px; } }
        @media (max-width: 1080px) {
          .shell { grid-template-columns: 1fr; }
          .col { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.07); display: none; }
          .col.active { display: block; }
          .threadwrap { min-height: auto; }
          .canvas { min-height: 640px; }
          .tabbar { position: sticky; bottom: 0; display: grid; grid-template-columns: repeat(3,1fr); border-top: 1px solid rgba(255,255,255,0.07); background: rgba(4,4,4,0.96); backdrop-filter: blur(12px); }
          .tabbtn { border: none; background: transparent; color: #f5f2ec; padding: 14px 12px; }
          .tabbtn.active { background: rgba(214,195,161,0.08); }
        }
      `}</style>
      <div className='workspace'>
        <div className='shell'>
          <section className={`col ${tab === 'thread' ? 'active' : ''}`}>
            <div className='topbar'>
              <div className='brand'>
                <div className='mark' />
                <div style={{ display: 'grid', gap: 4 }}>
                  <div className='kicker'>Defrag workspace</div>
                  <div>Relationship workspace</div>
                </div>
              </div>
              <div className='chip'>Plain language</div>
            </div>
            <div className='threadwrap'>
              <div className='header'>
                <div className='card' style={{ padding: 16, display: 'grid', gap: 10 }}>
                  <div className='kicker'>What may be happening</div>
                  <div style={{ fontSize: 26, fontFamily: 'var(--font-display), serif' }}>{summary?.whatIsHappening ?? 'Reading the situation'}</div>
                  <div className='muted' style={{ lineHeight: 1.72 }}>{summary?.whatEachPersonMayBeCarrying ?? 'Loading a plain-language read of the situation.'}</div>
                </div>
                <div className='statusgrid'>
                  <div className='card' style={{ padding: 14, display: 'grid', gap: 6 }}>
                    <div className='kicker'>What keeps repeating</div>
                    <div>{session?.workspace.field_update.field_state.dominant_pattern ?? 'Loading'}</div>
                  </div>
                  <div className='card' style={{ padding: 14, display: 'grid', gap: 6 }}>
                    <div className='kicker'>What could help next</div>
                    <div>{summary?.nextClearStep ?? 'Loading a next step.'}</div>
                  </div>
                </div>
              </div>
              <div className='thread'>
                {transcript.map((entry, index) => (
                  <div key={`${entry.role}-${index}`} className={`msg ${entry.role}`}>
                    {entry.role === 'assistant' ? <div className='avatar'>DF</div> : null}
                    <div className={`bubble ${entry.role}`}>
                      <div className='kicker' style={{ marginBottom: 8 }}>{entry.role === 'assistant' ? 'Defrag' : 'You'}</div>
                      <div>{entry.body}</div>
                    </div>
                    {entry.role === 'user' ? <div className='avatar'>YU</div> : null}
                  </div>
                ))}
              </div>
              <div className='composer'>
                <div style={{ display: 'grid', gap: 12 }}>
                  <div className='promptrow'>
                    {QUICK_PROMPTS.map((prompt) => (
                      <button key={prompt} className='prompt' onClick={() => usePrompt(prompt)}>{prompt}</button>
                    ))}
                  </div>
                  <textarea className='input' value={message} onChange={(e) => setMessage(e.target.value)} />
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <button className='btn' onClick={() => loadSession()} disabled={loading}>{loading ? 'Reading the situation...' : 'Update the view'}</button>
                    <button className='btn secondary' onClick={() => setMessage(INITIAL_MESSAGE)}>Reset example</button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className={`col main ${tab === 'field' ? 'active' : ''}`}>
            <div className='fieldhead'>
              <div style={{ display: 'grid', gap: 8 }}>
                <div className='kicker'>Live view</div>
                <div className='title'>See the situation more clearly</div>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                <div className='chip'>{session?.workspace.field_update.field_state.dominant_pattern ?? 'Loading pattern'}</div>
                <div className='chip'>Room for a better next step {percent(session?.workspace.field_update.field_state.readiness_for_repair)}</div>
              </div>
            </div>
            <div className='canvas'>
              <div className='orb a' />
              <div className='orb b' />
              <div className='orb c' />
              <div className='line' />
              {(session?.workspace.field_update.visual_state.nodes ?? []).map((node) => (
                <div key={node.id} className='node' style={{ left: `${node.x * 100}%`, top: `${node.y * 100}%` }}>
                  <div className='kicker' style={{ fontSize: 10 }}>{node.role ?? 'person'}</div>
                  <div style={{ fontSize: 30, fontFamily: 'var(--font-display), serif' }}>{node.label}</div>
                  <div className='muted' style={{ fontSize: 13 }}>{node.state}</div>
                </div>
              ))}
              <div className='reading'>
                <div className='card' style={{ padding: 18, display: 'grid', gap: 10 }}>
                  <div className='kicker'>What may be happening</div>
                  <div style={{ fontSize: 26, fontFamily: 'var(--font-display), serif' }}>{summary?.whatIsHappening ?? 'Reading the situation'}</div>
                  <div className='muted' style={{ lineHeight: 1.72 }}>{summary?.whatEachPersonMayBeCarrying ?? 'Loading a clearer read of what each side may be carrying.'}</div>
                </div>
                <div className='readinggrid'>
                  <div className='step'>{summary?.nextClearStep ?? 'Loading a next step.'}</div>
                  {(session?.workspace.assistant_message.next_steps ?? []).slice(1).map((step) => (
                    <div key={step} className='step'>{step}</div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          <aside className={`col guide ${tab === 'guide' ? 'active' : ''}`}>
            <div style={{ display: 'grid', gap: 8 }}>
              <div className='kicker'>Useful views</div>
              <div className='title' style={{ fontSize: 30 }}>One side at a time</div>
              <div className='muted' style={{ lineHeight: 1.7 }}>Use these views to understand the situation more clearly without trying to solve everything at once.</div>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {[
                { id: 'baseline', label: 'Baseline' },
                { id: 'family', label: 'Family' },
                { id: 'compare', label: 'Compare' },
              ].map((item) => (
                <button key={item.id} className={`chip ${overlayMode === item.id ? 'active' : ''}`} onClick={() => changeOverlay(item.id as 'baseline' | 'family' | 'compare')}>{item.label}</button>
              ))}
            </div>
            <div className='card' style={{ padding: 16, display: 'grid', gap: 12 }}>
              <div className='kicker'>{session?.overlay.title ?? 'View'}</div>
              <div className='muted' style={{ lineHeight: 1.72 }}>{session?.overlay.body ?? 'Loading view'}</div>
              <div style={{ display: 'grid', gap: 10 }}>
                {(session?.overlay.cards ?? []).map((card) => (
                  <div key={card.label} className='step'>
                    <div className='kicker' style={{ marginBottom: 6 }}>{card.label}</div>
                    <div>{card.value}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'grid', gap: 12 }}>
              {participants.map((participant) => (
                <div key={participant.id} className='card participant'>
                  <div style={{ display: 'grid', gap: 4 }}>
                    <div className='kicker'>{participant.role ?? 'person'}</div>
                    <div style={{ fontSize: 24, fontFamily: 'var(--font-display), serif' }}>{participant.name}</div>
                    <div className='muted'>{participant.current_state.expression}</div>
                  </div>
                  <div className='meter'>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}><span className='muted'>Ease</span><span>{percent(participant.current_state.openness)}</span></div>
                    <div className='meterbar'><div className='meterfill' style={{ width: percent(participant.current_state.openness) }} /></div></div>
                  </div>
                  <div className='meter'>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}><span className='muted'>Calm</span><span>{percent(participant.current_state.steadiness)}</span></div>
                    <div className='meterbar'><div className='meterfill' style={{ width: percent(participant.current_state.steadiness) }} /></div></div>
                  </div>
                </div>
              ))}
            </div>
            <div className='card' style={{ padding: 16, display: 'grid', gap: 12 }}>
              <div className='kicker'>One side of the situation</div>
              <div style={{ fontSize: 24, fontFamily: 'var(--font-display), serif' }}>{session?.branch.title ?? 'Loading view'}</div>
              <div className='muted' style={{ lineHeight: 1.72 }}>{session?.branch.body ?? 'Loading view'}</div>
              <div style={{ display: 'grid', gap: 10 }}>
                {(session?.branch.suggestions ?? []).map((item) => (
                  <div key={item} className='step'>{item}</div>
                ))}
              </div>
            </div>
            <div className='card' style={{ padding: 16, display: 'grid', gap: 10 }}>
              <div className='kicker'>Simple explainers</div>
              <div className='tooltip'>What each person may be carrying</div>
              <div className='tooltip'>What keeps repeating</div>
              <div className='tooltip'>What could help next</div>
            </div>
          </aside>
        </div>
        <div className='tabbar'>
          <button className={`tabbtn ${tab === 'thread' ? 'active' : ''}`} onClick={() => setTab('thread')}>Thread</button>
          <button className={`tabbtn ${tab === 'field' ? 'active' : ''}`} onClick={() => setTab('field')}>View</button>
          <button className={`tabbtn ${tab === 'guide' ? 'active' : ''}`} onClick={() => setTab('guide')}>Guide</button>
        </div>
      </div>
    </main>
  );
}
