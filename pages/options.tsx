import type { NextPage } from 'next'
import Head from 'next/head'
import { IoAppsOutline, IoHomeOutline, IoChevronDown } from "react-icons/io5";
import styles from '../styles/Settings.module.css'
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Close: Function = () => {
  if (global.window) {
    if (global.window.opener) global.window.close();
    global.window.history.go(-(global.window.history.length-1));
    global.window.location.replace('https://www.google.com/webhp')
  }
}

const g: any = global || {};

const upChevron: any = function() {
  var el: any = document.getElementsByClassName(styles['down-chevron']);

  if (el[0] && !el[0].style.transform) el[0].style.transform = 'rotate(180deg)'; else el[0].style.transform = '';

  var e = document.getElementById(styles['main-page-content']);
  
  if (el[0] && el[0].style.transform) {
    if (e) e.scroll(0,1);
  } else {
    if (e) e.scroll(0, 0);
  }
}

const aboutBlank: Function = (event: any) => {
  if (global.window) {
    var openWin: any = global.window.open('about:blank');

    openWin.document.write('<head><title>Classes</title><link rel="icon" type="image/png" href="https://ssl.gstatic.com/classroom/favicon.png"><style>body {margin:0;overflow:hidden}</style></head><body><iframe width="100%" height="100%" src="' + global.window.location.href + '" frameborder="0"></iframe></body>');
    openWin.document.close();

    Close();
  }
}

const scrollListener: any = (event: any) => {
  if (window.innerWidth<600) {return event.target.style.height = '75%'};
  
  var el: any = document.getElementsByClassName(styles['down-chevron']);
  
  if (event.target.scrollTop) {event.target.style.height = '75%'} else event.target.style.height = '';

  if (el[0] && event.target.scrollTop) el[0].style.transform = 'rotate(180deg)'; else el[0].style.transform = '';

  if (event.target.style.height) {
    var d = document.getElementById('apps-header');
    if (d) d.classList.remove(styles['apps-hidden']);
  } else {
    var d = document.getElementById('apps-header');
    if (d) d.classList.add(styles['apps-hidden']);
  }
}

const setTabTitle: any = function() {
  var input: any = document.getElementById('tab-cloak-input');

  if (input) {
    localStorage.setItem('__lud$title', input.value);
    
    document.title = input.value;
  }
}

if (global.window) {
  var win: any = global.window;
}

const setTabIcon: any = function() {
  var input: any = document.getElementById('tab-cloak-input');

  if (input) {
    localStorage.setItem('__lud$icon', input.value);

    win.__lud$icon = input.value;
  }
}

const resetTabInfo: any = function() {
  localStorage.removeItem('__lud$icon');
  localStorage.removeItem('__lud$title');

  win.__lud$icon = '/favicon.ico';
}

