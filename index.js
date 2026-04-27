import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import { WebSocketServer } from 'ws';

const require = createRequire(import.meta.url);
const { setupWSConnection } = require('y-websocket/bin/utils');

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 1234;
const heartbeatInterval = 30000;

const server = createServer();
const wss = new WebSocketServer({ noServer: true });

let isAlive = false;

wss.on('connection', (ws, request, client) => {
	setupWSConnection(ws, request, client);
	isAlive = true;
	ws.on('pong', () => {
		isAlive = true;
	});
});

const interval = setInterval(() => {
	wss.clients.forEach((ws) => {
		if (ws.isAlive === false) {
			return ws.terminate();
		}

		ws.isAlive = false;
		ws.ping();
	});
}, heartbeatInterval);

wss.on('close', function close() {
	clearInterval(interval);
});

server.on('upgrade', (request, socket, head) => {
	const handleAuth = ws => {
		wss.emit('connection', ws, request);
	};
	wss.handleUpgrade(request, socket, head, handleAuth);
});

server.listen(port, host, () => {
	console.log(`Running at '${host}' on port ${port}`);
});
