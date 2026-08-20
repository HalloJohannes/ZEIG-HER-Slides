import assert from "node:assert/strict";
import { promises as fs } from "node:fs";
import test from "node:test";

const appSource = await fs.readFile("src/app.html", "utf8");
const aboutFragment = await fs.readFile("src/fragments/about-panel.html", "utf8");
const aboutRuntime = await fs.readFile("src/runtime/about-panel.js", "utf8");
const viewerSource = await fs.readFile("src/viewer.html", "utf8");
const viewerRuntime = await fs.readFile("src/runtime/viewer-runtime.js", "utf8");

test("Anwendung und Ansicht verwenden dieselbe kanonische Transparenzkomponente", () => {
  assert.equal((aboutFragment.match(/<dt>/g) || []).length, 7);
  assert.deepEqual(
    [...aboutFragment.matchAll(/<dt>([^<]+)<\/dt>/g)].map(match => match[1]),
    ["Produktversion", "Entstehung", "Netzwerk", "Speicherung", "Schrift", "Lizenz der Anwendung", "Hinweis"]
  );
  assert.match(appSource, /<!-- @include fragments\/about-panel\.html -->/);
  assert.match(viewerSource, /__VIEWER_ABOUT__/);
  assert.match(aboutRuntime, /installAboutPanel/);
  assert.match(viewerRuntime, /installAboutPanel\(\)/);
  assert.match(viewerSource, /id="infobtn"[^>]*title="Über diese Anwendung"[^>]*aria-label="Über diese Anwendung"[^>]*>Über<\/button>/);
});

test("Transparenzkomponente nennt Johannes Koch und verwendet die MIT License mit Namensnennung", () => {
  assert.match(aboutFragment, /href="https:\/\/www\.linkedin\.com\/in\/johannes-koch-1964a3240"[^>]*>Johannes Koch<\/a>/);
  assert.match(aboutFragment, /Diese Anwendung „ZEIG HER Slides“ wurde 2026 von [\s\S]*Johannes Koch[\s\S]* erstellt\./);
  assert.doesNotMatch(aboutFragment, /Johannes Koch<\/a> mit Unterstützung von KI/);
  assert.match(aboutFragment, /Entstanden im Vibe-Coding: Die erste Fassung wurde mit Unterstützung von Claude geschrieben und anschließend mit Codex weiterentwickelt, strukturiert und getestet\./);
  assert.match(aboutFragment, /Konzeption, Auswahl, Prüfung und Veröffentlichung verantwortet Johannes Koch\./);
  assert.match(aboutFragment, /MIT License/);
  assert.match(aboutFragment, /Copyright \(c\) 2026 Johannes Koch/);
  assert.match(aboutFragment, /copyright notice and this permission notice shall be included/i);
  assert.doesNotMatch(aboutFragment, /MIT-0|No Attribution/i);
  assert.match(viewerRuntime, /MIT License · © 2026 Johannes Koch/);
});

test("Speicherfehler bleiben sichtbar und bieten sofort eine portable Sicherung an", () => {
  assert.match(appSource, /id="storage-alert" role="alert" hidden/);
  assert.match(appSource, /Automatisches Speichern ist in diesem Browser nicht möglich/);
  assert.match(appSource, /id="storage-alert-download"/);
  assert.match(appSource, /function reportStorageFailure\(message\)/);
  assert.match(appSource, /storageFailureSticky=true/);
  assert.match(appSource, /downloadProjectFile\(\)/);
});

test("Bibliotheken aus V0.040 und der Ursprungsfassung werden idempotent kopiert und bleiben als Rückfall erhalten", () => {
  assert.match(appSource, /ACTIVE_DATABASE_NAME="zeig-her-slides"/);
  assert.match(appSource, /LEGACY_DATABASE_NAMES=\["schau-hin-slides","bittestil-praesentation"\]/);
  assert.match(appSource, /function migrateLegacyBrowserDatabase\(done\)/);
  assert.match(appSource, /function normalizeLegacyMigrationItem\(item\)/);
  assert.match(appSource, /project\.meta\.pid=newDemoId/);
  assert.match(appSource, /readDatabaseItems\(legacy/);
  assert.match(appSource, /readDatabaseItems\(active/);
  assert.match(appSource, /Die alte Browser-Datenbank bleibt unangetastet/);
  assert.doesNotMatch(appSource, /deleteDatabase\(/);
});

test("native Browser-Schnittstellen werden nicht überschrieben", async () => {
  const networkRuntime = await fs.readFile("src/runtime/network-zero.js", "utf8");
  for (const forbidden of [
    /window\.open\s*=/,
    /window\.fetch\s*=/,
    /XMLHttpRequest\s*=/,
    /WebSocket\s*=/,
    /EventSource\s*=/,
    /sendBeacon\s*=/,
    /document\.cookie\s*=/
  ]) assert.doesNotMatch(networkRuntime, forbidden);
  assert.match(networkRuntime, /confirm\(/);
  assert.match(networkRuntime, /data-network-policy/);
});
