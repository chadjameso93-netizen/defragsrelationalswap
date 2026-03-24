import Link from "next/link";

interface PublicPreviewCtaProps {
  title: string;
  description: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export function PublicPreviewCta({
  title,
  description,
  primaryLabel = "Sign in",
  primaryHref = "/login",
  secondaryLabel = "Back home",
  secondaryHref = "/",
}: PublicPreviewCtaProps) {
  return (
    <section
      className="premium-panel premium-fade-up"
      data-delay="2"
      style={{
        display: "grid",
        gap: 14,
        padding: 20,
        borderRadius: 24,
        border: "1px solid rgba(255,255,255,0.1)",
        background:
          "radial-gradient(circle at top left, rgba(216,196,159,0.12), transparent 28%), linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.02))",
      }}
    >
      <div style={{ display: "grid", gap: 8 }}>
        <p style={{ margin: 0, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#d8c49f" }}>
          Preview mode
        </p>
        <h2 style={{ margin: 0, fontSize: 24, lineHeight: 1.2, color: "#f5f5f5" }}>{title}</h2>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.75, color: "rgba(245,245,245,0.7)", maxWidth: 620 }}>{description}</p>
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <Link
          href={primaryHref}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "12px 18px",
            borderRadius: 999,
            background: "#f5f5f5",
            color: "#050505",
            textDecoration: "none",
            fontWeight: 700,
          }}
        >
          {primaryLabel}
        </Link>
        <Link
          href={secondaryHref}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "12px 18px",
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.14)",
            color: "#f5f5f5",
            textDecoration: "none",
          }}
        >
          {secondaryLabel}
        </Link>
      </div>
    </section>
  );
}
