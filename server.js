const path = require ('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage= require('./utils/messages');

//
const app = express();
const server = http.createServer(app);
const io = socketio(server);

//Static Folder//
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'ChatCord bot';

// run when client connects///
 io.on('connection', socket => {
     console.log('New WS connection...')
        // welcome user to chat//
     socket.emit('message', formatMessage(botName,'Welcome to PetesChord'));


     //Broadcast when a user Connects//
     socket.broadcast.emit('message',formatMessage(botName,'A new person has joined our chat! welcome them!'));


     
     // Runs when client disconnects//
     socket.on('disconnect', () => {
        io.emit('message', formatMessage(botName,'Somone left the building!'));
     });

     
     //listen for chat message//
     socket.on('chatMessage',(msg) => {
         io.emit('message', msg)
     });

 });

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
