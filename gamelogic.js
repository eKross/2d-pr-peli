var criminal = [];
var police = [];
function preload() {

	var i = 0;
    for (; i < 7; i++) {
        criminal[i] = new Image();
        criminal[i].src = preload.arguments[i];
	}
	
	i += 1;

    for (var j = 0; j < 7; j++) {
        police[j] = new Image();
		police[j].src = preload.arguments[i+j];
    }
	
	
	
}
//-- usage --//
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

//boolean array for all keycodes to detect keys
var keys = [];
	  
//if this is true game will be drawn and run normally
var game_running = true;

//global enemy
var enemy = 0;
//global localplayer
var localplayer = 0;

// audio
var music = new Audio('Sounds/2d-rp-peli-menu-2.wav');
var weapon = new Audio('Sounds/Weapon.mp3');
var engine = new Audio('Sounds/motor.wav');


//handle localplayer movement and projectiles on key presses
function handleLocalPlayerKeys()
{
	//speed we update our origin
	var speed = 10;
	var pos_x = localplayer.getX;
	var pos_y = localplayer.getY;
	var angle = localplayer.getAngle;

	//down arrow key
	// play engine sound
	if (keys[40]) {
		pos_y += speed;
		angle = 180;
		engine.play();
		
	}
	//up arrow key
	// play engine sound
	else if (keys[38]) {
		pos_y -= speed;
		angle = 0;
		engine.play();
	
	}
	//right arrow key
	// play engine sound
	else if (keys[39]) {
		pos_x += speed;
		angle = 90;
		engine.play();
		

	}
	//left arrow key
	// play engine sound
	else if (keys[37]) {
		pos_x -= speed;
		angle = -90;
		engine.play();
		
	}

	//set new position and angle
	localplayer.setAngle(angle);			
	localplayer.setPosition(pos_x,pos_y);
	
	//spacebar
	if(keys[32])
	{			
		//create new missile in 
		var missile = new projectile(localplayer.getX,localplayer.getY);

		//mark this missile as created by localplayer so it's not considered networked
		missile.setCreatedLocally();
		missile.setAngle(angle);
		projectiles.push(missile);

		//send server information that we fired a missile
		socket.emit('create projectile',missile.getX,missile.getY,angle);
		//set the spacebar value as false so we only fire once per event
		keys[32] = false;
	}
}
//loop of all active projectiles move them, draw them and remove them if needed
function handleMissilesArray() {
	//movement speed of missile
	var projectile_speed = 4;
	for (i = 0; i < projectiles.length; i++) {
		var missile = projectiles[i];

		//move missile in the direction its facing when created
		if (missile.getAngle == 0) {
			var pos_y = missile.getY - projectile_speed;
			missile.setPosition(missile.getX, pos_y);
		}
		else if (missile.getAngle == 180) {
			var pos_y = missile.getY + projectile_speed;
			missile.setPosition(missile.getX, pos_y);

		}
		else if (missile.getAngle == 90) {
			var pos_x = missile.getX + projectile_speed;
			missile.setPosition(pos_x, missile.getY);
		}
		else if (missile.getAngle == -90) {
			var pos_x = missile.getX - projectile_speed;
			missile.setPosition(pos_x, missile.getY);
		}
		
		// play weapon audio
		//draw the missile
	
		weapon.play();
		missile.drawProjectile();


		var missile_x = missile.getX;
		var missile_y = missile.getY;

		//how many scorepoints will be given and taken on impact
		var score_step = 5;
		//check player collision
		if (missile.createdLocally) {
			var enemy_x = enemy.getX;
			var enemy_y = enemy.getY;

			//checks based on missile x, y, width, height and enemy x, y, width, height
			if (missile_x < enemy_x + enemy.getWidth &&
				missile_x + missile.getWidth > enemy_x &&
				missile_y < enemy_y + enemy.getHeight &&
				missile.getHeight + missile_y > enemy_y) {
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
		else {

			var localplayer_x = localplayer.getX;
			var localplayer_y = localplayer.getY;

			//checks based on missile x, y, width, height and enemy x, y, width, height
			if (missile_x < localplayer_x + localplayer.getWidth &&
				missile_x + missile.getWidth > localplayer_x &&
				missile_y < localplayer_y + localplayer.getHeight &&
				missile.getHeight + missile_y > localplayer_y) {
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

//MAIN FUNCTION CALLED 60 TIMES A SECOND
function main() {
	var canvas = document.getElementById('canvas');

	
	
	if (canvas.getContext) {
		
		//loop for next frame
		requestAnimationFrame(main);


		var ctx = canvas.getContext('2d');

		//clear canvas from previous drawing
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		//draw background
		ctx.fillStyle = 'rgb(53, 53, 53, 0)';
		ctx.fillRect(0, 0, canvas.width, canvas.height);


		//if game is running. default is true
		if (game_running) {

			//only if localplayer has been created we handle the movement code
			if (localplayer != 0) {
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
					loc_text = 'Dead';
				ctx.fillText(loc_text, 800, 50);
			}

			//check enemy has been created
			if (enemy != 0) {
				var score = enemy.getScore;
				var loc_text = "Enemy: " + String(score);
				if (score <= 0)
					loc_text = 'Dead';
				ctx.fillText(loc_text, 960, 50);
			}



			//draw localplayer
			if (localplayer != 0) {
				localplayer.drawLocalPlayer();
				
				
			}

			//draw enemy
			//play background music
			
			if (enemy != 0) {
				enemy.drawEnemy();
				music.play();

			}

			//loop every missile in the array
			handleMissilesArray();
		}
		//if game no longer running do something here
		else {

		}

	}
}

//binder for key events and set the boolean value in array to true/false according to the event and keycode
document.body.addEventListener("keydown", function (e) {
	keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function (e) {
	keys[e.keyCode] = false;
});


//emit join message to server
socket.emit('client join');

//start the drawing loop
main();

