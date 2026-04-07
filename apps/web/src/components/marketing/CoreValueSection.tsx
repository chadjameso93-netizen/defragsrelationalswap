import type { CoreValueCopy } from "../../content/marketingCopy";

interface CoreValueSectionProps {
  copy: CoreValueCopy;
}

export function CoreValueSection({ copy }: CoreValueSectionProps) {
  return (
    <section className="mk-section">
      <style>{`
        .mk-cv-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 24px;
          align-items: start;
        }

        @media (max-width: 1024px) {
          .mk-cv-grid { grid-template-columns: 1fr; }
        }

        .mk-cv-main {
          padding: 36px;
          display: grid;
          gap: 24px;
          align-content: start;
        }

        .mk-cv-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: 12px;
        }

        .mk-cv-list li {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          font-size: 15px;
          line-height: 1.65;
          color: rgba(245,242,236,0.78);
        }

        .mk-cv-list li::before {
          content: "";
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(214,195,161,0.7);
          flex-shrink: 0;
          margin-top: 8px;
        }

        .mk-cv-aside {
          padding: 32px;
          display: grid;
          gap: 28px;
          align-content: start;
        }

        .mk-cv-aside-block {
          display: grid;
          gap: 12px;
        }

        .mk-cv-aside-title {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(214,195,161,0.72);
        }

        .mk-cv-aside-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: 8px;
        }

        .mk-cv-aside-list li {
          font-size: 14px;
          color: rgba(245,242,236,0.7);
          line-height: 1.6;
          padding: 8px 12px;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 8px;
        }
      `}</style>

      <div className="mk-cv-grid">
        {/* Left: core value proposition */}
        <article className="mk-card mk-cv-main">
          <div className="mk-kicker">{copy.kicker}</div>
          <h2 className="mk-h2">{copy.title}</h2>
          <p className="mk-lead">{copy.description}</p>
          <ul className="mk-cv-list">
            {copy.coreValueBullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        {/* Right: product detail + capabilities */}
        <aside className="mk-card mk-cv-aside">
          <div className="mk-cv-aside-block">
            <div className="mk-cv-aside-title">{copy.productOfferingTitle}</div>
            <ul className="mk-cv-aside-list">
              {copy.productOfferingBullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="mk-cv-aside-block">
            <div className="mk-cv-aside-title">{copy.capabilitiesTitle}</div>
            <ul className="mk-cv-aside-list">
              {copy.capabilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
