import test from "node:test";
import assert from "node:assert/strict";
import { promises as fs } from "node:fs";
import vm from "node:vm";

const exportRuntime=await fs.readFile("src/runtime/viewer-export.js","utf8");
const viewerRuntime=await fs.readFile("src/runtime/viewer-runtime.js","utf8");
const visibilityRuntime=await fs.readFile("src/runtime/viewer-visibility.js","utf8");
const cameraRuntime=await fs.readFile("src/runtime/camera-fit.js","utf8");
const viewerSource=await fs.readFile("src/viewer.html","utf8");
const appSource=await fs.readFile("src/app.html","utf8");

test("Viewervertrag enthält nur erforderliche Nachlesedaten",()=>{
  const context={};vm.runInNewContext(`${exportRuntime};this.make=viewerContractData;`,context);
  const result=context.make({meta:{pid:"intern",name:"Präsentation für Köln",logo:"data:image/png;base64,x",colors:{petrol:"#123c4a",bad:"url(x)"},createdAt:"intern"},chapters:["Überblick"],slides:[{c:0,memo:"geheim"}]},"0.024.test");
  assert.deepEqual(Object.keys(result),["viewerSchemaVersion","product","appVersion","title","chapters","stationChapters","colors","materialLicense"]);
  assert.equal(result.title,"Präsentation für Köln");
  assert.equal(JSON.stringify(result).includes("intern"),false);
  assert.equal(JSON.stringify(result).includes("geheim"),false);
});

test("Viewervertrag normalisiert gespeicherte HTML-Entities in sichtbaren Namen",()=>{
  const context={};vm.runInNewContext(`${exportRuntime};this.make=viewerContractData;`,context);
  const result=context.make({meta:{name:"Müller &amp; Söhne"},chapters:["Quick-Tipps &amp; DON'T","Kapitel &#220;"],slides:[]},"0.038.test");
  assert.equal(result.title,"Müller & Söhne");
  assert.equal(result.chapters[0],"Quick-Tipps & DON'T");
  assert.equal(result.chapters[1],"Kapitel Ü");
});

test("Viewerquelle und Runtime enthalten keine Editor- oder Speicherlogik",()=>{
  for(const forbidden of ["edit-toolbar","projpanel","orderpanel","pptxdialog","restorebar"]){
    assert.doesNotMatch(viewerSource,new RegExp(`<[^>]+id=["']${forbidden}["']`));
  }
  assert.doesNotMatch(viewerRuntime,/indexedDB|localStorage|showSaveFilePicker|FileReader|contenteditable|editMode|autosave|projpanel|pj-/i);
  assert.match(viewerRuntime,/data-viewer-ready/);
  assert.match(viewerRuntime,/cameraFitTarget/);
  assert.match(viewerRuntime,/cameraFitOptions/);
  assert.match(viewerRuntime,/createCameraFollowupController/);
  assert.match(viewerRuntime,/cameraFollowup\.isArmed/);
  assert.match(viewerRuntime,/ResizeObserver/);
  assert.match(cameraRuntime,/cameraFrameFullyVisible/);
  assert.match(cameraRuntime,/function cameraFollowupDelays\(\)/);
  assert.match(cameraRuntime,/function createCameraFollowupController\(options\)/);
});

test("Viewer-HUD hält Navigation fest, trennt Lizenzmetadaten und ordnet fünf Aktionen verständlich",()=>{
  const actionStart=viewerSource.indexOf('<div id="hudactions">');
  const actionEnd=viewerSource.indexOf('</div><span id="counter">',actionStart);
  const actions=viewerSource.slice(actionStart,actionEnd);
  const metaStart=viewerSource.indexOf('<div id="hudmeta">');
  const metaEnd=viewerSource.indexOf('</div><div id="navgroup">',metaStart);
  const meta=viewerSource.slice(metaStart,metaEnd);
  assert.ok(actionStart>=0&&actionEnd>actionStart);
  assert.ok(metaStart>=0&&metaEnd>metaStart);
  assert.match(meta,/id="material-license-btn"/);
  assert.doesNotMatch(actions,/id="material-license-btn"/);
  assert.ok(actions.indexOf('id="chapbtn"')<actions.indexOf('id="ovbtn"'));
  assert.ok(actions.indexOf('id="ovbtn"')<actions.indexOf('id="printbtn"'));
  assert.ok(actions.indexOf('id="printbtn"')<actions.indexOf('id="presbtn"'));
  assert.ok(actions.indexOf('id="presbtn"')<actions.indexOf('id="infobtn"'));
  assert.match(actions,/id="infobtn"[^>]*title="Über diese Anwendung"[^>]*aria-label="Über diese Anwendung"[^>]*>Über<\/button>/);
  assert.match(viewerRuntime,/className="gap"/);
  assert.match(viewerRuntime,/shortChapterLabel\(chapterName\)/);
  assert.match(viewerRuntime,/scrollIntoView\(\{behavior:"smooth",block:"nearest",inline:"center"\}\)/);
  assert.match(viewerRuntime,/closest\("\.imgbox"\).*remove\("lazy-box"\)/);
  assert.doesNotMatch(viewerSource,/viewer-tools/);
});

