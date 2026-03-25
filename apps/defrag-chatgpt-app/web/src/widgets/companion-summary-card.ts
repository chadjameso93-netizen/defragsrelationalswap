import { companionGuidanceOutputExample } from "../../../../../packages/platform/src";
import { renderWidgetPage } from "./base";

export function renderCompanionSummaryCard() {
  return renderWidgetPage({
    kicker: "Dynamics",
    title: "Dynamics guidance",
    summary: companionGuidanceOutputExample.reasoning.output.whatChanged,
    bullets: [
      companionGuidanceOutputExample.reasoning.output.nextMove,
      companionGuidanceOutputExample.reasoning.synthesis.timingSignal,
    ],
    actions: [
      { label: "Open Dynamics", url: "https://defrag.app/companion" },
    ],
  });
}
