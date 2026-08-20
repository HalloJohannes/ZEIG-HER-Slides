import assert from "node:assert/strict";
import { promises as fs } from "node:fs";
import test from "node:test";
import vm from "node:vm";

test("die Releasekennung folgt dem verbindlichen Format", async () => {
  const release = JSON.parse(await fs.readFile("quality/release-metadata.json", "utf8"));
  assert.match(release.version, /^V0\.\d{3}$/);
  assert.match(release.build, /^0\.\d{3}\.\d{8}-codex$/);
});

test("das ausgelieferte Anwendungsscript besitzt gültige Syntax", async () => {
  const release = JSON.parse(await fs.readFile("quality/release-metadata.json", "utf8"));
  const html = await fs.readFile(release.canonicalFile, "utf8");
  const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)];
  assert.equal(scripts.length, 2);
  assert.doesNotThrow(() => JSON.parse(scripts[0][1]));
  assert.doesNotThrow(() => new vm.Script(scripts.at(-1)[1]));
});

test("die Baseline enthält das eingebettete Deck", async () => {
  const release = JSON.parse(await fs.readFile("quality/release-metadata.json", "utf8"));
  const html = await fs.readFile(release.canonicalFile, "utf8");
  assert.match(html, /id="deck-data"/);
  assert.doesNotMatch(html, /id="program-demo-data"/);
  assert.match(html, /ZEIG HER Slides Demo/);
});

test("die Demo besitzt genau eine kanonische Datenquelle", async () => {
  const release = JSON.parse(await fs.readFile("quality/release-metadata.json", "utf8"));
  const html = await fs.readFile(release.canonicalFile, "utf8");
  assert.equal((html.match(/id="program-demo-data"/g)||[]).length,0);
  assert.match(html,/PROGRAM_DEMO_DATA=applyProgramDemoGuidance\(JSON\.parse\(JSON\.stringify\(INITIAL_PREPARED_PROJECT\.data\)\)\)/);
});

test("Produktkennung und Projektschema sind im Artefakt verankert", async () => {
  const release = JSON.parse(await fs.readFile("quality/release-metadata.json", "utf8"));
  const html = await fs.readFile(release.canonicalFile, "utf8");
  assert.match(html, new RegExp(release.build.replaceAll(".", "\\.")));
  assert.match(html, /CURRENT_SCHEMA_VERSION=3/);
  assert.match(html, /id="about-version-value"/);
});

test("Transparenzdialog und Schriftressource bleiben dedupliziert",async()=>{
  const release=JSON.parse(await fs.readFile("quality/release-metadata.json","utf8"));
  const html=await fs.readFile(release.canonicalFile,"utf8");
  const about=await fs.readFile("src/fragments/about-panel.html","utf8");
  const productCss=html.match(/<style>([\s\S]*?)<\/style>/)?.[1]||"";
  assert.equal((about.match(/<dt>/g)||[]).length,7);
  assert.equal((html.match(/© 2026 Johannes Koch/g)||[]).length,2);
  assert.equal((html.match(/© 2021/g)||[]).length,1);
  assert.equal((productCss.match(/src:url\(data:font\/woff2;base64,/g)||[]).length,1);
  assert.doesNotMatch(html,/HANDOUT_FONT_BASE64/);
  assert.match(html,/id="infopanel"/);
  assert.match(html,/id="infobtn"/);
});
