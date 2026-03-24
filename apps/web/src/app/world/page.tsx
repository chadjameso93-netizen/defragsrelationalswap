import { redirect } from "next/navigation";
import { AppShell } from "../../components/app-shell";
import { WorldAlphaCanvas } from "../../components/world-alpha-canvas";
import { getBillingStateForUser } from "../../lib/billing-server";
import { getAuthenticatedUserOrNull } from "../../server/auth";

export default async function WorldPage() {
  const user = await getAuthenticatedUserOrNull();

  if (!user) {
    redirect("/login");
  }

  const { entitlements } = await getBillingStateForUser(user.userId);

  if (!entitlements.canUseCompanion) {
    redirect("/account/billing");
  }

  return (
    <AppShell
      eyebrow="World Alpha"
      title="See the field, not just the transcript."
      description="World maps charge, edge strength, repair timing, and likely stabilization moves across a shared relational scene."
      accent="#9fbde8"
    >
      <WorldAlphaCanvas />
    </AppShell>
  );
}
