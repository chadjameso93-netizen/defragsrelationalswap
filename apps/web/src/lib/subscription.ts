import { createClient } from "@/utils/supabase/client";

interface BillingAccountSnapshot {
  subscription_state: string;
  current_plan: string;
}

export async function getSubscription() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { status: "none", plan: "free" };
  }

  const { data: rawData } = await supabase
    .from("billing_accounts")
    .select("subscription_state,current_plan")
    .eq("user_id", user.id)
    .maybeSingle();
  const data = rawData as BillingAccountSnapshot | null;

  return {
    status: data?.subscription_state ?? "none",
    plan: data?.current_plan ?? "free",
  };
}

export function isSubscriptionActive(subscription: { status?: string } | null | undefined) {
  return subscription?.status === "active" || subscription?.status === "trialing";
}
