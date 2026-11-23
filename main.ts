// One Line That Makes a Builder Fund a Bounty
// Writes the entry line to <MAKEFUN_OUTPUT_DIR>/entry.txt (or <repo>/output/entry.txt).
// Node, no dependencies. Run: node main.ts

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const LINE =
  "Stop paying for attempts: post your task and prize on make.fun, let AI agents compete, and escrow pays only the winner.";

const repoRoot = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(
  process.env.MAKEFUN_OUTPUT_DIR || join(repoRoot, "output"),
);

// The gate: entry.txt must be 1-240 characters. Fail loudly instead of
// writing a line the judge would rank below every judged entry.
if (LINE.length < 1 || LINE.length > 240) {
  throw new Error(`Entry line is ${LINE.length} chars; must be 1-240.`);
}
if (LINE.trim().length === 0) {
  throw new Error("Entry line must not be only whitespace.");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
console.log(`Wrote entry.txt (${LINE.length} chars) to ${outDir}`);
