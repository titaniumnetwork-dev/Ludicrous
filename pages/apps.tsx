import type { NextPage } from 'next'
import Head from 'next/head'
import { IoHomeOutline, IoSettingsOutline, IoChevronDown } from "react-icons/io5";
import styles from '../styles/Apps.module.css'
import { loadFull } from "tsparticles";
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

const aboutBlank: Function = (event: any) => {
  if (global.window) {
    var openWin: any = global.window.open('about:blank');

    openWin.document.write('<head><title>Classes</title><link rel="icon" type="image/png" href="https://ssl.gstatic.com/classroom/favicon.png"><style>body {margin:0;overflow:hidden}</style></head><body><iframe width="100%" height="100%" src="' + global.window.location.href + '" frameborder="0"></iframe></body>');
    openWin.document.close();

    Close();
  }
}

const flip: any = function(el: any) {
  for (var n = el; n.parentNode; n = n.parentNode) {
    if (el.parentNode.tagName == "SVG") {
      el = n;
      break;
    }

    continue;
  }

  if (el.style.transform) {
    el.style.transform = '';
  } else {
    el.style.transform = 'rotate(180deg)';
  }
}

const appsHide: any = function(e: any) {
  const div = document.getElementById(styles['launch-over']);

  if (div) div.classList.toggle(styles['visible']);

  if (div) if (div.classList.contains(styles['visible'])) location.hash = 'apps';

  flip(e.target);
}

const gamesHide: any = function(e: any) {
  const div = document.getElementById(styles['games-over']);

  if (div) div.classList.toggle(styles['visible']);

  if (div) if (div.classList.contains(styles['visible'])) location.hash = 'games';

  flip(e.target);
}

const exploitHide: any = function(e: any) {
  const div = document.getElementById(styles['exploits-over']);

  if (div) div.classList.toggle(styles['visible']);

  if (div) if (div.classList.contains(styles['visible'])) location.hash = 'exploits';

  flip(e.target);
}

const creditsHide: any = function(e: any) {
  const div = document.getElementById(styles['credits-over']);

  if (div) div.classList.toggle(styles['visible']);

  if (div) if (div.classList.contains(styles['visible'])) location.hash = 'credits';

  flip(e.target);
}

