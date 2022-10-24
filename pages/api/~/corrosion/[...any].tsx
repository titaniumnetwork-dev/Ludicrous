import type { NextApiRequest, NextApiResponse } from 'next';
import corrosion from '../../../../corrosion/lib/server';

var cor: any = corrosion;

var proxy: any = new cor({
  prefix: '/api/~/corrosion/',
  codec: 'xor',
  requestMiddleware: [cor.middleware.https, cor.middleware.requestHeaders],
  responseMiddleware: [cor.middleware.responseHeaders,cor.middleware.decompress,cor.middleware.rewriteBody],
  standardMiddleware: false,
});

proxy.bundleScripts()

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  proxy.request(req, res);
}