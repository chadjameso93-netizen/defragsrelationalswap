import Link from "next/link";
import { AppShell } from "../../components/app-shell";

const sequence = [
  {
    label: "Opening premise",
    title: "Hard conversations usually fail long before the obvious breaking point.",
    body: "Most difficult exchanges do not collapse from one sentence alone. They drift through missed tone, defensive timing, and assumptions that stay unspoken until both people feel unheard.",
  },
  {
    label: "Company why",
    title: "We built Defrag because everyday relational friction is expensive.",
    body: "People lose trust with partners, family, and teams over moments that felt fixable in hindsight. Defrag exists to make those moments legible early, while there is still room to repair.",
  },
  {
    label: "Why now",
    title: "Communication has sped up while emotional context has gotten thinner.",
    body: "Messages are short, asynchronous, and easy to misread. The pace rewards reaction over reflection. Defrag gives you a slower and clearer layer before the next message goes out.",
  },
  {
    label: "Mission",
    title: "Our mission is practical relational clarity.",
    body: "Defrag helps you name what happened, compare how it may have landed, and choose one grounded next step. Not diagnosis. Not labels. Just clearer choices in moments that matter.",
  },
  {
    label: "Close",
    title: "Bring one live moment. Leave with a response you can stand behind.",
    body: "We are building Defrag as a focused tool for people who care about the relationship and still need better boundaries, better language, and better timing.",
  },
];

export default function AboutPage() {
  return (
    <AppShell
      eyebrow="About Defrag"
      title="A text-led system for higher-stakes human moments."
      description="Defrag is designed as an editorial sequence: why this problem matters, why we exist, and what mission guides the product."
      accent="#c8d8a2"
    >
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 16px", display: "grid", gap: 28 }}>
        {sequence.map((section) => (
          <section key={section.title} style={{ display: "grid", gap: 12 }}>
            <p style={{ margin: 0, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,245,245,0.46)", fontWeight: 700 }}>
              {section.label}
            </p>
            <h2 style={{ margin: 0, fontSize: "clamp(1.6rem, 3vw, 2.15rem)", fontWeight: 500, letterSpacing: "-0.03em", color: "white" }}>
              {section.title}
            </h2>
            <p style={{ margin: 0, color: "rgba(245,245,245,0.68)", lineHeight: 1.82, fontSize: 18, fontWeight: 300 }}>{section.body}</p>
          </section>
        ))}

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", paddingTop: 8 }}>
          <Link href="/enter" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "14px 18px", background: "#f5f5f5", color: "#050505", textDecoration: "none", fontWeight: 600 }}>
            Open Defrag
          </Link>
          <Link href="/how-it-works" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "14px 18px", border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.03)", color: "white", textDecoration: "none" }}>
            See how it works
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
