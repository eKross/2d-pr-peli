
var criminal = [];
var police = [];
var wreck = [];
var shadows = [];
var muzzle = [];


const clamp = (n, lo, hi) => n < lo ? lo : n > hi ? hi : n;
var canvas = document.getElementById('canvas');

const map = {
  height: 2048,
  width: 2048
};
const viewport = {};

var images_loading = true;


var developer_mode = false;
var last_frame_time = 0.0;
var framecount = 0;
var last_frame_count = 0;
function preload() {

	var i = 0;
    for (; i < 16; i++) {
        criminal[i] = new Image();
        criminal[i].src = preload.arguments[i];
	}

	 var j = 0;
	 for (; j < 16; j++) {
		 police[j] = new Image();
		 police[j].src = preload.arguments[i+j];
	 }
 
	 var y = 0;
	 for (; y < 16; y++) {
		 wreck[y] = new Image();
		 wreck[y].src = preload.arguments[i+j+y];
	 }

	 var g = 0;
	 for (; g < 16; g++) {
		shadows[g] = new Image();
		shadows[g].src = preload.arguments[i+j+y+g];
	 }

	 
	 var a = 0;
	 for (; a < 16; a++) {
		muzzle[a] = new Image();
		muzzle[a].src = preload.arguments[i+j+y+g+a];
	 }
}
//-- usage --//
preload(
	'Sprites/Criminal/0d/0dsheet.png',
    	'Sprites/Criminal/22,5d/22,5dsheet.png',
        'Sprites/Criminal/45d/45dsheet.png',
        'Sprites/Criminal/67,5d/67,5dsheet.png',
        'Sprites/Criminal/90d/90dsheet.png',
        'Sprites/Criminal/112,5d/112,5dsheet.png',
        'Sprites/Criminal/135d/135dsheet.png',
        'Sprites/Criminal/157,5d/157,5dsheet.png',
        'Sprites/Criminal/180d/180dsheet.png',
        'Sprites/Criminal/-157,5d/-157,5dsheet.png',
        'Sprites/Criminal/-135d/-135dsheet.png',
        'Sprites/Criminal/-112,5d/-112,5dsheet.png',
        'Sprites/Criminal/-90d/-90dsheet.png',
        'Sprites/Criminal/-67,5d/-67,5dsheet.png',
        'Sprites/Criminal/-45d/-45dsheet.png',
        'Sprites/Criminal/-22,5d/-22,5dsheet.png',

        'Sprites/Police/0d/0dsheet.png',
    	'Sprites/Police/22,5d/22,5dsheet.png',
        'Sprites/Police/45d/45dsheet.png',
        'Sprites/Police/67,5d/67,5dsheet.png',
        'Sprites/Police/90d/90dsheet.png',
        'Sprites/Police/112,5d/112,5dsheet.png',
        'Sprites/Police/135d/135dsheet.png',
        'Sprites/Police/157,5d/157,5dsheet.png',
        'Sprites/Police/180d/180dsheet.png',
        'Sprites/Police/-157,5d/-157,5dsheet.png',
        'Sprites/Police/-135d/-135dsheet.png',
        'Sprites/Police/-112,5d/-112,5dsheet.png',
        'Sprites/Police/-90d/-90dsheet.png',
        'Sprites/Police/-67,5d/-67,5dsheet.png',
        'Sprites/Police/-45d/-45dsheet.png',
		'Sprites/Police/-22,5d/-22,5dsheet.png',
		
		'Sprites/Wreck/0d/0dwreck.png',
    	'Sprites/Wreck/22,5d/22,5dwreck.png',
        'Sprites/Wreck/45d/45dwreck.png',
        'Sprites/Wreck/67,5d/67,5dwreck.png',
        'Sprites/Wreck/90d/90dwreck.png',
        'Sprites/Wreck/112,5d/112,5dwreck.png',
        'Sprites/Wreck/135d/135dwreck.png',
        'Sprites/Wreck/157,5d/157,5dwreck.png',
        'Sprites/Wreck/180d/180dwreck.png',
        'Sprites/Wreck/-157,5d/-157,5dwreck.png',
        'Sprites/Wreck/-135d/-135dwreck.png',
        'Sprites/Wreck/-112,5d/-112,5dwreck.png',
        'Sprites/Wreck/-90d/-90dwreck.png',
        'Sprites/Wreck/-67,5d/-67,5dwreck.png',
        'Sprites/Wreck/-45d/-45dwreck.png',
		'Sprites/Wreck/-22,5d/-22,5dwreck.png',
				
		'Sprites/Shadow/0d/0dshadow.png',
    	'Sprites/Shadow/22,5d/22,5dshadow.png',
        'Sprites/Shadow/45d/45dshadow.png',
        'Sprites/Shadow/67,5d/67,5dshadow.png',
        'Sprites/Shadow/90d/90dshadow.png',
        'Sprites/Shadow/112,5d/112,5dshadow.png',
        'Sprites/Shadow/135d/135dshadow.png',
        'Sprites/Shadow/157,5d/157,5dshadow.png',
        'Sprites/Shadow/180d/180dshadow.png',
        'Sprites/Shadow/-157,5d/-157,5dshadow.png',
        'Sprites/Shadow/-135d/-135dshadow.png',
        'Sprites/Shadow/-112,5d/-112,5dshadow.png',
        'Sprites/Shadow/-90d/-90dshadow.png',
        'Sprites/Shadow/-67,5d/-67,5dshadow.png',
        'Sprites/Shadow/-45d/-45dshadow.png',
		'Sprites/Shadow/-22,5d/-22,5dshadow.png',

		'Sprites/Muzzle/0d/0dbang.png',
    	'Sprites/Muzzle/22,5d/22,5dbang.png',
		'Sprites/Muzzle/45d/45dbang.png',
		'Sprites/Muzzle/67,5d/67,5dbang.png',
		'Sprites/Muzzle/90d/90dbang.png',
		'Sprites/Muzzle/112,5d/112,5dbang.png',
		'Sprites/Muzzle/135d/135dbang.png',
		'Sprites/Muzzle/157,5d/157,5dbang.png',
		'Sprites/Muzzle/180d/180dbang.png',
		'Sprites/Muzzle/-157,5d/-157,5dbang.png',
		'Sprites/Muzzle/-135d/-135dbang.png',
		'Sprites/Muzzle/-112,5d/-112,5dbang.png',
		'Sprites/Muzzle/-90d/-90dbang.png',
		'Sprites/Muzzle/-67,5d/-67,5dbang.png',
		'Sprites/Muzzle/-45d/-45dbang.png',
		'Sprites/Muzzle/-22,5d/-22,5dbang.png',

)
/*preload(
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
)*/

