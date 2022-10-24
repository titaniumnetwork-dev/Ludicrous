import type { NextPage } from 'next'
import Head from 'next/head'
import { IoAppsOutline, IoSettingsOutline, IoGameControllerOutline } from "react-icons/io5";
import { FaGithub, FaEyeSlash, FaEye } from "react-icons/fa";
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const g: any = global || {};

const Close: Function = () => {
  if (global.window) {
    if (global.window.opener) global.window.close();
    global.window.history.go(-(global.window.history.length-1));
    global.window.location.replace('https://www.google.com/webhp')
  }
}

if (global.window) {
  window.onload = function() {
    (document.querySelector('#'+styles["main-input"])||document.createElement('input')).addEventListener('keypress', (e: any) => {
      if (e.key=='Enter') {
        var url = (e.target.value).toString();
        
        if ('serviceWorker' in navigator) {
          
        } else {
          alert('ServiceWorker not supported: Falling back to Corrosion proxy.');
        }
      }
    });
  }
}

const formSubmit: any = (e: any) => {
  e.preventDefault();

  var val: any = (document.getElementById(styles['main-input'])||document.createElement('input'));
  val = val.value;

  g.openFrame('/route?query='+(val));
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

  if (global.window) {
    /*var main: any = function() {
      (document.getElementById(styles['main-page-init'])||document.body).style.opacity = '1';

      var inputEl: any = document.getElementById(styles["main-input"]);
      inputEl.oninput = omniBox;

      if (localStorage.getItem('__lud$method')=='normal') {
        const eyeOpen: any = document.getElementById('eye-open');
        const eyeClosed: any = document.getElementById('eye-closed');
      
        eyeOpen.style.display = 'block';
        eyeClosed.style.display = 'none';
      }
    }
    
    window.addEventListener('load', function(e: any) {
      setTimeout(main, 1);
    });
  
    if (document.readyState=='complete') {
      setTimeout(main, 10);
    }*/

    //var form: any = document.getElementById(styles.form);
    //form.addEventListener('submit', formSubmit);
  }

  useEffect(() => {
    Router.prefetch('/options');
    Router.prefetch('/apps');
    Router.prefetch('/');

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
    if ((!e.inputType&&!e.data)&&(document.getElementById('defaults')!.innerHTML!=='<option value="https://discord.com">Discord</option><option value="https://youtube.com">Youtube</option><option value="https://reddit.com">Reddit</option><option value="https://play.geforcenow.com/mall">GeForce Now</option>')) {
      var el: any = document.getElementById(styles['form']);
      el.submit();
      return false;
    }
    
    var val: any = document.getElementById(styles["main-input"]);
    var value = val.value+'';

    if (value==''&&!value) return document.getElementById('defaults')!.innerHTML='<option value="https://discord.com">Discord</option><option value="https://youtube.com">Youtube</option><option value="https://reddit.com">Reddit</option><option value="https://play.geforcenow.com/mall">GeForce Now</option>';
    
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

    if (value==val.value) {
      var list = await req.json();
      var datalist: any = document.getElementById('defaults');

      datalist.innerHTML = list.map((entry: any) => {
        return `<option value="${entry.phrase}" onclick="alert('hi')">${entry.phrase}</option>`
      }).join('');
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
            <h1 className={styles["main-title"]}><span>Ludicrous</span> <FaGithub style={{"cursor": "pointer"}} onClick={(e) => {window.open('https://github.com/ludicrousdevelopment/ludi');}} /></h1>
            <h2 className={styles["main-desc"]}>Surf the Unblo​cked Web</h2>
            <form method="GET" id={styles.form} action="/route">
              <input name="query" id={styles["main-input"]} placeholder="Enter URL or Search Query" list="defaults" autoComplete="off" />
              <datalist id="defaults" className={styles['list']}>
                <option value="https://discord.com">Discord</option>
                <option value="https://youtube.com">Youtube</option>
                <option value="https://reddit.com">Reddit</option>
                <option value="https://play.geforcenow.com/mall">GeForce Now</option>
              </datalist>
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
