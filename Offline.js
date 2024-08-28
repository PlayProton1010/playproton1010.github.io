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
          // Check if the resource has been updated on the server
          return fetch(event.request)
            .then(networkResponse => {
              if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                return cachedResponse;
              }

              // Update the cache with the latest version of the file
              caches.open(CACHE_NAME).then(cache => {
                cache.put(event.request, networkResponse.clone());
              });

              return networkResponse;
            })
            .catch(() => cachedResponse); // If network request fails, return the cached response
        } else {
          // If not in cache, try to fetch from the network and cache it
          return fetch(event.request)
            .then(networkResponse => {
              if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                return networkResponse;
              }

              // Cache the fetched response
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
  event.waitUntil(self.clients.claim()); // Just claim the clients without deleting caches
});