//jsquery stuff for usename box
// Initialize variables
var $window = $(window);
var $usernameInput = $('.usernameInput'); // Input for username
var $inputMessage = $('.inputMessage'); // Input message input box

var $loginPage = $('.login.page'); // The login page
var $currentInput = $usernameInput.focus();
var username;
// Sets the client's username
var localplayer_username = "none";
const cleanInput = (input) => {
	return $('<div/>').text(input).html();
}

const setUsername = () => {
	username = cleanInput($usernameInput.val().trim());

	// If the username is valid
	if (username) {
		$loginPage.fadeOut();
		$loginPage.off('click');
		$currentInput = $inputMessage.focus();
		localplayer_username = username;
	}
}

$window.keydown(event => {
	// Auto-focus the current input when a key is typed
	if (!(event.ctrlKey || event.metaKey || event.altKey)) {
		$currentInput.focus();
	}
	// When the client hits ENTER on their keyboard
	if (event.which === 13) {
		if (username) {
			var typing = false;
		} else {
			setUsername();
		}
	}
});

// audio
var music = new Audio('Sounds/2d-rp-peli-menu-2.wav');
music.volume = 0.02;
music.loop = true;
var weapon = new Audio('Sounds/Weapon.mp3');
weapon.volume = 0.02;
var engine = new Audio('Sounds/engine.wav');
engine.volume = 0.02;

