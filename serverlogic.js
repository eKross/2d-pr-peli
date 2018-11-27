var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


http.listen(3000, function(){
  console.log('started server');
});



class Room
{
	constructor(name,users)
	{
		this.name = name;
    this.users = users;
    this.rooli = 'rosvo';
    this.org_x = 0;
    this.org_y = 0;
  }
  
  setRole(rooli)
  {
    this.rooli = rooli;
  }


  cleanUp()
  {
    this.users = 0;
    this.rooli = 'rosvo';
    this.org_x = 0;
    this.org_y = 0;
  }

  setOrgPos(x,y)
  {
    this.org_x = x;
    this.org_y = y;
  }

  setName(newname)
  {
    this.name = newname;
  }
	get getName()
	{
		return this.name;
  }
  
  get getUsers()
  {
    return this.users;
  }

  updateUsers()
  {
    this.users += 1;
  }

  get getOrgX()
  {
    return this.org_x;
  }

  get getOrgY()
  {
    return this.org_y;
  }

  get getRole()
  {
    return this.rooli;
  }
}
var rooms = [];

function createRooms()
{
   rooms.push(new Room("room0",0));
   rooms.push(new Room('room1',0));
   rooms.push(new Room('room2',0));
   rooms.push(new Room('room3',0));
}

createRooms();

io.on('connection', function(socket){
  socket.on('position update', (pos_x,pos_y,angle) => {
    var room_name = "undefined";
    Object.keys(socket.rooms).forEach(function(room, idx) {
      if(idx!=0){
          room_name = room;
      }
   });
    socket.to(room_name).emit('position update',pos_x,pos_y,angle);
  //socket.broadcast.emit('position update',pos_x,pos_y,angle);
  });

  socket.on('create projectile', (pos_x,pos_y,angle,endpos_x,endpos_y) => {
    var room_name = "undefined";
    Object.keys(socket.rooms).forEach(function(room, idx) {
      if(idx!=0){
          room_name = room;
      }
   });
    socket.to(room_name).emit('create projectile',pos_x,pos_y,angle,endpos_x,endpos_y);

  });

  socket.on('game ended', (index) => {
    var room =  rooms[index];
    room.cleanUp();
    socket.emit('rooms update', index, room.getName, room.getUsers);
    socket.broadcast.emit('rooms update', index, room.getName, room.getUsers);
  });


  socket.on('player left', (index) => {
    var room =  rooms[index];
    room.cleanUp();
    socket.broadcast.emit('enemy left');
    socket.emit('rooms update', index, room.getName, room.getUsers);
    socket.broadcast.emit('rooms update', index, room.getName, room.getUsers);
  });

  socket.on('chosen room', (index) => {
    socket.join(rooms[index].getName, function () {

      rooms[index].updateUsers();

      var room = rooms[index];
      socket.emit('rooms update', index, room.getName, room.getUsers);
      socket.broadcast.emit('rooms update', index, room.getName, room.getUsers);


      //randomize position for player... based on canvas width, height
      var pos_x = Math.floor(Math.random() * 950);
      var pos_y = Math.floor(Math.random() * 750);
      var room_name = "undefined";
      //find the name of room on this index
      Object.keys(socket.rooms).forEach(function (room, idx) {
        if (idx != 0) {
          room_name = room;
        }
      });

      socket.emit('get start info', pos_x, pos_y, room.getRole);

      var room = rooms[index];

      if (room.getOrgX == 0 && room.getOrgX == 0) {
        room.setOrgPos(pos_x, pos_y);
      }


      socket.to(room_name).emit('player joined', room.getOrgX, room.getOrgY);


      //he needs to know the player already on the field
      if (room.getRole == 'poliisi') {
        socket.emit('player joined', room.getOrgX, room.getOrgY);

      }

      room.setRole('poliisi');
    });
  });

  socket.on('client join', () => {

    for (i = 0; i < rooms.length; i++) {
      var room = rooms[i];
      socket.emit('rooms data', room.getName, room.getUsers);
    }
  });

});