const Options: NextPage = ({particles}: any) => {
  const Router = useRouter();
  var win: any = global.window||{};

  useEffect(() => {
    Router.prefetch('/options');
    Router.prefetch('/apps');
    Router.prefetch('/');
  });

  if (global.window) {
    var main: any = function() {
      (document.getElementById(styles['main-page-content'])||document.body).scrollTop = 1;
      (document.getElementById(styles['inside-content-scroller'])||document.body).style.opacity = '1';

      var el: any = (document.getElementById('theme-select')||document.createElement('input'));

      el.value = g.localStorage.getItem('__lud$theme')||'dark';
  
      el.onchange = ((e: any)=>{var b: any = document.querySelector('#theme-select');g.localStorage.setItem('__lud$theme', b.value);g.window.__lud$theme=b.value;b.value=b.value});

      var el2: any = (document.getElementById('engine-select')||document.createElement('input'));

      el2.value = g.localStorage.getItem('__lud$engine')||'https://www.google.com/search?q=';

      var el3: any = (document.getElementById('stealth-select')||document.createElement('input'));

      el3.value = g.localStorage.getItem('__lud$method')||'stealth';

      var el4: any = (document.getElementById('proxy-select')||document.createElement('input'));

      el4.value = g.localStorage.getItem('__lud$proxy')||'Ultraviolet';
    }
    
    window.addEventListener('load', function(e: any) {
      setTimeout(main, 1);
    });
  
    if (document.readyState=='complete') {
      setTimeout(main, 1);
    }
  }
  
  const Home: any = () => {
    if (global.window) {
      (document.getElementById(styles['main-page-content'])||document.documentElement).scrollTop = 0;

      setTimeout(function() {
        var node: any = ((document.getElementById(styles['main-page-content'])||document.documentElement).childNodes[2]);

        node.style.opacity = '0';
      }, 250);
      
      setTimeout(function() {
        win.particles = particles;
        Router.replace('/');
      }, 400);
    }
  }

  const Apps: any = () => {
    if (global.window) {
      (document.getElementById(styles['main-page-content'])||document.documentElement).scrollTop = 0;

      setTimeout(function() {
        var node: any = ((document.getElementById(styles['main-page-content'])||document.documentElement).childNodes[2]);

        node.style.opacity = '0';
      }, 250);
      
      setTimeout(function() {
        win.particles = particles;
        Router.replace('/apps');
      }, 400);
    }
  }
  
  var win: any = global.window||{};
    
  return (
    <div className={styles.main}>
      <Head>
        <meta name="description" content="Ludicrous | A School Site" />
        <meta name="theme-color" content="#2467a5" />
        <meta charSet='utf-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover, maximum-scale=6'/>
        <title>Ludicrous - Settings</title>
        <link rel='manifest' href='/manifest.json' />
        <link href='/icons/favicon-16x16.png' rel='icon' type='image/png' sizes='16x16' />
        <link href='/icons/favicon-32x32.png' rel='icon' type='image/png' sizes='32x32' />
        <link rel='apple-touch-icon' href='/icons/apple-icon.png'></link>
      </Head>
  
      <main className={styles.main}>
        
        <div id={styles['main-page-content']} onScroll={scrollListener}>
          <div onClick={Apps} className={styles["main-page-apps-init"]} id="apps-init"><IoAppsOutline /></div>
          <div className={styles["main-page-about-init"]} id={"ab-cloak"} onClick={Home}><IoHomeOutline /></div>

          <div id={styles['inside-content-scroller']}>
            <h1 id={"apps-header"} className={styles['apps-hidden']} style={{transition: "0.25s ease"}}><span>Settings</span> <IoChevronDown className={styles['down-chevron']} onClick={upChevron} /></h1>

            <div id={styles['box-container']}>
              <div className={styles['settings-box']}>
                <h2>Tab Cloak</h2>
  
                <input id="tab-cloak-input" className={styles['settings-input']} placeholder="Enter tab title or icon url" />
                <button className={styles['settings-button']} onClick={setTabTitle} >Title</button>
                <button className={styles['settings-button']} onClick={setTabIcon} >Icon</button>
                <button className={styles['settings-button']} onClick={resetTabInfo} >Reset</button>
              </div>
  
              <div className={styles['settings-box']}>
                <h2>Theme</h2>
  
                <select id="theme-select" className={styles['theme-select']}>
                  <option value="light"> 
                    Light
                  </option>
                  <option value="dark"> 
                    Dark
                  </option>
                  <option value="fracital"> 
                    Fracital
                  </option>
                  <option value="illusive"> 
                    Illusive
                  </option>
                  <option value="contrast"> 
                    Tron
                  </option>
                </select>
              </div>

              <div className={styles['settings-box']}>
                <h2>Search Engine</h2>
  
                <select id="engine-select" className={styles['engine-select']} onChange={(e:any)=>{
                  var el: any = document.getElementById('engine-select');
                  g.localStorage.setItem('__lud$engine', el.value)
                }}>
                  <option value="https://www.google.com/search?q=">
                    Google 
                  </option>
                  <option value="https://duckduckgo.com/?q="> 
                    DuckDuckGo
                  </option>
                  <option value="https://search.brave.com/search?q=">
                    Brave
                  </option>
                  <option value="https://www.bing.com/search?q="> 
                    Bing
                  </option>
                </select>
              </div>

              <div className={styles['settings-box']}>
                <h2>About:Blank</h2>

                <button onClick={()=>{g.ludicrous.blank()}} className={styles['settings-button']}>
                  Activate
                </button>
              </div>

              <div className={styles['settings-box']}>
                <h2>Stealth</h2>
  
                <select id="stealth-select" className={styles['theme-select']} onChange={()=>{
                  var el: any = document.getElementById('stealth-select');

                  localStorage.setItem('__lud$method', el.value||'stealth');
                }}>
                  <option value="stealth"> 
                    On
                  </option>
                  <option value="normal"> 
                    Off
                  </option>
                </select>
              </div>

              <div className={styles['settings-box']}>
                <h2>Proxy [Backend]</h2>
  
                <select id="proxy-select" className={styles['theme-select']} onChange={()=>{
                  var el: any = document.getElementById('proxy-select');

                  localStorage.setItem('__lud$proxy', el.value||'Ultraviolet');
                }}>
                  <option value="Ultraviolet"> 
                    Ultraviolet
                  </option>
                  <option value="Dynamic"> 
                    Dynamic
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};


export default Options;
