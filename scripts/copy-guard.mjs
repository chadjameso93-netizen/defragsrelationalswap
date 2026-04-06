import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const files = [
  "apps/web/src/components/app-shell.tsx",
  "apps/web/src/app/layout.tsx",
  "apps/web/src/app/page.tsx",
  "apps/web/src/app/dynamics/page.tsx",
  "apps/web/src/components/insights/insight-share-studio.tsx",
  "apps/web/src/components/insights/insight-result.tsx",
  "apps/web/src/content/marketingCopy.ts",
  "packages/reasoning/src/insight-generator.ts",
  "packages/reasoning/src/narrative-generator.ts",
  "packages/reasoning/src/event-model.ts",
];

const banned = [
  "Relational reasoning system",
  "Live reasoning surfaces",
  "Structured reads",
  "A steadier read",
  "A calmer read",
  "This read is",
  "directional read",
  "adjusted this read",
  "last read",
];

const failures = [];
const skipped = [];

for (const file of files) {
  const filePath = resolve(root, file);
  if (!existsSync(filePath)) {
    skipped.push(file);
    continue;
  }

  const content = readFileSync(filePath, "utf8");
  for (const phrase of banned) {
    if (content.includes(phrase)) {
      failures.push(`${file}: ${phrase}`);
    }
  }
}

if (skipped.length > 0) {
  console.warn("Copy guard skipped missing files:");
  for (const file of skipped) {
    console.warn(`- ${file}`);
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
