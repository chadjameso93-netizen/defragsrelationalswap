"use client";

import { useMemo, useState } from "react";
import {
  buildAnnotations,
  buildRewrite,
  buildScene,
  royalHierarchyGrammar,
  type Annotation,
  type RewritePath,
  type StoryCanvasScene,
} from "../../../../../packages/story-canvas/index";

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

type ProductRailCard = {
  id: "dynamics" | "practice" | "timeline-weather";
  title: string;
  subtitle: string;
  body: string;
  state: string;
};

type StoryCanvasView = {
  scene: StoryCanvasScene;
  annotations: Annotation[];
  rewritePath: RewritePath | null;
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

  const storyCanvas = useMemo<StoryCanvasView>(() => {
    const relationshipLabel =
      result?.field_update.participants.map((participant) => participant.name).join(" and ") || "You and your mother";

    const sharedGoal =
      result?.assistant_message.next_steps[0] ??
      "move the conversation toward clarity, steadiness, and a practical next step";

    const scene = buildScene(
      {
        relationshipLabel,
        frictionPoint: message,
        sharedGoal,
        emotionalWeather:
          result?.field_update.field_state.overall_state ?? "both people may care deeply and feel pressure at the same time",
      },
      royalHierarchyGrammar,
      { lens: "plain" },
    );

    const annotations = buildAnnotations(scene);
    const rewritePath = buildRewrite(scene, annotations)[0] ?? null;

    return {
      scene,
      annotations,
      rewritePath,
    };
  }, [message, result]);

  const placeholderPanels = useMemo<ProductRailCard[]>(() => {
    const readiness = Math.round((result?.field_update.field_state.readiness_for_repair ?? 0.42) * 100);
    const weather = result?.field_update.field_state.overall_state ?? "Field weather appears after your first read";

    return [
      {
        id: "dynamics",
        title: "Dynamics read",
        subtitle: "interaction map",
        state: "live-linked summary",
        body: `Current repair readiness is ${readiness}%. This panel tracks sequence-level pressure shifts in plain language.`,
      },
      {
        id: "practice",
        title: "Practice prompts",
        subtitle: "conversation rehearsal",
        state: "guided mode",
        body: "Use this area for low-pressure wording practice before you send a message.",
      },
      {
        id: "timeline-weather",
        title: "Timeline and field weather",
        subtitle: "sequence and climate",
        state: "session overview",
        body: `Field weather summary: ${weather}. Use this to track how tone and pressure change across the conversation.`,
      },
    ];
  }, [result]);

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
        .ws-shell { display:grid; grid-template-columns: 380px minmax(0,1fr) 380px; min-height:100vh; }
        .ws-col { border-right:1px solid rgba(255,255,255,0.08); }
        .ws-col:last-child { border-right:none; }
        .ws-left, .ws-center, .ws-right { display:grid; }
        .ws-left { grid-template-rows:auto auto 1fr; }
        .ws-center { grid-template-rows:auto 1fr auto; }
        .ws-right { align-content:start; }
        .ws-block { padding:22px; }
        .ws-header { border-bottom:1px solid rgba(255,255,255,0.08); }
        .ws-kicker { font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:rgba(246,243,238,0.46); }
        .ws-muted { color: rgba(246,243,238,0.62); }
        .ws-title { margin:0; font-size:34px; line-height:0.98; font-family: var(--font-display), serif; }
        .ws-card { border:1px solid rgba(255,255,255,0.09); background: rgba(255,255,255,0.02); }
        .ws-textarea { width:100%; min-height:140px; resize:vertical; background:#0a0a0a; color:#f6f3ee; border:1px solid rgba(255,255,255,0.12); padding:14px; line-height:1.65; }
        .ws-btn { background:#f6f3ee; color:#050505; border:none; padding:12px 16px; font-weight:600; cursor:pointer; }
        .ws-btn.secondary { background:transparent; color:#f6f3ee; border:1px solid rgba(255,255,255,0.12); }
        .ws-thread { display:grid; gap:12px; padding:0 22px 22px; align-content:start; }
        .ws-bubble { padding:14px 16px; border:1px solid rgba(255,255,255,0.08); line-height:1.7; }
        .ws-bubble.user { background: rgba(255,255,255,0.03); margin-left:auto; max-width:94%; }
        .ws-bubble.assistant { background: rgba(214,195,161,0.08); max-width:94%; }
        .ws-canvas { position:relative; overflow:hidden; min-height:560px; }
        .ws-canvas::before { content:""; position:absolute; inset:0; background:radial-gradient(circle at 50% 50%, rgba(214,195,161,0.06), transparent 40%); }
        .ws-canvas::after { content:""; position:absolute; inset:0; background-image: linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px); background-size:32px 32px; opacity:0.12; }
        .ws-node { position:absolute; width:136px; height:136px; border-radius:999px; border:1px solid rgba(255,255,255,0.16); display:flex; align-items:center; justify-content:center; flex-direction:column; backdrop-filter: blur(8px); background: rgba(255,255,255,0.02); z-index:2; }
        .ws-edge { position:absolute; left:50%; top:50%; width:240px; height:1px; background: linear-gradient(90deg, rgba(255,255,255,0.1), rgba(255,255,255,0.3), rgba(255,255,255,0.1)); transform: translate(-50%, -50%); z-index:1; }
        .ws-panel-list { display:grid; gap:12px; padding:22px; }
        .ws-tag { font-size:10px; letter-spacing:0.14em; text-transform:uppercase; color:rgba(246,243,238,0.5); }
        .ws-list { margin:0; padding-left:18px; display:grid; gap:8px; line-height:1.55; color:rgba(246,243,238,0.82); }
        @media (max-width: 1180px) {
          .ws-shell { grid-template-columns: 360px minmax(0,1fr); }
          .ws-right { border-top:1px solid rgba(255,255,255,0.08); grid-column:1 / -1; }
          .ws-panel-list { grid-template-columns: repeat(2, minmax(0,1fr)); display:grid; }
        }
        @media (max-width: 840px) {
          .ws-shell { grid-template-columns: 1fr; }
          .ws-col { border-right:none; border-bottom:1px solid rgba(255,255,255,0.08); }
          .ws-panel-list { grid-template-columns: 1fr; }
          .ws-canvas { min-height:420px; }
        }
      `}</style>

      <div className="ws-shell">
        <section className="ws-col ws-left">
          <div className="ws-block ws-header" style={{ display: "grid", gap: 10 }}>
            <div className="ws-kicker">Defrag workspace</div>
            <h1 className="ws-title">Relationship workspace</h1>
            <p className="ws-muted" style={{ margin: 0, lineHeight: 1.65 }}>
              Bring your baseline into this space to read one relationship moment clearly and choose a constructive next step.
            </p>
          </div>

          <div className="ws-block" style={{ display: "grid", gap: 12 }}>
            <div className="ws-kicker">Describe one moment</div>
            <textarea className="ws-textarea" value={message} onChange={(e) => setMessage(e.target.value)} />
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button className="ws-btn" onClick={interpret} disabled={loading}>
                {loading ? "Reading the moment..." : "Analyze this moment"}
              </button>
              <button className="ws-btn secondary" onClick={() => setMessage(INITIAL_MESSAGE)}>
                Reset example
              </button>
            </div>
          </div>

          <div style={{ display: "grid", gap: 12 }}>
            <div className="ws-block ws-header" style={{ paddingTop: 14, paddingBottom: 14 }}>
              <div className="ws-kicker">Conversation thread</div>
            </div>
            <div className="ws-thread">
              {transcript.length === 0 ? (
                <div className="ws-card" style={{ padding: 16 }}>
                  <div className="ws-muted">Run your first read to open the thread, then compare it with your baseline guidance.</div>
                </div>
              ) : (
                transcript.map((entry, index) => (
                  <div key={`${entry.role}-${index}`} className={`ws-bubble ${entry.role}`}>
                    <div className="ws-kicker" style={{ marginBottom: 8 }}>
                      {entry.role === "user" ? "You" : "Defrag"}
                    </div>
                    <div>{entry.body}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        <section className="ws-col ws-center">
          <div className="ws-block ws-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "end", gap: 12 }}>
            <div style={{ display: "grid", gap: 8 }}>
              <div className="ws-kicker">Live field</div>
              <h2 style={{ margin: 0, fontSize: 30, lineHeight: 1.08 }}>Read the interaction clearly</h2>
            </div>
            <div className="ws-card" style={{ padding: "10px 12px", minWidth: 220 }}>
              <div className="ws-kicker">Current pattern</div>
              <div style={{ marginTop: 6 }}>{result?.field_update.field_state.dominant_pattern ?? "Waiting for first read"}</div>
            </div>
          </div>

          <div className="ws-canvas ws-card">
            {result ? (
              <>
                <div className="ws-edge" />
                {result.field_update.visual_state.nodes.map((node) => (
                  <div
                    key={node.id}
                    className="ws-node"
                    style={{
                      left: `${node.x * 100}%`,
                      top: `${node.y * 100}%`,
                      transform: `translate(-50%, -50%) scale(${node.size})`,
                    }}
                  >
                    <div className="ws-kicker" style={{ fontSize: 10 }}>{node.role ?? "person"}</div>
                    <div style={{ fontSize: 24, fontFamily: "var(--font-display), serif" }}>{node.label}</div>
                    <div className="ws-muted" style={{ fontSize: 12 }}>{node.state}</div>
                  </div>
                ))}
                <div style={{ position: "absolute", left: 22, right: 22, bottom: 22, zIndex: 3 }} className="ws-card">
                  <div style={{ padding: 14, display: "grid", gap: 8 }}>
                    <div className="ws-kicker">Field reading</div>
                    <div style={{ fontSize: 20, fontFamily: "var(--font-display), serif" }}>{result.assistant_message.title}</div>
                    <div className="ws-muted" style={{ lineHeight: 1.65 }}>{result.field_update.thread.summary}</div>
                  </div>
                </div>
              </>
            ) : (
              <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", padding: 32 }}>
                <div style={{ maxWidth: 520, textAlign: "center", display: "grid", gap: 10 }}>
                  <div className="ws-kicker">Field preview</div>
                  <div style={{ fontSize: 28, fontFamily: "var(--font-display), serif" }}>Your interaction map appears here</div>
                  <div className="ws-muted" style={{ lineHeight: 1.7 }}>
                    Run your first read to map people, pressure shifts, and where the conversation may open toward repair.
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="ws-block" style={{ display: "grid", gap: 10 }}>
            <div className="ws-kicker">What could help next</div>
            <div style={{ display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
              {(result?.assistant_message.next_steps ?? [
                "Start with what you want more of, not only what feels hard.",
                "Keep the first step small enough that it can be heard.",
                "If the moment is heated, create a little more room first.",
              ]).map((step) => (
                <div key={step} className="ws-card" style={{ padding: 14, lineHeight: 1.6 }}>
                  {step}
                </div>
              ))}
            </div>
          </div>
        </section>

        <aside className="ws-col ws-right">
          <div className="ws-block ws-header" style={{ display: "grid", gap: 8 }}>
            <div className="ws-kicker">Story Canvas</div>
            <h2 style={{ margin: 0, fontSize: 26 }}>{storyCanvas.scene.title}</h2>
            <p className="ws-muted" style={{ margin: 0, lineHeight: 1.65 }}>{storyCanvas.scene.plainLanguageOverlay}</p>
            <div className="ws-tag" style={{ marginTop: 2 }}>
              Grammar: {storyCanvas.scene.grammarId}
            </div>
          </div>

          <div className="ws-panel-list">
            <section className="ws-card" style={{ padding: 14, display: "grid", gap: 10 }}>
              <div className="ws-kicker">Story beats</div>
              <ol className="ws-list">
                {storyCanvas.scene.beats.map((beat) => (
                  <li key={beat.id}>
                    <div style={{ display: "grid", gap: 6 }}>
                      <div>
                        <strong>{beat.title}.</strong> {beat.selectedOverlay}
                      </div>
                      <div className="ws-tag">Focus: {beat.focus}</div>
                      <div className="ws-muted">{beat.constructiveFrame}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section className="ws-card" style={{ padding: 14, display: "grid", gap: 10 }}>
              <div className="ws-kicker">Annotations</div>
              <ul className="ws-list" style={{ paddingLeft: 16 }}>
                {storyCanvas.annotations.map((annotation) => (
                  <li key={annotation.id}>
                    <span className="ws-tag" style={{ marginRight: 8 }}>{annotation.category}</span>
                    {annotation.message}
                  </li>
                ))}
              </ul>
            </section>

            {storyCanvas.rewritePath ? (
              <section className="ws-card" style={{ padding: 14, display: "grid", gap: 10 }}>
                <div className="ws-kicker">Constructive rewrite</div>
                <div style={{ fontWeight: 600 }}>{storyCanvas.rewritePath.title}</div>
                <div className="ws-muted" style={{ lineHeight: 1.6 }}>
                  <strong style={{ color: "#f6f3ee" }}>Before:</strong> {storyCanvas.rewritePath.before}
                </div>
                <div className="ws-muted" style={{ lineHeight: 1.6 }}>
                  <strong style={{ color: "#f6f3ee" }}>After:</strong> {storyCanvas.rewritePath.after}
                </div>
                <div className="ws-tag">{storyCanvas.rewritePath.rationale}</div>
              </section>
            ) : null}

            {placeholderPanels.map((panel) => (
              <section key={panel.id} className="ws-card" style={{ padding: 14, display: "grid", gap: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
                  <div className="ws-kicker">{panel.subtitle}</div>
                  <div className="ws-tag">{panel.state}</div>
                </div>
                <div style={{ fontSize: 20, fontFamily: "var(--font-display), serif" }}>{panel.title}</div>
                <div className="ws-muted" style={{ lineHeight: 1.6 }}>{panel.body}</div>
              </section>
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
}
