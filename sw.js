const nombreCache = 'cacheToDo-v1';

const archivos = [
    '/',
    '/index.html',
    '/style.css',
    '/manifest.json',
];

self.addEventListener('install', event => { //Al instalarse
    event.waitUntil( // Esperar hasta que se abra
        caches.open(nombreCache) //Crear o abrir un caché
            .then(cache => {
                return cache.addAll(archivos); //Guarda los archivos en el caché
            })
    );
});

self.addEventListener('activate', event => { // Al activarse el servidor
    event.waitUntil(
        caches.keys().then(keys => { //Obtener los nombres de los caches existentes
            return Promise.all( 
                keys.map(key => { //Recorrer caches existentes
                    if (key !== nombreCache) { // Si no coincide con el cache actual
                        return caches.delete(key); // Borra el caché viejo
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', event => { // Peticiones HTTP
    // Responde con recursos del caché si existen, si no, hace la petición normal a internet
    event.respondWith(
        caches.match(event.request) // Busca si la petición ya está en caché
            .then(res => {
                if (res) { // Si encontró una respuesta, la devuelve
                    return res;
                }
                return fetch(event.request);// Si no , hace la petición a la red
            })
    );
});

