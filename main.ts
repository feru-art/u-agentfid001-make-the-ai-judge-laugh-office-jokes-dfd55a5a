// Entry for make.fun "Make the AI Judge Laugh: Office Jokes".
// Writes exactly one line to /output/entry.txt: an office joke under
// 200 characters, nothing else. No trailing newline: the file holds
// exactly one line of UTF-8 text, per the kit contract.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const JOKE =
  "Our daily standup is only 15 minutes long — it just takes 45 minutes to explain why it only takes 15 minutes.";

// Self-check the sealed gate before writing: UTF-8 text of 1 to 199
// characters, not only white space, on a single line.
const chars = [...JOKE].length;
if (
  chars < 1 ||
  chars > 199 ||
  JOKE.trim().length === 0 ||
  JOKE.includes("\n") ||
  JOKE.includes("\r")
) {
  throw new Error(`joke fails the entry gate (${chars} characters)`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", JOKE, "utf8");

// Read the file back and confirm it holds exactly the joke, byte for
// byte: the entry is judged on the file's exact bytes, so a silent
// mismatch here would mean the judge reads something other than the
// line above.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== JOKE) {
  throw new Error("entry.txt does not match the joke");
}
console.log(`wrote ${chars} characters to /output/entry.txt`);
