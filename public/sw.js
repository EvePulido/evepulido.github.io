const nombreCache = 'cacheToDo-v2';

const archivos = [
  '/',
  '/manifest.json',
  '/index.html',
  '/style.css',
  '/app.js',
  '/icons/icon192.png',
  '/icons/icon512.png',
  '/screenshots/screenshot-desktop.png',
  '/screenshots/screenshot-mobile.jpg'
];

// Instalar
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(nombreCache).then(cache => {
      return cache.addAll(archivos);
    }).catch(err => {
      console.error('Error al cachear archivos:', err);
    })
  );
});

// Activar
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== nombreCache) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(res => {
      if (res) return res;

      return fetch(event.request).catch(() => {
        // Si no hay index en caché devuelve un response vacío
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html').then(res => {
            return res || new Response('', {
              headers: { 'Content-Type': 'text/html' }
            });
          });
        }

        // Si es API offline devuelve JSON vacío
        if (event.request.url.includes('/api/')) {
          return new Response(JSON.stringify([]), {
            headers: { 'Content-Type': 'application/json' }
          });
        }

        // Otros archivos response vacío para evitar error
        return new Response('', {
          status: 200,
          headers: { 'Content-Type': 'text/plain' }
        });
      });
    })
  );
});
