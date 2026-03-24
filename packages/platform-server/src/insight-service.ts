import type {
  RelationshipInsightInput,
  RelationshipInsightOutput,
  RelationshipSimulationOutput,
  ToolResultMetadata,
} from "../../platform/src";

interface InsightServiceDeps {
  generateInsight(request: string): Promise<RelationshipInsightOutput["insight"]>;
  generateSimulation(request: string): Promise<RelationshipSimulationOutput["simulation"]>;
  createMetadata(input: {
    toolName: "generate_relationship_insight";
    userId: string;
    insightId?: string;
    continuationId?: string;
  }): ToolResultMetadata;
}

export function createInsightService(deps: InsightServiceDeps) {
  return {
    async generateInsight(input: RelationshipInsightInput): Promise<RelationshipInsightOutput> {
      return {
        insight: await deps.generateInsight(input.request),
        metadata: deps.createMetadata({
          toolName: "generate_relationship_insight",
          userId: input.userId,
          continuationId: `insight:${input.userId}`,
        }),
      };
    },

    async generateSimulation(input: RelationshipInsightInput): Promise<RelationshipSimulationOutput> {
      return {
        simulation: await deps.generateSimulation(input.request),
        metadata: deps.createMetadata({
          toolName: "generate_relationship_insight",
          userId: input.userId,
          continuationId: `simulation:${input.userId}`,
        }),
      };
    },
  };
}
