import type { NextApiRequest, NextApiResponse } from 'next';
import createBareServer from '@tomphttp/bare-server-node';

type Data = {
  name: string
}

const Server = createBareServer('/bare/', {
	logErrors: false,
	localAddress: undefined,
	maintainer: {
		email: 'tomphttp@sys32.dev',
		website: 'https://github.com/tomphttp/',
	},
});

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  req.url = '/bare/'
  Server.routeRequest(req, res);
}