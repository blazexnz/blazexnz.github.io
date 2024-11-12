const CACHE_NAME = 'binary-decimal-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/script.js',
    '/style.css',  // If you have a separate stylesheet, include it here
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png'
];

// Install the service worker and cache the assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache and caching files');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch assets from the cache when the network is unavailable
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    return cachedResponse;
                }
                return fetch(event.request);
            })
    );
});

// Update the service worker when a new version is available
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
