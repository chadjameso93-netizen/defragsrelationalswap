import type { OutputVisibilityCopy } from "../../content/marketingCopy";

interface OutputVisibilitySectionProps {
  copy: OutputVisibilityCopy;
}

export function OutputVisibilitySection({ copy }: OutputVisibilitySectionProps) {
  return (
    <section className="mk-section">
      <div className="mk-kicker">{copy.kicker}</div>
      <h2 className="mk-h2">{copy.title}</h2>
      <div className="mk-get-grid">
        {copy.items.map((item) => (
          <article key={item.title} className="mk-band-block mk-get-card">
            <h3 className="mk-h3">{item.title}</h3>
            <p className="mk-body">{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
