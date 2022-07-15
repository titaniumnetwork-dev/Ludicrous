importScripts('/dip/dip.worker.js');
importScripts('/uv/uv.sw.js');
var DIP = new DIPServiceWorker('/dip/dip.config.js');
var UV = new UVServiceWorker();

self.addEventListener('fetch', (event) => {
  if (event.request.url.startsWith(location.origin+'/service/dip/')) return event.respondWith(
    DIP.fetch(event)
  );

  if (event.request.url.startsWith(location.origin+'/service/uv/')) return event.respondWith(
    UV.fetch(event)
  )
})