"use client";

import { useMemo, useState } from "react";
import type { WorldEdge, WorldNode } from "../../../../packages/core/src";
import type { WorldInterpretation } from "../server/reasoning/world-field";

const width = 860;
const height = 520;

const defaultNodes: WorldNode[] = [
  { id: "self", label: "You", type: "person", x: 220, y: 260, charge: 0.62 },
  { id: "other", label: "Other", type: "person", x: 430, y: 240, charge: 0.71 },
  { id: "self_part", label: "Protective Part", type: "self_part", x: 170, y: 120, charge: 0.58 },
  { id: "conflict", label: "Conflict", type: "conflict", x: 540, y: 180, charge: 0.8 },
  { id: "future", label: "Future", type: "future", x: 650, y: 330, charge: 0.44 },
];

const defaultEdges: WorldEdge[] = [
  { id: "e1", from: "self", to: "other", type: "tension", intensity: 0.82 },
  { id: "e2", from: "self", to: "self_part", type: "influence", intensity: 0.67 },
  { id: "e3", from: "other", to: "conflict", type: "closeness", intensity: 0.62 },
  { id: "e4", from: "self", to: "future", type: "trust", intensity: 0.51 },
];

function edgeColor(type: WorldEdge["type"]) {
  if (type === "tension") return "#fda4af";
  if (type === "trust") return "#86efac";
  if (type === "influence") return "#93c5fd";
  return "#c4b5fd";
}

