import { ClosingScene, LegalTextScene } from "../../components/public/primitives";
import { PublicPageShell } from "../../components/public/page-shell";

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
      title="Terms should be straightforward."
      description="These terms explain the core rules for using Defrag, keeping your account secure, and managing paid access."
      accent="rgba(245, 245, 245, 0.56)"
    >
      <section style={{ maxWidth: 1120, display: "grid", gridTemplateColumns: "220px minmax(0,1fr)", gap: 48 }} className="terms-grid" aria-labelledby="terms-section-heading">
        <aside style={{ display: "grid", gap: 16, alignContent: "start" }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,245,245,0.38)" }}>
            What these terms cover
          </div>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.72, color: "rgba(245,245,245,0.52)" }}>
            How to use Defrag appropriately, how accounts are handled, and how paid access is managed.
          </p>
        </aside>

        <div style={{ display: "grid", gap: 0, borderTop: "1px solid rgba(255,255,255,0.08)" }} role="list" aria-label="Terms sections">
          <h2 id="terms-section-heading" style={{ position: "absolute", left: "-9999px" }}>Terms sections</h2>
          {sections.map((section) => (
            <article key={section.title} role="listitem" style={{ display: "grid", gridTemplateColumns: "20px 70px minmax(0,1fr)", gap: 16, paddingTop: 22, paddingBottom: 24, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ fontSize: 11, color: "rgba(245,245,245,0.36)", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" }} aria-hidden="true">T</div>
              <div style={{ fontSize: 11, color: "rgba(245,245,245,0.3)", fontWeight: 600, letterSpacing: "0.1em" }}>{section.number}</div>
              <div style={{ display: "grid", gap: 10 }}>
                <h2 style={{ margin: 0, fontSize: 28, fontWeight: 500, color: "white", lineHeight: 1.08 }}>
                  {section.title}
                </h2>
                <p style={{ margin: 0, color: "rgba(245,245,245,0.64)", lineHeight: 1.8, fontSize: 16, fontWeight: 300, maxWidth: 760 }}>
                  {section.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .terms-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </AppShell>
  );
}
