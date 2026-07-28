import { defineConfig, globalIgnores } from "eslint/config";

// Paths every workspace package skips. Flat-config ignores resolve against the
// consuming `eslint.config.*`, so these stay relative on purpose.
//
// `eslint-config-next` ships its own defaults, but declaring `globalIgnores`
// downstream replaces them — the first four entries restate that default set so
// nothing silently becomes lintable.
export const ignores = globalIgnores([
  // Default ignores of eslint-config-next:
  ".next/**",
  "out/**",
  "build/**",
  "next-env.d.ts",
  // Workspace additions:
  "node_modules/**",
  "dist/**",
  ".turbo/**",
]);

export default defineConfig([ignores]);
