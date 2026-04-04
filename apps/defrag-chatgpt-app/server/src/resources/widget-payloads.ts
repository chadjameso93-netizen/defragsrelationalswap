import {
  accountEntitlementsOutputExample,
  billingPortalHandoffOutputExample,
  checkoutHandoffOutputExample,
  dynamicsGuidanceOutputExample,
  relationshipInsightOutputExample,
  worldSignalOutputExample,
} from "../../../../../packages/platform/src";

export const WIDGET_EXAMPLE_PAYLOADS = {
  dynamics: dynamicsGuidanceOutputExample,
  insight: relationshipInsightOutputExample,
  world: worldSignalOutputExample,
  entitlements: accountEntitlementsOutputExample,
  checkout: checkoutHandoffOutputExample,
  portal: billingPortalHandoffOutputExample,
} as const;

