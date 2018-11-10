function include(url) {
        var script = document.createElement('script');
        script.src = url;
        document.getElementsByTagName('head')[0].appendChild(script);
    }

const keyDownHandler = (e) => {
    if(e.keyCode === UP_KEY) {
        upPressed = true;
		downPressed = false;
		rightPressed = false;
		leftPressed = false;    
    }
    else if(e.keyCode === DOWN_KEY) {
        downPressed = true;
		upPressed = false;
		rightPressed = false;
		leftPressed = false; 
    }
    else if(e.keyCode === RIGHT_KEY){
    	downPressed = false;
		upPressed = false;
		rightPressed = true;
		leftPressed = false; 
    }
    else if(e.keyCode === LEFT_KEY){
    	downPressed = false;
		upPressed = false;
		rightPressed = false;
		leftPressed = true; 
    }
}
const keyUpHandler = (e) => {
   /* if(e.keyCode === UP_KEY) {
        upPressed = false;
    }
    else if(e.keyCode === DOWN_KEY) {
        downPressed = false;
    }
    else if(e.keyCode === RIGHT_KEY){
		rightPressed = false;
    }
    else if(e.keyCode === LEFT_KEY){
		leftPressed = false; 
    }*/
}


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);



const up = () => {
	if(y >= BORDER){
    	y -= SPEED;
    }
}

const down = () => {
	if(y+ITEM <= CH) {
    	y += SPEED;
    }
}

const right = () => {
	if(x+ITEM <= CW){
    	x += SPEED;
	}
}

const left = () => {
	if(x >= BORDER){
    	x -= SPEED;
	}
}