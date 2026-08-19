// Tara Kisan Seva Kendra — service worker
// Strategy: never cache API calls (they need live data), cache-first for
// static assets, network-first with cache fallback for page navigations.

const CACHE_NAME = "tara-kisan-v1";
const PRECACHE_URLS = ["/", "/manifest.json", "/icon-192.png", "/icon-512.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Only handle GET requests; POST (e.g. /api/analyze-crop) always goes
  // straight to the network untouched.
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // Never cache API routes — always fetch fresh.
  if (url.pathname.startsWith("/api/")) return;

  // Page navigations: try network first so content stays fresh, fall back
  // to cache (and then a minimal offline notice) when there's no signal.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(
          () =>
            caches.match(request).then(
              (cached) =>
                cached ||
                new Response(
                  "<html><body style='font-family:sans-serif;text-align:center;padding:40px;background:#0F241A;color:#F1F7F2'><h2>इंटरनेट कनेक्शन नहीं है</h2><p>कृपया कनेक्ट होने पर दोबारा कोशिश करें।</p></body></html>",
                  { headers: { "Content-Type": "text/html" } }
                )
            )
        )
    );
    return;
  }

  // Static assets (images, fonts, css, js): cache-first for speed, then
  // fill the cache from the network in the background.
  event.respondWith(
    caches.match(request).then(
      (cached) =>
        cached ||
        fetch(request)
          .then((response) => {
            if (response && response.status === 200) {
              const copy = response.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
            }
            return response;
          })
          .catch(() => cached)
    )
  );
});
