// Service Worker - Offline functionality & caching
const CACHE_NAME = 'cybersecurite-v1';
const urlsToCache = [
  '/cybersecurite-site/',
  '/cybersecurite-site/index.html',
  '/cybersecurite-site/presentation.html',
  '/cybersecurite-site/reglementation.html',
  '/cybersecurite-site/menaces.html',
  '/cybersecurite-site/ressources.html',
  '/cybersecurite-site/faq.html',
  '/cybersecurite-site/contact.html',
  '/cybersecurite-site/style.css',
  '/cybersecurite-site/script.js',
  '/cybersecurite-site/faq.js',
  '/cybersecurite-site/logo.svg',
  '/cybersecurite-site/favicon.svg'
];

// Install event - cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) return response;
        return fetch(event.request).then(response => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => cache.put(event.request, responseToCache));
          return response;
        });
      })
      .catch(() => {
        return caches.match('/cybersecurite-site/index.html');
      })
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});
