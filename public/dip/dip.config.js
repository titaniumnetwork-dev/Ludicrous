if (!self.__DIP) self.__DIP={};

self.__DIP.config = {
  prefix: '/service/dip/',
  encoding: 'base64',
  ws: true,
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
};