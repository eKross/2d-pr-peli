var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


http.listen(3000, function(){
  console.log('started server');
});




class server_projectile{
	constructor(role_fired,x,y,angle,endpos_x,endpos_y)
	{
		this.x = x;
        this.y = y;
        //default size
		this.height = 80;
		this.width = 20;
		this.angle = angle;
		this.created_locally = false;
		this.end_position_x = endpos_x;
		this.end_position_y = endpos_y;
		this.collision_bounds = [0,0,0,0];
		this.updateCollisionBounds();
		this.last_valid_hyp = 0.0;
		this.last_end_pos_x = 0;
    this.last_end_pos_y = 0;
    this.role_fired = role_fired;
	}


  get getRoleFired()
  {
    return this.role_fired;
  }


  setRoleFired(role)
  {
    this.role_fired = role;
  }


	setPosition(x,y)
	{		
		this.x = x;
		this.y = y;
		this.updateCollisionBounds();
	}

	setCreatedLocally()
	{
		this.created_locally = true;
	}

	setLastValidHyp(hyp)
	{
		this.last_valid_hyp = hyp;
	}

	get getLastValidHyp()
	{
		return this.last_valid_hyp;
	}

	get getActiveAimAssist()
	{
		return this.active_aim_assist;
	}

	get getAimAssistDelay()
	{
		return this.aim_assist_delay;
	}

	get getCanHaveAimAssist()
	{
		return this.can_have_aim_assist;
	}

	
	get getAimAssistTime()
	{
		return this.aim_assist_time;
	}


	
	get getAimAssistDuration()
	{
		return this.aim_assist_duration;
	}


	setActiveAimAssist(state)
	{
		this.active_aim_assist = state;
		this.can_have_aim_assist = false;
	}

	setAimAssistTime(time)
	{
		this.aim_assist_time = time;
	}

	setAimAssistDuration(time)
	{
		this.aim_assist_duration = time;
	}


	setEndPosition(x,y)
	{
		this.end_position_x = x;
		this.end_position_y = y;
	}

	setLastEndPos(x,y)
	{
		this.last_end_pos_x = x;
		this.last_end_pos_y = y;
	}


	get getLastEndPosX()
	{
		return this.last_end_pos_x;
	}

	get getLastEndPosY()
	{
		return this.last_end_pos_y;
	}
	
	get getCollisionBounds()
	{
		return this.collision_bounds;
	}

	setAngle(angle)
	{
		this.angle = angle;
	}

	get getAngle()
	{
		return this.angle;
	}

	get getEndPositionX()
	{
		return this.end_position_x;
	}

	get getEndPositionY()
	{
		return this.end_position_y;
	}

	get getX()
	{
		return this.x;
	}

	
	get getY()
	{
		return this.y;
	}

	get getWidth()
	{
		return this.width;
	}

	get getHeight()
	{
		return this.height;
	}

	get createdLocally()
	{
		return this.created_locally;
	}

	//could mimic the player collision in future here
	updateCollisionBounds()
	{

		this.collision_bounds[0] = this.x;
		this.collision_bounds[1] = this.y;
		this.collision_bounds[2] = this.width;
		this.collision_bounds[3] = this.height;

	}


	checkCollision(player) {
		var enemy_collision = player.getCollisionBounds;
		var missile_collision = this.getCollisionBounds;


		var missile_col_x = missile_collision[0];
		var missile_col_y = missile_collision[1];
		var missile_col_w = missile_collision[2];
		var missile_col_h = missile_collision[3];


		var enemy_col_x = enemy_collision[0];
		var enemy_col_y = enemy_collision[1];
		var enemy_col_w = enemy_collision[2];
		var enemy_col_h = enemy_collision[3];


		//checks based on missile x, y, width, height and enemy x, y, width, height
		if (missile_col_x < enemy_col_x + enemy_col_w &&
			missile_col_x + missile_col_w > enemy_col_x &&
			missile_col_y < enemy_col_y + enemy_col_h &&
			missile_col_h + missile_col_y > enemy_col_y) {
			return true;
		}

		return false;
	}
	
}

