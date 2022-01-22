const cors = require('cors');
const express = require('express')();
const fs = require('fs');
const https = require('https');

var privateKey = fs.readFileSync('./key/priv.key');
var crt = fs.readFileSync('./key/cert_florianerwerth.blog.crt');
var ca = fs.readFileSync('./key/intermediate_florianerwerth.blog.crt');

const server = https.createServer({ key: privateKey, cert: crt }, express);

var users = [];

const io = require('socket.io')(server, {
	cors: { origin: '*', methods: '*' },
});
express.use(cors());

const isConnected = (socketID) => {
	var isConnected = false;
	users.forEach((user) => {
		isConnected = socketID == user.socketID;
	});
	return isConnected;
};

io.on('connection', (socket) => {
	socket.on('disconnect', () => {
		users = users.filter((user) => user.socketID != socket.id);
		io.to('chatroom').emit('user-disconnect', users);
	});

	socket.on('send-message', (message) => {
		io.to('chatroom').emit('receive-message', message);
	});

	socket.on('attempt_login', (user) => {
		if (!isConnected(socket.id)) {
			socket.join('chatroom');
			users.push({ name: user.name, socketID: socket.id });
			io.to('chatroom').emit('login', users);
		}
	});
});

server.listen(3001, () => {
	console.log('listening on *:3001');
});
