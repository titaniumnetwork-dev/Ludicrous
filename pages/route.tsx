import type { NextPage } from 'next'
import Script from 'next/script';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const g: any = global || {};

const Route: NextPage = ( { config }: any ): any => {
  var [ location, setLocation ] = useState(g.location || { href: '' });
  var urlEnc = config.config[config.proxy].encodeUrl;
  var enc = (e: any) => urlEnc(e).replace(new RegExp("\\/$", "g"), '');  

  (useEffect as any)(() => {
    (async () => {
      document.getElementById('proxy-frame')!.style.display = 'block';

      const params: any = new URL(location.href).searchParams;
      const engine = localStorage.getItem('__lud$engine') || 'https://www.google.com/search?q=';
      var xor = {key: 2};    
      var url: NonNullable<any> = new self.URLSearchParams(location.search).get('query');
      
      async function init() {if (g.openFrame) await g.openFrame(`${config.config[config.proxy].prefix}`+enc(url).replace(/\/$/g, ''), true, new URL(params.origin || location.href));document.querySelector('iframe')!.removeEventListener('load', init)};

      if ('serviceWorker' in navigator) {

        if (!url.startsWith('https:') && !url.startsWith('http:')) {
          url = engine + encodeURIComponent(url);
        }

        if (localStorage.getItem('__lud$method')=='normal') {
          open(`${config.config[config.proxy].prefix}`+enc(url).replace(/\/$/g, ''));

          (document.querySelector('.frame-close') as HTMLElement)!.click();
        } else {
          await init();
        }
      } else {
        if (localStorage.getItem('__lud$method')=='normal') {
          open("/api/~/corrosion/"+enc(url).replace(/\/$/g, ''));

          (document.querySelector('.frame-close') as HTMLElement)!.click();
        } else {
          g.openFrame("/api/~/corrosion/"+enc(url).replace(/\/$/g, ''), true, new URL(params.origin || location.href));
        }
      }
    })();
  }, []);
  
  const Router = useRouter();
  
  return (
    <>
      <div onLoad={() => setLocation({ href: Router.asPath })}></div>
    </>
  );
}

/*Route.getInitialProps = (load) => {
  console.log(load)
  return load
}*/

export default Route;