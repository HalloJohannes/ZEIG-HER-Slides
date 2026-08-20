import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";

const release=JSON.parse(await fs.readFile("quality/release-metadata.json","utf8"));
const dir=path.join("outputs",`deployment-${release.build}`);
const html=await fs.readFile(path.join(dir,"index.html"),"utf8");
const source=await fs.readFile("src/app.html","utf8");
const viewer=await fs.readFile("src/viewer.html","utf8");
const runtime=await fs.readFile("src/runtime/network-zero.js","utf8");
const fontMeta=JSON.parse(await fs.readFile("quality/font-assets.json","utf8"));
const fontBytes=Buffer.from((await fs.readFile(fontMeta.fonts[0].assetFile,"utf8")).replace(/\s/g,""),"base64");
const attestation=JSON.parse(await fs.readFile(path.join(dir,"privacy-attestation.json"),"utf8"));

for(const document of [html,viewer]){
  assert.match(document,/Content-Security-Policy/);
  assert.match(document,/connect-src 'none'/);
  assert.match(document,/frame-src 'none'/);
  assert.match(document,/form-action 'none'/);
}
assert.doesNotMatch(source,/fonts\.googleapis\.com|fonts\.gstatic\.com/);
assert.doesNotMatch(html,/<(?:script|img|iframe|link)\b[^>]*(?:src|href)=["']https?:/i);
assert.doesNotMatch(html,/google-analytics|googletagmanager|matomo|plausible|posthog|segment\.com|mixpanel|sentry/i);
assert.match(runtime,/offline-confirm-v2/);
assert.match(runtime,/automaticConnections:false/);
assert.match(runtime,/requestExternalNavigation/);
assert.match(runtime,/window\.confirm/);
assert.doesNotMatch(runtime,/Navigator\.prototype,"sendBeacon"/);
assert.doesNotMatch(runtime,/Document\.prototype,"cookie"/);
assert.doesNotMatch(runtime,/Object\.defineProperty\(window,"fetch"/);
assert.doesNotMatch(runtime,/XMLHttpRequest\.prototype\.open/);
assert.match(runtime,/data-network-external-resources/);
assert.doesNotMatch(source,/\p{Extended_Pictographic}/u);
assert.equal(fontBytes.length,fontMeta.fonts[0].decodedBytes);
assert.equal(createHash("sha256").update(fontBytes).digest("hex"),fontMeta.fonts[0].sha256);
assert.equal(fontBytes.subarray(0,4).toString(),"wOF2");
assert.equal(attestation.policy.connectSrc,"none");
assert.equal(attestation.policy.projectDataTransmission,false);
assert.match(attestation.deliveryBoundary,/IP-Adresse/);
for(const [name,record] of Object.entries(attestation.files)){
  const bytes=await fs.readFile(path.join(dir,name));assert.equal(bytes.length,record.bytes,name);assert.equal(createHash("sha256").update(bytes).digest("hex"),record.sha256,name);
}
console.log(`Offline- und Verbindungsgrenze bestanden: ${attestation.version} / ${Object.keys(attestation.files).length} attestierte Dateien.`);
