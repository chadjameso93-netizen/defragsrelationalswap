import { AppShell } from "../../components/app-shell";

const sections = [
  {
    number: "01",
    title: "Using Defrag",
    body: "Defrag helps you think through difficult interactions more clearly. It is not emergency support, legal advice, medical advice, or a substitute for licensed care.",
  },
  {
    number: "02",
    title: "Accounts",
    body: "You are responsible for keeping your sign-in method secure and for using your account in a lawful and respectful way.",
  },
  {
    number: "03",
    title: "Plans and billing",
    body: "If you choose a paid plan, billing and subscription changes are handled through Defrag and our payment provider.",
  },
  {
    number: "04",
    title: "Acceptable use",
    body: "You may not misuse the product, interfere with the service, try to bypass access controls, or use Defrag in a way that harms others or breaks the law.",
  },
];

export default function TermsPage() {
  return (
    <AppShell
      eyebrow="Terms"
      title="Terms should be straightforward."
      description="These terms explain the core rules for using Defrag, keeping your account secure, and managing paid access."
      accent="rgba(245, 245, 245, 0.56)"
    >
      <div style={{ maxWidth: 1120, display: "grid", gridTemplateColumns: "220px minmax(0,1fr)", gap: 48 }} className="terms-grid">
        <aside style={{ display: "grid", gap: 16, alignContent: "start" }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,245,245,0.38)" }}>
            What these terms cover
          </div>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.72, color: "rgba(245,245,245,0.52)" }}>
            How to use Defrag appropriately, how accounts are handled, and how paid access is managed.
          </p>
        </aside>

        <div style={{ display: "grid", gap: 0, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          {sections.map((section) => (
            <div key={section.title} style={{ display: "grid", gridTemplateColumns: "70px minmax(0,1fr)", gap: 16, paddingTop: 22, paddingBottom: 24, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ fontSize: 11, color: "rgba(245,245,245,0.3)", fontWeight: 600, letterSpacing: "0.1em" }}>{section.number}</div>
              <div style={{ display: "grid", gap: 10 }}>
                <h2 style={{ margin: 0, fontSize: 28, fontWeight: 500, color: "white", lineHeight: 1.08 }}>
                  {section.title}
                </h2>
                <p style={{ margin: 0, color: "rgba(245,245,245,0.64)", lineHeight: 1.8, fontSize: 16, fontWeight: 300, maxWidth: 760 }}>
                  {section.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .terms-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </AppShell>
  );
}
