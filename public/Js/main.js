const chatForm = document.getElementById('chat-form');
const chatMessage = document.querySelector('.chat-messages');
const socket = io();

///message from server//////
socket.on('message', message => {
    console.log('message');
    outputMessage(message);

    //scroll down //
    chatMessage.scrollTop = chatMessage.scrollHeight
});


// message submit//

 chatForm.addEventListener('submit', (e) => {
     e.preventDefault();
    //recieve message////
    const msg = e.target.elements.msg.value;
    /// emit message to server
    socket.emit('chatMessage', msg);
    //clear inputs////
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus(); 

 });



 ///Output message to dom///
 function outputMessage(message) {
     const div = document.createElement('div');
     div.classList.add('message');
     div.innerHTML = `	<div class="message">
     <p class="meta">${message.username}<span>${message.time}</span></p>
     <p class="text">
        ${message.text}
     </p>`;
     document.querySelector('.chat-messages').appendChild(div);
 }