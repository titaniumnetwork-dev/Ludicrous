(async function() {
  if (self.ludicrous && self.ludicrous.sw) {
    (await self.ludicrous.sw());
    await navigator.serviceWorker.ready;
  } 
  
  if ('serviceWorker' in navigator) {
    setTimeout(`location.reload()`, 2000);
  }
})();