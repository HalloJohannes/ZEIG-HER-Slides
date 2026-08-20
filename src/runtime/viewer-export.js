function plainViewerText(value){
  var entities={amp:"&",quot:'"',apos:"'","#39":"'",lt:"<",gt:">"};
  return String(value||"")
    .replace(/<[^>]*>/g,"")
    .replace(/&#(\d+);/g,function(match,number){
      var code=Number(number);return code>=0&&code<=1114111?String.fromCodePoint(code):match;
    })
    .replace(/&#x([0-9a-f]+);/gi,function(match,number){
      var code=parseInt(number,16);return code>=0&&code<=1114111?String.fromCodePoint(code):match;
    })
    .replace(/&(amp|quot|apos|#39|lt|gt);/gi,function(match,name){return entities[name.toLowerCase()]||match;})
    .slice(0,180);
}
var MATERIAL_LICENSE_OPTIONS=Object.freeze({
  "cc0-1.0":"CC0 1.0 Universell",
  "cc-by-4.0":"CC BY 4.0",
  "cc-by-sa-4.0":"CC BY-SA 4.0",
  "cc-by-nc-4.0":"CC BY-NC 4.0",
  "cc-by-nc-sa-4.0":"CC BY-NC-SA 4.0",
  "cc-by-nd-4.0":"CC BY-ND 4.0",
  "cc-by-nc-nd-4.0":"CC BY-NC-ND 4.0",
  "custom":"Eigener Lizenztext"
});
function normalizeMaterialLicense(value,fallbackTitle){
  var input=value&&typeof value==="object"?value:{};
  var code=Object.prototype.hasOwnProperty.call(MATERIAL_LICENSE_OPTIONS,input.licenseCode)?input.licenseCode:"";
  var customText=plainViewerText(input.customText||"");
  return {
    title:plainViewerText(input.title||fallbackTitle||"Präsentation"),
    author:plainViewerText(input.author||""),
    year:/^(?:19|20)\d{2}$/.test(String(input.year||""))?String(input.year):"",
    licenseCode:code,
    licenseText:code==="custom"?customText:(MATERIAL_LICENSE_OPTIONS[code]||""),
    customText:customText,
    exceptions:input.exceptions===true
  };
}
function materialLicenseStatement(value){
  var license=normalizeMaterialLicense(value,value&&value.title);
  var statement="„"+license.title+"“"+(license.year?" ("+license.year+")":"")+(license.author?", Urheber:in: "+license.author:"")+(license.licenseText?". Lizenz: "+license.licenseText+".":".");
  if(license.exceptions)statement+=" Ausgenommen anders gekennzeichnete Inhalte; die Rechteangaben direkt am jeweiligen Material gehen vor.";
  return statement;
}
function viewerContractData(project,appVersion){
  var meta=(project&&project.meta)||{};
  var colors=meta.colors||{};
  var safeColors={};
  ["petrol","teal","mint","coral"].forEach(function(key){if(/^#[0-9a-f]{6}$/i.test(colors[key]||""))safeColors[key]=colors[key];});
  return {
    viewerSchemaVersion:1,
    product:"ZEIG HER Slides Ansicht",
    appVersion:appVersion,
    title:plainViewerText(meta.name||"Präsentation"),
    chapters:(project.chapters||[]).map(plainViewerText),
    stationChapters:(project.slides||[]).map(function(slide){return Math.max(0,Math.floor(Number(slide.c)||0));}),
    colors:safeColors,
    materialLicense:normalizeMaterialLicense(meta.materialLicense,meta.name||"Präsentation")
  };
}
function composeViewerDocument(template,snapshot,logo,contract,about,css){
  var values={"__VIEWER_SNAPSHOT__":snapshot,"__VIEWER_LOGO__":logo,"__VIEWER_DATA__":JSON.stringify(contract).replace(/<\//g,"<\\/"),"__VIEWER_ABOUT__":about,"__VIEWER_CSS__":css};
  var output=template;
  Object.keys(values).forEach(function(marker){
    if(output.split(marker).length-1!==1)throw new Error("Viewer-Marker fehlt oder ist doppelt: "+marker);
    output=output.replace(marker,values[marker]);
  });
  return output;
}
