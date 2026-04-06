import type { UseCasesCopy } from "../../content/marketingCopy";

interface UseCasesSectionProps {
  copy: UseCasesCopy;
}

export function UseCasesSection({ copy }: UseCasesSectionProps) {
  return (
    <section className="mk-section">
      <div className="mk-kicker">{copy.kicker}</div>
      <h2 className="mk-h2">{copy.title}</h2>
      <p className="mk-body">{copy.intro}</p>
      <ul className="mk-list">
        {copy.cases.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
