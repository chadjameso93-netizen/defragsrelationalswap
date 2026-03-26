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
    <div style={{ display: "grid", gap: 20, maxWidth: 640 }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#22d3ee" }}>
        Status
      </div>
      <h2 style={{ margin: 0, fontSize: 24, fontWeight: 500, lineHeight: 1.2, color: "white" }}>{title}</h2>
      <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: "rgba(245,245,245,0.6)", fontWeight: 300 }}>{description}</p>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
        <Link
          href={primaryHref}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px 28px",
            borderRadius: 16,
            background: "white",
            color: "#050505",
            textDecoration: "none",
            fontWeight: 600,
            fontSize: 15,
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
            padding: "16px 28px",
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.1)",
            color: "white",
            textDecoration: "none",
            fontSize: 15,
          }}
        >
          {secondaryLabel}
        </Link>
      </div>
    </div>
  );
}
