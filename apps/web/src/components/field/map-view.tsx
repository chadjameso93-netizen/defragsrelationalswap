interface MapPerson {
  id: string;
  name: string;
}

export default function MapView({ user, people }: { user: { name: string }; people: MapPerson[] }) {
  return (
    <section
      style={{
        padding: 20,
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 16,
        background: "rgba(255,255,255,0.02)",
        display: "grid",
        gap: 16,
      }}
    >
      <div style={{ display: "grid", gap: 6 }}>
        <p style={{ margin: 0, fontSize: 10, color: "#71717a", textTransform: "uppercase", letterSpacing: "0.2em" }}>
          Current field
        </p>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "#d4d4d8" }}>
          {user.name} is at the center of this view. These are the connections currently in frame.
        </p>
      </div>

      <div style={{ display: "grid", gap: 10 }}>
        {people.map((person) => (
          <div
            key={person.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
              alignItems: "center",
              padding: "12px 14px",
              borderRadius: 12,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <span style={{ color: "#f4f4f5", fontSize: 14 }}>{person.name}</span>
            <span style={{ color: "#71717a", fontSize: 12 }}>Needs review</span>
          </div>
        ))}
      </div>
    </section>
  );
}
