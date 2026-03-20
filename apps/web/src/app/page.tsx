export default function Page() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#050505",
        color: "#f5f5f5",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          minHeight: "100vh",
          margin: "0 auto",
          padding: "32px 24px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 11,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#71717a",
          }}
        >
          <span>DEFRAG</span>
          <span>Coming Soon</span>
        </div>

        <section
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            padding: "72px 0",
          }}
        >
          <div style={{ maxWidth: 760 }}>
            <p
              style={{
                margin: "0 0 24px 0",
                fontSize: 12,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "#71717a",
              }}
            >
              Relational clarity
            </p>

            <h1
              style={{
                margin: 0,
                fontSize: "clamp(3rem, 8vw, 6rem)",
                lineHeight: 0.95,
                fontWeight: 600,
                letterSpacing: "-0.04em",
                color: "#ffffff",
              }}
            >
              A clearer way to understand relationship patterns.
            </h1>

            <div
              style={{
                marginTop: 32,
                maxWidth: 680,
                display: "grid",
                gap: 20,
                fontSize: 18,
                lineHeight: 1.7,
                color: "#a1a1aa",
              }}
            >
              <p style={{ margin: 0 }}>
                DEFRAG helps people make sense of tension, communication, and recurring dynamics without labels or stigma.
              </p>
              <p style={{ margin: 0 }}>
                We are building a calm, structured system for insight, timing, and next steps.
              </p>
            </div>
          </div>
        </section>

        <footer
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            paddingTop: 24,
            borderTop: "1px solid rgba(255,255,255,0.08)",
            fontSize: 14,
            color: "#71717a",
          }}
        >
          <span>Built for clarity, not noise.</span>
          <span
            style={{
              textTransform: "uppercase",
              letterSpacing: "0.22em",
              color: "#a1a1aa",
            }}
          >
            defrag.app
          </span>
        </footer>
      </div>
    </main>
  );
}
