import { spawn } from "node:child_process";

const steps = [
  ["Build", ["scripts/build-release.mjs"]],
  ["Deployment", ["scripts/build-deployment.mjs"]],
  ["Viewer-Prüfartefakt", ["scripts/build-viewer-fixture.mjs"]],
  ["Performance-Prüfartefakt", ["scripts/build-performance-fixture.mjs"]],
  ["Werkstatt-Build", ["scripts/build-workshop.mjs"]],
  ["Freigabenachweis", ["scripts/build-release-evidence.mjs"]],
  ["Tests", ["--test"]],
  ["Baseline", ["scripts/check-baseline.mjs"]],
  ["Release-Metadaten", ["scripts/check-release-metadata.mjs"]],
  ["Release-Spiegel", ["scripts/check-release-artifacts.mjs"]],
  ["Offline- und Verbindungsgrenze", ["scripts/check-network-zero.mjs"]],
  ["Externe Verifikation", ["verification/verify-release.mjs"]],
  ["Werkstatt-Vertrag", ["scripts/check-workshop.mjs"]],
  ["Projektstruktur", ["scripts/check-project-structure.mjs"]]
];

for (const [label, args] of steps) {
  process.stdout.write(`\n[${label}]\n`);
  const code = await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, args, { stdio: "inherit" });
    child.on("error", reject);
    child.on("exit", resolve);
  });
  if (code !== 0) process.exit(code || 1);
}

console.log("\nRelease-Check bestanden.");
