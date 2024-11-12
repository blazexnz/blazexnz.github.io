const cacheName = 'binary-decimal-cache-v1';
const filesToCache = [
  '/',
  '/index.html',
  '/style.css',  // Ensure this file is available offline
  '/script.js',  // Ensure your script is cached
  '/manifest.json',  // Cache manifest
  '/icons/icon-192x192.png',  // Ensure the icons are available
  '/icons/icon-512x512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [cacheName];
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

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).then((fetchResponse) => {
        return caches.open(cacheName).then((cache) => {
          cache.put(event.request, fetchResponse.clone());  // Cache the new response
          return fetchResponse;
        });
      });
    }).catch(() => {
      return caches.match('/index.html');  // Fallback to index.html for offline usage
    })
  );
});
