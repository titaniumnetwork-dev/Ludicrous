import type { NextPage } from 'next'
import Head from 'next/head'
import { IoAppsOutline, IoSettingsOutline } from "react-icons/io5";
import { FaGithub, FaEyeSlash } from "react-icons/fa";
import Image from 'next/image'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import Script from 'next/script';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Close: Function = () => {
  if (global.window) {
    if (global.window.opener) global.window.close();
    global.window.history.go(-(global.window.history.length-1));
    global.window.location.replace('https://www.google.com/webhp')
  }
}

const Home: NextPage = ({ exploits }) => {
  var Router = useRouter();

  const Apps: Function = () => {
    if (global.window) {
      Router.replace('/apps')
    }
  }

  const Settings: Function = () => {
    if (global.window) {
      Router.replace('/options')
    }
  }

  const particlesInit: Function = async (main) => {await loadFull(main)};

  const particlesLoaded: Function = () => {};
    
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
          
          <div onClick={Apps} className={styles["main-page-apps-init"]} id="apps-init"><IoAppsOutline /></div>
          <div className={styles["main-page-about-init"]} id={"ab-cloak"} onClick={Settings}><IoSettingsOutline /></div>

          <div id={styles["main-page-init"]}>
            <h1 className={styles["main-title"]}><span>Ludicrous</span> <FaGithub onClick={(e) => {window.open('https://github.com/ludicrousdevelopment/ludi');}} /></h1>
            <h3 className={styles["main-desc"]}>Surf the Unblo​cked Web</h3>
            <form method="GET" id={styles.form} action="/route">
              <input name="query" id={styles["main-input"]} placeholder="Enter URL or Search Query" list="defaults" autoComplete="off" />
              <div className={styles["main-page-stealth-switch"]}><FaEyeSlash /></div>
            </form>
          </div>
        </div>
        <div className="exploits">
          {
            exploits.map(exploit => {
              /*return (
                <div key={exploit.id}>
                  <h1>{exploit.name}</h1>
                </div>
              )*/
            })
          }
        </div>
      </main>
    </div>
  );
};

Home.getInitialProps = async function( { req } ) {

  if (req) {
    const protocol = req.headers['x-forwarded-proto'] || 'http'
    const baseUrl = req ? `${protocol}://${req.headers.host}` : ''
  
    const res = await fetch(baseUrl + '/api/exploits')
    const json = await res.json();

    return {exploits: json}
  } else if (global.window) {
  
    const res = await fetch(global.window.location.origin + '/api/exploits')
    const json = await res.json();

    return {exploits: json}
  }
}


export default Home
