import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: [
      "packages/billing/src/__tests__/**/*.test.ts",
      "apps/web/src/server/__tests__/**/*.test.ts",
      "apps/web/src/server/reasoning/__tests__/**/*.test.ts"
    ],
    environment: "node"
  }
});
