import assert from "node:assert/strict";
import { promises as fs } from "node:fs";
import test from "node:test";
import vm from "node:vm";

const source=await fs.readFile("src/runtime/storage-resilience.js","utf8");
const context={Date,Math,Object,Array,String,Number};
vm.runInNewContext(`${source};this.api={STORAGE_RESILIENCE_POLICY,projectBackupKey,projectBackupItems,backupDecision,backupPruneKeys,storageEstimateStatus,privacyDiagnosticPayload};`,context);
const api=context.api;

function item(projectId,time,signature="sig"){
  return {key:api.projectBackupKey(projectId,time),val:{t:time,signature,json:"{}"}};
}

test("rollierende Sicherungen vermeiden Duplikate und respektieren das Mindestintervall",()=>{
  const now=1_800_000_000_000;
  assert.equal(api.backupDecision([],"p",now,"a",false).reason,"first");
  assert.equal(api.backupDecision([item("p",now-600_000,"a")],"p",now,"a",false).reason,"unchanged");
  assert.equal(api.backupDecision([item("p",now-60_000,"a")],"p",now,"b",false).reason,"interval");
  assert.equal(api.backupDecision([item("p",now-600_000,"a")],"p",now,"b",false).reason,"changed");
  assert.equal(api.backupDecision([item("p",now,"a")],"p",now,"a",true).reason,"manual");
});

test("pro Projekt bleiben hoechstens die fuenf neuesten Sicherungen",()=>{
  const items=Array.from({length:8},(_,index)=>item("p",1000+index,String(index)));
  const sorted=api.projectBackupItems(items,"p");
  assert.equal(sorted[0].val.t,1007);
  assert.equal(api.backupPruneKeys(items,"p").length,3);
});

test("Kapazitaetsstufen unterscheiden ausreichend, Warnung und kritisch",()=>{
  assert.equal(api.storageEstimateStatus({usage:79,quota:100}).level,"ok");
  assert.equal(api.storageEstimateStatus({usage:80,quota:100}).level,"warning");
  assert.equal(api.storageEstimateStatus({usage:95,quota:100}).level,"critical");
});

test("Diagnose enthaelt nur technische Metadaten und keine Projektinhalte",()=>{
  const diagnostic=api.privacyDiagnosticPayload({
    version:"V0.038",build:"0.038.20260819-codex",projectSchema:3,
    projectCount:2,backupCount:4,storage:{usage:1048576,quota:10485760},
    indexedDB:true,storageEstimate:true,directFileSave:false,pptxImport:true,offlinePolicy:true,
    projectName:"GEHEIMER PROJEKTNAME",projectId:"geheime-id",slideText:"INTERNER FOLIENTEXT",image:"data:image/png;base64,GEHEIM"
  });
  const serialized=JSON.stringify(diagnostic);
  for(const secret of ["GEHEIMER PROJEKTNAME","geheime-id","INTERNER FOLIENTEXT","GEHEIM"])assert.doesNotMatch(serialized,new RegExp(secret));
  assert.equal(diagnostic.privacy.networkTransfer,false);
  assert.equal(diagnostic.counts.projects,2);
  assert.equal(diagnostic.storage.percent,10);
  assert.equal(diagnostic.offlinePolicy,true);
});
