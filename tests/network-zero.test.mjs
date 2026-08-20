import test from "node:test";
import assert from "node:assert/strict";
import { promises as fs } from "node:fs";

const source=await fs.readFile("src/app.html","utf8");
const runtime=await fs.readFile("src/runtime/network-zero.js","utf8");
const build=await fs.readFile("scripts/build-release.mjs","utf8");

test("Outfit bleibt als freie lokale Variable-Font vollständig eingebettet",async()=>{
  const meta=JSON.parse(await fs.readFile("quality/font-assets.json","utf8"));
  assert.equal(meta.fonts[0].family,"Outfit");assert.equal(meta.fonts[0].weights,"300-800");assert.match(meta.fonts[0].license,/Open Font License/);
  assert.match(build,/assets\/outfit-latin\.woff2\.base64/);assert.match(build,/font-weight:300 800/);assert.doesNotMatch(source,/fonts\.googleapis|fonts\.gstatic/);
});

test("CSP sperrt Verbindungen, Frames, Formulare und fremde Ressourcen",()=>{
  assert.match(source,/default-src 'none'/);assert.match(source,/connect-src 'none'/);assert.match(source,/frame-src 'none'/);assert.match(source,/form-action 'none'/);assert.match(source,/img-src data: blob:/);
});

test("Laufzeitvertrag bestätigt ausschließlich ausdrücklich ausgelöste externe Navigation",()=>{
  assert.match(runtime,/offline-confirm-v2/);
  assert.match(runtime,/automaticConnections:false/);
  assert.match(runtime,/requestExternalNavigation/);
  assert.match(runtime,/window\.confirm/);
  assert.match(runtime,/window\.open\(safe/);
  assert.doesNotMatch(runtime,/Object\.defineProperty\(window,"fetch"/);
  assert.doesNotMatch(runtime,/XMLHttpRequest\.prototype\.open/);
  assert.doesNotMatch(runtime,/Navigator\.prototype,"sendBeacon"/);
  assert.doesNotMatch(runtime,/Document\.prototype,"cookie"/);
  assert.doesNotMatch(runtime,/window\.open=function/);
  assert.match(runtime,/data-network-external-resources/);
});

test("Produktquelle enthält keine Emoji-Zeichen",()=>{assert.doesNotMatch(source,/\p{Extended_Pictographic}/u);});
