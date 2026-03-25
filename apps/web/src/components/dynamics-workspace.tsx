"use client";

import { useEffect, useState } from "react";
import type {
  DynamicsEvaluationRubric,
  DynamicsOutputContract,
  DynamicsStructuredSynthesis,
  Entitlements,
} from "../../../../packages/core/src";
import { DynamicsV1Shell } from "./dynamics-v1-shell";
import { LiveRelationalField } from "./live-relational-field";

interface ThreadRecord {
  id: string;
  title: string;
}

interface InsightRecord {
  id: string;
  contract: DynamicsOutputContract;
  createdAt: string;
  synthesis?: DynamicsStructuredSynthesis | null;
  evaluation?: DynamicsEvaluationRubric | null;
}

interface ActionRecord {
  type: "show_evidence" | "rephrase" | "practice_conversation";
  label: string;
}

interface DynamicsWorkspaceProps {
  initialThreads: ThreadRecord[];
  entitlements: Entitlements;
}

export function DynamicsWorkspace({ initialThreads, entitlements }: DynamicsWorkspaceProps) {
  const [threads, setThreads] = useState(initialThreads);
  const [activeThreadId, setActiveThreadId] = useState<string | undefined>(initialThreads[0]?.id);
  const [situation, setSituation] = useState("");
  const [result, setResult] = useState<DynamicsOutputContract | null>(null);
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
      const response = await fetch(`/api/dynamics/insights?threadId=${activeThreadId}`);
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
    <div
      className="dynamics-layout premium-fade-up"
      data-delay="2"
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 1.3fr) 360px",
        gap: 22,
        alignItems: "start",
      }}
    >
      <div style={{ display: "grid", gap: 18 }}>
        {/* Live Relational Field injected into DEFRAG AI layout */}
        <LiveRelationalField preview={false} />

        {result ? (
          <div>
            <div style={{ padding: "12px 0", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--color-text-muted)" }}>Insight Overlay</div>
            <DynamicsV1Shell
              contract={result}
              entitlements={entitlements}
              synthesis={activeInsight?.synthesis ?? null}
              evaluation={activeInsight?.evaluation ?? null}
            />
          </div>
        ) : null}
        
        {actionResult ? (
          <section style={{ border: "1px solid var(--color-border-hover)", borderRadius: "var(--radius-md)", padding: 16, background: "var(--color-surface)" }}>
            <p style={{ margin: "0 0 10px 0", fontWeight: 600, color: "var(--color-text-primary)" }}>{actionResult.title}</p>
            <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.8, color: "var(--color-text-secondary)" }}>
              {actionResult.lines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>


      {/* Main DEFRAG AI Right Hand Interaction Component */}
      <aside
        className="dynamics-rail"
        style={{
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-lg)",
          background: "var(--color-surface)",
          display: "grid",
          position: "sticky",
          top: 24,
          maxHeight: "calc(100vh - 48px)",
          overflowY: "auto",
        }}
      >
        <div style={{ padding: 24, borderBottom: "1px solid var(--color-border)", display: "grid", gap: 18 }}>
          <div style={{ display: "grid", gap: 6 }}>
            <p style={{ margin: 0, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-accent)" }}>Interaction Input</p>
            <p style={{ margin: 0, fontSize: 13, color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
              Provide the context of the recent exchange to update the relational field.
            </p>
          </div>

          <textarea
            value={situation}
            onChange={(event) => setSituation(event.target.value)}
            rows={4}
            placeholder="Describe one specific moment or rupture you want to trace."
            style={{ width: "100%", borderRadius: "var(--radius-md)", padding: 16, background: "var(--color-surface)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", boxSizing: "border-box", fontFamily: "inherit" }}
          />

          <button
            type="button"
            disabled={busy}
            onClick={async () => {
              setBusy(true);
              setError(null);
              try {
                const response = await fetch("/api/dynamics/insights", {
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
            style={{ borderRadius: 10, border: 0, padding: "10px 14px", cursor: "pointer", background: "var(--color-text-primary)", color: "var(--color-bg)", fontWeight: 600, width: "100%" }}
          >
            {busy ? "Applying context..." : "Submit to DEFRAG AI"}
          </button>

          {error ? (
              <p
                style={{
                  margin: 0,
                  color: "#fecaca",
                  borderRadius: 8,
                  padding: "10px 12px",
                  background: "rgba(127,29,29,0.22)",
                  border: "1px solid rgba(248,113,113,0.24)",
                  lineHeight: 1.6,
                  fontSize: 13
                }}
              >
                Failed to process. Try narrowing the moment.
              </p>
            ) : null}
        </div>

        {actions.length > 0 && latestInsightId ? (
          <div style={{ borderBottom: "1px solid var(--color-border)", padding: 24 }}>
            <p style={{ margin: "0 0 12px 0", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-text-muted)" }}>Simulations</p>
            <div style={{ display: "grid", gap: 10 }}>
              {actions.map((action) => (
                <button
                  key={action.type}
                  type="button"
                  onClick={async () => {
                    const response = await fetch("/api/dynamics/actions", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ insightId: latestInsightId, actionType: action.type }),
                    });
                    const body = (await response.json()) as { result?: { title: string; lines: string[] }; error?: string };
                    if (!response.ok || !body.result) {
                      setError(body.error ?? "Simulation failed");
                      return;
                    }
                    setActionResult(body.result);
                  }}
                  style={{ textAlign: "left", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border-hover)", background: "var(--color-surface-hover)", color: "var(--color-text-secondary)", padding: "12px 14px", cursor: "pointer", fontSize: 13 }}
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        ) : null}


        {threads.length > 0 && (
          <div style={{ padding: 24, display: "grid", gap: 14 }}>
            <p style={{ margin: 0, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-text-muted)" }}>History / Sessions</p>
            
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
              style={{ borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", background: "transparent", color: "var(--color-text-primary)", padding: "10px", cursor: "pointer", fontSize: 13 }}
            >
              + Initialize New Session
            </button>

            <div style={{ display: "grid", gap: 8 }}>
              {threads.map((thread) => (
                <button
                  key={thread.id}
                  type="button"
                  onClick={() => setActiveThreadId(thread.id)}
                  style={{
                    borderRadius: "var(--radius-md)",
                    border: thread.id === activeThreadId ? "1px solid var(--color-accent)" : "1px solid var(--color-border)",
                    background: thread.id === activeThreadId ? "color-mix(in srgb, var(--color-accent) 15%, transparent)" : "var(--color-surface)",
                    color: "var(--color-text-primary)",
                    fontSize: 13,
                    padding: "16px",
                    cursor: "pointer",
                    textAlign: "left",
                    display: "grid",
                    gap: 6,
                  }}
                >
                  <span style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: thread.id === activeThreadId ? "var(--color-accent)" : "var(--color-text-muted)" }}>
                    {thread.id === activeThreadId ? "Active Thread" : "Thread"}
                  </span>
                  <span style={{ lineHeight: 1.55 }}>{thread.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}

      </aside>

      <style>{`
        @media (max-width: 980px) {
          .dynamics-layout {
            grid-template-columns: 1fr !important;
          }

          .dynamics-rail {
            position: static !important;
          }
        }
      `}</style>
    </div>
  );
}
