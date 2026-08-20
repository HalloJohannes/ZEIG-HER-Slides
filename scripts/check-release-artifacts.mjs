import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";

const release = JSON.parse(await fs.readFile("quality/release-metadata.json", "utf8"));
const files = [release.canonicalFile, ...release.mirrors];
let reference = null;

for (const file of files) {
  const body = await fs.readFile(file);
  const hash = createHash("sha256").update(body).digest("hex");
  if (reference === null) reference = hash;
  if (hash !== reference) throw new Error(`Release-Spiegel weicht ab: ${file}`);
}

if (reference !== release.sha256) throw new Error("Release-Hash in den Metadaten ist nicht aktuell.");
console.log(`Release-Artefakte identisch: ${files.length} Kopien / ${reference}`);
