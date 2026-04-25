const CACHE = "gym-tracker-cache-v5";

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

let restNotificationTimer = null;

self.addEventListener("message", e => {
    if (e.data.type === "REST_TIMER_START") {
        if (restNotificationTimer) clearTimeout(restNotificationTimer);
        const delay = e.data.endTime - Date.now();
        if (delay > 0) {
            restNotificationTimer = setTimeout(() => {
                self.registration.showNotification("Pause beendet! 💪", {
                    body: "Zeit für den nächsten Satz",
                    icon: "icon.png",
                    vibrate: [100, 50, 100],
                    tag: "rest-timer"
                });
                restNotificationTimer = null;
            }, delay);
        }
    } else if (e.data.type === "REST_TIMER_CANCEL") {
        if (restNotificationTimer) {
            clearTimeout(restNotificationTimer);
            restNotificationTimer = null;
        }
    }
});

self.addEventListener("notificationclick", e => {
    e.notification.close();
    e.waitUntil(
        clients.matchAll({ type: "window", includeUncontrolled: true }).then(list => {
            if (list.length) return list[0].focus();
            return clients.openWindow("/");
        })
    );
});
