const path = require ('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const { Socket } = require('dgram');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//Static Folder//
app.use(express.static(path.join(__dirname, 'public')));

// run when client connects///
 io.on('connection', socket => {
     console.log('New WS connection..');
 })

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
