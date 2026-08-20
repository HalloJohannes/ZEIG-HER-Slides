import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync=promisify(execFile);
const fixtureInventory=JSON.parse(await fs.readFile("quality/real-project-fixtures.json","utf8"));
const missingFixtures=[];
for(const fixture of fixtureInventory.fixtures){try{await fs.access(fixture.path);}catch{missingFixtures.push(fixture.path);}}
const privateFixtureOptions=missingFixtures.length?{skip:"Private große Workshop-Regressionen sind im öffentlichen Checkout nicht enthalten."}:{};
async function fixtureBytes(path){
  const bytes=await fs.readFile(path);
  if(bytes.length)return bytes;
  const {stdout}=await execFileAsync("git",["show",`HEAD:${path}`],{encoding:"buffer",maxBuffer:64*1024*1024});
  return stdout;
}

async function schemaApi(){
  const identity=await fs.readFile("src/runtime/project-identity.js","utf8");
  const content=await fs.readFile("src/runtime/content-boundary.js","utf8");
  const schema=await fs.readFile("src/runtime/project-schema.js","utf8");
  const context={Date,Math,Number,TypeError,Error,URL,atob,decodeURIComponent,crypto:{randomUUID:()=>"123e4567-e89b-12d3-a456-426614174000"}};
  vm.runInNewContext(`${identity}\n${content}\n${schema}\nglobalThis.api={prepareProjectData,PROJECT_SCHEMA_VERSION,contentChanged};`,context);
  return context.api;
}
function deckFromHtml(html){
  const match=html.match(/<script type="application\/json" id="deck-data">([\s\S]*?)<\/script>/);
  if(!match)throw new Error("deck-data fehlt");
  return JSON.parse(match[1]);
}
function dataImageSources(value,target=new Set()){
  if(typeof value==="string"){if(value.startsWith("data:image/"))target.add(value);return target;}
  if(Array.isArray(value)){for(const item of value)dataImageSources(item,target);return target;}
  if(value&&typeof value==="object")for(const item of Object.values(value))dataImageSources(item,target);
  return target;
}
function blockImageSources(blocks,target=new Set()){
  for(const block of blocks||[]){
    if(block?.kind==="image"&&block.img?.src?.startsWith("data:image/"))target.add(block.img.src);
    if(block?.kind==="cols")for(const column of block.cols||[])blockImageSources(column,target);
    if(block?.kind==="reveal")blockImageSources(block.blocks||[],target);
  }
  return target;
}

test("beide realen 24-MB-Referenzen migrieren vollständig und ohne blockierte Ressourcen",privateFixtureOptions,async()=>{
  const api=await schemaApi();
  for(const fixture of fixtureInventory.fixtures){
    const body=await fixtureBytes(fixture.path);
    assert.equal(createHash("sha256").update(body).digest("hex"),fixture.sha256);
    const original=deckFromHtml(body.toString("utf8"));
    const result=api.prepareProjectData(original,Date.parse("2026-08-19T08:00:00.000Z"));
    assert.equal(original.schemaVersion,undefined,"Originalobjekt wurde verändert");
    assert.equal(result.fromVersion,0);
    assert.equal(result.data.schemaVersion,3);
    assert.equal(result.data.slides.length,fixture.slides);
    assert.equal(result.data.meta.pid,"tooltime-bildgenerierung-2026");
    assert.deepEqual([...result.data.chapters],original.chapters);
    assert.equal(result.contentReport.imageCount,80,"Doppelte Altfelder wurden nicht vollständig bereinigt");
    assert.deepEqual(JSON.parse(JSON.stringify(result.repairReport)),{code:"RECOVER_ORPHANED_IMAGES",count:22,stations:[8,11,20,21,22,23,27]});
    const allSources=dataImageSources(result.data),canonicalSources=new Set();
    for(const slide of result.data.slides){
      if(slide.type!=="custom"){dataImageSources(slide,canonicalSources);continue;}
      blockImageSources(slide.blocks,canonicalSources);blockImageSources(slide.extra,canonicalSources);
      assert.equal("img" in slide||"imgs" in slide,false,"Unsichtbares Bild-Altfeld verblieben");
      for(const row of slide.rows||[])assert.equal("imgs" in row,false,"Unsichtbares Zeilen-Bildfeld verblieben");
    }
    if(result.data.meta.logo)canonicalSources.add(result.data.meta.logo);
    assert.equal(allSources.size,80,"Die eindeutigen Bildquellen wurden nicht bytegetreu erhalten");
    assert.deepEqual([...allSources].sort(),[...canonicalSources].sort(),"Mindestens ein Bild ist nach Migration nicht renderbar erreichbar");
    assert.equal(result.contentReport.blockedLinks+result.contentReport.blockedEmbeds+result.contentReport.blockedImages,0,"Reale Referenz enthält unerwartet blockierte Ressourcen");
    assert.ok(result.contentReport.sanitizedHtml<=1,"Reale Referenz erfordert unerwartet viele HTML-Korrekturen");
  }
});

test("zukünftige und strukturell beschädigte Projekte werden mit Fehlercode abgelehnt",async()=>{
  const api=await schemaApi();
  const base={schemaVersion:3,meta:{pid:"valid-project"},chapters:["A"],slides:[{type:"custom",c:0,blocks:[]}]};
  assert.throws(()=>api.prepareProjectData({...base,schemaVersion:99}),error=>error.code==="FUTURE_SCHEMA");
  assert.throws(()=>api.prepareProjectData({...base,slides:[{type:"custom",c:4,blocks:[]}]}),error=>error.code==="INVALID_CHAPTER_REFERENCE");
  assert.throws(()=>api.prepareProjectData({...base,slides:[{type:"custom",c:0,blocks:[{kind:"unbekannt"}]}]}),error=>error.code==="INVALID_BLOCK");
});

test("alle externen Dateneingänge verwenden die validierte Projektgrenze",async()=>{
  const html=await fs.readFile("src/app.html","utf8");
  assert.match(html,/prepareProjectData\(JSON\.parse\(r\.json\)\)/);
  assert.match(html,/target=prepareProjectData\(JSON\.parse\(json\)\)/);
  assert.match(html,/raw=JSON\.parse\(rd\.result\);sourceVersion=importedVersionOf\(raw\);imported=prepareProjectData\(raw\)/);
  assert.match(html,/prepared=prepareProjectData\(obj\)/);
  assert.match(html,/assertImportFile\(f,"project"\)/);
  assert.match(html,/quarantineProjectData\("Browserentwurf"/);
});