export function WorldAlphaCanvas() {
  const [nodes, setNodes] = useState(defaultNodes);
  const [edges, setEdges] = useState(defaultEdges);
  const [insight, setInsight] = useState<WorldInterpretation | null>(null);
  const [loading, setLoading] = useState(false);

  const indexed = useMemo(() => Object.fromEntries(nodes.map((node) => [node.id, node])), [nodes]);

  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div style={{ border: "1px solid rgba(255,255,255,0.12)", borderRadius: 18, padding: 12, background: "#060606" }}>
        <svg viewBox={`0 0 ${width} ${height}`} style={{ width: "100%", height: "auto", display: "block" }}>
          {edges.map((edge) => {
            const from = indexed[edge.from];
            const to = indexed[edge.to];
            if (!from || !to) return null;

            return (
              <line
                key={edge.id}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={edgeColor(edge.type)}
                strokeOpacity={0.3 + edge.intensity * 0.6}
                strokeWidth={1 + edge.intensity * 4}
              />
            );
          })}

          {nodes.map((node) => (
            <g key={node.id}>
              <circle
                cx={node.x}
                cy={node.y}
                r={20 + node.charge * 24}
                fill="rgba(255,255,255,0.03)"
                stroke="rgba(255,255,255,0.6)"
              />
              <text x={node.x} y={node.y + 5} fontSize={12} textAnchor="middle" fill="#f4f4f5">
                {node.label}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        <button
          type="button"
          onClick={() =>
            setNodes((prev) =>
              prev.map((node) =>
                node.id === "self" ? { ...node, x: node.x - 26 } : node.id === "other" ? { ...node, x: node.x + 26 } : node,
              ),
            )
          }
          style={{ borderRadius: 999, border: "1px solid rgba(255,255,255,0.2)", background: "transparent", color: "#fff", padding: "8px 12px", cursor: "pointer" }}
        >
          Move nodes apart
        </button>

        <button
          type="button"
          onClick={() =>
            setEdges((prev) => prev.map((edge) => (edge.type === "tension" ? { ...edge, intensity: Math.max(0.2, edge.intensity - 0.15) } : edge)))
          }
          style={{ borderRadius: 999, border: "1px solid rgba(255,255,255,0.2)", background: "transparent", color: "#fff", padding: "8px 12px", cursor: "pointer" }}
        >
          Reduce tension edge
        </button>

        <button
          type="button"
          onClick={() => setNodes((prev) => prev.map((node) => (node.id === "future" ? { ...node, charge: Math.max(0.2, node.charge - 0.15) } : node)))}
          style={{ borderRadius: 999, border: "1px solid rgba(255,255,255,0.2)", background: "transparent", color: "#fff", padding: "8px 12px", cursor: "pointer" }}
        >
          Add boundary witness effect
        </button>

        <button
          type="button"
          onClick={async () => {
            setLoading(true);
            const response = await fetch("/api/world/interpret", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                nodes,
                edges,
                events: [
                  "Recent discussion escalated and ended in silence.",
                  "A repair attempt was made but timing felt rushed.",
                ],
              }),
            });
            const body = (await response.json()) as { interpretation?: WorldInterpretation };
            if (!response.ok || !body.interpretation) {
              setInsight(null);
              setLoading(false);
              return;
            }
            setInsight(body.interpretation);
            setLoading(false);
          }}
          style={{ borderRadius: 999, border: 0, background: "#fafafa", color: "#111", padding: "8px 12px", cursor: "pointer", fontWeight: 600 }}
        >
          {loading ? "Interpreting…" : "Interpret field"}
        </button>
      </div>

      {insight ? (
        <section style={{ display: "grid", gap: 14 }}>
          <div style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, padding: 14, color: "#d4d4d8", lineHeight: 1.6, display: "grid", gap: 8 }}>
            <p style={{ margin: 0, fontSize: 10, color: "#71717a", textTransform: "uppercase", letterSpacing: "0.18em" }}>Field read</p>
            <p style={{ margin: 0 }}>
              <strong>Pattern:</strong> {insight.dominantPattern}
            </p>
            <p style={{ margin: 0 }}>
              <strong>Highest charge:</strong> {insight.highestChargeNodeLabel ?? insight.highestChargeNodeId}
            </p>
            <p style={{ margin: 0 }}>
              <strong>Pressure:</strong> {insight.pressureLevel} | <strong>Repair window:</strong> {insight.repairWindow}
            </p>
            <p style={{ margin: 0 }}>{insight.stabilizationHint}</p>
          </div>

          <div className="world-insight-grid" style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 14 }}>
            <section className="world-panel" style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, padding: 14, display: "grid", gap: 10 }}>
              <p style={{ margin: 0, fontSize: 10, color: "#71717a", textTransform: "uppercase", letterSpacing: "0.18em" }}>Node readings</p>
              {insight.nodeReadings.map((node) => (
                <div key={node.id} style={{ padding: 12, borderRadius: 12, background: "rgba(255,255,255,0.03)", display: "grid", gap: 4 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                    <span style={{ color: "#f5f5f5" }}>{node.label}</span>
                    <span style={{ color: "#a1a1aa", fontSize: 12 }}>{Math.round(node.charge * 100)}%</span>
                  </div>
                  <p style={{ margin: 0, color: "#a1a1aa", fontSize: 13, lineHeight: 1.6 }}>{node.note}</p>
                </div>
              ))}
            </section>

            <section className="world-panel" style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, padding: 14, display: "grid", gap: 10 }}>
              <p style={{ margin: 0, fontSize: 10, color: "#71717a", textTransform: "uppercase", letterSpacing: "0.18em" }}>Next moves</p>
              <ul style={{ margin: 0, paddingLeft: 18, color: "#d4d4d8", lineHeight: 1.7 }}>
                {insight.nextMoves.map((move) => (
                  <li key={move}>{move}</li>
                ))}
              </ul>
              {insight.strongestEdge ? (
                <div style={{ marginTop: 4, padding: 12, borderRadius: 12, background: "rgba(255,255,255,0.03)", color: "#a1a1aa", fontSize: 13, lineHeight: 1.6 }}>
                  Strongest edge: <strong style={{ color: "#f5f5f5" }}>{insight.strongestEdge.type}</strong> between{" "}
                  <strong style={{ color: "#f5f5f5" }}>{indexed[insight.strongestEdge.from]?.label ?? insight.strongestEdge.from}</strong> and{" "}
                  <strong style={{ color: "#f5f5f5" }}>{indexed[insight.strongestEdge.to]?.label ?? insight.strongestEdge.to}</strong>.
                </div>
              ) : null}
            </section>
          </div>
        </section>
      ) : (
        <section style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, padding: 14, color: "#d4d4d8", lineHeight: 1.6 }}>
          Generate interpretation to see field guidance.
        </section>
      )}
      <style>{`
        @media (max-width: 720px) {
          .world-insight-grid {
            grid-template-columns: 1fr !important;
          }

          .world-panel {
            padding: 12px !important;
          }
        }
      `}</style>
    </div>
  );
}
