/* Eingebettetes Runtime-Modul: validierte Projektgrenze und Migration. */
var PROJECT_SCHEMA_VERSION=3;
var PROJECT_SLIDE_TYPES={title:1,chapter:1,bullets:1,cards:1,compare:1,gallery:1,rows:1,table:1,dont:1,tool:1,end:1,custom:1};
var PROJECT_BLOCK_KINDS={kicker:1,heading:1,chap:1,text:1,note:1,prompt:1,image:1,box:1,table:1,embed:1,cols:1,reveal:1,space:1,line:1};
function projectSchemaError(code,message){var error=new Error(message);error.code=code;return error;}
function validateBlockArray(blocks,path){
  if(!Array.isArray(blocks))throw projectSchemaError("INVALID_BLOCKS",path+" muss eine Liste sein.");
  blocks.forEach(function(block,index){
    var here=path+"["+index+"]";
    if(!block||typeof block!=="object"||!PROJECT_BLOCK_KINDS[block.kind])throw projectSchemaError("INVALID_BLOCK",here+" enthält einen unbekannten Baustein.");
    if(block.kind==="cols"){
      if(!Array.isArray(block.cols))throw projectSchemaError("INVALID_COLUMNS",here+" enthält keine gültigen Spalten.");
      block.cols.forEach(function(column,columnIndex){validateBlockArray(column,here+".cols["+columnIndex+"]");});
    }
    if(block.kind==="reveal")validateBlockArray(block.blocks||[],here+".blocks");
  });
}
function projectImageSource(image){
  return image&&typeof image==="object"&&typeof image.src==="string"&&/^data:image\//i.test(image.src)?image.src:"";
}
function collectBlockImageSources(blocks,target){
  (blocks||[]).forEach(function(block){
    if(!block||typeof block!=="object")return;
    var source=block.kind==="image"?projectImageSource(block.img):"";
    if(source)target[source]=1;
    if(block.kind==="cols")(block.cols||[]).forEach(function(column){collectBlockImageSources(column,target);});
    if(block.kind==="reveal")collectBlockImageSources(block.blocks||[],target);
  });
}
function legacySlideImages(slide){
  var images=[];
  if(projectImageSource(slide.img))images.push(slide.img);
  (slide.imgs||[]).forEach(function(image){if(projectImageSource(image))images.push(image);});
  (slide.rows||[]).forEach(function(row){(row&&row.imgs||[]).forEach(function(image){if(projectImageSource(image))images.push(image);});});
  return images;
}
function removeLegacySlideImages(slide){
  delete slide.img;delete slide.imgs;
  (slide.rows||[]).forEach(function(row){if(row&&typeof row==="object")delete row.imgs;});
}
function recoverOrphanedCustomImages(data,now){
  var recovered=0,stations=[];
  data.slides.forEach(function(slide,index){
    if(slide.type!=="custom")return;
    if(!Array.isArray(slide.blocks))slide.blocks=[];
    var rendered={};collectBlockImageSources(slide.blocks||[],rendered);collectBlockImageSources(slide.extra||[],rendered);
    var additions=[];
    legacySlideImages(slide).forEach(function(image){
      var source=projectImageSource(image);
      if(!source||rendered[source])return;
      rendered[source]=1;additions.push({kind:"image",img:image});recovered++;
    });
    for(var offset=0;offset<additions.length;offset+=4){
      var group=additions.slice(offset,offset+4);
      if(group.length===1)slide.blocks.push(group[0]);
      else slide.blocks.push({kind:"cols",n:group.length,m:1,cols:group.map(function(block){return [block];})});
    }
    if(additions.length)stations.push(index+1);
    removeLegacySlideImages(slide);
  });
  if(recovered){
    if(!Array.isArray(data.meta.repairs))data.meta.repairs=[];
    data.meta.repairs.push({code:"RECOVER_ORPHANED_IMAGES",count:recovered,stations:stations,at:projectIsoNow(now)});
  }
  return {code:"RECOVER_ORPHANED_IMAGES",count:recovered,stations:stations};
}
function prepareProjectData(input,now){
  if(!input||typeof input!=="object"||Array.isArray(input))throw projectSchemaError("INVALID_ROOT","Die Projektwurzel ist ungültig.");
  var data;
  try{data=JSON.parse(JSON.stringify(input));}catch(error){throw projectSchemaError("NOT_SERIALIZABLE","Die Projektdaten sind nicht serialisierbar.");}
  var from=Number.isInteger(data.schemaVersion)?data.schemaVersion:0;
  if(from<0)throw projectSchemaError("INVALID_SCHEMA","Die Schemakennung ist ungültig.");
  if(from>PROJECT_SCHEMA_VERSION)throw projectSchemaError("FUTURE_SCHEMA","Diese Datei stammt aus einer neueren, nicht unterstützten Projektversion.");
  if(!Array.isArray(data.chapters)||!data.chapters.length)throw projectSchemaError("INVALID_CHAPTERS","Das Projekt enthält keine gültigen Kapitel.");
  data.chapters=data.chapters.map(function(name,index){return typeof name==="string"&&name.trim()?name:"Kapitel "+(index+1);});
  if(!Array.isArray(data.slides)||!data.slides.length)throw projectSchemaError("INVALID_SLIDES","Das Projekt enthält keine gültigen Stationen.");
  data.slides.forEach(function(slide,index){
    if(!slide||typeof slide!=="object"||!PROJECT_SLIDE_TYPES[slide.type])throw projectSchemaError("INVALID_SLIDE","Station "+(index+1)+" besitzt einen unbekannten Typ.");
    if(!Number.isInteger(slide.c)||slide.c<0||slide.c>=data.chapters.length)throw projectSchemaError("INVALID_CHAPTER_REFERENCE","Station "+(index+1)+" verweist auf ein unbekanntes Kapitel.");
    if(slide.type==="custom")validateBlockArray(slide.blocks||[],"slides["+index+"].blocks");
    if(slide.extra!==undefined)validateBlockArray(slide.extra,"slides["+index+"].extra");
  });
  var repairReport=recoverOrphanedCustomImages(data,now);
  data.slides.forEach(function(slide,index){
    if(slide.type==="custom")validateBlockArray(slide.blocks||[],"slides["+index+"].blocks");
  });
  var boundaryReport=enforceProjectContentBoundary(data);
  ensureProjectIdentity(data,now);
  if(from<PROJECT_SCHEMA_VERSION){
    if(!Array.isArray(data.meta.migrations))data.meta.migrations=[];
    data.meta.migrations.push({from:from,to:PROJECT_SCHEMA_VERSION,at:projectIsoNow(now)});
  }
  data.schemaVersion=PROJECT_SCHEMA_VERSION;
  return {data:data,migrated:from<PROJECT_SCHEMA_VERSION,fromVersion:from,toVersion:PROJECT_SCHEMA_VERSION,contentReport:boundaryReport,repairReport:repairReport};
}
