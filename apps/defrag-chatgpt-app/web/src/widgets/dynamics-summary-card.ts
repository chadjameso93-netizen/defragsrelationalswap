import { dynamicsGuidanceOutputExample } from "../../../../../packages/platform/src";
import { renderWidgetPage } from "./base";

export function renderDynamicsSummaryCard() {
  return renderWidgetPage({
    kicker: "Dynamics",
    title: "Dynamics guidance",
    summary: dynamicsGuidanceOutputExample.reasoning.output.whatChanged,
    bullets: [
      dynamicsGuidanceOutputExample.reasoning.output.nextMove,
      dynamicsGuidanceOutputExample.reasoning.synthesis.timingSignal,
    ],
    actions: [
      { label: "Open Dynamics", url: "https://defrag.app/dynamics" },
    ],
  });
}
