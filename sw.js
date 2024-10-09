importScripts("./fonts/bundle.js", "./fonts/config.js", "./fonts/sw.js");

const u = new UVServiceWorker();
const userKey = new URL(location).searchParams.get("userkey");

self.addEventListener("fetch", (event) => {
  if (event.request.url.startsWith(`${location.origin}/jquery/`)) {
    event.respondWith(u.fetch(event));
  } else {
    event.respondWith(fetch(event.request));
  }
});
