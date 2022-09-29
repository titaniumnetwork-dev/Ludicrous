var doc = document.getElementById('online-offline-show');

if (!navigator.onLine) {
  doc.style.display = 'block';
}