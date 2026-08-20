import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";

const root=process.cwd();
const release=JSON.parse(await fs.readFile("quality/release-metadata.json","utf8"));
const sourceDir=path.join(root,"src/deployment");
const targetDir=path.join(root,"outputs",`deployment-${release.build}`);
await fs.rm(targetDir,{recursive:true,force:true});
await fs.mkdir(targetDir,{recursive:true});

let html=await fs.readFile(release.canonicalFile,"utf8");
const manifest='<link rel="manifest" href="./manifest.webmanifest">';
const registration='<script>if("serviceWorker" in navigator&&location.protocol!=="file:"){addEventListener("load",function(){navigator.serviceWorker.register("./sw.js",{scope:"./"}).then(function(){document.documentElement.setAttribute("data-offline-install","registered");}).catch(function(){document.documentElement.setAttribute("data-offline-install","failed");});},{once:true});}else{document.documentElement.setAttribute("data-offline-install","local-file");}</script>';
if(!html.includes("</head>")||!html.includes("</body>"))throw new Error("Deployment-Marker fehlen.");
html=html.replace("</head>",manifest+"\n</head>").replace("</body>",registration+"\n</body>");
await fs.writeFile(path.join(targetDir,"index.html"),html);

for(const name of ["manifest.webmanifest","icon.svg","_headers","README.md"]){await fs.copyFile(path.join(sourceDir,name),path.join(targetDir,name));}
const sw=(await fs.readFile(path.join(sourceDir,"sw.js"),"utf8")).replaceAll("__BUILD__",release.build);
await fs.writeFile(path.join(targetDir,"sw.js"),sw);

const files={};
for(const name of ["index.html","manifest.webmanifest","icon.svg","sw.js","_headers","README.md"]){
  const bytes=await fs.readFile(path.join(targetDir,name));
  files[name]={bytes:bytes.length,sha256:createHash("sha256").update(bytes).digest("hex")};
}
const attestation={
  schemaVersion:1,product:"ZEIG HER Slides",version:release.version,build:release.build,created:"2026-08-19",
  policy:{id:"network-zero-v1",projectDataTransmission:false,cookiesInApplication:false,analytics:false,telemetry:false,externalResources:false,externalFrames:false,externalNavigation:false,connectSrc:"none"},
  storage:{projectData:["IndexedDB des lokalen Browsers","lokale Arbeitsdatei nach Nutzeraktion"],serverProjectStorage:false},
  deliveryBoundary:"Der erste Abruf, Service-Worker-Updates und die statischen App-Shell-Dateien erreichen den gewählten eigenen Host. Dabei können Host oder Proxy übliche Verbindungsmetadaten wie IP-Adresse und Zeitpunkt verarbeiten; Projektinhalte werden von der Anwendung nicht übertragen.",
  files
};
const attestationText=JSON.stringify(attestation,null,2)+"\n";
await fs.writeFile(path.join(targetDir,"privacy-attestation.json"),attestationText);
await fs.writeFile("quality/deployment-attestation.json",attestationText);
console.log(`Deployment gebaut: ${path.relative(root,targetDir)} / ${Object.keys(files).length+1} Dateien.`);
