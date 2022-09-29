import type { NextPage } from 'next';
import Script from 'next/script';
import Head from 'next/head';

const g: any = global || {};

const Retro: NextPage = (): any => {
  
  return (
    <>
      <Head>
        <meta name="description" content="Ludicrous | A School Site" />
        <meta name="theme-color" content="#2467a5" />
        <meta charSet='utf-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover, maximum-scale=6'/>
        <title>Ludicrous - WebRetro</title>
        <link rel='manifest' href='/manifest.json' />
        <link href='/icons/favicon-16x16.png' rel='icon' type='image/png' sizes='16x16' />
        <link href='/icons/favicon-32x32.png' rel='icon' type='image/png' sizes='32x32' />
        <link rel='apple-touch-icon' href='/icons/apple-icon.png'></link>
      </Head>
      
      <iframe style={{
        zIndex: '99',
        height: '100vh',
        width: '100vw',
        border: 'none',
        outline: 'none',
        position: 'absolute',
        top: '0',
        left: '0',
      }}></iframe>
      
      <Script id="archsrcscript">
        {
          `
          document.querySelector('iframe').src = "/webretro/index.html"+location.search;

          document.querySelector('iframe').addEventListener('load', function() {
            history.pushState(null, null, document.querySelector('iframe').contentWindow.location.href.replace('index.html', ''));
          });
          `
        }
      </Script>
    </>
  );
}

export default Retro;