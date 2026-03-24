export async function getSubscription() {
  return { status: "none" };
}

export function isSubscriptionActive(subscription: { status?: string } | null | undefined) {
  return subscription?.status === "active" || subscription?.status === "trialing";
}
