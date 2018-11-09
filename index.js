const item = 10;
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let x = 0;
let y = 0;

console.log(canvas.width);

const right = () => {
    x += 10;
}

const left = () => {
    x -= 10;
}

const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "green";
    ctx.fillRect(x, y, item, item);
    if(x+item < canvas.width){
        right();
    }else{}
    console.log(x);
}

requestAnimationFrame(draw);
