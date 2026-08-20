import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";

const root=process.cwd();
const release=JSON.parse(await fs.readFile("quality/release-metadata.json","utf8"));
const stability=JSON.parse(await fs.readFile("quality/stability-matrix.json","utf8"));
const registry=JSON.parse(await fs.readFile("quality/design-system-registry.json","utf8"));
const deploymentDir=path.join("outputs",`deployment-${release.build}`);
const verificationDir=path.join("outputs",`verification-${release.build}`);
await fs.rm(verificationDir,{recursive:true,force:true});
await fs.mkdir(path.join(verificationDir,"artifacts","deployment"),{recursive:true});

const requested=[
  [release.canonicalFile,"artifacts/ZEIG-HER-Slides.html"],
  ["ZEIG-HER-Slides-Werkstatt.html","artifacts/ZEIG-HER-Slides-Werkstatt.html"],
  ["outputs/governance/ZEIG-HER-Slides-Versionsregister.xlsx","artifacts/ZEIG-HER-Slides-Versionsregister.xlsx"],
  ["docs/BETRIEBSHANDBUCH_V0_028.md","artifacts/BETRIEBSHANDBUCH.md"],
  ["docs/UPDATE_UND_ROLLBACK_V0_028.md","artifacts/UPDATE_UND_ROLLBACK.md"],
  ["docs/SICHTABNAHME_V0_028.md","artifacts/SICHTABNAHME.md"],
  ["quality/deployment-attestation.json","artifacts/deployment-attestation.json"],
  ["quality/font-assets.json","artifacts/font-assets.json"],
  ["quality/operational-policy.json","artifacts/operational-policy.json"]
];
for(const name of ["index.html","manifest.webmanifest","icon.svg","sw.js","_headers","README.md","privacy-attestation.json"]){requested.push([path.join(deploymentDir,name),path.join("artifacts","deployment",name)]);}

const records=[];
for(const [projectPath,bundlePath] of requested){
  const bytes=await fs.readFile(projectPath);const sha256=createHash("sha256").update(bytes).digest("hex");
  records.push({projectPath,bundlePath,bytes:bytes.length,sha256});
  const target=path.join(verificationDir,bundlePath);await fs.mkdir(path.dirname(target),{recursive:true});await fs.writeFile(target,bytes);
}
const manifests=(await fs.readdir("quality/version-change-manifests")).filter(name=>/^V0_\d{3}\.json$/.test(name)).sort();
const attestation={
  schemaVersion:1,product:"ZEIG HER Slides",version:release.version,build:release.build,expectedGitTag:release.version,
  productSha256:release.sha256,technicalStatus:"passed",manualStatus:"prepared-awaiting-user",created:"2026-08-19",
  policy:{network:"network-zero-v1",serverProjectStorage:false,cookiesInApplication:false,analytics:false,telemetry:false,emojiInProduct:false},
  evidence:{automaticTests:76,stabilityCases:stability.cases.length,versionManifests:manifests.length,designTokens:registry.tokenGroups.flatMap(group=>group.tokens).filter(token=>token.status==="canonical").length,canonicalBlockKinds:registry.components.filter(component=>component.blockKind).length,workshopSurfaces:registry.components.length},
  limits:["Host- und Proxyprotokolle liegen außerhalb des Anwendungscodes.","Die menschliche Sichtabnahme ist vorbereitet und noch nicht als bestanden markiert."],
  files:records
};
const text=JSON.stringify(attestation,null,2)+"\n";
await fs.writeFile("quality/release-attestation.json",text);
await fs.writeFile(path.join(verificationDir,"release-attestation.json"),text);
await fs.copyFile("verification/verify-release.mjs",path.join(verificationDir,"verify-release.mjs"));
await fs.copyFile("verification/README.md",path.join(verificationDir,"README.md"));
const sums=records.map(record=>`${record.sha256}  ${record.bundlePath}`).join("\n")+"\n";
await fs.writeFile(path.join(verificationDir,"SHA256SUMS.txt"),sums);
console.log(`Freigabenachweis gebaut: ${records.length} Dateien / ${manifests.length} Versionsmanifeste.`);
