export const BILLING_BYPASS_EMAILS = new Set([
  'chadowen93@gmail.com',
  'yelloyelloyello@icloud.com',
]);

export function normalizeEmail(email?: string | null) {
  return (email ?? '').trim().toLowerCase();
}

export function isBillingBypassEmail(email?: string | null) {
  return BILLING_BYPASS_EMAILS.has(normalizeEmail(email));
}