//boolean array for all keycodes to detect keys
var keys = [];
	  
//if this is true game will be drawn and run normally
var game_running = false;

//global enemy
var enemy = 0;
//global localplayer
var localplayer = 0;

//globals for room related stuff
var started_yet = false;
var localplayer_died = false;
var enemy_died = false;
var delay = 0.0;

var room_index = -1;

var accelerate = 0.02;
var last_fire_time = 0.0;
var angularVel = 0.0;
var angularFriction = 0.92;

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


	//moving inverse is the case that player has hit border of the playfield and he needs to bounce back so move him in the inverse direction
	//and if again he hits the opposite border inverse movement will be back to normal and so on until he releases all keys
	//down arrow key or S
	if (keys[40] || keys[83]) {
		if (localplayer.getMovingInverse) {
			if (accelerate < speed)
				vel_y -= accelerate;
			else
				vel_y -= speed;
		}
		else {


			if (accelerate < speed)
				vel_y += accelerate;
			else
				vel_y += speed;
		}
		engine.play();
	}
	//up arrow key or W
	if (keys[38] || keys[87]) {
		if (localplayer.getMovingInverse) {

			if (accelerate < speed)
				vel_y += accelerate;
			else
				vel_y += speed;
		}
		else {
			if (accelerate < speed)
				vel_y -= accelerate;
			else
				vel_y -= speed;
		}
		engine.play();

	}
	//right arrow key or D
	if (keys[39] || keys[68]) {
		if (localplayer.getMovingInverse) {
			if (accelerate < speed)
				vel_x -= accelerate;
			else
				vel_x -= speed;
		}
		else {
			if (accelerate < speed)
				vel_x += accelerate;
			else
				vel_x += speed;
		}
		engine.play();

	}
	//left arrow key or A
	if (keys[37] || keys[65]) {

		if (localplayer.getMovingInverse) {
			if (accelerate < speed)
				vel_x += accelerate;
			else
				vel_x += speed;
		}
		else {
			if (accelerate < speed)
				vel_x -= accelerate;
			else
				vel_x -= speed;
		}
		engine.play();
	}
	if (!keys[37] && !keys[38] && !keys[39] && !keys[40]
		&& !keys[83] && !keys[87] && !keys[68] && !keys[65]) {
		accelerate = 0.02;
		localplayer.setMovingInverse(false);
	}
	else {
		localplayer.setHasMoved(true);
	}



	if (!localplayer.getHasMoved && !keys[32])
		return;

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
		console.log(hyp);
		if(vel_x < -0.1 || vel_x > 0.1 || vel_y < -0.1 || vel_y > 0.1)
		{
			delta_x = (delta_x / hyp);
			delta_y = (delta_y / hyp);
			var  rad = Math.atan2(delta_y,delta_x);
			//radians to degrees
			angle = rad/Math.PI * 180;


			var total_vel = (Math.abs(vel_x) + Math.abs(vel_y));
			//experimental sliding when shift is down
			if(keys[16] && total_vel > 10)
			{
				angle += angularVel;
				angularVel *= angularFriction;

				if(angle > 0.0)
				{
					angularVel += 3;
				}
				else{
					angularVel -= 3;
				}

				vel_x += Math.sin(angle) * 0.5;
				vel_y += Math.cos(angle) * 0.5;
		}

			localplayer.setAngle(angle);		
			localplayer.setLastDelta(delta_x,delta_y);	
		}
	}
	else//player has not moved in while... lets use latest delta points when he moved
	{
		delta_x = localplayer.getLastDeltaX;
		delta_y = localplayer.getLastDeltaY;

		if (delta_x > 0.0 || delta_x < 0.0 || delta_y > 0.0 || delta_y < 0.0) {

		}
		else//no stored delta.... player has not moved yet since start of the game
		{

		
			//reverse Math.atan2()
			//calculate reverse positions from angle...
			//we use "guess" amount of lenght (5) so we can calculate the reverse points from angle
			var theta = localplayer.getAngle * Math.PI / 180.0;
			var proposed_len = 5;
			var reverse_x = proposed_len * Math.cos(theta);
			var reverse_y = proposed_len * Math.sin(theta);

			delta_x = reverse_x;
			delta_y = reverse_y;

			var hyp = Math.sqrt(delta_x * delta_x + delta_y * delta_y);

			if (hyp > 0.0 || hyp < 0.0) {
				delta_x = (delta_x / hyp);
				delta_y = (delta_y / hyp);
			}
		}

		var rad = Math.atan2(delta_y, delta_x);
		//radians to degrees
		angle = rad / Math.PI * 180;
	}

	localplayer.setVelocity(vel_x, vel_y);
	//set new position and angle
	//localplayer.setAngle(angle);			
	localplayer.setPosition(pos_x, pos_y);

	//current time in seconds
	var curtime = new Date().getTime() / 1000;
	//elapsed time
	var delta = (curtime - last_fire_time);

	//spacebar
	//delay shots by 0.2 seconds so player cannot constantly shoot
	if (keys[32] && delta > 0.2) {

		var collision = localplayer.getCollisionBounds;
		//create new missile 	

		var missile = new projectile(0, 0);


		var new_x = collision[0] + (collision[2] / 2) - (missile.getWidth / 2);
		var new_y = collision[1] + (collision[3] / 2) - (missile.getHeight / 2);

		missile.setPosition(new_x, new_y);

		//mark this missile as created by localplayer so it's not considered networked
		missile.setCreatedLocally();

		missile.setAngle(angle);
		missile.setEndPosition(delta_x, delta_y);
		missile.setAimAssistTime(curtime + missile.getAimAssistDelay);

		projectiles.push(missile);

		//send server information that we fired a missile
		socket.emit('create projectile', localplayer.getRole, room_index, missile.getX, missile.getY, angle,
			missile.getEndPositionX, missile.getEndPositionY, curtime + missile.getAimAssistDelay);
		//set the spacebar value as false so we only fire once per event
		weapon.play();
		//set playtime to 0 so sound plays nicely when firing
		weapon.currentTime = 0.0;
		last_fire_time = curtime;

		localplayer.setFiredProjectile(true);
	}



}

