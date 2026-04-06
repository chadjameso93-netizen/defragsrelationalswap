import type { FaqItem } from "../../content/marketingCopy";

interface FaqSectionProps {
  items: FaqItem[];
}

export function FaqSection({ items }: FaqSectionProps) {
  return (
    <section className="mk-section">
      <div className="mk-kicker">FAQ</div>
      <h2 className="mk-h2">Common questions</h2>
      <div className="mk-faq-grid">
        {items.map((item) => (
          <article key={item.question} className="mk-card">
            <h3 className="mk-h3">{item.question}</h3>
            <p className="mk-body">{item.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
