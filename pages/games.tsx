import type { NextPage } from 'next'
import Head from 'next/head'
import { IoHomeOutline, IoSettingsOutline, IoChevronDown } from "react-icons/io5";
import styles from '../styles/Apps.module.css'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import absoluteUrl from 'next-absolute-url'

const Close: Function = () => {
  if (global.window) {
    if (global.window.opener) global.window.close();
    global.window.history.go(-(global.window.history.length-1));
    global.window.location.replace('https://www.google.com/webhp')
  }
}

const g: any = global || {};

const appClicked: any = function(event: any) {
  if (!event.nativeEvent.path) var el = event.nativeEvent.target.getAttribute('ludicrous-launch-url')?event.nativeEvent.target:event.nativeEvent.target.parentNode;
  else var el = (event.nativeEvent.path||[]).find((e:any)=>e.classList&&e.classList.contains(styles['app']));

  var app = el.getAttribute('ludicrous-launch-url');

  location.href = '/route?query='+(encodeURIComponent(app));
}

const noAppClicked: any = function(event: any) {
  if (!event.nativeEvent.path) var el = event.nativeEvent.target.getAttribute('ludicrous-launch-url')?event.nativeEvent.target:event.nativeEvent.target.parentNode;
  else var el = (event.nativeEvent.path||[]).find((e:any)=>e.classList&&e.classList.contains(styles['app']));

  var app = el.getAttribute('ludicrous-launch-url');

  if (g.openFrame) g.openFrame(app, false);
  history.pushState(null, '', location.pathname+'?origin='+app);
}

const gameClicked: any = function(event: any) {
  if (!event.nativeEvent.path) var el = event.nativeEvent.target.getAttribute('ludicrous-launch-url')?event.nativeEvent.target:event.nativeEvent.target.parentNode;
  else var el = (event.nativeEvent.path||[]).find((e:any)=>e.classList&&e.classList.contains(styles['app']));

  var app = el.getAttribute('ludicrous-launch-url');

  if (g.openFrame) g.openFrame('/gfiles/html5/'+app+'/', false);
  history.pushState(null, '', location.pathname+'?origin=/gfilesgfiles/html5/'+app+'/');
}

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

var times: any = 0;

const scrollListener: any = (event: any) => {
  if (window.innerWidth<600) {return event.target.style.height = '75%'};
  if (times>1&&window.innerWidth<600) return;
  
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

  times++;
}

const Games: NextPage = ({ apps, games, bookmarks, particles, origin }: any) => {
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
    }
    
    window.addEventListener('load', function(e: any) {
      setTimeout(main, 1);
    });
  
    if (document.readyState=='complete') {
      setTimeout(main, 1);
    }

    if (new URLSearchParams(location.search).get('origin')) {
      if (g.openFrame) g.openFrame(new URLSearchParams(location.search).get('origin'), false);
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

  const Settings: any = () => {
    if (global.window) {
      (document.getElementById(styles['main-page-content'])||document.documentElement).scrollTop = 0;

      setTimeout(function() {
        var node: any = ((document.getElementById(styles['main-page-content'])||document.documentElement).childNodes[2]);

        node.style.opacity = '0';
      }, 250);
      
      setTimeout(function() {
        win.particles = particles;
        Router.replace('/options');
      }, 400);
    }
  }
    
  return (
    <div className={styles.main}>
      <Head>
        <meta name="description" content="Ludicrous | A School Site" />
        <meta name="theme-color" content="#2467a5" />
        <meta charSet='utf-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover, maximum-scale=6'/>
        <title>Ludicrous - Games</title>
        <link rel='manifest' href='/manifest.json' />
        <link href='/icons/favicon-16x16.png' rel='icon' type='image/png' sizes='16x16' />
        <link href='/icons/favicon-32x32.png' rel='icon' type='image/png' sizes='32x32' />
        <link rel='apple-touch-icon' href='/icons/apple-icon.png'></link>
      </Head>
  
      <main className={styles.main}>

        <div id={styles['main-page-content']} onScroll={scrollListener}>
          <div onClick={Home} className={styles["main-page-apps-init"]} id="apps-init"><IoHomeOutline /></div>
          <div className={styles["main-page-about-init"]} id={"ab-cloak"} onClick={Settings}><IoSettingsOutline /></div>
          <div id={styles['inside-content-scroller']}>
            <h1 id={"apps-header"} className={styles['apps-hidden']} style={{transition: "0.25s ease"}}><span>Games</span> <IoChevronDown className={styles['down-chevron']} onClick={upChevron} /></h1>

            <div id={styles['games-over']} style={{overflow: 'visible'}}>
              {
                games.map((game: any) => {
                  return (
                    <div key={game.id} onClick={gameClicked} ludicrous-launch-url={game.id} className={styles.app}>
                      <img src={'/img/'+game.id+'.png'} alt='' />
                      <h3>{game.name}</h3>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

Games.getInitialProps = async function( { req } ) {

  if (req) {
    const protocol = req.headers['x-forwarded-proto'] || 'http'
    const baseUrl = req ? `${protocol}://${req.headers.host}` : ''
  
    const res = await fetch(baseUrl + '/api/apps')
    const json = await res.json();
    
    return {apps: json[0], games: json[2], bookmarks: json[1], origin: absoluteUrl(req).origin}
  } else if (global.window) {
  
    const res = await fetch(global.window.location.origin + '/api/apps')
    const json = await res.json();

    return {apps: json[0], games: json[2], bookmarks: json[1], origin: global.window.location.origin};
  }
}


export default Games
