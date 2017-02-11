var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var connectCount = 0;

app.use(express.static(__dirname + '/'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/lobby.html');
});

io.on('connection', function(socket){
  connectCount ++;
  io.emit('connectCount', connectCount);
  console.log(connectCount)
  socket.on('disconnect', function(){
    connectCount --;
    io.emit('connectCount', connectCount);
    console.log(connectCount);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
