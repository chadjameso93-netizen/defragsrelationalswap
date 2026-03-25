import { getPreviewAuthEnv, validatePreviewEnv } from "../auth/env";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../../../../..");

async function run(command: string) {
  const { execa } = await import("execa");
  await execa({ shell: true, cwd: repoRoot })`${command}`;
}

async function main() {
  const env = getPreviewAuthEnv();
  const validation = validatePreviewEnv(env);

  if (!validation.ok) {
    console.error(
      JSON.stringify(
        {
          ok: false,
          stage: "env-validation",
          errors: validation.errors,
        },
        null,
        2,
      ),
    );
    process.exit(1);
  }

  const requiredFiles = [
    resolve(repoRoot, "apps/defrag-chatgpt-app/vercel.json"),
    resolve(repoRoot, "apps/defrag-chatgpt-app/api/[[...route]].ts"),
  ];
  const missingFiles = requiredFiles.filter((file) => !existsSync(file));
  if (missingFiles.length > 0) {
    console.error(
      JSON.stringify(
        {
          ok: false,
          stage: "vercel-config",
          errors: missingFiles.map((file) => `Missing required deployment file: ${file}`),
        },
        null,
        2,
      ),
    );
    process.exit(1);
  }

  await run("pnpm --dir apps/defrag-chatgpt-app build:web");
  await run("pnpm --dir apps/defrag-chatgpt-app build:server");
  await run("pnpm --dir apps/defrag-chatgpt-app validate:tools");
  await run("pnpm --dir apps/defrag-chatgpt-app typecheck");
  await run("pnpm --dir apps/web typecheck");

  const builtServerEntry = resolve(repoRoot, "apps/defrag-chatgpt-app/dist/server/app.js");
  if (!existsSync(builtServerEntry)) {
    console.error(
      JSON.stringify(
        {
          ok: false,
          stage: "server-bundle",
          errors: [`Missing built Vercel server bundle: ${builtServerEntry}`],
        },
        null,
        2,
      ),
    );
    process.exit(1);
  }

  console.log(
    JSON.stringify(
      {
        ok: true,
        checks: [
          "env-validation",
          "vercel-config",
          "widget-build",
          "server-bundle",
          "tool-harness",
          "chatgpt-app-typecheck",
          "website-typecheck",
        ],
      },
      null,
      2,
    ),
  );
}

await main();
