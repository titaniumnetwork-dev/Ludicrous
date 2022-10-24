self.__uv$config = {
    prefix: '/~/uv/',
    bare: location.origin.indexOf('.repl.co')==-1?(location.protocol+'//uv.'+location.host+'/'):location.origin+'/api/bare/',
    encodeUrl: Ultraviolet.codec.xor.encode,
    decodeUrl: Ultraviolet.codec.xor.decode,
    handler: '/uv/uv.handler.js',
    bundle: '/uv/uv.bundle.js',
    config: '/uv/uv.config.js',
    sw: '/uv/uv.sw.js',
};

if (self.__uv$config.bare==(location.protocol+'//uv.'+location.host+'/')) {
  fetch(location.protocol+'//uv.'+location.host+'/').then(e=>null).catch(e=>self.__uv$config.bare=location.origin+'/api/bare/');
}