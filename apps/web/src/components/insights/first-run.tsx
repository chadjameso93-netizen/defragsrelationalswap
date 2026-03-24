export default function FirstRun({ onComplete }: { onComplete: (data: { what: string; who: string; difficult: string }) => void }) {
  return <button onClick={() => onComplete({ what: "A tense exchange", who: "Partner", difficult: "Timing" })}>Start first run</button>;
}
