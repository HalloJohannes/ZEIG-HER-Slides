/* Eingebettetes Runtime-Modul: stabile Projektidentität und Zeitstempel. */
function projectIsoNow(now){
  var value=now===undefined?Date.now():now;
  return new Date(value).toISOString();
}
function validProjectId(value){
  return typeof value==="string"&&/^[a-z0-9][a-z0-9._-]{2,127}$/i.test(value);
}
function createProjectId(){
  if(typeof crypto!=="undefined"&&typeof crypto.randomUUID==="function"){
    return "p-"+crypto.randomUUID().toLowerCase();
  }
  return "p-"+Date.now().toString(36)+"-"+Math.random().toString(36).slice(2,14);
}
function ensureProjectIdentity(data,now){
  if(!data||typeof data!=="object")throw new TypeError("Projektdaten müssen ein Objekt sein.");
  if(!data.meta||typeof data.meta!=="object"||Array.isArray(data.meta))data.meta={};
  var stamp=projectIsoNow(now);
  if(!validProjectId(data.meta.pid))data.meta.pid=createProjectId();
  if(typeof data.meta.createdAt!=="string"||!Number.isFinite(Date.parse(data.meta.createdAt)))data.meta.createdAt=stamp;
  if(typeof data.meta.updatedAt!=="string"||!Number.isFinite(Date.parse(data.meta.updatedAt)))data.meta.updatedAt=data.meta.createdAt;
  return data.meta.pid;
}
function touchProject(data,now){
  var id=ensureProjectIdentity(data,now);
  data.meta.updatedAt=projectIsoNow(now);
  return id;
}
function projectStorageKey(data){
  return "proj:"+ensureProjectIdentity(data);
}
