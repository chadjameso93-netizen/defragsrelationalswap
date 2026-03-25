import { createBillingService, createCompanionService, createInsightService, createWorldService } from "../../../../../packages/platform-server/src";
import { type BillingPlan, type CompanionIntakeInput } from "../../../../../packages/core/src";
import type {
  ToolResultMetadata,
  FutureToolName,
} from "../../../../../packages/platform/src";
import {
  generateInsightResponseWithProvider,
  generateSimulationResponse,
  interpretWorldScene,
  runCompanionReasoning,
} from "../../../../../packages/reasoning/src";
import { resolveEntitlements } from "../../../../../packages/billing/src";
import { getDemoAccount, getToolLinkBack, type DemoAccount } from "../auth/runtime-auth";

interface CompanionThreadRecord {
  id: string;
  userId: string;
  title: string;
  createdAt: string;
}

interface FollowUpActionRecord {
  id: string;
  insightId: string;
  type: "show_evidence" | "rephrase" | "practice_conversation";
  label: string;
  payload?: Record<string, unknown>;
  createdAt: string;
}

interface StoredInsightRecord {
  id: string;
  userId: string;
  threadId: string;
  createdAt: string;
  confidence: number;
  contract: Awaited<ReturnType<typeof runCompanionReasoning>>["output"];
  synthesis: Awaited<ReturnType<typeof runCompanionReasoning>>["synthesis"];
  evaluation: Awaited<ReturnType<typeof runCompanionReasoning>>["evaluation"];
}

const threads: CompanionThreadRecord[] = [];
const insights: StoredInsightRecord[] = [];
const actions: FollowUpActionRecord[] = [];

let threadCounter = 1;
let insightCounter = 1;
let actionCounter = 1;
let checkoutCounter = 1;

function nextId(prefix: string, counter: number) {
  return `${prefix}_${counter.toString().padStart(4, "0")}`;
}

function createMetadata(input: {
  toolName: FutureToolName;
  userId: string;
  plan: BillingPlan;
  status: string;
  session?: {
    sessionId?: string;
    threadId?: string;
    insightId?: string;
    continuationId?: string;
    worldStateId?: string;
  };
}): ToolResultMetadata {
  const linkBack = getToolLinkBack(input.toolName);
  const ctaKind =
    input.toolName === "begin_upgrade_checkout"
      ? "upgrade"
      : input.toolName === "open_billing_portal"
        ? "manage_billing"
        : "open_website";

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
                : ["checkout internals", "billing management UI"],
    },
    linkBack,
    ctas: [
      {
        id: input.toolName,
        label: linkBack.label,
        kind: ctaKind,
        target: linkBack,
      },
    ],
  };
}

function accountOrThrow(userId: string): DemoAccount {
  const account = getDemoAccount(userId);
  if (!account) {
    throw new Error("unknown_demo_user");
  }
  return account;
}

