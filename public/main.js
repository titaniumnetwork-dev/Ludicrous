var doc = document.getElementById('online-offline-show');

if (!navigator.onLine) {
  doc.style.display = 'block';
}

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
        if (registrations.length !== 3)
            return window.ludicrous.sw();
    });
}
