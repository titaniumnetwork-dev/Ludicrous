import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { loadFull } from "tsparticles";
import { useRouter } from 'next/router';
import { useEffect } from 'react'

const Close: Function = () => {
  if (global.window) {
    if (global.window.opener) global.window.close();
    global.window.history.go(-(global.window.history.length - 1));
    global.window.location.replace('https://www.google.com/webhp')
  }
}


const Blank: NextPage = ({ particles }: any) => {
  var Router = useRouter();
  var win: any = global.window || {};

  useEffect(() => {
    Router.prefetch('/options');
    Router.prefetch('/apps');
    Router.prefetch('/');
  });

  const Apps: any = () => {
    if (global.window) {
      (document.getElementById(styles['main-page-init']) || document.body).style.opacity = '0';
      setTimeout(function() {
        win.particles = particles;
        Router.replace('/apps')
      }, 150);
    }
  }

  const Settings: any = () => {
    if (global.window) {
      (document.getElementById(styles['main-page-init']) || document.body).style.opacity = '0';
      setTimeout(function() {
        win.particles = particles;
        Router.replace('/options')
      }, 150);
    }
  }

  setTimeout(function() {
    if (global.window) {
      setTimeout(function() {
        try {
          win.particles = particles;
          Router.replace(location.pathname);
        } catch {
          
        }
      }, 150);
    }
  }, 0);

  const particlesInit: any = async (main: any) => { await loadFull(main) };

  const particlesLoaded: any = () => { };

  return (
    <div className={styles.main}>
      <Head>
        <meta name="description" content="Ludicrous | A School Site" />
        <meta name="theme-color" content="#2467a5" />
        <meta charSet='utf-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' />
        <title>Ludicrous</title>
        <link rel='manifest' href='/manifest.json' />
        <link href='/icons/favicon-16x16.png' rel='icon' type='image/png' sizes='16x16' />
        <link href='/icons/favicon-32x32.png' rel='icon' type='image/png' sizes='32x32' />
        <link rel='apple-touch-icon' href='/icons/apple-icon.png'></link>

      </Head>

      <main className={styles.main}>

        <div id={styles['main-page-content']}>
          <div id={styles["main-page-init"]}>
          </div>
        </div>
      </main>
    </div>
  );
};


export default Blank
