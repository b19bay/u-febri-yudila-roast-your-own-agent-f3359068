import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I asked it to change one word. It rewrote the whole file, renamed the project, and the word is still wrong.";

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (!outDir) {
    console.error("MAKEFUN_OUTPUT_DIR is not set");
    process.exit(1);
  }
  if (LINE.length < 1 || LINE.length > 200) {
    console.error(`line must be 1-200 characters, got ${LINE.length}`);
    process.exit(1);
  }
  if (LINE.trim().length === 0 || LINE.includes("\n")) {
    console.error("line must be non-whitespace and a single line");
    process.exit(1);
  }
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, LINE, "utf8");
  const back = readFileSync(target, "utf8");
  if (back !== LINE) {
    console.error("read-back does not match the line");
    process.exit(1);
  }
}

main();
