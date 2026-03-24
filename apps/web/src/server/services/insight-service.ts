import type {
  RelationshipInsightInput,
  RelationshipInsightOutput,
  RelationshipSimulationOutput,
} from "../../../../../packages/platform/src";
import { generateInsightResponseWithProvider, generateSimulationResponse } from "../reasoning/insight-generator";

export async function generateRelationshipInsight(input: RelationshipInsightInput): Promise<RelationshipInsightOutput> {
  return {
    insight: await generateInsightResponseWithProvider(input.request),
  };
}

export async function generateRelationshipSimulation(input: RelationshipInsightInput): Promise<RelationshipSimulationOutput> {
  return {
    simulation: await generateSimulationResponse(input.request),
  };
}
