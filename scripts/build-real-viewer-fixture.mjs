import assert from "node:assert/strict";
import { promises as fs } from "node:fs";
import vm from "node:vm";

const release=JSON.parse(await fs.readFile("quality/release-metadata.json","utf8"));
const built=await fs.readFile(release.canonicalFile,"utf8");
const templateMatch=built.match(/var VIEWER_TEMPLATE=("(?:\\.|[^"\\])*");/);
assert.ok(templateMatch,"Eingebettetes Viewer-Template fehlt im Produktbuild.");
const template=JSON.parse(templateMatch[1]);

const sourceFile=process.argv[2]||".quality-runtime/viewer-real-v0.033.html";
const source=await fs.readFile(sourceFile,"utf8");
function between(start,end){
  const from=source.indexOf(start);
  assert.notEqual(from,-1,`Startmarker fehlt: ${start}`);
  const contentStart=from+start.length;
  const to=source.indexOf(end,contentStart);
  assert.notEqual(to,-1,`Endmarker fehlt: ${end}`);
  return source.slice(contentStart,to);
}
const snapshot=between('<div id="viewport">','</div>\n<div id="appname">');
const logo=between('<div id="logo">','</div>\n<div id="bar">');
const priorContract=JSON.parse(between('<script type="application/json" id="viewer-data">','</script>'));
const exportRuntime=await fs.readFile("src/runtime/viewer-export.js","utf8");
const aboutTemplate=await fs.readFile("src/fragments/about-panel.html","utf8");
const about=aboutTemplate
  .replaceAll("__ABOUT_VERSION__",release.version)
  .replaceAll("__ABOUT_BUILD__",release.build)
  .replaceAll("__ABOUT_STORAGE__","Diese Ansichtsdatei speichert keine Projekte oder personenbezogenen Daten.");
const css=built.match(/<style>([\s\S]*?)<\/style>/)?.[1]||"";
const context={};
vm.runInNewContext(`${exportRuntime};this.compose=composeViewerDocument;this.plain=plainViewerText;this.normalizeMaterialLicense=normalizeMaterialLicense;`,context);
const contract={
  ...priorContract,
  appVersion:release.build,
  title:context.plain(priorContract.title),
  chapters:(priorContract.chapters||[]).map(context.plain),
  materialLicense:context.normalizeMaterialLicense(priorContract.materialLicense||{
    title:priorContract.title,
    author:"Qualitätssicherung",
    year:"2026",
    licenseCode:"cc-by-4.0",
    exceptions:true
  },priorContract.title)
};
const output=context.compose(template,snapshot,logo,contract,about,css);
assert.doesNotMatch(output,/__VIEWER_(?:SNAPSHOT|LOGO|DATA|ABOUT|CSS)__/);
assert.doesNotMatch(output,/__ABOUT_(?:VERSION|BUILD|STORAGE)__/);
assert.match(output,/id="hudactions"/);
assert.match(output,/id="printbtn"/);

await fs.mkdir(".quality-runtime",{recursive:true});
await fs.writeFile(".quality-runtime/viewer-real-current.html",output);
console.log(`Realer Viewer-Prüfstand gebaut: ${output.length} Zeichen / ${contract.stationChapters.length} Stationen / ${release.version}.`);
