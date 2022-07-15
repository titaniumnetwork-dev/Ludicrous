import * as enc from './encoding.ts';

const Encoding = {...enc.default}

export default {
  proxy: 'Ultraviolet',
  config: {
    'Ultraviolet': {
      prefix: '/service/uv/',
      bare: 'https://uv.holyub.xyz/',
      encodeUrl: Encoding.base64.encode,
      decodeUrl: Encoding.base64.decode,
      handler: '/uv/uv.handler.js',
      bundle: '/uv/uv.bundle.js',
      config: '/uv/uv.config.js',
      sw: '/uv/uv.sw.js',
    },
    'Dynamic': {
      prefix: '/service/dip/',
      encoding: 'base64',
      ws: true,
      encodeUrl: Encoding.base64.encode,
      decodeUrl: Encoding.base64.decode,
      cookies: true,
      worker: true,
      bare: {
        version: 2,
        path: 'https://uv.holyub.xyz/',
      },
      tab: {
        title: 'Dynamic Interception Proxy',
        icon: 'https://google.com/favicon.ico',
        ua: 'Mozilla/5.0 (X11; CrOS x86_64 14388.61.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.107 Safari/537.36'
      }
    },
    'Rammerhead': {},
  }
}