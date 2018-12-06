
	//frame counter
var counter = 0;
	//current iteration step of image
var vertical_index = 0;
	//movement direction on the image
var horizontal_index = 0;

var img_type_car = 0;
var img_type_explode = 1;
var img_type_shadow = 2;
var img_type_muzzle = 3;

function getImageBasedOnRoleAndAngle(img_type,role, angle) {

	var images = police;

	switch(img_type)
	{
		case img_type_explode:
			images = wreck;
			break;
		case img_type_shadow:
			images = shadows;
			break;
		case img_type_muzzle:
			images = muzzle;
			break;
	}

	if (img_type == img_type_car && role == 'rosvo')
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

	/*if(angle < 25 && angle > -25)
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
	}*/

	if ((angle > -11.25) && (angle < 11.25)){
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
    else if(angle > 168.75 && angle <= 180 || (angle <= -168.75 && angle >= -180)){
        img_retn = images[8];
    }
    else if ((angle < -146.25) && (angle > -168.75)){
        img_retn = images[9];
    }
    else if ((angle < -123.75) && (angle > -146.25)){
        img_retn = images[10];
    }
    else if ((angle < -101.25) && (angle > -123.75)){
        img_retn = images[11];
    }
    else if ((angle < -78.75) && (angle > -101.25)){
        img_retn = images[12];
    }
    else if ((angle < -56.25) && (angle > -78.75)){
        img_retn = images[13];
    }
    else if ((angle < -33.75) && (angle > -56.25)){
        img_retn = images[14];
    }
    else if ((angle < -11.25) && (angle > -33.75)){
        img_retn = images[15];
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
		this.explosion_image.src = 'Sprites/exp2.png';
		//frame counter
		this.counter = 0;
		//current iteration step of image
		this.vertical_index = 0;
		//movement direction on the image
		this.horizontal_index = 0;
		this.collision_bounds = [0,0,0,0];
		this.animation_vertical_index = 0;
		this.animation_horizontal_index = 0;
		this.animation_counter = 0;
		this.last_x = this.x;
		this.last_y = this.y;
		
		this.scale_to_draw_w = 200;
		this.scale_to_draw_h = 200;
		this.fired_a_projectile = false;

		this.updateCollisionBounds();
	}

	setPosition(x,y)
	{		
		this.x = x;
		this.y = y;
		this.updateCollisionBounds();
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

	get getFiredProjectile()
	{
		return this.fired_a_projectile;
	}

	setFiredProjectile(state)
	{
		this.fired_a_projectile = state;
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

	setLastPosition(x,y)
	{
		this.last_x = x;
		this.last_y = y;
	}
	get getLastX()
	{
		return this.last_x;
	}

	get getLastY()
	{
		return this.last_y;
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


	doExplosion() {

		var canvas = document.getElementById('canvas');			
		var ctx = canvas.getContext('2d');
		
		this.setExploding(true);

		//size of each slice of the image
		var step_width = 62;
		var step_height = 62;

		ctx.drawImage(this.explosion_image, this.horizontal_index * step_width, this.vertical_index * step_height,
			step_width, step_height, this.getCollisionBounds[0]+viewport.x,this.getCollisionBounds[1]+viewport.y, step_width*2, step_height*2);
	
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
		this.last_angle = 0;
		this.last_delta_x = 0;
		this.last_delta_y = 0;
		this.moving_inverse = false;
		//we can access BasePlayer variables here too due class derivation
		this.score = 100;
	}
    //make sure player cant go out of playfield
	handleBounds() {
		var canvas = document.getElementById('canvas');
		//prevent out of bounds values

		var collision = this.getCollisionBounds;

		var col_x = this.x + viewport.x;
		var col_y = this.y + viewport.y;
		var col_w = this.scale_to_draw_w;
		var col_h = this.scale_to_draw_h;

		//penalty to the user if he hits wall so he gets slowed down going the inverse direction
		var vel_drop_scale = 0.52;

		if ((col_x + col_w) >= (map.width - canvas.width)) {
			this.x = map.width - col_w - 50;
			this.velocity_x = -(this.velocity_x * vel_drop_scale);
			this.moving_inverse = !this.moving_inverse;
		}
		else if ((col_x) <= 5) {
			this.x = viewport.x + 5;
			this.velocity_x = -(this.velocity_x * vel_drop_scale);
			this.moving_inverse = !this.moving_inverse;
		}

		if ((col_y) <= 5) {
			this.y = viewport.y + 5;
			this.velocity_y = -(this.velocity_y * vel_drop_scale);

			this.moving_inverse = !this.moving_inverse;
		}
		else if ((col_y + col_h) >= (map.height - canvas.height - 300)) {
			this.y = (map.height - col_h);
			this.velocity_y = -(this.velocity_y * vel_drop_scale);
			this.moving_inverse = !this.moving_inverse;
		}
		this.updateCollisionBounds();
	}


	setMovingInverse(state)
	{
		this.moving_inverse = state;
	}

	get getMovingInverse()
	{
		return this.moving_inverse;
	}
	get getVelocityX()
	{
		return this.velocity_x;
	}

	get getVelocityY()
	{
		return this.velocity_y;
	}

	get getLastDeltaX()
	{
		return this.last_delta_x;
	}

	get getLastDeltaY()
	{
		return this.last_delta_y;
	}


	setLastDelta(x,y)
	{
		this.last_delta_x = x;
		this.last_delta_y = y;
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




		//translate the position
	//	ctx.translate(this.x+this.width/2,this.y+this.height/2);

		//rotate the shape in degrees
		//ctx.rotate(this.angle*Math.PI/180);

		//ctx.drawImage(getImageBasedOnRoleAndAngle(this.role,this.getAngle), this.x - 64, this.y - 64, 128, 128);
		ctx.save();
		ctx.translate(this.getX + viewport.x, this.getY + viewport.y);

		//size of each slice of the image
		var step_width = 512;
		var step_height = 512;


		var shadow_img = getImageBasedOnRoleAndAngle(img_type_shadow,this.role,this.getAngle);
		ctx.drawImage(shadow_img, 0,0,
			step_width, step_height, 0,0, this.scale_to_draw_w, this.scale_to_draw_h);


		var explode = (this.exploding || this.exploded);
		var cur_image = getImageBasedOnRoleAndAngle((explode ? img_type_explode : img_type_car),this.role,this.getAngle);

		var collision = this.getCollisionBounds;

		if (explode) {
			ctx.drawImage(cur_image, 0,0,
				step_width, step_height, 0,0, this.scale_to_draw_w, this.scale_to_draw_h);
		}
		else{
			ctx.drawImage(cur_image, this.animation_horizontal_index * step_width, this.animation_vertical_index * step_height,
				step_width, step_height, 0,0, this.scale_to_draw_w, this.scale_to_draw_h);


			var total_vel = (Math.abs(this.velocity_x) + Math.abs(this.velocity_y));


			if (total_vel > 0.1 || total_vel < -0.1) {
				//36 is maximum velocity player can reach on the playfield... calculate dynamicly maybe?
				var speed_scale = (36 - total_vel) / 15;

				this.animation_counter++;
				if (this.animation_counter > speed_scale) {
					//next slice
					this.animation_horizontal_index++;
					//4 slices per horizontal and vertical row
					if (this.animation_horizontal_index >= 3) {
						this.animation_horizontal_index = 0;

						//move to next row
						this.animation_vertical_index++;

						if (this.animation_vertical_index >= 3) {
							this.animation_vertical_index = 0;
						}

					}

					this.animation_counter = 0;
				}
			}
		}

		if(this.getFiredProjectile)
		{
			
			var muzzle_img = getImageBasedOnRoleAndAngle(img_type_muzzle,this.role,this.getAngle);
			ctx.drawImage(muzzle_img, 0,0,
				step_width, step_height, 0,0, this.scale_to_draw_w, this.scale_to_draw_h);

				this.setFiredProjectile(false);
		}

		ctx.restore();

		var collision = this.getCollisionBounds;

		var center_x = (collision[0] + (collision[2] / 2)) + viewport.x;

		ctx.fillStyle = 'rgba(60, 60, 60, 0.8';

		//+ 2 is to adjust so its not exact
		var text_width = ctx.measureText(localplayer_username).width + 10;
        var text_height = 18;
		var scaled_height = (text_height * 1.5);//multiply with 1.5 to get somewhat accurate bounding size...
		

		ctx.fillRect(center_x - (text_width / 2),collision[1] - 30 - (scaled_height / 2)  + viewport.y,text_width,scaled_height);

		ctx.strokeStyle = 'rgba(255, 255, 255)';
		ctx.strokeRect(center_x - (text_width / 2) - 1,collision[1] - 30 - (scaled_height / 2) - 1  + viewport.y,text_width + 2,scaled_height + 2);
		//change colour
		ctx.fillStyle = 'rgb(70, 120, 255)';
		//draw text on center of this objects size. only on x axis
		ctx.fillText(localplayer_username, center_x, collision[1]  - 30 + 5 + viewport.y);

		if(developer_mode)
		{
			//visualize the collision box... for debugging purposes
			ctx.fillRect(collision[0] + (collision[2] / 2),collision[1] + (collision[3] / 2),10,10);
			ctx.strokeStyle = 'rgba(0, 255, 255)';
			ctx.strokeRect(collision[0],collision[1],collision[2],collision[3]);
		}

		//healthbar code
		var health = this.score;
		var max_health = 100;
		if(health > 0)
		{
			var hp_bar_w = 120;
			var hp_bar_h = 15;
			ctx.fillStyle = 'rgb(49, 40, 40)';
			var size_of_step = (hp_bar_w/max_health);

			var steps = (size_of_step*health);
			var bar_width = (steps + hp_bar_w) - hp_bar_w;

			var y_offset = 75;

			//background
			ctx.fillRect(center_x - (hp_bar_w / 2),collision[1] - y_offset + viewport.y,hp_bar_w,hp_bar_h);

			ctx.fillStyle = 'rgb(0, 255, 0)';
			//fill portion
			ctx.fillRect(center_x - (hp_bar_w / 2),collision[1] - y_offset + viewport.y,bar_width,hp_bar_h);

			//outline
			ctx.strokeStyle = 'rgba(255, 255, 255)';
			ctx.strokeRect(center_x - (hp_bar_w / 2) - 1,collision[1] - y_offset - 1 + viewport.y,hp_bar_w + 2,hp_bar_h + 2);

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
	constructor(username,x,y)
	{
		super(x,y);
		this.username = username;
	}

    //draw networked player
	drawEnemy()
	{
					
		var canvas = document.getElementById('canvas');			
		var ctx = canvas.getContext('2d');


		//size of each slice of the image
		var step_width = 512;
		var step_height = 512;
		
		ctx.save();
		ctx.translate(this.getX + viewport.x, this.getY + viewport.y);
		var shadow_img = getImageBasedOnRoleAndAngle(img_type_shadow,this.role,this.getAngle);
		ctx.drawImage(shadow_img, 0,0,
			step_width, step_height, 0,0, this.scale_to_draw_w, this.scale_to_draw_h);


		var explode = (this.exploding || this.exploded);
		var cur_image = getImageBasedOnRoleAndAngle((explode ? img_type_explode : img_type_car),this.role,this.getAngle);



		var collision = this.getCollisionBounds;
		if (explode) {
			ctx.drawImage(cur_image, 0, 0,
				step_width, step_height, 0,0, this.scale_to_draw_w, this.scale_to_draw_h);
		}
		else {
			ctx.drawImage(cur_image, this.animation_horizontal_index * step_width, this.animation_vertical_index * step_height,
				step_width, step_height, 0,0, this.scale_to_draw_w, this.scale_to_draw_h);

			//we dont network velocity from enemy... calculate last position and current position delta
			var total_vel = (Math.abs(this.getX - this.getLastX) + Math.abs(this.getY - this.getLastY));


			if (total_vel > 2 || total_vel < -2) {
				//36 is maximum velocity player can reach on the playfield... calculate dynamicly maybe?
				var speed_scale = (36 - total_vel) / 15;

				this.animation_counter++;
				if (this.animation_counter > speed_scale) {
					//next slice
					this.animation_horizontal_index++;
					//4 slices per horizontal and vertical row
					if (this.animation_horizontal_index >= 3) {
						this.animation_horizontal_index = 0;

						//move to next row
						this.animation_vertical_index++;

						if (this.animation_vertical_index >= 3) {
							this.animation_vertical_index = 0;
						}

					}

					this.animation_counter = 0;
				}
			}
		}

		if(this.getFiredProjectile)
		{
			
			var muzzle_img = getImageBasedOnRoleAndAngle(img_type_muzzle,this.role,this.getAngle);
			ctx.drawImage(muzzle_img, 0,0,
				step_width, step_height, 0,0, this.scale_to_draw_w, this.scale_to_draw_h);

				this.setFiredProjectile(false);
		}


		ctx.restore();
		var collision = this.getCollisionBounds;

		var center_x = (collision[0] + (collision[2] / 2)) + viewport.x;

		ctx.fillStyle = 'rgba(60, 60, 60, 0.8';

		//+ 2 is to adjust so its not exact
		var text_width = ctx.measureText(this.username).width + 10;
        var text_height = 18;
		var scaled_height = (text_height * 1.5);//multiply with 1.5 to get somewhat accurate bounding size...
		

		ctx.fillRect(center_x - (text_width / 2),collision[1] - 30 - (scaled_height / 2) + viewport.y,text_width,scaled_height);

		ctx.strokeStyle = 'rgba(255, 255, 255)';
		ctx.strokeRect(center_x - (text_width / 2) - 1,collision[1] - 30 - (scaled_height / 2) - 1 + viewport.y,text_width + 2,scaled_height + 2);
		//change colour
		ctx.fillStyle = 'rgb(255, 0, 255)';
		//draw text on center of this objects size. only on x axis
		ctx.fillText(this.username, center_x, collision[1] - 30 + 5 + viewport.y);


		//healthbar code
		var health = this.score;
		var max_health = 100;
		if (health > 0) {
			var hp_bar_w = 120;
			var hp_bar_h = 15;
			ctx.fillStyle = 'rgb(49, 40, 40)';
			var size_of_step = (hp_bar_w / max_health);

			var steps = (size_of_step * health);
			var bar_width = (steps + hp_bar_w) - hp_bar_w;

			var y_offset = 75;

			//background
			ctx.fillRect(center_x - (hp_bar_w / 2), collision[1] - y_offset + viewport.y, hp_bar_w, hp_bar_h);

			ctx.fillStyle = 'rgb(0, 255, 0)';
			//fill portion
			ctx.fillRect(center_x - (hp_bar_w / 2), collision[1] - y_offset + viewport.y, bar_width, hp_bar_h);

			//outline
			ctx.strokeStyle = 'rgba(255, 255, 255)';
			ctx.strokeRect(center_x - (hp_bar_w / 2) - 1, collision[1] - y_offset - 1 + viewport.y, hp_bar_w + 2, hp_bar_h + 2);

		}
	
	}

}
