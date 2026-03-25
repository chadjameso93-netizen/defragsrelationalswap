import type { ToolResultMetadata, WorldInterpretation, WorldSignalInput, WorldSignalOutput } from "../../platform/src";

interface WorldServiceDeps {
  resolveWorldEntitlement(userId: string): Promise<{ allowed: boolean }>;
  resolveMetadataContext(userId: string): Promise<{
    plan: "free" | "core" | "studio" | "realtime" | "professional" | "team" | "api" | "enterprise";
    status: string;
  }>;
  interpret(scene: WorldSignalInput["scene"]): WorldInterpretation;
  createMetadata(input: {
    toolName: "interpret_world_signal";
    userId: string;
    plan: "free" | "core" | "studio" | "realtime" | "professional" | "team" | "api" | "enterprise";
    status: string;
    continuationId?: string;
  }): ToolResultMetadata;
}

export function createWorldService(deps: WorldServiceDeps) {
  return {
    async interpret(input: WorldSignalInput): Promise<WorldSignalOutput> {
      const access = await deps.resolveWorldEntitlement(input.userId);
      if (!access.allowed) {
        throw new Error("FORBIDDEN");
      }

      const metadataContext = await deps.resolveMetadataContext(input.userId);

      return {
        interpretation: deps.interpret(input.scene),
        metadata: deps.createMetadata({
          toolName: "interpret_world_signal",
          userId: input.userId,
          plan: metadataContext.plan,
          status: metadataContext.status,
          continuationId: `world:${input.userId}`,
        }),
      };
    },
  };
}
