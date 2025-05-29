
const CACHE_NAME = 'medalert-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'Emergency alert received',
    icon: '/lovable-uploads/medAlert-icon-192.png',
    badge: '/lovable-uploads/medAlert-icon-192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '2'
    },
    actions: [
      {
        action: 'explore',
        title: 'View Details',
        icon: '/lovable-uploads/medAlert-icon-192.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/lovable-uploads/medAlert-icon-192.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('MedAlert', options)
  );
});
