import '../styles/globals.css';
import styles from '../styles/Global.module.css';
import Config from '../config';
import type { AppProps } from 'next/app';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { IoReload, IoClose, IoExpand, IoArrowBack, IoArrowForward, IoOpenOutline } from 'react-icons/io5';
import Script from 'next/script';
import Layout from '../components/layout'
import { useRouter } from 'next/router';

const particlesInit: any = async (main: any) => {await loadFull(main)};

const particlesLoaded: any = (e: any) => {e.canvas.element.style.zIndex = '1'};

const g: any = global;

g.console.error = new Proxy(g.console.error, {
  apply(t: any, g: any, a: any): any {
    if (a[0].toString().startsWith('Error: Loading initial props cancelled')) return false;

    return Reflect.apply(t, g, a);
  }
})

function Ludicrous({ Component, pageProps }: AppProps) {
  g.openFrame = async function(url: any, sw: Boolean = false, origin: URL = new URL(location.href)) {
    var el: any = document.getElementById(styles['game-frame']);

    if (!el.contentDocument) return false;

    if (origin && g.localStorage) {
      g.localStorage.setItem('__lud$origin', origin.origin);
    }

    el.contentDocument.open();

    el.contentDocument.write(`
<html data-theme="dark">
  <head>
    <script>
      document.documentElement.dataset.theme = localStorage.getItem('__lud$theme')||'dark';
    </script>
    <title>Loading...</title>
    <style>
      @import url('/font/index.css');

      *[data-theme="light"] {
        --page-bg: linear-gradient(-45deg, #747474, #4d5061, rgba(0 93 172));
        --main-bg: #2467a5;
        --text-color: white;
      }
  
      *[data-theme="fiwfhgnwghr"] {
        --page-bg: linear-gradient(-45deg,#d0d0d0,#87888e,#3770a0);
        --main-bg: #4f86b9;
        --text-color: white;
      }
      
      *[data-theme="dark"] {
        --page-bg: linear-gradient(-45deg,#000000,#000000,#114067);
        --main-bg: #091b2c;
        --text-color: white;
      }
      
      *[data-theme="fracital"] {
        --page-bg: linear-gradient(-45deg,#000,#222,#ff77fc);
        --main-bg: #282828;
        --text-color: #ff77fc;
      }
      
      *[data-theme="illusive"] {
        --page-bg: linear-gradient(-45deg,#000,#232323,#808080);
        --main-bg: #181818;
        --text-color: white;
      }
      
      body, html {
        margin: 0;
        background: var(--page-bg);
        background-size: 300% !important;
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Roboto', sans-serif;
        color: var(--text-color);
      }
    </style>
  </head>
  <body>
    <h1>Please Wait</h1>
    <script>
      window.status = function(e) {
        document.querySelector('h1').innerText = e;
      }

      history.replaceState(null, null, '/nolonger.html');
    </script>
  </body>
</html>
`);
    
    document.getElementById('proxy-frame')!.style.display = 'block';

    if (el.getAttribute('src')!==('/proxy.html')) document.getElementById(styles['game-frame'])!.setAttribute('src', '/proxy.html');

    if (sw==false) el.contentDocument.querySelector('h1').innerText = 'Redirecting';

    if (sw) el.contentDocument.querySelector('h1').innerText = 'Registering ServiceWorkers';
    
    if (!navigator.serviceWorker.controller && (g.ludicrous&&g.ludicrous.sw) && sw) {
      await g.ludicrous.sw();
    } 

    if (sw&&(el.contentWindow)) el.contentDocument.querySelector('h1').innerText = 'ServiceWorkers Registered';

    setTimeout(function() {
      if (sw&&(el.contentWindow)) el.contentDocument.querySelector('h1').innerText = 'Redirecting';

      if (!navigator.onLine) return el.contentDocument.querySelector('h1').innerText = 'Offline, Proxy no work :(';
      
      setTimeout(e=>(document.getElementById(styles['game-frame'])||document.body).setAttribute('src', url), 300);
    }, 250);
  }
  
  g.ludicrous = {
    mode: process.env.NODE_ENV,
    framework: 'next',
    blank: (e: any) => {
      var win: any = window.open();

      win.document.write(`<head><title>Classes</title><link rel="icon" href="${location.origin}/icon/classroom.png"></head><body><iframe src="${location.href}" style="width:100vw;height:100vh;border:0;outline:0;position:absolute;top:0;left:0;z-index:9999999;"></iframe></body>`);

      win.document.close();

      return win;
    },
    reload: (e: any) => {
      if (g.router) {
        let init = g.router.asPath;

        return g.router.replace("/blank").then(
          () => g.router.replace(init),
        );
      }

      throw new Error('No Global Router Object Found');
    },
    sw: async () => {
      if ('serviceWorker' in (g.navigator||{})) {
        for (var registration of await g.navigator.serviceWorker.getRegistrations()) {
          if (registration.scope.includes('/~/')) await registration.unregister();
        }
        
        await navigator.serviceWorker.register('/psw.js', {
          scope: Config.config.Ultraviolet.prefix,
        });

        await navigator.serviceWorker.register('/psw.js', {
          scope: Config.config.Dynamic.prefix,
        });

        await new Promise((resolve) => setTimeout(resolve, 1000));

        return true;
      } else return false;
    }
  }
  
  if (!g.particles) g.particles = <Particles
    id="tsparticles"
    init={particlesInit}
    loaded={particlesLoaded}
    options={{
      fpsLimit: 120,
      interactivity: {
        events: {
          resize: true,
        },
      },
      particles: {
        color: {
          value: "#ffffff",
        },
        move: {
          direction: "right",
          enable: true,
          outModes: {
            default: "out",
          },
          random: false,
          speed: 1,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 48,
        },
        opacity: {
          value: 0.6814501258678471,
          random: true,
          anim: {
            enable: true,
            speed: 0.24362316369040352,
            opacity_min: 0.03248308849205381,
            sync: false
          }
        },
        shape: {
          type: "circle",
        },
        size: {
          anim: {
            enable: true,
            speed: 2.872463273808071,
            size_min: 2.436231636904035,
            sync: false
          },
          value: { min: 2, max: 3 },
        },
      },
      detectRetina: true,
    }}
  />

  if (g.localStorage) {
    if (g.localStorage.getItem('__lud$proxy')) {
      Config.proxy = g.localStorage.getItem('__lud$proxy');
    }
  }

  var bareOffline = false;
  var ea: any = {};

  try {
    Object.defineProperty(ea, 'isOffline', {
      get() {
        return bareOffline;
      },
      set(val) {
        console.log(val);
        bareOffline = val;

        var el: any = document.querySelector('#online-offline-show');
        
        if (val&&el) el.style.display = 'block'
        if (!val&&el) el.style.display = 'none'
        
        return true;
      }
    })
  } catch {}

  g.router = useRouter();
  
  pageProps.config = Config;
  if (global.window) {
    window.ononline = function() {
      ea.isOffline = false;
    }

    window.onoffline = function() {
      ea.isOffline = true;
    }
    
    try {
      Object.defineProperty(window, '__lud$icon', {
        set(val) {
          var el: any = document.head.querySelector('link[rel="icon"]');

          if (el&&el.getAttribute('href')!==val) el.href = val;
        },
        get() {
          var el: any = document.head.querySelector('link[rel="icon"]');
          return el.href;
        }
      });
    } catch {};     

    try {
      Object.defineProperty(window, '__lud$theme', {
        configurable: true,
        set(val) {
          var el: any = document.querySelector('*[data-theme]');

          if (el&&el.dataset.theme!==val) el.dataset.theme = val;
        },
        get() {
          var el: any = document.querySelector('*[data-theme]');
          return el.dataset.theme;
        }
      });
    } catch {};     

    var win: any = window;
    
    setInterval(function() {
      if (localStorage.getItem('__lud$icon'))
        win.__lud$icon = localStorage.getItem('__lud$icon')||'/favicon.ico';
    }, 1);

    setInterval(function() {
      if (localStorage.getItem('__lud$title'))
        window.document.title = localStorage.getItem('__lud$title')||'';
    }, 1);
    
    if (localStorage.getItem('__lud$title')) {
      window.document.title = localStorage.getItem('__lud$title')||'';

      var des: any = Object.getOwnPropertyDescriptor(window.Document.prototype, 'title')||{};

      try {
      Object.defineProperty(window.document, 'title', {
        get() {
          return des.get.call(this);
        },
        set(val) {
          if (!localStorage.getItem('__lud$title')) return des.set.call(this, (document.querySelector('title')||{}).innerText);
          if (des.get.call(this)==localStorage.getItem('__lud$title')) return val;
          
          des.set.call(this, localStorage.getItem('__lud$title'));
          
          return val;
        }
      });
      } catch {};
    } else window.document.title = 'Ludicrous';

    const frame: any = document.getElementById(styles['game-frame']);

    if (frame) frame.loads = 0;

    const frameLoad: any = function(e: any) {
      if (frame) frame.loads++;
      
      clearInterval(frame.interval);
      
      var title: any = document.querySelector('.frame-title');
      var icon: any = document.querySelector('.frame-icon');

      if (!frame.contentDocument) return setTimeout(frameLoad, 1000);

      title.innerText = frame.contentDocument.title || frame.contentWindow.location.href;

      frame.interval = setInterval(function() {
        if (!frame.contentDocument) return clearInterval(frame.interval);

        var expected = frame.contentDocument.title || frame.contentWindow.location.href;

        if (title.innerText === expected) return;

        title.innerText = expected;
      }, 500);
    }

    if (frame) frame.onload = frameLoad;
  }

  const reloadFrame: any = function(e: any) {
    var frame: any = document.getElementById(styles['game-frame']);
    
    if (frame) frame.contentWindow.location.reload();
  }

  const closeFrame: any = function(e: any) {
    var e: any = document.querySelector('#proxy-frame');
    if (e) e.style.display = 'none';

    var origin = new URL(localStorage.getItem('__lud$origin') || location.href);

    if (origin.origin === location.origin) {
      return g.router.replace(origin.pathname);
    }

    return g.location!.href = origin;

    //location.href = '/';
  }

  const fullScreen: any = function(e: any) {
    var e: any = document.getElementById(styles['game-frame'])
    if (e) e.requestFullscreen();
  }

  const backward: any = function(e: any) {
    var frame: any = document.getElementById(styles['game-frame']);
    
    if (frame.contentWindow.history.state) return false;

    if (frame) frame.contentWindow.history.back();
  }

  const forward: any = function(e: any) {
    var frame: any = document.getElementById(styles['game-frame']);
    
    if (frame) frame.contentWindow.history.forward();
  }

  const newPage: any = function(e: any) {
    var frame: any = document.getElementById(styles['game-frame']);
    
    if (frame) window.open(frame.contentWindow.location.href);
  }

  if (g.window) {
    g.window.__lud$theme = g.localStorage.getItem('__lud$theme')||'dark';
  };
  
  return (
    <>
      <div data-theme="dark">
        <script async src="/data/index.js"></script>
        <div style={{
          background: 'red',
          border: '2px solid white',
          zIndex: '2',
          borderRadius: '3px',
          color: 'white',
          padding: '10px 20px',
          position: 'absolute',
          top: '10px',
          left: '10px',
          display: 'none',
        }} id="online-offline-show">Offline - Proxies and Games may not work.</div>
        <div id="proxy-frame" className={styles['game-div']}>
          <div id={styles['game-header']}>
            <div className="frame-icon" id={styles['frame-icon']}></div>
            <div className="frame-title" id={styles['frame-title']}>Loading...</div>   
  
            <div className="frame-close" onClick={closeFrame} id={styles['frame-close']}><IoClose /></div>
            <div className="frame-reload" onClick={reloadFrame} id={styles['frame-reload']}><IoReload /></div>
            <div className="frame-fullscr" onClick={fullScreen} id={styles['frame-full']}><IoExpand /></div>
            <div className="frame-open" onClick={newPage} id={styles['frame-open']}><IoOpenOutline /></div>    
  
            <div className="frame-for" onClick={forward} id={styles['frame-forward']}><IoArrowForward /></div>
            <div className="frame-back" onClick={backward} id={styles['frame-back']}><IoArrowBack /></div>       
          </div>
          <iframe src="/proxy.html" id={styles['game-frame']}></iframe>
        </div>
        <Layout particles={g.particles}>
          <Component {...pageProps} particles={''} ></Component>
        </Layout>
        <Script src="/main.js"></Script>
      </div>
    </>
  )
}

export default Ludicrous;
