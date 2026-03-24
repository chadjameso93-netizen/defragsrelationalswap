import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = "/Users/cjo/Documents/defragsrelationalswap";
const files = [
  "apps/web/src/components/app-shell.tsx",
  "apps/web/src/app/layout.tsx",
  "apps/web/src/app/page.tsx",
  "apps/web/src/app/companion/page.tsx",
  "apps/web/src/app/account/insights/page.tsx",
  "apps/web/src/components/insights/insight-share-studio.tsx",
  "apps/web/src/components/insights/insight-result.tsx",
];

const banned = [
  "Relational reasoning system",
  "Live reasoning surfaces",
  "Structured reads",
  "A steadier read",
  "A calmer read",
];

const failures = [];

for (const file of files) {
  const content = readFileSync(resolve(root, file), "utf8");
  for (const phrase of banned) {
    if (content.includes(phrase)) {
      failures.push(`${file}: ${phrase}`);
    }
  }
}

if (failures.length > 0) {
  console.error("Copy guard failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Copy guard passed.");
