const CACHE_NAME = 'Proton-V1';
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
        console.log('Cache opened');
        return cache.addAll(urlsToCache);
      })
      .catch(error => console.error('Failed to cache', error))
  );
});
self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);

  if (requestUrl.origin === location.origin && (
      requestUrl.pathname.startsWith('/assets/img/') || 
      requestUrl.pathname.startsWith('/assets/js/') || 
      requestUrl.pathname.startsWith('/assets/css/') || 
      requestUrl.pathname.startsWith('/games/')
    )) {
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          // Serve from cache if found, otherwise fetch from network
          return response || fetch(event.request).then(networkResponse => {
            // Cache the new response for future use
            return caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            });
          });
        }).catch(error => {
          console.error('Error fetching from network', error);
          throw error;
        })
    );
  } else {
    // For other requests, use cache falling back to network
    event.respondWith(
      caches.match(event.request)
        .then(response => response || fetch(event.request))
    );
  }
});

// Activate event - clearing old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log(`Deleting cache: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});
