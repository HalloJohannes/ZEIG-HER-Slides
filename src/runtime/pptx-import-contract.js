var PPTX_IMPORT_POLICY=Object.freeze({timeoutMs:45000});
function withImportDeadline(promise,timeoutMs){
  var wait=Math.max(1000,Number(timeoutMs)||PPTX_IMPORT_POLICY.timeoutMs),timer;
  return Promise.race([
    Promise.resolve(promise),
    new Promise(function(resolve,reject){timer=setTimeout(function(){var error=new Error("Der PowerPoint-Import hat das Zeitlimit überschritten und wurde ohne Änderungen beendet.");error.code="PPTX_TIMEOUT";reject(error);},wait);})
  ]).finally(function(){clearTimeout(timer);});
}
function pptxNewProjectCandidate(stations,name,current,schemaVersion){
  if(!Array.isArray(stations)||!stations.length)throw new Error("Die PowerPoint-Datei enthält keine importierbaren Folien.");
  var meta=current&&current.meta?current.meta:{};
  return {
    schemaVersion:schemaVersion,
    meta:{name:String(name||"PowerPoint-Import"),logo:meta.logo||"",logoUrl:meta.logoUrl||"",colors:meta.colors||undefined},
    chapters:[String(name||"PowerPoint-Import")],
    slides:stations
  };
}
function pptxChapterCandidate(project,stations,name){
  if(!project||!Array.isArray(project.chapters)||!Array.isArray(project.slides))throw new Error("Das aktuelle Projekt ist nicht importbereit.");
  if(!Array.isArray(stations)||!stations.length)throw new Error("Die PowerPoint-Datei enthält keine importierbaren Folien.");
  var candidate=JSON.parse(JSON.stringify(project));
  candidate.chapters.push(String(name||"PowerPoint-Import"));
  candidate.slides=candidate.slides.concat(stations);
  return candidate;
}
