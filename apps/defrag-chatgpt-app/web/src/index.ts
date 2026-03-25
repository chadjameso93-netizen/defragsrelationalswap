import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { renderDynamicsSummaryCard } from "./widgets/dynamics-summary-card";
import { renderEntitlementStatusCard } from "./widgets/entitlement-status-card";
import { renderInsightSummaryCard } from "./widgets/insight-summary-card";
import { renderRedirectCtaCard } from "./widgets/redirect-cta-card";
import { renderWorldInterpretationCard } from "./widgets/world-interpretation-card";

export interface WidgetAsset {
  filename: string;
  html: string;
}

export function getWidgetAssets(): Record<string, WidgetAsset> {
  return {
    dynamics: { filename: "dynamics-summary-card.html", html: renderDynamicsSummaryCard() },
    insight: { filename: "insight-summary-card.html", html: renderInsightSummaryCard() },
    world: { filename: "world-interpretation-card.html", html: renderWorldInterpretationCard() },
    entitlements: { filename: "entitlement-status-card.html", html: renderEntitlementStatusCard() },
    redirect: { filename: "redirect-cta-card.html", html: renderRedirectCtaCard() },
  };
}

export async function buildWidgetAssets(outputDir?: string) {
  const root = dirname(fileURLToPath(import.meta.url));
  const targetDir = outputDir ?? resolve(root, "../dist");
  const assets = getWidgetAssets();

  await mkdir(targetDir, { recursive: true });

  await Promise.all(
    Object.values(assets).map((asset) =>
      writeFile(resolve(targetDir, asset.filename), asset.html, "utf8"),
    ),
  );

  return assets;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await buildWidgetAssets();
  console.log("Widget assets built.");
}

