import { redirect } from "next/navigation";
import { BillingActions } from "../../../components/billing-actions";
import { getBillingStateForUser } from "../../../lib/billing-server";
import { getAuthenticatedUserOrNull } from "../../../server/auth";

export default async function BillingPage() {
  const user = await getAuthenticatedUserOrNull();

  if (!user) {
    redirect("/login");
  }

  const { account } = await getBillingStateForUser(user.userId);

  return (
    <main style={{ minHeight: "100vh", background: "#050505", color: "#f5f5f5" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px 24px 64px", display: "grid", gap: 16 }}>
        <h1 style={{ margin: 0 }}>Billing & Account</h1>
        <p style={{ margin: 0, color: "#a1a1aa" }}>Signed in as {user.email}</p>

        <section style={{ border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, padding: 16, display: "grid", gap: 8 }}>
          <p style={{ margin: 0 }}>
            <strong>Current plan:</strong> {account.plan}
          </p>
          <p style={{ margin: 0 }}>
            <strong>Billing status:</strong> {account.subscriptionState}
          </p>
          <p style={{ margin: 0 }}>
            <strong>Current period end:</strong> {account.currentPeriodEnd ?? "—"}
          </p>
        </section>

        <BillingActions currentPlan={account.plan} />
      </div>
    </main>
  );
}
