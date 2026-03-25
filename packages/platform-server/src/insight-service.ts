import type {
  RelationshipInsightInput,
  RelationshipInsightOutput,
  RelationshipSimulationOutput,
  ToolResultMetadata,
} from "../../platform/src";

interface InsightServiceDeps {
  generateInsight(request: string): Promise<RelationshipInsightOutput["insight"]>;
  generateSimulation(request: string): Promise<RelationshipSimulationOutput["simulation"]>;
  resolveMetadataContext(userId: string): Promise<{
    plan: "free" | "core" | "studio" | "realtime" | "professional" | "team" | "api" | "enterprise";
    status: string;
  }>;
  createMetadata(input: {
    toolName: "generate_relationship_insight";
    userId: string;
    plan: "free" | "core" | "studio" | "realtime" | "professional" | "team" | "api" | "enterprise";
    status: string;
    insightId?: string;
    continuationId?: string;
  }): ToolResultMetadata;
}

export function createInsightService(deps: InsightServiceDeps) {
  return {
    async generateInsight(input: RelationshipInsightInput): Promise<RelationshipInsightOutput> {
      const metadataContext = await deps.resolveMetadataContext(input.userId);
      return {
        insight: await deps.generateInsight(input.request),
        metadata: deps.createMetadata({
          toolName: "generate_relationship_insight",
          userId: input.userId,
          plan: metadataContext.plan,
          status: metadataContext.status,
          continuationId: `insight:${input.userId}`,
        }),
      };
    },

    async generateSimulation(input: RelationshipInsightInput): Promise<RelationshipSimulationOutput> {
      const metadataContext = await deps.resolveMetadataContext(input.userId);
      return {
        simulation: await deps.generateSimulation(input.request),
        metadata: deps.createMetadata({
          toolName: "generate_relationship_insight",
          userId: input.userId,
          plan: metadataContext.plan,
          status: metadataContext.status,
          continuationId: `simulation:${input.userId}`,
        }),
      };
    },
  };
}
