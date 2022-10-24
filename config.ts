import * as enc from './encoding';

const Encoding: any = {...enc.default}

export default {
  proxy: 'Ultraviolet',
  config: {
    'Ultraviolet': {
      prefix: '/~/uv/',
      encodeUrl: Encoding.xor.encode,
      decodeUrl: Encoding.xor.decode,
    },
    'Dynamic': {
      prefix: '/~/dip/',
      encodeUrl: Encoding.xor.encode,
      decodeUrl: Encoding.xor.decode,
    },
    'Rammerhead': {/*will be done soon probably*/},
  }
}