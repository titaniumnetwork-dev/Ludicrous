self.__uv$config = {
    prefix: '/~/uv/',
    bare: location.hostname == 'localhost' ? location.origin + '/api/bare/' : location.protocol + '//uv.' + location.host + '/',
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