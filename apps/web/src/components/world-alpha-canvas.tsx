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

function nodeAccent(type: WorldNode["type"]) {
  if (type === "person") return "#f4efe6";
  if (type === "self_part") return "#93c5fd";
  if (type === "conflict") return "#fda4af";
  if (type === "future") return "#86efac";
  return "#d4d4d8";
}

interface WorldAlphaCanvasProps {
  preview?: boolean;
  previewInsight?: WorldInterpretation | null;
}

export function WorldAlphaCanvas({ preview = false, previewInsight = null }: WorldAlphaCanvasProps) {
  const [nodes, setNodes] = useState(defaultNodes);
  const [edges, setEdges] = useState(defaultEdges);
  const [insight, setInsight] = useState<WorldInterpretation | null>(previewInsight);
  const [loading, setLoading] = useState(false);

  const indexed = useMemo(() => Object.fromEntries(nodes.map((node) => [node.id, node])), [nodes]);

  return (
    <div style={{ display: "grid", gap: 14 }}>
      <section
        style={{
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 26,
          padding: 18,
          background:
            "radial-gradient(circle at 18% 14%, rgba(159,189,232,0.16), transparent 24%), radial-gradient(circle at 82% 18%, rgba(253,164,175,0.14), transparent 22%), linear-gradient(180deg, rgba(8,11,16,0.96), rgba(4,5,8,0.98))",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), 0 18px 60px rgba(0,0,0,0.32)",
          display: "grid",
          gap: 16,
        }}
      >
        <div
          className="world-canvas-meta"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: 12,
          }}
        >
          {[
            ["Active nodes", String(nodes.length)],
            ["Charged edge", `${Math.round(Math.max(...edges.map((edge) => edge.intensity)) * 100)}%`],
            ["Field state", insight ? "Interpreted" : "Awaiting insight"],
          ].map(([label, value]) => (
            <div key={label} style={{ padding: 12, borderRadius: 16, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.03)" }}>
              <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#7f8a99" }}>{label}</div>
              <div style={{ marginTop: 8, color: "#f5f5f5", fontSize: 16 }}>{value}</div>
            </div>
          ))}
        </div>

        <svg viewBox={`0 0 ${width} ${height}`} style={{ width: "100%", height: "auto", display: "block" }}>
          <defs>
            {nodes.map((node) => (
              <radialGradient key={`gradient-${node.id}`} id={`node-gradient-${node.id}`} cx="50%" cy="50%" r="65%">
                <stop offset="0%" stopColor={nodeAccent(node.type)} stopOpacity="0.95" />
                <stop offset="65%" stopColor={nodeAccent(node.type)} stopOpacity="0.18" />
                <stop offset="100%" stopColor="#050505" stopOpacity="0.08" />
              </radialGradient>
            ))}
          </defs>

          {edges.map((edge) => {
            const from = indexed[edge.from];
            const to = indexed[edge.to];
            if (!from || !to) return null;

            return (
              <g key={edge.id}>
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={edgeColor(edge.type)}
                  strokeOpacity={0.12 + edge.intensity * 0.22}
                  strokeWidth={8 + edge.intensity * 10}
                  strokeLinecap="round"
                />
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={edgeColor(edge.type)}
                  strokeOpacity={0.42 + edge.intensity * 0.4}
                  strokeWidth={1 + edge.intensity * 4}
                  strokeLinecap="round"
                  strokeDasharray={edge.type === "trust" ? "0" : "3 7"}
                />
              </g>
            );
          })}

          {nodes.map((node) => (
            <g key={node.id}>
              <circle
                cx={node.x}
                cy={node.y}
                r={30 + node.charge * 34}
                fill={nodeAccent(node.type)}
                fillOpacity={0.08}
              />
              <circle
                cx={node.x}
                cy={node.y}
                r={20 + node.charge * 24}
                fill={`url(#node-gradient-${node.id})`}
                stroke={nodeAccent(node.type)}
                strokeOpacity={0.9}
                strokeWidth={1.4}
              />
              <text x={node.x} y={node.y + 4} fontSize={12} fontWeight="600" textAnchor="middle" fill="#f4f4f5">
                {node.label.length > 14 ? `${node.label.slice(0, 14)}…` : node.label}
              </text>
            </g>
          ))}
        </svg>
      </section>

      <section
        className="world-controls"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 12,
        }}
      >
        {[
          {
            label: "Create distance",
            copy: "Pull the core people apart to see what charge remains when the field has more air.",
            action: () =>
              setNodes((prev) =>
                prev.map((node) =>
                  node.id === "self" ? { ...node, x: node.x - 26 } : node.id === "other" ? { ...node, x: node.x + 26 } : node,
                ),
              ),
          },
          {
            label: "Soften tension",
            copy: "Reduce the most visibly strained edge and watch how the field recalibrates.",
            action: () =>
              setEdges((prev) => prev.map((edge) => (edge.type === "tension" ? { ...edge, intensity: Math.max(0.2, edge.intensity - 0.15) } : edge))),
          },
          {
            label: "Add witness",
            copy: "Lower future pressure to simulate a steadier, more bounded frame around the scene.",
            action: () => setNodes((prev) => prev.map((node) => (node.id === "future" ? { ...node, charge: Math.max(0.2, node.charge - 0.15) } : node))),
          },
        ].map((control) => (
          <button
            key={control.label}
            type="button"
            onClick={control.action}
            style={{
              textAlign: "left",
              borderRadius: 20,
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.025)",
              color: "#fff",
              padding: 16,
              cursor: "pointer",
              display: "grid",
              gap: 8,
            }}
          >
            <span style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "#8ca5ca" }}>{control.label}</span>
            <span style={{ fontSize: 13, lineHeight: 1.65, color: "#cfd7e4" }}>{control.copy}</span>
          </button>
        ))}

        <button
          type="button"
          onClick={async () => {
            if (preview) {
              return;
            }

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
          style={{
            borderRadius: 20,
            border: preview ? "1px solid rgba(255,255,255,0.12)" : 0,
            background: preview ? "rgba(255,255,255,0.04)" : "linear-gradient(135deg, #f5f5f5, #dce8ff)",
            color: preview ? "#f5f5f5" : "#111",
            padding: 16,
            cursor: preview ? "default" : "pointer",
            fontWeight: 600,
            display: "grid",
            gap: 8,
            textAlign: "left",
            boxShadow: preview ? "none" : "0 18px 40px rgba(138,168,224,0.18)",
          }}
          disabled={preview}
        >
          <span style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "#334155" }}>
            {preview ? "Preview" : "Interpretation"}
          </span>
          <span style={{ fontSize: 16 }}>{preview ? "Field insight available after sign-in" : loading ? "Interpreting field…" : "Generate field insight"}</span>
          <span style={{ fontSize: 13, lineHeight: 1.65, color: preview ? "rgba(245,245,245,0.68)" : "#475569" }}>
            {preview
              ? "The canvas stays interactive here, but stored interpretation is reserved for signed-in sessions."
              : "Collapse the scene into pattern, pressure, repair timing, and next moves."}
          </span>
        </button>
      </section>

      {insight ? (
        <section style={{ display: "grid", gap: 14 }}>
          <div style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: 18, padding: 18, color: "#d4d4d8", lineHeight: 1.6, display: "grid", gap: 8, background: "rgba(255,255,255,0.025)" }}>
            <p style={{ margin: 0, fontSize: 10, color: "#71717a", textTransform: "uppercase", letterSpacing: "0.18em" }}>Field insight</p>
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
            <section className="world-panel" style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: 18, padding: 16, display: "grid", gap: 10, background: "rgba(255,255,255,0.025)" }}>
              <p style={{ margin: 0, fontSize: 10, color: "#71717a", textTransform: "uppercase", letterSpacing: "0.18em" }}>Node readings</p>
              {insight.nodeReadings.map((node) => (
                <div key={node.id} style={{ padding: 12, borderRadius: 14, background: "rgba(255,255,255,0.03)", display: "grid", gap: 4, border: "1px solid rgba(255,255,255,0.04)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                    <span style={{ color: "#f5f5f5" }}>{node.label}</span>
                    <span style={{ color: "#a1a1aa", fontSize: 12 }}>{Math.round(node.charge * 100)}%</span>
                  </div>
                  <p style={{ margin: 0, color: "#a1a1aa", fontSize: 13, lineHeight: 1.6 }}>{node.note}</p>
                </div>
              ))}
            </section>

            <section className="world-panel" style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: 18, padding: 16, display: "grid", gap: 10, background: "rgba(255,255,255,0.025)" }}>
              <p style={{ margin: 0, fontSize: 10, color: "#71717a", textTransform: "uppercase", letterSpacing: "0.18em" }}>Next moves</p>
              <ul style={{ margin: 0, paddingLeft: 18, color: "#d4d4d8", lineHeight: 1.7 }}>
                {insight.nextMoves.map((move) => (
                  <li key={move}>{move}</li>
                ))}
              </ul>
              {insight.strongestEdge ? (
                <div style={{ marginTop: 4, padding: 12, borderRadius: 14, background: "rgba(255,255,255,0.03)", color: "#a1a1aa", fontSize: 13, lineHeight: 1.6, border: "1px solid rgba(255,255,255,0.04)" }}>
                  Strongest edge: <strong style={{ color: "#f5f5f5" }}>{insight.strongestEdge.type}</strong> between{" "}
                  <strong style={{ color: "#f5f5f5" }}>{indexed[insight.strongestEdge.from]?.label ?? insight.strongestEdge.from}</strong> and{" "}
                  <strong style={{ color: "#f5f5f5" }}>{indexed[insight.strongestEdge.to]?.label ?? insight.strongestEdge.to}</strong>.
                </div>
              ) : null}
            </section>
          </div>
        </section>
      ) : (
        <section style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: 18, padding: 18, color: "#d4d4d8", lineHeight: 1.6, background: "rgba(255,255,255,0.02)" }}>
          Generate interpretation to see field guidance.
        </section>
      )}
      <style>{`
        @media (max-width: 720px) {
          .world-canvas-meta {
            grid-template-columns: 1fr !important;
          }

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
