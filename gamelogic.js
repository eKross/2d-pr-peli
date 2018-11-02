      

var keys = [];
	  


var voitto = "Error";
var game_running = true;

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

class LocalPlayer extends BasePlayer
{
	constructor(x,y)
	{
		super(x,y);
		this.velocity_x = 0;
		this.velocity_y = 0;
		this.last_x = 0;
		this.last_y = 0;
		this.last_angle = 0;
		this.score = 100;
	}

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



	draw()
	{
					
		var canvas = document.getElementById('canvas');			
		var ctx = canvas.getContext('2d');

			
		ctx.fillStyle = 'rgba(255, 255, 23)';
		ctx.font = '18px tahoma';
		ctx.textAlign = 'center';		
		var center_x = (this.x + (this.width / 2));
		
		ctx.fillText('(you)', center_x, this.y - 20);


		ctx.save();
		ctx.fillStyle = 'rgb(255, 255, 0)';

		ctx.translate(this.x+this.width/2,this.y+this.height/2);

		ctx.rotate(this.angle*Math.PI/180);

		if(this.role == 'poliisi')
		{
			ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
		}
		else
		{
			ctx.fillStyle = 'rgba(200, 0, 0, 0.5)';

		}

		//base draw
		ctx.fillRect(-this.width/2, -this.height/2, this.width, this.height);

		ctx.fillStyle = 'rgb(200, 200, 200)';

		//show which way its facing
		ctx.fillRect(-this.width/2, -this.height/2, this.width, 5);

		ctx.restore();

	}

	setLastAngle(angle)
	{
		this.last_angle = angle;
	}

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

			socket.emit('position update', this.x, this.y, this.angle);			
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

	draw()
	{
					
		var canvas = document.getElementById('canvas');			
		var ctx = canvas.getContext('2d');

		ctx.save();
		ctx.fillStyle = 'rgb(255, 255, 0)';

		ctx.translate(this.x+this.width/2,this.y+this.height/2);

		ctx.rotate(this.angle*Math.PI/180);

		if(this.role == 'poliisi')
		{
			ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
		}
		else
		{
			ctx.fillStyle = 'rgba(200, 0, 0, 0.5)';

		}
		//base draw
		ctx.fillRect(-this.width/2, -this.height/2, this.width, this.height);

		ctx.fillStyle = 'rgb(200, 200, 200)';

		//show which way its facing
		ctx.fillRect(-this.width/2, -this.height/2, this.width, 5);

		ctx.restore();

	}

}

//connect to node server
var socket =  io.connect('http://localhost:3000');

var enemy = 0;
var localplayer = 0;

socket.on('player joined', (pos_x,pos_y) => {

	enemy = new Enemy(pos_x,pos_y);

	if(localplayer.getRole == 'poliisi')
		enemy.setRole('rosvo')
	else
		enemy.setRole('poliisi')
	
	console.log("enemy joined");

});


socket.on('position update', (pos_x,pos_y,angle) => {

	enemy.setPosition(pos_x,pos_y);
	enemy.setAngle(angle);

});



socket.on('get start info', (pos_x,pos_y,role) => {

	localplayer = new LocalPlayer(pos_x,pos_y);
	
	localplayer.setRole(role);
	localplayer.setPosition(pos_x,pos_y);

	console.log("got start info");
});

var projectiles = [];

class projectile{
	constructor(x,y)
	{
		this.x = x;
		this.y = y;
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

	get createdLocally()
	{
		return this.created_locally;
	}


	draw()
	{

		var canvas = document.getElementById('canvas');			
		var ctx = canvas.getContext('2d');


		var missle_x = this.getX;
		var missle_y = this.getY;

		if(this.createdLocally)
		{
			if(localplayer.getRole == 'poliisi')
			{
				ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
			}
			else
			{
				ctx.fillStyle = 'rgba(200, 0, 0, 0.5)';
			}
		}
		else
		{
			if(localplayer.getRole == 'rosvo')
			{
				ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
			}
			else
			{
				ctx.fillStyle = 'rgba(200, 0, 0, 0.5)';
			}

		}
		ctx.fillRect(missle_x, missle_y, this.getWidth, this.getHeight);

	}
}

socket.on('create projectile', (pos_x,pos_y,angle) => {

	var missle = new projectile(pos_x,pos_y);

	missle.setAngle(angle);
	projectiles.push(missle);
   
});



function draw() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
		
		
		requestAnimationFrame(draw);
			
		var ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		//background
		ctx.fillStyle = 'rgb(53, 53, 53,0.5)';
		ctx.fillRect(0,0,canvas.width, canvas.height);
		
