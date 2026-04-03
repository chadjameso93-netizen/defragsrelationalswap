"use client";

import { useState } from "react";

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
        state: string;
      }>;
    };
  };
};

const INITIAL_MESSAGE =
  "I want to understand why this conversation with my family keeps going in the same direction.";

export default function MobileWorkspacePage() {
  const [message, setMessage] = useState(INITIAL_MESSAGE);
  const [result, setResult] = useState<WorkspaceResponse | null>(null);
  const [tab, setTab] = useState<"chat" | "field" | "branches">("chat");
  const [loading, setLoading] = useState(false);

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
            { id: "sibling", name: "Sibling", role: "family" },
          ],
        }),
      });
      const data = (await res.json()) as WorkspaceResponse;
      setResult(data);
      setTab("field");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ minHeight: "100vh", background: "#050505", color: "#f6f3ee", paddingBottom: 88 }}>
      <style>{`
        .m-shell { display:grid; gap:16px; padding:18px; }
        .m-card { border:1px solid rgba(255,255,255,0.08); background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015)); }
        .m-kicker { font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color: rgba(246,243,238,0.46); }
        .m-muted { color: rgba(246,243,238,0.64); }
        .m-tabbar { position:fixed; left:0; right:0; bottom:0; display:grid; grid-template-columns:repeat(3, 1fr); background:rgba(5,5,5,0.96); border-top:1px solid rgba(255,255,255,0.08); backdrop-filter: blur(10px); }
        .m-tab { padding:14px 12px; border:none; background:transparent; color:#f6f3ee; }
        .m-tab.active { background: rgba(214,195,161,0.08); }
        .m-input { width:100%; min-height:140px; resize:vertical; background:#0a0a0a; color:#f6f3ee; border:1px solid rgba(255,255,255,0.12); padding:14px; }
        .m-button { width:100%; border:none; background:#f6f3ee; color:#050505; padding:14px 16px; font-weight:600; }
        .m-node { display:grid; gap:6px; padding:14px; border:1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.02); }
      `}</style>

      <div className="m-shell">
        <div style={{ display: "grid", gap: 8 }}>
          <div className="m-kicker">Defrag mobile workspace</div>
          <h1 style={{ margin: 0, fontSize: 34, lineHeight: 1 }}>Relationship workspace</h1>
          <p className="m-muted" style={{ margin: 0, lineHeight: 1.6 }}>
            A chat-first view for understanding what may be happening, what each person may be carrying, and what could help next.
          </p>
        </div>

        {tab === "chat" && (
          <section className="m-card" style={{ padding: 16, display: "grid", gap: 12 }}>
            <div className="m-kicker">Describe the situation</div>
            <textarea className="m-input" value={message} onChange={(e) => setMessage(e.target.value)} />
            <button className="m-button" onClick={interpret} disabled={loading}>
              {loading ? "Reading the situation..." : "Open the field"}
            </button>
          </section>
        )}

        {tab === "field" && (
          <section className="m-card" style={{ padding: 16, display: "grid", gap: 14 }}>
            <div className="m-kicker">Live field</div>
            <div style={{ fontSize: 26, fontFamily: "var(--font-display), serif" }}>
              {result?.assistant_message.title ?? "Run the workspace to open the field"}
            </div>
            <div className="m-muted" style={{ lineHeight: 1.7 }}>
              {result?.assistant_message.body ?? "The field view will show who is involved, what may be happening between them, and what could help next."}
            </div>
            <div style={{ display: "grid", gap: 10 }}>
              {(result?.field_update.visual_state.nodes ?? []).map((node) => (
                <div key={node.id} className="m-node">
                  <div className="m-kicker">{node.role ?? "person"}</div>
                  <div style={{ fontSize: 20, fontFamily: "var(--font-display), serif" }}>{node.label}</div>
                  <div className="m-muted">{node.state}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {tab === "branches" && (
          <section className="m-card" style={{ padding: 16, display: "grid", gap: 12 }}>
            <div className="m-kicker">Other views</div>
            {(result?.field_update.branch_suggestions ?? []).map((branch) => (
              <div key={branch.id} className="m-node">
                <div className="m-kicker">{branch.type}</div>
                <div style={{ fontSize: 20, fontFamily: "var(--font-display), serif" }}>{branch.label}</div>
                <div className="m-muted">This will open a focused branch without losing the main situation.</div>
              </div>
            ))}
          </section>
        )}
      </div>

      <div className="m-tabbar">
        <button className={`m-tab ${tab === "chat" ? "active" : ""}`} onClick={() => setTab("chat")}>Chat</button>
        <button className={`m-tab ${tab === "field" ? "active" : ""}`} onClick={() => setTab("field")}>Field</button>
        <button className={`m-tab ${tab === "branches" ? "active" : ""}`} onClick={() => setTab("branches")}>Branches</button>
      </div>
    </main>
  );
}
