"use client";

import { useEffect, useMemo, useState } from "react";

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

const INITIAL_MESSAGE =
  "I want to talk to my mom tonight, but I think we may end up missing each other again.";

const SCENE_CONSTRAINTS: Record<"thread" | "field" | "guide", { mobileTopCopy: string; dominantIdea: string }> = {
  thread: {
    mobileTopCopy: "Start with one clear situation in plain language.",
    dominantIdea: "Name the moment before trying to solve it.",
  },
  field: {
    mobileTopCopy: "Read the live pattern before adding new details.",
    dominantIdea: "See the pattern, pressure, and next small move.",
  },
  guide: {
    mobileTopCopy: "Choose one support view, then return to the main thread.",
    dominantIdea: "Use one guide at a time to stay emotionally clear.",
  },
};

export default function FinalWorkspacePage() {
  const [message, setMessage] = useState(INITIAL_MESSAGE);
  const [session, setSession] = useState<SessionResponse | null>(null);
  const [overlayMode, setOverlayMode] = useState<"baseline" | "family" | "compare">("baseline");
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<"thread" | "field" | "guide">("thread");

  const transcript = useMemo(() => {
    if (!session) return [];
    return [
      { role: "user", body: message },
      { role: "assistant", body: session.workspace.assistant_message.body },
    ];
  }, [message, session]);

  async function loadSession(mode: "baseline" | "family" | "compare" = overlayMode) {
    setLoading(true);
    try {
      const res = await fetch("/api/workspace/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          overlayMode: mode,
          participants: [
            { id: "self", name: "You", role: "self" },
            { id: "mother", name: "Mother", role: "family" },
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
    loadSession("baseline");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function changeOverlay(mode: "baseline" | "family" | "compare") {
    setOverlayMode(mode);
    loadSession(mode);
  }

  return (
    <main style={{ minHeight: "100vh", background: "#050505", color: "#f5f2ec" }}>
      <style>{`
        .fw-shell { display:grid; grid-template-columns: 1fr; min-height:100vh; }
        .fw-col { border-bottom:1px solid rgba(255,255,255,0.07); display:none; }
        .fw-col.active { display:block; }
        .fw-top { display:flex; align-items:flex-end; justify-content:space-between; gap:14px; padding:20px 22px; border-bottom:1px solid rgba(255,255,255,0.07); }
        .fw-kicker { font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:rgba(245,242,236,0.42); }
        .fw-muted { color:rgba(245,242,236,0.62); }
        .fw-title { font-size:28px; line-height:1.08; font-family:var(--font-display), serif; text-wrap:balance; }
        .fw-chip { border:1px solid rgba(255,255,255,0.09); background:rgba(255,255,255,0.02); color:#f5f2ec; padding:9px 11px; font-size:12px; }
        .fw-chip.active { border-color:rgba(214,195,161,0.35); background:rgba(214,195,161,0.08); }
        .fw-thread { display:grid; gap:18px; padding:22px; }
        .fw-msg { display:grid; gap:10px; }
        .fw-msg.assistant { grid-template-columns:34px minmax(0,1fr); }
        .fw-msg.user { grid-template-columns:minmax(0,1fr) 34px; }
        .fw-avatar { width:34px; height:34px; border-radius:50%; border:1px solid rgba(255,255,255,0.1); background:rgba(255,255,255,0.03); display:grid; place-items:center; font-size:11px; color:rgba(245,242,236,0.72); }
        .fw-bubble { border:1px solid rgba(255,255,255,0.08); padding:16px 18px; line-height:1.74; }
        .fw-bubble.assistant { background:rgba(214,195,161,0.08); }
        .fw-bubble.user { background:rgba(255,255,255,0.02); }
        .fw-card { border:1px solid rgba(255,255,255,0.08); background:linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015)); }
        .fw-composer { padding:18px 22px 24px; border-top:1px solid rgba(255,255,255,0.07); margin-top:auto; }
        .fw-input { width:100%; min-height:110px; resize:vertical; border:1px solid rgba(255,255,255,0.1); background:#0a0a0a; color:#f5f2ec; padding:15px; }
        .fw-btn { border:none; background:#f5f2ec; color:#050505; padding:12px 16px; font-weight:600; }
        .fw-btn.secondary { background:transparent; color:#f5f2ec; border:1px solid rgba(255,255,255,0.1); }
        .fw-main { display:grid; grid-template-rows:auto 1fr auto; }
        .fw-canvas { position:relative; overflow:hidden; min-height:560px; }
        .fw-canvas::before { content:""; position:absolute; inset:0; background:radial-gradient(circle at 50% 50%, rgba(214,195,161,0.10), transparent 34%), radial-gradient(circle at 22% 22%, rgba(255,255,255,0.06), transparent 26%), radial-gradient(circle at 76% 72%, rgba(255,255,255,0.04), transparent 24%); }
        .fw-canvas::after { content:""; position:absolute; inset:0; background-image:linear-gradient(rgba(255,255,255,0.024) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.024) 1px, transparent 1px); background-size:34px 34px; opacity:0.1; }
        .fw-line { position:absolute; left:50%; top:50%; width:320px; height:2px; transform:translate(-50%, -50%); background:linear-gradient(90deg, rgba(214,195,161,0), rgba(214,195,161,0.35), rgba(255,255,255,0.42), rgba(214,195,161,0.35), rgba(214,195,161,0)); overflow:hidden; }
        .fw-line::after { content:""; position:absolute; left:-25%; top:0; bottom:0; width:25%; background:linear-gradient(90deg, transparent, rgba(255,255,255,0.65), transparent); animation:fwSweep 2.9s linear infinite; }
        .fw-node { position:absolute; width:150px; height:150px; border-radius:999px; display:grid; place-items:center; text-align:center; border:1px solid rgba(255,255,255,0.14); background:radial-gradient(circle at center, rgba(255,255,255,0.08), rgba(255,255,255,0.015)); backdrop-filter:blur(8px); animation:fwFloat 5.1s ease-in-out infinite; }
        .fw-node::before { content:""; position:absolute; inset:-14px; border-radius:999px; border:1px solid rgba(214,195,161,0.14); animation:fwPulse 3.2s ease-in-out infinite; }
        .fw-info { position:absolute; left:22px; right:22px; bottom:22px; display:grid; gap:10px; }
        .fw-step { padding:12px 14px; border:1px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.02); line-height:1.62; }
        .fw-right { padding:22px; display:grid; gap:16px; align-content:start; }
        .fw-tooltip { padding:10px 12px; border:1px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.02); font-size:13px; color:rgba(245,242,236,0.74); }
        .fw-scene-focus { margin: 0 22px 0; padding: 12px 14px; border:1px solid rgba(214,195,161,0.2); background:rgba(214,195,161,0.06); display:grid; gap:6px; }
        .fw-tabbar { position:sticky; bottom:0; display:grid; grid-template-columns:repeat(3,1fr); border-top:1px solid rgba(255,255,255,0.07); background:rgba(5,5,5,0.96); }
        .fw-tabbtn { border:none; background:transparent; color:#f5f2ec; padding:16px 12px; min-height:52px; font-size:14px; }
        .fw-tabbtn.active { background:rgba(214,195,161,0.08); }
        @keyframes fwSweep { from { left:-25%; } to { left:100%; } }
        @keyframes fwPulse { 0%, 100% { transform:scale(1); opacity:0.4; } 50% { transform:scale(1.05); opacity:0.72; } }
        @keyframes fwFloat { 0%, 100% { transform:translate(-50%, -50%) translateY(0px); } 50% { transform:translate(-50%, -50%) translateY(-4px); } }
        @media (min-width: 1101px) {
          .fw-shell { grid-template-columns: 420px minmax(0,1fr) 360px; }
          .fw-col { border-right:1px solid rgba(255,255,255,0.07); border-bottom:none; display:block; }
          .fw-col:last-child { border-right:none; }
          .fw-scene-focus { display:none; }
          .fw-tabbar { display:none; }
          .fw-title { font-size:32px; line-height:1.04; }
          .fw-canvas::before { background:radial-gradient(circle at 50% 50%, rgba(214,195,161,0.10), transparent 34%), radial-gradient(circle at 20% 18%, rgba(255,255,255,0.06), transparent 30%), radial-gradient(circle at 82% 76%, rgba(255,255,255,0.04), transparent 28%); }
        }
      `}</style>

      <div className="fw-shell">
        <section className={`fw-col ${tab === "thread" ? "active" : ""}`}>
          <div className="fw-top">
            <div style={{ display: "grid", gap: 6 }}>
              <div className="fw-kicker">Defrag workspace</div>
              <div className="fw-title">Relationship workspace</div>
            </div>
            <div className="fw-chip" title="The thread stays simple, human, and free of labels.">Simple language</div>
          </div>
          <div className="fw-thread">
            <div className="fw-card" style={{ padding: 14, display: "grid", gap: 8 }}>
              <div className="fw-kicker">What this space does</div>
              <div className="fw-muted" style={{ lineHeight: 1.65 }}>Helps you see what may be happening, what each person may be carrying, and what could help next.</div>
            </div>
            {transcript.map((entry, index) => (
              <div key={`${entry.role}-${index}`} className={`fw-msg ${entry.role}`}>
                {entry.role === "assistant" ? <div className="fw-avatar">DF</div> : null}
                <div className={`fw-bubble ${entry.role}`}>
                  <div className="fw-kicker" style={{ marginBottom: 8 }}>{entry.role === "assistant" ? "Defrag" : "You"}</div>
                  <div>{entry.body}</div>
                </div>
                {entry.role === "user" ? <div className="fw-avatar">YU</div> : null}
              </div>
            ))}
          </div>
          <div className="fw-composer">
            <div style={{ display: "grid", gap: 12 }}>
              <textarea className="fw-input" value={message} onChange={(e) => setMessage(e.target.value)} />
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button className="fw-btn" onClick={() => loadSession()} disabled={loading}>{loading ? "Reading the situation..." : "Update the field"}</button>
                <button className="fw-btn secondary" onClick={() => setMessage(INITIAL_MESSAGE)}>Reset example</button>
              </div>
            </div>
          </div>
        </section>

        <section className={`fw-col fw-main ${tab === "field" ? "active" : ""}`}>
          <div className="fw-top">
            <div style={{ display: "grid", gap: 8 }}>
              <div className="fw-kicker">Live field</div>
              <div className="fw-title">See the situation more clearly</div>
            </div>
            <div style={{ display: "grid", gap: 8 }}>
              <div className="fw-chip" title="This is the path the situation may keep falling into right now.">{session?.workspace.field_update.field_state.dominant_pattern ?? "Loading"}</div>
              <div className="fw-chip" title="This is a simple read on how open the situation may be to a healthier next step right now.">Opening: {Math.round((session?.workspace.field_update.field_state.readiness_for_repair ?? 0.42) * 100)}%</div>
            </div>
          </div>
          <div className="fw-canvas">
            <div className="fw-line" />
            {(session?.workspace.field_update.visual_state.nodes ?? []).map((node) => (
              <div key={node.id} className="fw-node" style={{ left: `${node.x * 100}%`, top: `${node.y * 100}%` }}>
                <div className="fw-kicker" style={{ fontSize: 10 }}>{node.role ?? "person"}</div>
                <div style={{ fontSize: 28, fontFamily: "var(--font-display), serif" }}>{node.label}</div>
                <div className="fw-muted" style={{ fontSize: 13 }}>{node.state}</div>
              </div>
            ))}
            <div className="fw-info">
              <div className="fw-card" style={{ padding: 16, display: "grid", gap: 10 }}>
                <div className="fw-kicker">Field reading</div>
                <div style={{ fontSize: 24, fontFamily: "var(--font-display), serif" }}>{session?.workspace.assistant_message.title ?? "Reading the situation"}</div>
                <div className="fw-muted" style={{ lineHeight: 1.7 }}>{session?.workspace.field_update.thread.summary ?? "Loading summary"}</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 10 }}>
                {(session?.workspace.assistant_message.next_steps ?? []).map((step) => (
                  <div key={step} className="fw-step">{step}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <aside className={`fw-col fw-right ${tab === "guide" ? "active" : ""}`}>
          <div style={{ display: "grid", gap: 8 }}>
            <div className="fw-kicker">Guided views</div>
            <div className="fw-title" style={{ fontSize: 28 }}>Branches and overlays</div>
            <div className="fw-muted" style={{ lineHeight: 1.65 }}>Use the overlays for simpler explainers, and the focused thread for one side of the situation.</div>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {[
              { id: "baseline", label: "Baseline" },
              { id: "family", label: "Family" },
              { id: "compare", label: "Compare" },
            ].map((item) => (
              <button key={item.id} className={`fw-chip ${overlayMode === item.id ? "active" : ""}`} onClick={() => changeOverlay(item.id as "baseline" | "family" | "compare")}>{item.label}</button>
            ))}
          </div>
          <div className="fw-card" style={{ padding: 16, display: "grid", gap: 10 }}>
            <div className="fw-kicker">{session?.overlay.title ?? "Overlay"}</div>
            <div className="fw-muted" style={{ lineHeight: 1.7 }}>{session?.overlay.body ?? "Loading overlay"}</div>
            <div style={{ display: "grid", gap: 10 }}>
              {(session?.overlay.cards ?? []).map((card) => (
                <div key={card.label} className="fw-step">
                  <div className="fw-kicker" style={{ marginBottom: 6 }}>{card.label}</div>
                  <div>{card.value}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="fw-card" style={{ padding: 16, display: "grid", gap: 12 }}>
            <div className="fw-kicker">Focused thread</div>
            <div style={{ fontSize: 22, fontFamily: "var(--font-display), serif" }}>{session?.branch.title ?? "Loading branch"}</div>
            <div className="fw-muted" style={{ lineHeight: 1.7 }}>{session?.branch.body ?? "Loading branch"}</div>
            <div style={{ display: "grid", gap: 10 }}>
              {(session?.branch.suggestions ?? []).map((item) => (
                <div key={item} className="fw-step">{item}</div>
              ))}
            </div>
          </div>
          <div className="fw-card" style={{ padding: 16, display: "grid", gap: 10 }}>
            <div className="fw-kicker">Simple explainers</div>
            <div className="fw-tooltip" title="What each person may be carrying means what may already be shaping how they hear the moment before the words are even finished.">What each person may be carrying</div>
            <div className="fw-tooltip" title="What keeps repeating means the path the situation tends to fall into again and again.">What keeps repeating</div>
            <div className="fw-tooltip" title="What could help next means a small step that may make the situation easier to understand, not a guaranteed result.">What could help next</div>
          </div>
        </aside>
      </div>

      <div className="fw-scene-focus">
        <div className="fw-kicker">{SCENE_CONSTRAINTS[tab].mobileTopCopy}</div>
        <div style={{ lineHeight: 1.6 }}>{SCENE_CONSTRAINTS[tab].dominantIdea}</div>
      </div>

      <div className="fw-tabbar">
        <button className={`fw-tabbtn ${tab === "thread" ? "active" : ""}`} onClick={() => setTab("thread")}>Thread</button>
        <button className={`fw-tabbtn ${tab === "field" ? "active" : ""}`} onClick={() => setTab("field")}>Field</button>
        <button className={`fw-tabbtn ${tab === "guide" ? "active" : ""}`} onClick={() => setTab("guide")}>Guide</button>
      </div>
    </main>
  );
}
