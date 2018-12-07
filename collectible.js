class collectible{
	constructor(x,y) {
		this.x = x;
		this.y = y;
		this.height = 100;
		this.width = 100;
		this.collision_bounds = [0,0,0,0];
		this.object_image = new Image();
		this.object_image.src = 'Sprites/RTS_crate.png';
		
	
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
			obj_col_h + obj_col_y > enemy_col_y ) {
			//player.setMovingInverse(true);
			console.log("Osuma");
			return true;
		}

		return false;
	}
	
	drawObject(x, y) {
		this.updateCollisionBounds();
		var canvas = document.getElementById('canvas');			
		var ctx = canvas.getContext('2d');

		var obj_img = new Image();
		obj_img.src = 'Sprites/RTS_crate.png';
		ctx.drawImage(obj_img, 0, 0,
        64, 64, x + this.x, y + this.y, this.height, this.width);

	
}
}
