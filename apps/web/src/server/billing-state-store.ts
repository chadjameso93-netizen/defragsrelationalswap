import type { BillingAccount, BillingPlan, SubscriptionState } from "../../../../packages/core/src";
import type { NormalizedSubscription } from "../../../../packages/billing/src";
import { createAdminClient } from "../utils/supabase/admin";

interface BillingAccountRow {
  user_id: string;
  stripe_customer_id: string | null;
  current_plan: BillingPlan;
  subscription_state: SubscriptionState;
  current_period_end: string | null;
  updated_at: string;
}

function rowToBillingAccount(row: BillingAccountRow, subscriptionId: string | null): BillingAccount {
  return {
    userId: row.user_id,
    customerId: row.stripe_customer_id,
    subscriptionId,
    subscriptionState: row.subscription_state,
    plan: row.current_plan,
    currentPeriodEnd: row.current_period_end,
    updatedAt: row.updated_at,
  };
}

async function getLatestSubscriptionIdForUser(userId: string): Promise<string | null> {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("subscriptions")
    .select("stripe_subscription_id")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  return data?.stripe_subscription_id ?? null;
}

export async function getBillingAccount(userId: string): Promise<BillingAccount> {
  if (userId.startsWith("preview-user-")) {
    const plan = (userId.split("-")[2] || "studio") as BillingPlan;
    return {
      userId,
      customerId: "cus_preview123",
      subscriptionId: "sub_preview123",
      subscriptionState: "active",
      plan,
      currentPeriodEnd: null,
      updatedAt: new Date().toISOString()
    };
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("billing_accounts")
    .select("user_id,stripe_customer_id,current_plan,subscription_state,current_period_end,updated_at")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    const inserted = await ensureBillingAccount(userId);
    return inserted;
  }

  const subscriptionId = await getLatestSubscriptionIdForUser(userId);
  return rowToBillingAccount(data as BillingAccountRow, subscriptionId);
}

export async function ensureBillingAccount(userId: string): Promise<BillingAccount> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("billing_accounts")
    .upsert(
      {
        user_id: userId,
        current_plan: "free",
        subscription_state: "none",
      },
      { onConflict: "user_id" },
    )
    .select("user_id,stripe_customer_id,current_plan,subscription_state,current_period_end,updated_at")
    .single();

  if (error) {
    throw error;
  }

  return rowToBillingAccount(data as BillingAccountRow, null);
}

export async function upsertCustomerForUser(userId: string, customerId: string): Promise<BillingAccount> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("billing_accounts")
    .upsert(
      {
        user_id: userId,
        stripe_customer_id: customerId,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" },
    )
    .select("user_id,stripe_customer_id,current_plan,subscription_state,current_period_end,updated_at")
    .single();

  if (error) {
    throw error;
  }

  const subscriptionId = await getLatestSubscriptionIdForUser(userId);
  return rowToBillingAccount(data as BillingAccountRow, subscriptionId);
}

export async function getUserIdByCustomerId(customerId: string): Promise<string | null> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("billing_accounts")
    .select("user_id")
    .eq("stripe_customer_id", customerId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data?.user_id ?? null;
}

export async function upsertSubscriptionForUser(userId: string, normalized: NormalizedSubscription): Promise<BillingAccount> {
  const supabase = createAdminClient();

  const { error: subError } = await supabase.from("subscriptions").upsert(
    {
      user_id: userId,
      stripe_subscription_id: normalized.subscriptionId,
      plan: normalized.plan,
      state: normalized.state,
      current_period_end: normalized.currentPeriodEnd,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "stripe_subscription_id" },
  );

  if (subError) {
    throw subError;
  }

  const { data: accountRow, error: accountError } = await supabase
    .from("billing_accounts")
    .upsert(
      {
        user_id: userId,
        current_plan: normalized.plan,
        subscription_state: normalized.state,
        current_period_end: normalized.currentPeriodEnd,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" },
    )
    .select("user_id,stripe_customer_id,current_plan,subscription_state,current_period_end,updated_at")
    .single();

  if (accountError) {
    throw accountError;
  }

  return rowToBillingAccount(accountRow as BillingAccountRow, normalized.subscriptionId);
}

export async function markSubscriptionStateForUser(
  userId: string,
  subscriptionState: SubscriptionState,
  plan: BillingPlan,
): Promise<BillingAccount> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("billing_accounts")
    .upsert(
      {
        user_id: userId,
        current_plan: plan,
        subscription_state: subscriptionState,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" },
    )
    .select("user_id,stripe_customer_id,current_plan,subscription_state,current_period_end,updated_at")
    .single();

  if (error) {
    throw error;
  }

  const subscriptionId = await getLatestSubscriptionIdForUser(userId);
  return rowToBillingAccount(data as BillingAccountRow, subscriptionId);
}

export async function hasProcessedWebhookEvent(eventId: string): Promise<boolean> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("processed_webhook_events")
    .select("event_id")
    .eq("event_id", eventId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return Boolean(data);
}

export async function recordProcessedWebhookEvent(eventId: string): Promise<void> {
  const supabase = createAdminClient();
  const { error } = await supabase.from("processed_webhook_events").upsert(
    {
      event_id: eventId,
      processed_at: new Date().toISOString(),
    },
    { onConflict: "event_id" },
  );

  if (error) {
    throw error;
  }
}
