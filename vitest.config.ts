import { register } from "tsconfig-paths";
import { defineConfig } from "vitest/config";

const tsConfig = require("./tsconfig.json");
const baseUrl = tsConfig.compilerOptions.baseUrl; // Get the base URL from tsconfig
const paths = tsConfig.compilerOptions.paths; // Get the paths from tsconfig

register({
  baseUrl,
  paths,
});

export default defineConfig({
  test: {
    globals: true,
    setupFiles: `./vitest-setup.ts`,
    include: [`src/**/*.test.{ts,tsx}`],
    coverage: {
      reporter: [`text`, `json`, `html`],
    },
  },
});