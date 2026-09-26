/* ============================================================
   BFGC Carecell — Service Worker
   Strategy: Network-first for local files, bypass all external.
   This makes the app installable on Android without breaking
   Firebase real-time listeners or any CDN resources.
   ============================================================ */

const CACHE_NAME = 'cc-shell-v1';

const SHELL_FILES = [
  '/carecell/index.html',
  '/carecell/manifest.json',
  '/carecell/app-icon.png',
  '/logo.png'
];

/* ---- Install: pre-cache the app shell ---- */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(SHELL_FILES))
      .catch(err => console.warn('[SW] Pre-cache failed (non-fatal):', err))
  );
  self.skipWaiting(); // activate immediately
});

/* ---- Activate: remove old caches ---- */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

/* ---- Fetch: network-first for local, bypass for external ---- */
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // ✅ BYPASS: Let browser handle all external requests normally.
  // This covers Firebase, Firestore, CDN fonts, OneSignal, Gemini API — everything.
  if (url.hostname !== self.location.hostname) {
    return;
  }

  // ✅ BYPASS: Non-GET requests (POST etc.) — never intercept
  if (event.request.method !== 'GET') {
    return;
  }

  // ✅ Local files: try network first, fall back to cache if offline
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Store a fresh copy in cache for offline fallback
        if (response && response.status === 200 && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => {
        // Offline fallback from cache
        return caches.match(event.request);
      })
  );
});
