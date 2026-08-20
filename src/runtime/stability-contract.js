function stableValue(value){
  if(Array.isArray(value))return value.map(stableValue);
  if(value&&typeof value==="object")return Object.keys(value).sort().reduce(function(result,key){result[key]=stableValue(value[key]);return result;},{});
  return value;
}
function projectRoundtripSignature(project){return JSON.stringify(stableValue(project));}
function storageWriteGate(ok,action){
  var label=String(action||"Vorgang");
  return Object.freeze({allowed:ok===true,action:label,message:ok===true?label+" freigegeben":label+" gestoppt: Der aktuelle Stand konnte nicht in der Browser-Bibliothek gesichert werden."});
}
function recoveryDecision(fileProject,draftRecord,prepare){
  if(!draftRecord||typeof draftRecord.json!=="string")return {source:"file",data:fileProject,quarantine:null};
  try{
    var restored=prepare(JSON.parse(draftRecord.json));
    if(fileProject&&fileProject.meta&&restored.data.meta&&fileProject.meta.pid!==restored.data.meta.pid)throw new Error("Entwurf gehört zu einem anderen Projekt.");
    return {source:"draft",data:restored.data,quarantine:null,migration:restored};
  }catch(error){return {source:"file",data:fileProject,quarantine:{record:draftRecord,reason:error&&error.message?error.message:"Unlesbarer Entwurf"}};}
}
