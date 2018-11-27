

function getImageBasedOnRoleAndAngle(role, angle) {

	var images = police;
	if (role == 'rosvo')
		images = criminal;

	var img_retn = images[0];
	/*if ((angle > 348.75) || (angle < 11.25)){
		img_retn = images[0];
	}
	else if ((angle > 11.25) && (angle < 33.75)){
		img_retn = images[1];
	}
	else if ((angle > 33.75) && (angle < 56.25)){
		img_retn = images[2];
	}
	else if ((angle > 56.25) && (angle < 78.75)){
		img_retn = images[3];
	}
	else if ((angle > 78.75) && (angle < 101.25)){
		img_retn = images[4];
	}
	else if ((angle > 101.25) && (angle < 123.75)){
		img_retn = images[5];
	}
	else if ((angle > 123.75) && (angle < 146.25)){
		img_retn = images[6];
	}
	else if ((angle > 146.25) && (angle < 168.75)){
		img_retn = images[7];
	}
	else if ((angle > 168.75) && (angle < 191.25)){
		img_retn = images[8];
	}
	else if ((angle > 191.25) && (angle < 213.75)){
		img_retn = images[9];
	}
	else if ((angle > 213.75) && (angle < 236.25)){
		img_retn = images[10];
	}
	else if ((angle > 236.25) && (angle < 258.75)){
		img_retn = images[11];
	}
	else if ((angle > 258.75) && (angle < 281.25)){
		img_retn = images[12];
	}
	else if ((angle > 281.25) && (angle < 303.75)){
		img_retn = images[13];
	}
	else if ((angle > 303.75) && (angle < 326.25)){
		img_retn = images[14];
	}
	else if ((angle > 326.25) && (angle < 348.75)){
		img_retn = images[15];
	}*/

	var org_angle = angle;

	//rotate original angle to be facing right direction
	angle += 90.0;

	//normalize the angle to -180 and 180
	var normalized = angle;
    while (normalized <= -180) normalized += 360;
    while (normalized > 180) normalized -= 360;
	
	angle = normalized;

	if(angle < 25 && angle > -25)
	{
		img_retn = images[0];
	}
	else if(angle > 25 && angle < 75)
	{
		img_retn = images[1];
	}
	else if(angle > 75 && angle < 115)
	{
		img_retn = images[2];
	}
	else if(angle > 115 && angle < 165)
	{
		img_retn = images[3];
	}
	else if(angle > 165 && angle <= 180 || (angle <= -165 && angle > -180))
	{
		img_retn = images[4];
	}
	else if(angle < -115 && angle > -165)
	{
		img_retn = images[5];
	}
	else if(angle < -75 && angle > -115)
	{
		img_retn = images[6];
	}
	else if(angle < -25 && angle > -75)
	{
		img_retn = images[7];
	}
	

	return img_retn;
}

class BasePlayer
{
	constructor(x,y)
	{
		this.x = x;
		this.y = y;
		this.width = 84;
		this.height = 84;
		this.angle = 0;
		this.score = 100;
		this.role = 'undefined';
		this.exploding = false;
		this.exploded = false;
		this.explosion_image = new Image();
		this.explosion_image.src = 'exp2.png';
		//frame counter
		this.counter = 0;
		//current iteration step of image
		this.vertical_index = 0;
		//movement direction on the image
		this.horizontal_index = 0;
		this.collision_bounds = [0,0,0,0];
		this.updateCollisionBounds();
	}

	setPosition(x,y)
	{		
		this.x = x;
		this.y = y;
	}

	setExploding(state)
	{
		this.exploding = state;
	}

	
	setExploded(state)
	{
		this.exploded = state;
	}

	get getExploding()
	{
		return this.exploding;
	}

	get getCollisionBounds()
	{
		return this.collision_bounds;
	}

	get getExploded()
	{
		return this.exploded;
	}
	
	setAngle(angl)
	{
		this.angle = angl;
		this.updateCollisionBounds();
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
			this.collision_bounds[2] = 55;//width
			this.collision_bounds[3] = 84;//height
			this.collision_bounds[0] = this.x - (this.collision_bounds[2] / 2);//x 
			this.collision_bounds[1] = this.y - (this.collision_bounds[3] / 2);//y
		}
		else if(direction == 1)//left/right
		{
			this.collision_bounds[2] = 110;//width
			this.collision_bounds[3] = 55;//height
			this.collision_bounds[0] = this.x - (this.collision_bounds[2] / 2);//x 
			this.collision_bounds[1] = this.y - (this.collision_bounds[3] / 2);//y
		}
		else//rest
		{
			this.collision_bounds[2] = 105;//width
			this.collision_bounds[3] = 84;//height
			this.collision_bounds[0] = this.x - (this.collision_bounds[2] / 2);//x 
			this.collision_bounds[1] = this.y - (this.collision_bounds[3] / 2);//y
		}
	}


	doExplosion() {

		var canvas = document.getElementById('canvas');			
		var ctx = canvas.getContext('2d');
		
		this.setExploding(true);

		//size of each slice of the image
		var step_width = 62;
		var step_height = 62;

		ctx.drawImage(this.explosion_image, this.horizontal_index * step_width, this.vertical_index * step_height,
			step_width, step_height, this.x - step_width, this.y - step_height, step_width*2, step_height*2);
	
		//check if exp.png is still going
		if ((this.horizontal_index != 4) && (this.vertical_index != 4)) {
			this.counter++;
		}
		else{
			this.setExploded(true);
		}

		if (this.counter > 5) {
			//next slice
			this.horizontal_index++;
			//4 slices per horizontal and vertical row
			if (this.horizontal_index >= 4) {
				this.horizontal_index = 0;

				//move to next row
				this.vertical_index++;

				if (this.vertical_index >= 4) {
					//vertical_index = 0;
				}

			}

			this.counter = 0;
		}

	}
}

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
		this.velocity_y += y;
	}


	setVelocity(x,y)
	{
		this.velocity_x = x;
		this.velocity_y = y;
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


		//change colour
		ctx.fillStyle = 'rgb(255, 255, 0)';

		//translate the position
	//	ctx.translate(this.x+this.width/2,this.y+this.height/2);

		//rotate the shape in degrees
		//ctx.rotate(this.angle*Math.PI/180);

		ctx.drawImage(getImageBasedOnRoleAndAngle(this.role,this.getAngle), this.x - 64, this.y - 64, 128, 128);


		var collision = this.getCollisionBounds;

		var center_x = (collision[0] + (collision[2] / 2));
		//draw text on center of this objects size. only on x axis
		ctx.fillText('(you)', center_x, this.y - 64);

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


		ctx.drawImage(getImageBasedOnRoleAndAngle(this.role,this.angle), this.x - 64, this.y - 64, 128, 128);

	}

}
