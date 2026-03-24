import type { ToolResultMetadata, WorldInterpretation, WorldSignalInput, WorldSignalOutput } from "../../platform/src";

interface WorldServiceDeps {
  resolveWorldEntitlement(userId: string): Promise<{ allowed: boolean }>;
  interpret(scene: WorldSignalInput["scene"]): WorldInterpretation;
  createMetadata(input: {
    toolName: "interpret_world_signal";
    userId: string;
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

      return {
        interpretation: deps.interpret(input.scene),
        metadata: deps.createMetadata({
          toolName: "interpret_world_signal",
          userId: input.userId,
          continuationId: `world:${input.userId}`,
        }),
      };
    },
  };
}
