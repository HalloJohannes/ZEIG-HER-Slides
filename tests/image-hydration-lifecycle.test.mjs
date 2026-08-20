import test from "node:test";
import assert from "node:assert/strict";
import { promises as fs } from "node:fs";
import vm from "node:vm";

class FakeImage{
  constructor({completes=true}={}){this.attrs={"data-src":"data:image/png;base64,AAAA"};this.listeners={};this.isConnected=true;this.complete=false;this.completes=completes;}
  getAttribute(name){return this.attrs[name]??null;}
  setAttribute(name,value){this.attrs[name]=String(value);if(name==="src"&&this.completes)this.complete=true;}
  removeAttribute(name){delete this.attrs[name];}
  addEventListener(name,callback){this.listeners[name]=callback;}
}

async function hydrationApi(images){
  const source=await fs.readFile("src/app.html","utf8");
  const start=source.indexOf("var imageReconcileTimer=0"),end=source.indexOf("function reconcileImages()",start);
  assert.ok(start>0&&end>start,"Bildlade-Runtime nicht auffindbar");
  const world={querySelectorAll(selector){return selector==="[data-image-queued]"?images.filter(image=>image.getAttribute("data-image-queued")):[];}};
  const context={
    setTimeout,clearTimeout,world,RENDER_METRICS:{hydrated:0},publishRenderMetrics(){},cur:0,
    createCameraFollowupController(){return{cancel(){},recheck(){},arm(){}};}
  };
  vm.runInNewContext(`${source.slice(start,end)}\nglobalThis.api={resetImageHydrationCycle,hydrateImage,pumpImageQueue};`,context);
  return context.api;
}

test("ein abgebrochener Bilddecode blockiert den nächsten Renderzyklus nicht",async()=>{
  const oldImage=new FakeImage({completes:false}),newImages=[new FakeImage(),new FakeImage(),new FakeImage()];
  const api=await hydrationApi([oldImage,...newImages]);
  api.resetImageHydrationCycle(0);api.hydrateImage(oldImage);
  oldImage.isConnected=false;
  api.resetImageHydrationCycle(1);
  for(const image of newImages)api.hydrateImage(image);
  await new Promise(resolve=>setTimeout(resolve,30));
  assert.equal(newImages.filter(image=>image.getAttribute("src")).length,3);
  assert.equal(newImages.filter(image=>image.getAttribute("data-image-queued")).length,0);
});

test("ein Prioritätswechsel entfernt alte Warteschlangen-Markierungen",async()=>{
  const images=[new FakeImage({completes:false}),new FakeImage({completes:false})];
  const api=await hydrationApi(images);
  api.resetImageHydrationCycle(0);api.hydrateImage(images[0]);api.hydrateImage(images[1]);
  assert.equal(images[1].getAttribute("data-image-queued"),"1");
  api.resetImageHydrationCycle(4);
  assert.equal(images[1].getAttribute("data-image-queued"),null);
});
