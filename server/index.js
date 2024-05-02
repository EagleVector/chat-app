import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

// dotenv library loads environment variables from .env file into process.env

dotenv.config();
const PORT = process.env.PORT || 8000;
// use the port specified in the environment variable PORT, or default to port 5000

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		allowedHeaders: ['*'],
		origin: '*'
	}
});
// io is an instance of the Socket.IO server class that is associated with and attached to the HTTP server

// Allow WebSocket connections from different origins to the Socket.IO server by relaxing the browser's same-origin policy

const userSocketMap = {};

io.on('connection', (socket) => {
	console.log('Client connected');

	const username = socket.handshake.query.username;
	console.log('Username of connected client: ', username);

	userSocketMap[username] = socket;

	socket.on('chat msg', (msg) => {
		console.log(msg.sender);
		console.log(msg.receiver);
		console.log(msg.text);
		console.log(msg);
		const receiverSocket = userSocketMap[msg.receiver];

		if(receiverSocket) {
			receiverSocket.emit('chat msg', msg);
		}
	});
});

// When a client connects to the Socket.IO server, a unique socket object is created to represent that client's connection. This socket object allows bidirectional communication between the server and the specific client that it represents.

app.get('/', (req, res) => {
	res.send('Welcome to HHLD Chat App!');
});

server.listen(PORT, (req, res) => {
	console.log(`Server is listening on http://localhost:${PORT}`);
});
