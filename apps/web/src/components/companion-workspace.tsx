"use client";

import { useEffect, useState } from "react";
import type {
  CompanionEvaluationRubric,
  CompanionOutputContract,
  CompanionStructuredSynthesis,
  Entitlements,
} from "../../../../packages/core/src";
import { CompanionV1Shell } from "./companion-v1-shell";

interface ThreadRecord {
  id: string;
  title: string;
}

interface InsightRecord {
  id: string;
  contract: CompanionOutputContract;
  createdAt: string;
  synthesis?: CompanionStructuredSynthesis | null;
  evaluation?: CompanionEvaluationRubric | null;
}

interface ActionRecord {
  type: "show_evidence" | "rephrase" | "practice_conversation";
  label: string;
}

interface CompanionWorkspaceProps {
  initialThreads: ThreadRecord[];
  entitlements: Entitlements;
}

export function CompanionWorkspace({ initialThreads, entitlements }: CompanionWorkspaceProps) {
  const [threads, setThreads] = useState(initialThreads);
  const [activeThreadId, setActiveThreadId] = useState<string | undefined>(initialThreads[0]?.id);
  const [situation, setSituation] = useState("");
  const [result, setResult] = useState<CompanionOutputContract | null>(null);
  const [latestInsightId, setLatestInsightId] = useState<string | null>(null);
  const [insights, setInsights] = useState<InsightRecord[]>([]);
  const [actions, setActions] = useState<ActionRecord[]>([]);
  const [actionResult, setActionResult] = useState<{ title: string; lines: string[] } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingThread, setLoadingThread] = useState(false);

  useEffect(() => {
    async function loadThreadInsights() {
      if (!activeThreadId) {
        setInsights([]);
        setResult(null);
        setLatestInsightId(null);
        setActions([]);
        setActionResult(null);
        return;
      }

      setLoadingThread(true);
      const response = await fetch(`/api/companion/insights?threadId=${activeThreadId}`);
      const body = (await response.json()) as { insights?: InsightRecord[] };
      const loaded = body.insights ?? [];
      setInsights(loaded);
      if (loaded[0]) {
        setLatestInsightId(loaded[0].id);
        setResult(loaded[0].contract);
        setActions([]);
        setActionResult(null);
      } else {
        setLatestInsightId(null);
        setResult(null);
        setActions([]);
        setActionResult(null);
      }
      setLoadingThread(false);
    }

    loadThreadInsights();
  }, [activeThreadId]);

  const activeInsight = insights.find((insight) => insight.id === latestInsightId) ?? null;
  const suggestedTitle = situation.trim().slice(0, 42) || "Recent conversation";

  return (
    <div style={{ display: "grid", gap: 18 }}>
      <section style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: 16, background: "rgba(255,255,255,0.02)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", marginBottom: 12 }}>
          <div>
            <p style={{ margin: 0, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "#71717a" }}>Threads</p>
            <p style={{ margin: "6px 0 0 0", fontSize: 13, color: "#a1a1aa" }}>
              Keep related moments together so Companion can reason over a recurring pattern.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setActiveThreadId(undefined);
              setSituation("");
              setInsights([]);
              setResult(null);
              setLatestInsightId(null);
              setActions([]);
              setActionResult(null);
              setError(null);
            }}
            style={{ borderRadius: 999, border: "1px solid rgba(255,255,255,0.15)", background: "transparent", color: "#f5f5f5", padding: "8px 12px", cursor: "pointer", whiteSpace: "nowrap" }}
          >
            New thread
          </button>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {threads.map((thread) => (
            <button
              key={thread.id}
              type="button"
              onClick={() => setActiveThreadId(thread.id)}
              style={{
                borderRadius: 999,
                border: thread.id === activeThreadId ? "1px solid #fff" : "1px solid rgba(255,255,255,0.15)",
                background: "transparent",
                color: "#f5f5f5",
                fontSize: 12,
                padding: "7px 12px",
                cursor: "pointer",
              }}
            >
              {thread.title}
            </button>
          ))}
          {threads.length === 0 ? <span style={{ color: "#71717a", fontSize: 13 }}>No threads yet. Start with one moment below.</span> : null}
        </div>
      </section>

      <section style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: 16 }}>
        <div style={{ display: "grid", gap: 6, marginBottom: 12 }}>
          <p style={{ margin: 0, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "#71717a" }}>Describe a moment</p>
          <p style={{ margin: 0, color: "#a1a1aa", fontSize: 13 }}>
            Focus on one recent exchange. The tighter the moment, the better the read.
          </p>
        </div>
        <textarea
          value={situation}
          onChange={(event) => setSituation(event.target.value)}
          rows={5}
          placeholder="Describe one recent relationship moment you want help understanding."
          style={{ width: "100%", borderRadius: 12, padding: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", boxSizing: "border-box" }}
        />

        <div style={{ marginTop: 12, display: "flex", gap: 10 }}>
          <button
            type="button"
            disabled={busy}
            onClick={async () => {
              setBusy(true);
              setError(null);
              try {
                const response = await fetch("/api/companion/insights", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    threadId: activeThreadId,
                    threadTitle: suggestedTitle,
                    situation,
                    recentEvents: [situation],
                  }),
                });

                const body = (await response.json()) as {
                  error?: string;
                  insight?: InsightRecord;
                  threadId?: string;
                  actions?: ActionRecord[];
                };

                if (!response.ok || !body.insight) {
                  throw new Error(body.error ?? "Unable to create insight");
                }

                if (!activeThreadId && body.threadId) {
                  setThreads((prev) => [{ id: body.threadId!, title: suggestedTitle }, ...prev]);
                  setActiveThreadId(body.threadId);
                }

                setLatestInsightId(body.insight.id);
                setResult(body.insight.contract);
                setInsights((prev) => [body.insight!, ...prev]);
                setActions(body.actions ?? []);
                setActionResult(null);
                setSituation("");
              } catch (err) {
                setError(String(err));
              } finally {
                setBusy(false);
              }
            }}
            style={{ borderRadius: 10, border: 0, padding: "10px 14px", cursor: "pointer", background: "#fafafa", color: "#0a0a0a", fontWeight: 600 }}
          >
            {busy ? "Working…" : "Generate Companion insight"}
          </button>
        </div>

        {error ? <p style={{ marginBottom: 0, color: "#fca5a5" }}>{error}</p> : null}
      </section>

      {loadingThread ? (
        <section style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 16, color: "#a1a1aa" }}>
          Loading thread history…
        </section>
      ) : null}

      {insights.length > 0 ? (
        <section style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 16 }}>
          <p style={{ marginTop: 0, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "#71717a" }}>Prior insights</p>
          <div style={{ display: "grid", gap: 8 }}>
            {insights.map((insight) => (
              <button
                key={insight.id}
                type="button"
                onClick={() => {
                  setLatestInsightId(insight.id);
                  setResult(insight.contract);
                  setActionResult(null);
                }}
                style={{ textAlign: "left", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, background: "transparent", color: "#d4d4d8", padding: 10, cursor: "pointer" }}
              >
                <div style={{ fontSize: 12, color: "#71717a" }}>{new Date(insight.createdAt).toLocaleString()}</div>
                <div style={{ marginTop: 4 }}>{insight.contract.whatChanged}</div>
              </button>
            ))}
          </div>
        </section>
      ) : null}

      {!loadingThread && !result && !busy ? (
        <section style={{ border: "1px dashed rgba(255,255,255,0.16)", borderRadius: 16, padding: 20, display: "grid", gap: 8 }}>
          <p style={{ margin: 0, fontSize: 12, color: "#f5f5f5", fontWeight: 600 }}>Nothing in focus yet</p>
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: "#a1a1aa" }}>
            Start a new thread or choose an existing one, then describe one exchange Companion should read.
          </p>
        </section>
      ) : null}

      {actions.length > 0 && latestInsightId ? (
        <section style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 16 }}>
          <p style={{ marginTop: 0, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "#71717a" }}>Follow-up actions</p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {actions.map((action) => (
              <button
                key={action.type}
                type="button"
                onClick={async () => {
                  const response = await fetch("/api/companion/actions", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ insightId: latestInsightId, actionType: action.type }),
                  });
                  const body = (await response.json()) as { result?: { title: string; lines: string[] }; error?: string };
                  if (!response.ok || !body.result) {
                    setError(body.error ?? "Action failed");
                    return;
                  }
                  setActionResult(body.result);
                }}
                style={{ borderRadius: 999, border: "1px solid rgba(255,255,255,0.2)", background: "transparent", color: "#f5f5f5", padding: "8px 12px", cursor: "pointer" }}
              >
                {action.label}
              </button>
            ))}
          </div>
        </section>
      ) : null}

      {actionResult ? (
        <section style={{ border: "1px solid rgba(255,255,255,0.14)", borderRadius: 12, padding: 14 }}>
          <p style={{ marginTop: 0, marginBottom: 8, fontWeight: 600 }}>{actionResult.title}</p>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {actionResult.lines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {result ? (
        <CompanionV1Shell
          contract={result}
          entitlements={entitlements}
          synthesis={activeInsight?.synthesis ?? null}
          evaluation={activeInsight?.evaluation ?? null}
        />
      ) : null}
    </div>
  );
}
