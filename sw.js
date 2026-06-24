// v10 - força limpeza total de cache no iOS Safari
var CACHE='quiz-fotos-v10';

self.addEventListener('install',function(e){
  self.skipWaiting();
});

self.addEventListener('activate',function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.map(function(k){return caches.delete(k);}));
    }).then(function(){
      return self.clients.matchAll({type:'window'});
    }).then(function(clients){
      clients.forEach(function(client){
        client.postMessage({type:'SW_UPDATED'});
      });
    })
  );
  self.clients.claim();
});

// Network-first — nunca usa cache, sempre busca da rede
self.addEventListener('fetch',function(e){
  if(!e.request.url.startsWith('http'))return;
  e.respondWith(
    fetch(e.request,{cache:'no-store'}).catch(function(){
      return caches.match(e.request);
    })
  );
});
