const CACHE_NAME = 'pwa-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/stylesheets/base.css',
  '/stylesheets/skeleton.css', 
  '/stylesheets/main.css',
  '/js-files/jquery-3.3.1.min.js',
  '/js-files/custom.js',
  '/images/favicon.ico'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache).catch(function(error) {
          console.log('Cache addAll error:', error);
          return Promise.resolve();
        });
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        
        return fetch(event.request).then(function(response) {
          if(!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          var responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(function(cache) {
              cache.put(event.request, responseToCache);
            });
          
          return response;
        }).catch(function() {
          if (event.request.url.includes('/images/icons/')) {
            return new Response('', { status: 404 });
          }
          return fetch(event.request);
        });
      })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});