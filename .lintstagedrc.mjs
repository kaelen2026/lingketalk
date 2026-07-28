// Pre-commit gate over staged files only.
//
// Both commands hang off a single `*` glob on purpose: lint-staged runs
// separate globs concurrently, and two --write passes over the same file race
// each other. Commands returned together in one array run in sequence.

/** Shell-safe join; paths arrive absolute and may contain spaces. */
const quote = (files) => files.map((file) => JSON.stringify(file)).join(" ");

/** ESLint only covers the Next app — Biome handles everything else. */
const ESLINT_TARGET = /\/apps\/www\/.+\.[cm]?[jt]sx?$/;

export default {
  "*": (files) => {
    const commands = [
      `biome check --write --no-errors-on-unmatched --files-ignore-unknown=true --colors=off ${quote(files)}`,
    ];

    const eslintFiles = files.filter((file) => ESLINT_TARGET.test(file));
    if (eslintFiles.length > 0) {
      // Filter by path, not package name, and let pnpm set the cwd so ESLint
      // finds apps/www/eslint.config.mjs.
      commands.push(
        `pnpm --filter ./apps/www exec eslint --fix --no-warn-ignored ${quote(eslintFiles)}`,
      );
    }

    return commands;
  },
};
