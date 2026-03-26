export function buildState(message: string) {
  const now = new Date().toISOString();

  const isConflict = message.toLowerCase().includes("fight") || message.toLowerCase().includes("argue");

  return {
    createdAt: now,
    synthesis: {
      you: isConflict
        ? "You are trying to resolve tension directly"
        : "You are trying to connect or clarify",
      them: isConflict
        ? "They may feel pressured or defensive"
        : "They may be open but cautious",
      dynamic: isConflict ? "pursue-withdraw" : "alignment-seeking",
      timing: isConflict
        ? "Better to soften or delay"
        : "Safe to engage directly",
    },
    field: {
      nodes: ["you", "them"],
      edge: {
        valence: isConflict ? "strained" : "aligned",
        intensity: isConflict ? 70 : 40,
      },
    },
  };
}
