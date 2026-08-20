function designBlockKinds(registry){
  if(!registry||!Array.isArray(registry.components))throw new Error("Designsystem-Registry fehlt oder ist ungültig.");
  var seen={};
  return registry.components.filter(function(component){return !!component.blockKind&&component.status==="canonical";}).map(function(component){
    if(seen[component.blockKind])throw new Error("Doppelter Bausteinvertrag: "+component.blockKind);
    seen[component.blockKind]=true;
    return {k:component.blockKind,l:component.label};
  });
}
function designSystemSummary(registry){
  var tokens=(registry.tokenGroups||[]).reduce(function(total,group){return total+(group.tokens||[]).length;},0);
  var canonical=(registry.tokenGroups||[]).reduce(function(total,group){return total+(group.tokens||[]).filter(function(token){return token.status==="canonical";}).length;},0);
  canonical+=(registry.components||[]).filter(function(component){return component.status==="canonical";}).length;
  return Object.freeze({registryVersion:registry.registryVersion,tokenCount:tokens,componentCount:(registry.components||[]).length,canonicalCount:canonical,blockKinds:designBlockKinds(registry).map(function(kind){return kind.k;})});
}