const Apps: NextPage = ({ apps, games, bookmarks, particles, origin }: any) => {
  const Router = useRouter();
  var win: any = global.window||{};

  useEffect(() => {
    Router.prefetch('/options');
    Router.prefetch('/apps');
    Router.prefetch('/');

    if (global.window) {
      (document.getElementById(styles['main-page-content'])||document.body).scrollTop = 1;
      (document.getElementById(styles['inside-content-scroller'])||document.body).style.opacity = '1';
      
      if (new URLSearchParams(location.search).get('origin')) {
        if (g.openFrame) g.openFrame(new URLSearchParams(location.search).get('origin'), false);
      }

      if (location.hash=='#credits') if(document.getElementById('creditshow')) {creditsHide({target:document.getElementById('creditshow')});};
      if (location.hash=='#games') if(document.getElementById('gameshow')) {gamesHide({target:document.getElementById('gameshow')});};
      if (location.hash=='#launch') if(document.getElementById('appshow')) {appsHide({target:document.getElementById('appshow')});};
      if (location.hash=='#exploits') if(document.getElementById('bookshow')) {exploitHide({target:document.getElementById('bookshow')});};
    }
  });

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

  const particlesInit: any = async (main: any) => {await loadFull(main)};
  
  const particlesLoaded: any = (e: any) => {};
    
  return (
    <div className={styles.main}>
      <Head>
        <meta name="description" content="Ludicrous | A School Site" />
        <meta name="theme-color" content="#2467a5" />
        <meta charSet='utf-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover, maximum-scale=6'/>
        <title>Ludicrous - Apps</title>
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
            <h1 id={"apps-header"} className={styles['apps-hidden']} style={{transition: "0.25s ease"}}><span>Apps</span> <IoChevronDown className={styles['down-chevron']} onClick={upChevron} /></h1>

            <hr className={styles['type-sep']} />

            <h2>Quick Launch <IoChevronDown className={styles['toggle-chevron']} onClick={appsHide} id="appshow" /></h2>
            <div id={styles['launch-over']}>
              {
                apps.map((app: any) => {
                  if (app.proxy==false) {
                    return (
                      <div onClick={noAppClicked} key={app.id} className={styles.app} ludicrous-launch-url={app.url}>
                        <img src={app.icon} alt='' />
                        <h3>{app.name}</h3>
                      </div>
                    )
                  }
                  
                  return (
                    <div onClick={appClicked} key={app.id} className={styles.app} ludicrous-launch-url={app.url}>
                      <img src={app.icon} alt='' />
                      <h3>{app.name}</h3>
                    </div>
                  )
                })
              }
            </div> 

            <hr className={styles['type-sep']} />

            <h2>Games <IoChevronDown className={styles['toggle-chevron']} onClick={gamesHide} id="gameshow" /></h2>
            <div id={styles['games-over']}>
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

            <hr className={styles['type-sep']} />

            <h2 id={styles['no-bottom-margin']}>Bookmarklets <IoChevronDown className={styles['toggle-chevron']} onClick={exploitHide} id="bookshow" /></h2>
            <h5>Drag to Bookmarks bar</h5>

            <div id={styles['exploits-over']}>
              {
                bookmarks.map((bookmark: any) => {
                  return (
                    <div className={styles['smol-exp-div']} key={bookmark.id} dangerouslySetInnerHTML={{
                      __html: (`
                        <a style="text-decoration: none;" href="${bookmark.code.replace(/\!\!\{origin\}/gi, origin)}">
                          <div class="${styles.app}">
                            <h3 style="top:0">${bookmark.name}</h3>
                            <p class="${styles.bdesc}">${bookmark.description}</p>
                          </div>
                        </a>
                      `)
                    }}>
                    </div>
                  )
                })
              }
            </div>

            <h2>Credits <IoChevronDown className={styles['toggle-chevron']} onClick={creditsHide} id="creditshow"/></h2>

            <div id={styles['credits-over']}>
              Me
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

Apps.getInitialProps = async function( { req } ) {
  if (req) {
    return {
      apps: [{name: 'GeForce Now', icon: '/icon/gfn.ico', url: 'https://play.geforcenow.com/mall/',},{name: 'Youtube', icon: '/icon/yt.ico', url: 'https://www.youtube.com',},{name: 'Google Search', icon: '/icon/google.ico', url: 'https://www.google.com/webhp',},{name: 'Reddit', icon: '/icon/reddit.ico', url: 'https://reddit.com',},{name: 'Discord', icon: '/icon/discord.ico', url: 'https://discord.com',},{name: 'now.gg', icon: '/icon/now.ico', url: 'https://now.gg',},{name: 'Twitter', icon: '/icon/twitter.ico', url: 'https://twitter.com',},{name: 'Github', icon: '/icon/git.ico', url: 'https://github.com',},{name: 'Webretro', icon: '/icon/retro.ico', url: '/webretro/', proxy: false},{name: 'Spotify', icon: '/icon/spot.ico', url: 'https://spotify.com',},{name: 'Replit', icon: '/icon/repl.ico', url: 'https://replit.com',},{name: 'Wikipedia', icon: '/icon/wiki.ico', url: 'https://wikipedia.org',},].map((e:any,i)=>{return {...e,id:i+1+''}}),
      bookmarks: [
        {name: 'LTBEEF + Ingot', code: `javascript:(function () {var a = document.createElement('script');a.src = '!!{origin}/scripts/ingot.min.js';document.body.appendChild(a);}())`,description: `LTBEEF (literally the best exploit ever found): Disables any extension with a nice UI. go to <b style="text-decoration: underline !important;" onclick="open('https://chrome.google.com/webstorex')">https://chrome.google.com/webstorex</b> and run the bookmarklet. <b>USES INGOT UI by Nebelung</b>`},
        {name: 'Flooder', code: `javascript:(e=>{var num=prompt('How Times Do You Want This Page To Show Up In your History?');done=false;x=window.location.href;for (var i=1; i<=num; i++){history.pushState(0, 0, i==num?x:i.toString());if(i==num){done=true}}if(done===true){alert('Flooding Successful!\n '+window.location.href+' \nIs Now In Your History '+num+(num==1?' time.':' Times. '))}})()`, description: `Flooder (history flooder): Floods your <i>History</i> with a set number of entries. Creator: waldo#9044`},
        {name: 'Stealth Tab', code: "javascript:document.write(`<style> iframe{margin:0px; border:none; padding:0px; outline:none} body{margin:0px}</style><iframe src = ${prompt('enter url')}' width = ${window.innerWidth} height = ${window.innerHeight} />`)", description: `Stealth Tab (Porta Proxy): Creates a block-free frame of any URL you want. Open a new tab, and use the bookmarklet. Creator: CoolElectronics#4683`},
        {name: 'Youtube', code: `javascript:(()=>{const hash=escape((new URLSearchParams(window.location.search).get('v'))); if (hash!==null){window.location.href='https://www.youtube-nocookie.com/embed/'+hash}})()`, description: 'Youtube: Unblocks blocked youtube videos. Go to a blocked youtube video and use the bookmarklet. Creator: SupremeRubisco#8061'}
      ].map((e:any,i)=>{return {...e,id:i+1+''}}),
      games: [{"name":"Minecraft","id":"minecraft"},{"name":"1v1 lol","id":"1v1lol"},{"name":"2048","id":"2048"},{"name":"A Dark Room","id":"adarkroom"},{"name":"Among Us","id":"amongus"},{"name":"ASCII Space","id":"asciispace"},{"name":"Asteroids","id":"asteroids"},{"name":"Astray","id":"astray"},{"name":"Back Country","id":"backcountry"},{"name":"Black Hole Square","id":"blackholesquare"},{"name":"Bounce Back","id":"bounceback"},{"name":"Breaklock","id":"breaklock"},{"name":"Breakout","id":"breakout"},{"name":"Captain Callisto","id":"captaincallisto"},{"name":"Chess","id":"chess"},{"name":"Chroma Incident","id":"chromaincident"},{"name":"Chrome Dino","id":"chromedino"},{"name":"Connect 3","id":"connect3"},{"name":"Cookie Clicker","id":"cookieclicker"},{"name":"Crossy Road","id":"crossyroad"},{"name":"Cut the Rope","id":"cuttherope"},{"name":"Dogeminer","id":"dogeminer"},{"name":"Edge not Found","id":"edgenotfound"},{"name":"Evil Glitch","id":"evilglitch"},{"name":"Factory Balls Forever","id":"factoryballsforever"},{"name":"Flappy Bird","id":"flappybird"},{"name":"Geometry Dash","id":"geometrydash"},{"name":"Hextris","id":"hextris"},{"name":"Konnekt","id":"konnekt"},{"name":"Ninja vs Evil Corp","id":"ninjavsevilcorp"},{"name":"Packa Bunchas","id":"packabunchas"},{"name":"Pacman","id":"pacman"},{"name":"Paper io","id":"paperio"},{"name":"Particle Clicker","id":"particleclicker"},{"name":"Pushback","id":"pushback"},{"name":"q1k3","id":"q1k3"},{"name":"Racer","id":"racer"},{"name":"Radius Raid","id":"radiusraid"},{"name":"Retro Bowl","id":"retrobowl"},{"name":"Retro Haunt","id":"retrohaunt"},{"name":"Road Blocks","id":"roadblocks"},{"name":"Run 3","id":"run3"},{"name":"Shuttle Deck","id":"shuttledeck"},{"name":"Sleeping Beauty","id":"sleepingbeauty"},{"name":"Slither io","id":"slitherio"},{"name":"Slope","id":"slope"},{"name":"Snake","id":"snake"},{"name":"Space Company","id":"spacecompany"},{"name":"Space Garden","id":"spacegarden"},{"name":"Space Huggers","id":"spacehuggers"},{"name":"Temple Run","id":"templerun"},{"name":"Tetris","id":"tetris"},{"name":"The Maze of Space Goblins","id":"themazeofspacegoblins"},{"name":"Tower Master","id":"towermaster"},{"name":"Trimps","id":"trimps"},{"name":"Underrun","id":"underrun"},{"name":"xx142-b2exe","id":"xx142-b2exe"}],
      origin: absoluteUrl(req).origin
    };
  } else if (global.window) {
    return {
      apps: [{name: 'GeForce Now', icon: '/icon/gfn.ico', url: 'https://play.geforcenow.com/mall/',},{name: 'Youtube', icon: '/icon/yt.ico', url: 'https://www.youtube.com',},{name: 'Google Search', icon: '/icon/google.ico', url: 'https://www.google.com/webhp',},{name: 'Reddit', icon: '/icon/reddit.ico', url: 'https://reddit.com',},{name: 'Discord', icon: '/icon/discord.ico', url: 'https://discord.com',},{name: 'now.gg', icon: '/icon/now.ico', url: 'https://now.gg',},{name: 'Twitter', icon: '/icon/twitter.ico', url: 'https://twitter.com',},{name: 'Github', icon: '/icon/git.ico', url: 'https://github.com',},{name: 'Webretro', icon: '/icon/retro.ico', url: '/webretro/', proxy: false},{name: 'Spotify', icon: '/icon/spot.ico', url: 'https://spotify.com',},{name: 'Replit', icon: '/icon/repl.ico', url: 'https://replit.com',},{name: 'Wikipedia', icon: '/icon/wiki.ico', url: 'https://wikipedia.org',},].map((e:any,i)=>{return {...e,id:i+1+''}}),
      bookmarks: [
        {name: 'LTBEEF + Ingot', code: `javascript:(function () {var a = document.createElement('script');a.src = '!!{origin}/scripts/ingot.min.js';document.body.appendChild(a);}())`,description: `LTBEEF (literally the best exploit ever found): Disables any extension with a nice UI. go to <b style="text-decoration: underline !important;" onclick="open('https://chrome.google.com/webstorex')">https://chrome.google.com/webstorex</b> and run the bookmarklet. <b>USES INGOT UI by Nebelung</b>`},
        {name: 'Flooder', code: `javascript:(e=>{var num=prompt('How Times Do You Want This Page To Show Up In your History?');done=false;x=window.location.href;for (var i=1; i<=num; i++){history.pushState(0, 0, i==num?x:i.toString());if(i==num){done=true}}if(done===true){alert('Flooding Successful!\n '+window.location.href+' \nIs Now In Your History '+num+(num==1?' time.':' Times. '))}})()`, description: `Flooder (history flooder): Floods your <i>History</i> with a set number of entries. Creator: waldo#9044`},
        {name: 'Stealth Tab', code: "javascript:document.write(`<style> iframe{margin:0px; border:none; padding:0px; outline:none} body{margin:0px}</style><iframe src = ${prompt('enter url')}' width = ${window.innerWidth} height = ${window.innerHeight} />`)", description: `Stealth Tab (Porta Proxy): Creates a block-free frame of any URL you want. Open a new tab, and use the bookmarklet. Creator: CoolElectronics#4683`},
        {name: 'Youtube', code: `javascript:(()=>{const hash=escape((new URLSearchParams(window.location.search).get('v'))); if (hash!==null){window.location.href='https://www.youtube-nocookie.com/embed/'+hash}})()`, description: 'Youtube: Unblocks blocked youtube videos. Go to a blocked youtube video and use the bookmarklet. Creator: SupremeRubisco#8061'}
      ].map((e:any,i)=>{return {...e,id:i+1+''}}),
      games: [{"name":"Minecraft","id":"minecraft"},{"name":"1v1 lol","id":"1v1lol"},{"name":"2048","id":"2048"},{"name":"A Dark Room","id":"adarkroom"},{"name":"Among Us","id":"amongus"},{"name":"ASCII Space","id":"asciispace"},{"name":"Asteroids","id":"asteroids"},{"name":"Astray","id":"astray"},{"name":"Back Country","id":"backcountry"},{"name":"Black Hole Square","id":"blackholesquare"},{"name":"Bounce Back","id":"bounceback"},{"name":"Breaklock","id":"breaklock"},{"name":"Breakout","id":"breakout"},{"name":"Captain Callisto","id":"captaincallisto"},{"name":"Chess","id":"chess"},{"name":"Chroma Incident","id":"chromaincident"},{"name":"Chrome Dino","id":"chromedino"},{"name":"Connect 3","id":"connect3"},{"name":"Cookie Clicker","id":"cookieclicker"},{"name":"Crossy Road","id":"crossyroad"},{"name":"Cut the Rope","id":"cuttherope"},{"name":"Dogeminer","id":"dogeminer"},{"name":"Edge not Found","id":"edgenotfound"},{"name":"Evil Glitch","id":"evilglitch"},{"name":"Factory Balls Forever","id":"factoryballsforever"},{"name":"Flappy Bird","id":"flappybird"},{"name":"Geometry Dash","id":"geometrydash"},{"name":"Hextris","id":"hextris"},{"name":"Konnekt","id":"konnekt"},{"name":"Ninja vs Evil Corp","id":"ninjavsevilcorp"},{"name":"Packa Bunchas","id":"packabunchas"},{"name":"Pacman","id":"pacman"},{"name":"Paper io","id":"paperio"},{"name":"Particle Clicker","id":"particleclicker"},{"name":"Pushback","id":"pushback"},{"name":"q1k3","id":"q1k3"},{"name":"Racer","id":"racer"},{"name":"Radius Raid","id":"radiusraid"},{"name":"Retro Bowl","id":"retrobowl"},{"name":"Retro Haunt","id":"retrohaunt"},{"name":"Road Blocks","id":"roadblocks"},{"name":"Run 3","id":"run3"},{"name":"Shuttle Deck","id":"shuttledeck"},{"name":"Sleeping Beauty","id":"sleepingbeauty"},{"name":"Slither io","id":"slitherio"},{"name":"Slope","id":"slope"},{"name":"Snake","id":"snake"},{"name":"Space Company","id":"spacecompany"},{"name":"Space Garden","id":"spacegarden"},{"name":"Space Huggers","id":"spacehuggers"},{"name":"Temple Run","id":"templerun"},{"name":"Tetris","id":"tetris"},{"name":"The Maze of Space Goblins","id":"themazeofspacegoblins"},{"name":"Tower Master","id":"towermaster"},{"name":"Trimps","id":"trimps"},{"name":"Underrun","id":"underrun"},{"name":"xx142-b2exe","id":"xx142-b2exe"}],
      origin: global.window.location.origin
    };
  } else {
    return {};
  }
}

export default Apps
