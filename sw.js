// Service worker: lets the app load even with no internet.
const CACHE = "nextlevel-c-v4";

const LOCAL_FILES = [
  "./",
  "index.html",
  "offline.html",
  "manifest.json",
  "css/styles.css",
  "css/fonts.css",
  "fonts/graduate-latin-400-normal.woff2",
  "fonts/archivo-latin-400-normal.woff2",
  "fonts/archivo-latin-600-normal.woff2",
  "images/icon-192.png",
  "images/icon-512.png",
  "images/hero.jpg"
];

const CDN_FILES = [
  "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"
];

// Install: save the files we need into the cache.
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then(async (cache) => {
      await cache.addAll(LOCAL_FILES);
      // CDN files are saved one by one so one failure does not break install.
      await Promise.all(
        CDN_FILES.map((url) => cache.add(url).catch(() => null))
      );
    })
  );
  self.skipWaiting();
});

// Activate: delete old caches from earlier versions.
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: answer from the cache first, then the network, then the offline page.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => {
          if (event.request.mode === "navigate") return caches.match("offline.html");
        });
    })
  );
});
