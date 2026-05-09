import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const roots = ["apps/web/components/public", "packages/sections/src"];
const forbidden = ["Restaurant Muster", "Hotel Muster", "Lorem ipsum"];
const hits: string[] = [];

function walk(dir: string) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) {
      walk(path);
      continue;
    }

    if (!/\.(ts|tsx)$/.test(path)) {
      continue;
    }

    const content = readFileSync(path, "utf8");
    for (const token of forbidden) {
      if (content.includes(token)) {
        hits.push(`${path}: contains forbidden tenant content "${token}"`);
      }
    }
  }
}

for (const root of roots) {
  walk(root);
}

if (hits.length > 0) {
  console.error(hits.join("\n"));
  process.exit(1);
}

console.log("No forbidden hardcoded tenant content found.");
