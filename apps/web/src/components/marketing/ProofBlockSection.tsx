import type { ProofBlockCopy } from "../../content/marketingCopy";

interface ProofBlockSectionProps {
  copy: ProofBlockCopy;
}

export function ProofBlockSection({ copy }: ProofBlockSectionProps) {
  return (
    <section className="mk-section">
      <div className="mk-kicker">{copy.kicker}</div>
      <h2 className="mk-h2">{copy.title}</h2>
      <article className="mk-proof-card">
        <div className="mk-proof-line">
          <div className="mk-proof-label">{copy.happenedLabel}</div>
          <p className="mk-body">{copy.happenedBody}</p>
        </div>
        <div className="mk-proof-line">
          <div className="mk-proof-label">{copy.readsLabel}</div>
          <div className="mk-proof-reads">
            <p className="mk-body">{copy.readsYou}</p>
            <p className="mk-body">{copy.readsThem}</p>
          </div>
        </div>
        <div className="mk-proof-line">
          <div className="mk-proof-label">{copy.nextMoveLabel}</div>
          <p className="mk-body">{copy.nextMoveBody}</p>
        </div>
      </article>
    </section>
  );
}
