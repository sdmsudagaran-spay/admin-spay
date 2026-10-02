const CACHE_NAME = 'sdg-pay-admin-v1';
const urlsToCache = [
  './index.html',
  './manifest.json',
  'https://iili.io/nHwYAuV.png'
];

// Install Service Worker & Simpan Cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Strategi Fetch: Ambil dari Network, jika gagal ambil dari Cache (Offline fallback)
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
