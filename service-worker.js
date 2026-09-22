/* KILL SWITCH. For one day (2026-09-21) this domain served a full copy of
   sefermormon.com, whose service worker cached every page for offline use.
   Browsers that visited then still hold that worker and keep showing the
   cached copy. This file answers at the same address: it installs, empties
   every cache, unregisters itself, and reloads the open pages, which then
   fetch the real site. It stays here so any such browser heals on its next
   visit. It must never grow a fetch handler. */
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys()
      .then(function (keys) { return Promise.all(keys.map(function (k) { return caches.delete(k); })); })
      .then(function () { return self.registration.unregister(); })
      .then(function () { return self.clients.matchAll({ type: 'window' }); })
      .then(function (clients) { clients.forEach(function (c) { c.navigate(c.url); }); })
  );
});