function ApproachTarget(value,target,speed)
{

	var delta = (target - value);
	// Speed is assumed to be positive
	if ( speed < 0 )
		speed = -speed;


	if ( delta > speed )
		value += speed;
	else if ( delta < -speed )
		value -= speed;
	else 
		value = target;

	return value;
}

//loop of all active projectiles move them, draw them and remove them if needed
function handleMissilesArray() {
	//movement speed of missile
	var projectile_speed = 15;
	for (i = 0; i < projectiles.length; i++) {
		var missile = projectiles[i];

		var missile_x = missile.getX;
		var missile_y = missile.getY;

		//draw the missile
		missile.drawProjectile();



		/*//how many scorepoints will be given and taken on impact
		var score_step = 5;
		//check player collision
		if (missile.createdLocally && enemy != 0) {

			if (missile.checkCollision(enemy)) {

				var score = enemy.getScore;
				enemy.setScore(score - score_step);

				//remove projectile from array
				projectiles.splice(i, 1);

			}
		}
		else if (enemy != 0 && !missile.createdLocally) {


			if (missile.checkCollision(localplayer)) {
				var score = localplayer.getScore;

				localplayer.setScore(score - score_step);

				//remove projectile from array
				projectiles.splice(i, 1);

			}
		}*/

	}
}

