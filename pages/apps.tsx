import type { NextComponentType, NextPage, NextPageContext } from 'next'
import Head from 'next/head'
import { IoAppsSharp, IoHomeOutline, IoSettingsOutline } from "react-icons/io5";
import Image from 'next/image'
import { useState } from 'react'
import styles from '../styles/Apps.module.css'
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import Script from 'next/script'
import { useRouter } from 'next/router';
import Link from 'next/link';

const Close: Function = () => {
  if (global.window) {
    if (global.window.opener) global.window.close();
    global.window.history.go(-(global.window.history.length-1));
    global.window.history.location.replace('https://www.google.com/webhp')
  }
}

const aboutBlank: Function = (event) => {
  if (global.window) {
    var openWin = global.window.open('about:blank');

    openWin.document.write('<head><title>Classes</title><link rel="icon" type="image/png" href="https://ssl.gstatic.com/classroom/favicon.png"><style>body {margin:0;overflow:hidden}</style></head><body><iframe width="100%" height="100%" src="' + global.window.location.href + '" frameborder="0"></iframe></body>');
    openWin.document.close();

    Close();
  }
}

const Apps: NextPage = ({ apps }) => {
  const Router = useRouter();

  const Home: Function = () => {
    if (global.window) {
      Router.replace('/');
    }
  }

  const Settings: Function = () => {
    if (global.window) {
      Router.replace('/options')
    }
  }

  const particlesInit = async (main) => {await loadFull(main)};

  const particlesLoaded = () => {};
    
  return (
    <div className={styles.main}>
      <Head>
        <title>Ludicrous</title>
        <meta name="description" content="Ludicrous | A School Site" />
        <meta name="theme-color" content="#2467a5" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
  
      <main className={styles.main}>
        <Particles
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
        <div id={styles['main-page-content']}>
          <div onClick={Home} className={styles["main-page-apps-init"]} id="apps-init"><IoHomeOutline /></div>
          <div className={styles["main-page-about-init"]} id={"ab-cloak"} onClick={Settings}><IoSettingsOutline /></div>
          {
            apps.map(app => {
              return (
                <div key={app.id} className={styles.app}>
                  <h2>{app.name}</h2>
                </div>
              )
            })
          }
        </div>
      </main>
    </div>
  );
};

Apps.getInitialProps = async function( { req } ) {

  if (req) {
    const protocol = req.headers['x-forwarded-proto'] || 'http'
    const baseUrl = req ? `${protocol}://${req.headers.host}` : ''
  
    const res = await fetch(baseUrl + '/api/apps')
    const json = await res.json();

    return {apps: json}
  } else if (global.window) {
  
    const res = await fetch(global.window.location.origin + '/api/apps')
    const json = await res.json();

    return {apps: json}
  }
}


export default Apps
