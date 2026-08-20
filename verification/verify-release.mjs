import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";

const start=path.resolve(process.argv[2]||process.cwd());
const bundleAttestation=path.join(start,"release-attestation.json");
const projectAttestation=path.join(start,"quality","release-attestation.json");
let attestationPath,mode;
try{await fs.access(bundleAttestation);attestationPath=bundleAttestation;mode="bundle";}catch{attestationPath=projectAttestation;mode="project";}
const attestation=JSON.parse(await fs.readFile(attestationPath,"utf8"));
const failures=[];
for(const record of attestation.files){
  const relative=mode==="bundle"?record.bundlePath:record.projectPath;
  const absolute=path.join(start,relative);
  try{
    const bytes=await fs.readFile(absolute);
    const hash=createHash("sha256").update(bytes).digest("hex");
    if(bytes.length!==record.bytes)failures.push(`${relative}: Größe ${bytes.length} statt ${record.bytes}`);
    if(hash!==record.sha256)failures.push(`${relative}: SHA-256 stimmt nicht`);
  }catch(error){failures.push(`${relative}: fehlt oder ist nicht lesbar`);}
}
if(attestation.policy.network!=="network-zero-v1")failures.push("Netzwerk-Policy ist nicht network-zero-v1");
if(attestation.manualStatus!=="prepared-awaiting-user")failures.push("Status der menschlichen Sichtabnahme ist unerwartet");
if(failures.length){console.error("VERIFIKATION FEHLGESCHLAGEN\n"+failures.map(item=>"- "+item).join("\n"));process.exit(1);}
console.log(`VERIFIKATION BESTANDEN · ${attestation.version} · ${attestation.files.length} Dateien · Modus ${mode}`);
console.log(`Produkt-SHA-256 ${attestation.productSha256}`);
console.log("Menschliche Sichtabnahme: vorbereitet, noch durch Nutzer:in zu bestätigen.");
