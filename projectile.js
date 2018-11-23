
class projectile{
	constructor(x,y)
	{
		this.x = x;
        this.y = y;
        //default size
		this.height = 2;
		this.width = 5;
		this.angle = 0;
		this.created_locally = false;
	}

	setPosition(x,y)
	{		
		this.x = x;
		this.y = y;
	}

	setCreatedLocally()
	{
		this.created_locally = true;
	}

	setAngle(angle)
	{
		this.angle = angle;
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

	get createdLocally()
	{
		return this.created_locally;
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
        
        //draw rectangle
		ctx.fillRect(missle_x, missle_y, this.getWidth, this.getHeight);

	}
}