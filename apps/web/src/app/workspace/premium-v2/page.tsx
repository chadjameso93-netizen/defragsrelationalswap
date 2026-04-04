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

type BranchResponse = {
  title: string;
  body: string;
  suggestions: string[];
};

type OverlayResponse = {
  title: string;
  body: string;
  cards: Array<{
    label: string;
    value: string;
  }>;
};

const INITIAL_MESSAGE =
  "I want to talk to my mom tonight, but I think we may end up missing each other again.";

export default function PremiumWorkspaceV2Page() {
  const [message, setMessage] = useState(INITIAL_MESSAGE);
  const [result, setResult] = useState<WorkspaceResponse | null>(null);
  const [branch, setBranch] = useState<BranchResponse | null>(null);
  const [overlay, setOverlay] = useState<OverlayResponse | null>(null);
  const [selectedBranchId, setSelectedBranchId] = useState<string | null>(null);
  const [selectedOverlayMode, setSelectedOverlayMode] = useState<"baseline" | "family" | "compare">("baseline");
  const [loading, setLoading] = useState(false);
  const [branchLoading, setBranchLoading] = useState(false);
  const [overlayLoading, setOverlayLoading] = useState(false);

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
      openOverlay(selectedOverlayMode);
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

  async function openOverlay(mode: "baseline" | "family" | "compare") {
    setSelectedOverlayMode(mode);
    setOverlayLoading(true);
    try {
      const res = await fetch("/api/workspace/overlay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, message }),
      });
      const data = (await res.json()) as OverlayResponse;
      setOverlay(data);
    } finally {
      setOverlayLoading(false);
    }
  }

  useEffect(() => {
    interpret();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main style={{ minHeight: "100vh", background: "#050505", color: "#f5f2ec" }}>
      <style>{`
        .v2-shell { display:grid; grid-template-columns: 430px minmax(0,1fr) 360px; min-height:100vh; }
        .v2-col { border-right:1px solid rgba(255,255,255,0.07); }
        .v2-col:last-child { border-right:none; }
        .v2-top { display:flex; align-items:flex-end; justify-content:space-between; gap:16px; padding:20px 22px; border-bottom:1px solid rgba(255,255,255,0.07); }
        .v2-kicker { font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:rgba(245,242,236,0.42); }
        .v2-muted { color:rgba(245,242,236,0.62); }
        .v2-title { font-size:30px; font-family:var(--font-display), serif; line-height:1.05; }
        .v2-chip { border:1px solid rgba(255,255,255,0.09); background:rgba(255,255,255,0.02); color:#f5f2ec; padding:9px 11px; font-size:12px; }
        .v2-chip.active { border-color:rgba(214,195,161,0.35); background:rgba(214,195,161,0.08); }
        .v2-thread { display:grid; gap:18px; padding:22px; }
        .v2-msg { display:grid; gap:10px; }
        .v2-msg.assistant { grid-template-columns:34px minmax(0,1fr); }
        .v2-msg.user { grid-template-columns:minmax(0,1fr) 34px; }
        .v2-avatar { width:34px; height:34px; border-radius:50%; border:1px solid rgba(255,255,255,0.1); display:grid; place-items:center; font-size:11px; color:rgba(245,242,236,0.75); background:rgba(255,255,255,0.03); }
        .v2-bubble { border:1px solid rgba(255,255,255,0.08); padding:16px 18px; line-height:1.74; }
        .v2-bubble.assistant { background:rgba(214,195,161,0.08); }
        .v2-bubble.user { background:rgba(255,255,255,0.02); }
        .v2-card { border:1px solid rgba(255,255,255,0.08); background:linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015)); }
        .v2-composer { padding:18px 22px 24px; border-top:1px solid rgba(255,255,255,0.07); margin-top:auto; }
        .v2-input { width:100%; min-height:120px; resize:vertical; border:1px solid rgba(255,255,255,0.1); background:#0a0a0a; color:#f5f2ec; padding:15px; }
        .v2-btn { border:none; background:#f5f2ec; color:#050505; padding:12px 16px; font-weight:600; }
        .v2-btn.secondary { background:transparent; color:#f5f2ec; border:1px solid rgba(255,255,255,0.1); }
        .v2-main { display:grid; grid-template-rows:auto 1fr auto; }
        .v2-canvas { position:relative; overflow:hidden; min-height:560px; }
        .v2-canvas::before { content:""; position:absolute; inset:0; background:radial-gradient(circle at 50% 50%, rgba(214,195,161,0.09), transparent 34%), radial-gradient(circle at 22% 22%, rgba(255,255,255,0.06), transparent 26%), radial-gradient(circle at 75% 72%, rgba(255,255,255,0.04), transparent 24%); }
        .v2-canvas::after { content:""; position:absolute; inset:0; background-image:linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px); background-size:34px 34px; opacity:0.1; }
        .v2-node { position:absolute; width:150px; height:150px; border-radius:999px; display:grid; place-items:center; text-align:center; border:1px solid rgba(255,255,255,0.14); background:radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08), rgba(255,255,255,0.015)); backdrop-filter:blur(8px); animation:v2Float 5.2s ease-in-out infinite; }
        .v2-node::before { content:""; position:absolute; inset:-14px; border-radius:999px; border:1px solid rgba(214,195,161,0.14); animation:v2Pulse 3.1s ease-in-out infinite; }
        .v2-line { position:absolute; left:50%; top:50%; width:300px; height:2px; transform:translate(-50%, -50%); background:linear-gradient(90deg, rgba(214,195,161,0), rgba(214,195,161,0.35), rgba(255,255,255,0.42), rgba(214,195,161,0.35), rgba(214,195,161,0)); overflow:hidden; }
        .v2-line::after { content:""; position:absolute; left:-25%; top:0; bottom:0; width:25%; background:linear-gradient(90deg, transparent, rgba(255,255,255,0.65), transparent); animation:v2Sweep 2.8s linear infinite; }
        .v2-info { position:absolute; left:22px; right:22px; bottom:22px; display:grid; gap:10px; }
        .v2-step { padding:12px 14px; border:1px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.02); line-height:1.62; }
        .v2-side { padding:22px; display:grid; gap:16px; align-content:start; }
        .v2-list { display:grid; gap:10px; }
        .v2-branch { text-align:left; padding:14px; border:1px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.02); }
        .v2-branch.active { border-color:rgba(214,195,161,0.35); background:rgba(214,195,161,0.08); }
        .v2-tooltip { padding:10px 12px; border:1px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.02); font-size:13px; color:rgba(245,242,236,0.74); }
        @keyframes v2Sweep { from { left:-25%; } to { left:100%; } }
        @keyframes v2Pulse { 0%, 100% { transform:scale(1); opacity:0.4; } 50% { transform:scale(1.05); opacity:0.72; } }
        @keyframes v2Float { 0%, 100% { transform:translate(-50%, -50%) translateY(0px); } 50% { transform:translate(-50%, -50%) translateY(-5px); } }
        @media (max-width: 1100px) {
          .v2-shell { grid-template-columns: 390px minmax(0,1fr); }
          .v2-col:last-child { display:none; }
        }
        @media (max-width: 840px) {
          .v2-shell { grid-template-columns:1fr; }
          .v2-col { border-right:none; border-bottom:1px solid rgba(255,255,255,0.07); }
        }
      `}</style>

      <div className="v2-shell">
        <section className="v2-col" style={{ display: "grid", gridTemplateRows: "auto 1fr auto" }}>
          <div className="v2-top">
            <div style={{ display: "grid", gap: 6 }}>
              <div className="v2-kicker">Defrag workspace</div>
              <div className="v2-title">Relationship workspace</div>
            </div>
            <div className="v2-chip" title="The thread uses simple language and explains patterns without labels.">Simple language</div>
          </div>

          <div className="v2-thread">
            <div className="v2-card" style={{ padding: 14, display: "grid", gap: 8 }}>
              <div className="v2-kicker">What this space does</div>
              <div className="v2-muted" style={{ lineHeight: 1.65 }}>
                Helps you see what may be happening, what each person may be carrying, and what could help next.
              </div>
            </div>

            {transcript.map((entry, index) => (
              <div key={`${entry.role}-${index}`} className={`v2-msg ${entry.role}`}>
                {entry.role === "assistant" ? <div className="v2-avatar">DF</div> : null}
                <div className={`v2-bubble ${entry.role}`}>
                  <div className="v2-kicker" style={{ marginBottom: 8 }}>{entry.role === "assistant" ? "Defrag" : "You"}</div>
                  <div>{entry.body}</div>
                </div>
                {entry.role === "user" ? <div className="v2-avatar">YU</div> : null}
              </div>
            ))}
          </div>

          <div className="v2-composer">
            <div style={{ display: "grid", gap: 12 }}>
              <textarea className="v2-input" value={message} onChange={(e) => setMessage(e.target.value)} />
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button className="v2-btn" onClick={interpret} disabled={loading}>{loading ? "Reading the situation..." : "Update the field"}</button>
                <button className="v2-btn secondary" onClick={() => setMessage(INITIAL_MESSAGE)}>Reset example</button>
              </div>
            </div>
          </div>
        </section>

        <section className="v2-col v2-main">
          <div className="v2-top">
            <div style={{ display: "grid", gap: 8 }}>
              <div className="v2-kicker">Live field</div>
              <div className="v2-title">See the situation more clearly</div>
            </div>
            <div style={{ display: "grid", gap: 8 }}>
              <div className="v2-chip" title="This is the main path the situation may keep falling into right now.">{result?.field_update.field_state.dominant_pattern ?? "Loading"}</div>
              <div className="v2-chip" title="This is a simple read on how possible it may be to move the situation in a healthier direction right now.">Opening: {Math.round((result?.field_update.field_state.readiness_for_repair ?? 0.42) * 100)}%</div>
            </div>
          </div>

          <div className="v2-canvas">
            <div className="v2-line" />
            {(result?.field_update.visual_state.nodes ?? []).map((node) => (
              <div key={node.id} className="v2-node" style={{ left: `${node.x * 100}%`, top: `${node.y * 100}%` }}>
                <div className="v2-kicker" style={{ fontSize: 10 }}>{node.role ?? "person"}</div>
                <div style={{ fontSize: 28, fontFamily: "var(--font-display), serif" }}>{node.label}</div>
                <div className="v2-muted" style={{ fontSize: 13 }}>{node.state}</div>
              </div>
            ))}

            <div className="v2-info">
              <div className="v2-card" style={{ padding: 16, display: "grid", gap: 10 }}>
                <div className="v2-kicker">Field reading</div>
                <div style={{ fontSize: 24, fontFamily: "var(--font-display), serif" }}>{result?.assistant_message.title ?? "Reading the situation"}</div>
                <div className="v2-muted" style={{ lineHeight: 1.7 }}>{result?.field_update.thread.summary ?? "Loading summary"}</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 10 }}>
                {(result?.assistant_message.next_steps ?? []).map((step) => (
                  <div key={step} className="v2-step">{step}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <aside className="v2-side">
          <div style={{ display: "grid", gap: 8 }}>
            <div className="v2-kicker">Focused views</div>
            <div style={{ fontSize: 28, fontFamily: "var(--font-display), serif" }}>Branches and overlays</div>
            <div className="v2-muted" style={{ lineHeight: 1.65 }}>
              Open one side of the situation at a time, and use the overlays for simpler explainers.
            </div>
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {[
              { id: "baseline", label: "Baseline" },
              { id: "family", label: "Family" },
              { id: "compare", label: "Compare" },
            ].map((item) => (
              <button key={item.id} className={`v2-chip ${selectedOverlayMode === item.id ? "active" : ""}`} onClick={() => openOverlay(item.id as "baseline" | "family" | "compare")}>{item.label}</button>
            ))}
          </div>

          <div className="v2-card" style={{ padding: 16, display: "grid", gap: 10 }}>
            <div className="v2-kicker">{overlayLoading ? "Loading overlay" : overlay?.title ?? "Overlay"}</div>
            <div className="v2-muted" style={{ lineHeight: 1.7 }}>{overlay?.body ?? "Choose an overlay to open a simpler explanation of the situation."}</div>
            <div className="v2-list">
              {(overlay?.cards ?? []).map((card) => (
                <div key={card.label} className="v2-step">
                  <div className="v2-kicker" style={{ marginBottom: 6 }}>{card.label}</div>
                  <div>{card.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="v2-list">
            {(result?.field_update.branch_suggestions ?? []).map((item) => (
              <button key={item.id} className={`v2-branch ${selectedBranchId === item.id ? "active" : ""}`} onClick={() => openBranch(item.id)}>
                <div className="v2-kicker">{item.type}</div>
                <div style={{ fontSize: 20, fontFamily: "var(--font-display), serif", marginTop: 6 }}>{item.label}</div>
              </button>
            ))}
          </div>

          <div className="v2-card" style={{ padding: 16, display: "grid", gap: 12 }}>
            <div className="v2-kicker">Focused thread</div>
            <div style={{ fontSize: 22, fontFamily: "var(--font-display), serif" }}>{branchLoading ? "Opening..." : branch?.title ?? "Choose a branch"}</div>
            <div className="v2-muted" style={{ lineHeight: 1.7 }}>{branch?.body ?? "Pick one of the branches above to open a focused explanation."}</div>
            <div className="v2-list">
              {(branch?.suggestions ?? []).map((item) => (
                <div key={item} className="v2-step">{item}</div>
              ))}
            </div>
          </div>

          <div className="v2-card" style={{ padding: 16, display: "grid", gap: 10 }}>
            <div className="v2-kicker">Simple explainers</div>
            <div className="v2-tooltip" title="What each person may be carrying means what may already be shaping how they hear the moment before the words are even finished.">What each person may be carrying</div>
            <div className="v2-tooltip" title="What keeps repeating means the path the situation tends to fall into again and again.">What keeps repeating</div>
            <div className="v2-tooltip" title="What could help next means a small step that may make the situation easier to understand, not a guaranteed result.">What could help next</div>
          </div>
        </aside>
      </div>
    </main>
  );
}
