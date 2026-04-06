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

const INITIAL_MESSAGE = "I want to talk to my mom tonight, but I think we may end up missing each other again.";

export default function WorkspacePage() {
  const [message, setMessage] = useState(INITIAL_MESSAGE);
  const [result, setResult] = useState<WorkspaceResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [showAllBeats, setShowAllBeats] = useState(false);
  const [showAllAnnotations, setShowAllAnnotations] = useState(false);
  const [showRewriteDetails, setShowRewriteDetails] = useState(false);

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

    const sharedGoal = result?.assistant_message.next_steps[0] ?? "move the conversation toward clarity, steadiness, and a practical next step";

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
        .ws-page { min-height: 100vh; background: radial-gradient(980px 660px at 68% 4%, rgba(214,195,161,0.1), transparent 68%), radial-gradient(760px 520px at 14% 18%, rgba(255,255,255,0.05), transparent 70%), linear-gradient(162deg, #080808, #050505 52%, #090909); }
        .ws-shell { width: min(1640px, 100%); margin: 0 auto; padding: 20px clamp(14px, 2.2vw, 32px) 28px; display: grid; grid-template-columns: 380px minmax(0,1fr) 400px; gap: 14px; min-height: 100vh; }
        .ws-col { border: 1px solid rgba(255,255,255,0.09); background: rgba(255,255,255,0.025); backdrop-filter: blur(10px); min-height: calc(100vh - 48px); }
        .ws-block { padding: 20px; }
        .ws-divider { border-top: 1px solid rgba(255,255,255,0.08); }
        .ws-kicker { font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(246,243,238,0.44); }
        .ws-muted { color: rgba(246,243,238,0.66); }
        .ws-title { margin: 0; font-family: var(--font-display), serif; font-size: 36px; line-height: 0.94; }

        .ws-textarea { width: 100%; min-height: 150px; resize: vertical; background: rgba(0,0,0,0.34); color: #f6f3ee; border: 1px solid rgba(255,255,255,0.12); padding: 14px; line-height: 1.68; }
        .ws-textarea:focus { outline: 1px solid rgba(214,195,161,0.36); border-color: rgba(214,195,161,0.4); }
        .ws-row { display: flex; gap: 10px; flex-wrap: wrap; }
        .ws-btn { border: 1px solid rgba(255,255,255,0.1); background: #f6f3ee; color: #050505; padding: 12px 15px; font-weight: 600; cursor: pointer; }
        .ws-btn.secondary { background: rgba(255,255,255,0.03); color: #f6f3ee; }

        .ws-thread { display: grid; gap: 10px; }
        .ws-bubble { padding: 14px; border: 1px solid rgba(255,255,255,0.1); line-height: 1.68; background: rgba(255,255,255,0.035); }
        .ws-bubble.user { margin-left: auto; max-width: 95%; }
        .ws-bubble.assistant { max-width: 95%; background: linear-gradient(145deg, rgba(214,195,161,0.18), rgba(255,255,255,0.035)); }

        .ws-center { display: grid; grid-template-rows: auto minmax(520px, 1fr) auto; }
        .ws-canvas { position: relative; overflow: hidden; margin: 0 20px 20px; border: 1px solid rgba(255,255,255,0.1); background: radial-gradient(circle at 24% 24%, rgba(255,255,255,0.08), transparent 34%), radial-gradient(circle at 72% 68%, rgba(214,195,161,0.14), transparent 44%), linear-gradient(168deg, rgba(255,255,255,0.04), rgba(255,255,255,0.015)); }
        .ws-canvas::after { content: ''; position: absolute; inset: 0; opacity: 0.14; background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px); background-size: 32px 32px; }
        .ws-edge { position: absolute; left: 50%; top: 50%; width: 250px; height: 2px; transform: translate(-50%, -50%); background: linear-gradient(90deg, rgba(214,195,161,0), rgba(214,195,161,0.34), rgba(255,255,255,0.7), rgba(214,195,161,0.34), rgba(214,195,161,0)); z-index: 2; }
        .ws-node { position: absolute; width: 140px; height: 140px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.16); background: radial-gradient(circle at center, rgba(255,255,255,0.1), rgba(255,255,255,0.02)); display: grid; place-items: center; text-align: center; z-index: 3; box-shadow: 0 0 50px rgba(214,195,161,0.08); }
        .ws-summary { position: absolute; left: 18px; right: 18px; bottom: 18px; z-index: 3; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.04); padding: 14px; }

        .ws-steps { margin: 0 20px 20px; display: grid; gap: 10px; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }
        .ws-step { border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.03); padding: 14px; line-height: 1.64; }

        .ws-side-list { padding: 20px; display: grid; gap: 12px; align-content: start; }
        .ws-card { border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.032); padding: 14px; display: grid; gap: 8px; }
        .ws-list { margin: 0; padding-left: 18px; display: grid; gap: 8px; line-height: 1.6; color: rgba(246,243,238,0.82); }
        .ws-tag { font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(246,243,238,0.52); }
        .ws-rail { gap: 14px; }
        .ws-rail-card { padding: 16px; gap: 10px; }
        .ws-panel-head { display: flex; justify-content: space-between; gap: 10px; align-items: baseline; }
        .ws-section-intro { margin: 0; color: rgba(246,243,238,0.72); line-height: 1.68; font-size: 14px; }
        .ws-story-list { padding-left: 16px; gap: 10px; }
        .ws-story-item { border-left: 1px solid rgba(255,255,255,0.12); padding-left: 12px; margin-left: 2px; display: grid; gap: 7px; }
        .ws-reveal-row { display: flex; justify-content: space-between; align-items: center; gap: 10px; }
        .ws-reveal-btn { border: 1px solid rgba(214,195,161,0.36); background: rgba(214,195,161,0.08); color: #f6f3ee; padding: 6px 10px; font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer; transition: background 120ms ease, border-color 120ms ease; }
        .ws-reveal-btn:hover { background: rgba(214,195,161,0.16); border-color: rgba(214,195,161,0.54); }
        .ws-reveal-btn.quiet { border-color: rgba(255,255,255,0.22); background: rgba(255,255,255,0.05); }
        .ws-rewrite-shell { display: grid; gap: 8px; border-top: 1px solid rgba(255,255,255,0.12); padding-top: 10px; }
        .ws-fade-out { position: relative; max-height: 96px; overflow: hidden; }
        .ws-fade-out::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 42px; background: linear-gradient(180deg, rgba(5,5,5,0), rgba(5,5,5,0.94)); pointer-events: none; }

        @media (max-width: 1320px) {
          .ws-shell { grid-template-columns: 360px minmax(0,1fr); }
          .ws-right { grid-column: 1 / -1; min-height: auto; }
          .ws-side-list { grid-template-columns: repeat(2, minmax(0,1fr)); }
        }
        @media (max-width: 900px) {
          .ws-shell { grid-template-columns: 1fr; }
          .ws-col { min-height: auto; }
          .ws-side-list { grid-template-columns: 1fr; }
          .ws-canvas { min-height: 420px; }
        }
      `}</style>

      <div className="ws-page">
        <div className="ws-shell">
          <section className="ws-col">
            <div className="ws-block" style={{ display: "grid", gap: 10 }}>
              <div className="ws-kicker">Defrag workspace</div>
              <h1 className="ws-title">Relationship environment</h1>
              <p className="ws-muted" style={{ margin: 0, lineHeight: 1.72 }}>
                Bring one difficult moment into view, read it clearly, then choose a practical next move.
              </p>
            </div>

            <div className="ws-divider ws-block" style={{ display: "grid", gap: 12 }}>
              <div className="ws-kicker">Describe one moment</div>
              <textarea className="ws-textarea" value={message} onChange={(e) => setMessage(e.target.value)} />
              <div className="ws-row">
                <button className="ws-btn" onClick={interpret} disabled={loading}>
                  {loading ? "Reading the moment..." : "Analyze this moment"}
                </button>
                <button className="ws-btn secondary" onClick={() => setMessage(INITIAL_MESSAGE)}>
                  Reset example
                </button>
              </div>
            </div>

            <div className="ws-divider ws-block" style={{ display: "grid", gap: 10 }}>
              <div className="ws-kicker">Thread</div>
              <div className="ws-thread">
                {transcript.length === 0 ? (
                  <div className="ws-bubble">
                    <div className="ws-muted">Run your first read to open a plain-language thread of what may be happening.</div>
                  </div>
                ) : (
                  transcript.map((entry, index) => (
                    <div key={`${entry.role}-${index}`} className={`ws-bubble ${entry.role}`}>
                      <div className="ws-kicker" style={{ marginBottom: 8 }}>
                        {entry.role === "user" ? "You" : "Defrag"}
                      </div>
                      {entry.body}
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>

          <section className="ws-col ws-center">
            <div className="ws-block" style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "end" }}>
              <div style={{ display: "grid", gap: 8 }}>
                <div className="ws-kicker">Live field</div>
                <div style={{ fontSize: 34, lineHeight: 0.94, fontFamily: "var(--font-display), serif" }}>Read the interaction clearly</div>
              </div>
              <div className="ws-card" style={{ minWidth: 240 }}>
                <div className="ws-kicker">Current pattern</div>
                <div style={{ marginTop: 6 }}>{result?.field_update.field_state.dominant_pattern ?? "Waiting for first read"}</div>
              </div>
            </div>

            <div className="ws-canvas">
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
                      <div className="ws-kicker" style={{ fontSize: 10 }}>
                        {node.role ?? "person"}
                      </div>
                      <div style={{ fontSize: 26, fontFamily: "var(--font-display), serif" }}>{node.label}</div>
                      <div className="ws-muted" style={{ fontSize: 12 }}>
                        {node.state}
                      </div>
                    </div>
                  ))}
                  <div className="ws-summary">
                    <div className="ws-kicker">Field reading</div>
                    <div style={{ fontSize: 22, fontFamily: "var(--font-display), serif", marginTop: 4 }}>{result.assistant_message.title}</div>
                    <div className="ws-muted" style={{ lineHeight: 1.68, marginTop: 6 }}>
                      {result.field_update.thread.summary}
                    </div>
                  </div>
                </>
              ) : (
                <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", padding: 30 }}>
                  <div style={{ display: "grid", gap: 10, textAlign: "center", maxWidth: 520 }}>
                    <div className="ws-kicker">Field preview</div>
                    <div style={{ fontSize: 32, lineHeight: 0.94, fontFamily: "var(--font-display), serif" }}>Your interaction map appears here</div>
                    <div className="ws-muted" style={{ lineHeight: 1.74 }}>
                      Analyze one moment to map people, pressure shifts, and a calmer direction for the conversation.
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="ws-steps">
              {(result?.assistant_message.next_steps ?? [
                "Start with what you want more of, not only what feels hard.",
                "Keep the first step small enough that it can be heard.",
                "If the moment is heated, create a little more room first.",
              ]).map((step) => (
                <div key={step} className="ws-step">
                  {step}
                </div>
              ))}
            </div>
          </section>

          <aside className="ws-col ws-right">
            <div className="ws-block" style={{ display: "grid", gap: 8 }}>
              <div className="ws-kicker">Story Canvas</div>
              <h2 style={{ margin: 0, fontSize: 28, lineHeight: 1.04 }}>{storyCanvas.scene.title}</h2>
              <p className="ws-muted" style={{ margin: 0, lineHeight: 1.7 }}>
                {storyCanvas.scene.plainLanguageOverlay}
              </p>
              <div className="ws-tag">Grammar: {storyCanvas.scene.grammarId}</div>
            </div>

            <div className="ws-divider ws-side-list ws-rail">
              <section className="ws-card ws-rail-card">
                <div className="ws-panel-head">
                  <div className="ws-kicker">Story beats</div>
                  <button
                    className="ws-reveal-btn quiet"
                    type="button"
                    onClick={() => setShowAllBeats((current) => !current)}
                  >
                    {showAllBeats ? "Condense" : "Expand"}
                  </button>
                </div>
                <p className="ws-section-intro">Ordered movement through pressure, signal, and practical next shape.</p>
                <ol className="ws-list ws-story-list">
                  {(showAllBeats ? storyCanvas.scene.beats : storyCanvas.scene.beats.slice(0, 2)).map((beat) => (
                    <li key={beat.id}>
                      <div className="ws-story-item">
                        <div>
                          <strong>{beat.title}.</strong> {beat.selectedOverlay}
                        </div>
                        <div className="ws-tag">Focus: {beat.focus}</div>
                        <div className="ws-muted">{beat.constructiveFrame}</div>
                      </div>
                    </li>
                  ))}
                </ol>
                {!showAllBeats && storyCanvas.scene.beats.length > 2 ? (
                  <div className="ws-reveal-row">
                    <div className="ws-tag">{storyCanvas.scene.beats.length - 2} more beats available</div>
                    <button className="ws-reveal-btn" type="button" onClick={() => setShowAllBeats(true)}>
                      Show next beats
                    </button>
                  </div>
                ) : null}
              </section>

              <section className="ws-card ws-rail-card">
                <div className="ws-panel-head">
                  <div className="ws-kicker">Annotations</div>
                  <button
                    className="ws-reveal-btn quiet"
                    type="button"
                    onClick={() => setShowAllAnnotations((current) => !current)}
                  >
                    {showAllAnnotations ? "Condense" : "Expand"}
                  </button>
                </div>
                <p className={`ws-section-intro ${showAllAnnotations ? "" : "ws-fade-out"}`}>
                  Focus notes mark leverage points where wording or pacing can reduce friction.
                </p>
                <ul className="ws-list" style={{ paddingLeft: 16 }}>
                  {(showAllAnnotations ? storyCanvas.annotations : storyCanvas.annotations.slice(0, 3)).map((annotation) => (
                    <li key={annotation.id}>
                      <span className="ws-tag" style={{ marginRight: 8 }}>
                        {annotation.category}
                      </span>
                      {annotation.message}
                    </li>
                  ))}
                </ul>
                {!showAllAnnotations && storyCanvas.annotations.length > 3 ? (
                  <div className="ws-reveal-row">
                    <div className="ws-tag">{storyCanvas.annotations.length - 3} more annotations</div>
                    <button className="ws-reveal-btn" type="button" onClick={() => setShowAllAnnotations(true)}>
                      Reveal full set
                    </button>
                  </div>
                ) : null}
              </section>

              {storyCanvas.rewritePath ? (
                <section className="ws-card ws-rail-card">
                  <div className="ws-panel-head">
                    <div className="ws-kicker">Constructive rewrite</div>
                    <button
                      className="ws-reveal-btn quiet"
                      type="button"
                      onClick={() => setShowRewriteDetails((current) => !current)}
                    >
                      {showRewriteDetails ? "Hide detail" : "Open detail"}
                    </button>
                  </div>
                  <div style={{ fontWeight: 600 }}>{storyCanvas.rewritePath.title}</div>
                  {showRewriteDetails ? (
                    <div className="ws-rewrite-shell">
                      <div className="ws-muted" style={{ lineHeight: 1.72 }}>
                        <strong style={{ color: "#f6f3ee" }}>Before:</strong> {storyCanvas.rewritePath.before}
                      </div>
                      <div className="ws-muted" style={{ lineHeight: 1.72 }}>
                        <strong style={{ color: "#f6f3ee" }}>After:</strong> {storyCanvas.rewritePath.after}
                      </div>
                      <div className="ws-tag">{storyCanvas.rewritePath.rationale}</div>
                    </div>
                  ) : (
                    <div className="ws-muted ws-fade-out" style={{ lineHeight: 1.68 }}>
                      {storyCanvas.rewritePath.after}
                    </div>
                  )}
                </section>
              ) : null}

              {placeholderPanels.map((panel) => (
                <section key={panel.id} className="ws-card">
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
                    <div className="ws-kicker">{panel.subtitle}</div>
                    <div className="ws-tag">{panel.state}</div>
                  </div>
                  <div style={{ fontSize: 21, lineHeight: 1.04, fontFamily: "var(--font-display), serif" }}>{panel.title}</div>
                  <div className="ws-muted" style={{ lineHeight: 1.64 }}>
                    {panel.body}
                  </div>
                </section>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
