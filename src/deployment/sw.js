const CACHE_NAME="zeig-her-slides-__BUILD__";
const SHELL=["./index.html","./manifest.webmanifest","./icon.svg","./privacy-attestation.json"];
self.addEventListener("install",event=>event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener("activate",event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE_NAME).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",event=>{
  const url=new URL(event.request.url);
  if(url.origin!==self.location.origin){event.respondWith(new Response("Externe Verbindung gesperrt",{status:451,headers:{"Content-Type":"text/plain;charset=utf-8"}}));return;}
  event.respondWith(caches.match(event.request,{ignoreSearch:true}).then(cached=>cached||new Response("Nicht Teil der geprüften Offline-Ausgabe",{status:404,headers:{"Content-Type":"text/plain;charset=utf-8"}})));
});
