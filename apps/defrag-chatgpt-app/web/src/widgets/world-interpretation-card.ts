import { worldSignalOutputExample } from "../../../../../packages/platform/src";
import { renderWidgetPage } from "./base";

export function renderWorldInterpretationCard() {
  return renderWidgetPage({
    kicker: "World",
    title: "World interpretation",
    summary: worldSignalOutputExample.interpretation.timingSummary,
    bullets: worldSignalOutputExample.interpretation.nextMoves,
    actions: [
      { label: "Open World", url: "https://defrag.app/world" },
    ],
  });
}
