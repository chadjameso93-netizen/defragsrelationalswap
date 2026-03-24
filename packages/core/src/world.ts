export type WorldNodeType = "person" | "self_part" | "conflict" | "future";

export interface WorldNode {
  id: string;
  label: string;
  type: WorldNodeType;
  x: number;
  y: number;
  charge: number;
}

export type WorldEdgeType = "closeness" | "tension" | "influence" | "trust";

export interface WorldEdge {
  id: string;
  from: string;
  to: string;
  type: WorldEdgeType;
  intensity: number;
}

export interface WorldScene {
  nodes: WorldNode[];
  edges: WorldEdge[];
  events: string[];
}