class server_player{
  constructor(x,y,angle,role)
	{
    this.x = x;
		this.y = y;
    this.angle = angle;
    this.score = 100;
    this.role = role;
    this.collision_bounds = [0,0,0,0];
    this.scale_to_draw_w = 200;
    this.scale_to_draw_h = 200;
    this.updateCollisionBounds();
  }


  setAngle(angl)
	{
		this.angle = angl;
	}

	get getAngle()
	{
		return this.angle;
	}

	get getX()
	{
		return this.x;
	}

	
	get getY()
	{
		return this.y;
  }
  
  
	get getRole()
	{
		return this.role;
	}

	get getScore()
	{
		return this.score;
	}

	setScore(score)
	{
		this.score = score;
	}

	setPosition(x,y)
	{
		this.x = x;
    this.y = y;
    this.updateCollisionBounds();
  }
  

  get getCollisionBounds()
	{
		return this.collision_bounds;
  }
  
  updateCollisionBounds()
	{

		var angle = this.angle;

		angle += 90.0;

		//normalize to range
		var normalized = angle;
		while (normalized <= -180) normalized += 360;
		while (normalized > 180) normalized -= 360;
		
		angle = normalized;
		
		var direction = 0;

		if(angle < 25 && angle > -25 || (angle > 165 && angle <= 180 || (angle <= -165 && angle > -180)))
		{
			direction = 0;
		}

		else if(angle > 75 && angle < 115 || (angle < -75 && angle > -115))
		{
			direction = 1;
		}
		else
		{
			direction = 2;
		}

		//up/down
		if(direction == 0)
		{
			this.collision_bounds[2] = this.scale_to_draw_w - 130;//width
			this.collision_bounds[3] = this.scale_to_draw_h - 70;//height
			this.collision_bounds[0] = this.x + (this.scale_to_draw_w / 2) - (this.collision_bounds[2] / 2);//x 
			this.collision_bounds[1] = this.y + (this.scale_to_draw_h / 2) - (this.collision_bounds[3] / 2);//y
		}
		else if(direction == 1)//left/right
		{
			this.collision_bounds[2] = this.scale_to_draw_w - 30;//width
			this.collision_bounds[3] = this.scale_to_draw_h - 130;//height
			this.collision_bounds[0] = this.x + (this.scale_to_draw_w / 2) - (this.collision_bounds[2] / 2);//x 
			this.collision_bounds[1] = this.y + (this.scale_to_draw_h / 2) - (this.collision_bounds[3] / 2);//y
		}
		else//rest
		{
			this.collision_bounds[2] = this.scale_to_draw_w - 50;//width
			this.collision_bounds[3] = this.scale_to_draw_h - 80;//height
			this.collision_bounds[0] = this.x + (this.scale_to_draw_w / 2) - (this.collision_bounds[2] / 2);//x 
			this.collision_bounds[1] = this.y + (this.scale_to_draw_h / 2) - (this.collision_bounds[3] / 2);//y
		}
	}

}





class Room
{
	constructor(name,users)
	{
		this.name = name;
    this.users = users;
    this.rooli = 'rosvo';
    this.org_x = 0;
    this.org_y = 0;
    this.org_angle = 0;
    this.username = "none";
    this.rosvo = 0;
    this.poliisi = 0;
    this.projectiles = [];
  }

  setRosvo(x,y,angle,role)
  {
    this.rosvo = new server_player(x,y,angle,role);
  }

  get getRosvo()
  {
    return this.rosvo;
  }

  get getPoliisi()
  {
    return this.poliisi;
  }

  setPoliisi(x,y,angle,role)
  {
    this.poliisi = new server_player(x,y,angle,role);
  }
  
  setRole(rooli)
  {
    this.rooli = rooli;
  }

  get getOrgAngle()
  {
    return this.org_angle;
  }

  setOrgAngle(angl)
  {
    this.org_angle = angl;
  }

  setUserName(uname)
  {
    this.username = uname;
  }

  get getUserName()
  {
    return this.username;
  }


