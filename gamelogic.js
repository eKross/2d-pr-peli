
var criminal = [];
var police = [];
function preload() {

	var i = 0;
    for (; i < 8; i++) {
        criminal[i] = new Image();
        criminal[i].src = preload.arguments[i];
	}
	
	//i += 1;

    for (var j = 0; j < 8; j++) {
        police[j] = new Image();
		police[j].src = preload.arguments[i+j];
    }
}
//-- usage --//
/*preload(
    'Sprites/Criminal/0d/0dsheet.png',
    'Sprites/Criminal/22,5d/22,5dsheet.png',
		'Sprites/Criminal/45d/45dsheet.png',
		'Sprites/Criminal/67,5d/67,5dsheet.png',
		'Sprites/Criminal/90d/90dsheet.png',
		'Sprites/Criminal/112,5d/112,5dsheet.png',
		'Sprites/Criminal/135d/135dsheet.png',
		'Sprites/Criminal/157,5d/157,5dsheet.png',
		'Sprites/Criminal/180d/180dsheet.png',
		'Sprites/Criminal/202,5d/202,5dsheet.png',
		'Sprites/Criminal/225d/225dsheet.png',
		'Sprites/Criminal/247,5d/247,5dsheet.png',
		'Sprites/Criminal/270d/270dsheet.png',
		'Sprites/Criminal/292,5d/292,5dsheet.png',
		'Sprites/Criminal/315d/315dsheet.png',
		'Sprites/Criminal/337,5d/337,5dsheet.png',

		'Sprites/Police/0d/0dsheet.png',
    'Sprites/Police/22,5d/22,5dsheet.png',
		'Sprites/Police/45d/45dsheet.png',
		'Sprites/Police/67,5d/67,5dsheet.png',
		'Sprites/Police/90d/90dsheet.png',
		'Sprites/Police/112,5d/112,5dsheet.png',
		'Sprites/Police/135d/135dsheet.png',
		'Sprites/Police/157,5d/157,5dsheet.png',
		'Sprites/Police/180d/180dsheet.png',
		'Sprites/Police/202,5d/202,5dsheet.png',
		'Sprites/Police/225d/225dsheet.png',
		'Sprites/Police/247,5d/247,5dsheet.png',
		'Sprites/Police/270d/270dsheet.png',
		'Sprites/Police/292,5d/292,5dsheet.png',
		'Sprites/Police/315d/315dsheet.png',
		'Sprites/Police/337,5d/337,5dsheet.png'
)*/
preload(
    'Sprites/Criminal/up.png',
    'Sprites/Criminal/upright.png',
    'Sprites/Criminal/right.png',
    'Sprites/Criminal/downright.png',
    'Sprites/Criminal/down.png',
    'Sprites/Criminal/downleft.png',
    'Sprites/Criminal/left.png',
    'Sprites/Criminal/upleft.png',
    'Sprites/Police/up.png',
    'Sprites/Police/upright.png',
    'Sprites/Police/right.png',
    'Sprites/Police/downright.png',
    'Sprites/Police/down.png',
    'Sprites/Police/downleft.png',
    'Sprites/Police/left.png',
    'Sprites/Police/upleft.png',
)


// audio
var music = new Audio('Sounds/2d-rp-peli-menu-2.wav');
var weapon = new Audio('Sounds/Weapon.mp3');
var engine = new Audio('Sounds/engine.wav');


//boolean array for all keycodes to detect keys
var keys = [];
	  
//if this is true game will be drawn and run normally
var game_running = true;

//global enemy
var enemy = 0;
//global localplayer
var localplayer = 0;

//globals for room related stuff
var started_yet = false;
var localplayer_died = false;
var enemy_died = false;
var delay = 0.0;
var room_index = 0;
var accelerate = 0.02;

