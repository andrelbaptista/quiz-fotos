var CACHE='quiz-fotos-v7';
var STATIC=['/','/manifest.json','/icons/icon-192.png','/icons/icon-512.png'];

self.addEventListener('install',function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(STATIC);}));
  self.skipWaiting();
});

self.addEventListener('activate',function(e){
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.filter(function(k){return k!==CACHE;}).map(function(k){return caches.delete(k);}));
  }));
  self.clients.claim();
});

self.addEventListener('fetch',function(e){
  var url=new URL(e.request.url);
  // Network-first for HTML (always get latest index.html)
  if(url.pathname==='/'||url.pathname.endsWith('.html')){
    e.respondWith(
      fetch(e.request).then(function(r){
        var clone=r.clone();
        caches.open(CACHE).then(function(c){c.put(e.request,clone);});
        return r;
      }).catch(function(){
        return caches.match(e.request);
      })
    );
    return;
  }
  // Cache-first for other assets
  e.respondWith(caches.match(e.request).then(function(r){return r||fetch(e.request);}));
});
