import {
  accountEntitlementsOutputExample,
  billingPortalHandoffOutputExample,
  checkoutHandoffOutputExample,
  companionGuidanceOutputExample,
  relationshipInsightOutputExample,
  worldSignalOutputExample,
} from "../../../../../packages/platform/src";

export const WIDGET_EXAMPLE_PAYLOADS = {
  companion: companionGuidanceOutputExample,
  insight: relationshipInsightOutputExample,
  world: worldSignalOutputExample,
  entitlements: accountEntitlementsOutputExample,
  checkout: checkoutHandoffOutputExample,
  portal: billingPortalHandoffOutputExample,
} as const;