function drawOutOfFieldArrows() {

	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');

	var collision = enemy.getCollisionBounds;
	var enemy_x = collision[0] + (collision[2] / 2);
	var enemy_y = collision[1] + (collision[3] / 2);

	//calculated absolute values from viewport
	var viewport_x_norm = Math.abs(viewport.x);
	var viewport_y_norm = Math.abs(viewport.y);
	var viewport_w_norm = viewport_x_norm + canvas.width;
	var viewport_h_norm = viewport_y_norm + canvas.height;

	//dont draw if his collision center is in our viewport
	var should_draw = !(enemy_x > viewport_x_norm && enemy_x < viewport_w_norm
		&& enemy_y > viewport_y_norm && enemy_y < viewport_h_norm);


	if (should_draw) {

		//give it a slight offset
		var screen_offset = 30;
		var goal_x = enemy_x - screen_offset;
		var goal_y = enemy_y - screen_offset;

		//clamp is to our viewport
		goal_x = clamp(goal_x,(viewport_x_norm + screen_offset),(viewport_w_norm - screen_offset));
		goal_y = clamp(goal_y,(viewport_y_norm + screen_offset),(viewport_h_norm - screen_offset));


		//make it blink on alpha based on frames
		var alpha = (1.0 - (((clamp(framecount,1,1000)) / 100) * 1.2));
		if(localplayer.getRole == 'poliisi')
			ctx.fillStyle = 'rgba(185, 32, 32,' + ' ' + String(alpha) + ')';
		else
			ctx.fillStyle = 'rgba(32, 32, 235,' + ' ' + String(alpha) + ')';

		var draw_x = goal_x + viewport.x;
		var draw_y = goal_y + viewport.y;

		//calculate delta position from us to enemy so we can rotate triangle properly
		var delta_x = (localplayer.getX - enemy_x);
		var delta_y = (localplayer.getY - enemy_y);

		var angle = 0;
		var hyp = Math.sqrt(delta_x * delta_x + delta_y * delta_y);
		//make sure hypotenuse has some length
		if (hyp > 0.0 || hyp < 0.0) {

			delta_x = (delta_x / hyp);
			delta_y = (delta_y / hyp);
			var rad = Math.atan2(delta_y, delta_x);
			//radians to degrees
			angle = rad / Math.PI * 180;
		}

		var draw_w = 25;
		var draw_h = 25;

		//draw triangle rotated towards enemy
		ctx.save();
		ctx.translate(draw_x, draw_y, draw_w / 2, draw_h / 2);
		ctx.rotate(angle * Math.PI / 180);
		ctx.beginPath();
		ctx.moveTo(75, 50);
		ctx.lineTo(100, 75);
		ctx.lineTo(100, 25);
		ctx.fill();
		ctx.restore();

	}
}
var iter = 0;
var iter_move = 0;
var step = 0;
var movement = 0;
var movement_direction = false;
function drawAnimatedEndText(animated_text)
{
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');

		//top text drawn at center on x axis
		ctx.fillStyle = 'rgba(255, 255, 23)';

		var font_size = 68;
	
		ctx.font = '68px tahoma';
		ctx.textAlign = 'center';
	
		var center_x = (canvas.width / 2);
	
		iter++;
		iter_move++;
	
		if(iter > 6)
		{
			iter = 0;
			step++;
		}
	
		if(iter_move > 4)
		{
			iter_move = 0;
	
			var step_size = 2;
			if(!movement_direction)
			{
				movement -= step_size;
	
			}
			else
			{
				movement += step_size;
			}
			
			if(movement >= 30 || movement <= -30)
				movement_direction = !movement_direction;
		}
	
		if(step >= animated_text.length)
			step = 0;
	
		var offset = 0;
		for(i = 0;i < animated_text.length;i++)
		{
			//build nice color changes
			var red = clamp((255 - (movement * 5)),0,255);
			var green = 230;
			var blue = clamp(0 + (i*35),0,255);
	
			ctx.fillStyle = 'rgba(' + String(red) + ',' + String(green) +', ' + String(blue) + ")";
	
			if(step == i)
			{
				ctx.fillText(animated_text[i], center_x - ((font_size / 2) * animated_text.length / 2)+offset, 200 + movement);
			}
			else
			{
				ctx.fillText(animated_text[i], center_x - ((font_size / 2) * animated_text.length / 2) + offset, 200);
			}
	
			//width of text on single character is buggy.		
			var text_width = ctx.measureText(animated_text[i]).width;
			//hardcoded value... half of font size
			offset += text_width;

			if(animated_text[i] == 'l')
				offset += 9;
		}
}

