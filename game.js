let canvas = document.querySelector('canvas');
let play = canvas.getContext("2d");

//set canvas size
canvas.width = 600;
canvas.height = 600;



// initialy bar's attribute 
let bar_x = Math.floor(canvas.width / 2 - 60);
let bar_y = Math.floor(canvas.height - canvas.height / 10);
let bar_w = 120;
let bar_h = 10;
let bar_color = "green"
let bar_speed = 40;

//create the  bar that collects the  bullets
function bar() {
    play.beginPath();
    play.fillRect(bar_x, bar_y, bar_w, bar_h);
    play.closePath();
}

//funtion for move the bar
window.addEventListener("keydown", function(event) {
    key = event.key;
    if (key == 'ArrowRight' && bar_x < canvas.width - bar_w) {
        play.clearRect(bar_x, bar_y, bar_speed, bar_h);
        bar_x = bar_x + bar_speed;
    } else if (key == 'ArrowLeft' && bar_x > 0) {
        {
            bar_x = bar_x - bar_speed;
            play.clearRect(bar_x + 120, bar_y, bar_speed, bar_h);

        };

    }


})

//function for detecting the collision of ball with bar
// val is 1 when ball makes a collision with the bar otherwise return zero
let val;
function calcDistance(x1, y1, x2, y2) {
    val = 0;
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    low = this.y2;
    high = this.y2 - bar_h;
    if ( this.x1>this.x2  &&  this.x1<=this.x2+bar_w) {
        console.log("entry")
        if (this.y2 -bar_h <= this.y1 && (this.y1 + bullet_radius) <= this.y2 + bar_h) { val = 1; }

        console.log(val, this.x1, this.x2, this.y1, this.y2);
        return val;
    } else { console.log(val, this.x1, this.x2, this.y1, this.y2); return val; }


}

// function Score() {
let score=0;
//Create function to keep track of score
function Score(){
    play.font = '20px Arial';
   // play.fillStyle = 'black';
  
    play.fillText("score: ",300,300); //position score at 8,20 on the x,y axis of the canvas
    console.log('xxxx');

}
t = setInterval(function() {
    
   
    Score();
}, 1000);


//



//create bullets 
let bullet_radius = 15;
let bullet_x = canvas.width / 2;
let bullet_y = bullet_radius;
x_direction = 6;
y_direction = 6;
color = "red"


function Bul(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.draw = function() {
        play.beginPath();
        play.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        play.stroke();
        play.fillStyle = color;
        play.fill();
        play.closePath;


    }
    this.update = function() {
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) { this.dx = -this.dx; }

        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) { this.dy = -this.dy; }

        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}

//creating object of bullet 
var bul = new Bul(bullet_x, bullet_y, x_direction, y_direction, bullet_radius);


//function for the game 
function move() {
 

       
        requestAnimationFrame(move);
        play.clearRect(0, 0, canvas.width, canvas.height);
        bul.update();
        dist = calcDistance(bul.x, bul.y, bar_x, bar_y);
        if (dist == 1) {
            bul.dy = -bul.dy;
            play.fillStyle = "yellow";
            play.fill();
        } else {
            play.fillStyle = bar_color;
        }
        bar();
        if (bul.y + bul.radius > canvas.height) {

        
            alert("game over");
            document.location.reload();

        }
    }


move();