  cleanUp()
  {
    this.users = 0;
    this.rooli = 'rosvo';
    this.org_x = 0;
    this.org_y = 0;
    this.username = "none";
    this.rosvo = 0;
    this.poliisi = 0;
    this.projectiles = [];
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

const map = {
  height: 2000,
  width: 2000
};
function handleProjectiles() {
  var projectile_speed = 15;
  for (room_idx = 0; room_idx < rooms.length; room_idx++) {
    var room = rooms[room_idx];

    for (projectile_idx = 0; projectile_idx < room.projectiles.length; projectile_idx++) {

      var missile = room.projectiles[projectile_idx];

      var missile_x = missile.getX;
      var missile_y = missile.getY;

      //calculate delta position
      var delta_x = (missile_x + missile.getEndPositionX) - missile_x;
      var delta_y = (missile_y + missile.getEndPositionY) - missile_y;
      var angle = 0;
      //normalize it
      var hyp = Math.sqrt(delta_x * delta_x + delta_y * delta_y);
      if (hyp > 0.0 || hyp < 0.0) {
        delta_x = delta_x / hyp;
        delta_y = delta_y / hyp;

        missile_x += delta_x * projectile_speed;
        missile_y += delta_y * projectile_speed;


        var rad = Math.atan2(delta_y, delta_x);
        //radians to degrees
        angle = rad / Math.PI * 180;

        missile.setAngle(angle);

        missile.setLastValidHyp(hyp);
      }

      else {
        delta_x = delta_x / missile.getLastValidHyp;
        delta_y = delta_y / missile.getLastValidHyp;

        missile_x += delta_x * projectile_speed;
        missile_y += delta_y * projectile_speed;
      }


      missile.setPosition(missile_x, missile_y);

      io.sockets.to(room.getName).emit('projectile position update', projectile_idx, missile_x, missile_y, angle);


      if(room.getPoliisi != 0 && room.getRosvo != 0)
      {

        var hit_rosvo = missile.checkCollision(room.getRosvo);
        var hit_poliisi= missile.checkCollision(room.getPoliisi);


        if(hit_rosvo && missile.getRoleFired != 'rosvo')
        {
          var rosvo = room.getRosvo;

          rosvo.setScore(rosvo.getScore - 5);
          io.sockets.to(room.getName).emit('score update', 'rosvo',rosvo.getScore);

          room.projectiles.splice(projectile_idx, 1);
          io.sockets.to(room.getName).emit('projectile remove', projectile_idx);
        
        }
        if(hit_poliisi && missile.getRoleFired != 'poliisi')
        {
          var poliisi = room.getPoliisi;

          poliisi.setScore(poliisi.getScore - 5);
          io.sockets.to(room.getName).emit('score update', 'poliisi',poliisi.getScore);

          room.projectiles.splice(projectile_idx, 1);
          io.sockets.to(room.getName).emit('projectile remove', projectile_idx);
        }
    }



      //if missile goes out of bounds remove it from projectiles list
      //goes out of right edge
      if ((missile_x + missile.getWidth) >= map.width) {
        room.projectiles.splice(projectile_idx, 1);
        io.sockets.to(room.getName).emit('projectile remove', projectile_idx);
      }
      //goes out of left edge
      else if ((missile_x) <= 0) {
        room.projectiles.splice(projectile_idx, 1);
        io.sockets.to(room.getName).emit('projectile remove', projectile_idx);
      }
      //goes out of top edge
      if ((missile_y) <= 0) {
        room.projectiles.splice(projectile_idx, 1);
        io.sockets.to(room.getName).emit('projectile remove', projectile_idx);
      }
      //goes out of bottom edge
      else if ((missile_y + missile.getHeight) >= map.height) {
        room.projectiles.splice(projectile_idx, 1);
        io.sockets.to(room.getName).emit('projectile remove', projectile_idx);
      }
    }
  }
}


setInterval(handleProjectiles,10);

io.on('connection', function(socket){
  socket.on('position update', (room_idx,rooli,pos_x,pos_y,angle) => {
    var room_name = "undefined";
    Object.keys(socket.rooms).forEach(function (room_tag, idx) {
      if (idx != 0) {
        room_name = room_tag;
      }
    });
    socket.to(room_name).emit('position update',pos_x,pos_y,angle);

    var room = rooms[room_idx];
    if(rooli == 'poliisi')
    {
      room.getPoliisi.setPosition(pos_x,pos_y);
      room.getPoliisi.setAngle(angle);
    }
    
    if(rooli == 'rosvo')
    {
      room.getRosvo.setPosition(pos_x,pos_y);
      room.getRosvo.setAngle(angle);
    }

    if(rooli == room.getRole)
    {
      room.setOrgPos(pos_x, pos_y);
      room.setOrgAngle(angle);
    }
  //socket.broadcast.emit('position update',pos_x,pos_y,angle);
  });

  socket.on('create projectile', (role,room_index,pos_x,pos_y,angle,endpos_x,endpos_y,time) => {
    var room_name = "undefined";
    Object.keys(socket.rooms).forEach(function (room_tag, idx) {
      if (idx != 0) {
        room_name = room_tag;
      }
    });
    socket.to(room_name).emit('create projectile',pos_x,pos_y,angle,endpos_x,endpos_y,time);

    var room = rooms[room_index];

    room.projectiles.push(new server_projectile(role,pos_x,pos_y,angle,endpos_x,endpos_y));


  });



  socket.on('game ended', (index) => {
    if(index == -1)
    {
      console.log("error invalid room index");
      return;
    }
    var room =  rooms[index];
    room.cleanUp();
    socket.emit('rooms update', index, room.getName, room.getUsers);
    socket.broadcast.emit('rooms update', index, room.getName, room.getUsers);
  });


  socket.on('player left', (index) => {
    var room =  rooms[index];
    room.cleanUp();
    var room_name = "undefined";
    Object.keys(socket.rooms).forEach(function (room_tag, idx) {
      if (idx != 0) {
        room_name = room_tag;
      }
    });
    socket.to(room_name).emit('enemy left');

    socket.emit('rooms update', index, room.getName, room.getUsers);
    socket.broadcast.emit('rooms update', index, room.getName, room.getUsers);
  });

  socket.on('chosen room', (username,index,wanted_role) => {
    if(index == -1)
    {
      console.log("error invalid room index");
      return;
    }
    rooms[index].updateUsers();
    var room = rooms[index];
    socket.emit('rooms update', index, room.getName, room.getUsers);
    socket.broadcast.emit('rooms update', index, room.getName, room.getUsers);
    
    socket.join(rooms[index].getName, function () {
      var room = rooms[index];

      //randomize position for player... based on canvas width, height
      var pos_x = Math.floor(Math.random() * 1700);
      var pos_y = Math.floor(Math.random() * 1700);

      var angle = 0;
      var dir = Math.floor(Math.random() * 2);

      if(dir == 1)
        angle = Math.floor(Math.random() * 180);
      else
       angle = -Math.floor(Math.random() * 180);

      var room_name = "undefined";
      //find the name of room on this index
      Object.keys(socket.rooms).forEach(function (room_tag, idx) {
        if (idx != 0) {
          room_name = room_tag;
        }
      });


      var room = rooms[index];

      //this means were first player in the room and he gets whatever role he chose
      if (room.getOrgX == 0 && room.getOrgX == 0) {
        room.setOrgPos(pos_x, pos_y);
        room.setUserName(username);
        room.setRole(wanted_role);
        room.setOrgAngle(angle);
      

       socket.emit('get start info', pos_x, pos_y,angle, room.getRole);

       if(room.getRole == 'rosvo')
       {
         room.setRosvo(pos_x,pos_y,angle,room.getRole);
       }
       else{
        room.setPoliisi(pos_x,pos_y,angle,room.getRole);
       }

      }
      //choose his role for him opposite of already on the field
      else{
        if(room.getRole == 'poliisi')
        {
          socket.emit('get start info', pos_x, pos_y,angle, 'rosvo');

          room.setRosvo(pos_x,pos_y,angle,'rosvo');
        }
        else
        {
         socket.emit('get start info', pos_x, pos_y,angle, 'poliisi');
          room.setPoliisi(pos_x,pos_y,angle,'poliisi');
         
        }


        socket.to(room_name).emit('player joined',angle,username, pos_x, pos_y);

         socket.emit('player joined',room.getOrgAngle,room.getUserName, room.getOrgX, room.getOrgY);



      }



    });
  });

  socket.on('client join', () => {

    for (i = 0; i < rooms.length; i++) {
      var room = rooms[i];
      socket.emit('rooms data', room.getName, room.getUsers);
    }
  });

});
