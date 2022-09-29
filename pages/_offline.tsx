import type { NextPage } from 'next'
import Head from 'next/head'
import { IoAppsOutline, IoSettingsOutline } from "react-icons/io5";
import { FaGithub } from "react-icons/fa";
import styles from '../styles/Home.module.css';
import { loadFull } from "tsparticles";
import { useRouter } from 'next/router';
import { useEffect } from 'react'

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
  
const Offline: NextPage = ({ particles }: any) => {
  var Router = useRouter();

  var win: any = global.window||{};

  if (global.window) {
    var main: any = function() {
      (document.getElementById(styles['main-page-init'])||document.body).style.opacity = '1';
    }
    
    window.addEventListener('load', function(e: any) {
      setTimeout(main, performance.timing.responseEnd - performance.timing.responseStart+100);
    });
  
    if (document.readyState=='complete') {
      setTimeout(main, performance.timing.responseEnd - performance.timing.responseStart+100);
    }
  }

  useEffect(() => {
    Router.prefetch('/options');
    Router.prefetch('/apps');
    Router.prefetch('/');
  });

  const Apps: any = () => {
    if (global.window) {
      setTimeout(function() {
        (document.getElementById(styles['main-page-init'])||document.body).style.opacity = '0';
        win.particles = particles;
        Router.replace('/apps')
      }, 150);
    }
  }

  const Settings: any = () => {
    if (global.window) {
      setTimeout(function() {
        (document.getElementById(styles['main-page-init'])||document.body).style.opacity = '0';
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
        <meta name='viewport' content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' />
        <title>Ludicrous - Offline</title>
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
            <h3 className={styles["main-desc"]}>{"You're Offline!"}</h3>
          </div>
        </div>
      </main>
    </div>
  );
};


export default Offline;
