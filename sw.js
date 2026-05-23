const CACHE='nuestra-app-v25';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{
  var url=e.request.url;
  if(url.includes('firestore.googleapis.com')||url.includes('firebase')||url.includes('googleapis.com')||url.includes('gstatic.com')||url.includes('themoviedb.org')||url.includes('open-meteo.com')||url.includes('nominatim')||url.includes('photon.komoot')||url.includes('drive.google.com')||url.includes('accounts.google.com')||url.includes('lh3.googleusercontent.com')){return;}
  e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));
});
