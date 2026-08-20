var NETWORK_POLICY=Object.freeze({
  id:"offline-confirm-v2",
  mode:"offline-first",
  cookies:false,
  analytics:false,
  telemetry:false,
  automaticConnections:false,
  externalNavigation:"explicit-confirmation",
  externalFrames:false
});
var networkBlockCount=0;
function networkSafeExternalTarget(target){
  var raw=String(target||"").trim();
  if(!/^(?:https?:|mailto:)/i.test(raw)||/[\u0000-\u001f\u007f]/.test(raw))return "";
  try{
    if(/^mailto:/i.test(raw))return raw;
    var parsed=new URL(raw,location.href);
    if(!/^https?:$/.test(parsed.protocol)||parsed.username||parsed.password)return "";
    return parsed.href;
  }catch(error){return "";}
}
function networkPolicyAllowsExternal(target,explicit){return !!explicit&&!!networkSafeExternalTarget(target);}
function networkPolicyBlock(kind,target){
  networkBlockCount++;
  if(typeof document!=="undefined"){
    document.documentElement.setAttribute("data-network-policy",NETWORK_POLICY.id);
    document.documentElement.setAttribute("data-network-blocks",String(networkBlockCount));
  }
  if(typeof toast==="function")toast("Externe Verbindung wurde verhindert.",6500);
  return false;
}
function requestExternalNavigation(target){
  var safe=networkSafeExternalTarget(target);
  if(!safe)return networkPolicyBlock("unsafe-navigation",target);
  var confirmed=window.confirm("Du verlässt jetzt die lokale ZEIG HER Slides-Datei.\n\nExterne Adresse:\n"+safe+"\n\nMöchtest du diese Adresse wirklich öffnen?");
  if(!networkPolicyAllowsExternal(safe,confirmed))return false;
  if(/^mailto:/i.test(safe)){location.href=safe;return true;}
  var opened=window.open(safe,"_blank","noopener,noreferrer");
  if(opened)opened.opener=null;
  return !!opened;
}
(function installOfflineNetworkPolicy(){
  if(typeof window==="undefined"||typeof document==="undefined")return;
  document.documentElement.setAttribute("data-network-policy",NETWORK_POLICY.id);
  document.documentElement.setAttribute("data-network-blocks","0");
  document.documentElement.setAttribute("data-network-external-resources","0");
  Object.defineProperty(window,"ZEIG_HER_NETWORK_POLICY",{value:NETWORK_POLICY,writable:false,configurable:false,enumerable:true});
  document.addEventListener("click",function(event){
    var link=event.target&&event.target.closest&&event.target.closest("a[href]");
    if(!link)return;
    var href=String(link.getAttribute("href")||"").trim();
    if(/^(?:https?:|mailto:)/i.test(href)){
      event.preventDefault();event.stopImmediatePropagation();requestExternalNavigation(href);
    }
  },true);
  document.addEventListener("submit",function(event){event.preventDefault();event.stopImmediatePropagation();networkPolicyBlock("form","");},true);
  function attestLoadedResources(){
    try{
      var external=performance.getEntriesByType("resource").filter(function(entry){
        var value=String(entry.name||"");
        if(/^(?:data:|blob:)/i.test(value))return false;
        return new URL(value,location.href).origin!==location.origin;
      });
      document.documentElement.setAttribute("data-network-external-resources",String(external.length));
    }catch(error){document.documentElement.setAttribute("data-network-external-resources","unavailable");}
  }
  addEventListener("load",function(){attestLoadedResources();setTimeout(attestLoadedResources,600);},{once:true});
})();