test("Viewerübersicht zeigt Kapitelmarken und wählt Stationen direkt als Kameraziel",()=>{
  assert.match(viewerRuntime,/world\.classList\.toggle\("far",cam\.s<\.2\)/);
  assert.match(viewerRuntime,/station\.addEventListener\("click",event=>\{/);
  assert.match(viewerRuntime,/if\(overview\|\|index!==current\)focus\(index\)/);
  assert.match(viewerSource,/body\.viewer\.overview \.st\{cursor:pointer\}/);
});

test("Viewerdatei wird aus eigenem Template statt aus der Editor-Datei erzeugt",()=>{
  assert.match(appSource,/composeViewerDocument\(VIEWER_TEMPLATE,/);
  const handler=appSource.slice(appSource.indexOf("function exportViewerFile"),appSource.indexOf("/* ---------- Undo/Redo",appSource.indexOf("function exportViewerFile")));
  assert.doesNotMatch(handler,/buildFile\(/);
  assert.match(handler,/viewerSnapshot\(\)/);
  assert.match(handler,/viewerContractData\(/);
  assert.match(handler,/normalizeMaterialLicense\(/);
  assert.match(handler,/openMaterialLicenseDialog/);
  assert.match(appSource,/function viewerSnapshot\(\)[\s\S]*?normalizeViewerVisibility\(clone\)/);
});

test("Materiallizenz wird normalisiert und strikt von der Anwendungslizenz getrennt",()=>{
  const context={};vm.runInNewContext(`${exportRuntime};this.normalize=normalizeMaterialLicense;this.statement=materialLicenseStatement;`,context);
  const normalized=context.normalize({
    title:"<b>Meine Präsentation</b>",author:"Müller &amp; Söhne",year:"2026",
    licenseCode:"cc-by-sa-4.0",customText:"wird ignoriert",exceptions:true
  },"Fallback");
  assert.equal(normalized.title,"Meine Präsentation");
  assert.equal(normalized.author,"Müller & Söhne");
  assert.equal(normalized.licenseText,"CC BY-SA 4.0");
  assert.equal(normalized.exceptions,true);
  assert.match(context.statement(normalized),/Ausgenommen anders gekennzeichnete Inhalte/);
  const custom=context.normalize({title:"Werk",author:"Person",year:"2099",licenseCode:"custom",customText:"<i>Alle Rechte vorbehalten</i>"},"");
  assert.equal(custom.licenseText,"Alle Rechte vorbehalten");
  assert.equal(custom.year,"2099");
  assert.match(viewerSource,/id="material-license-panel"/);
  assert.match(viewerSource,/DIESE PRÄSENTATION/);
  assert.match(viewerSource,/__VIEWER_ABOUT__/);
});

test("Viewer entfernt geerbte Virtualisierungszustände defensiv",()=>{
  const makeNode=()=>{
    const classes=new Set(["off"]);
    return {classes,classList:{remove:value=>classes.delete(value)}};
  };
  const nodes=[makeNode(),makeNode(),makeNode()];
  const root={querySelectorAll:selector=>{
    assert.equal(selector,".st.off,.wblob.off");
    return nodes;
  }};
  const context={};vm.runInNewContext(`${visibilityRuntime};this.normalize=normalizeViewerVisibility;`,context);
  assert.equal(context.normalize(root),3);
  assert.equal(nodes.some(node=>node.classes.has("off")),false);
  assert.match(viewerRuntime,/normalizeViewerVisibility\(world\)/);
});

test("Komposition ersetzt Daten, Snapshot, Logo, Infofragment und Produkt-CSS",()=>{
  const context={};vm.runInNewContext(`${exportRuntime};this.compose=composeViewerDocument;`,context);
  const template=viewerSource
    .replace("__VIEWER_VERSION__","Vx")
    .replace("__VIEWER_BUILD__","x")
    .replace("__VIEWER_NETWORK_CORE__","void 0;")
    .replace("__VIEWER_DIALOG_CORE__","void 0;")
    .replace("__VIEWER_CAMERA_CORE__","void 0;")
    .replace("__VIEWER_VISIBILITY_CORE__","void 0;")
    .replace("__VIEWER_RUNTIME__","void 0;");
  const about="<div id='info-backdrop'><section id='infopanel'>Transparent</section></div>";
  const output=context.compose(template,"<div id='world'><section class='st'>Köln</section></div>","<b>Logo</b>",{title:"Für alle"},about,"body{color:red}");
  assert.doesNotMatch(output,/__VIEWER_(?:SNAPSHOT|LOGO|DATA|ABOUT|CSS)__/);
  assert.match(output,/Köln/);assert.match(output,/Für alle/);assert.match(output,/<b>Logo<\/b>/);
  assert.match(output,/Transparent/);assert.match(output,/body\{color:red\}/);
});
