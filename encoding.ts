const xor: any = {
  key: 2,
  encode(str: String | undefined, key: number) {
    if (!key) key = xor.key;
    if (!str) return str;
    var encoded: any = eval(`encodeURIComponent((str).split('').map((char,ind)=>ind%2?String.fromCharCode(char.charCodeAt()^2):char).join(''));`);
    if (!encoded.endsWith('/')) return encoded;
    else return encoded
  },
  decode(str: string | undefined, key: Number | String | undefined) {
    if (!key) key = xor.key;
    if (!str) return str;
    str = str.replace(new RegExp('\/$', 'g'), '');
    var encoded: any = eval(`(decodeURIComponent(str).split('').map((char, ind) => ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 2) : char).join(''));`);
    return encoded;
  }
}

const plain: any = {
  encode(str: string | undefined) {
    if (!str) return str;
    var encoded = (str)
    return encoded;
  },
  decode(str: string | undefined) {
    if (!str) return str;
    var encoded = decodeURIComponent(decodeURIComponent(str));
    return str.replace('https://','https:/').replace('https:/','https://');
  }
}

const base64: any = {
  encode(str: string | undefined) {
    if (!str) return str;
    var encoded = btoa(encodeURIComponent(str));
    if (!encoded.endsWith('/')) return encoded;
    else return encoded
  },
  decode(str: any | undefined) {
    if (!str) return str;
    str = str.replace(new RegExp('\/$', 'g'), '');
    var encoded = decodeURIComponent(atob(str));
    return encoded;
  }
}

export default {xor, plain, base64};