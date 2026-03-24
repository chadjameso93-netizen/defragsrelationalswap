import { redirect } from "next/navigation";
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
    <main style={{ minHeight: "100vh", background: "#050505", color: "#f5f5f5" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px 64px", display: "grid", gap: 18 }}>
        <h1 style={{ margin: 0 }}>Companion</h1>
        <p style={{ margin: 0, color: "#a1a1aa" }}>
          A calm, structured read of one relationship moment, with optional follow-up actions.
        </p>

        <CompanionWorkspace
          initialThreads={threads.map((thread) => ({ id: thread.id, title: thread.title }))}
          entitlements={entitlements}
        />
      </div>
    </main>
  );
}
