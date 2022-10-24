if (!self.__DIP) self.__DIP={};

self.__DIP.config = {
  prefix: '/~/dip/',
  encoding: 'xor',
  ws: true,
  cookies: true,
  worker: true,
  bare: {
    version: 2,
    path: location.origin.indexOf('.repl.co')==-1?(location.protocol+'//uv.'+location.host+'/'):location.origin+'/api/bare/',
  },
  tab: {
    title: 'Dynamic Interception Proxy',
    icon: 'https://google.com/favicon.ico',
    ua: 'Mozilla/5.0 (X11; CrOS x86_64 14388.61.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.107 Safari/537.36'
  }
};

if (self.__DIP.config.bare.path==(location.protocol+'//uv.'+location.host+'/')) {
  fetch(location.protocol+'//uv.'+location.host+'/').then(e=>null).catch(e=>self.__DIP.config.bare.path=location.origin+'/api/bare/');
}