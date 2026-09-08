// CAMBIAMOS A v2 PARA FORZAR LA ACTUALIZACIÓN
const CACHE_NAME = 'proyector-ludico-v2'; 

const ARCHIVOS_CACHE = [
    './',
    './index.html',
    './manifest.json',
    './favicon.png',
    './1_AGUARA.png', './1_AGUARA.mp3',
    './2_ARMADO.png', './2_ARMADO.mp3',
    './3_BENTEVEO.png', './3_BENTEVEO.mp3',
    './4_CARDENAL.png', './4_CARDENAL.mp3',
    './5_CARPINCHO.png', './5_CARPINCHO.mp3',
    './6_CHICHARRA.png', './6_CHICHARRA.mp3',
    './7_ESCUERZO.png', './7_ESCUERZO.mp3',
    './8_MONO.png', './8_MONO.mp3',
    './9_PECARI.png', './9_PECARI.mp3',
    './10_RANITA.png', './10_RANITA.mp3'
];

self.addEventListener('install', (evento) => {
    evento.waitUntil(
        caches.open(CACHE_NAME).then(async (cache) => {
            // Guardamos UNO POR UNO. Si uno falla (por error de tipeo), no rompe el resto.
            for (let archivo of ARCHIVOS_CACHE) {
                try {
                    await cache.add(archivo);
                } catch (error) {
                    console.error('❌ Falló al guardar en caché (Revisar mayúsculas en GitHub):', archivo);
                }
            }
        })
    );
});

self.addEventListener('activate', (evento) => {
    evento.waitUntil(
        caches.keys().then((nombresDeCache) => {
            return Promise.all(
                nombresDeCache.map((nombre) => {
                    // Borramos la v1 vieja
                    if (nombre !== CACHE_NAME) {
                        return caches.delete(nombre);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (evento) => {
    evento.respondWith(
        // ignoreSearch evita que si el navegador pide "audio.mp3?v=1", no lo encuentre
        caches.match(evento.request, { ignoreSearch: true })
            .then((respuesta) => {
                return respuesta || fetch(evento.request);
            })
    );
});