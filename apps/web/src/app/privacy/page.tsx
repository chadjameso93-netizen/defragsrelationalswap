import { AppShell } from "../../components/app-shell";

const scenes = [
  {
    title: "What we collect",
    body: "We collect the information required to run your account and deliver your workspace experience: sign-in details, product activity, and plan state.",
  },
  {
    title: "How we use it",
    body: "We use this information to authenticate access, save your ongoing work, generate product outputs, and keep core account functionality stable.",
  },
  {
    title: "Billing information",
    body: "Paid subscriptions are processed through Defrag and our payment providers. Billing data is used for subscription operations, invoices, and account changes.",
  },
  {
    title: "Security and control",
    body: "We apply authentication, access controls, and operational safeguards to reduce misuse. You control what you enter, keep, and share inside your account.",
  },
];

export default function PrivacyPage() {
  return (
    <AppShell
      eyebrow="Privacy"
      title="Privacy in plain language."
      description="This is the same legal policy content, restyled into a calmer reading flow with clear sections and consistent brand rhythm."
      accent="var(--color-accent)"
    >
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "0 16px", display: "grid", gap: 18 }}>
        {scenes.map((scene, index) => (
          <section
            key={scene.title}
            style={{
              display: "grid",
              gap: 10,
              padding: "22px 22px 24px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "linear-gradient(180deg, rgba(255,255,255,0.028), rgba(255,255,255,0.012))",
              animation: `legalFade 360ms ease ${index * 80}ms both`,
            }}
          >
            <h2 style={{ margin: 0, fontSize: "clamp(1.35rem, 2.4vw, 1.9rem)", lineHeight: 1.15, color: "white", fontWeight: 500, letterSpacing: "-0.02em" }}>
              {scene.title}
            </h2>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.78, color: "rgba(245,245,245,0.66)", fontWeight: 300 }}>
              {scene.body}
            </p>
          </section>
        ))}
      </div>

      <style>{`
        @keyframes legalFade {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </AppShell>
  );
}
