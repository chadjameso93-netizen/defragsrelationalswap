import { accountEntitlementsOutputExample } from "../../../../../packages/platform/src";
import { renderWidgetPage } from "./base";

export function renderEntitlementStatusCard() {
  return renderWidgetPage({
    kicker: "Account",
    title: "Entitlement status",
    summary: `${accountEntitlementsOutputExample.plan} plan · ${accountEntitlementsOutputExample.status}`,
    bullets: [
      `Dynamics: ${accountEntitlementsOutputExample.entitlements.canUseDynamics ? "available" : "unavailable"}`,
      `Insights: ${accountEntitlementsOutputExample.entitlements.canUseInsights ? "available" : "upgrade required"}`,
    ],
    actions: [
      { label: "Open Billing", url: "https://defrag.app/account/billing" },
    ],
  });
}
