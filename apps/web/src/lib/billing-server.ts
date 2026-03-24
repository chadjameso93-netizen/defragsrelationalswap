import { resolveEntitlements } from "../../../../packages/billing/src";
import { getBillingAccount } from "../server/billing-state-store";

export async function getBillingStateForUser(userId: string) {
  const account = await getBillingAccount(userId);
  const entitlements = resolveEntitlements(account.plan, account.subscriptionState);

  return {
    account,
    entitlements,
  };
}
