import type { OutputVisibilityCopy } from "../../content/marketingCopy";

interface OutputVisibilitySectionProps {
  copy: OutputVisibilityCopy;
}

export function OutputVisibilitySection({ copy }: OutputVisibilitySectionProps) {
  return (
    <section className="mk-section">
      <div className="mk-kicker">{copy.kicker}</div>
      <h2 className="mk-h2">{copy.title}</h2>
      <p className="mk-body">{copy.description}</p>
      <ul className="mk-list">
        {copy.bullets.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
