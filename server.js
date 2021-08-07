const path = require ('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage= require('./utils/messages');
const {userJoin, getCurrentUser} = require('./utils/users');

//
const app = express();
const server = http.createServer(app);
const io = socketio(server);

//Static Folder//
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'ChatCord bot';

// run when client connects///
 io.on('connection', socket => {
     socket.on('joinRoom',({username, room}) => {
        const user = userJoin( socket.id,  username, room);
         
        socket.join(user.room);


        // welcome current user to chat//
     socket.emit('message', formatMessage(botName,'Welcome to Petes Cord'));


     //Broadcast when a user Connects//
     socket.broadcast.to(user.room).emit('message',formatMessage(botName,'FRESH MEAT IN THE ROOM!'));

     });


     //listen for chat message//
     socket.on('chatMessage',(msg) => {
         io.emit('message',formatMessage('USER',msg));
     });

  // Runs when client disconnects//
  socket.on('disconnect', () => {
    io.emit('message', formatMessage(botName,'Somone left the building!'));
 });


 });
//// run localport300////
const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`All GOOD HERE FULL STACK P! ${PORT}`));
