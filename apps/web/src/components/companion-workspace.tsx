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
    <div
      className="companion-layout"
      style={{
        display: "grid",
        gridTemplateColumns: "300px minmax(0, 1fr)",
        gap: 22,
        alignItems: "start",
      }}
    >
      <aside
        className="companion-rail premium-fade-up"
        data-delay="1"
        style={{
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-lg)",
          padding: 24,
          background: "var(--color-surface)",
          display: "grid",
          gap: 16,
          position: "sticky",
          top: 24,
        }}
      >
        <div style={{ display: "grid", gap: 6 }}>
          <p style={{ margin: 0, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-accent)" }}>Threads</p>
          <p style={{ margin: 0, fontSize: 13, color: "var(--color-text-secondary)", lineHeight: 1.7 }}>
            Keep recurring moments together so DEFRAG can track the shape, not just the latest sentence or the hottest emotion.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 10,
          }}
        >
          {[
            ["Threads", String(threads.length)],
            ["Insights", String(insights.length)],
          ].map(([label, value]) => (
            <div key={label} style={{ padding: 14, borderRadius: "var(--radius-md)", background: "var(--color-surface-hover)", border: "1px solid var(--color-border)" }}>
              <div style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-text-muted)" }}>{label}</div>
              <div style={{ marginTop: 8, fontSize: 18, color: "var(--color-text-primary)" }}>{value}</div>
            </div>
          ))}
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
          style={{ borderRadius: "var(--radius-pill)", border: "1px solid var(--color-border)", background: "var(--color-surface)", color: "var(--color-text-primary)", padding: "12px 16px", cursor: "pointer", whiteSpace: "nowrap" }}
        >
          Start a new thread
        </button>

        <div style={{ display: "grid", gap: 10 }}>
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
                Thread
              </span>
              <span style={{ lineHeight: 1.55 }}>{thread.title}</span>
            </button>
          ))}
          {threads.length === 0 ? <span style={{ color: "var(--color-text-secondary)", fontSize: 13 }}>No threads yet. Start with one moment below.</span> : null}
        </div>
      </aside>

      <div style={{ display: "grid", gap: 18 }}>
      <section
        className="premium-fade-up"
        data-delay="2"
        style={{
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-lg)",
          padding: 24,
          background: "linear-gradient(180deg, var(--color-surface), transparent)",
          display: "grid",
          gap: 18,
        }}
      >
        <div
          className="companion-intro"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
          }}
        >
          <div style={{ display: "grid", gap: 8 }}>
            <p style={{ margin: 0, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-accent)" }}>Compose the moment</p>
            <p style={{ margin: 0, fontSize: 24, lineHeight: 1.2, color: "var(--color-text-primary)" }}>
              Keep it small enough for a real insight.
            </p>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.75, color: "var(--color-text-secondary)" }}>
              Dynamics works best on one exchange, one rupture, or one shift in tone rather than a whole relationship summary or a label about who someone is.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 4 }}>
              {[
                "Recent exchange",
                "One unclear turn",
                "Next move",
              ].map((chip) => (
                <span
                  key={chip}
                  style={{
                    padding: "8px 14px",
                    borderRadius: "var(--radius-pill)",
                    border: "1px solid var(--color-border)",
                    background: "var(--color-surface)",
                    color: "var(--color-text-secondary)",
                    fontSize: 12,
                  }}
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: 10,
              alignSelf: "end",
            }}
          >
            {[
              ["Mode", result ? "Insight ready" : "Drafting"],
              ["Premium", entitlements.canUseCompanionPremiumView ? "Unlocked" : "Locked"],
              ["Thread", activeThreadId ? "Active" : "New"],
            ].map(([label, value]) => (
              <div key={label} style={{ padding: 14, borderRadius: "var(--radius-md)", background: "var(--color-surface-hover)", border: "1px solid var(--color-border)" }}>
                <div style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-text-muted)" }}>{label}</div>
                <div style={{ marginTop: 8, fontSize: 14, color: "var(--color-text-primary)" }}>{value}</div>
              </div>
            ))}
          </div>
        </div>

      <section style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", padding: 20, background: "var(--color-surface-hover)" }}>
        <div style={{ display: "grid", gap: 6, marginBottom: 16 }}>
          <p style={{ margin: 0, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-text-muted)" }}>Describe a moment</p>
          <p style={{ margin: 0, color: "var(--color-text-secondary)", fontSize: 13 }}>
            Focus on one recent exchange. The tighter the moment, the clearer and safer the read.
          </p>
        </div>
        <textarea
          value={situation}
          onChange={(event) => setSituation(event.target.value)}
          rows={5}
          placeholder="Describe one recent relationship moment you want help understanding."
          style={{ width: "100%", borderRadius: 14, padding: 16, background: "var(--color-surface)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", boxSizing: "border-box", fontFamily: "inherit" }}
        />

        <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
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
            {busy ? "Working…" : "Generate dynamics insight"}
          </button>

          <div style={{ display: "flex", alignItems: "center", color: "#8d8d95", fontSize: 12 }}>
            Best input: one recent exchange, one unclear turn, one felt shift.
          </div>
        </div>

          {error ? (
            <p
              style={{
                marginBottom: 0,
                color: "#fecaca",
                borderRadius: 12,
                padding: "12px 14px",
                background: "rgba(127,29,29,0.22)",
                border: "1px solid rgba(248,113,113,0.24)",
                lineHeight: 1.6,
              }}
            >
              DEFRAG could not finish that insight yet. Try narrowing the moment or try again in a second.
            </p>
          ) : null}
      </section>
      </section>

      {loadingThread ? (
        <section style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 18, color: "#a1a1aa", background: "rgba(255,255,255,0.02)" }}>
          Loading thread history…
        </section>
      ) : null}

      {insights.length > 0 ? (
        <section style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 18, background: "rgba(255,255,255,0.02)" }}>
          <div style={{ display: "grid", gap: 4, marginBottom: 12 }}>
            <p style={{ margin: 0, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "#71717a" }}>Saved insight history</p>
            <p style={{ margin: 0, color: "#a1a1aa", lineHeight: 1.6, fontSize: 13 }}>
              Each thread keeps its earlier summaries close so you can reopen what changed without retelling the whole story.
            </p>
          </div>
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
                style={{
                  textAlign: "left",
                  border: insight.id === latestInsightId ? "1px solid rgba(216,196,159,0.4)" : "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 14,
                  background: insight.id === latestInsightId ? "rgba(216,196,159,0.06)" : "transparent",
                  color: "#d4d4d8",
                  padding: 12,
                  cursor: "pointer",
                }}
              >
                <div style={{ fontSize: 12, color: "#71717a" }}>{new Date(insight.createdAt).toLocaleString()}</div>
                <div style={{ marginTop: 6, lineHeight: 1.65 }}>{insight.contract.whatChanged}</div>
              </button>
            ))}
          </div>
        </section>
      ) : null}

      {!loadingThread && !result && !busy ? (
        <section style={{ border: "1px dashed rgba(255,255,255,0.16)", borderRadius: 20, padding: 22, display: "grid", gap: 8 }}>
          <p style={{ margin: 0, fontSize: 12, color: "#f5f5f5", fontWeight: 600 }}>Nothing in focus yet</p>
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: "#a1a1aa" }}>
            Start a new thread or choose an existing one, then describe one exchange DEFRAG should help you understand.
          </p>
        </section>
      ) : null}

      {actions.length > 0 && latestInsightId ? (
        <section style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 18, background: "rgba(255,255,255,0.02)" }}>
          <div style={{ display: "grid", gap: 4, marginBottom: 12 }}>
            <p style={{ margin: 0, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "#71717a" }}>Follow-up actions</p>
            <p style={{ margin: 0, color: "#a1a1aa", lineHeight: 1.6, fontSize: 13 }}>
              Use these when you want evidence, phrasing help, or a lighter practice pass before you send anything.
            </p>
          </div>
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
                style={{ borderRadius: 999, border: "1px solid rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.03)", color: "#f5f5f5", padding: "10px 14px", cursor: "pointer" }}
              >
                {action.label}
              </button>
            ))}
          </div>
        </section>
      ) : null}

      {actionResult ? (
        <section style={{ border: "1px solid rgba(255,255,255,0.14)", borderRadius: 18, padding: 16, background: "rgba(255,255,255,0.03)" }}>
          <p style={{ marginTop: 0, marginBottom: 10, fontWeight: 600, color: "#f5f5f5" }}>{actionResult.title}</p>
          <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.8, color: "#d4d4d8" }}>
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
      <style>{`
        @media (max-width: 980px) {
          .companion-layout {
            grid-template-columns: 1fr !important;
          }

          .companion-rail {
            position: static !important;
          }
        }

        @media (max-width: 720px) {
          .companion-intro {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
