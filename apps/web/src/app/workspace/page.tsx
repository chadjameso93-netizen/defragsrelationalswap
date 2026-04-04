"use client";

import { useMemo, useState } from "react";

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
  ui_actions: {
    open_branch_threads: Array<{ id: string; label: string }>;
    focus_node_ids: string[];
    camera_mode: string;
  };
};

const INITIAL_MESSAGE =
  "I want to talk to my mom tonight, but I think we may end up missing each other again.";

export default function WorkspacePage() {
  const [message, setMessage] = useState(INITIAL_MESSAGE);
  const [result, setResult] = useState<WorkspaceResponse | null>(null);
  const [loading, setLoading] = useState(false);

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
            { id: "other", name: "Mother", role: "family" },
          ],
        }),
      });
      const data = (await res.json()) as WorkspaceResponse;
      setResult(data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ minHeight: "100vh", background: "#050505", color: "#f6f3ee" }}>
      <style>{`
        .defrag-shell { display:grid; grid-template-columns: 360px minmax(0,1fr) 320px; min-height:100vh; }
        .defrag-panel { border-right:1px solid rgba(255,255,255,0.08); }
        .defrag-panel:last-child { border-right:none; }
        .defrag-muted { color: rgba(246,243,238,0.62); }
        .defrag-kicker { font-size:12px; letter-spacing:0.18em; text-transform:uppercase; color: rgba(246,243,238,0.46); }
        .defrag-card { border:1px solid rgba(255,255,255,0.08); background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015)); }
        .defrag-button { background:#f6f3ee; color:#050505; border:none; padding:12px 16px; font-weight:600; cursor:pointer; }
        .defrag-button.secondary { background:transparent; color:#f6f3ee; border:1px solid rgba(255,255,255,0.12); }
        .defrag-textarea { width:100%; min-height:140px; resize:vertical; background:#0a0a0a; color:#f6f3ee; border:1px solid rgba(255,255,255,0.12); padding:14px; }
        .field-node { position:absolute; width:128px; height:128px; border-radius:999px; border:1px solid rgba(255,255,255,0.16); display:flex; align-items:center; justify-content:center; flex-direction:column; backdrop-filter: blur(8px); background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08), rgba(255,255,255,0.02)); box-shadow: 0 0 0 1px rgba(255,255,255,0.02), 0 0 40px rgba(255,255,255,0.04); }
        .field-node::after { content:""; position:absolute; inset:-10px; border-radius:999px; border:1px solid rgba(214,195,161,0.16); opacity:0.55; }
        .field-edge { position:absolute; left:50%; top:50%; width:240px; height:1px; background: linear-gradient(90deg, rgba(214,195,161,0.18), rgba(255,255,255,0.34), rgba(214,195,161,0.18)); transform: translate(-50%, -50%); }
        .thread-bubble { padding:14px 16px; max-width:92%; border:1px solid rgba(255,255,255,0.08); }
        .thread-bubble.user { background: rgba(255,255,255,0.03); margin-left:auto; }
        .thread-bubble.assistant { background: rgba(214,195,161,0.08); }
        @media (max-width: 1100px) {
          .defrag-shell { grid-template-columns: 340px minmax(0,1fr); }
          .defrag-branches { display:none; }
        }
        @media (max-width: 820px) {
          .defrag-shell { grid-template-columns: 1fr; }
          .defrag-panel { border-right:none; border-bottom:1px solid rgba(255,255,255,0.08); }
          .defrag-chat { order:1; }
          .defrag-field { order:2; }
          .defrag-branches { display:block; order:3; }
        }
      `}</style>

      <div className="defrag-shell">
        <section className="defrag-panel defrag-chat" style={{ padding: 24, display: "grid", gap: 20 }}>
          <div style={{ display: "grid", gap: 10 }}>
            <div className="defrag-kicker">Defrag workspace</div>
            <h1 style={{ margin: 0, fontSize: 38, lineHeight: 1 }}>Relationship workspace</h1>
            <p className="defrag-muted" style={{ margin: 0, lineHeight: 1.6 }}>
              A calm space to understand what may be happening, what each person may be carrying, and what could help next.
            </p>
          </div>

          <div className="defrag-card" style={{ padding: 16, display: "grid", gap: 12 }}>
            <div className="defrag-kicker">Describe the situation</div>
            <textarea className="defrag-textarea" value={message} onChange={(e) => setMessage(e.target.value)} />
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button className="defrag-button" onClick={interpret} disabled={loading}>
                {loading ? "Reading the situation..." : "See what may be happening"}
              </button>
              <button className="defrag-button secondary" onClick={() => setMessage(INITIAL_MESSAGE)}>
                Reset example
              </button>
            </div>
          </div>

          <div style={{ display: "grid", gap: 12 }}>
            <div className="defrag-kicker">Thread</div>
            {transcript.length === 0 ? (
              <div className="defrag-card" style={{ padding: 16 }}>
                <div className="defrag-muted">Run the workspace once to open the first conversation and field state.</div>
              </div>
            ) : (
              transcript.map((entry, index) => (
                <div key={`${entry.role}-${index}`} className={`thread-bubble ${entry.role}`}>
                  <div className="defrag-kicker" style={{ marginBottom: 8 }}>
                    {entry.role === "user" ? "You" : "Defrag"}
                  </div>
                  <div style={{ lineHeight: 1.7 }}>{entry.body}</div>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="defrag-panel defrag-field" style={{ padding: 24, display: "grid", gridTemplateRows: "auto 1fr auto", gap: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "end" }}>
            <div style={{ display: "grid", gap: 8 }}>
              <div className="defrag-kicker">Live field</div>
              <h2 style={{ margin: 0, fontSize: 30 }}>What may be happening between people</h2>
            </div>
            {result && (
              <div className="defrag-card" style={{ padding: "10px 12px", minWidth: 220 }}>
                <div className="defrag-kicker">Current pattern</div>
                <div style={{ marginTop: 6 }}>{result.field_update.field_state.dominant_pattern}</div>
              </div>
            )}
          </div>

          <div className="defrag-card" style={{ position: "relative", minHeight: 540, overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 50%, rgba(214,195,161,0.07), transparent 46%), radial-gradient(circle at 20% 20%, rgba(255,255,255,0.04), transparent 28%)" }} />
            {result ? (
              <>
                <div className="field-edge" />
                {result.field_update.visual_state.nodes.map((node) => (
                  <div
                    key={node.id}
                    className="field-node"
                    style={{
                      left: `${node.x * 100}%`,
                      top: `${node.y * 100}%`,
                      transform: `translate(-50%, -50%) scale(${node.size})`,
                    }}
                  >
                    <div className="defrag-kicker" style={{ fontSize: 11 }}>{node.role ?? "person"}</div>
                    <div style={{ fontSize: 24, fontFamily: "var(--font-display), serif" }}>{node.label}</div>
                    <div className="defrag-muted" style={{ fontSize: 13 }}>{node.state}</div>
                  </div>
                ))}
                <div style={{ position: "absolute", left: 24, bottom: 24, width: "min(420px, calc(100% - 48px))" }} className="defrag-card">
                  <div style={{ padding: 16, display: "grid", gap: 10 }}>
                    <div className="defrag-kicker">Field reading</div>
                    <div style={{ fontSize: 22, fontFamily: "var(--font-display), serif" }}>{result.assistant_message.title}</div>
                    <div className="defrag-muted" style={{ lineHeight: 1.7 }}>{result.field_update.thread.summary}</div>
                  </div>
                </div>
              </>
            ) : (
              <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", padding: 32 }}>
                <div style={{ maxWidth: 480, textAlign: "center", display: "grid", gap: 10 }}>
                  <div className="defrag-kicker">Workspace preview</div>
                  <div style={{ fontSize: 30, fontFamily: "var(--font-display), serif" }}>The visual field will appear here</div>
                  <div className="defrag-muted" style={{ lineHeight: 1.7 }}>
                    The center canvas will show the people involved, what may be happening between them, and where the situation may begin to open or close.
                  </div>
                </div>
              </div>
            )}
          </div>

          <div style={{ display: "grid", gap: 10 }}>
            <div className="defrag-kicker">What could help next</div>
            <div style={{ display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
              {(result?.assistant_message.next_steps ?? [
                "Start with what you want more of, not only what feels hard.",
                "Keep the first step simple enough that it can be heard.",
                "If the moment feels too heated, give it a little more room.",
              ]).map((step) => (
                <div key={step} className="defrag-card" style={{ padding: 14, lineHeight: 1.6 }}>
                  {step}
                </div>
              ))}
            </div>
          </div>
        </section>

        <aside className="defrag-panel defrag-branches" style={{ padding: 24, display: "grid", gap: 16, alignContent: "start" }}>
          <div style={{ display: "grid", gap: 8 }}>
            <div className="defrag-kicker">Branches</div>
            <h2 style={{ margin: 0, fontSize: 28 }}>Open other views</h2>
            <p className="defrag-muted" style={{ margin: 0, lineHeight: 1.6 }}>
              These panels let the workspace open more depth without crowding the main thread.
            </p>
          </div>

          {(result?.field_update.branch_suggestions ?? [
            { id: "other-side", label: "See from the other side", type: "perspective" },
            { id: "calmer-way", label: "A calmer way to say it", type: "phrasing" },
            { id: "family-view", label: "Family view", type: "family" },
          ]).map((branch) => (
            <div key={branch.id} className="defrag-card" style={{ padding: 16, display: "grid", gap: 10 }}>
              <div className="defrag-kicker">{branch.type}</div>
              <div style={{ fontSize: 20, fontFamily: "var(--font-display), serif" }}>{branch.label}</div>
              <div className="defrag-muted" style={{ lineHeight: 1.6 }}>
                This branch will open into its own thread so the user can follow one side of the situation without losing the main view.
              </div>
            </div>
          ))}
        </aside>
      </div>
    </main>
  );
}