//handle localplayer movement and projectiles on key presses
function handleLocalPlayerKeys()
{
	//speed we update our origin
	var speed = 1;

	var pos_x = localplayer.getX;
	var pos_y = localplayer.getY;
	var angle = localplayer.getAngle;
	var vel_x = localplayer.getVelocityX;
	var vel_y = localplayer.getVelocityY;

	//down arrow key
	if (keys[40]) {
		if(accelerate < speed)
		vel_y += accelerate;
		else
			vel_y += speed;
		engine.play();

	}
	//up arrow key
	if (keys[38]) {
		if(accelerate < speed)
		vel_y -= accelerate;
		else
		vel_y -= speed;
		engine.play();
	}
	//right arrow key
	if (keys[39]) {
		if(accelerate < speed)
		vel_x += accelerate;
		else
		vel_x += speed;
		engine.play();

	}
	//left arrow key
 	if (keys[37]) {
		if(accelerate < speed)
		vel_x -= accelerate;
		else
		vel_x -= speed;
		engine.play();

	}
	if(!keys[37] && !keys[38] && !keys[39] && !keys[40])   
	{
		accelerate = 0.02;
	}


	accelerate += 0.07;


	var friction = 0.95;

   vel_x *= friction;
   pos_x += vel_x;
   vel_y *= friction;
   pos_y += vel_y;


	var delta_x = ((pos_x + vel_x) - pos_x);
	var delta_y = ((pos_y + vel_y) - pos_y);

	var hyp = Math.sqrt(delta_x * delta_x + delta_y * delta_y);
	//make sure hypotenuse has some length
	if(hyp > 0.0  || hyp < 0.0)
	{
		delta_x = (delta_x / hyp);
		delta_y = (delta_y / hyp);
		var  rad = Math.atan2(delta_y,delta_x);
		//radians to degrees
		angle = rad/Math.PI * 180;

		localplayer.setAngle(angle);			
	}


	//set new position and angle
	//localplayer.setAngle(angle);			
	localplayer.setPosition(pos_x,pos_y);
	localplayer.setVelocity(vel_x,vel_y);
	
	//spacebar
	if(keys[32])
	{			
		//create new missile 	
		var missile = new projectile(localplayer.getX,localplayer.getY);

		//mark this missile as created by localplayer so it's not considered networked
		missile.setCreatedLocally();

		missile.setAngle(angle);
		missile.setEndPosition(delta_x,delta_y);

		projectiles.push(missile);

		//send server information that we fired a missile
		socket.emit('create projectile',missile.getX,missile.getY,angle,delta_x,delta_y);
		//set the spacebar value as false so we only fire once per event
		keys[32] = false;
		weapon.play();
	}
}
//loop of all active projectiles move them, draw them and remove them if needed
function handleMissilesArray() {
	//movement speed of missile
	var projectile_speed = 4;
	for (i = 0; i < projectiles.length; i++) {
		var missile = projectiles[i];

		var missile_x = missile.getX;
		var missile_y = missile.getY;

		//calculate delta position
		var delta_x = (missile_x + missile.getEndPositionX) - missile_x;
		var delta_y = (missile_y + missile.getEndPositionY) - missile_y;


		//normalize it
		var hyp = Math.sqrt(delta_x * delta_x + delta_y * delta_y);
		if(hyp > 0.0 || hyp < 0.0)
		{
			delta_x = delta_x / hyp;
			delta_y = delta_y / hyp;

			missile_x += delta_x * projectile_speed;
			missile_y += delta_y * projectile_speed;
			missile.setLastValidHyp(hyp);
		}
		else
		{
			delta_x = delta_x / missile.getLastValidHyp;
			delta_y = delta_y / missile.getLastValidHyp;

			missile_x += delta_x * projectile_speed;
			missile_y += delta_y * projectile_speed;
		}


		missile.setPosition(missile_x,missile_y);
		//draw the missile
		missile.drawProjectile();



		//how many scorepoints will be given and taken on impact
		var score_step = 5;
		//check player collision
		if (missile.createdLocally && enemy != 0) {
	
			var enemy_collision = enemy.getCollisionBounds;
			var missile_collision = missile.getCollisionBounds;


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
				var score = enemy.getScore;
				var loc_score = localplayer.getScore;

				//add 5 to localplayer score
				localplayer.setScore(loc_score + score_step);
				//remove 5 from enemy score
				enemy.setScore(score - score_step);

				//remove projectile from array
				projectiles.splice(i, 1);

			}
		}
		else if(enemy != 0 && !missile.createdLocally) {

			
			var enemy_collision = localplayer.getCollisionBounds;
			var missile_collision = missile.getCollisionBounds;


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
				var score = localplayer.getScore;

				//remove 5 from our score
				localplayer.setScore(score - score_step);

				var enemy_score = enemy.getScore;		
				//add 5 to enemy score
				enemy.setScore(enemy_score + score_step);

				//remove projectile from array
				projectiles.splice(i, 1);

			}
		}


		//if missile goes out of bounds remove it from projectiles list
		//goes out of right edge
		if ((missile_x + missile.getWidth) >= canvas.width) {
			projectiles.splice(i, 1);
		}
		//goes out of left edge
		else if ((missile_x) <= 0) {
			projectiles.splice(i, 1);
		}
		//goes out of top edge
		if ((missile_y) <= 0) {
			projectiles.splice(i, 1);
		}
		//goes out of bottom edge
		else if ((missile_y + missile.getHeight) >= canvas.height) {
			projectiles.splice(i, 1);
		}
	}
}
var background_img = new Image();
background_img.src = 'mapbase.png';
//This function handles all game related stuff including drawing
function GameLoop() {
	var canvas = document.getElementById('canvas');
	if (canvas.getContext) {

		var ctx = canvas.getContext('2d');

		//clear canvas from previous drawing
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		//draw background
		ctx.fillStyle = 'rgb(53, 53, 53, 0)';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		ctx.drawImage(background_img,0,0);


		//if game is running. default is true
		if (game_running) {

			//only if localplayer has been created we handle the movement code
			//only if not exploding or exploded
			if (localplayer != 0 && !localplayer.getExploding && !localplayer.getExploded) {
				handleLocalPlayerKeys();
			}

			//top text drawn at center on x axis
			ctx.fillStyle = 'rgba(255, 255, 23)';
			ctx.font = '28px tahoma';
			ctx.textAlign = 'center';
			var center_x = (canvas.width / 2);
			ctx.fillText('Rosvo & Poliisi', 140, 50);


			//scores
			ctx.fillStyle = 'rgba(80, 60, 240)';
			ctx.font = '18px tahoma';
			ctx.textAlign = 'right';
			var center_x = (canvas.width) - 5;
			//check localplayer has been created
			if (localplayer != 0) {
				var score = localplayer.getScore;
				var loc_text = "You:  " + String(score);
				if (score <= 0)
				{
					loc_text = 'Dead';
					localplayer_died = true;
				}
				ctx.fillText(loc_text, 800, 50);

			}

			//check enemy has been created
			if (enemy != 0) {
				var score = enemy.getScore;
				var loc_text = "Enemy: " + String(score);
				if (score <= 0)
				{
					loc_text = 'Dead';
					enemy_died = true;
				}
				ctx.fillText(loc_text, 960, 50);
			}



			//draw localplayer
			if (localplayer != 0) {
				localplayer.drawLocalPlayer();
			}

			//draw enemy
			if (enemy != 0) {
				enemy.drawEnemy();
				music.play();
			}

			//loop every missile in the array
			handleMissilesArray();


			if(localplayer != 0)
			{
				if(localplayer_died)
				{
					localplayer.doExplosion();
					if(localplayer.getExploded)
					{
						localplayer = 0;
						enemy = 0;
						while(projectiles.length)
						{
							projectiles.pop();
						}
						game_running = false;
						delay = new Date().getTime() / 1000;
					}
				}

				if(enemy_died)
				{
					enemy.doExplosion();
					if(enemy.getExploded)
					{
						localplayer = 0;
						enemy = 0;
						while(projectiles.length)
						{
							projectiles.pop();
						}
						game_running = false;
						delay = new Date().getTime() / 1000;
					}
				}
			}

		}
		//if game no longer running display the ending screen
		else {
			var ctx = canvas.getContext('2d');
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			//background
			ctx.fillStyle = 'rgb(255, 53, 53,0.5)';
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			//top text drawn at center on x axis
			ctx.fillStyle = 'rgba(255, 255, 23)';
			ctx.font = '28px tahoma';
			ctx.textAlign = 'center';

			var center_x = (canvas.width / 2);

			if (localplayer_died)
				ctx.fillText('you lost', center_x, 50);
			else if (enemy_died)
				ctx.fillText('you won', center_x, 50);

			//current time in seconds
			var curtime = new Date().getTime() / 1000;
			//elapsed time
			var delta = (curtime - delay);

			//delay this screen abit so player has time to read it
			if (delta > 5) {
				socket.emit('game ended', room_index);
				started_yet = false;
			}
		}

	}
}

//MAIN FUNCTION CALLED 60 TIMES A SECOND
function main()
{
	var canvas = document.getElementById('canvas');
	requestAnimationFrame(main);
	
    if (canvas.getContext && rooms.length > 0 && !started_yet) {
				
		var ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		//background
		ctx.fillStyle = 'rgb(53, 53, 53,0.5)';
		ctx.fillRect(0,0,canvas.width, canvas.height);

		//do room choosing etc...
		//will start the game when chosen a room and got start info from server
		HandleRoomsLogic();
	}
	else  if (canvas.getContext && started_yet)
	{
		GameLoop();
	}
}


//BINDERS
//binder for key events and set the boolean value in array to true/false according to the event and keycode
document.body.addEventListener("keydown", function (e) {
	keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function (e) {
	keys[e.keyCode] = false;
});

//this is called when browser/window gets closed
window.addEventListener("beforeunload", function (e) {
	socket.emit('player left',room_index);  
	localplayer = 0;     
});


//emit join message to server
socket.emit('client join');

//start the loop
main();

