import { PublicPageShell } from "../../components/public/page-shell";

const clauses = [
  {
    title: "Using Defrag",
    body: "Use the product for lawful purposes and avoid attempting to disrupt or misuse account, billing, or workspace systems.",
  },
  {
    title: "Account responsibility",
    body: "You are responsible for activity under your account and for keeping authentication details accurate and secure.",
  },
  {
    title: "Paid plans",
    body: "Paid access renews according to the selected plan unless canceled before the next billing cycle.",
  },
  {
    title: "Service updates",
    body: "Defrag may evolve product features over time while maintaining core account access and plan boundaries.",
  },
];

export default function TermsPage() {
  return (
    <PublicPageShell
      eyebrow="Terms"
      title="Terms should be straightforward."
      description="These terms explain the core rules for using Defrag, keeping your account secure, and managing paid access."
    >
      <section className="public-card public-legal-grid" style={{ padding: "1.25rem" }}>
        {clauses.map((clause, index) => (
          <article key={clause.title} className="public-legal-row">
            <p className="public-eyebrow" style={{ marginTop: "0.3rem" }}>T{index + 1}</p>
            <div className="public-stack-sm">
              <h2 className="public-title-sm">{clause.title}</h2>
              <p className="public-body public-muted">{clause.body}</p>
            </div>
          </article>
        ))}
      </section>
    </PublicPageShell>
  );
}