export function createDemoPlatformRuntime(baseUrl: string) {
  const companionService = createCompanionService({
    store: {
      async listThreadsForUser(userId) {
        return threads.filter((thread) => thread.userId === userId);
      },
      async listRecentInsightsForUser(userId) {
        return insights
          .filter((item) => item.userId === userId)
          .slice(-5)
          .map((item) => ({
            id: item.id,
            threadId: item.threadId,
            contract: item.contract,
            createdAt: item.createdAt,
            synthesis: item.synthesis,
            evaluation: item.evaluation,
            confidence: item.confidence,
          }));
      },
      async listRecentActionsForUser(userId) {
        const userInsightIds = new Set(insights.filter((item) => item.userId === userId).map((item) => item.id));
        return actions.filter((action) => userInsightIds.has(action.insightId)).slice(-5);
      },
      async listInsightsForThread(userId, threadId) {
        return insights
          .filter((item) => item.userId === userId && item.threadId === threadId)
          .map((item) => ({
            id: item.id,
            threadId: item.threadId,
            contract: item.contract,
            createdAt: item.createdAt,
            synthesis: item.synthesis,
            evaluation: item.evaluation,
            confidence: item.confidence,
          }));
      },
      async createThread(userId, title) {
        const thread = {
          id: nextId("thread", threadCounter++),
          userId,
          title,
          createdAt: new Date().toISOString(),
        };
        threads.push(thread);
        return thread;
      },
      async createInsightForThread(userId, threadId, output, synthesis, evaluation, followUpActions) {
        const insightId = nextId("insight", insightCounter++);
        insights.push({
          id: insightId,
          userId,
          threadId,
          createdAt: new Date().toISOString(),
          confidence: synthesis.confidence,
          contract: output,
          synthesis,
          evaluation,
        });

        for (const followUpAction of followUpActions) {
          actions.push({
            id: nextId("action", actionCounter++),
            insightId,
            type: followUpAction.type,
            label: followUpAction.label,
            payload: followUpAction.payload,
            createdAt: new Date().toISOString(),
          });
        }

        return { id: insightId };
      },
      async getInsightById(userId, insightId) {
        const insight = insights.find((item) => item.id === insightId && item.userId === userId);
        if (!insight) {
          return null;
        }
        return {
          id: insight.id,
          threadId: insight.threadId,
          contract: insight.contract,
          createdAt: insight.createdAt,
          synthesis: insight.synthesis,
          evaluation: insight.evaluation,
          confidence: insight.confidence,
        };
      },
      async listActionsForInsight(insightId) {
        return actions.filter((action) => action.insightId === insightId);
      },
    },
    async runReasoning(input: CompanionIntakeInput) {
      return runCompanionReasoning(input);
    },
    async resolveMetadataContext(userId) {
      const account = accountOrThrow(userId);
      return {
        plan: account.plan,
        status: account.subscriptionState,
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
      return generateInsightResponseWithProvider(request, { provider: "heuristic" });
    },
    async generateSimulation(request) {
      return generateSimulationResponse(request, { provider: "heuristic" });
    },
    async resolveMetadataContext(userId) {
      const account = accountOrThrow(userId);
      return {
        plan: account.plan,
        status: account.subscriptionState,
      };
    },
    createMetadata(input) {
      return createMetadata({
        toolName: input.toolName,
        userId: input.userId,
        plan: input.plan,
        status: input.status,
        session: {
          sessionId: input.continuationId,
          insightId: input.insightId,
          continuationId: input.continuationId,
        },
      });
    },
  });

  const worldService = createWorldService({
    async resolveWorldEntitlement(userId) {
      const account = accountOrThrow(userId);
      const entitlements = resolveEntitlements(account.plan, account.subscriptionState);
      return { allowed: entitlements.canUseCompanion };
    },
    async resolveMetadataContext(userId) {
      const account = accountOrThrow(userId);
      return {
        plan: account.plan,
        status: account.subscriptionState,
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
          sessionId: input.continuationId,
          worldStateId: input.continuationId,
          continuationId: input.continuationId,
        },
      });
    },
  });

  const billingService = createBillingService({
    state: {
      async getBillingAccount(userId) {
        return accountOrThrow(userId);
      },
      async ensureBillingAccount(userId) {
        return accountOrThrow(userId);
      },
      async upsertCustomerForUser(userId, customerId) {
        const account = accountOrThrow(userId);
        account.customerId = customerId;
        account.updatedAt = new Date().toISOString();
        return account;
      },
    },
    stripe: {
      async retrieveCustomer(customerId) {
        return { id: customerId, deleted: false };
      },
      async createCustomer(input) {
        return { id: `cus_${input.userId}` };
      },
      async createCheckoutSession(input) {
        const id = nextId("checkout", checkoutCounter++);
        return {
          id,
          url: `${baseUrl}/account/billing?source=chatgpt-mcp&checkout=${id}&plan=${input.priceId}`,
        };
      },
      async createBillingPortalSession() {
        return {
          url: `${baseUrl}/account/billing?source=chatgpt-mcp&portal=1`,
        };
      },
    },
    getPriceId(plan) {
      return plan;
    },
    getBaseUrl() {
      return baseUrl;
    },
    createMetadata(input) {
      return createMetadata({
        toolName: input.toolName,
        userId: input.userId,
        plan: input.plan,
        status: input.status,
      });
    },
  });

  return {
    companionService,
    insightService,
    worldService,
    billingService,
  };
}

export function getDemoEntitlementSummary(userId: string) {
  const account = accountOrThrow(userId);
  return {
    account,
    entitlements: resolveEntitlements(account.plan, account.subscriptionState),
  };
}
