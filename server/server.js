const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

socket.emit('newMessage',
{
  from:'mike@mike.com',
  text:'Hey whats up',
  createdAt:123
});

socket.on('createMessage',(newMessage)=>{
console.log('creating message',newMessage);
io.emit('newMessage',{
from:newMessage.from,
text:newMessage.text,
createdAt:new Date().getTime()
});
});

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
