var item_collected = false;
class collectible{
	constructor(x,y) {
		this.x = x;
		this.y = y;
		this.height = 50;
		this.width = 50;
		this.collision_bounds = [0,0,0,0];
		this.object_image = new Image();
		this.object_image.src = 'Sprites/Box.png';
		this.life = 0;
		this.is_valid = true;
	}

	setPosition(x,y) {		
		this.x = x;
		this.y = y;
	}

	get getCollisionBounds() {
		return this.collision_bounds;
	}

	get getX() {
		return this.x;
	}
	
	get getY() {
		return this.y;
	}

	get getWidth() {
		return this.width;
	}

	get getHeight() {
		return this.height;
	}

	updateCollisionBounds() {
		this.collision_bounds[0] = this.x;
		this.collision_bounds[1] = this.y;
		this.collision_bounds[2] = this.width;
		this.collision_bounds[3] = this.height;
	}

	checkCollision(player) {
		var enemy_collision = player.getCollisionBounds;
		var obj_collision = this.getCollisionBounds;

		var obj_col_x = obj_collision[0];
		var obj_col_y = obj_collision[1];
		var obj_col_w = obj_collision[2];
		var obj_col_h = obj_collision[3];

		var enemy_col_x = enemy_collision[0];
		var enemy_col_y = enemy_collision[1];
		var enemy_col_w = enemy_collision[2];
		var enemy_col_h = enemy_collision[3];
		

		if (obj_col_x < enemy_col_x + enemy_col_w &&
			obj_col_x + obj_col_w > enemy_col_x &&
			obj_col_y < enemy_col_y + enemy_col_h &&
			obj_col_h + obj_col_y > enemy_col_y && this.is_valid 
			&& player.getScore != 100) {
				
				
			var curtime = new Date().getTime() / 1000;
			this.is_valid = false;
			this.life = curtime;
			return true;
		
		}

		return false;
	}
	

	
	drawObject(x, y) {
		this.updateCollisionBounds();
		var canvas = document.getElementById('canvas');			
		var ctx = canvas.getContext('2d');


        if(this.is_valid)
		ctx.drawImage(this.object_image, 0, 0,
        684, 382, x + this.x, y + this.y, this.height, this.width);
        
        	//current time in seconds
			var curtime = new Date().getTime() / 1000;
			//elapsed time
			var delta = (curtime - this.life);
			
			if(delta > 10)
			{
			    this.is_valid = true;
			}
        

	
}
}
