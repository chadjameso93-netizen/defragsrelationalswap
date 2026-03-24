import { redirect } from "next/navigation";
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
    <main style={{ minHeight: "100vh", background: "#050505", color: "#f5f5f5" }}>
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "30px 24px 64px", display: "grid", gap: 16 }}>
        <h1 style={{ margin: 0 }}>World alpha</h1>
        <p style={{ margin: 0, color: "#a1a1aa" }}>
          A minimal relational field demo using shared DEFRAG event, feature, pattern, and timing interpretation.
        </p>

        <WorldAlphaCanvas />
      </div>
    </main>
  );
}
