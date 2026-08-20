import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";

const expected = "577c374413b8bf48cda4c4d73144077a4c17d7482f21ca26e4155874c93d07b8";
const files = [
  "src/legacy/schau-hin-slides-v0.017-source.html",
  "versions/archiv/SCHAU-HIN-Slides-V0_017_20260818-codex.html"
];

const optionalBuildMirror = "outputs/release-0.017.20260818-codex/SCHAU-HIN-Slides-V0_017_20260818-codex.html";
try {
  await fs.access(optionalBuildMirror);
  files.push(optionalBuildMirror);
} catch {
  console.log("Lokaler V0.017-Buildspiegel fehlt; die beiden versionierten Baseline-Kopien werden geprüft.");
}

for (const file of files) {
  const body = await fs.readFile(file);
  const actual = createHash("sha256").update(body).digest("hex");
  if (actual !== expected) throw new Error(`Baseline-Abweichung in ${file}: ${actual}`);
}

const workshopFiles = [
  "projekte/workshop-stand-20260818/praesentation.html",
  "projekte/workshop-stand-20260818/didaktischebildgenerierung.html"
];
if (await Promise.all(workshopFiles.map(async (file) => {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
})).then((states) => states.every(Boolean))) {
  const workshopA = await fs.readFile(workshopFiles[0]);
  const workshopB = await fs.readFile(workshopFiles[1]);
  if (!workshopA.equals(workshopB)) throw new Error("Die beiden aktuellen Workshopdateien sind nicht byteidentisch.");
} else {
  console.log("Private Workshopspiegel fehlen; ihr Bytevergleich wird im öffentlichen Checkout übersprungen.");
}

console.log("Versionierte Baseline ist byteidentisch.");
