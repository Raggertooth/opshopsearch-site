// Service Worker Killer
// When opshopsearch.com served the PWA, it registered a service worker
// in every visitor's browser. This file replaces that SW with one that
// unregisters itself, clears all caches, and reloads the page —
// so returning visitors see the marketing site instead of the cached PWA.
// Once all historical visitors have been reached, this file can be removed.

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.map((name) => caches.delete(name)));
    await self.registration.unregister();
    const clients = await self.clients.matchAll({ type: 'window' });
    clients.forEach((client) => client.navigate(client.url));
  })());
});
