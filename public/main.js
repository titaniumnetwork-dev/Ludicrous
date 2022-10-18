var doc = document.getElementById('online-offline-show');

if (!navigator.onLine) {
  doc.style.display = 'block';
}

setTimeout(() => {
    var $ = document.querySelectorAll.bind(document);
    var interval = setInterval(() => {
        var filter = 'filter: hue-rotate(180deg)'
        try {
            $('#arc-widget-launcher-iframe')[0].contentWindow.document.querySelector('#launcher').style.background = window.getComputedStyle($('main div main div')[0], null).getPropertyValue('background');
            document.getElementById('arc-popper-iframe').contentWindow.document.querySelector('#popper header').style['backgroundImage'] = 'linear-gradient(238deg, rgb(59, 174, 255) 1%, rgb(88, 124, 255) 100%)';
            clearInterval(interval)
        } catch (err) {}
    }, 5)
}, 200)