import type { WorldSignalInput, WorldSignalOutput } from "../../../../../packages/platform/src";
import { getBillingStateForUser } from "../../lib/billing-server";
import { interpretWorldScene } from "../reasoning/world-field";

export async function interpretWorldSignal(input: WorldSignalInput): Promise<WorldSignalOutput> {
  const { entitlements } = await getBillingStateForUser(input.userId);
  if (!entitlements.canUseCompanion) {
    throw new Error("FORBIDDEN");
  }

  return {
    interpretation: interpretWorldScene(input.scene),
  };
}
