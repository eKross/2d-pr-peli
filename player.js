

function getImageBasedOnRoleAndAngle(role, angle) {

	var images = police;
	if (role == 'rosvo')
		images = criminal;

	var img_return = images[0];
	/*if ((angle > 315) || (angle < 45)) {
		img_retn = images[0];
	}
	else if ((angle > 45) && (angle < 135)) {
		img_retn = images[2];
	}
	else if ((angle > 135) && (angle < 225)) {
		img_retn = images[4];
	}
	else if ((angle > 225) && (angle < 315)) {
		img_retn = images[6];
	}*/

	if(angle == 0)
	{
		img_retn = images[0];
	}
	else if(angle == 90)
	{
		img_retn = images[2];
	}
	else if(angle == -90)
	{
		img_retn = images[6];
	}
	else if(angle == 180)
	{
		img_retn = images[4];
	}

	return img_retn;
}

class BasePlayer
{
	constructor(x,y)
	{
		this.x = x;
		this.y = y;
		this.width = 20;
		this.height = 50;
		this.angle = 0;
		this.score = 100;
		this.role = 'undefined';
	}

	setPosition(x,y)
	{		
		this.x = x;
		this.y = y;
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

	get getWidth()
	{
		return this.width;
	}

	get getHeight()
	{
		return this.height;
	}

	setRole(new_role)
	{
		this.role = new_role;
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
	
}
var img = new Image();
img.src = 'exp2.png';
//frame counter
var counter = 0;
//current iteration step of image
var vertical_index = 0;
//movement direction on the image
var horizontal_index = 0;
//death timer
var ticks = 0;
// boolean explosionPlayed
var explosionPlayed = false;
// explosion audio
var explosion = new Audio("Sounds/explosion.mp3");

class LocalPlayer extends BasePlayer
{
	constructor(x,y)
	{
		//this will call the BasePlayer class constructor to setup default values
		super(x,y);
		//velocity is just a placeholder if and until we make more fluent movement code
		this.velocity_x = 0;
		this.velocity_y = 0;
		this.last_x = 0;
		this.last_y = 0;
		this.last_angle = 0;
		//we can access BasePlayer variables here too due class derivation
		this.score = 100;
	}
    //make sure player cant go out of playfield
	handleBounds() {
		var canvas = document.getElementById('canvas');
		//prevent out of bounds values
		if ((this.x + this.width) >= canvas.width) {
			this.x = (canvas.width - this.width) - 10;
			this.velocity_x = 0;

			//went out from right
			//release the key
			keys[39] = false;
			//invert direction
			this.angle = -this.angle;
		}
		else if ((this.x) <= 0) {
			this.x = 10;
			this.velocity_x = -this.velocity_x;
			//went out from left
			//release the key
			keys[37] = false;
			//invert direction
			this.angle = -this.angle;

		}

		if ((this.y) <= 0) {
			this.y = (10);
			this.velocity_y = -this.velocity_y;

			//went out from top
			//release the key
			keys[38] = false;
			//invert direction
			this.angle = 180;
		}
		else if ((this.y + this.height) >= canvas.height) {
			this.y = (canvas.height - this.height) - 10;
			this.velocity_y = 0;
			//went out from bottom
			//release the key
			keys[40] = false;
			//invert direction
			this.angle = 0;
		}
	}

	get getVelocityX()
	{
		return this.velocity_x;
	}

	get getVelocityY()
	{
		return this.velocity_y;
	}

	get getLastX()
	{
		return this.last_x;
	}

	get getLastY()
	{
		return this.last_Y;
	}


	setLastPosition(x,y)
	{
		this.last_x = x;
		this.last_y = y;
	}

	addVelocity(x,y)
	{
		this.velocity_x += x;
		this.velocity_y += y;0
	}


    //draw localplayer
	drawLocalPlayer()
	{
		
		var canvas = document.getElementById('canvas');			
		var ctx = canvas.getContext('2d');
		
		//set wanted text values
		ctx.fillStyle = 'rgba(255, 255, 23)';
		ctx.font = '18px tahoma';
		ctx.textAlign = 'center';		
		var center_x = (this.x + (this.width / 2));
		//draw text on center of this objects size. only on x axis
		ctx.fillText('(you)', center_x, this.y - 20);

		//save canvas current state
		ctx.save();
		//change colour
		ctx.fillStyle = 'rgb(255, 255, 0)';

		//translate the position
		ctx.translate(this.x+this.width/2,this.y+this.height/2);

		//rotate the shape in degrees
		//ctx.rotate(this.angle*Math.PI/180);

		ctx.drawImage(getImageBasedOnRoleAndAngle(this.role,this.getAngle), -64, -64, 128, 128);

		//draw the base rectangle
		ctx.fillRect(-this.width/2, -this.height/2, this.width, this.height);

		ctx.fillStyle = 'rgb(200, 200, 200)';

		//draw gray rect to indicate the current move direction
		ctx.fillRect(-this.width/2, -this.height/2, this.width, 5);

		//restore the original canvas state
		ctx.restore();

		//size of each slice of the image
		var step_width = 62;
		var step_height = 62;
		
	
			if ((this.score) <= 0) {

			ctx.drawImage(img,horizontal_index  * step_width, vertical_index * step_height,
			step_width, step_height, this.x, this.y,step_width,step_height);
			
			// Play explosion sound
			   if (explosionPlayed == false){
                explosion.play();
                explosionPlayed = true;
            }
			
			//check if exp.png is still going
			if ((horizontal_index != 4) && (vertical_index != 4))
			{
				counter++;
			}
			
			if (ticks < 50){
				ticks++;
			}
			else{
				ticks = 51;
			}

			if(counter > 5)
			{
				//next slice
				horizontal_index++;
				//4 slices per horizontal and vertical row
				if (horizontal_index >= 4) {
					horizontal_index = 0;

					//move to next row
					vertical_index++;

					if(vertical_index >= 4)
					{
						//vertical_index = 0;
					}
					
				}

				counter = 0;
			}	
		}
	}
	setLastAngle(angle)
	{
		this.last_angle = angle;
	}

    //check if localplayer has moved or changed angle and network that to the server
	checkSendUpdate() {

		//convert to int to prevent unnecessary updates saving network bandwidth
		var x_int = Math.floor(this.x);
		var y_int = Math.floor(this.y);
		var angle_int = Math.floor(this.angle);

		var lastx_int = Math.floor(this.last_x);
		var lasty_int = Math.floor(this.last_y);
		var last_angle_int = Math.floor(this.last_angle);


		//check comparing previous values if we need to send update to server
		if (x_int != lastx_int || y_int != lasty_int || angle_int != last_angle_int) {

			//emit event to server of our position/angle update
			socket.emit('position update', this.x, this.y, this.angle);			
			//update the latest sent info
			this.setLastPosition(x_int,y_int);
			this.setLastAngle(angle_int);
		}
	}

	setPosition(x,y)
	{	
		super.setPosition(x,y);
		this.handleBounds();
		this.checkSendUpdate();
	}
}

class Enemy extends BasePlayer
{
	constructor(x,y)
	{
		super(x,y);
	}

    //draw networked player
	drawEnemy()
	{
					
		var canvas = document.getElementById('canvas');			
		var ctx = canvas.getContext('2d');


		ctx.save();
		ctx.fillStyle = 'rgb(255, 255, 0)';

		ctx.translate(this.x+this.width/2,this.y+this.height/2);

		//ctx.rotate(this.angle*Math.PI/180);

		ctx.drawImage(getImageBasedOnRoleAndAngle(this.role,this.angle), -64, -64, 128, 128);


		//base draw
		ctx.fillRect(-this.width/2, -this.height/2, this.width, this.height);

		ctx.fillStyle = 'rgb(200, 200, 200)';

		//show which way its facing
		ctx.fillRect(-this.width/2, -this.height/2, this.width, 5);

		ctx.restore();

	}

}
