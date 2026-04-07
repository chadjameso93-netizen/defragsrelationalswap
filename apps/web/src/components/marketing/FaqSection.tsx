import type { FaqItem } from "../../content/marketingCopy";

interface FaqSectionProps {
  items: FaqItem[];
}

export function FaqSection({ items }: FaqSectionProps) {
  return (
    <section className="mk-section" aria-labelledby="faq-heading">
      <div className="mk-kicker">FAQ</div>
      <h2 id="faq-heading" className="mk-h2">Common questions</h2>
      <div className="mk-transcript" role="list" aria-label="Frequently asked questions">
        {items.map((item, index) => (
          <article key={item.question} className="mk-transcript-band" role="listitem" aria-labelledby={`faq-question-${index}`}>
            <p className="mk-transcript-label" aria-hidden="true">Q</p>
            <div style={{ display: "grid", gap: 10 }}>
              <h3 id={`faq-question-${index}`} className="mk-h3">{item.question}</h3>
              <p className="mk-body">{item.answer}</p>
            </div>
            <p className="mk-transcript-label" aria-hidden="true">A</p>
          </article>
        ))}
      </div>
    </section>
  );
}
