

var keys = [];

var x = 100;
var y = 100;
var speed = 2;
var velocity_x = 0;
var velocity_y = 0;
var friction = 0.98;
var velocity_limiter_x = 10;
var velocity_limiter_y = 5;
var game_running = true;

var enemy_x = 30;
var enemy_y = 30;

var image = new Image();   // using optional size for image

image.src = 'Sprites/Criminal/right.png';

function draw() {
   var canvas = document.getElementById('canvas');
   if (canvas.getContext) {


       requestAnimationFrame(draw);

       if(game_running)
       {
           if(keys[40])
           {
               if(velocity_y > velocity_limiter_y)
                   velocity_y--;
               else
                   velocity_y++;

           }
           if(keys[38])
           {
               if(velocity_y < -velocity_limiter_y)
                   velocity_y++;
               else
                   velocity_y--;
           }

           if(keys[39])
           {
               if(velocity_x > velocity_limiter_x)
                   velocity_x--;
               else
                   velocity_x++;
           }
           if(keys[37])
           {
               if(velocity_x < -velocity_limiter_x)
                   velocity_x++;
               else
                   velocity_x--;
           }

           velocity_x *=friction;
           x += velocity_x;
           velocity_y *=friction;
           y += velocity_y;

           var ctx = canvas.getContext('2d');
           ctx.clearRect(0, 0, canvas.width, canvas.height);
           //background
           ctx.fillStyle = 'rgb(53, 53, 53,0.5)';
           ctx.fillRect(0,0,canvas.width, canvas.height);

           //Criminal Sprite
           ctx.drawImage(image, x, y);

           ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
           ctx.fillRect(enemy_x, enemy_y, 50, 50);
           ctx.fillStyle = 'rgba(255, 255, 23)';
           ctx.font = '28px tahoma';
           ctx.textAlign = 'center';

           var center_x = (canvas.width / 2);

           ctx.fillText('Rosvo ja pollliisi :)', center_x, 50);


           //prevent out of bounds values
           if((x + 50) >= canvas.width)
           {
               x = (canvas.width - 50);
               velocity_x = 0;
           }
           else if((x) <= 0)
           {
               x = 0;
               velocity_x = 0;
           }

           if((y) <= 0)
           {
               y = (0);
               velocity_y = 0;
           }
           else if((y + 50) >= canvas.height)
           {
               y = (canvas.height - 50);
               velocity_y = 0;
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
