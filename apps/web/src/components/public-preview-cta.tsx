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
        gap: 16,
        padding: 24,
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--color-border)",
        background: "linear-gradient(180deg, var(--color-surface), transparent)",
      }}
    >
      <div style={{ display: "grid", gap: 10 }}>
        <p style={{ margin: 0, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-accent)" }}>
          Access Status
        </p>
        <h2 style={{ margin: 0, fontSize: 24, lineHeight: 1.2, color: "var(--color-text-primary)" }}>{title}</h2>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.75, color: "var(--color-text-secondary)", maxWidth: 620 }}>{description}</p>
      </div>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 4 }}>
        <Link
          href={primaryHref}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "14px 20px",
            borderRadius: "var(--radius-pill)",
            background: "var(--color-text-primary)",
            color: "var(--color-bg)",
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
            padding: "14px 20px",
            borderRadius: "var(--radius-pill)",
            border: "1px solid var(--color-border)",
            color: "var(--color-text-primary)",
            textDecoration: "none",
          }}
        >
          {secondaryLabel}
        </Link>
      </div>
    </section>
  );
}
