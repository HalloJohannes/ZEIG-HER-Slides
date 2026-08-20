var STORAGE_RESILIENCE_POLICY=Object.freeze({
  backupPrefix:"backup:",
  maximumBackups:5,
  minimumBackupIntervalMs:5*60*1000,
  warningRatio:0.8,
  criticalRatio:0.95
});
function projectBackupPrefix(projectId){return STORAGE_RESILIENCE_POLICY.backupPrefix+String(projectId)+":";}
function projectBackupKey(projectId,time){return projectBackupPrefix(projectId)+String(Math.round(Number(time)||Date.now()));}
function projectBackupItems(items,projectId){
  var prefix=projectBackupPrefix(projectId);
  return (Array.isArray(items)?items:[]).filter(function(item){
    return item&&String(item.key).indexOf(prefix)===0&&item.val&&typeof item.val.json==="string";
  }).sort(function(a,b){return Number(b.val.t||0)-Number(a.val.t||0);});
}
function backupDecision(items,projectId,time,signature,force){
  var backups=projectBackupItems(items,projectId),latest=backups[0],now=Number(time)||Date.now();
  if(force)return {create:true,reason:"manual",backups:backups};
  if(!latest)return {create:true,reason:"first",backups:backups};
  if(String(latest.val.signature||"")===String(signature||""))return {create:false,reason:"unchanged",backups:backups};
  if(now-Number(latest.val.t||0)<STORAGE_RESILIENCE_POLICY.minimumBackupIntervalMs)return {create:false,reason:"interval",backups:backups};
  return {create:true,reason:"changed",backups:backups};
}
function backupPruneKeys(items,projectId){
  return projectBackupItems(items,projectId).slice(STORAGE_RESILIENCE_POLICY.maximumBackups).map(function(item){return item.key;});
}
function storageEstimateStatus(estimate){
  var usage=Math.max(0,Number(estimate&&estimate.usage)||0),quota=Math.max(0,Number(estimate&&estimate.quota)||0);
  var ratio=quota?Math.min(1,usage/quota):0;
  var level=ratio>=STORAGE_RESILIENCE_POLICY.criticalRatio?"critical":(ratio>=STORAGE_RESILIENCE_POLICY.warningRatio?"warning":"ok");
  return Object.freeze({usage:usage,quota:quota,ratio:ratio,percent:Math.round(ratio*100),level:level});
}
function privacyDiagnosticPayload(input){
  var data=input&&typeof input==="object"?input:{};
  var storage=storageEstimateStatus(data.storage);
  return Object.freeze({
    product:"ZEIG HER Slides",
    version:String(data.version||"unbekannt"),
    build:String(data.build||"unbekannt"),
    projectSchema:Number(data.projectSchema)||0,
    generatedAt:String(data.generatedAt||new Date().toISOString()),
    privacy:Object.freeze({containsProjectNames:false,containsSlideText:false,containsImages:false,containsProjectIds:false,networkTransfer:false}),
    counts:Object.freeze({projects:Math.max(0,Number(data.projectCount)||0),backups:Math.max(0,Number(data.backupCount)||0)}),
    storage:Object.freeze({usageMiB:Math.round(storage.usage/1048576),quotaMiB:Math.round(storage.quota/1048576),percent:storage.percent,level:storage.level}),
    capabilities:Object.freeze({
      indexedDB:data.indexedDB===true,
      storageEstimate:data.storageEstimate===true,
      directFileSave:data.directFileSave===true,
      pptxImport:data.pptxImport===true
    }),
    offlinePolicy:data.offlinePolicy===true
  });
}
