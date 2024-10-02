importScripts("/fonts/bundle.js?v=1");
importScripts("/fonts/config.js");
importScripts("/fonts/sw.js?v=1");

const u = new UVServiceWorker();
const userKey = new URL(location).searchParams.get("userkey");

self.addEventListener("fetch", (event) => {
  event.respondWith(
    (async () => {
      if (event.request.url.startsWith(`${location.origin}/jquery/`)) {
        return await u.fetch(event);
      }

      return await fetch(event.request);
    })(),
  );
});
