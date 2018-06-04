---
---
var cacheName = 'zephire-nz-blog';

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');

  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      fetch('/site.json').then(function(response) {
        return response.json();
      }).then(function(urls) {
        console.log('[ServiceWorker] Adding URLs');
        console.log(urls);
        cache.addAll(urls);
      });
    })
  );
});

self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if(response) {
        console.log(`Serving ${event.request.url} locally.`);
      } else {
        console.warn(`Serving ${event.request.url} externally.`);
      }
      return response || fetch(event.request);
    })
  );
});