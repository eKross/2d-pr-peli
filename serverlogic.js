var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


io.on('connection', function(socket){
  console.log('a user connected');


});

http.listen(3000, function(){
  console.log('listening on *:3000');
});


var rooli = 'rosvo';
var player_count = 0;

var org_x = 0;
var org_y = 0;


io.on('connection', function(socket){
  socket.on('position update', (pos_x,pos_y,angle) => {

  socket.broadcast.emit('position update',pos_x,pos_y,angle);
  });

  socket.on('create projectile', (pos_x,pos_y,angle) => {

	socket.broadcast.emit('create projectile',pos_x,pos_y,angle);
  });

  //only allow 1v1
  if(player_count < 200)
  {
  //2nd client gets to be a cop
    socket.on('client join', () => {

      var pos_x = Math.floor(Math.random()*400);
      var pos_y = Math.floor(Math.random()*400);

      socket.emit('get start info',pos_x,pos_y,rooli);

      if(org_x == 0 && org_y == 0)
      {
        org_x = pos_x;
        org_y = pos_y;

      }
      player_count++;
      socket.broadcast.emit('player joined',pos_x,pos_y);

      //he needs to know the player already on the field
      if(rooli == 'poliisi')
      {
        socket.emit('player joined',org_x,org_y);
      }

      rooli = 'poliisi';
      });
  }
});
