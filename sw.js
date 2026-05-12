const CACHE='nuestra-app-v11';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{
  var url = e.request.url;
  // Never intercept Firebase Storage, Firestore, or auth requests
  if(url.includes('firebasestorage.googleapis.com') ||
     url.includes('firestore.googleapis.com') ||
     url.includes('identitytoolkit.googleapis.com') ||
     url.includes('securetoken.googleapis.com')) {
    return; // Let browser handle it natively
  }
  e.respondWith(fetch(e.request).catch(function(){return caches.match(e.request);}));
});
