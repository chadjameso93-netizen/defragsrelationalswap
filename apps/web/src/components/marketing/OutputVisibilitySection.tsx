import type { OutputVisibilityCopy } from "../../content/marketingCopy";

interface OutputVisibilitySectionProps {
  copy: OutputVisibilityCopy;
}

const ICONS = ["◈", "◎", "◬", "◇"];

export function OutputVisibilitySection({ copy }: OutputVisibilitySectionProps) {
  return (
    <section className="mk-section">
      <style>{`
        .mk-band {
          display: grid;
          gap: 40px;
        }

        .mk-band-header {
          display: grid;
          gap: 14px;
          max-width: 680px;
        }

        .mk-get-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
          gap: 20px;
        }

        .mk-get-card {
          padding: 28px;
          display: grid;
          gap: 16px;
          align-content: start;
          transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .mk-get-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 0 48px rgba(214,195,161,0.14), 0 16px 40px rgba(0,0,0,0.4);
          border-color: rgba(214,195,161,0.18);
        }

        .mk-get-icon {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          display: grid;
          place-items: center;
          font-size: 18px;
          background: linear-gradient(135deg, rgba(214,195,161,0.12), rgba(214,195,161,0.04));
          border: 1px solid rgba(214,195,161,0.18);
          color: rgba(214,195,161,0.9);
        }

        .mk-h3 {
          font-size: 18px;
          font-weight: 600;
          letter-spacing: -0.015em;
          color: rgba(245,242,236,0.95);
          line-height: 1.3;
        }
      `}</style>

      <div className="mk-band">
        <div className="mk-band-header">
          <div className="mk-kicker">{copy.kicker}</div>
          <h2 className="mk-h2">{copy.title}</h2>
          {copy.description && (
            <p className="mk-lead">{copy.description}</p>
          )}
        </div>

        <div className="mk-get-grid">
          {copy.items?.map((item, i) => (
            <article key={item.title} className="mk-card mk-get-card">
              <div className="mk-get-icon">{ICONS[i % ICONS.length]}</div>
              <h3 className="mk-h3">{item.title}</h3>
              <p className="mk-body">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
