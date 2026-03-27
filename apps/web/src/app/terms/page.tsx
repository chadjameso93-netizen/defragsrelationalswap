import { AppShell } from "../../components/app-shell";

const sections = [
  {
    title: "Using Defrag",
    body: "Defrag helps you think through difficult interactions more clearly. It is not emergency support, legal advice, medical advice, or a substitute for licensed care.",
  },
  {
    title: "Accounts",
    body: "You are responsible for keeping your sign-in method secure and for using your account in a lawful and respectful way.",
  },
  {
    title: "Plans and billing",
    body: "If you choose a paid plan, billing and subscription changes are handled through Defrag and our payment provider.",
  },
  {
    title: "Acceptable use",
    body: "You may not misuse the product, interfere with the service, try to bypass access controls, or use Defrag in a way that harms others or breaks the law.",
  },
];

export default function TermsPage() {
  return (
    <AppShell
      eyebrow="Terms"
      title="Terms should be straightforward."
      description="These terms explain the basic rules for using Defrag, keeping your account secure, and managing paid access."
      accent="rgba(245, 245, 245, 0.5)"
    >
      <div style={{ maxWidth: 760, display: "grid", gap: 48 }}>
        {sections.map((section, i) => (
          <div key={section.title} style={{ display: "grid", gap: 14 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 14, flexWrap: "wrap" }}>
              <span style={{ fontSize: 12, color: "rgba(245,245,245,0.3)", fontWeight: 500 }}>{String(i + 1).padStart(2, "0")}</span>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 500, color: "white" }}>{section.title}</h2>
            </div>
            <p style={{ margin: 0, paddingLeft: 32, color: "rgba(245,245,245,0.65)", lineHeight: 1.8, fontSize: 16, fontWeight: 300 }}>
              {section.body}
            </p>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
