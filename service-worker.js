const CACHE_NAME = "flashcards-v1";
const APP_FILES = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./css/styles.css",
  "./js/vragen-pack.js",
  "./js/samenvattingen.js",
  "./js/vragen-ds-bigo.js",
  "./js/begrippen.js",
  "./js/questions-h1.js",
  "./js/questions-h3.js",
  "./js/vragen-h1-h6.js",
  "./js/vragen-h5-h9.js",
  "./js/vragen-h9-h13.js",
  "./js/vragen-extra-h1-h6.js",
  "./js/vragen-extra-h7-h13.js",
  "./js/app.js",
  "./icons/flashcards-192.png",
  "./icons/flashcards-512.png",
  "./icons/flashcards-180.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_FILES)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key.startsWith("flashcards-") && key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put("./index.html", copy));
          return response;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return response;
      });
    })
  );
});
