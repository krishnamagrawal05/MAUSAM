const CACHE='mausam-shell-v3';
const APP_ROOT=new URL('./',self.registration.scope).href;
const appPath=path=>new URL(path,APP_ROOT).href;
const SHELL=['','index.html','src/styles.css','src/india-theme.css','src/features.css','src/i18n.js','src/main.js','src/air-quality.js','src/alerts.js','src/weather-map.js','src/charts.js','src/city-planner.js','src/pwa.js','public/manifest.webmanifest','public/brand-mark.svg','public/icon-192.png','public/icon-512.png'].map(appPath);
const IS_CODE=/\.(?:html|js|css|webmanifest)$/i;
const SCOPE_PATH=new URL(APP_ROOT).pathname;
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('mausam-shell-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
  const request=event.request,url=new URL(request.url);
  if(request.method!=='GET'||url.origin!==self.location.origin||!url.pathname.startsWith(SCOPE_PATH)||url.pathname.includes('/api/')||url.pathname.includes('/manus-storage/'))return;
  if(request.mode==='navigate'){
    event.respondWith(fetch(request).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(APP_ROOT,copy)).catch(()=>{});}return response;}).catch(async()=>await caches.match(request)||await caches.match(APP_ROOT)));
    return;
  }
  if(IS_CODE.test(url.pathname)){
    event.respondWith(fetch(request).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(request,copy)).catch(()=>{});}return response;}).catch(async()=>await caches.match(request)));
    return;
  }
  event.respondWith(caches.match(request).then(cached=>cached||fetch(request).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(request,copy)).catch(()=>{});}return response;})));
});
