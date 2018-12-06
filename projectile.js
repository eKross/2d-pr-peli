
class projectile{
	constructor(x,y)
	{
		this.x = x;
        this.y = y;
        //default size
		this.height = 80;
		this.width = 20;
		this.angle = 0;
		this.created_locally = false;
		this.end_position_x = 0;
		this.end_position_y = 0;
		this.collision_bounds = [0,0,0,0];
		this.updateCollisionBounds();
		this.last_valid_hyp = 0;
		this.last_end_pos_x = 0;
		this.last_end_pos_y = 0;
		this.bullet_image = new Image();
		this.bullet_image.src = 'Sprites/bullet.png';
		this.aim_assist_time = 0.0;
		this.aim_assist_delay = 1.0;
		this.active_aim_assist = false;
		this.aim_assist_duration = 1.5;
		this.can_have_aim_assist = true;
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
	

    //draw projectile
	drawProjectile()
	{

		var canvas = document.getElementById('canvas');			
		var ctx = canvas.getContext('2d');


		var missle_x = this.getX + viewport.x;
		var missle_y = this.getY+ viewport.y;

        //do colours based on role
		if(this.createdLocally)
		{
			if(localplayer.getRole == 'poliisi')
			{
				ctx.fillStyle = 'rgba(0, 0, 200, 1)';
			}
			else
			{
				ctx.fillStyle = 'rgba(200, 0, 0, 1)';
			}
		}
		else
		{
			if(localplayer.getRole == 'rosvo')
			{
				ctx.fillStyle = 'rgba(0, 0, 200, 1)';
			}
			else
			{
				ctx.fillStyle = 'rgba(200, 0, 0, 1)';
			}

		}
		
		ctx.save();

		//translate the position
		ctx.translate(missle_x+this.width/2,missle_y+this.height/2);

		var angle = this.angle + 90.0;

		//normalize the angle to -180 and 180
		var normalized = angle;
		while (normalized <= -180) normalized += 360;
		while (normalized > 180) normalized -= 360;
		
		angle = normalized;

		//rotate the shape in degrees
		ctx.rotate(angle*Math.PI/180);

        
        //draw rectangle
		//ctx.fillRect(0, 0, this.getWidth, this.getHeight);

		var step_width = 64;
		var step_height = 360;

		ctx.drawImage(this.bullet_image, 0,0,
			step_width, step_height,0,0, this.width, this.height);

		ctx.restore();

	}
}