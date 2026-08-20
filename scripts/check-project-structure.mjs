import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";

const release=JSON.parse(await fs.readFile("quality/release-metadata.json","utf8"));

async function exists(path){
  try{await fs.access(path);return true;}catch{return false;}
}

const requiredDirectories=[
  "audits",
  "docs",
  "src",
  "scripts",
  "tests",
  "quality",
  "verification",
  "versions/aktuell",
  "versions/archiv",
  "versions/aenderungshistorie",
  "zusatzmaterial/referenzen",
  "zusatzmaterial/notizen",
  "outputs/governance"
];
for(const directory of requiredDirectories){
  if(!(await fs.stat(directory)).isDirectory())throw new Error(`Pflichtordner fehlt: ${directory}`);
}

for(const obsolete of ["Versionen","screenshots","praesentation.html","didaktischebildgenerierung.html"]){
  if(await exists(obsolete))throw new Error(`Veralteter Root-Pfad ist noch vorhanden: ${obsolete}`);
}

// Lokale Vor-Governance-Belege und Screenshots sind bewusst nicht Teil des
// öffentlichen Repositorys. Wenn sie in der internen Arbeitskopie vorhanden
// sind, bleiben ihre Vollständigkeitsprüfungen weiterhin strikt.
if(await exists("archive/vor-governance/html-versionen")){
  const legacyFiles=await fs.readdir("archive/vor-governance/html-versionen");
  if(legacyFiles.length!==38)throw new Error(`Vor-Governance-Archiv unvollständig: ${legacyFiles.length}/38`);
}
if(await exists("zusatzmaterial/screenshots/bestand-20260818")){
  const screenshots=await fs.readdir("zusatzmaterial/screenshots/bestand-20260818");
  if(screenshots.length!==11)throw new Error(`Screenshot-Bestand unvollständig: ${screenshots.length}/11`);
}

const versionPattern=/^ZEIG-HER-Slides-V0_\d{3}_\d{8}-codex\.html$/;
const rootVersions=(await fs.readdir(".")).filter(file=>versionPattern.test(file)).sort();
if(rootVersions.length!==1||rootVersions[0]!==release.canonicalFile){
  throw new Error(`Root muss genau die aktuelle versionierte Anwendung enthalten: ${rootVersions.join(", ")||"keine"}`);
}
const currentVersions=(await fs.readdir("versions/aktuell")).filter(file=>versionPattern.test(file)).sort();
if(currentVersions.length!==1||currentVersions[0]!==release.canonicalFile){
  throw new Error(`versions/aktuell muss genau ${release.canonicalFile} enthalten: ${currentVersions.join(", ")||"keine"}`);
}
const archivedVersions=(await fs.readdir("versions/archiv")).filter(file=>versionPattern.test(file));
if(archivedVersions.includes(release.canonicalFile)){
  throw new Error(`Aktuelle Version darf nicht zugleich im Archiv liegen: ${release.canonicalFile}`);
}

async function sha256(file){return createHash("sha256").update(await fs.readFile(file)).digest("hex");}
const workshopFiles=[
  "projekte/workshop-stand-20260818/praesentation.html",
  "projekte/workshop-stand-20260818/didaktischebildgenerierung.html"
];
const presentWorkshopFiles=[];
for(const file of workshopFiles)if(await exists(file))presentWorkshopFiles.push(file);
if(presentWorkshopFiles.length>0&&presentWorkshopFiles.length!==workshopFiles.length){
  throw new Error("Lokaler Workshopstand ist nur teilweise vorhanden.");
}
if(presentWorkshopFiles.length===workshopFiles.length){
  const workshopHash="b73c019830f0f8a752799515da168b79952f9784c0799e221075f069797dc255";
  const workshopSize=12340342;
  for(const file of workshopFiles){
    const stat=await fs.stat(file);
    // macOS kann große Archivquellen als ausgelagerte Platzhalter mit korrekter
    // logischer Größe, aber ohne lokal lesbare Blöcke bereitstellen.
    if(stat.blocks===0){
      if(stat.size!==workshopSize)throw new Error(`Ausgelagerte Workshopquelle besitzt eine unerwartete Größe: ${file}`);
      continue;
    }
    if(await sha256(file)!==workshopHash)throw new Error(`Workshopquelle verändert: ${file}`);
  }
}

const register=await fs.stat("outputs/governance/ZEIG-HER-Slides-Versionsregister.xlsx");
if(register.size<5000)throw new Error("Excel-Versionsregister fehlt oder ist unplausibel klein.");
console.log("Projektstruktur, öffentliche Materialgrenze und Versionsregister bestanden.");
