const CACHE_NAME = 'Proton';
const urlsToCache = [
  '/',
  './assets/css/index.css',
  './assets/js/index.js',
  './index.html',
  './play.html',
  './assets/json/g.json'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);

  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          
          return fetch(event.request)
            .then(networkResponse => {
              if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                return cachedResponse;
              }

       
              caches.open(CACHE_NAME).then(cache => {
                cache.put(event.request, networkResponse.clone());
              });

              return networkResponse;
            })
            .catch(() => cachedResponse);
        } else {
          return fetch(event.request)
            .then(networkResponse => {
              if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                return networkResponse;
              }

              caches.open(CACHE_NAME).then(cache => {
                cache.put(event.request, networkResponse.clone());
              });

              return networkResponse;
            });
        }
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim()); 
});
