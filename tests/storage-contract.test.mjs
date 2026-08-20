import assert from "node:assert/strict";
import { promises as fs } from "node:fs";
import test from "node:test";

const source=await fs.readFile("src/app.html","utf8");

test("Datei-Handles sind an die aktive Projekt-ID gebunden",()=>{
  assert.match(source,/var fsHandle=null,fsHandleProjectId=null/);
  assert.match(source,/if\(fsHandleProjectId!==targetProjectId\)\{fsHandle=null;fsHandleProjectId=null;\}/);
  assert.match(source,/idbSet\("fsh:"\+targetProjectId,fsHandle\)/);
});

test("Projektwechsel werden bei fehlgeschlagener Bibliothekssicherung blockiert",()=>{
  assert.match(source,/storageWriteGate\(ok,"Projektwechsel"\)/);
  assert.match(source,/storageWriteGate\(ok,"Neues Projekt"\)/);
  assert.match(source,/storageWriteGate\(ok,"JSON-Import"\)/);
  assert.match(source,/storageWriteGate\(ok,"Dateiimport"\)/);
  assert.match(source,/storageWriteGate\(ok,"PowerPoint-Import"\)/);
});

test("ein Download wird nicht als bestätigtes Dateispeichern behandelt",()=>{
  const start=source.indexOf("var downloadOnly=function(message)");
  const end=source.indexOf("if(fsSupported())",start);
  const block=source.slice(start,end);
  assert.ok(start>0&&end>start);
  assert.match(block,/Download angestoßen/);
  assert.doesNotMatch(block,/dirty=false/);
  assert.doesNotMatch(block,/idbDel\("draft:/);
});

test("alle Speicherarten besitzen sichtbare, getrennte Statusfelder",()=>{
  for(const id of ["pj-state-draft","pj-state-library","pj-state-file","pj-state-export","pj-state-backup","pj-state-capacity"]){
    assert.match(source,new RegExp(`id="${id}"`));
  }
});

test("Sicherungspunkte, Kapazitaetsanzeige und datensparsame Diagnose sind bedienbar",()=>{
  assert.match(source,/id="pj-backup"/);
  assert.match(source,/id="pj-restore-backup"/);
  assert.match(source,/id="pj-diagnostics"/);
  assert.match(source,/privacyDiagnosticPayload/);
  assert.match(source,/ohne Projekte, Folientexte, Bilder oder Projekt-IDs/);
});

test("PowerPoint-Import bereitet einen Kandidaten vor der ersten Mutation vor",()=>{
  const newStart=source.indexOf('document.getElementById("pptx-newproj").onclick');
  const chapterStart=source.indexOf('document.getElementById("pptx-chapter").onclick');
  const newBlock=source.slice(newStart,chapterStart);
  const chapterEnd=source.indexOf('/* Bereits gespeicherte Projekt-Dateien',chapterStart);
  const chapterBlock=source.slice(chapterStart,chapterEnd);
  assert.ok(newStart>0&&chapterStart>newStart&&chapterEnd>chapterStart);
  assert.ok(newBlock.indexOf("prepareProjectData(candidate)")<newBlock.indexOf("storeCurrent(function"));
  assert.ok(chapterBlock.indexOf("prepareProjectData(candidate)")<chapterBlock.indexOf("storeCurrent(function"));
});
