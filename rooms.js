class Room
{
	constructor(name,users)
	{
		this.name = name;
		this.users = users;
	}

	get getName()
	{
		return this.name;
	}

	get getUsers()
	{
		return this.users;
	}

	setNameAndUsers(name,users)
	{
		this.name = name;
		this.users = users;
	}
}
var rooms = [];


var mouse_x = 0;
var mouse_y = 0;
var canvas = document.getElementById('canvas');



function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: (event.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (event.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
}

canvas.addEventListener('mousemove',function(event)
{
	var mousepos = getMousePos(canvas,event);

	mouse_x = mousepos.x;
	mouse_y = mousepos.y;
});

function mouseOver(mouse_x,mouse_y,x,y,w,h)
{
	if (mouse_x > x && mouse_x < (x + w) && mouse_y > y && mouse_y < (y + h))
		return true;

	return false;
}

var mouse_clicked = 0;

document.body.addEventListener("mousedown", function (e) {
	if(e.button == 0)
  	  mouse_clicked = true;
});
document.body.addEventListener("mouseup", function (e) {
	if(e.button == 0)
   	 mouse_clicked = false;
});


function StartGame(wanted_role)
{
	if(room_index == -1)
	{
		console.log("error invalid room index");
		return;
	}
	socket.emit('chosen room',localplayer_username,room_index,wanted_role);
	localplayer_died = false;
	enemy_died = false;
	delay = 0.0;
	game_running = true;
}

//these are declared outside function cuz animation needs them to be static
var scale_to_draw_left_w = 200;
var scale_to_draw_left_h = 200;
var scale_to_draw_right_w = 200;
var scale_to_draw_right_h = 200;

function DecideRole()
{
	var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
	
	//get the images with sideways angle... see getImageBasedOnRoleAndAngle for +90 rotation and why its passed 0.0 here
	var img_left = getImageBasedOnRoleAndAngle(img_type_car,'poliisi',0.0);
	var img_right = getImageBasedOnRoleAndAngle(img_type_car,'rosvo',0.0);


	//default car sizes
	var default_size_w = 200;
	var default_size_h = 200;


	//actual image size in the spritesheet
	var step_width = 512;
	var step_height = 512;

	//how big do we want them to end up
	var target_size_w = 300;
	var target_size_h = 300;

	//how fast does it enlarge it
	var approach_speed = 6;
	
	//position for left image
	var img_left_pos_x = 200;
	var img_left_pos_y = 200;

	//image position for right
	var img_right_pos_x =  200 + default_size_w*2;
	var img_right_pos_y = 200;

	//ctx.strokeRect(img_left_pos_x,img_left_pos_y + (scale_to_draw_left_h/4), scale_to_draw_left_w, scale_to_draw_left_h/2);

	//if mouse over left img aka police car enlarge it slowly
	if (mouseOver(mouse_x, mouse_y, img_left_pos_x,img_left_pos_y + (default_size_h/4), default_size_w, default_size_h/2)) 
	{
		var value_w = ApproachTarget(scale_to_draw_left_w,target_size_w,approach_speed);
		var value_h = ApproachTarget(scale_to_draw_left_h,target_size_h,approach_speed);

		scale_to_draw_left_w = value_w;
		scale_to_draw_left_h = value_h;

		
		if (mouse_clicked) {
			//do this so its only this frame
			mouse_clicked = false;
			StartGame('poliisi');

		}
	}
	else{
		//use this if you want instant shrinking
		//scale_to_draw_left_w = default_size_w;
		 //scale_to_draw_left_h = default_size_h;

		 var value_w = ApproachTarget(scale_to_draw_left_w,default_size_w,approach_speed);
		 var value_h = ApproachTarget(scale_to_draw_left_h,default_size_w,approach_speed);
 
		 scale_to_draw_left_w = value_w;
		 scale_to_draw_left_h = value_h;
	}

	//if mouse over right img aka robber car enlarge it slowly
	if (mouseOver(mouse_x, mouse_y, img_right_pos_x,img_right_pos_y + (default_size_h/4), default_size_w, default_size_h/2)) 
	{
		var value_w = ApproachTarget(scale_to_draw_right_w,target_size_w,approach_speed);
		var value_h = ApproachTarget(scale_to_draw_right_h,target_size_h,approach_speed);

		scale_to_draw_right_w = value_w;
		scale_to_draw_right_h = value_h;

		if (mouse_clicked) {
			//do this so its only this frame
			mouse_clicked = false;
			StartGame('rosvo');
		}
	}
	else{
		//use this if you want instant shrinking
	//	scale_to_draw_right_w = default_size_w;
	//	scale_to_draw_right_h = default_size_h;
		var value_w = ApproachTarget(scale_to_draw_right_w,default_size_w,approach_speed);
		var value_h = ApproachTarget(scale_to_draw_right_h,default_size_w,approach_speed);

		scale_to_draw_right_w = value_w;
		scale_to_draw_right_h = value_h;
	}

	ctx.fillStyle = 'rgba(0, 20, 244)';
	ctx.font = '18px tahoma';
	ctx.textAlign = 'center';

	ctx.fillText('Poliisi',img_left_pos_x + (scale_to_draw_left_w / 2),img_left_pos_y + 40);

	ctx.drawImage(img_left, 0,0,
		step_width, step_height, img_left_pos_x,img_left_pos_y, scale_to_draw_left_w,scale_to_draw_left_h);


	ctx.fillStyle = 'rgba(244, 20, 0)';
	
	ctx.fillText('Rosvo',img_right_pos_x + (scale_to_draw_right_w / 2),img_right_pos_y + 40);

	ctx.drawImage(img_right, 0,0,
		step_width, step_height, img_right_pos_x,img_right_pos_y, scale_to_draw_right_w,scale_to_draw_right_h);

}

function chooseThisRoom(index)
{
	room_index = index;
}


function HandleRoomsLogic() {

	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');

	//no room yet... choose it first
	if (room_index == -1) {
		ctx.fillStyle = 'rgba(255, 60, 70)';
		ctx.font = '28px tahoma';
		ctx.textAlign = 'center';
		for (i = 0; i < rooms.length; i++) {
			var center_x = (canvas.width / 2);

			var text = rooms[i].getName + "(" + rooms[i].getUsers + "/2)";
			ctx.fillText(text, center_x, 50 + (i * 30));

			var text_width = ctx.measureText(text).width;
			var text_height = 28;
			var scaled_height = (text_height * 1.5);//multiply with 1.5 to get somewhat accurate bounding size...
			//if mouse is over the room name and room not full yet
			if (mouseOver(mouse_x, mouse_y, center_x - (text_width / 2), 50 + (i * 30) - (scaled_height / 2), text_width, text_height) && rooms[i].getUsers < 2) {
				if (mouse_clicked) {
					//do this so its only this frame
					mouse_clicked = false;
					if(rooms[i].getUsers == 0)
					{
						chooseThisRoom(i);//set the wanted room index
					}
					else
					{
						chooseThisRoom(i);//set the wanted room index
						//this role here wont do anything since server will decide it for us
						StartGame('rosvo');
					}
				}
				//	ctx.fillRect(center_x - (textsize / 2),50 + (i * 30)  - (28 / 2),textsize,28);
				ctx.strokeRect(center_x - (text_width / 2), 50 + (i * 30) - (scaled_height / 2), text_width, text_height);
			}
		}
	}
	//then we move onto the role selection
	else {
		ctx.fillStyle = 'rgba(152, 66, 244)';
		ctx.font = '28px tahoma';
		ctx.textAlign = 'center';
		var text = "Choose your role";
		var text_width = ctx.measureText(text).width;
		var center_x = (canvas.width / 2);
		ctx.fillText(text, center_x, 50);

		DecideRole();
	}
}