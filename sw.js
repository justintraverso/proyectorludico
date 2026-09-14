const CACHE_NAME = 'proyector-ludico-v5'; 

const ARCHIVOS_CACHE = [
    './',
    './index.html',
    './manifest.json',
    './favicon.png',
    './especies/1_AGUARA/1_AGUARA.png', './especies/1_AGUARA/1_AGUARA.mp3',
    './especies/2_ARMADO/2_ARMADO.png', './especies/2_ARMADO/2_ARMADO.mp3',
    './especies/3_BENTEVEO/3_BENTEVEO.png', './especies/3_BENTEVEO/3_BENTEVEO.mp3',
    './especies/4_CARDENAL/4_CARDENAL.png', './especies/4_CARDENAL/4_CARDENAL.mp3',
    './especies/5_CARPINCHO/5_CARPINCHO.png', './especies/5_CARPINCHO/5_CARPINCHO.mp3',
    './especies/6_CHICHARRA/6_CHICHARRA.png', './especies/6_CHICHARRA/6_CHICHARRA.mp3',
    './especies/7_ESCUERZO/7_ESCUERZO.png', './especies/7_ESCUERZO/7_ESCUERZO.mp3',
    './especies/8_MONO/8_MONO.png', './especies/8_MONO/8_MONO.mp3',
    './especies/9_PECARI/9_PECARI.png', './especies/9_PECARI/9_PECARI.mp3',
    './especies/10_RANITA/10_RANITA.png', './especies/10_RANITA/10_RANITA.mp3',
    './style/Inter.ttf'
];

self.addEventListener('install', (evento) => {
    evento.waitUntil(
        caches.open(CACHE_NAME).then(async (cache) => {
            for (let archivo of ARCHIVOS_CACHE) {
                try {
                    await cache.add(archivo);
                } catch (error) {
                    console.error('❌ Falló al guardar en caché:', archivo);
                }
            }
        })
    );
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        fetch(e.request)
            .then((res) => {
                return res;
            })
            .catch(() => {
                return caches.match(e.request);
            })
    );
});