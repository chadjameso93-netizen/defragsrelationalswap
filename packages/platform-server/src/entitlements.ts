import { isBillingBypassEmail } from '../../apps/web/src/lib/billing-bypass';

export type DefragEntitlement = 'none' | 'full';

export type DefragEntitlementInput = {
  email?: string | null;
  subscriptionStatus?: string | null;
};

export function getDefragEntitlement(input: DefragEntitlementInput): DefragEntitlement {
  if (isBillingBypassEmail(input.email)) {
    return 'full';
  }

  if (input.subscriptionStatus === 'active' || input.subscriptionStatus === 'trialing') {
    return 'full';
  }

  return 'none';
}

export function hasDefragAccess(input: DefragEntitlementInput) {
  return getDefragEntitlement(input) === 'full';
}
