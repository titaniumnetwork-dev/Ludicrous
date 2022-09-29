/*

import createBareServer from '@tomphttp/bare-server-node';
import { createServer } from 'http';
import next from 'next';

var server: any = createServer();

const Server = createBareServer('/bare/', {
	logErrors: false,
	localAddress: undefined,
	maintainer: {
		email: 'tomphttp@sys32.dev',
		website: 'https://github.com/tomphttp/',
	},
});

server.on('upgrade', (req, socket, head) => {
	if (Server.shouldRoute(req)) {
		Server.routeUpgrade(req, socket, head);
	} else {
		socket.end();
	}
});*/

export {}