import type { NextPage } from 'next'
import Head from 'next/head'
import { IoAppsOutline, IoSettingsOutline } from "react-icons/io5";
import { FaGithub, FaEyeSlash } from "react-icons/fa";
import styles from '../styles/Home.module.css'
import { loadFull } from "tsparticles";
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
          navigator.serviceWorker.register('/sw.js', {scope: '/service'});
        
          location.href = '/service/uv/'+encodeURIComponent(url);
        } else {
          alert('ServiceWorker not supported');
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
  
const Home: NextPage = ({ particles }: any) => {
  var Router = useRouter();
  var win: any = global.window||{};

  if (global.window) {
    var main: any = function() {
      (document.getElementById(styles['main-page-init'])||document.body).style.opacity = '1';
    }
    
    window.addEventListener('load', function(e: any) {
      setTimeout(main, 1);
    });
  
    if (document.readyState=='complete') {
      setTimeout(main, 1);
    }

    //var form: any = document.getElementById(styles.form);
    //form.addEventListener('submit', formSubmit);
  }

  useEffect(() => {
    Router.prefetch('/options');
    Router.prefetch('/apps');
    Router.prefetch('/');
  });

  const Apps: any = () => {
    if (global.window) {
      (document.getElementById(styles['main-page-init'])||document.body).style.opacity = '0';
      
      setTimeout(function() {
        win.particles = particles;
        Router.replace('/apps')
      }, 150);
    }
  }

  const Settings: any = () => {
    if (global.window) {
    (document.getElementById(styles['main-page-init'])||document.body).style.opacity = '0';
      
      setTimeout(function() {
        win.particles = particles;
        Router.replace('/options')
      }, 150);
    }
  }

  const particlesInit: any = async (main: any) => {await loadFull(main)};

  const particlesLoaded: any = () => {};
    
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
          <div className={styles["main-page-about-init"]} id={"ab-cloak"} onClick={Settings}><IoSettingsOutline /></div>

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
              <div className={styles["main-page-stealth-switch"]}><FaEyeSlash /></div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};


export default Home
