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

function chooseThisRoom(index)
{
    //tell server which room we chose
	socket.emit('chosen room',index);
	room_index = index;
	localplayer_died = false;
	enemy_died = false;
	delay = 0.0;
	game_running = true;
}


function HandleRoomsLogic() {

    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    
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
                chooseThisRoom(i);
            }
            //	ctx.fillRect(center_x - (textsize / 2),50 + (i * 30)  - (28 / 2),textsize,28);
            ctx.strokeRect(center_x - (text_width / 2), 50 + (i * 30) - (scaled_height / 2), text_width, text_height);
        }
    }
}