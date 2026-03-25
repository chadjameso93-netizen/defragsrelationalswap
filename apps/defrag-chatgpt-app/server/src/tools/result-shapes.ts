import type {
  AccountEntitlementsOutput,
  BillingPortalHandoffOutput,
  CheckoutHandoffOutput,
  DynamicsGuidanceOutput,
  RelationshipInsightOutput,
  ToolAuthBoundaryState,
  ToolLinkBackTarget,
  ToolRegistryEntry,
  WorldSignalOutput,
} from "../../../../../packages/platform/src";
import type { CallToolResult, TextContent } from "@modelcontextprotocol/sdk/types.js";
import { buildAuthChallengeMeta } from "../auth/production-auth";

function text(text: string): TextContent {
  return { type: "text", text };
}

function limitCtas<T>(ctas: T[], max: number) {
  return ctas.slice(0, max);
}

function limitBullets(items: string[], max = 2) {
  return items.slice(0, max);
}

function buildRedirectMeta(linkBack: ToolLinkBackTarget | null, auth: ToolAuthBoundaryState) {
  return {
    widget: {
      kind: "redirect-cta-card",
      title: linkBack?.label ?? "Continue on defrag.app",
      summary: auth.reason ?? "Continue on defrag.app to finish this step.",
      actions: linkBack
        ? [
            {
              label: linkBack.label,
              url: `https://defrag.app${linkBack.path}`,
            },
          ]
        : [],
    },
    auth,
    linkBack,
  };
}

export function createAuthChallengeResult(
  message: string,
  baseUrl: string,
  auth: ToolAuthBoundaryState,
): CallToolResult {
  return {
    isError: true,
    content: [text(message)],
    _meta: {
      "mcp/www_authenticate": buildAuthChallengeMeta(`${baseUrl}/.well-known/oauth-protected-resource/mcp`),
      ...buildRedirectMeta(auth.redirectTarget ?? null, auth),
    },
  };
}

export function createUpgradeRequiredResult(message: string, auth: ToolAuthBoundaryState): CallToolResult {
  return {
    isError: true,
    content: [text(message)],
    _meta: buildRedirectMeta(auth.redirectTarget ?? null, auth),
  };
}

export function formatDynamicsResult(result: DynamicsGuidanceOutput, entry: ToolRegistryEntry): CallToolResult {
  return {
    structuredContent: {
      threadId: result.threadId,
      insightId: result.insightId,
      what_changed: result.reasoning.output.whatChanged,
      next_move: result.reasoning.output.nextMove,
      timing_signal: result.reasoning.synthesis.timingSignal,
    },
    content: [text(`Dynamics guidance is ready. ${result.reasoning.output.whatChanged}`)],
    _meta: {
      widget: {
        kind: "dynamics-summary-card",
        title: "Dynamics guidance",
        summary: result.reasoning.output.whatChanged,
        bullets: limitBullets([
          result.reasoning.output.nextMove,
          result.reasoning.synthesis.timingSignal,
        ]),
        actions: limitCtas(result.metadata.ctas, entry.display.maxInlineCtas),
      },
      metadata: result.metadata,
      evidencePreview: result.reasoning.output.whatThisIsBasedOn.slice(0, 2),
      guardrails: {
        mode: "pattern_clarity",
        avoids: ["diagnosis", "fixed labels", "certainty"],
      },
    },
  };
}

export function formatInsightResult(result: RelationshipInsightOutput, entry: ToolRegistryEntry): CallToolResult {
  return {
    structuredContent: {
      what_may_be_happening: result.insight.insight.what_may_be_happening,
      what_it_may_be_causing: result.insight.insight.what_it_may_be_causing,
      what_to_try_next: result.insight.insight.what_to_try_next,
      confidence: result.insight.structured_synthesis?.confidence_level ?? "low",
    },
    content: [text(`Insight ready. ${result.insight.insight.what_may_be_happening}`)],
    _meta: {
      widget: {
        kind: "insight-summary-card",
        title: "Relationship insight",
        summary: result.insight.insight.what_may_be_happening,
        bullets: limitBullets(result.insight.insight.what_to_try_next),
        actions: limitCtas(result.metadata.ctas, entry.display.maxInlineCtas),
      },
      metadata: result.metadata,
      proofPreview: {
        patternCandidates: result.insight.proof?.pattern_candidates?.slice(0, 2) ?? [],
        uncertaintyNotes: result.insight.proof?.uncertainty_notes?.slice(0, 2) ?? [],
      },
      guardrails: {
        mode: "pattern_clarity",
        avoids: ["diagnosis", "fixed labels", "certainty"],
      },
    },
  };
}

export function formatWorldResult(result: WorldSignalOutput, entry: ToolRegistryEntry): CallToolResult {
  return {
    structuredContent: {
      dominant_pattern: result.interpretation.dominantPattern,
      pressure_level: result.interpretation.pressureLevel,
      repair_window: result.interpretation.repairWindow,
      next_moves: result.interpretation.nextMoves,
    },
    content: [text(`World interpretation ready. Pattern: ${result.interpretation.dominantPattern}.`)],
    _meta: {
      widget: {
        kind: "world-interpretation-card",
        title: "World interpretation",
        summary: result.interpretation.timingSummary,
        bullets: limitBullets(result.interpretation.nextMoves),
        actions: limitCtas(result.metadata.ctas, entry.display.maxInlineCtas),
      },
      metadata: result.metadata,
      interpretationPreview: {
        stabilizationHint: result.interpretation.stabilizationHint,
        strongestEdge: result.interpretation.strongestEdge,
        nodeReadings: result.interpretation.nodeReadings.slice(0, 2),
      },
      guardrails: {
        mode: "pattern_clarity",
        avoids: ["diagnosis", "fixed labels", "certainty"],
      },
    },
  };
}

export function formatEntitlementsResult(result: AccountEntitlementsOutput, entry: ToolRegistryEntry): CallToolResult {
  return {
    structuredContent: {
      userId: result.userId,
      plan: result.plan,
      status: result.status,
      entitlements: result.entitlements,
    },
    content: [],
    _meta: {
      widget: {
        kind: "entitlement-status-card",
        title: "Account entitlements",
        summary: `${result.plan} plan · ${result.status}`,
        bullets: [
          `Dynamics: ${result.entitlements.canUseDynamics ? "available" : "unavailable"}`,
          `Insights: ${result.entitlements.canUseStudio ? "available" : "upgrade required"}`,
        ],
        actions: limitCtas(result.metadata.ctas, entry.display.maxInlineCtas),
      },
      metadata: result.metadata,
    },
  };
}

function formatRedirectResultBase(
  label: string,
  url: string,
  metadata: CheckoutHandoffOutput["metadata"] | BillingPortalHandoffOutput["metadata"],
): CallToolResult {
  return {
    structuredContent: {
      url,
      label,
      redirect: true,
    },
    content: [],
    _meta: {
      widget: {
        kind: "redirect-cta-card",
        title: label,
        summary: "Billing stays canonical on defrag.app.",
        actions: [{ label, url }],
      },
      metadata,
      redirect: {
        url,
        label,
      },
    },
  };
}

export function formatCheckoutResult(result: CheckoutHandoffOutput): CallToolResult {
  return formatRedirectResultBase("Upgrade on defrag.app", result.checkoutUrl, result.metadata);
}

export function formatBillingPortalResult(result: BillingPortalHandoffOutput): CallToolResult {
  return formatRedirectResultBase("Open billing on defrag.app", result.portalUrl, result.metadata);
}
