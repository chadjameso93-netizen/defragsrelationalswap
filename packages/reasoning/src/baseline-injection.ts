export type BaselineSummary = {
  communicationStyle?: string;
  stressPattern?: string;
  pacingTendency?: string;
  repairTendency?: string;
};

export type BaselineInjectionInput = {
  baseline?: BaselineSummary | null;
  context?: Record<string, unknown> | null;
};

export function injectBaselineContext(input: BaselineInjectionInput) {
  const baseline = input.baseline ?? null;

  return {
    ...input.context,
    baseline_summary: baseline
      ? {
          communication_style: baseline.communicationStyle ?? null,
          stress_pattern: baseline.stressPattern ?? null,
          pacing_tendency: baseline.pacingTendency ?? null,
          repair_tendency: baseline.repairTendency ?? null,
        }
      : null,
  };
}
