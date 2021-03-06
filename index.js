var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
  });

  io.on('connection', function(socket){
    console.log('Un usuario conectado');
    
    io.emit('chat message', 'Se conecto alguien');
    socket.on('chat message', function(msg){
        console.log('Mensaje: ' + msg);
        io.emit('chat message', msg);
      });
    // socket.on('disconnect', function(){
    //   console.log('user disconnected');
    // });
  });

  io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets

http.listen(3000, function(){
  console.log('listening on *:3000');
});