		//movement code
		var speed = 10;
		if (game_running) {
			if(localplayer != 0)
			{
			var pos_x = localplayer.getX;
			var pos_y = localplayer.getY;
			var angle = localplayer.getAngle;
			if (keys[40]) {
				pos_y += speed;
				angle = 180;
			}
			else if (keys[38]) {
				pos_y -= speed;
				angle = 0;
			}
			else if (keys[39]) {
				pos_x += speed;
				angle = 90;

			}
			else if (keys[37]) {
				pos_x -= speed;
				angle = -90;
			}

			
			localplayer.setAngle(angle);			
			localplayer.setPosition(pos_x,pos_y);
			
			if(keys[32])
			{			
				var missle = new projectile(localplayer.getX,localplayer.getY);

				missle.setCreatedLocally();
				missle.setAngle(angle);
				projectiles.push(missle);

				socket.emit('create projectile',missle.getX,missle.getY,angle);
				keys[32] = false;
			}
		}


			//top text drawn at center on x axis
			ctx.fillStyle = 'rgba(255, 255, 23)';
			ctx.font = '28px tahoma';
			ctx.textAlign = 'center';
			
			var center_x = (canvas.width / 2);		
			ctx.fillText('rosvo & poliisi', center_x, 50);



			//scores
			ctx.fillStyle = 'rgba(80, 60, 240)';
			ctx.font = '18px tahoma';
			ctx.textAlign = 'right';
			
			var center_x = (canvas.width) - 5;		
			if(localplayer != 0)
			{
				var score = localplayer.getScore;
				var loc_text = "You " + String(score);
				if(score <= 0)
					loc_text = 'Dead';
				ctx.fillText(loc_text, center_x, 50);
			}

			if(enemy != 0)
			{
				var score = enemy.getScore;
				var loc_text = "Enemy " + String(score);
				if(score <= 0)
					loc_text = 'Dead';
				ctx.fillText(loc_text, center_x, 80);
			}

			


			if(localplayer != 0)
			{
				localplayer.draw();
			}

			if(enemy != 0)
			{
				enemy.draw();
			}


			var projectile_speed = 4;
			for (i = 0; i < projectiles.length; i++) {
				var missle = projectiles[i];

				//movement direction of missle
				if (missle.getAngle == 0) {
					var pos_y = missle.getY - projectile_speed;
					missle.setPosition(missle.getX, pos_y);
				}
				else if (missle.getAngle == 180) {
					var pos_y = missle.getY + projectile_speed;
					missle.setPosition(missle.getX, pos_y);

				}
				else if (missle.getAngle == 90) {
					var pos_x = missle.getX + projectile_speed;
					missle.setPosition(pos_x, missle.getY);
				}
				else if (missle.getAngle == -90) {
					var pos_x = missle.getX - projectile_speed;
					missle.setPosition(pos_x, missle.getY);
				}


				missle.draw();


				var missle_x = missle.getX;
				var missle_y = missle.getY;

				//check player collision
				if (missle.createdLocally) {
					var enemy_x = enemy.getX;
					var enemy_y = enemy.getY;

					if (missle_x < enemy_x + enemy.getWidth &&
						missle_x + missle.getWidth > enemy_x &&
						missle_y < enemy_y + enemy.getHeight &&
						missle.getHeight + missle_y > enemy_y) {
						var score = enemy.getScore;
						var loc_score = localplayer.getScore;

						localplayer.setScore(loc_score + 5);

						enemy.setScore(score - 5);
						projectiles.splice(i, 1);

					}
				}
				else {

					var enemy_x = localplayer.getX;
					var enemy_y = localplayer.getY;

					if (missle_x < enemy_x + enemy.getWidth &&
						missle_x + missle.getWidth > enemy_x &&
						missle_y < enemy_y + enemy.getHeight &&
						missle.getHeight + missle_y > enemy_y) {
						var score = localplayer.getScore;

						localplayer.setScore(score - 5);

						var enemy_score = enemy.getScore;

						enemy.setScore(enemy_score + 5);

						projectiles.splice(i, 1);

					}
				}


				//if missle goes out of bounds remove it from projectiles list
				if ((missle_x + missle.getWidth) >= canvas.width) {
					projectiles.splice(i, 1);
				}
				else if ((missle_x) <= 0) {
					projectiles.splice(i, 1);

				}

				if ((missle_y) <= 0) {
					projectiles.splice(i, 1);

				}
				else if ((missle_y + missle.getHeight) >= canvas.height) {
					projectiles.splice(i, 1);

				}
			}
			

		}
		else{

		}
		
    }
}

document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});
	  

socket.emit('client join');


draw();
	  
