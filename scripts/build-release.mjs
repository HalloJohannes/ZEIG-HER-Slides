import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";

const root = process.cwd();
const releasePath = path.join(root, "quality", "release-metadata.json");
const release = JSON.parse(await fs.readFile(releasePath, "utf8"));
let sourceTemplate = await fs.readFile(path.join(root, release.sourceFile), "utf8");
const demoMatch = sourceTemplate.match(/<script type="application\/json" id="deck-data">([\s\S]*?)<\/script>/);
if (!demoMatch) throw new Error("Die kanonische Demo in deck-data fehlt.");
const identityRuntime = await fs.readFile(path.join(root, "src/runtime/project-identity.js"), "utf8");
const contentRuntime = await fs.readFile(path.join(root, "src/runtime/content-boundary.js"), "utf8");
const schemaRuntime = await fs.readFile(path.join(root, "src/runtime/project-schema.js"), "utf8");
const cameraRuntime = await fs.readFile(path.join(root, "src/runtime/camera-fit.js"), "utf8");
const uiRuntime = await fs.readFile(path.join(root, "src/runtime/ui-contracts.js"), "utf8");
const viewerVisibilityRuntime = await fs.readFile(path.join(root, "src/runtime/viewer-visibility.js"), "utf8");
const viewerExportRuntime = await fs.readFile(path.join(root, "src/runtime/viewer-export.js"), "utf8");
const handoutExportRuntime = await fs.readFile(path.join(root, "src/runtime/handout-export.js"), "utf8");
const storageResilienceRuntime = await fs.readFile(path.join(root, "src/runtime/storage-resilience.js"), "utf8");
const pptxImportRuntime = await fs.readFile(path.join(root, "src/runtime/pptx-import-contract.js"), "utf8");
const stabilityRuntime = await fs.readFile(path.join(root, "src/runtime/stability-contract.js"), "utf8");
const networkRuntime = await fs.readFile(path.join(root, "src/runtime/network-zero.js"), "utf8");
const aboutRuntime = await fs.readFile(path.join(root, "src/runtime/about-panel.js"), "utf8");
const viewerRuntime = await fs.readFile(path.join(root, "src/runtime/viewer-runtime.js"), "utf8");
const viewerSource = await fs.readFile(path.join(root, "src/viewer.html"), "utf8");
const aboutFragment = await fs.readFile(path.join(root, "src/fragments/about-panel.html"), "utf8");
const registry = JSON.parse(await fs.readFile(path.join(root, "quality/design-system-registry.json"), "utf8"));
const outfitBase64 = (await fs.readFile(path.join(root, "src/assets/outfit-latin.woff2.base64"), "utf8")).replace(/\s/g, "");
const outfitBytes = Buffer.from(outfitBase64, "base64");
if (outfitBytes.length !== 32292 || outfitBytes.subarray(0,4).toString() !== "wOF2") throw new Error("Eingebettete Outfit-Schrift ist beschädigt.");
const outfitCss = `@font-face{font-family:"Outfit";font-style:normal;font-weight:300 800;font-display:swap;src:url(data:font/woff2;base64,${outfitBase64}) format("woff2");}`;
if (registry.productVersion !== release.version) throw new Error(`Designsystem ${registry.productVersion} passt nicht zu ${release.version}.`);
const canonicalTokens = registry.tokenGroups.flatMap(group => group.tokens).filter(token => token.status === "canonical");
const tokenNames = new Set();
const tokenCss = canonicalTokens.map(token => {
  if (!/^--[a-z0-9-]+$/.test(token.css) || tokenNames.has(token.css)) throw new Error(`Ungültiger oder doppelter Token: ${token.css}`);
  tokenNames.add(token.css);
  return `  ${token.css}:${token.value};`;
}).join("\n");
const replaceOnce = (input, marker, value, label) => {
  const count = input.split(marker).length - 1;
  if (count !== 1) throw new Error(`Die Quelle muss genau eine Einfügemarke für ${label} enthalten.`);
  return input.replace(marker, value);
};
const includeMarker = "/* @include runtime/project-identity.js */";
if ((sourceTemplate.match(new RegExp(includeMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")) || []).length !== 1) {
  throw new Error("Die Quelle muss genau eine Einfügemarke für die Projektidentität enthalten.");
}
const source = sourceTemplate.replace(includeMarker, identityRuntime.trim());
const contentMarker = "/* @include runtime/content-boundary.js */";
if ((source.match(new RegExp(contentMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")) || []).length !== 1) {
  throw new Error("Die Quelle muss genau eine Einfügemarke für die Inhaltsgrenze enthalten.");
}
const sourceWithContent = source.replace(contentMarker, contentRuntime.trim());
const schemaMarker = "/* @include runtime/project-schema.js */";
if ((sourceWithContent.match(new RegExp(schemaMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")) || []).length !== 1) {
  throw new Error("Die Quelle muss genau eine Einfügemarke für das Projektschema enthalten.");
}
let composedSource = sourceWithContent.replace(schemaMarker, schemaRuntime.trim());
const appAbout = aboutFragment
  .replace("__ABOUT_VERSION__", release.version)
  .replace("__ABOUT_BUILD__", release.build)
  .replace("__ABOUT_STORAGE__", "Status wird beim Öffnen geprüft. Projekte und Entwürfe bleiben im Browserprofil für diese Datei; die portable Sicherung ist die heruntergeladene Projektdatei.");
composedSource = replaceOnce(composedSource, "<!-- @include fragments/about-panel.html -->", appAbout.trim(), "Info-Komponente");
composedSource = replaceOnce(composedSource, "/* @include design-system/tokens.css */", tokenCss, "Designsystem-Tokens");
composedSource = replaceOnce(composedSource, "/* @include assets/outfit-font.css */", outfitCss, "lokale Outfit-Schrift");
composedSource = replaceOnce(composedSource, "/* @include design-system/registry.js */", `var DESIGN_SYSTEM_REGISTRY=Object.freeze(${JSON.stringify(registry)});`, "Designsystem-Registry");
composedSource = replaceOnce(composedSource, "/* @include runtime/camera-fit.js */", cameraRuntime.trim(), "Kamera-Fit-Vertrag");
composedSource = replaceOnce(composedSource, "/* @include runtime/ui-contracts.js */", uiRuntime.trim(), "UI-Verträge");
composedSource = replaceOnce(composedSource, "/* @include runtime/viewer-visibility.js */", viewerVisibilityRuntime.trim(), "Viewer-Sichtbarkeitsvertrag");
composedSource = replaceOnce(composedSource, "/* @include runtime/viewer-export.js */", viewerExportRuntime.trim(), "Viewer-Exportvertrag");
composedSource = replaceOnce(composedSource, "/* @include runtime/handout-export.js */", handoutExportRuntime.trim(), "Handout-Exportvertrag");
composedSource = replaceOnce(composedSource, "/* @include runtime/storage-resilience.js */", storageResilienceRuntime.trim(), "Speicher-Resilienzvertrag");
composedSource = replaceOnce(composedSource, "/* @include runtime/pptx-import-contract.js */", pptxImportRuntime.trim(), "PowerPoint-Importvertrag");
composedSource = replaceOnce(composedSource, "/* @include runtime/stability-contract.js */", stabilityRuntime.trim(), "Stabilitätsvertrag");
composedSource = replaceOnce(composedSource, "/* @include runtime/network-zero.js */", networkRuntime.trim(), "Offline- und Verbindungsvertrag");
composedSource = replaceOnce(composedSource, "/* @include runtime/about-panel.js */", aboutRuntime.trim(), "Info-Komponentenvertrag");
let viewerTemplate = viewerSource;
viewerTemplate = replaceOnce(viewerTemplate, "__VIEWER_VERSION__", release.version, "Viewer-Version");
viewerTemplate = replaceOnce(viewerTemplate, "__VIEWER_BUILD__", release.build, "Viewer-Build");
viewerTemplate = replaceOnce(viewerTemplate, "__VIEWER_NETWORK_CORE__", networkRuntime.trim().replaceAll("</script>", "<\\/script>"), "Viewer-Netzwerkkern");
viewerTemplate = replaceOnce(viewerTemplate, "__VIEWER_DIALOG_CORE__", aboutRuntime.trim().replaceAll("</script>", "<\\/script>"), "Viewer-Dialogkern");
viewerTemplate = replaceOnce(viewerTemplate, "__VIEWER_CAMERA_CORE__", cameraRuntime.trim().replaceAll("</script>", "<\\/script>"), "Viewer-Kamerakern");
viewerTemplate = replaceOnce(viewerTemplate, "__VIEWER_VISIBILITY_CORE__", viewerVisibilityRuntime.trim().replaceAll("</script>", "<\\/script>"), "Viewer-Sichtbarkeitskern");
viewerTemplate = replaceOnce(viewerTemplate, "__VIEWER_RUNTIME__", viewerRuntime.trim().replaceAll("</script>", "<\\/script>"), "Viewer-Runtime");
const viewerLiteral = JSON.stringify(viewerTemplate).replaceAll("</", "<\\/");
composedSource = replaceOnce(composedSource, "/* @include viewer/template.js */", `var VIEWER_TEMPLATE=${viewerLiteral};`, "Viewer-Template");

if (!composedSource.includes(`content="${release.build}"`)) {
  throw new Error(`Die Quelle enthält nicht die erwartete Buildkennung ${release.build}.`);
}
if (!composedSource.includes(`short:"${release.version}"`)) {
  throw new Error(`Die Quelle enthält nicht die erwartete Kurzversion ${release.version}.`);
}

const targets = [release.canonicalFile, ...release.mirrors];
for (const target of targets) {
  const absolute = path.join(root, target);
  await fs.mkdir(path.dirname(absolute), { recursive: true });
  const temporary = `${absolute}.tmp`;
  await fs.writeFile(temporary, composedSource);
  await fs.rename(temporary, absolute);
}

release.sha256 = createHash("sha256").update(composedSource).digest("hex");
await fs.writeFile(releasePath, `${JSON.stringify(release, null, 2)}\n`);
console.log(`${release.version} gebaut und an ${targets.length} Zielorte gespiegelt.`);
