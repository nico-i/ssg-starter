import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    setupFiles: `./vitest-setup.ts`,
    include: [`src/**/*.test.{ts,tsx}`],

    coverage: {
      reporter: [`text`, `json`, `html`],
      include: [`src/**/*.{ts,tsx}`],
      exclude: [
        `**/index.ts`,
        `src/pages/**/*`,
        `src/types/**/*`,
        `src/*.{ts,tsx}`,
      ],
    },

    environment: "jsdom",
  },
});
