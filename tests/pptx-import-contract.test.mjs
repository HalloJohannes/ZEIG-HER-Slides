import assert from "node:assert/strict";
import { promises as fs } from "node:fs";
import test from "node:test";
import vm from "node:vm";

const source=await fs.readFile("src/runtime/pptx-import-contract.js","utf8");
const context={Promise,JSON,Object,Array,String,Number,Error,setTimeout,clearTimeout};
vm.runInNewContext(`${source};this.api={PPTX_IMPORT_POLICY,withImportDeadline,pptxNewProjectCandidate,pptxChapterCandidate};`,context);
const api=context.api;

test("Kapitelimport mutiert das offene Projekt vor der Freigabe nicht",()=>{
  const original={schemaVersion:3,meta:{name:"Original"},chapters:["A"],slides:[{type:"custom",c:0,blocks:[]}]};
  const before=JSON.stringify(original);
  const candidate=api.pptxChapterCandidate(original,[{type:"custom",c:1,blocks:[{kind:"text",text:"Neu"}]}],"Import");
  assert.equal(JSON.stringify(original),before);
  assert.equal(candidate.chapters.length,2);
  assert.equal(candidate.slides.length,2);
});

test("leere PowerPoint-Importe werden vor einer Projektmutation abgelehnt",()=>{
  assert.throws(()=>api.pptxNewProjectCandidate([],"Leer",{},3),/keine importierbaren Folien/);
  assert.throws(()=>api.pptxChapterCandidate({chapters:[],slides:[]},[],"Leer"),/keine importierbaren Folien/);
});

test("Zeitlimit beendet einen haengenden Import mit stabilem Fehlercode",async()=>{
  const fastContext={Promise,JSON,Object,Array,String,Number,Error,clearTimeout,setTimeout:(callback)=>{queueMicrotask(callback);return 1;}};
  vm.runInNewContext(`${source};this.deadline=withImportDeadline;`,fastContext);
  await assert.rejects(fastContext.deadline(new Promise(()=>{}),1000),error=>error&&error.code==="PPTX_TIMEOUT");
});
