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
  assert.match(workflow, /npm run check/);
  assert.match(workflow, /actions\/upload-pages-artifact@v3/);
  assert.match(workflow, /actions\/deploy-pages@v4/);
  assert.doesNotMatch(workflow, /ZEIG-HER-Slides-V0_/);
});

test("Pages fügt seine Ergänzungen am echten Dokumentende ein", async () => {
  const release = JSON.parse(await read("quality/release-metadata.json"));
  const html = await read(`outputs/deployment-${release.build}/index.html`);
  const registrationStart = '<script>if("serviceWorker" in navigator';
  const registrationIndex = html.lastIndexOf(registrationStart);

  assert.ok(html.indexOf('<link rel="manifest"') < html.indexOf("</head>"));
  assert.ok(registrationIndex > html.lastIndexOf("var STORAGE_RESILIENCE_POLICY"));
  assert.equal(html.indexOf(registrationStart), registrationIndex);
  assert.match(html.slice(registrationIndex), /<\/script>\n<\/body>\s*<\/html>\s*$/);

  const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
    .filter(match => !/type=["']application\/json["']/i.test(match[1]));
  assert.equal(scripts.length, 2);
  for (const [, , source] of scripts) {
    assert.doesNotThrow(() => new Function(source));
  }
});

test("Offline-Cache löst die Pages-Adresse auf und erholt sich nach Cache-Verlust", async () => {
  const serviceWorker = await read("src/deployment/sw.js");
  assert.match(serviceWorker, /pages-v3/);
  assert.match(serviceWorker, /self\.registration\.scope/);
  assert.match(serviceWorker, /index\.html/);
  assert.match(serviceWorker, /url\.href===scopeRoot/);
  assert.match(serviceWorker, /fetch\(event\.request\)/);
  assert.match(serviceWorker, /cache\.put\(cacheRequest,response\.clone\(\)\)/);
  assert.match(serviceWorker, /cached\|\|fetchAndCache\(\)/);
  assert.match(serviceWorker, /Externe Verbindung gesperrt/);
});
