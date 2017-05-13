var express = require('express');
var app = express();
var path = require('path')
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.use(express.static('client/build'));

io.on('connection', function(socket){

  console.log("user connected")

  socket.on('guessMade', (packet) => {
      io.sockets.emit('guessMade', packet)
    })

  socket.on("disconnect", function(socket){
    console.log("user disconnected")
  })

});



http.listen(3000, function(){
  console.log('listening on *:3000');
});
