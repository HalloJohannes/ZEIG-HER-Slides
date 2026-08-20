import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import vm from "node:vm";

const input="zusatzmaterial/rettung-v4/v4-didaktische-bildgenerierung-3-original.html";
const viewerInput="zusatzmaterial/rettung-v4/v4-didaktische-bildgenerierung-ansicht-original.html";
const reportPath="zusatzmaterial/rettung-v4/recovery-manifest.json";
const release=JSON.parse(await fs.readFile("quality/release-metadata.json","utf8"));
const output=`zusatzmaterial/rettung-v4/v4-didaktische-bildgenerierung-vollstaendig-gerettet-${release.version.replace(".","_")}.html`;
const identity=await fs.readFile("src/runtime/project-identity.js","utf8");
const content=await fs.readFile("src/runtime/content-boundary.js","utf8");
const schema=await fs.readFile("src/runtime/project-schema.js","utf8");
const stability=await fs.readFile("src/runtime/stability-contract.js","utf8");
const context={Date,Math,Number,TypeError,Error,URL,atob,decodeURIComponent,crypto:{randomUUID:()=>"123e4567-e89b-42d3-a456-426614174000"}};
vm.runInNewContext(`${identity}\n${content}\n${schema}\n${stability}\nglobalThis.api={prepareProjectData,projectRoundtripSignature};`,context);

function deck(html){
  const match=html.match(/<script type="application\/json" id="deck-data">([\s\S]*?)<\/script>/);
  if(!match)throw new Error("deck-data fehlt");
  return JSON.parse(match[1]);
}
function sha256(value){return createHash("sha256").update(value).digest("hex");}
function uniqueImages(value,target=new Set()){
  if(typeof value==="string"){if(value.startsWith("data:image/"))target.add(value);return target;}
  if(Array.isArray(value)){for(const item of value)uniqueImages(item,target);return target;}
  if(value&&typeof value==="object")for(const item of Object.values(value))uniqueImages(item,target);
  return target;
}

const [original,viewerOriginal,shell]=await Promise.all([fs.readFile(input,"utf8"),fs.readFile(viewerInput,"utf8"),fs.readFile(release.canonicalFile,"utf8")]);
const prepared=context.api.prepareProjectData(deck(original),Date.parse("2026-08-19T00:00:00.000Z"));
if(prepared.repairReport.count!==22)throw new Error(`Erwartet waren 22 wiederhergestellte Bilder, erhalten: ${prepared.repairReport.count}`);
delete prepared.data.meta.viewer;
prepared.data.meta.savedWith=release.build;
const json=JSON.stringify(prepared.data).replaceAll("</","<\\/");
const marker='<script type="application/json" id="deck-data">';
const start=shell.indexOf(marker)+marker.length,end=shell.indexOf("</script>",start);
if(start<marker.length||end<0)throw new Error("Ziel-Shell besitzt keinen eindeutigen Deck-Marker");
const recovered=shell.slice(0,start)+json+shell.slice(end);
const reopened=context.api.prepareProjectData(deck(recovered),Date.parse("2026-08-19T01:00:00.000Z")).data;
if(context.api.projectRoundtripSignature(reopened)!==context.api.projectRoundtripSignature(prepared.data))throw new Error("Roundtrip-Signatur weicht ab");
const images=uniqueImages(reopened);
if(images.size!==80)throw new Error(`Erwartet waren 79 Präsentationsbilder plus Logo, erhalten: ${images.size}`);
await fs.writeFile(output+".tmp",recovered);await fs.rename(output+".tmp",output);
const report={
  schemaVersion:1,release:release.version,build:release.build,created:"2026-08-19",
  inputs:{project:{path:input,bytes:Buffer.byteLength(original),sha256:sha256(original)},viewer:{path:viewerInput,bytes:Buffer.byteLength(viewerOriginal),sha256:sha256(viewerOriginal)}},
  repair:prepared.repairReport,slides:prepared.data.slides.length,uniqueProjectImages:79,logoImages:1,
  output:{path:output,bytes:Buffer.byteLength(recovered),sha256:sha256(recovered)},
  checks:{schemaRoundtrip:true,allUniqueImagesRetained:true,viewerImageSetMatchesProject:sha256([...uniqueImages(deck(original))].sort().join("\n"))===sha256([...uniqueImages(deck(viewerOriginal))].sort().join("\n"))}
};
await fs.writeFile(reportPath,JSON.stringify(report,null,2)+"\n");
console.log(JSON.stringify(report,null,2));
