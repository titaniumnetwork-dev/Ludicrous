import type { NextPage } from 'next'
import Head from 'next/head'
import { IoHomeOutline, IoSettingsOutline, IoChevronDown } from "react-icons/io5";
import styles from '../../styles/Log.module.css';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useRouter } from 'next/router';

const Close: Function = () => {
  if (global.window) {
    if (global.window.opener) global.window.close();
    global.window.history.go(-(global.window.history.length-1));
    global.window.location.replace('https://www.google.com/webhp')
  }
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

const scrollListener: any = (event: any) => {
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

const aboutBlank: Function = (event: any) => {
  if (global.window) {
    var openWin: any = global.window.open('about:blank');

    openWin.document.write('<head><title>Classes</title><link rel="icon" type="image/png" href="https://ssl.gstatic.com/classroom/favicon.png"><style>body {margin:0;overflow:hidden}</style></head><body><iframe width="100%" height="100%" src="' + global.window.location.href + '" frameborder="0"></iframe></body>');
    openWin.document.close();

    Close();
  }
}

const Changelog: NextPage = () => {
  const Router = useRouter();

  const Home: any = () => {
    if (global.window) {
      Router.replace('/');
    }
  }

  const Settings: any = () => {
    if (global.window) {
      Router.replace('/options')
    }
  }

  const particlesInit: any = async (main: any) => {await loadFull(main)};

  const particlesLoaded: any = (e: any) => {};
    
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
        <div id={styles['main-page-content']} onScroll={scrollListener}>
          <div onClick={Home} className={styles["main-page-apps-init"]} id="apps-init"><IoHomeOutline /></div>
          <div className={styles["main-page-about-init"]} id={"ab-cloak"} onClick={Settings}><IoSettingsOutline /></div>
          <div id={styles['inside-content-scroller']}>
            <h1 id={"apps-header"} className={styles['apps-hidden']} style={{transition: "0.25s ease"}}><span>v1.0</span> <IoChevronDown className={styles['down-chevron']} onClick={upChevron} /></h1>

            <hr className={styles['type-sep']} />

            <h2>Notes</h2>

            <p>
              
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Changelog
