import { describe, expect, it } from "vitest";
import { interpretWorldScene } from "../world-field";

describe("world field interpretation", () => {
  it("derives pattern/timing summary from scene events", () => {
    const interpretation = interpretWorldScene({
      nodes: [
        { id: "a", label: "You", type: "person", x: 10, y: 10, charge: 0.8 },
        { id: "b", label: "Other", type: "person", x: 20, y: 20, charge: 0.5 },
      ],
      edges: [{ id: "e", from: "a", to: "b", type: "tension", intensity: 0.9 }],
      events: ["We argued and then pulled away."],
    });

    expect(interpretation.highestChargeNodeId).toBe("a");
    expect(interpretation.timingSummary.length).toBeGreaterThan(10);
  });
});
