import type { NextPage } from 'next'
import Script from 'next/script';
import { useRouter } from 'next/router';

const g: any = global || {};

const Route: NextPage = ( { config }: any ): any => {
  if (global.window) {
    
  }
  
  const Router = useRouter();
  
  var urlEnc = config.config[config.proxy].encodeUrl;
  
  return (
    <Script id="script-route">
      {`
        (async function() {
          const engine = localStorage.getItem('__lud$engine')||'https://www.google.com/search?q=';
          
          if ('serviceWorker' in navigator) {
          
            var xor = {key: 2};
            var enc = (e) => ${urlEnc.toString()}(e).replace(new RegExp("\\/$", "g"), '');

            var url = new self.URLSearchParams(location.search).get('query');

            if (!url.startsWith('https:')&&!url.startsWith('http:')) {
              url = engine+encodeURIComponent(url);
            }

            if (localStorage.getItem('__lud$method')=='normal') {
              open("${config.config[config.proxy].prefix}"+enc(url).replace(/\\/$/g, ''));

              return document.querySelector('.frame-close').click();
            }

            async function init() {if (window.openFrame) await window.openFrame("${config.config[config.proxy].prefix}"+enc(url).replace(/\\/$/g, ''), true);document.querySelector('iframe').removeEventListener('load', init)};
            await init();
          } else {
            if (localStorage.getItem('__lud$method')=='normal') {
              open("/api/~/corrosion/"+enc(url).replace(/\\/$/g, ''));

              return document.querySelector('.frame-close').click();
            }

            window.openFrame("/api/~/corrosion/"+enc(url).replace(/\\/$/g, ''), true)
          };
        })();
      `}
    </Script>
  );
}

/*Route.getInitialProps = (load) => {
  console.log(load)
  return load
}*/

export default Route;