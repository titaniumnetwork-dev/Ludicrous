importScripts('/dip/dip.worker.js');
importScripts('/uv/uv.sw.js');

const DIP = new DIPServiceWorker('/dip/dip.config.js');
const UV = new UVServiceWorker();

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});

async function fetchHandler(event) {
  const request = event.request;
  
  if (event.request.url.startsWith(location.origin+'/~/dip')) return await DIP.fetch(event);
  if (event.request.url.startsWith(location.origin+'/~/uv')) return await UV.fetch(event);

  return fetch(event.request);
}

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetchHandler(event)
  );
}
