const CACHE = "gym-tracker-cache-v9";

self.addEventListener("install", e => {
    e.waitUntil(
        caches.open(CACHE)
            .then(cache => cache.addAll([
                "index.html",
                "style.css",
                "app.js",
                "manifest.json",
                "icon.png"
            ]))
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

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(response => response || fetch(e.request))
    );
});
