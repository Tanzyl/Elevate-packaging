// Image cache service worker — stale-while-revalidate.
//
// Every image a visitor sees (both Next.js-optimized /_next/image variants
// and raw /images/* files) is cached in Cache Storage on first view and
// served instantly from cache on every later view, while a background fetch
// refreshes the entry so replaced-in-place images (same filename, new
// content) arrive on the next visit. Non-image requests are not intercepted.
//
// Bump CACHE when the caching logic changes — old caches are deleted on
// activate.

const CACHE = "pp-img-v1";
const MAX_ENTRIES = 250; // ponytail: FIFO trim, switch to true LRU if ever needed

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

function isImageRequest(url) {
  return (
    url.pathname.startsWith("/_next/image") ||
    url.pathname.startsWith("/images/") ||
    url.pathname === "/icon.png"
  );
}

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin || !isImageRequest(url)) return;

  event.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const cached = await cache.match(event.request);

      const refresh = fetch(event.request)
        .then((res) => {
          if (res.ok) {
            cache.put(event.request, res.clone()).then(() => trim(cache));
          }
          return res;
        })
        .catch((err) => {
          // Only substitute a cached copy if we actually have one — resolving
          // to undefined would make respondWith() reject and break the image.
          if (cached) return cached;
          throw err;
        });

      if (cached) {
        // Serve instantly, refresh in the background.
        event.waitUntil(refresh.then(() => undefined).catch(() => undefined));
        return cached;
      }
      return refresh;
    })
  );
});

async function trim(cache) {
  const keys = await cache.keys();
  for (let i = 0; i < keys.length - MAX_ENTRIES; i++) {
    await cache.delete(keys[i]);
  }
}
