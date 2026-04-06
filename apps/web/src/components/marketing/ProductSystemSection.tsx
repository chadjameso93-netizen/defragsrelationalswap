import type { ProductSystemCopy } from "../../content/marketingCopy";

interface ProductSystemSectionProps {
  copy: ProductSystemCopy;
}

export function ProductSystemSection({ copy }: ProductSystemSectionProps) {
  return (
    <section className="mk-section">
      <div className="mk-kicker">{copy.kicker}</div>
      <h2 className="mk-h2">{copy.title}</h2>
      <p className="mk-body">{copy.intro}</p>
      <ul className="mk-list">
        {copy.systemBullets.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
