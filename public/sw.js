// sw.js
const CACHE_VERSION = 'v5-sera';
const STATIC_CACHE  = `static-${CACHE_VERSION}`;
const RUNTIME_CACHE = `runtime-${CACHE_VERSION}`;

const ASSETS = [
  '/',                 // App Shell
  '/index.html',
  '/manifest.json',
  '/style.css',
  '/app.js',
  '/icons/icon192.png',
  '/icons/icon512.png',
  'screenshots/screenshot-desktop.png',
  'screenshots/screenshot-mobile.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(STATIC_CACHE);
    await cache.addAll(ASSETS.map(u => new Request(u, { cache: 'reload' })));
  })());
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys
        .filter(k => ![STATIC_CACHE, RUNTIME_CACHE].includes(k))
        .map(k => caches.delete(k))
    );
    await self.clients.claim();
  })());
});

// ===== SNAPSHOT: guardar lista en /snapshot/tareas.json =====
self.addEventListener('message', async (event) => {
  const data = event?.data;
  if (!data) return;
  if (data.type === 'SAVE_SNAPSHOT') {
    const payload = Array.isArray(data.payload) ? data.payload : [];
    const resp = new Response(JSON.stringify(payload), {
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
    });
    const c = await caches.open(RUNTIME_CACHE);
    await c.put('/snapshot/tareas.json', resp);
  }
});

// Fallback para navegaciones
async function offlineShell() {
  return (await caches.match('/index.html', { ignoreSearch: true })) ||
         (await caches.match('/',           { ignoreSearch: true })) ||
         new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain' } });
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // 1) Navegación (documentos)
  if (req.mode === 'navigate' || req.destination === 'document') {
    event.respondWith((async () => {
      try {
        return await fetch(req);
      } catch {
        return await offlineShell();
      }
    })());
    return;
  }

  // 2) API (no cacheamos GET de API; si no hay red devolvemos 503)
  if (url.pathname.startsWith('/api/')) {
    if (req.method === 'GET') {
      event.respondWith((async () => {
        try {
          const fresh = await fetch(req);
          return fresh;
        } catch {
          return new Response('OFFLINE', { status: 503, headers: { 'X-Offline': '1' } });
        }
      })());
      return;
    }
    // para POST/DELETE/etc no hacemos respondWith; dejamos pasar a la red
    return;
  }

  // 3) Estáticos same-origin (cache-first + update en background)
  if (req.method === 'GET' && url.origin === self.location.origin) {
    event.respondWith((async () => {
      const cached = await caches.match(req, { ignoreSearch: true });
      const net = fetch(req).then(async (res) => {
        if (res && res.ok) {
          const c = await caches.open(RUNTIME_CACHE);
          c.put(req, res.clone());
        }
        return res;
      }).catch(() => null);

      // Siempre devolvemos un Response
      return cached || net || new Response('', { status: 504 });
    })());
  }
});
