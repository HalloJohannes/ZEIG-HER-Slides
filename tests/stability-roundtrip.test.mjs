import test from "node:test";
import assert from "node:assert/strict";
import { promises as fs } from "node:fs";
import vm from "node:vm";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync=promisify(execFile);
const fixtureInventory=JSON.parse(await fs.readFile("quality/real-project-fixtures.json","utf8"));
const missingFixtures=[];
for(const fixture of fixtureInventory.fixtures){try{await fs.access(fixture.path);}catch{missingFixtures.push(fixture.path);}}
const privateFixtureOptions=missingFixtures.length?{skip:"Private große Workshop-Regressionen sind im öffentlichen Checkout nicht enthalten."}:{};
async function fixtureText(path){
  const text=await fs.readFile(path,"utf8");
  if(text)return text;
  const {stdout}=await execFileAsync("git",["show",`HEAD:${path}`],{encoding:"utf8",maxBuffer:64*1024*1024});
  return stdout;
}

async function api(){
  const identity=await fs.readFile("src/runtime/project-identity.js","utf8"),content=await fs.readFile("src/runtime/content-boundary.js","utf8"),schema=await fs.readFile("src/runtime/project-schema.js","utf8"),stability=await fs.readFile("src/runtime/stability-contract.js","utf8");
  const context={Date,Math,Number,TypeError,Error,URL,atob,decodeURIComponent,crypto:{randomUUID:()=>"123e4567-e89b-12d3-a456-426614174000"}};
  vm.runInNewContext(`${identity}\n${content}\n${schema}\n${stability}\nthis.api={prepareProjectData,projectRoundtripSignature,storageWriteGate,recoveryDecision};`,context);return context.api;
}
function deck(html){const match=html.match(/<script type="application\/json" id="deck-data">([\s\S]*?)<\/script>/);if(!match)throw new Error("deck-data fehlt");return JSON.parse(match[1]);}

test("reale Projekte bleiben über zwei Schema- und JSON-Roundtrips identisch",privateFixtureOptions,async()=>{
  const runtime=await api();
  for(const fixture of fixtureInventory.fixtures){const original=deck(await fixtureText(fixture.path));const first=runtime.prepareProjectData(original,Date.parse("2026-08-19T08:00:00Z")).data;const second=runtime.prepareProjectData(JSON.parse(JSON.stringify(first)),Date.parse("2026-08-19T09:00:00Z")).data;assert.equal(runtime.projectRoundtripSignature(second),runtime.projectRoundtripSignature(first));}
});

test("Projektdatei-Roundtrip erhält den validierten Stand",async()=>{
  const runtime=await api(),release=JSON.parse(await fs.readFile("quality/release-metadata.json","utf8")),html=await fs.readFile(release.canonicalFile,"utf8"),prepared=runtime.prepareProjectData(deck(html),Date.parse("2026-08-19T08:00:00Z")).data;
  const marker='<script type="application/json" id="deck-data">',start=html.indexOf(marker)+marker.length,end=html.indexOf("</script>",start),built=html.slice(0,start)+JSON.stringify(prepared).replaceAll("</","<\\/")+html.slice(end);
  const reopened=runtime.prepareProjectData(deck(built),Date.parse("2026-08-19T09:00:00Z")).data;assert.equal(runtime.projectRoundtripSignature(reopened),runtime.projectRoundtripSignature(prepared));
});

test("Wiederherstellung bevorzugt nur einen lesbaren Entwurf desselben Projekts",async()=>{
  const runtime=await api(),file={schemaVersion:2,meta:{pid:"projekt-a",name:"Datei"},chapters:["A"],slides:[{type:"custom",c:0,blocks:[]}]};
  const good={...file,meta:{...file.meta,name:"Entwurf"}};assert.equal(runtime.recoveryDecision(file,{json:JSON.stringify(good)},runtime.prepareProjectData).source,"draft");
  const broken=runtime.recoveryDecision(file,{json:"{"},runtime.prepareProjectData);assert.equal(broken.source,"file");assert.ok(broken.quarantine);
  const foreign={...file,meta:{...file.meta,pid:"projekt-b"}};const wrong=runtime.recoveryDecision(file,{json:JSON.stringify(foreign)},runtime.prepareProjectData);assert.equal(wrong.source,"file");assert.match(wrong.quarantine.reason,/anderen Projekt/);
});

test("Schreibgate blockiert alle Folgevorgänge nach fehlgeschlagener Sicherung",async()=>{
  const runtime=await api();for(const action of ["Projektwechsel","Neues Projekt","JSON-Import","Dateiimport","PowerPoint-Import"]){assert.equal(runtime.storageWriteGate(false,action).allowed,false);assert.match(runtime.storageWriteGate(false,action).message,/gestoppt/);assert.equal(runtime.storageWriteGate(true,action).allowed,true);}
});

test("Stabilitätsmatrix ist vollständig belegt",async()=>{
  const matrix=JSON.parse(await fs.readFile("quality/stability-matrix.json","utf8"));assert.ok(matrix.cases.length>=20);assert.equal(new Set(matrix.cases.map(item=>item.id)).size,matrix.cases.length);
  for(const item of matrix.cases){assert.equal(item.status,"passed",item.id);assert.ok(item.evidence.length,item.id);for(const file of item.evidence)await fs.access(file);}
});

test("Projektname löst zeitnah eine Entwurfssicherung aus",async()=>{
  const app=await fs.readFile("src/app.html","utf8");
  assert.match(app,/function scheduleDraft\(delay\)/);
  assert.match(app,/getElementById\("pj-name"\)\.addEventListener\("input"[\s\S]*?DATA\.meta\.name=v;[\s\S]*?scheduleDraft\(500\)/);
  assert.match(app,/draftWriteActive=false,draftWritePending=null/);
  assert.match(app,/function flushDraftWrite\(\)/);
});
