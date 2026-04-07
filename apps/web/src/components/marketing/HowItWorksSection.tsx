import type { HowItWorksCopy } from "../../content/marketingCopy";

interface HowItWorksSectionProps {
  copy: HowItWorksCopy;
}

export function HowItWorksSection({ copy }: HowItWorksSectionProps) {
  return (
    <section id="how-it-works" className="mk-section">
      <div className="mk-kicker">{copy.kicker}</div>
      <h2 className="mk-h2">{copy.title}</h2>
      <div className="mk-steps">
        {copy.steps.map((step) => (
          <article key={step.label} className="mk-step">
            <div className="mk-step-label">{step.label}</div>
            <p className="mk-body">{step.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
