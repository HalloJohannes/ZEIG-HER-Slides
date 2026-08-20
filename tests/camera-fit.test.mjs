import assert from "node:assert/strict";
import { promises as fs } from "node:fs";
import test from "node:test";
import vm from "node:vm";

const source=await fs.readFile("src/runtime/camera-fit.js","utf8");
const context={};
vm.runInNewContext(`${source};this.api={cameraSafeViewport,cameraFitTarget,cameraFitOptions,cameraIsChapterTransition,cameraTargetDiffers,cameraFrameFullyVisible,cameraFollowupDelays,createCameraFollowupController};`,context);
const {cameraSafeViewport,cameraFitTarget,cameraFitOptions,cameraIsChapterTransition,cameraTargetDiffers,cameraFrameFullyVisible,cameraFollowupDelays,createCameraFollowupController}=context.api;

test("hohe Rahmen bleiben oberhalb der echten Navigationsleiste vollständig sichtbar",()=>{
  const viewport=cameraSafeViewport(3840,2160,78);
  const frame={x:10860,y:3345,w:1600,h:4200};
  const target=cameraFitTarget(frame,viewport,{padding:30,maxScale:1.12});
  assert.equal(cameraFrameFullyVisible(frame,target,viewport,1),true);
  assert.ok(target.s<0.48,"ein hoher Rahmen muss zuverlässig herauszoomen");
});

test("Rahmenwachstum erzeugt einen neuen weiter herausgezoomten Zielwert",()=>{
  const viewport=cameraSafeViewport(1440,900,74);
  const first=cameraFitTarget({x:100,y:200,w:1500,h:900},viewport,{padding:28,maxScale:1.12});
  const grown=cameraFitTarget({x:100,y:200,w:1500,h:2400},viewport,{padding:28,maxScale:1.12});
  assert.ok(grown.s<first.s);
  assert.equal(cameraTargetDiffers(first,grown,1.5),true);
  assert.equal(cameraFrameFullyVisible({x:100,y:200,w:1500,h:2400},grown,viewport,1),true);
});

test("kleine Viewports und breite Rahmen werden mit festen Innenabständen eingepasst",()=>{
  const viewport=cameraSafeViewport(390,844,92);
  const frame={x:2500,y:1200,w:1900,h:760};
  const target=cameraFitTarget(frame,viewport,{padding:26,maxScale:1.12});
  assert.equal(cameraFrameFullyVisible(frame,target,viewport,1),true);
  assert.ok(viewport.bottom<=844-92);
});

test("Sicherheitsraum bleibt auf Projektionsflächen sichtbar und ist vertikal ausgewogen",()=>{
  const viewport=cameraSafeViewport(3840,2160,86);
  assert.ok(viewport.left>=110&&3840-viewport.right>=110);
  assert.ok(viewport.top>=90);
  assert.ok(2160-viewport.bottom>=150,"HUD plus sichtbarer Unterrand bleiben frei");
});

test("Kapitelübergänge dürfen näher heranzoomen als normale Inhaltsrahmen",()=>{
  assert.equal(cameraIsChapterTransition({type:"custom",blocks:[{kind:"chap"}]}),true);
  assert.equal(cameraIsChapterTransition({type:"custom",blocks:[{kind:"heading"}]}),false);
  const chapter=cameraFitOptions(true,false),content=cameraFitOptions(false,false);
  assert.ok(chapter.maxScale>content.maxScale);
  assert.ok(chapter.padding<content.padding);
});

test("Kamera-Nachprüfungen verwenden eine gemeinsame kanonische Zeitfolge",()=>{
  assert.deepEqual(Array.from(cameraFollowupDelays()),[120,520,1100,1700]);
});

test("Kamera-Nachprüfungen stoppen nach manueller Bewegung und ignorieren alte Stationen",()=>{
  const pending=[];
  const cleared=new Set();
  let current=2,overview=false;
  const reconciled=[];
  const controller=createCameraFollowupController({
    currentStation:()=>current,
    isOverview:()=>overview,
    reconcile:index=>reconciled.push(index),
    setTimer:(callback,delay)=>{const token={callback,delay};pending.push(token);return token;},
    clearTimer:token=>cleared.add(token)
  });
  controller.arm(2);
  assert.deepEqual(pending.map(item=>item.delay),[120,520,1100,1700]);
  pending[0].callback();
  assert.deepEqual(reconciled,[2]);
  controller.cancel();
  pending.slice(1).forEach(item=>item.callback());
  assert.deepEqual(reconciled,[2]);
  assert.ok(cleared.size>=3);
  controller.arm(2);overview=true;
  pending.at(-1).callback();
  assert.deepEqual(reconciled,[2]);
  overview=false;current=3;controller.recheck(0);pending.at(-1).callback();
  assert.deepEqual(reconciled,[2]);
});
