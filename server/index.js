import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import connectToMongoDB from './db/connectToMongoDB.js';
import { addMsgToConversation } from './controllers/msgs.controller.js';
import msgsRouter from './routes/msgs.route.js';
import cors from 'cors'
import { publish, subscribe } from './redis/msgsPubSub.js'

// dotenv library loads environment variables from .env file into process.env

dotenv.config();
const PORT = process.env.PORT || 8000;
// use the port specified in the environment variable PORT, or default to port 5000

const app = express();

app.use(cors());
app.use('/msgs', msgsRouter);

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

io.on('connection', socket => {
	console.log('Client connected');

	const username = socket.handshake.query.username;
	console.log('Username of connected client: ', username);

	userSocketMap[username] = socket;

	const channelName = `chat_${username}`;
	subscribe(channelName, (msg) => {
		console.log('Received message ', msg);
		socket.emit("chat msg", JSON.parse(msg));
	})

	socket.on('chat msg', msg => {
		console.log(msg.sender);
		console.log(msg.receiver);
		console.log(msg.text);
		console.log(msg);
		const receiverSocket = userSocketMap[msg.receiver];

		if (receiverSocket) {
			receiverSocket.emit('chat msg', msg);
		} else {
			const channelName = `chat_${msg.receiver}`
			publish(channelName, JSON.stringify(msg));
		}
		addMsgToConversation([msg.sender, msg.receiver], {
			text: msg.text,
			sender: msg.sender,
			receiver: msg.receiver
		});
	});
});

// When a client connects to the Socket.IO server, a unique socket object is created to represent that client's connection. This socket object allows bidirectional communication between the server and the specific client that it represents.

app.get('/', (req, res) => {
	res.send('Welcome to HHLD Chat App!');
});

server.listen(PORT, (req, res) => {
	connectToMongoDB();
	console.log(`Server is listening on http://localhost:${PORT}`);
});
