const CACHE_NAME = 'app-cache-v1';
const ASSETS_TO_CACHE = [
  '/index.html',
  '/manifest.json',
  '/robots.txt',
  '/logo192.png',
  '/logo512.png',
  '/favicon.ico',
  '/static/js/bundle.js', // React build files
  '/static/css/main.css', // Example path for main CSS
];

// Install Event: Cache critical files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching important assets...');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activate Event: Remove old cache versions
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch Event: Serve cached files or fetch from network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse; // Return cached file
      }
      return fetch(event.request) // Fetch from network if not in cache
        .then((response) => {
          // Cache fetched response dynamically
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return response;
        })
        .catch(() => {
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html'); // Fallback for offline navigation
          }
        });
    })
  );
});
