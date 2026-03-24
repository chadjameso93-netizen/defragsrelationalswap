"use client";

import { useMemo, useState } from "react";
import type { WorldEdge, WorldNode } from "../../../../packages/core/src";

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
  const [insight, setInsight] = useState<string>("Generate interpretation to see field guidance.");

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
            const body = (await response.json()) as { interpretation?: { dominantPattern: string; highestChargeNodeId: string; stabilizationHint: string; timingSummary: string } };
            if (!response.ok || !body.interpretation) {
              setInsight("Interpretation unavailable right now.");
              return;
            }
            setInsight(
              `Pattern: ${body.interpretation.dominantPattern}. Highest charge: ${body.interpretation.highestChargeNodeId}. ${body.interpretation.timingSummary} ${body.interpretation.stabilizationHint}`,
            );
          }}
          style={{ borderRadius: 999, border: 0, background: "#fafafa", color: "#111", padding: "8px 12px", cursor: "pointer", fontWeight: 600 }}
        >
          Interpret field
        </button>
      </div>

      <section style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, padding: 14, color: "#d4d4d8", lineHeight: 1.6 }}>
        {insight}
      </section>
    </div>
  );
}
