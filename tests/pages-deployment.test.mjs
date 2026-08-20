import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = path => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("README nennt den stabilen Online-Einstieg bereits in der Einleitung", async () => {
  const readme = await read("README.md");
  const introduction = readme.split("## Schnellstart", 1)[0];
  assert.match(introduction, /https:\/\/hallojohannes\.github\.io\/ZEIG-HER-Slides\//);
});

test("Pages baut das kanonische Deploymentpaket statt einer separaten Anwendung", async () => {
  const workflow = await read(".github/workflows/pages.yml");
  assert.match(workflow, /npm run deployment:build/);
  assert.match(workflow, /actions\/upload-pages-artifact@v3/);
  assert.match(workflow, /actions\/deploy-pages@v4/);
  assert.doesNotMatch(workflow, /ZEIG-HER-Slides-V0_/);
});

test("Offline-Cache löst die Pages-Verzeichnisadresse auf index.html auf", async () => {
  const serviceWorker = await read("src/deployment/sw.js");
  assert.match(serviceWorker, /self\.registration\.scope/);
  assert.match(serviceWorker, /index\.html/);
  assert.match(serviceWorker, /url\.href===scopeRoot/);
});
