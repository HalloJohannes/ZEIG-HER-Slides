import assert from "node:assert/strict";
import { promises as fs } from "node:fs";
import test from "node:test";
import vm from "node:vm";

async function boundaryApi(){
  const source=await fs.readFile("src/runtime/content-boundary.js","utf8");
  const context={URL,atob,decodeURIComponent,Error,Object,Array,String,Math,RegExp};
  vm.runInNewContext(`${source}\nglobalThis.api={CONTENT_LIMITS,normalizedUrl,safeImageDataUrl,sanitizeRichText,enforceProjectContentBoundary,assertImportFile,contentChanged};`,context);
  return context.api;
}

test("Links und Embeds besitzen eine enge Protokoll- und Anbietergrenze",async()=>{
  const api=await boundaryApi();
  assert.equal(api.normalizedUrl("javascript:alert(1)","link"),"");
  assert.equal(api.normalizedUrl("data:text/html,x","link"),"");
  assert.equal(api.normalizedUrl("beispiel.de/pfad","link"),"https://beispiel.de/pfad");
  assert.equal(api.normalizedUrl("https://user:secret@example.org","link"),"");
  assert.equal(api.normalizedUrl("https://youtu.be/AbCdEf12345","embed"),"https://www.youtube-nocookie.com/embed/AbCdEf12345");
  assert.equal(api.normalizedUrl("https://example.org/embed/42","embed"),"");
  assert.equal(api.normalizedUrl("http://h5p.org/h5p/embed/42","embed"),"");
  assert.equal(api.normalizedUrl("https://h5p.org/h5p/embed/42","embed"),"https://h5p.org/h5p/embed/42");
});

test("aktive HTML-Inhalte, externe Bilder und nicht erlaubte Embeds werden blockiert",async()=>{
  const api=await boundaryApi();
  const data={
    schemaVersion:2,
    meta:{name:"<b>Projekt</b>",logo:"https://tracker.example/pixel.png"},
    chapters:["<img src=x onerror=alert(1)>Kapitel"],
    slides:[{type:"custom",c:0,blocks:[
      {kind:"text",text:'<script>alert(1)</script><b onclick="alert(2)">Sicher</b><a href="javascript:alert(3)">Link</a>'},
      {kind:"embed",url:"https://tracker.example/embed/1"},
      {kind:"image",img:{src:"https://tracker.example/image.png",caption:"Bild"}}
    ]},{type:"dont",c:0,wildnote:'<video poster="https://tracker.example/pixel.png">X</video>',name:'<img src=x onerror="alert(4)">'}]
  };
  const report=api.enforceProjectContentBoundary(data);
  assert.equal(data.meta.name,"Projekt");
  assert.equal(data.chapters[0],"Kapitel");
  assert.doesNotMatch(data.slides[0].blocks[0].text,/script|onclick|javascript/i);
  assert.equal(data.slides[0].blocks[1].url,"");
  assert.equal(data.slides[0].blocks[2].img.src,"");
  assert.equal(data.meta.logo,"");
  assert.doesNotMatch(data.slides[1].wildnote,/poster|https:/i);
  assert.doesNotMatch(data.slides[1].name,/img|onerror/i);
  assert.ok(api.contentChanged(report)>0);
});

test("nur eingebettete, erlaubte Bildformate passieren die Ressourcengrenze",async()=>{
  const api=await boundaryApi();
  const png="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAB";
  const unsafeSvg="data:image/svg+xml;base64,"+Buffer.from('<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script></svg>').toString("base64");
  const styleSvg="data:image/svg+xml;base64,"+Buffer.from('<svg xmlns="http://www.w3.org/2000/svg"><style>rect{fill:red}</style><rect width="1" height="1"/></svg>').toString("base64");
  const urlSvg="data:image/svg+xml;base64,"+Buffer.from('<svg xmlns="http://www.w3.org/2000/svg"><rect style="fill:url(https://example.org/x)"/></svg>').toString("base64");
  assert.equal(api.safeImageDataUrl(png),true);
  assert.equal(api.safeImageDataUrl("data:text/html;base64,PHNjcmlwdD4="),false);
  assert.equal(api.safeImageDataUrl("https://example.org/image.png"),false);
  assert.equal(api.safeImageDataUrl(unsafeSvg),false);
  assert.equal(api.safeImageDataUrl(styleSvg),false);
  assert.equal(api.safeImageDataUrl(urlSvg),false);
});

test("Datei- und Projektlimits schlagen mit eindeutigen Fehlercodes fehl",async()=>{
  const api=await boundaryApi();
  assert.throws(()=>api.assertImportFile({name:"bild.exe",type:"application/octet-stream",size:10},"image"),error=>error.code==="IMAGE_TYPE");
  assert.throws(()=>api.assertImportFile({name:"deck.pptx",size:api.CONTENT_LIMITS.pptxFileBytes+1},"pptx"),error=>error.code==="FILE_TOO_LARGE");
  const tooMany={meta:{name:"X"},chapters:["A"],slides:Array.from({length:api.CONTENT_LIMITS.slides+1},()=>({type:"custom",c:0,blocks:[]}))};
  assert.throws(()=>api.enforceProjectContentBoundary(tooMany),error=>error.code==="TOO_MANY_SLIDES");
});

test("Materiallizenz bleibt reiner, begrenzter Projekttext",async()=>{
  const api=await boundaryApi();
  const data={meta:{name:"Projekt",materialLicense:{
    title:"<b>Werk</b>",author:'<img src=x onerror="alert(1)">Autorin',year:"2026",
    licenseCode:"javascript:alert(1)",customText:"<script>alert(2)</script>Eigener Text",exceptions:"ja"
  }},chapters:["A"],slides:[]};
  api.enforceProjectContentBoundary(data);
  assert.equal(data.meta.materialLicense.title,"Werk");
  assert.equal(data.meta.materialLicense.author,"Autorin");
  assert.equal(data.meta.materialLicense.year,"2026");
  assert.equal(data.meta.materialLicense.licenseCode,"");
  assert.equal(data.meta.materialLicense.customText,"Eigener Text");
  assert.equal(data.meta.materialLicense.exceptions,false);
});

test("frühere Embed-URLs bleiben als bestätigungspflichtige Links erhalten",async()=>{
  const html=await fs.readFile("src/app.html","utf8");
  assert.match(html,/Früherer Embed-Baustein/);
  assert.match(html,/requestExternalNavigation\(safeEmbed/);
  assert.doesNotMatch(html,/<iframe/);
  assert.match(html,/frame-src 'none'/);
  assert.match(html,/assertImportFile\(f,"pptx"\)/);
  assert.match(html,/PPTX_EXPANDED_SIZE/);
});
