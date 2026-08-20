import assert from "node:assert/strict";
import { promises as fs } from "node:fs";

const budget=JSON.parse(await fs.readFile("quality/performance-budget.json","utf8"));
const release=JSON.parse(await fs.readFile("quality/release-metadata.json","utf8"));
try{await fs.access(budget.fixture);}catch{
  await fs.mkdir(".quality-runtime",{recursive:true});
  const reason="Private große Performance-Referenz ist im öffentlichen Checkout nicht enthalten.";
  await fs.writeFile(".quality-runtime/performance-fixture.json",JSON.stringify({skipped:true,reason,budget},null,2));
  console.log(`Performance-Prüfartefakt übersprungen: ${reason}`);
  process.exit(0);
}
const source=await fs.readFile(budget.fixture,"utf8");
const target=await fs.readFile(release.canonicalFile,"utf8");
const marker='<script type="application/json" id="deck-data">';
function deck(html){const start=html.indexOf(marker);const end=start>=0?html.indexOf("</script>",start+marker.length):-1;assert.ok(start>=0&&end>start,"Projektdaten fehlen in der Performance-Referenz.");return html.slice(start+marker.length,end);}
const sourceDeck=deck(source);const data=JSON.parse(sourceDeck);const imageCount=(sourceDeck.match(/data:image\//g)||[]).length;
assert.ok(Buffer.byteLength(source)>=budget.minimumFixtureBytes,"Performance-Referenz ist unerwartet klein.");
assert.equal(data.slides.length,budget.expectedSlides,"Stationenzahl der Performance-Referenz weicht ab.");
assert.equal(imageCount,budget.expectedImages,"Bildzahl der Performance-Referenz weicht ab.");
const current=deck(target);const output=target.replace(current,sourceDeck);
await fs.mkdir(".quality-runtime",{recursive:true});await fs.writeFile(".quality-runtime/performance-fixture.html",output);
await fs.writeFile(".quality-runtime/performance-fixture.json",JSON.stringify({sourceBytes:Buffer.byteLength(source),outputBytes:Buffer.byteLength(output),slides:data.slides.length,images:imageCount,budget},null,2));
console.log(`Performance-Prüfartefakt: ${(Buffer.byteLength(output)/1048576).toFixed(1)} MiB / ${data.slides.length} Stationen / ${imageCount} Bilder.`);
