import test from "node:test";
import assert from "node:assert/strict";
import { promises as fs } from "node:fs";

const source=await fs.readFile("src/app.html","utf8");
const budget=JSON.parse(await fs.readFile("quality/performance-budget.json","utf8"));

test("Bilder werden sichtbarkeitsgesteuert statt vollständig vorab dekodiert",()=>{
  assert.match(source,/im\.setAttribute\("data-src",d\.src\)/);
  assert.doesNotMatch(source,/im\.src=d\.src/);
  assert.match(source,/function reconcileImages\(\)/);
  assert.match(source,/removeAttribute\("src"\)/);
  assert.match(source,/requestIdleCallback/);
  assert.match(source,/resetImageHydrationCycle\(cur\);[\s\S]*?world\.innerHTML=""/);
  assert.match(source,/if\(imagePriorityStation!==cur\)resetImageHydrationCycle\(cur\)/);
  assert.match(source,/querySelectorAll\("\[data-image-queued\]"\)/);
  assert.match(source,/generation!==imageDecodeGeneration/);
  assert.match(source,/imageDecodeTimer=setTimeout\(done,5000\)/);
  assert.match(source,/if\(im\.complete\)setTimeout\(done,0\)/);
});

test("Bildoptimierung vermeidet synchrone Base64-Großkopien",()=>{
  const block=source.slice(source.indexOf("function processImageFile"),source.indexOf("function el(",source.indexOf("function processImageFile")));
  assert.match(block,/createImageBitmap/);
  assert.match(block,/\.toBlob\(/);
  assert.doesNotMatch(block,/toDataURL/);
  assert.match(block,/Math\.min\(64,cw\)/);
});

test("Kamera und Stationen besitzen Rendergrenzen und messbare Kennzahlen",()=>{
  assert.match(source,/will-change:transform/);
  assert.match(source,/contain:layout style/);
  assert.match(source,/translate3d\(/);
  assert.match(source,/data-render-build-ms/);
  assert.match(source,/data-render-hydrated/);
  assert.match(source,/data-camera-frame-p95/);
  assert.match(source,/PerformanceObserver/);
  assert.match(source,/classList\.toggle\("off",out\)/);
});

test("Performancebudget ist an den realen Lastfall gebunden",()=>{
  assert.equal(budget.expectedSlides,30);assert.equal(budget.expectedImages,107);assert.equal(budget.expectedRenderedImages,57);assert.ok(budget.minimumFixtureBytes>=24_000_000);assert.ok(budget.coldStartMs<=3500);assert.ok(budget.navigationP95Ms<=35);
});
