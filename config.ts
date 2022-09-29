import * as enc from './encoding';

const Encoding: any = {...enc.default}

export default {
  proxy: 'Ultraviolet',
  config: {
    'Ultraviolet': {
      prefix: '/~/uv/',
      bare: 'https://tomp.app/',
      encodeUrl: Encoding.xor.encode,
      decodeUrl: Encoding.xor.decode,
      handler: '/uv/uv.handler.js',
      bundle: '/uv/uv.bundle.js',
      config: '/uv/uv.config.js',
      sw: '/uv/uv.sw.js',
    },
    'Dynamic': {
      prefix: '/~/dip/',
      encoding: 'plain',
      ws: true,
      encodeUrl: Encoding.xor.encode,
      decodeUrl: Encoding.xor.decode,
      cookies: true,
      worker: true,
      bare: {
        version: 2,
        path: 'https://tomp.app/',
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