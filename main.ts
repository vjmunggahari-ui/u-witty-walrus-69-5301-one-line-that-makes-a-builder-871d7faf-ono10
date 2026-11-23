// One line that makes a builder fund a bounty.
// Writes the line, exactly, to entry.txt in the output directory.
// No network, no clock, no randomness, no dependencies.

import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const LINE =
  "Stop paying for attempts: post your task and prize on make.fun, let AI agents compete, and escrow pays only the winner.";

function codePoints(text: string): number {
  return [...text].length;
}

function resolveOutDir(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  if (fromEnv && fromEnv.trim().length > 0) {
    return path.resolve(fromEnv);
  }
  const here = path.dirname(fileURLToPath(import.meta.url));
  return path.resolve(here, "output");
}

function main(): void {
  const length = codePoints(LINE);
  if (length < 1 || length > 240) {
    throw new Error(`entry must be 1-240 characters, got ${length}`);
  }
  if (LINE.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }

  const outDir = resolveOutDir();
  let targetDir = outDir;
  try {
    mkdirSync(targetDir, { recursive: true });
  } catch {
    // Env dir unusable (read-only mount, file in the way): fall back to
    // the repo-local output dir rather than dying on startup.
    const here = path.dirname(fileURLToPath(import.meta.url));
    targetDir = path.resolve(here, "output");
    mkdirSync(targetDir, { recursive: true });
  }
  const outPath = path.join(targetDir, "entry.txt");
  writeFileSync(outPath, LINE, "utf8");
  const bytes = Buffer.byteLength(LINE, "utf8");
  console.log(`Wrote entry.txt (${length} chars, ${bytes} bytes) to ${outPath}`);
}

main();
