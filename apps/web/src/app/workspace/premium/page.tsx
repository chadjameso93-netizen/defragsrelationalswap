"use client";

import { useEffect, useMemo, useState } from "react";

type WorkspaceResponse = {
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
    dynamics: Array<{
      id: string;
      from: string;
      to: string;
      type: string;
      intensity: number;
      description: string;
      opening_level: number;
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
      edges: Array<{
        from: string;
        to: string;
        weight: number;
        state: string;
        animation: string;
      }>;
    };
  };
};

type BranchResponse = {
  title: string;
  body: string;
  suggestions: string[];
};

const INITIAL_MESSAGE =
  "I want to talk to my mom tonight, but I think we may end up missing each other again.";

export default function PremiumWorkspacePage() {
  const [message, setMessage] = useState(INITIAL_MESSAGE);
  const [result, setResult] = useState<WorkspaceResponse | null>(null);
  const [branch, setBranch] = useState<BranchResponse | null>(null);
  const [selectedBranchId, setSelectedBranchId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [branchLoading, setBranchLoading] = useState(false);

  const transcript = useMemo(() => {
    if (!result) return [];
    return [
      { role: "user", body: message },
      { role: "assistant", body: result.assistant_message.body },
    ];
  }, [message, result]);

  async function interpret() {
    setLoading(true);
    try {
      const res = await fetch("/api/workspace/interpret", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          participants: [
            { id: "self", name: "You", role: "self" },
            { id: "mother", name: "Mother", role: "family" },
          ],
        }),
      });
      const data = (await res.json()) as WorkspaceResponse;
      setResult(data);
      if (data.field_update.branch_suggestions[0]) {
        openBranch(data.field_update.branch_suggestions[0].id);
      }
    } finally {
      setLoading(false);
    }
  }

  async function openBranch(branchId: string) {
    setSelectedBranchId(branchId);
    setBranchLoading(true);
    try {
      const res = await fetch("/api/workspace/branch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ branchId, message }),
      });
      const data = (await res.json()) as BranchResponse;
      setBranch(data);
    } finally {
      setBranchLoading(false);
    }
  }

  useEffect(() => {
    interpret();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main style={{ minHeight: "100vh", background: "#050505", color: "#f5f2ec" }}>
      <style>{`
        :root { color-scheme: dark; }
        .dw-shell { display:grid; grid-template-columns: 420px minmax(0, 1fr) 340px; min-height:100vh; }
        .dw-side, .dw-main, .dw-right { position:relative; }
        .dw-side, .dw-main { border-right:1px solid rgba(255,255,255,0.07); }
        .dw-panel { background:linear-gradient(180deg, rgba(255,255,255,0.022), rgba(255,255,255,0.012)); }
        .dw-kicker { font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:rgba(245,242,236,0.42); }
        .dw-muted { color:rgba(245,242,236,0.64); }
        .dw-toolbar { display:flex; align-items:center; justify-content:space-between; padding:18px 20px; border-bottom:1px solid rgba(255,255,255,0.07); }
        .dw-chip { border:1px solid rgba(255,255,255,0.09); padding:8px 10px; font-size:12px; color:rgba(245,242,236,0.72); background:rgba(255,255,255,0.02); }
        .dw-thread { display:grid; gap:18px; padding:24px 22px 160px; }
        .dw-row { display:grid; gap:10px; }
        .dw-msg { display:grid; gap:10px; max-width:100%; }
        .dw-msg.assistant { grid-template-columns:34px minmax(0, 1fr); }
        .dw-msg.user { grid-template-columns:minmax(0, 1fr) 34px; }
        .dw-avatar { width:34px; height:34px; border-radius:50%; display:grid; place-items:center; font-size:11px; letter-spacing:0.12em; text-transform:uppercase; border:1px solid rgba(255,255,255,0.11); background:rgba(255,255,255,0.03); color:rgba(245,242,236,0.74); }
        .dw-bubble { padding:16px 18px; border:1px solid rgba(255,255,255,0.08); line-height:1.72; }
        .dw-userbubble { background:rgba(255,255,255,0.02); }
        .dw-assistantbubble { background:rgba(214,195,161,0.08); }
        .dw-composer { position:absolute; left:0; right:0; bottom:0; padding:18px; border-top:1px solid rgba(255,255,255,0.07); background:linear-gradient(180deg, rgba(5,5,5,0), rgba(5,5,5,0.98) 22%); backdrop-filter: blur(14px); }
        .dw-input { width:100%; min-height:120px; resize:vertical; border:1px solid rgba(255,255,255,0.11); background:rgba(10,10,10,0.94); color:#f5f2ec; padding:16px; }
        .dw-button { border:none; background:#f5f2ec; color:#050505; padding:12px 16px; font-weight:600; cursor:pointer; }
        .dw-button.secondary { background:transparent; color:#f5f2ec; border:1px solid rgba(255,255,255,0.11); }
        .dw-mainhead { display:flex; align-items:end; justify-content:space-between; gap:16px; padding:22px; border-bottom:1px solid rgba(255,255,255,0.07); }
        .dw-canvas { position:relative; min-height:calc(100vh - 190px); overflow:hidden; }
        .dw-grid { position:absolute; inset:0; background-image:linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px); background-size:36px 36px; opacity:0.12; mask-image:radial-gradient(circle at center, black 22%, transparent 85%); }
        .dw-haze { position:absolute; inset:0; background:radial-gradient(circle at 50% 50%, rgba(214,195,161,0.10), transparent 36%), radial-gradient(circle at 25% 20%, rgba(255,255,255,0.07), transparent 28%), radial-gradient(circle at 75% 70%, rgba(255,255,255,0.05), transparent 26%); }
        .dw-node { position:absolute; width:144px; height:144px; border-radius:999px; display:grid; place-items:center; text-align:center; border:1px solid rgba(255,255,255,0.14); background:radial-gradient(circle at center, rgba(255,255,255,0.07), rgba(255,255,255,0.015)); backdrop-filter:blur(10px); box-shadow:0 0 44px rgba(255,255,255,0.045); animation:nodeDrift 5.6s ease-in-out infinite; }
        .dw-node::before { content:""; position:absolute; inset:-12px; border-radius:999px; border:1px solid rgba(214,195,161,0.14); animation:ringPulse 3.2s ease-in-out infinite; }
        .dw-node[data-state="activated"]::after, .dw-node[data-state="strained"]::after { content:""; position:absolute; inset:-22px; border-radius:999px; border:1px solid rgba(214,195,161,0.08); animation:ringPulse 2.6s ease-in-out infinite; }
        .dw-edge { position:absolute; left:50%; top:50%; width:280px; height:2px; transform:translate(-50%, -50%); background:linear-gradient(90deg, rgba(214,195,161,0.0), rgba(214,195,161,0.34), rgba(255,255,255,0.42), rgba(214,195,161,0.34), rgba(214,195,161,0.0)); overflow:hidden; }
        .dw-edge::after { content:""; position:absolute; top:0; bottom:0; left:-25%; width:25%; background:linear-gradient(90deg, transparent, rgba(255,255,255,0.65), transparent); animation:edgeSweep 2.8s linear infinite; }
        .dw-tooltip { border:1px solid rgba(255,255,255,0.09); background:rgba(255,255,255,0.02); padding:10px 12px; font-size:13px; color:rgba(245,242,236,0.76); }
        .dw-rightscroll { display:grid; gap:14px; padding:22px; }
        .dw-branch { border:1px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.02); padding:16px; display:grid; gap:10px; cursor:pointer; transition: border-color 180ms ease, background-color 180ms ease, transform 180ms ease; }
        .dw-branch:hover { transform:translateY(-1px); border-color:rgba(214,195,161,0.24); }
        .dw-branch.active { border-color:rgba(214,195,161,0.38); background:rgba(214,195,161,0.08); }
        .dw-branchpanel { border:1px solid rgba(255,255,255,0.08); background:linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015)); padding:18px; display:grid; gap:12px; }
        .dw-step { padding:12px 14px; border:1px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.02); line-height:1.62; }
        @keyframes edgeSweep { from { left:-25%; } to { left:100%; } }
        @keyframes ringPulse { 0%, 100% { transform:scale(1); opacity:0.36; } 50% { transform:scale(1.05); opacity:0.72; } }
        @keyframes nodeDrift { 0%, 100% { transform:translate(-50%, -50%) translateY(0px); } 50% { transform:translate(-50%, -50%) translateY(-5px); } }
        @media (max-width: 1200px) {
          .dw-shell { grid-template-columns: 380px minmax(0, 1fr) 320px; }
          .dw-node { width:132px; height:132px; }
        }
        @media (max-width: 980px) {
          .dw-shell { grid-template-columns: 1fr; }
          .dw-side, .dw-main { border-right:none; }
          .dw-side, .dw-main, .dw-right { border-bottom:1px solid rgba(255,255,255,0.07); }
          .dw-composer { position:static; background:none; border-top:none; padding:18px 22px 24px; }
          .dw-canvas { min-height:560px; }
        }
      `}</style>

      <div className="dw-shell">
        <section className="dw-side dw-panel">
          <div className="dw-toolbar">
            <div style={{ display: "grid", gap: 6 }}>
              <div className="dw-kicker">Defrag workspace</div>
              <div style={{ fontSize: 28, fontFamily: "var(--font-display), serif" }}>Relationship workspace</div>
            </div>
            <div className="dw-chip" title="DEFRAG keeps the language simple and explains patterns without labels.">Plain language</div>
          </div>

          <div className="dw-thread">
            <div className="dw-row">
              <div className="dw-kicker">What this space does</div>
              <div className="dw-tooltip">It helps you see what may be happening, what each person may be carrying, and what could help next.</div>
            </div>

            {transcript.map((entry, index) => (
              <div key={`${entry.role}-${index}`} className={`dw-msg ${entry.role === "assistant" ? "assistant" : "user"}`}>
                {entry.role === "assistant" ? <div className="dw-avatar">DF</div> : null}
                <div className={`dw-bubble ${entry.role === "assistant" ? "dw-assistantbubble" : "dw-userbubble"}`}>
                  <div className="dw-kicker" style={{ marginBottom: 8 }}>{entry.role === "assistant" ? "Defrag" : "You"}</div>
                  <div>{entry.body}</div>
                </div>
                {entry.role === "user" ? <div className="dw-avatar">YU</div> : null}
              </div>
            ))}
          </div>

          <div className="dw-composer">
            <div style={{ display: "grid", gap: 12 }}>
              <textarea className="dw-input" value={message} onChange={(e) => setMessage(e.target.value)} />
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button className="dw-button" onClick={interpret} disabled={loading}>{loading ? "Reading the situation..." : "Update the field"}</button>
                <button className="dw-button secondary" onClick={() => setMessage(INITIAL_MESSAGE)}>Reset example</button>
              </div>
            </div>
          </div>
        </section>

        <section className="dw-main dw-panel">
          <div className="dw-mainhead">
            <div style={{ display: "grid", gap: 8 }}>
              <div className="dw-kicker">Live field</div>
              <div style={{ fontSize: 34, fontFamily: "var(--font-display), serif" }}>What may be happening between people</div>
            </div>
            <div style={{ display: "grid", gap: 8, maxWidth: 300 }}>
              <div className="dw-chip" title="This is the repeated path the situation may be falling into right now.">{result?.field_update.field_state.dominant_pattern ?? "Loading pattern"}</div>
              <div className="dw-chip" title="This is a simple read on how possible it may be to move the situation in a healthier direction right now.">Readiness: {Math.round((result?.field_update.field_state.readiness_for_repair ?? 0.42) * 100)}%</div>
            </div>
          </div>

          <div className="dw-canvas">
            <div className="dw-grid" />
            <div className="dw-haze" />
            <div className="dw-edge" />
            {(result?.field_update.visual_state.nodes ?? []).map((node) => (
              <div
                key={node.id}
                className="dw-node"
                data-state={node.state}
                style={{ left: `${node.x * 100}%`, top: `${node.y * 100}%` }}
                title={`${node.label}: ${node.state}`}
              >
                <div className="dw-kicker" style={{ fontSize: 10 }}>{node.role ?? "person"}</div>
                <div style={{ fontSize: 28, fontFamily: "var(--font-display), serif" }}>{node.label}</div>
                <div className="dw-muted" style={{ fontSize: 13 }}>{node.state}</div>
              </div>
            ))}

            <div style={{ position: "absolute", left: 22, right: 22, bottom: 22, display: "grid", gap: 12 }}>
              <div className="dw-branchpanel">
                <div className="dw-kicker">Field reading</div>
                <div style={{ fontSize: 24, fontFamily: "var(--font-display), serif" }}>{result?.assistant_message.title ?? "Reading the situation"}</div>
                <div className="dw-muted" style={{ lineHeight: 1.72 }}>{result?.field_update.thread.summary ?? "The field is opening."}</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 10 }}>
                {(result?.assistant_message.next_steps ?? []).map((step) => (
                  <div key={step} className="dw-step">{step}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <aside className="dw-right dw-panel">
          <div className="dw-toolbar">
            <div style={{ display: "grid", gap: 6 }}>
              <div className="dw-kicker">Branches</div>
              <div style={{ fontSize: 26, fontFamily: "var(--font-display), serif" }}>Other views</div>
            </div>
            <div className="dw-chip" title="These are focused side threads so you can explore one part of the situation without losing the main view.">Guided panels</div>
          </div>

          <div className="dw-rightscroll">
            {(result?.field_update.branch_suggestions ?? []).map((item) => (
              <button key={item.id} className={`dw-branch ${selectedBranchId === item.id ? "active" : ""}`} onClick={() => openBranch(item.id)}>
                <div className="dw-kicker">{item.type}</div>
                <div style={{ fontSize: 20, fontFamily: "var(--font-display), serif", textAlign: "left" }}>{item.label}</div>
                <div className="dw-muted" style={{ lineHeight: 1.62, textAlign: "left" }}>
                  Open one side of the situation in a simpler, focused way.
                </div>
              </button>
            ))}

            <div className="dw-branchpanel">
              <div className="dw-kicker">Focused thread</div>
              <div style={{ fontSize: 22, fontFamily: "var(--font-display), serif" }}>{branchLoading ? "Opening..." : branch?.title ?? "Choose a branch"}</div>
              <div className="dw-muted" style={{ lineHeight: 1.72 }}>{branch?.body ?? "Pick one of the guided views above to open a focused explanation."}</div>
              <div style={{ display: "grid", gap: 10 }}>
                {(branch?.suggestions ?? []).map((suggestion) => (
                  <div key={suggestion} className="dw-step">{suggestion}</div>
                ))}
              </div>
            </div>

            <div className="dw-branchpanel">
              <div className="dw-kicker">Simple explainers</div>
              <div className="dw-tooltip" title="What each person may be carrying means what may already be shaping how they hear this moment before the words are even finished.">What each person may be carrying</div>
              <div className="dw-tooltip" title="What keeps repeating means the path the situation tends to fall into again and again.">What keeps repeating</div>
              <div className="dw-tooltip" title="What could help next means a small step that may make the situation easier to understand, not a guaranteed result.">What could help next</div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
