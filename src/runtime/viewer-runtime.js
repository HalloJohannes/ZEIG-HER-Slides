(()=>{"use strict";
const data=JSON.parse(document.getElementById("viewer-data").textContent);
const world=document.getElementById("world"),viewport=document.getElementById("viewport");
installAboutPanel();
const materialLicense=data.materialLicense||{};
const materialLicenseBackdrop=document.getElementById("material-license-backdrop");
const materialLicensePanel=document.getElementById("material-license-panel");
const materialLicenseButton=document.getElementById("material-license-btn");
let materialLicenseReturnFocus=null;
const setMaterialLicenseValue=(id,value)=>{const node=document.getElementById(id);if(node)node.textContent=String(value||"Nicht angegeben");};
setMaterialLicenseValue("material-license-title-value",materialLicense.title);
setMaterialLicenseValue("material-license-author-value",materialLicense.author);
setMaterialLicenseValue("material-license-year-value",materialLicense.year);
setMaterialLicenseValue("material-license-value",materialLicense.licenseText);
const materialExceptionsRow=document.getElementById("material-license-exceptions-row");
if(materialExceptionsRow)materialExceptionsRow.hidden=materialLicense.exceptions!==true;
const shutMaterialLicense=()=>{
  materialLicenseBackdrop.hidden=true;materialLicensePanel.hidden=true;document.body.classList.remove("about-open");
  materialLicenseButton.setAttribute("aria-expanded","false");materialLicenseReturnFocus?.focus?.();materialLicenseReturnFocus=null;
};
if(materialLicenseButton&&materialLicenseBackdrop&&materialLicensePanel){
  materialLicenseButton.setAttribute("aria-haspopup","dialog");materialLicenseButton.setAttribute("aria-controls","material-license-panel");materialLicenseButton.setAttribute("aria-expanded","false");
  materialLicenseButton.addEventListener("click",event=>{
    event.stopPropagation();materialLicenseReturnFocus=document.activeElement;materialLicenseBackdrop.hidden=false;materialLicensePanel.hidden=false;
    document.body.classList.add("about-open");materialLicenseButton.setAttribute("aria-expanded","true");requestAnimationFrame(()=>materialLicensePanel.focus());
  });
  document.getElementById("material-license-close")?.addEventListener("click",shutMaterialLicense);
  materialLicenseBackdrop.addEventListener("click",event=>{if(event.target===materialLicenseBackdrop)shutMaterialLicense();});
}
normalizeViewerVisibility(world);
const stations=Array.from(world.querySelectorAll(".st"));
const cam={x:0,y:0,s:1};
let current=0,overview=false,presenting=false,idleTimer=0,drag=null,dragMoved=false;

const position=station=>({
  x:parseFloat(station.style.left)||0,
  y:parseFloat(station.style.top)||0,
  w:station.offsetWidth||parseFloat(station.style.width)||1400,
  h:station.offsetHeight||800
});
const safeViewport=()=>{
  const hud=document.getElementById("hud");
  const hudHeight=hud?Math.ceil(hud.getBoundingClientRect().height):46;
  return cameraSafeViewport(innerWidth,innerHeight,hudHeight);
};
const fitTarget=station=>cameraFitTarget(position(station),safeViewport(),cameraFitOptions(station?.dataset.chapterTransition==="true",false));
const apply=animate=>{
  world.style.transition=animate?"transform .8s var(--ease)":"none";
  world.style.transform=`translate(${cam.x}px,${cam.y}px) scale(${cam.s})`;
  world.classList.toggle("far",cam.s<.2);
};
const cameraFollowup=createCameraFollowupController({
  currentStation:()=>current,
  isOverview:()=>overview,
  reconcile:index=>{
    const target=fitTarget(stations[index]);
    if(cameraTargetDiffers(target,cam,1.5))Object.assign(cam,target),apply(true);
  }
});
const cancelAutoFit=()=>cameraFollowup.cancel();
const scheduleFitCheck=delay=>cameraFollowup.recheck(delay);
const armAutoFit=()=>cameraFollowup.arm(current);
const hydrate=(station,firstOnly=false)=>{
  const images=Array.from(station?.querySelectorAll("img[data-src]")||[]);
  (firstOnly?images.slice(0,1):images).forEach(image=>{
    const clearPlaceholder=()=>image.closest(".imgbox")?.classList.remove("lazy-box");
    if(!image.dataset.fitBound){
      image.dataset.fitBound="1";
      image.addEventListener("load",()=>{
        clearPlaceholder();
        if(cameraFollowup.isArmed(current)&&image.closest(".st")===stations[current])scheduleFitCheck(40);
      });
      image.addEventListener("error",clearPlaceholder);
    }
    if(!image.getAttribute("src"))image.setAttribute("src",image.dataset.src);
    image.classList.remove("lazy-pending");
    if(image.complete)clearPlaceholder();
  });
};

for(const [key,value] of Object.entries(data.colors||{}))document.documentElement.style.setProperty("--"+key,value);
document.title=(data.title||"Präsentation")+" · Ansicht";
document.getElementById("brandname").textContent=data.title||"Präsentation";

function focus(index,animate=true){
  if(!stations.length)return;
  current=Math.max(0,Math.min(stations.length-1,index));overview=false;
  document.body.classList.remove("overview");
  hydrate(stations[current]);hydrate(stations[current-1]);hydrate(stations[current+1]);
  Object.assign(cam,fitTarget(stations[current]));apply(animate);armAutoFit();sync();
}
function fit(animate=true){
  if(!stations.length)return;
  cancelAutoFit();stations.forEach(station=>hydrate(station,true));
  const ps=stations.map(position),minX=Math.min(...ps.map(p=>p.x)),minY=Math.min(...ps.map(p=>p.y));
  const maxX=Math.max(...ps.map(p=>p.x+p.w)),maxY=Math.max(...ps.map(p=>p.y+p.h));
  Object.assign(cam,cameraFitTarget({x:minX,y:minY,w:maxX-minX,h:maxY-minY},safeViewport(),{padding:24,maxScale:.55}));
  overview=true;document.body.classList.add("overview");apply(animate);sync();
}

const dots=document.getElementById("dots");
let lastRevealedDot=-1;
const shortChapterLabel=(value,limit=10)=>{
  const label=String(value||"Kapitel");
  return label.length>limit?`${label.slice(0,limit)}…`:label;
};
const revealActiveDot=()=>{
  if(lastRevealedDot===current)return;
  lastRevealedDot=current;
  const active=dots.querySelectorAll("button")[current];
  requestAnimationFrame(()=>{try{active?.scrollIntoView({behavior:"smooth",block:"nearest",inline:"center"});}catch(error){}});
};
stations.forEach((station,index)=>{
  if(index>0&&data.stationChapters[index]!==data.stationChapters[index-1]){
    const gap=document.createElement("span");gap.className="gap";gap.setAttribute("aria-hidden","true");dots.append(gap);
  }
  const button=document.createElement("button");button.type="button";button.title=`Station ${index+1}`;
  button.addEventListener("click",()=>focus(index));dots.append(button);
  station.addEventListener("dblclick",()=>focus(index));
  station.addEventListener("click",event=>{
    if(dragMoved||event.target.closest("button,a,.embed-consent,.revealcover"))return;
    if(overview||index!==current)focus(index);
  });
});
function sync(){
  dots.querySelectorAll("button").forEach((button,index)=>button.classList.toggle("on",index===current&&!overview));
  document.getElementById("counter").textContent=stations.length?`${current+1} / ${stations.length}`:"0 / 0";
  document.getElementById("ovbtn").classList.toggle("on",overview);
  const ci=data.stationChapters[current]||0;
  const chapterName=data.chapters[ci]||"Kapitel";
  document.querySelector("#chapbtn .chapter-label").textContent=shortChapterLabel(chapterName);
  const chapterButton=document.getElementById("chapbtn");
  chapterButton.title=chapterName;chapterButton.setAttribute("aria-label",`Kapitelmenü: ${chapterName}`);
  revealActiveDot();
}
document.getElementById("prevA").addEventListener("click",()=>focus(current-1));
document.getElementById("nextA").addEventListener("click",()=>focus(current+1));
document.getElementById("ovbtn").addEventListener("click",()=>overview?focus(current):fit());
const chapmenu=document.getElementById("chapmenu");
data.chapters.forEach((chapter,ci)=>{
  const button=document.createElement("button");button.type="button";button.textContent=chapter||`Kapitel ${ci+1}`;
  button.addEventListener("click",()=>{chapmenu.classList.remove("show");const index=data.stationChapters.indexOf(ci);if(index>=0)focus(index);});
  chapmenu.append(button);
});
document.getElementById("chapbtn").addEventListener("click",()=>chapmenu.classList.toggle("show"));

function idleKick(){
  document.body.classList.remove("idlenav");clearTimeout(idleTimer);
  if(presenting)idleTimer=setTimeout(()=>document.body.classList.add("idlenav"),3200);
}
function present(on){
  presenting=on;document.body.classList.toggle("presenting",on);
  document.getElementById("presbtn").textContent=on?"Vortrag beenden":"Vortrag";
  if(on)idleKick();else{clearTimeout(idleTimer);document.body.classList.remove("idlenav");}
  requestAnimationFrame(()=>focus(current,false));
}
document.getElementById("presbtn").addEventListener("click",()=>present(!presenting));
document.getElementById("present-exit").addEventListener("click",()=>present(false));
["pointermove","pointerdown","keydown"].forEach(name=>addEventListener(name,idleKick,{passive:true}));

world.querySelectorAll(".revealwrap").forEach(node=>{
  node.querySelector(".revealcover")?.addEventListener("click",event=>{event.stopPropagation();node.classList.add("open");});
});
world.querySelectorAll(".imgbox .revealcover").forEach(node=>node.addEventListener("click",event=>{
  event.stopPropagation();node.closest(".imgbox").classList.add("open");
}));
world.querySelectorAll(".embed-consent button[data-embed-url]").forEach(button=>{
  button.disabled=false;button.textContent="Externe Seite bewusst öffnen";
  button.closest(".embed-consent")?.querySelector("b")?.replaceChildren("Früherer Embed-Baustein");
  button.addEventListener("click",event=>{event.stopPropagation();requestExternalNavigation(button.dataset.embedUrl||"");});
});

viewport.addEventListener("pointerdown",event=>{
  if(event.target.closest("button,a,.embed-consent,.revealcover"))return;
  cancelAutoFit();dragMoved=false;drag={x:event.clientX,y:event.clientY,cx:cam.x,cy:cam.y};viewport.setPointerCapture(event.pointerId);
});
viewport.addEventListener("pointermove",event=>{
  if(!drag)return;
  const dx=event.clientX-drag.x,dy=event.clientY-drag.y;
  if(!dragMoved&&Math.hypot(dx,dy)<5)return;
  dragMoved=true;world.style.transition="none";cam.x=drag.cx+dx;cam.y=drag.cy+dy;apply(false);
});
const releaseDrag=()=>{drag=null;setTimeout(()=>dragMoved=false,0);};
viewport.addEventListener("pointerup",releaseDrag);
viewport.addEventListener("pointercancel",releaseDrag);
viewport.addEventListener("wheel",event=>{
  event.preventDefault();cancelAutoFit();
  const beforeX=(event.clientX-cam.x)/cam.s,beforeY=(event.clientY-cam.y)/cam.s;
  cam.s=Math.max(.08,Math.min(2.4,cam.s*Math.exp(-event.deltaY*.0012)));
  cam.x=event.clientX-beforeX*cam.s;cam.y=event.clientY-beforeY*cam.s;
  overview=false;document.body.classList.remove("overview");apply(false);sync();
},{passive:false});

document.getElementById("printbtn").addEventListener("click",()=>{
  const print=document.getElementById("printview");
  print.replaceChildren(...stations.map(station=>{
    const item=document.createElement("section");item.className="p-st";
    const inner=station.querySelector(".inner");if(inner)item.append(inner.cloneNode(true));return item;
  }));
  const legal=document.createElement("footer");legal.className="p-legal";
  const materialLine=`„${materialLicense.title||data.title||"Präsentation"}“${materialLicense.year?` (${materialLicense.year})`:""}${materialLicense.author?`, Urheber:in: ${materialLicense.author}`:""}${materialLicense.licenseText?`. Lizenz: ${materialLicense.licenseText}.`:"."}${materialLicense.exceptions?" Ausgenommen anders gekennzeichnete Inhalte; die Rechteangaben direkt am jeweiligen Material gehen vor.":""}`;
  legal.textContent=`${materialLine} · Software: ZEIG HER Slides ${data.appVersion||""}, MIT License · © 2026 Johannes Koch · Schrift Outfit, SIL Open Font License 1.1`;
  print.append(legal);
  setTimeout(()=>window.print(),80);
});
addEventListener("keydown",event=>{
  if((materialLicenseBackdrop&&!materialLicenseBackdrop.hidden)||!document.getElementById("info-backdrop")?.hidden){
    if(event.key==="Escape"&&materialLicenseBackdrop&&!materialLicenseBackdrop.hidden)shutMaterialLicense();
    return;
  }
  if(event.key==="ArrowRight"||event.key===" "){event.preventDefault();focus(current+1);}
  else if(event.key==="ArrowLeft")focus(current-1);
  else if(event.key.toLowerCase()==="o")overview?focus(current):fit();
  else if(event.key.toLowerCase()==="h")present(!presenting);
  else if(event.key.toLowerCase()==="f")document.documentElement.requestFullscreen?.();
  else if(event.key==="Escape"){present(false);chapmenu.classList.remove("show");}
});
addEventListener("resize",()=>overview?fit(false):focus(current,false));
if("ResizeObserver" in window){
  const observer=new ResizeObserver(entries=>{
    if(cameraFollowup.isArmed(current)&&entries.some(entry=>entry.target===stations[current]))scheduleFitCheck(40);
  });
  stations.forEach(station=>observer.observe(station));
}
document.fonts?.ready.then(()=>{if(cameraFollowup.isArmed(current))scheduleFitCheck(0);});

sync();focus(0,false);setTimeout(()=>focus(0,false),250);
document.documentElement.setAttribute("data-viewer-ready","passed");
})();
