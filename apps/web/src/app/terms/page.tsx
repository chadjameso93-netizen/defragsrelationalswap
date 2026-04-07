import { AppShell } from "../../components/app-shell";

const scenes = [
  {
    title: "Using Defrag",
    body: "Defrag supports clearer communication in difficult moments. It is not emergency support, legal advice, medical advice, or a replacement for licensed care.",
  },
  {
    title: "Account responsibility",
    body: "You are responsible for account security and lawful use. Keep your sign-in credentials protected and use the service in good faith.",
  },
  {
    title: "Plans and billing",
    body: "If you subscribe to a paid plan, billing operations and subscription changes are handled through Defrag and our payment infrastructure.",
  },
  {
    title: "Acceptable use",
    body: "You may not misuse the product, attempt to bypass controls, disrupt service integrity, or use Defrag for activity that harms others or violates law.",
  },
];

export default function TermsPage() {
  return (
    <AppShell
      eyebrow="Terms"
      title="Terms in a calm, readable flow."
      description="These terms preserve legal clarity while matching the same typography, spacing, and gentle motion language used across the public experience."
      accent="rgba(245, 245, 245, 0.56)"
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
              background: "linear-gradient(180deg, rgba(255,255,255,0.026), rgba(255,255,255,0.01))",
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
