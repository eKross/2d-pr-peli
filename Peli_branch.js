

var keys = [];

var x = 100;
var y = 100;
var speed = 2;
var velocity = 0;
var friction = 0.98;
var velocity_limiter = 10;
var turningspeed = 3;
var angle = 0;
var speed_x = 0;
var speed_y = 0;
var game_running = true;

var enemy_x = 30;
var enemy_y = 30;

var criminalsprite = new Image();
var criminal = [
  'Sprites/Criminal/up.png',
  'Sprites/Criminal/upright.png',
  'Sprites/Criminal/right.png',
  'Sprites/Criminal/downright.png',
  'Sprites/Criminal/down.png',
  'Sprites/Criminal/downleft.png',
  'Sprites/Criminal/left.png',
  'Sprites/Criminal/upleft.png'
];
criminalsprite.src = criminal[0];

function draw() {
   var canvas = document.getElementById('canvas');
   if (canvas.getContext) {


       requestAnimationFrame(draw);

       if(game_running)
       {
           if(keys[40])
           {
               if(velocity > velocity_limiter)
                   velocity--;
               else
                   velocity++;

           }
           if(keys[38])
           {
               if(velocity < -velocity_limiter)
                   velocity++;
               else
                   velocity--;
           }

           if(keys[39])
           {
             if(angle > 360)
             {
               angle = 0;
               angle = angle+turningspeed;
             }else{
               angle = angle+turningspeed;
             }
           }
           if(keys[37])
           {
             if(angle < 0)
             {
               angle = 360;
               angle = angle-turningspeed;
             }else{
               angle = angle-turningspeed;
             }
           }

           velocity*=friction;
           y += velocity;

           speed_x = velocity * Math.cos(0)
           var ctx = canvas.getContext('2d');

           if ((angle > 0)&&(angle < 45)){
             criminalsprite.src = criminal[0];
           }else if (angle > 45 && angle < 90){
             criminalsprite.src = criminal[1];
           }else if (angle > 90 && angle < 135){
             criminalsprite.src = criminal[2];
           }else if (angle > 135 && angle < 180){
             criminalsprite.src = criminal[3];
           }else if (angle > 180 && angle < 225){
             criminalsprite.src = criminal[4];
           }else if (angle > 225 && angle < 270){
             criminalsprite.src = criminal[5];
           }else if (angle > 270 && angle < 315){
             criminalsprite.src = criminal[6];
           }else if (angle > 315 && angle < 360){
             criminalsprite.src = criminal[7];
           }


           ctx.clearRect(0, 0, canvas.width, canvas.height);
           //background
           ctx.fillStyle = 'rgb(53, 53, 53,0.5)';
           ctx.fillRect(0,0,canvas.width, canvas.height);



           //Criminal sprite
           ctx.drawImage(criminalsprite, x, y);

           ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
           ctx.fillRect(enemy_x, enemy_y, 50, 50);
           ctx.fillStyle = 'rgba(255, 255, 23)';
           ctx.font = '28px tahoma';
           ctx.textAlign = 'center';

           var center_x = (canvas.width / 2);

           ctx.fillText('Rosvo ja pollliisi :)', center_x, 50);
           ctx.fillText('Angle: '+angle, canvas.width - 70, 50);
           //prevent out of bounds values

           if((y) <= 0)
           {
               y = (0);
               velocity = 0;
           }
           else if((y + 50) >= canvas.height)
           {
               y = (canvas.height - 50);
               velocity = 0;
           }

           //30, 30, 50, 50
           if (x < enemy_x + 50 &&
                  x + 50 > enemy_x &&
                  y < enemy_y + 50 &&
                 50 + y > enemy_y){
                   game_running = false;
           }
       }
       else{
            var ctx = canvas.getContext('2d');
           ctx.clearRect(0, 0, canvas.width, canvas.height);
           //background
           ctx.fillStyle = 'rgb(53, 53, 53,0.5)';
           ctx.fillRect(0,0,canvas.width, canvas.height);

               ctx.fillStyle = 'rgba(255, 255, 23)';
           ctx.font = '28px tahoma';
           ctx.textAlign = 'center';

           var center_x = (canvas.width / 2);

           ctx.fillText('Loppu peli :(', center_x, 50);
       }

   }
}

document.body.addEventListener("keydown", function (e) {
   keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function (e) {
   keys[e.keyCode] = false;
});

draw();
