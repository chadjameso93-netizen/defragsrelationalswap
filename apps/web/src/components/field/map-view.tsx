interface MapPerson {
  id: string;
  name: string;
}

export default function MapView({ user, people }: { user: { name: string }; people: MapPerson[] }) {
  return (
    <div style={{ display: "grid", gap: 32 }}>
      <div>
        <p style={{ margin: "0 0 12px", fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245, 245, 245, 0.4)" }}>
          Current field
        </p>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "rgba(245, 245, 245, 0.7)", fontWeight: 300 }}>
          {user.name} is at the center of this view. These are the connections currently in frame.
        </p>
      </div>

      <div style={{ display: "grid", gap: 1 }}>
        {people.map((person) => (
          <div
            key={person.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "16px 0",
              borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
            }}
          >
            <span style={{ color: "white", fontSize: 15, fontWeight: 500 }}>{person.name}</span>
            <span style={{ color: "rgba(245, 245, 245, 0.3)", fontSize: 12, letterSpacing: "0.05em" }}>Needs review</span>
          </div>
        ))}
      </div>
    </div>
  );
}
