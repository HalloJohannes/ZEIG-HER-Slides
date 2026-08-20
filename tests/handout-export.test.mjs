import test from "node:test";
import assert from "node:assert/strict";
import { promises as fs } from "node:fs";
import vm from "node:vm";

const source=await fs.readFile("src/runtime/handout-export.js","utf8");
const context={Error,String,Array,Object};
vm.runInNewContext(`${source}\nglobalThis.compose=composeHandoutDocument;`,context);

test("Handout ist eine eigenständige kompakte Nachlese ohne Editor",()=>{
  const image="data:image/png;base64,AAAA";
  const html=context.compose({
    title:"Änderungen & Überblick",version:"V0.029",chapterCount:2,created:"19.08.2026",
    logo:image,logoUrl:"https://example.org",fontBase64:"d09GMg==",
    stations:[
      {number:"1",chapter:"Einführung",chapterBreak:true,wide:true,html:`<h2>Übersicht</h2><p>Text</p><img src="${image}">`},
      {number:"2",chapter:"Praxis",html:"<p>Weiterer Inhalt</p>"}
    ]
  });
  assert.match(html,/Nachlese · kompakter Handout-Export/);
  assert.match(html,/grid-template-columns:repeat\(2/);
  assert.match(html,/max-height:118px/);
  assert.match(html,/Für Druck und PDF optimiert/);
  assert.match(html,/href="https:\/\/example\.org"/);
  assert.match(html,/Änderungen &amp; Überblick/);
  assert.doesNotMatch(html,/contenteditable|id="editbar"|Browser-Bibliothek/);
});

test("Handout weist ungültige Eingabedaten ab",()=>{
  assert.throws(()=>context.compose({stations:null}),/Handout-Daten fehlen/);
});
