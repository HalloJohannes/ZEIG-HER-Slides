function cameraSafeViewport(viewportWidth,viewportHeight,hudHeight,options){
  options=options||{};
  var width=Math.max(1,Number(viewportWidth)||1);
  var height=Math.max(1,Number(viewportHeight)||1);
  /* Der Sicherheitsraum ist bewusst sichtbar: Auf großen Projektionsflächen
     entspricht er ungefähr der Breite der festen Markenfläche, auf kleinen
     Displays bleibt er kompakt. Die HUD-Höhe wird unten zusätzlich abgezogen. */
  var side=Number.isFinite(options.side)?options.side:Math.max(34,Math.min(118,width*.032));
  var top=Number.isFinite(options.top)?options.top:Math.max(48,Math.min(92,height*.045));
  var bottomGap=Number.isFinite(options.bottomGap)?options.bottomGap:Math.max(32,Math.min(72,height*.034));
  var bottom=Math.max(Number(hudHeight)||0,0)+bottomGap;
  var left=Math.max(0,side),right=Math.max(left+1,width-side);
  var safeTop=Math.max(0,top),safeBottom=Math.max(safeTop+1,height-bottom);
  return {left:left,top:safeTop,right:right,bottom:safeBottom,width:right-left,height:safeBottom-safeTop};
}
function cameraFitTarget(frame,viewport,options){
  options=options||{};
  var x=Number(frame&&frame.x)||0,y=Number(frame&&frame.y)||0;
  var w=Math.max(1,Number(frame&&frame.w)||1),h=Math.max(1,Number(frame&&frame.h)||1);
  var pad=Math.max(0,Number.isFinite(options.padding)?options.padding:18);
  var maxScale=Math.max(.01,Number.isFinite(options.maxScale)?options.maxScale:1.12);
  var availableW=Math.max(1,viewport.width-pad*2),availableH=Math.max(1,viewport.height-pad*2);
  var scale=Math.min(availableW/w,availableH/h,maxScale);
  var centerX=viewport.left+viewport.width/2,centerY=viewport.top+viewport.height/2;
  return {s:scale,x:centerX-(x+w/2)*scale,y:centerY-(y+h/2)*scale};
}
function cameraFitOptions(isChapterTransition,overview){
  if(overview)return {padding:22,maxScale:.55};
  return {padding:isChapterTransition?12:18,maxScale:isChapterTransition?1.38:1.16};
}
function cameraIsChapterTransition(slide){
  if(!slide)return false;
  if(slide.type==="chapter"||slide.type==="title")return true;
  var blocks=Array.isArray(slide.blocks)?slide.blocks:[];
  return blocks.some(function(block){return block&&block.kind==="chap";});
}
function cameraTargetDiffers(a,b,tolerance){
  tolerance=Number.isFinite(tolerance)?tolerance:1;
  if(!a||!b)return true;
  return Math.abs(a.x-b.x)>tolerance||Math.abs(a.y-b.y)>tolerance||Math.abs(a.s-b.s)>.001;
}
function cameraFrameFullyVisible(frame,target,viewport,tolerance){
  tolerance=Number.isFinite(tolerance)?tolerance:1;
  var left=frame.x*target.s+target.x,right=(frame.x+frame.w)*target.s+target.x;
  var top=frame.y*target.s+target.y,bottom=(frame.y+frame.h)*target.s+target.y;
  return left>=viewport.left-tolerance&&right<=viewport.right+tolerance&&top>=viewport.top-tolerance&&bottom<=viewport.bottom+tolerance;
}
function cameraFollowupDelays(){
  return [120,520,1100,1700];
}
function createCameraFollowupController(options){
  options=options||{};
  var setTimer=options.setTimer||setTimeout;
  var clearTimer=options.clearTimer||clearTimeout;
  var generation=0,active=false,station=-1,timers=[];
  function removeTimer(timer){timers=timers.filter(function(item){return item!==timer;});}
  function cancel(){
    generation+=1;active=false;station=-1;
    timers.forEach(clearTimer);timers=[];
  }
  function schedule(delay){
    if(!active)return 0;
    var token=generation,index=station;
    var timer=setTimer(function(){
      removeTimer(timer);
      if(!active||token!==generation||index!==station)return;
      if(options.isOverview&&options.isOverview())return;
      if(options.currentStation&&options.currentStation()!==index)return;
      if(options.reconcile)options.reconcile(index);
    },Math.max(0,Number(delay)||0));
    timers.push(timer);return timer;
  }
  function arm(index){
    cancel();active=true;station=index;
    cameraFollowupDelays().forEach(schedule);
  }
  function recheck(delay){if(active)schedule(delay);}
  function isArmed(index){return active&&(index===undefined||index===station);}
  return {cancel:cancel,arm:arm,recheck:recheck,isArmed:isArmed};
}
