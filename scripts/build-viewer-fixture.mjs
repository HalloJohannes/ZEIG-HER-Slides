import assert from "node:assert/strict";
import { promises as fs } from "node:fs";
import vm from "node:vm";

const release=JSON.parse(await fs.readFile("quality/release-metadata.json","utf8"));
const built=await fs.readFile(release.canonicalFile,"utf8");
const match=built.match(/var VIEWER_TEMPLATE=("(?:\\.|[^"\\])*");/);
assert.ok(match,"Eingebettetes Viewer-Template fehlt im Produktbuild.");
const template=JSON.parse(match[1]);
const exportRuntime=await fs.readFile("src/runtime/viewer-export.js","utf8");
const context={};vm.runInNewContext(`${exportRuntime};this.compose=composeViewerDocument;`,context);
const aboutTemplate=await fs.readFile("src/fragments/about-panel.html","utf8");
const about=aboutTemplate
  .replaceAll("__ABOUT_VERSION__",release.version)
  .replaceAll("__ABOUT_BUILD__",release.build)
  .replaceAll("__ABOUT_STORAGE__","Diese Ansichtsdatei speichert keine Projekte oder personenbezogenen Daten.");
const css=built.match(/<style>([\s\S]*?)<\/style>/)?.[1]||"";
const snapshot=`<div id="world"><div class="wblob off"></div><section class="st off" style="left:200px;top:180px;width:1100px"><div class="inner"><div class="kicker">Nachlese</div><h2>Erste Station</h2><p class="lead">Präsentation für Köln mit <a href="https://example.org">sicherem Link</a>.</p><div class="revealwrap"><div class="rv-content"><p>Lösung sichtbar</p></div><div class="revealcover"><span>Aufdecken</span></div></div></div></section><section class="st" style="left:1600px;top:520px;width:1000px;min-height:2600px"><div class="inner"><h2>Zweite, bewusst hohe Station</h2><p class="lead">Der vollständige Rahmen muss auch unterhalb langer Inhalte oberhalb der Navigation sichtbar bleiben.</p><div class="embedwrap"><div class="ratio"><div class="embed-consent"><b>Externer Inhalt ist blockiert</b><button data-embed-url="https://www.youtube-nocookie.com/embed/AbCdEf12345">Externen Inhalt laden</button></div></div></div></div></section></div>`;
const contract={viewerSchemaVersion:1,product:"ZEIG HER Slides Ansicht",appVersion:release.build,title:"Viewer-Prüfung für Köln",chapters:["Überblick"],stationChapters:[0,0],colors:{petrol:"#123c4a",teal:"#4fb3aa",mint:"#e2f1f1",coral:"#f25d68"},materialLicense:{title:"Viewer-Prüfung für Köln",author:"Qualitätssicherung",year:"2026",licenseCode:"cc-by-4.0",licenseText:"CC BY 4.0",customText:"",exceptions:true}};
const output=context.compose(template,snapshot,"<span class=\"lg-fallback\">ZEIG HER</span>",contract,about,css);
const scripts=Array.from(output.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g),item=>item[1]).join("\n");
assert.doesNotMatch(output,/<[^>]+id=["'](?:edit-toolbar|projpanel|orderpanel|pptxdialog|restorebar)["']/);
assert.doesNotMatch(scripts,/indexedDB|localStorage|showSaveFilePicker|FileReader|contenteditable|editMode|autosave|projpanel|pj-/i);
assert.doesNotMatch(output,/__VIEWER_(?:SNAPSHOT|LOGO|DATA|ABOUT|CSS)__/);
assert.doesNotMatch(output,/__ABOUT_(?:VERSION|BUILD|STORAGE)__/);
await fs.mkdir(".quality-runtime",{recursive:true});
await fs.writeFile(".quality-runtime/viewer-fixture.html",output);
console.log(`Viewer-Prüfartefakt gebaut: ${output.length} Zeichen / Vertrag 1.`);
