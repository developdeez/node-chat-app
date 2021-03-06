const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage}=require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage',generateMessage('Admin','Welcome creeper'));

  socket.broadcast.emit('newMessage',generateMessage('Admin','Someone creeping'));

socket.on('createMessage',(newMessage)=>{
console.log('creating message',newMessage);
io.emit('newMessage',generateMessage(newMessage.from,newMessage.text));
});

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
