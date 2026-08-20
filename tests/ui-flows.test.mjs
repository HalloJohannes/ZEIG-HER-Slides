import assert from "node:assert/strict";
import { promises as fs } from "node:fs";
import test from "node:test";

const source=await fs.readFile("src/app.html","utf8");

test("Projekte ist der erste Editorbefehl und öffnet einen kanonischen Kasten-Dialog",()=>{
  const bar=source.slice(source.indexOf('<div id="editbar">'),source.indexOf('</div>\n</div>',source.indexOf('<div id="editbar">')));
  assert.ok(bar.indexOf('id="projbtn"')<bar.indexOf('id="colorbtn"'));
  assert.ok(bar.indexOf('id="colorbtn"')<bar.indexOf('id="savebtn"'));
  assert.ok(bar.indexOf('id="savebtn"')<bar.indexOf('id="undobtn"'));
  assert.match(source,/id="projbackdrop"/);
  assert.match(source,/id="projpanel" class="boxframe project-dialog" role="dialog" aria-modal="true"/);
  assert.match(source,/#projpanel\.show\{display:grid/);
  assert.match(source,/border:var\(--border-box\);border-radius:var\(--radius-box\);box-shadow:var\(--shadow-box\)/);
});

test("Projektfarben sind ein kanonischer Werkzeugdialog neben Projekte",()=>{
  assert.match(source,/id="colorpanel" role="dialog" aria-labelledby="color-title"/);
  assert.match(source,/#colorpanel\{[^}]*border:var\(--border-box\);border-radius:var\(--radius-box\);box-shadow:var\(--shadow-box\)/s);
  assert.match(source,/id="col-petrol"/);
  assert.match(source,/id="col-teal"/);
  assert.match(source,/id="col-mint"/);
  assert.match(source,/id="col-coral"/);
  const panel=source.slice(source.indexOf('<div id="projpanel"'),source.indexOf('<div id="restorebar"'));
  assert.doesNotMatch(panel,/id="col-petrol"/);
});

test("Projektfenster trennt lokale Arbeit und portable Weitergabe",()=>{
  for(const label of ["Programmdatei","Projektdatei","Ansichts-Datei","Handout-Datei"]){
    if(label==="Handout-Datei")continue;
    assert.match(source,new RegExp(label));
  }
  assert.match(source,/Bleibt auf diesem Gerät/);
  assert.match(source,/Dateien zum Weitergeben/);
  assert.ok(source.indexOf("Aktuelles Projekt")<source.indexOf("Browser-Bibliothek"));
  assert.ok(source.indexOf("Browser-Bibliothek")<source.indexOf("Neues Projekt"));
  assert.match(source,/id="pj-html" class="ghostb">Projektdatei importieren/);
  assert.doesNotMatch(source,/Leeres Projekt als Datei|Projektdatei öffnen/);
  assert.match(source,/Browser-Bibliothek reist nie mit/);
  assert.match(source,/Keine dieser Dateien enthält deine übrigen Projekte/);
});

test("Projektfenster reduziert Technikdetails und erklärt das portable Backup",()=>{
  assert.match(source,/<details class="project-details">/);
  assert.match(source,/Speicherstatus und technische Details/);
  assert.match(source,/id="pj-store">Zwischenstand speichern/);
  assert.match(source,/Browserentwurf und Bibliothek sind Websitedaten in diesem Browserprofil/);
  assert.match(source,/Lade deshalb regelmäßig die <b>Projektdatei<\/b> herunter/);
});

test("Neues Projekt und Löschen verwenden bestätigte, fokussierbare Dialoge",()=>{
  assert.match(source,/id="project-delete-dialog" class="project-action-dialog boxframe" role="alertdialog"/);
  assert.match(source,/id="project-delete-confirm"[^>]*>Endgültig löschen/);
  assert.match(source,/requestProjectDeletion\(it\.key,name,data\.meta\.pid,isCur\)/);
  assert.match(source,/id="project-new-dialog" class="project-action-dialog boxframe" role="dialog"/);
  assert.match(source,/id="project-new-name" maxlength="120"/);
  assert.match(source,/function createNamedProject\(name\)/);
  assert.match(source,/sub:"Untertitel – hier direkt bearbeiten\."/);
  assert.match(source,/if\(e\.key!=="Tab"\)return/);
});

test("Die Demo ist kanonisch, wird nachgesät und kann nicht gelöscht werden",()=>{
  assert.match(source,/var DEMO_PROJECT_ID="zeig-her-demo"/);
  assert.match(source,/function canonicalDemoProject\(\)/);
  assert.match(source,/function seedProgramDemo\(done\)/);
  assert.match(source,/if\(pid\(\)===DEMO_PROJECT_ID\)\{[\s\S]*?idbDel\("draft:"\+DEMO_PROJECT_ID\);[\s\S]*?DATA=canonicalDemoProject\(\);/);
  assert.match(source,/Demo · fest/);
  assert.match(source,/if\(!isDemo\)\{[\s\S]*?requestProjectDeletion/);
  assert.match(source,/Die Demo bleibt als feste Referenz in der Bibliothek erhalten/);
});

test("Navigationspunkte scrollen horizontal und halten die aktive Station sichtbar",()=>{
  assert.match(source,/#dots\{[^}]*overflow-x:auto[^}]*scroll-behavior:smooth/s);
  assert.match(source,/#dots button\{[^}]*flex:0 0 9px/s);
  assert.match(source,/function shortChapterLabel\(value,limit\)/);
  assert.match(source,/shortChapterLabel\(chapterName,10\)/);
  assert.match(source,/scrollIntoView\(\{behavior:"smooth",block:"nearest",inline:"center"\}\)/);
  assert.match(source,/#chapbtn\{[^}]*max-width:142px/s);
});

test("Dateikarten tragen ihre echten Download-Aktionen",()=>{
  for(const id of ["pj-program","pj-savefile","pj-viewer","pj-pdf","pj-print"]){
    assert.match(source,new RegExp(`id="${id}"`));
  }
  assert.match(source,/function buildProgramFile\(\)/);
  assert.match(source,/PROGRAM_DEMO_DATA/);
  assert.match(source,/window\.print\(\)/);
  assert.match(source,/print-handout-root/);
  assert.match(source,/window\.addEventListener\("afterprint",cleanup/);
  assert.doesNotMatch(source,/window\.open\([^)]*handout/);
  assert.match(source,/Als PDF sichern/);
});

test("Ansichtsexport fragt die Materialurheberschaft und Lizenz vor dem Download ab",()=>{
  assert.match(source,/id="material-license-dialog" class="project-action-dialog boxframe" role="dialog"/);
  for(const id of ["material-title","material-author","material-year","material-license-select","material-license-custom","material-license-exceptions"]){
    assert.match(source,new RegExp(`id="${id}"`));
  }
  for(const code of ["cc0-1.0","cc-by-4.0","cc-by-sa-4.0","cc-by-nc-4.0","cc-by-nc-sa-4.0","cc-by-nd-4.0","cc-by-nc-nd-4.0","custom"]){
    assert.match(source,new RegExp(`value="${code}"`));
  }
  assert.match(source,/Ausgenommen anders gekennzeichnete Inhalte/);
  assert.match(source,/document\.getElementById\("pj-viewer"\)\.onclick=openMaterialLicenseDialog/);
  assert.match(source,/exportViewerFile\(license\)/);
  assert.match(source,/Bitte gib die Urheberin, den Urheber oder die verantwortliche Stelle an/);
});

test("Logo besitzt ein eigenes Werkzeugmenü samt sicherem Linkziel",()=>{
  assert.match(source,/class="logo-tools" role="toolbar"/);
  assert.match(source,/id="logo-replace"/);
  assert.match(source,/id="logo-link"/);
  assert.match(source,/id="logo-remove"/);
  assert.match(source,/normalizedUrl\(raw,"link"\)/);
});

test("rahmengebundene Ebenenliste zeigt echte Ebenen und erlaubt direkte Auswahl",()=>{
  assert.match(source,/openLayerPanel\(i,root,lyb\)/);
  assert.match(source,/Ein Klick auf freie Rahmenfläche öffnet die Ebenenliste/);
  assert.match(source,/"Ebene "\+\(level>0\?"\+":""\)\+level/);
  assert.match(source,/setSel\(blockPath\)/);
});

test("Ebenenmenü zeigt per Hover und Tastaturfokus eine nicht persistierende Bausteinvorschau",()=>{
  assert.match(source,/body\.edit \.blk\.layer-preview\{outline:2px solid var\(--teal\)/);
  assert.match(source,/button\.addEventListener\("pointerenter",function\(\)\{setLayerPreview\(blockPath\);\}\)/);
  assert.match(source,/button\.addEventListener\("focus",function\(\)\{setLayerPreview\(blockPath\);\}\)/);
  assert.match(source,/button\.addEventListener\("pointerleave",function\(\)\{if\(LAYER_PREVIEW_PATH===blockPath\)setLayerPreview\(null\);\}\)/);
  assert.match(source,/event\.stopPropagation\(\);setLayerPreview\(null\);setSel\(blockPath\)/);
});
