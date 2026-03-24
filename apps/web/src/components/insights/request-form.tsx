export default function RequestForm({ onCancel }: { onCancel: () => void }) {
  return <button onClick={onCancel}>Cancel</button>;
}
