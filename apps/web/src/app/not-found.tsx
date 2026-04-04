import { AppShell } from "../components/app-shell";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <AppShell
      eyebrow="404"
      title="Signal lost."
      description="The page you are looking for does not exist."
      accent="rgba(245, 245, 245, 0.45)"
    >
      <div style={{ maxWidth: 640, marginTop: 48, display: "grid", gap: 32 }}>
        <p style={{ margin: 0, color: "rgba(245, 245, 245, 0.6)", fontSize: 18, lineHeight: 1.6, fontWeight: 300 }}>
          You may have moved outside the known boundaries of your DEFRAG session. This interaction path is currently unmapped.
        </p>
        
        <Link
          href="/"
          style={{
            width: "fit-content",
            textDecoration: "none",
            background: "white",
            color: "#050505",
            padding: "16px 32px",
            borderRadius: 16,
            fontSize: 15,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 10,
            boxShadow: "0 20px 40px rgba(0,0,0,0.4)"
          }}
        >
          <ArrowLeft style={{ width: 18, height: 18 }} />
          Return home
        </Link>
      </div>
    </AppShell>
  );
}
