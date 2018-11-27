
class projectile{
	constructor(x,y)
	{
		this.x = x;
        this.y = y;
        //default size
		this.height = 10;
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

	

    //draw projectile
	drawProjectile()
	{

		var canvas = document.getElementById('canvas');			
		var ctx = canvas.getContext('2d');


		var missle_x = this.getX;
		var missle_y = this.getY;

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
		ctx.translate(this.x+this.width/2,this.y+this.height/2);

		//rotate the shape in degrees
		ctx.rotate(this.angle*Math.PI/180);

        
        //draw rectangle
		ctx.fillRect(0, 0, this.getWidth, this.getHeight);

		ctx.restore();

	}
}