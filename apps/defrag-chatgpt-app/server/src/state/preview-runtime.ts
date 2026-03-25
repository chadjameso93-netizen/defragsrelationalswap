import { createClient } from "@supabase/supabase-js";
import {
  createCompanionService,
  createInsightService,
  createWorldService,
} from "../../../../../packages/platform-server/src";
import { resolveEntitlements } from "../../../../../packages/billing/src";
import type {
  BillingPlan,
  CompanionEvaluationRubric,
  CompanionOutputContract,
  CompanionStructuredSynthesis,
} from "../../../../../packages/core/src";
import type {
  CompanionActionType,
  ToolResultMetadata,
  WorldSignalInput,
} from "../../../../../packages/platform/src";
import {
  generateInsightResponseWithProvider,
  generateSimulationResponse,
  interpretWorldScene,
  runCompanionReasoning,
} from "../../../../../packages/reasoning/src";
import { getPreviewAuthEnv } from "../auth/env";

type JsonLike = string | number | boolean | null | JsonLike[] | { [key: string]: JsonLike };

interface BillingAccountRow {
  user_id: string;
  stripe_customer_id: string | null;
  current_plan: BillingPlan;
  subscription_state: string;
}

function createAdminClient() {
  const env = getPreviewAuthEnv();
  if (!env.supabaseUrl || !env.supabaseServiceRoleKey) {
    throw new Error("missing_supabase_admin_env");
  }

  return createClient(env.supabaseUrl, env.supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.filter((item): item is string => typeof item === "string");
}

function asRecord(value: unknown): Record<string, unknown> {
  if (!value || Array.isArray(value) || typeof value !== "object") {
    return {};
  }
  return value as Record<string, unknown>;
}

function asActionType(value: string): CompanionActionType {
  if (value === "show_evidence" || value === "rephrase" || value === "practice_conversation") {
    return value;
  }
  return "show_evidence";
}

async function getBillingAccount(userId: string): Promise<BillingAccountRow> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("billing_accounts")
    .select("user_id,stripe_customer_id,current_plan,subscription_state")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return (data as BillingAccountRow | null) ?? {
    user_id: userId,
    stripe_customer_id: null,
    current_plan: "free",
    subscription_state: "none",
  };
}

function createMetadata(input: {
  toolName: ToolResultMetadata["toolName"];
  userId: string;
  plan: BillingPlan;
  status: string;
  session?: ToolResultMetadata["session"];
}) {
  const intent =
    input.toolName === "begin_upgrade_checkout"
      ? "upgrade"
      : input.toolName === "open_billing_portal"
        ? "manage"
        : input.toolName === "generate_relationship_insight"
          ? "review"
          : "continue";
  const path =
    input.toolName === "generate_relationship_insight"
      ? "/account/insights"
      : input.toolName === "interpret_world_signal"
        ? "/world"
        : input.toolName === "get_account_entitlements" ||
            input.toolName === "begin_upgrade_checkout" ||
            input.toolName === "open_billing_portal"
          ? "/account/billing"
          : "/companion";
  const label =
    input.toolName === "generate_relationship_insight"
      ? "Open Insights"
      : input.toolName === "interpret_world_signal"
        ? "Open World"
        : input.toolName === "get_account_entitlements" ||
            input.toolName === "begin_upgrade_checkout" ||
            input.toolName === "open_billing_portal"
          ? "Open Billing"
          : "Open Dynamics";

  return {
    toolName: input.toolName,
    session: input.session,
    auth: {
      state: input.plan === "free" ? "linked_unentitled" : "linked_entitled",
      userId: input.userId,
      plan: input.plan,
      entitlementStatus: input.status,
    },
    display: {
      defaultMode:
        input.toolName === "get_account_entitlements"
          ? "inline-card"
          : input.toolName === "begin_upgrade_checkout" || input.toolName === "open_billing_portal"
            ? "redirect-only"
            : "inline-card",
      capability:
        input.toolName === "get_account_entitlements"
          ? "inline-only"
          : input.toolName === "begin_upgrade_checkout" || input.toolName === "open_billing_portal"
            ? "redirect-only"
            : "inline-plus-fullscreen",
      inlineCardSufficient: input.toolName !== "begin_upgrade_checkout" && input.toolName !== "open_billing_portal",
      fullscreenJustifiedLater:
        input.toolName === "get_companion_guidance" ||
        input.toolName === "generate_relationship_insight" ||
        input.toolName === "interpret_world_signal",
      maxInlineCtas: input.toolName === "get_account_entitlements" ? 1 : 2,
      inlineFields:
        input.toolName === "get_companion_guidance"
          ? ["whatChanged", "nextMove", "timingSignal"]
          : input.toolName === "generate_relationship_insight"
            ? ["what_may_be_happening", "what_to_try_next"]
            : input.toolName === "interpret_world_signal"
              ? ["dominantPattern", "pressureLevel", "repairWindow", "nextMoves"]
              : input.toolName === "get_account_entitlements"
                ? ["plan", "status", "entitlements"]
                : ["url"],
      omitFromInline:
        input.toolName === "get_companion_guidance"
          ? ["full evidence panel", "complete thread history"]
          : input.toolName === "generate_relationship_insight"
            ? ["full proof/context notes", "share studio"]
            : input.toolName === "interpret_world_signal"
              ? ["full canvas editing", "deep node inspection"]
              : input.toolName === "get_account_entitlements"
                ? ["full billing history"]
                : ["portal internals", "checkout internals"],
    },
    linkBack: { path, label, intent, mode: "website-redirect" as const },
    ctas: [
      {
        id: input.toolName,
        label,
        kind:
          input.toolName === "begin_upgrade_checkout"
            ? "upgrade"
            : input.toolName === "open_billing_portal"
              ? "manage_billing"
              : "open_website",
        target: { path, label, intent, mode: "website-redirect" as const },
      },
    ],
  } satisfies ToolResultMetadata;
}

