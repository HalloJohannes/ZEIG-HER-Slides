import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";

const root = process.cwd();
const output = path.join(root, "quality", "baseline-inventory-v0.017.json");
const excludedDirectories = new Set([".git", "node_modules", ".quality-runtime"]);

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (excludedDirectories.has(entry.name)) continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(absolute));
    if (entry.isFile() && absolute !== output) files.push(absolute);
  }
  return files;
}

const files = await walk(root);
const inventory = [];
for (const absolute of files.sort()) {
  const body = await fs.readFile(absolute);
  inventory.push({
    path: path.relative(root, absolute),
    bytes: body.byteLength,
    sha256: createHash("sha256").update(body).digest("hex")
  });
}

await fs.writeFile(output, `${JSON.stringify({
  schemaVersion: 1,
  baseline: "V0.017",
  generatedAt: new Date().toISOString(),
  files: inventory
}, null, 2)}\n`);

console.log(`Baseline-Inventar geschrieben: ${inventory.length} Dateien`);
