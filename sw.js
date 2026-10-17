// sw.js
// Service worker for NextLevel Outreach.
// It saves the app shell so the app opens fast and still works with no internet.

// Cache name with a version number.
// Change the version (v5 to v6) any time you update the files below.
const CACHE_NAME = "nextlevel-shell-v5";

// App shell: the files needed to open the main interface
const APP_SHELL = [
  "./",
  "index.html",
  "offline.html",
  "manifest.json",
  "css/styles.css",
  "css/fonts.css",
  "js/app.js",
  "fonts/graduate-latin-400-normal.woff2",
  "fonts/archivo-latin-400-normal.woff2",
  "fonts/archivo-latin-600-normal.woff2",
  "images/hero.jpg",
  "images/icon-192.png",
  "images/icon-512.png"
];

// Materialize CSS comes from another website (a CDN).
// It is cached separately so the app still installs if the CDN is down.
const CDN_FILES = [
  "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"
];

// INSTALL: save the app shell into Cache Storage
self.addEventListener("install", (event) => {
  console.log("[Service Worker] Installing", CACHE_NAME);

  // waitUntil makes sure caching finishes before install is complete
  event.waitUntil(
    (async () => {
      try {
        const cache = await caches.open(CACHE_NAME);
        await cache.addAll(APP_SHELL);
        console.log("[Service Worker] App shell cached.");

        // Try each CDN file. If one fails, log it and keep going.
        await Promise.all(
          CDN_FILES.map(async (url) => {
            try {
              await cache.add(url);
            } catch (error) {
              console.warn("[Service Worker] Could not cache", url, error);
            }
          })
        );
        await self.skipWaiting();
      } catch (error) {
        console.error("[Service Worker] Caching the app shell failed.", error);
        throw error; // install fails, so the old working version stays in place
      }
    })()
  );
});

// ACTIVATE: delete old cache versions so only the current one is left
self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Activating", CACHE_NAME);

  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();

      await Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => {
            console.log("[Service Worker] Deleting old cache:", name);
            return caches.delete(name);
          })
      );

      await self.clients.claim();
    })()
  );
});

// FETCH: check the cache first, then the network, then the offline page
self.addEventListener("fetch", (event) => {
  // Only handle GET requests for normal web addresses
  if (event.request.method !== "GET") return;
  if (!event.request.url.startsWith("http")) return;

  event.respondWith(
    (async () => {
      // 1. Is the file in the cache?
      const cachedResponse = await caches.match(event.request);
      if (cachedResponse) {
        return cachedResponse;
      }

      // 2. Not in the cache, so try the network
      try {
        return await fetch(event.request);
      } catch (error) {
        // 3. No network. If the user was opening a page, show the offline page
        console.warn("[Service Worker] Network failed for:", event.request.url);

        if (event.request.mode === "navigate") {
          return caches.match("offline.html");
        }

        // For other files (like an image), return a simple error response
        return new Response("Offline", { status: 503, statusText: "Offline" });
      }
    })()
  );
});