export function createPreviewPlatformRuntime() {
  const env = getPreviewAuthEnv();
  const baseUrl = env.canonicalAppUrl;

  const companionService = createCompanionService({
    store: {
      async listThreadsForUser(userId) {
        const supabase = createAdminClient();
        const { data, error } = await supabase
          .from("companion_threads")
          .select("id,user_id,title,created_at")
          .eq("user_id", userId)
          .order("updated_at", { ascending: false });
        if (error) throw error;
        return (data ?? []).map((row) => ({
          id: row.id,
          userId: row.user_id,
          title: row.title,
          createdAt: row.created_at,
        }));
      },
      async listRecentInsightsForUser(userId) {
        const supabase = createAdminClient();
        const { data, error } = await supabase
          .from("companion_insights")
          .select("id,thread_id,created_at,confidence,synthesis,evaluation,what_happened,your_side,their_side,what_changed,next_move,what_this_is_based_on")
          .eq("user_id", userId)
          .order("created_at", { ascending: false })
          .limit(12);
        if (error) throw error;
        return (data ?? []).map((row) => ({
          id: row.id,
          threadId: row.thread_id,
          createdAt: row.created_at,
          confidence: row.confidence ?? 0.5,
          synthesis: row.synthesis ?? null,
          evaluation: row.evaluation ?? null,
          contract: {
            whatHappened: row.what_happened,
            yourSide: row.your_side,
            theirSide: row.their_side,
            whatChanged: row.what_changed,
            nextMove: row.next_move,
            whatThisIsBasedOn: asStringArray(row.what_this_is_based_on),
          },
        }));
      },
      async listRecentActionsForUser(userId) {
        const supabase = createAdminClient();
        const { data: insights, error: insightsError } = await supabase
          .from("companion_insights")
          .select("id")
          .eq("user_id", userId)
          .order("created_at", { ascending: false })
          .limit(20);
        if (insightsError) throw insightsError;
        const insightIds = (insights ?? []).map((item) => item.id);
        if (insightIds.length === 0) return [];
        const { data, error } = await supabase
          .from("companion_follow_up_actions")
          .select("id,insight_id,action_type,label,payload,created_at")
          .in("insight_id", insightIds)
          .order("created_at", { ascending: false })
          .limit(20);
        if (error) throw error;
        return (data ?? []).map((row) => ({
          id: row.id,
          insightId: row.insight_id,
          type: asActionType(row.action_type),
          label: row.label,
          payload: asRecord(row.payload),
          createdAt: row.created_at,
        }));
      },
      async listInsightsForThread(userId, threadId) {
        const supabase = createAdminClient();
        const { data, error } = await supabase
          .from("companion_insights")
          .select("id,thread_id,created_at,confidence,synthesis,evaluation,what_happened,your_side,their_side,what_changed,next_move,what_this_is_based_on")
          .eq("user_id", userId)
          .eq("thread_id", threadId)
          .order("created_at", { ascending: false });
        if (error) throw error;
        return (data ?? []).map((row) => ({
          id: row.id,
          threadId: row.thread_id,
          createdAt: row.created_at,
          confidence: row.confidence ?? 0.5,
          synthesis: row.synthesis ?? null,
          evaluation: row.evaluation ?? null,
          contract: {
            whatHappened: row.what_happened,
            yourSide: row.your_side,
            theirSide: row.their_side,
            whatChanged: row.what_changed,
            nextMove: row.next_move,
            whatThisIsBasedOn: asStringArray(row.what_this_is_based_on),
          },
        }));
      },
      async createThread(userId, title) {
        const supabase = createAdminClient();
        const { data, error } = await supabase
          .from("companion_threads")
          .insert({ user_id: userId, title })
          .select("id,user_id,title,created_at")
          .single();
        if (error) throw error;
        return {
          id: data.id,
          userId: data.user_id,
          title: data.title,
          createdAt: data.created_at,
        };
      },
      async createInsightForThread(userId, threadId, contract, synthesis, evaluation, actions) {
        const supabase = createAdminClient();
        const { data: insightData, error: insightError } = await supabase
          .from("companion_insights")
          .insert({
            user_id: userId,
            thread_id: threadId,
            confidence: synthesis.confidence,
            synthesis: synthesis as unknown as JsonLike,
            evaluation: evaluation as unknown as JsonLike,
            what_happened: contract.whatHappened,
            your_side: contract.yourSide,
            their_side: contract.theirSide,
            what_changed: contract.whatChanged,
            next_move: contract.nextMove,
            what_this_is_based_on: contract.whatThisIsBasedOn as unknown as JsonLike,
          })
          .select("id,thread_id,created_at")
          .single();
        if (insightError) throw insightError;

        if (actions.length > 0) {
          const { error: actionsError } = await supabase.from("companion_follow_up_actions").insert(
            actions.map((action) => ({
              insight_id: insightData.id,
              action_type: action.type,
              label: action.label,
              payload: (action.payload ?? {}) as JsonLike,
            })),
          );
          if (actionsError) throw actionsError;
        }

        return {
          id: insightData.id,
          threadId: insightData.thread_id,
          createdAt: insightData.created_at,
          confidence: synthesis.confidence,
          synthesis,
          evaluation,
          contract,
        };
      },
      async getInsightById(userId, insightId) {
        const supabase = createAdminClient();
        const { data, error } = await supabase
          .from("companion_insights")
          .select("id,thread_id,created_at,confidence,synthesis,evaluation,what_happened,your_side,their_side,what_changed,next_move,what_this_is_based_on")
          .eq("user_id", userId)
          .eq("id", insightId)
          .maybeSingle();
        if (error) throw error;
        if (!data) return null;
        return {
          id: data.id,
          threadId: data.thread_id,
          createdAt: data.created_at,
          confidence: data.confidence ?? 0.5,
          synthesis: data.synthesis as CompanionStructuredSynthesis | null,
          evaluation: data.evaluation as CompanionEvaluationRubric | null,
          contract: {
            whatHappened: data.what_happened,
            yourSide: data.your_side,
            theirSide: data.their_side,
            whatChanged: data.what_changed,
            nextMove: data.next_move,
            whatThisIsBasedOn: asStringArray(data.what_this_is_based_on),
          },
        };
      },
      async listActionsForInsight(insightId) {
        const supabase = createAdminClient();
        const { data, error } = await supabase
          .from("companion_follow_up_actions")
          .select("id,insight_id,action_type,label,payload,created_at")
          .eq("insight_id", insightId)
          .order("created_at", { ascending: true });
        if (error) throw error;
        return (data ?? []).map((row) => ({
          id: row.id,
          insightId: row.insight_id,
          type: asActionType(row.action_type),
          label: row.label,
          payload: asRecord(row.payload),
          createdAt: row.created_at,
        }));
      },
    },
    runReasoning: runCompanionReasoning,
    async resolveMetadataContext(userId) {
      const account = await getBillingAccount(userId);
      return {
        plan: account.current_plan,
        status: account.subscription_state,
      };
    },
    createMetadata(input) {
      return createMetadata({
        toolName: input.toolName,
        userId: input.userId,
        plan: input.plan,
        status: input.status,
        session: {
          sessionId: input.threadId,
          threadId: input.threadId,
          insightId: input.insightId,
          continuationId: `${input.threadId}:${input.insightId}`,
        },
      });
    },
  });

  const insightService = createInsightService({
    async generateInsight(request) {
      return generateInsightResponseWithProvider(request, {
        provider: process.env.DEFRAG_REASONING_PROVIDER === "openai" ? "openai" : "heuristic",
        apiKey: process.env.OPENAI_API_KEY,
        model: process.env.DEFRAG_OPENAI_MODEL,
        enableModelGeneration: Boolean(process.env.OPENAI_API_KEY),
      });
    },
    async generateSimulation(request) {
      return generateSimulationResponse(request, {
        provider: process.env.DEFRAG_REASONING_PROVIDER === "openai" ? "openai" : "heuristic",
        apiKey: process.env.OPENAI_API_KEY,
        model: process.env.DEFRAG_OPENAI_MODEL,
        enableModelGeneration: Boolean(process.env.OPENAI_API_KEY),
      });
    },
    async resolveMetadataContext(userId) {
      const account = await getBillingAccount(userId);
      return {
        plan: account.current_plan,
        status: account.subscription_state,
      };
    },
    createMetadata(input) {
      return createMetadata({
        toolName: input.toolName,
        userId: input.userId,
        plan: input.plan,
        status: input.status,
        session: {
          continuationId: input.continuationId,
        },
      });
    },
  });

  const worldService = createWorldService({
    async resolveWorldEntitlement(userId) {
      const account = await getBillingAccount(userId);
      const entitlements = resolveEntitlements(
        account.current_plan,
        account.subscription_state as "none" | "trialing" | "active" | "past_due" | "canceled" | "incomplete",
      );
      return { allowed: entitlements.canUseCompanion };
    },
    async resolveMetadataContext(userId) {
      const account = await getBillingAccount(userId);
      return {
        plan: account.current_plan,
        status: account.subscription_state,
      };
    },
    interpret: interpretWorldScene,
    createMetadata(input) {
      return createMetadata({
        toolName: input.toolName,
        userId: input.userId,
        plan: input.plan,
        status: input.status,
        session: {
          continuationId: input.continuationId,
          worldStateId: input.continuationId,
        },
      });
    },
  });

  const billingService = {
    async getAccountEntitlements(userId: string) {
      const account = await getBillingAccount(userId);
      return {
        userId,
        plan: account.current_plan,
        status: account.subscription_state,
        entitlements: resolveEntitlements(
          account.current_plan,
          account.subscription_state as "none" | "trialing" | "active" | "past_due" | "canceled" | "incomplete",
        ),
        metadata: createMetadata({
          toolName: "get_account_entitlements",
          userId,
          plan: account.current_plan,
          status: account.subscription_state,
        }),
      };
    },
    async beginUpgradeCheckout(input: { userId: string; plan: BillingPlan }) {
      const account = await getBillingAccount(input.userId);
      return {
        checkoutUrl: `${baseUrl}/account/billing?upgrade=${input.plan}&source=chatgpt`,
        sessionId: `handoff:${input.userId}:${input.plan}`,
        metadata: createMetadata({
          toolName: "begin_upgrade_checkout",
          userId: input.userId,
          plan: account.current_plan,
          status: account.subscription_state,
        }),
      };
    },
    async openBillingPortal(input: { userId: string }) {
      const account = await getBillingAccount(input.userId);
      return {
        portalUrl: `${baseUrl}/account/billing?source=chatgpt`,
        metadata: createMetadata({
          toolName: "open_billing_portal",
          userId: input.userId,
          plan: account.current_plan,
          status: account.subscription_state,
        }),
      };
    },
  };

  return {
    companionService,
    insightService,
    worldService,
    billingService,
  };
}
