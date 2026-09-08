const CACHE_NAME = 'proyector-ludico-v1';

// Acá van TODOS los archivos que necesita tu app para funcionar sin internet.
// Si agregás un animal nuevo en el futuro, tenés que sumarlo a esta lista.
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

// Instalar: Se descargan todos los archivos al caché
self.addEventListener('install', (evento) => {
    evento.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Archivos en caché con éxito');
                return cache.addAll(ARCHIVOS_CACHE);
            })
    );
});

// Activar: Limpia cachés viejos si alguna vez cambias el CACHE_NAME (ej: a v2)
self.addEventListener('activate', (evento) => {
    evento.waitUntil(
        caches.keys().then((nombresDeCache) => {
            return Promise.all(
                nombresDeCache.map((nombre) => {
                    if (nombre !== CACHE_NAME) {
                        return caches.delete(nombre);
                    }
                })
            );
        })
    );
});

// Interceptar peticiones: Si el usuario no tiene internet, le da el archivo del caché
self.addEventListener('fetch', (evento) => {
    evento.respondWith(
        caches.match(evento.request)
            .then((respuesta) => {
                // Si el archivo está en el caché, lo devuelve. Si no, lo va a buscar a internet.
                return respuesta || fetch(evento.request);
            })
    );
});