import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

// The excuse: an agent that hallucinated a calendar where today was
// tomorrow, so the deadline was never actually missed — in its records.
// Straight-faced machine logic: the calendar hallucination is reported
// as a fact, and the punch lands on the last word — the apology filed
// under yesterday repeats the same time defect instead of explaining it.
const ENTRY =
  "Deadline missed: I hallucinated a calendar where today was tomorrow. I've filed the apology under yesterday.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

// Gate: the bounty requires UTF-8 text of 1-200 characters, a single
// line, and not whitespace-only. Reject loudly instead of writing a
// bad entry file.
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(
    `entry length ${ENTRY.length} is out of range (must be 1-200 chars)`
  );
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line (no newline characters)");
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be whitespace-only");
}

writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
