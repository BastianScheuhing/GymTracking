const CACHE = "gym-tracker-cache-v11";
const SHELL = [
    "index.html",
    "style.css",
    "app.js",
    "manifest.json",
    "icon.png"
];

self.addEventListener("install", e => {
    e.waitUntil(
        caches.open(CACHE)
            .then(cache => cache.addAll(SHELL))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener("activate", e => {
    e.waitUntil(
        caches.keys()
            .then(keys => Promise.all(
                keys.filter(k => k !== CACHE).map(k => caches.delete(k))
            ))
            .then(() => self.clients.claim())
    );
});

// Network-first for app shell: always try network, fall back to cache offline.
// Successful responses are written back to the cache so the app stays usable offline.
self.addEventListener("fetch", e => {
    if (e.request.method !== "GET") return;

    const url = new URL(e.request.url);
    if (url.origin !== self.location.origin) return;

    e.respondWith(
        fetch(e.request)
            .then(response => {
                if (response && response.ok) {
                    const copy = response.clone();
                    caches.open(CACHE).then(cache => cache.put(e.request, copy));
                }
                return response;
            })
            .catch(() => caches.match(e.request).then(cached => cached || caches.match("index.html")))
    );
});
