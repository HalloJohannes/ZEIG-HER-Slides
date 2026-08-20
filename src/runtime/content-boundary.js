/* Eingebettetes Runtime-Modul: zentrale Vertrauensgrenze für Inhalte und Ressourcen. */
var CONTENT_LIMITS=Object.freeze({
  projectChars:180*1024*1024,
  importFileBytes:180*1024*1024,
  pptxFileBytes:80*1024*1024,
  pptxExpandedBytes:300*1024*1024,
  pptxEntryBytes:40*1024*1024,
  pptxEntries:12000,
  imageFileBytes:30*1024*1024,
  imageDataUrlChars:32*1024*1024,
  imageDataTotalChars:150*1024*1024,
  richTextChars:500000,
  urlChars:2048,
  slides:1000,
  blocks:15000
});
var CONTENT_RICH_KEYS={text:1,sub:1,title:1,caption:1,label:1,credit:1,eyebrow:1,subtitle:1,tag:1,body:1,html:1};
var CONTENT_RICH_ARRAY_KEYS={rows:1,items:1,bullets:1,cards:1,cells:1};
var CONTENT_STRUCTURAL_KEYS={kind:1,type:1,variant:1,conn:1,pid:1,savedWith:1,createdAt:1,updatedAt:1,at:1};
var CONTENT_ALLOWED_TAGS={B:1,STRONG:1,I:1,EM:1,U:1,UL:1,OL:1,LI:1,BR:1,A:1,SPAN:1,P:1,DIV:1};
var CONTENT_DROP_TAGS={SCRIPT:1,STYLE:1,IFRAME:1,OBJECT:1,EMBED:1,SVG:1,MATH:1,FORM:1,INPUT:1,BUTTON:1,META:1,LINK:1,BASE:1,TEMPLATE:1,IMG:1,PICTURE:1,VIDEO:1,AUDIO:1,SOURCE:1,TRACK:1};
var CONTENT_ALLOWED_STYLES={display:1,width:1,height:1,"border-radius":1,background:1,color:1,"align-items":1,"justify-content":1,"font-weight":1,"font-size":1,"vertical-align":1,"letter-spacing":1,padding:1,border:1};
function contentBoundaryError(code,message){var error=new Error(message);error.code=code;return error;}
function contentReport(){return {sanitizedHtml:0,blockedLinks:0,blockedEmbeds:0,blockedImages:0,imageCount:0,imageChars:0,blockCount:0};}
function contentChanged(report){return report.sanitizedHtml+report.blockedLinks+report.blockedEmbeds+report.blockedImages;}
function assertImportFile(file,kind){
  if(!file)throw contentBoundaryError("MISSING_FILE","Es wurde keine Datei ausgewählt.");
  var limit=kind==="pptx"?CONTENT_LIMITS.pptxFileBytes:kind==="image"?CONTENT_LIMITS.imageFileBytes:CONTENT_LIMITS.importFileBytes;
  if(typeof file.size==="number"&&file.size>limit)throw contentBoundaryError("FILE_TOO_LARGE","Die Datei überschreitet das zulässige Limit von "+Math.round(limit/1024/1024)+" MB.");
  if(kind==="image"){
    var type=String(file.type||"").toLowerCase();
    var name=String(file.name||"").toLowerCase();
    if(type&&!/^image\/(png|jpeg|webp|gif|svg\+xml)$/.test(type))throw contentBoundaryError("IMAGE_TYPE","Dieser Bildtyp wird nicht unterstützt.");
    if(!type&&!/\.(png|jpe?g|webp|gif|svg)$/.test(name))throw contentBoundaryError("IMAGE_TYPE","Die Datei ist nicht als unterstütztes Bild erkennbar.");
  }
  if(kind==="pptx"&&!/\.pptx$/i.test(String(file.name||"")))throw contentBoundaryError("PPTX_TYPE","Es werden ausschließlich .pptx-Dateien importiert.");
  return true;
}
function normalizedUrl(value,kind){
  var raw=String(value||"").trim();
  if(!raw)return "";
  if(raw.length>CONTENT_LIMITS.urlChars||/[\u0000-\u001f\u007f]/.test(raw))return "";
  if(kind==="link"&&!/^[a-z][a-z0-9+.-]*:/i.test(raw))raw="https://"+raw;
  var parsed;
  try{parsed=new URL(raw);}catch(error){return "";}
  var protocol=parsed.protocol.toLowerCase();
  if(parsed.username||parsed.password)return "";
  if(kind==="link"){
    if(protocol!=="https:"&&protocol!=="http:"&&protocol!=="mailto:")return "";
    return parsed.href;
  }
  if(kind!=="embed"||protocol!=="https:")return "";
  var host=parsed.hostname.toLowerCase().replace(/^www\./,"");
  var video="";
  if(host==="youtu.be")video=parsed.pathname.split("/").filter(Boolean)[0]||"";
  else if(host==="youtube.com"||host==="m.youtube.com")video=parsed.searchParams.get("v")||((parsed.pathname.match(/^\/(?:embed|shorts)\/([A-Za-z0-9_-]{6,})/)||[])[1]||"");
  else if(host==="youtube-nocookie.com")video=((parsed.pathname.match(/^\/embed\/([A-Za-z0-9_-]{6,})/)||[])[1]||"");
  if(video&&/^[A-Za-z0-9_-]{6,}$/.test(video))return "https://www.youtube-nocookie.com/embed/"+video;
  if((host==="h5p.org"||host==="h5p.com")&&/\/(?:h5p\/)?embed\//i.test(parsed.pathname))return parsed.href;
  return "";
}
function safeStyle(value){
  var kept=[];
  String(value||"").split(";").forEach(function(rule){
    var split=rule.indexOf(":");
    if(split<1)return;
    var key=rule.slice(0,split).trim().toLowerCase();
    var val=rule.slice(split+1).trim();
    if(!CONTENT_ALLOWED_STYLES[key]||!val)return;
    if(/url\s*\(|expression\s*\(|@import|behavior\s*:|\\/i.test(val))return;
    if(!/^[#(),.%\/\-\w\s]+$/.test(val))return;
    kept.push(key+":"+val);
  });
  return kept.join(";");
}
function fallbackSanitizeHtml(value){
  return String(value||"")
    .replace(/<!--[\s\S]*?-->/g,"")
    .replace(/<(script|style|iframe|object|embed|svg|math|form|input|button|meta|link|base|template|img|picture|video|audio|source|track)\b[\s\S]*?<\/\1\s*>/gi,"")
    .replace(/<(script|style|iframe|object|embed|svg|math|form|input|button|meta|link|base|template|img|picture|video|audio|source|track)\b[^>]*\/?\s*>/gi,"")
    .replace(/\son[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi,"")
    .replace(/\sstyle\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi,function(_,a,b,c){var kept=safeStyle(a||b||c||"");return kept?' style="'+kept+'"':"";})
    .replace(/\s(?:src|srcdoc|formaction|poster|background|action)\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi,"")
    .replace(/\shref\s*=\s*("|')?\s*(?:javascript|data|vbscript)\s*:[^\s>]*\1?/gi,"");
}
function sanitizeRichText(value,report){
  var input=String(value===undefined||value===null?"":value);
  if(input.length>CONTENT_LIMITS.richTextChars)throw contentBoundaryError("TEXT_TOO_LARGE","Ein Textfeld überschreitet das zulässige Größenlimit.");
  var output;
  if(typeof document==="undefined"||!document.createElement){output=fallbackSanitizeHtml(input);}
  else{
    var template=document.createElement("template");
    template.innerHTML=input;
    /* Attribute müssen vor dem Entfernen zwischengespeichert werden. */
    var cleanWithAttributes=function(node){
      [].slice.call(node.childNodes||[]).forEach(function(child){
        if(child.nodeType===8){child.remove();return;}
        if(child.nodeType!==1)return;
        var tag=child.tagName.toUpperCase();
        if(CONTENT_DROP_TAGS[tag]){child.remove();return;}
        if(!CONTENT_ALLOWED_TAGS[tag]){
          cleanWithAttributes(child);
          while(child.firstChild)child.parentNode.insertBefore(child.firstChild,child);
          child.remove();return;
        }
        var href=tag==="A"?child.getAttribute("href"):"";
        var style=tag==="SPAN"?child.getAttribute("style"):"";
        [].slice.call(child.attributes||[]).forEach(function(attribute){child.removeAttribute(attribute.name);});
        if(tag==="A"){
          var safeHref=normalizedUrl(href,"link");
          if(safeHref){child.setAttribute("href",safeHref);child.setAttribute("target","_blank");child.setAttribute("rel","noopener noreferrer");}
          else if(href&&report)report.blockedLinks++;
        }
        if(tag==="SPAN"){
          var keptStyle=safeStyle(style);
          if(keptStyle)child.setAttribute("style",keptStyle);
        }
        cleanWithAttributes(child);
      });
    };
    cleanWithAttributes(template.content);
    output=template.innerHTML;
  }
  if(output!==input&&report)report.sanitizedHtml++;
  return output;
}
function plainText(value,max){
  var input=String(value===undefined||value===null?"":value);
  if(input.length>(max||1000))input=input.slice(0,max||1000);
  input=input.replace(/<\s*(script|style|iframe|object|embed|svg|math|template)\b[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi,"");
  if(typeof document!=="undefined"&&document.createElement){var t=document.createElement("template");t.innerHTML=input;return (t.content.textContent||"").trim();}
  return input.replace(/<[^>]*>/g,"").trim();
}
function decodeBase64Text(value){
  try{
    var raw=typeof atob==="function"?atob(value):"";
    try{return decodeURIComponent(Array.prototype.map.call(raw,function(c){return "%"+("00"+c.charCodeAt(0).toString(16)).slice(-2);}).join(""));}
    catch(error){return raw;}
  }catch(error){return "";}
}
function safeImageDataUrl(value){
  var src=String(value||"");
  if(!src)return true;
  if(src.length>CONTENT_LIMITS.imageDataUrlChars)return false;
  var match=src.match(/^data:image\/(png|jpeg|webp|gif|svg\+xml);base64,([A-Za-z0-9+/=\r\n]+)$/i);
  if(!match)return false;
  if(match[1].toLowerCase()==="svg+xml"){
    var svg=decodeBase64Text(match[2]);
    if(!svg||/<\s*(script|style|iframe|object|embed|foreignObject)\b/i.test(svg)||/\son[a-z]+\s*=/i.test(svg)||/\sstyle\s*=\s*["'][^"']*url\s*\(/i.test(svg)||/(?:href|src)\s*=\s*["']?\s*(?!#)/i.test(svg))return false;
  }
  return true;
}
function enforceProjectContentBoundary(data){
  var report=contentReport();
  var serialized;
  try{serialized=JSON.stringify(data);}catch(error){throw contentBoundaryError("NOT_SERIALIZABLE","Die Projektdaten sind nicht serialisierbar.");}
  if(serialized.length>CONTENT_LIMITS.projectChars)throw contentBoundaryError("PROJECT_TOO_LARGE","Das Projekt überschreitet das technische Größenlimit.");
  if(data.slides&&data.slides.length>CONTENT_LIMITS.slides)throw contentBoundaryError("TOO_MANY_SLIDES","Das Projekt enthält zu viele Stationen.");
  if(Array.isArray(data.chapters))data.chapters=data.chapters.map(function(value,index){return plainText(value,300)||("Kapitel "+(index+1));});
  if(data.meta&&typeof data.meta==="object"){
    if(data.meta.name!==undefined)data.meta.name=plainText(data.meta.name,300)||"Unbenannt";
    if(data.meta.materialLicense&&typeof data.meta.materialLicense==="object"){
      var material=data.meta.materialLicense;
      var allowedMaterialLicenses={"cc0-1.0":1,"cc-by-4.0":1,"cc-by-sa-4.0":1,"cc-by-nc-4.0":1,"cc-by-nc-sa-4.0":1,"cc-by-nd-4.0":1,"cc-by-nc-nd-4.0":1,"custom":1};
      data.meta.materialLicense={
        title:plainText(material.title,300),
        author:plainText(material.author,300),
        year:/^(?:19|20)\d{2}$/.test(String(material.year||""))?String(material.year):"",
        licenseCode:allowedMaterialLicenses[material.licenseCode]?material.licenseCode:"",
        customText:plainText(material.customText,500),
        exceptions:material.exceptions===true
      };
    }
    if(data.meta.logoUrl!==undefined){
      var safeLogoUrl=normalizedUrl(data.meta.logoUrl,"link");
      if(data.meta.logoUrl&&!safeLogoUrl)report.blockedLinks++;
      data.meta.logoUrl=safeLogoUrl;
    }
    if(data.meta.logo){
      report.imageCount++;report.imageChars+=String(data.meta.logo).length;
      if(!safeImageDataUrl(data.meta.logo)){data.meta.logo="";report.blockedImages++;}
    }
  }
  var walk=function(value,key,parent,path,richArray){
    if(typeof value==="string"){
      if(key==="src"){
        report.imageCount++;report.imageChars+=value.length;
        if(!safeImageDataUrl(value)){report.blockedImages++;return "";}
        return value;
      }
      if(key==="url"){
        if(parent&&parent.kind==="embed"){
          var embed=normalizedUrl(value,"embed");
          if(value&&!embed)report.blockedEmbeds++;
          return embed;
        }
        var link=normalizedUrl(value,"link");
        if(value&&!link)report.blockedLinks++;
        return link;
      }
      if(CONTENT_STRUCTURAL_KEYS[key])return value.length>CONTENT_LIMITS.richTextChars?value.slice(0,CONTENT_LIMITS.richTextChars):value;
      return sanitizeRichText(value,report);
    }
    if(Array.isArray(value)){
      var nextRich=richArray||!!CONTENT_RICH_ARRAY_KEYS[key];
      for(var i=0;i<value.length;i++)value[i]=walk(value[i],key,value,path+"["+i+"]",nextRich);
      return value;
    }
    if(value&&typeof value==="object"){
      if(value.kind){report.blockCount++;if(report.blockCount>CONTENT_LIMITS.blocks)throw contentBoundaryError("TOO_MANY_BLOCKS","Das Projekt enthält zu viele Bausteine.");}
      Object.keys(value).forEach(function(childKey){
        if(value===data.meta&&(childKey==="logo"||childKey==="logoUrl"||childKey==="materialLicense"))return;
        value[childKey]=walk(value[childKey],childKey,value,path+"."+childKey,false);
      });
    }
    return value;
  };
  walk(data,"project",null,"project",false);
  if(data.meta&&typeof data.meta==="object"&&!String(data.meta.name||"").trim())data.meta.name="Unbenannt";
  if(Array.isArray(data.chapters))data.chapters=data.chapters.map(function(value,index){return String(value||"").trim()||("Kapitel "+(index+1));});
  if(report.imageChars>CONTENT_LIMITS.imageDataTotalChars)throw contentBoundaryError("IMAGES_TOO_LARGE","Die eingebetteten Bilder überschreiten zusammen das technische Größenlimit.");
  return report;
}
