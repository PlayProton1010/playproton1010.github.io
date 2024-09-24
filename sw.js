importScripts("/e/uv.bundle.js");
importScripts("/e/uv.config.js");
importScripts(__uv$config.sw || "/e/uv.sw.js");

const uv = new UVServiceWorker();
const userKey = new URL(location).searchParams.get("userkey");

self.addEventListener("fetch", event => {
  event.respondWith(
    (async () => {
      
      if (event.request.url.startsWith(`${location.origin}/p/`)) {
        return await uv.fetch(event);
      }

      return await fetch(event.request);
    })(),
  );
});
