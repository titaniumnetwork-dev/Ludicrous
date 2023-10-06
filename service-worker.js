/*self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('pwa-assets').then(cache=>{
      (self.__WB_MANIFES(T).map(e=>e.url)).forEach(e=>cache.add(e))
    })
  )
})*/

async function cacheHandler(event) {
  if (new URL(event.request.url).origin !== location.origin) return await fetch(event.request);
  var { request } = event;

  var cache = await caches.open('pwa-assets');

  if (request.method=='GET' && (request.url.startsWith('https:') || request.url.startsWith('http:')) && request.destination == "font") cache.add(request);

  if (await cache.match(event.request)) return await cache.match(event.request);

  return await fetch(request);
}

self.addEventListener('fetch', function(event) {
  event.respondWith(
    cacheHandler(event)
  );
});

self.__WB_MANIFEST