const ITEM = 10;
const BORDER = 0;
const SPEED = 1;
const FPS = 1000/60;
const DOWN_KEY = 40;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const LEFT_KEY = 37;
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
const CH = canvas.height;
const CW = canvas.width;
let x = 1;
let y = 1;
let upPressed = false;
let downPressed = false;
let rightPressed = false;
let leftPressed = false;

function include(url) {
        var script = document.createElement('script');
        script.src = url;
        document.getElementsByTagName('head')[0].appendChild(script);
    }

include("move.js");


const draw = () => {
    ctx.clearRect(0, 0, CW, CH);
    ctx.strokeRect(0, 0, CW, CH);
    ctx.fillStyle = "green";
    ctx.fillRect(x, y, ITEM, ITEM);
    ctx.strokeRect(x, y, ITEM, ITEM);

    if(rightPressed){
        right();
    }
    else if(leftPressed){
    	left();
    }
    else if(upPressed){
    	up();
    }
    else if(downPressed){
    	down();
    }

    if(x == BORDER || y == BORDER || x+ITEM == CW || y+ITEM == CH){
    	alert("GAME OVER");
    	document.location.reload();
    } 
     
}


setInterval(draw, FPS);
