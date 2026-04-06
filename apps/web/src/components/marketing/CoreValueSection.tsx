import type { CoreValueCopy } from "../../content/marketingCopy";

interface CoreValueSectionProps {
  copy: CoreValueCopy;
}

export function CoreValueSection({ copy }: CoreValueSectionProps) {
  return (
    <section className="mk-section mk-grid-2">
      <article>
        <div className="mk-kicker">{copy.kicker}</div>
        <h2 className="mk-h2">{copy.title}</h2>
        <p className="mk-body">{copy.description}</p>
        <ul className="mk-list">
          {copy.coreValueBullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </article>
      <aside className="mk-card">
        <h3 className="mk-h3">{copy.productOfferingTitle}</h3>
        <ul className="mk-list">
          {copy.productOfferingBullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <h3 className="mk-h3" style={{ marginTop: 24 }}>
          {copy.capabilitiesTitle}
        </h3>
        <ul className="mk-list mk-list-tight">
          {copy.capabilities.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </aside>
    </section>
  );
}
