import type { HowItWorksCopy } from "../../content/marketingCopy";

interface HowItWorksSectionProps {
  copy: HowItWorksCopy;
}

const STEP_NUMS = ["01", "02", "03", "04"];

export function HowItWorksSection({ copy }: HowItWorksSectionProps) {
  return (
    <section id="how-it-works" className="mk-section">
      <style>{`
        .mk-steps-wrap {
          display: grid;
          gap: 40px;
        }

        .mk-steps-header {
          display: grid;
          gap: 12px;
          max-width: 640px;
        }

        .mk-steps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
          gap: 20px;
          counter-reset: steps;
        }

        .mk-step {
          padding: 28px;
          display: grid;
          gap: 14px;
          align-content: start;
          transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .mk-step:hover {
          transform: translateY(-4px);
          box-shadow: 0 0 40px rgba(214,195,161,0.12), 0 16px 36px rgba(0,0,0,0.38);
        }

        .mk-step-num {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.2em;
          color: rgba(214,195,161,0.7);
          font-variant-numeric: tabular-nums;
        }

        .mk-step-label {
          font-size: 17px;
          font-weight: 600;
          letter-spacing: -0.015em;
          color: rgba(245,242,236,0.95);
          line-height: 1.35;
        }

        .mk-step-connector {
          display: flex;
          align-items: center;
          gap: 16px;
          margin: -4px 0;
        }

        .mk-step-connector-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, rgba(214,195,161,0.22), transparent);
        }
      `}</style>

      <div className="mk-steps-wrap">
        <div className="mk-steps-header">
          <div className="mk-kicker">{copy.kicker}</div>
          <h2 className="mk-h2">{copy.title}</h2>
          {copy.intro && <p className="mk-lead">{copy.intro}</p>}
        </div>

        <div className="mk-steps">
          {copy.steps.map((step, i) => (
            <article key={step.label} className="mk-card mk-step">
              <div className="mk-step-num">{STEP_NUMS[i] ?? String(i + 1).padStart(2, "0")}</div>
              <div className="mk-step-label">{step.label}</div>
              <p className="mk-body">{step.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
