import { relationshipInsightOutputExample } from "../../../../../packages/platform/src";
import { renderWidgetPage } from "./base";

export function renderInsightSummaryCard() {
  return renderWidgetPage({
    kicker: "Insights",
    title: "Relationship insight",
    summary: relationshipInsightOutputExample.insight.insight.what_may_be_happening,
    bullets: relationshipInsightOutputExample.insight.insight.what_to_try_next,
    actions: [
      { label: "Open Insights", url: "https://defrag.app/account/insights" },
    ],
  });
}
