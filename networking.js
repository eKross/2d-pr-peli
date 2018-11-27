
//all server to client related code

//connect to node server
var socket =  io.connect('http://localhost:3000');


//on player join event
socket.on('player joined', (pos_x,pos_y) => {

	//create new enemy
	enemy = new Enemy(pos_x,pos_y);

	//set his role opposite of ours
	if(localplayer.getRole == 'poliisi')
		enemy.setRole('rosvo')
	else
		enemy.setRole('poliisi')

	enemy.setPosition(pos_x,pos_y);

	
	console.log("enemy joined");

});

//position update from server
socket.on('position update', (pos_x,pos_y,angle) => {

	//update position and angle based on event data
	enemy.setPosition(pos_x,pos_y);
	enemy.setAngle(angle);

});


//server sent us localplayer starting info
socket.on('get start info', (pos_x,pos_y,role) => {

	//create player on the received coordinates
	localplayer = new LocalPlayer(pos_x,pos_y);
	
	//set our role depending on are we first or 2nd on the field
	localplayer.setRole(role);
	localplayer.setPosition(pos_x,pos_y);
	localplayer_died = false;
	enemy_died = false;
	delay = 0.0;
	started_yet = true;
});


//list of active projectiles
var projectiles = [];

//someone fired projectile and we got info on it
socket.on('create projectile', (pos_x,pos_y,angle,endpos_x,endpos_y) => {

	//create new missile
	var missile = new projectile(pos_x,pos_y);

	missile.setAngle(angle);
	missile.setEndPosition(endpos_x,endpos_y);
    
    //add networked projectile to the list
	projectiles.push(missile);
	weapon.play();
});

//ROOM STUFF
//server sent room update... room emptied
socket.on('rooms update', (index,name,users) => {
	rooms[index].setNameAndUsers(name,users);
});

//server sent us existing room data
socket.on('rooms data', (name,users) => {
	rooms.push(new Room(name,users));
});

//enemy left before game ending
socket.on('enemy left', () => {
	enemy_died = true;
});
