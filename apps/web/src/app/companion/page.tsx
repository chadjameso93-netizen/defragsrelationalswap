import { redirect } from "next/navigation";
import { AppShell } from "../../components/app-shell";
import { CompanionWorkspace } from "../../components/companion-workspace";
import { getBillingStateForUser } from "../../lib/billing-server";
import { getAuthenticatedUserOrNull } from "../../server/auth";
import { listThreadsForUser } from "../../server/companion-store";

export default async function CompanionPage() {
  const user = await getAuthenticatedUserOrNull();

  if (!user) {
    redirect("/login");
  }

  const { entitlements } = await getBillingStateForUser(user.userId);
  const threads = await listThreadsForUser(user.userId);

  return (
    <AppShell
      eyebrow="Companion"
      title="A steadier read of one moment before it becomes a whole story."
      description="Thread-based reasoning, stored insight history, follow-up actions, and premium evidence views now sit inside one calmer workspace."
      accent="#d8c49f"
    >
      <CompanionWorkspace
        initialThreads={threads.map((thread) => ({ id: thread.id, title: thread.title }))}
        entitlements={entitlements}
      />
    </AppShell>
  );
}
