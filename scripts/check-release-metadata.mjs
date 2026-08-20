import { promises as fs } from "node:fs";

const pkg = JSON.parse(await fs.readFile("package.json", "utf8"));
const release = JSON.parse(await fs.readFile("quality/release-metadata.json", "utf8"));
const manifestPath = `quality/version-change-manifests/${release.version.replace(".", "_")}.json`;
const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));

if (pkg.version !== release.build) throw new Error("package.json und Release-Build widersprechen sich.");
if (manifest.build !== release.build) throw new Error("Versionsmanifest und Release-Build widersprechen sich.");
if (manifest.version !== release.version) throw new Error("Versionsmanifest und Kurzversion widersprechen sich.");
if (!/^V0\.\d{3}$/.test(release.version)) throw new Error("Ungültige Kurzversion.");
if (!/^0\.\d{3}\.\d{8}-codex$/.test(release.build)) throw new Error("Ungültige Buildkennung.");

for (const file of [release.canonicalFile, release.sourceFile, ...release.mirrors]) {
  await fs.access(file);
}

console.log(`Release-Metadaten konsistent: ${release.version} / ${release.build}`);
