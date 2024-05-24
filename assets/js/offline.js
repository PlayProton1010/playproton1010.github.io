const CACHE_NAME = 'Proton-V1';
const urlsToCache = [
  '/',
  './assets/css/index.css',
  './assets/js/index.js',
  './index.html',
  './play.html'
  // Add other initial URLs to cache here if needed
];

self.addEventListener('install', event => {
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

  // Check if the request is for any resources under ./assets/img/, ./assets/js/, ./assets/css/, or ./games/
  if (requestUrl.origin === location.origin && (
      requestUrl.pathname.startsWith('/assets/img/') || 
      requestUrl.pathname.startsWith('/assets/js/') || 
      requestUrl.pathname.startsWith('/assets/css/') || 
      requestUrl.pathname.startsWith('/games/')
    )) {
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          if (response) {
            return response; // Return the cached resource
          }
          return fetch(event.request).then(networkResponse => {
            return caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            });
          });
        })
    );
  } else {
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          return response || fetch(event.request);
        })
    );
  }
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
