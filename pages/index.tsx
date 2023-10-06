import type { NextPage } from 'next'
import Head from 'next/head'
import { IoAppsOutline, IoSettingsOutline, IoGameControllerOutline, IoSearch, IoGlobe } from "react-icons/io5";
import { FaGithub, FaEyeSlash, FaEye } from "react-icons/fa";
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { renderToString } from 'react-dom/server'

const g: any = global || {};

const Close: Function = () => {
  if (global.window) {
    if (global.window.opener) global.window.close();
    global.window.history.go(-(global.window.history.length-1));
    global.window.location.replace('https://www.google.com/webhp')
  }
}

const stealthOn: any = () => {
  const eyeOpen: any = document.getElementById('eye-open');
  const eyeClosed: any = document.getElementById('eye-closed');

  eyeClosed.style.display = 'block';
  eyeOpen.style.display = 'none';
  
  localStorage.setItem('__lud$method', 'stealth')
}

const stealthOff: any = () => {
  const eyeOpen: any = document.getElementById('eye-open');
  const eyeClosed: any = document.getElementById('eye-closed');

  eyeOpen.style.display = 'block';
  eyeClosed.style.display = 'none';

  localStorage.setItem('__lud$method', 'normal')
}
  
const Home: NextPage = ({ particles }: any) => {
  var Router = useRouter();
  var win: any = global.window||{};

  const [ location, setLocation ] = useState<any>(win.location || {href: ''});

  useEffect(() => {
    Router.prefetch('/options');
    Router.prefetch('/apps');
    Router.prefetch('/');

    document.getElementById(styles.form)!.addEventListener('submit', (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();

      var data = `?${Object.entries(Object.fromEntries(new FormData(e.target as HTMLFormElement).entries())).map((entry: any) => entry.join('=')).join('&')}`;

      Router.push('/route'+data);
    });

    window.addEventListener('mousedown', (e) => {
      var container: any = document.getElementById('omnibox-container');

      if (!container) return;

      if (e.target !== document.getElementById(styles["main-input"]) && e.target !== container && !container.contains(e.target)) {
        container.style.display = "none";
      }

      if (e.target === document.getElementById(styles["main-input"])) {
        container.style.display = "block";
      }
    });

    document.getElementById('omnibox-container')!.querySelectorAll('.'+styles['omnibox-entry']).forEach((entry: any) => {
      entry.addEventListener('click', () => {
        (document.getElementById(styles["main-input"]) as HTMLInputElement)!.value = entry.querySelector('span')!.innerHTML;
        (document.getElementById(styles["main-input"])!.parentNode as HTMLFormElement)!.requestSubmit();
      });
    });

    (document.getElementById(styles['main-page-init'])||document.body).style.opacity = '1';

    var inputEl: any = document.getElementById(styles["main-input"]);
    inputEl.oninput = omniBox;

    if (localStorage.getItem('__lud$method')=='normal') {
      const eyeOpen: any = document.getElementById('eye-open');
      const eyeClosed: any = document.getElementById('eye-closed');
    
      eyeOpen.style.display = 'block';
      eyeClosed.style.display = 'none';
    }
  });

  const Apps: any = () => {
    if (global.window) {
      (document.getElementById(styles['main-page-init'])||document.body).style.opacity = '0';
      
      setTimeout(function() {
        win.particles = particles;
        Router.replace('/apps/')
      }, 150);
    }
  }

  const Games: any = () => {
    if (global.window) {
      (document.getElementById(styles['main-page-init'])||document.body).style.opacity = '0';
      
      setTimeout(function() {
        win.particles = particles;
        Router.replace('/games/')
      }, 150);
    }
  }

  const Settings: any = () => {
    if (global.window) {
    (document.getElementById(styles['main-page-init'])||document.body).style.opacity = '0';
      
      setTimeout(function() {
        win.particles = particles;
        Router.replace('/options/')
      }, 150);
    }
  }

  const omniBox: any = async (e: any) => {
    if (e.keyCode === 13) 
      return (document.getElementById(styles.form) as HTMLFormElement)!.requestSubmit();
    
    var val: any = document.getElementById(styles["main-input"]);
    var value = val.value + '';
    var container: any = document.getElementById('omnibox-container');

    if (value === '' && !value) {
      container.innerHTML = [
        {
          phrase: 'https://discord.com'
        },
        {
          phrase: 'https://www.youtube.com'
        },
        {
          phrase: 'https://reddit.com'
        },
        {
          phrase: 'https://twitter.com'
        },
        {
          phrase: 'https://play.geforcenow.com/mall'
        }
      ].map((entry: any) => {
        return `<div class="${styles['omnibox-entry']}">${renderToString(entry.phrase.match(/^http(s?):/) ? <IoGlobe style={{verticalAlign: '-2px'}} /> : <IoSearch style={{verticalAlign: '-2px'}} />)} <span>${entry.phrase}</span></div>`;
      }).join('');

      container.querySelectorAll('.'+styles['omnibox-entry']).forEach((entry: any) => {
        entry.addEventListener('click', () => {
          val.value = entry.querySelector('span')!.innerHTML;
          val.parentNode.requestSubmit();
        });
      });

      container.style.display = "block";

      return false;
    }
    
    var req = await fetch('/api/bare/v2/', {
      method: 'GET',
      headers: {
        'x-bare-host': 'duckduckgo.com',
        'x-bare-headers': JSON.stringify({Host: 'duckduckgo.com'}),
        'x-bare-path': '/ac/?q='+encodeURIComponent(value),
        'x-bare-port': '443',
        'x-bare-protocol': 'https:',
      }
    });

    if (value === val.value) {
      var list = await req.json();

      container.innerHTML = list.map((entry: any) => {
        return `<div class="${styles['omnibox-entry']}">${renderToString(entry.phrase.match(/^http(s?):/) ? <IoGlobe style={{verticalAlign: '-2px'}} /> : <IoSearch style={{verticalAlign: '-2px'}} />)} <span>${entry.phrase}</span></div>`;
      }).join('');

      container.querySelectorAll('.'+styles['omnibox-entry']).forEach((entry: any) => {
        entry.addEventListener('click', () => {
          val.value = entry.querySelector('span')!.innerHTML;
          val.parentNode.requestSubmit();
        });
      });

      container.style.display = "block";
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
        <title>Ludicrous</title>
        <link rel='manifest' href='/manifest.json' />
        <link href='/icons/favicon-16x16.png' rel='icon' type='image/png' sizes='16x16' />
        <link href='/icons/favicon-32x32.png' rel='icon' type='image/png' sizes='32x32' />
        <link rel='apple-touch-icon' href='/icons/apple-icon.png'></link>
      </Head>
  
      <main className={styles.main}>
        
        <div id={styles['main-page-content']}>
          
          <div onClick={Apps} className={styles["main-page-apps-init"]} id="apps-init"><IoAppsOutline /></div>
          <div onClick={Games} className={styles["main-page-games-init"]} id="games-init"><IoGameControllerOutline /></div>
          <div className={styles["main-page-about-init"]} id="ab-cloak" onClick={Settings}><IoSettingsOutline /></div>

          <div id={styles["main-page-init"]}>
            <h1 className={styles["main-title"]}><span>Ludicrous</span> <FaGithub style={{"cursor": "pointer"}} onClick={(e) => {window.open('https://github.com/TitaniumNetwork-Dev/Ludicrous');}} /></h1>
            <h2 className={styles["main-desc"]}>Surf the Unblo​cked Web</h2>
            <form method="GET" id={styles.form} action="/route">
              <input name="query" id={styles["main-input"]} onKeyDown={(event: any) => event.key == "Enter" ? (event.target as any)?.parentNode!.requestSubmit() : null} placeholder="Enter URL or Search Query" autoComplete="off" />
              <input title="hidden" placeholder="hidden" style={{position: "absolute", left: "-1000000000000px"}} value={location.href} name="origin" readOnly />
              <div id="omnibox-container" style={{display: "none"}} className={styles['omnibox-container']}>
                {
                  [
                    {
                      phrase: 'https://discord.com'
                    },
                    {
                      phrase: 'https://www.youtube.com'
                    },
                    {
                      phrase: 'https://reddit.com'
                    },
                    {
                      phrase: 'https://twitter.com'
                    },
                    {
                      phrase: 'https://play.geforcenow.com/mall'
                    }
                  ].map((entry: any) => {
                    return <div key={entry.phrase} className={styles['omnibox-entry']}>{ entry.phrase.match(/^http(s?):/) ? <IoGlobe style={{verticalAlign: '-2px'}} /> : <IoSearch style={{verticalAlign: '-2px'}} /> } <span>{ entry.phrase }</span></div>;
                  })
                }
              </div>
              <div id="eye-closed" className={styles["main-page-stealth-switch"]} onClick={stealthOff} title="stealth mode is on"><FaEyeSlash /></div>
              <div id="eye-open" style={{display:'none'}} className={styles["main-page-stealth-switch"]} onClick={stealthOn} title="stealth mode is off"><FaEye /></div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};


export default Home