var background_img = new Image();
background_img.src = 'Sprites/mapbase.png';


background_img.addEventListener('load', function() {
	images_loading = false;
  }, false);

var obj3 = new collectible(900, 300);
var obj = new ObjectObstacle(345, 345);
var obj2 = new ObjectObstacle(845, 1045);
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




		//if game is running. default is true
		if (game_running) {

			//only if localplayer has been created we handle the movement code
			//only if not exploding or exploded
			if (localplayer != 0 && !localplayer.getExploding && !localplayer.getExploded) {
				handleLocalPlayerKeys();
			}


			if (localplayer != 0) {
				var score = localplayer.getScore;
				if (score <= 0) {
					localplayer_died = true;
				}
			}

			//check enemy has been created
			if (enemy != 0) {
				var score = enemy.getScore;
				if (score <= 0) {
					enemy_died = true;
				}
			}

			//draw localplayer
			if (localplayer != 0) {


				//calculate viewport position based on our position,canvas size and whole map size
				//viewport controls rest of our drawing positions
				viewport.x = clamp(-localplayer.getX + canvas.width / 2, canvas.width - map.width, 0 );
				viewport.y = clamp(-localplayer.getY + canvas.height / 2, canvas.height - map.height, 0);

				//our background is drawn here...
				//we only draw image slice based on canvas size and its offsetted from background image based on viewport position
				ctx.drawImage(background_img, 0, 0,
					map.width, map.height, viewport.x,viewport.y, map.width, map.height);
					
							
					
				//ctx.drawImage(cur_image, this.animation_horizontal_index * step_width, this.animation_vertical_index * step_height,
				//	step_width, step_height, 0,0, this.scale_to_draw_w, this.scale_to_draw_h);
					
				obj.drawObject(viewport.x, viewport.y);
				obj.checkCollision(localplayer);


				obj2.drawObject(viewport.x, viewport.y);
				obj2.checkCollision(localplayer);
			
			
				obj3.drawObject(viewport.x, viewport.y);
				
				
				
				//how many scorepoints will be added
				var score_step = 20;
				//check player collision
				if (enemy != 0)
				{

					if (obj3.checkCollision(enemy)) 
					{

				    	var score = enemy.getScore;
				    	var new_score = clamp(score+score_step,0,100);
				    	enemy.setScore(new_score);
				
		        	}
	        	}
			


				if (obj3.checkCollision(localplayer)) 
				{
				    var score = localplayer.getScore;

					var new_score = clamp(score+score_step,0,100);
				    localplayer.setScore(new_score);

				}
	        	
		

				localplayer.drawLocalPlayer();
			}



			//draw enemy
			if (enemy != 0) {

				//indicators to show if enemy is out of our viewport
				drawOutOfFieldArrows();

				enemy.drawEnemy();
				music.play();
			}

			//loop every missile in the array
			handleMissilesArray();


			//explosions when either one hp/score reaches 0
			if (localplayer != 0) {
				if (localplayer_died) {
					localplayer.doExplosion();
					if (localplayer.getExploded) {
						localplayer = 0;
						enemy = 0;
						while (projectiles.length) {
							projectiles.pop();
						}
						game_running = false;
						delay = new Date().getTime() / 1000;

					}
				}

				if (enemy_died && enemy != 0) {
					enemy.doExplosion();
					if (enemy.getExploded) {
						localplayer = 0;
						enemy = 0;
						while (projectiles.length) {
							projectiles.pop();
						}
						game_running = false;
						delay = new Date().getTime() / 1000;
					}
				}
			}

			//top text drawn at center on x axis
			ctx.fillStyle = 'rgba(255, 255, 23)';
			ctx.font = '28px tahoma';
			ctx.textAlign = 'start';
			var center_x = (canvas.width / 2);
			var text = "Rosvo & Poliisi | Room: " + rooms[room_index].getName;
			ctx.fillText(text, 50, 50);

			//draw fps
			ctx.textAlign = 'end';
			var fps_text = "FPS: " + String(last_frame_count);
			ctx.fillText(fps_text, canvas.width - 50, 50);

			//current time in seconds
			//see how many frames we ran past second
			var curtime = new Date().getTime() / 1000;
			if ((curtime - last_frame_time) >= 1.0) {
				last_frame_count = framecount;
				framecount = 0;
				last_frame_time = curtime;
			}
			else {
				framecount++;
			}

		}
		//if game no longer running display the ending screen
		else {
			var ctx = canvas.getContext('2d');
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			//background
			ctx.fillStyle = 'rgb(255, 53, 53,0.5)';
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			if (localplayer_died)
				drawAnimatedEndText("You lost");
			else if (enemy_died)
				drawAnimatedEndText("You won");



			//current time in seconds
			var curtime = new Date().getTime() / 1000;
			//elapsed time
			var delta = (curtime - delay);

			//delay this screen abit so player has time to read it
			if (delta > 5) {
				socket.emit('game ended', room_index);
				started_yet = false;
				room_index = -1;
				music.pause();

			}
		}

	}
}
var loading_step = 0;
var loading_tick = 0;
//MAIN FUNCTION CALLED 60 TIMES A SECOND
function main()
{

	//if F2 is pressed we toggle developer mode on...
	if(keys[113])
	{
		developer_mode = !developer_mode;
		keys[113] = false;
	}
	var canvas = document.getElementById('canvas');
	requestAnimationFrame(main);

	var ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	//background
	ctx.fillStyle = 'rgb(0, 123, 123,0.5)';
	ctx.fillRect(0,0,canvas.width, canvas.height);



    if (canvas.getContext && rooms.length > 0 && !started_yet && localplayer_username != "none") {
				
		var ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, canvas.width, canvas.height);


		if (images_loading) {
			//background
			ctx.fillStyle = 'rgb(53, 53, 53,0.5)';
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			//top text drawn at center on x axis
			ctx.fillStyle = 'rgba(255, 255, 23)';
			ctx.font = '38px tahoma';
			ctx.textAlign = 'center';

			loading_tick++;

			if(loading_tick > 20)
			{
				loading_step++;

				if(loading_step > 3)
				loading_step = 0;

				loading_tick = 0;
			}
			var add = "";
			if(loading_step == 1)
				add = ".";
			else if(loading_step == 2)
				add = "..";
			else if(loading_step == 3)
				add = "...";

			var text = "Loading resources";
			ctx.fillText(text, canvas.width / 2, canvas.height / 2);

			ctx.fillText(add,(canvas.width / 2) + ctx.measureText(text).width + 2,canvas.height / 2);
		}
		else{
			//background
			ctx.fillStyle = 'rgb(53, 53, 53,0.5)';
			ctx.fillRect(0,0,canvas.width, canvas.height);

			//do room choosing etc...
			//will start the game when chosen a room and got start info from server
			HandleRoomsLogic();
		}
	}
	else  if (canvas.getContext && started_yet && localplayer_username != "none")
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
	if(room_index > -1)
		socket.emit('player left',room_index);  
	localplayer = 0;     
});


//emit join message to server
socket.emit('client join');

//start the loop
main();

