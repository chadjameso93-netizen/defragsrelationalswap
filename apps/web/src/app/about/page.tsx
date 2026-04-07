import { ClosingScene, ListScene, TextScene } from "../../components/public/primitives";
import { PublicPageShell } from "../../components/public/page-shell";
import { marketingCopy } from "../../content/marketingCopy";

export default function AboutPage() {
  return (
    <PublicPageShell eyebrow={marketingCopy.about.eyebrow} title={marketingCopy.about.title} description={marketingCopy.about.description}>
      <section style={{ display: "grid", gridTemplateColumns: "minmax(0,1.2fr) minmax(0,0.8fr)", gap: "var(--space-lg)" }}>
        <div className="public-card" style={{ padding: "var(--space-xl)", display: "grid", gap: "var(--space-lg)" }}>
          {marketingCopy.about.sections.map((section) => (
            <TextScene key={section.title} title={section.title} body={section.body} />
          ))}
        </div>
        <ListScene title="Core capabilities" items={marketingCopy.coreValue.capabilities} />
      </section>

      <ClosingScene
        title="Try Defrag on a real conversation."
        body="Bring a difficult interaction into the workspace and see the pattern clearly."
        primaryCta={{ href: "/enter", label: "Open Defrag" }}
        secondaryCta={{ href: "/membership", label: "View plans" }}
      />
    </PublicPageShell>
  );
}
