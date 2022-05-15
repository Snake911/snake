document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const score = document.getElementById('scoreCount');
    const scores = localStorage.getItem('scores') ? Object.values(JSON.parse(localStorage.getItem('scores'))) : [];
    const scoreTable = document.getElementById('scoreTable');
    const overlay = document.getElementById('overlay');
    let phrase = overlay.querySelector('h2');

    const audioEat = new Audio('audio/eat.mp3');
    const audioWin = new Audio('audio/win.mp3');
    const audioOver = new Audio('audio/over.mp3');

    const size = 10;
    const UP_KEY = 'ArrowUp';
    const RIGHT_KEY = 'ArrowRight';
    const DOWN_KEY = 'ArrowDown';
    const LEFT_KEY = 'ArrowLeft';
    const startPosition = [[canvas.width/(size*2), 3], [canvas.width/(size*2), 2], [canvas.width/(size*2), 1]];
    let speed;
    let position;
    let direction;
    let food;
    let foodX;
    let foodY;
    let game;

    const drawSnake = (coords) => {
        coords.forEach(coord => {
            ctx.beginPath();
            ctx.rect(coord[0]*size, coord[1]*size, size, size);
            ctx.fillStyle = '#1CAC78';
            ctx.fill();
            ctx.closePath();
        });
    };

    const drawField = () => {
        for(let i = 0; i < canvas.width; i += size) {
            for(let j = 0; j < canvas.height; j += size) {
                ctx.beginPath();
                ctx.rect(i, j, size, size);
                ctx.strokeStyle = 'rgba(0, 0, 0, .1)';
                ctx.lineWidth = 0.1;
                ctx.stroke();
                ctx.closePath();
            }
        }
    }

    const init = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        position = startPosition.slice();
        direction = 'down';
        speed = 100;
        food = false;
        foodX = false;
        foodY = false;    
        game = false;
        drawField();
        drawSnake(position);
    }

    init();
    
    const move = () => {
        let newCoord = false;
        if(direction === 'down' && position[0][1] < canvas.height/size + 1) {
            newCoord = [position[0][0], position[0][1] + 1];                     
        } else if(direction === 'right' && position[0][0] < canvas.width/size) {
            newCoord = [position[0][0] + 1, position[0][1]];
        } else if(direction === 'up' && position[0][1] >= 0) {
            newCoord = [position[0][0], position[0][1] - 1]; 
        } else if(direction === 'left' && position[0][0] >= 0) {
            newCoord = [position[0][0] - 1, position[0][1]];
        }

        if(newCoord) {
            position.unshift(newCoord);
            position.pop();            
        }
        drawSnake(position);    
    }

    const addFood = () => {
        if(!food) {
            foodX = Math.floor(Math.random() * ((canvas.width - size) / size - 0 + 1)) + 0;
            foodY = Math.floor(Math.random() * ((canvas.height - size) / size - 0 + 1)) + 0;
        }
        
        ctx.beginPath();
        ctx.rect(foodX * size, foodY * size, size, size);
        ctx.fillStyle = '#ff0000';
        ctx.fill();
        ctx.closePath();
        
        food = true;
    }

    const eat = () => {
        if(position[0][0] === foodX && position[0][1] === foodY) {
            food = false;
            let back;
            if(direction === 'down') {
                back = [position[position.length - 1][0], position[position.length - 1][1] - 1];
            } else if(direction === 'up') {
                back = [position[position.length - 1][0], position[position.length - 1][1] + 1];
            } else if(direction === 'left') {
                back = [position[position.length - 1][0] - 1, position[position.length - 1][1]];
            } else if(direction === 'right') {
                back = [position[position.length - 1][0] + 1, position[position.length - 1][1]];
            }            
            position.push(back);
            score.textContent = Number(score.textContent) + 10;
            audioEat.play();
        }
    }

    const gameOver = () => {
        let over = false;
        for(let i = 1; i < position.length; i++) {
            if(direction === 'down') {
                if(position[0][0] === position[i][0] && position[0][1] + size === position[i][1] + size) {                    
                    over = true;
                }
            } else if(direction === 'up') {                
                if(position[0][0] === position[i][0] && position[0][1] === position[i][1] ) {
                    over = true;
                }                
            } else if(direction === 'left') {
                if(position[0][0] === position[i][0] && position[0][1] === position[i][1]) {
                    over = true;
                }
            } else if(direction === 'right') {          
                if(position[0][0] + 1 === position[i][0] + 1 && position[0][1] === position[i][1]) {
                    over = true;
                }                
            }

            if(position[0][1] == canvas.height/size || position[0][1] < 0 || position[0][0] < 0 || position[0][0] == canvas.width/size) {
                over = true;
            }
        }

        if(Number(score.textContent) > 0 && Number(score.textContent) % 100 === 0) {
            speed = 100 - (Number(score.textContent) / 20);
            clearInterval(game);              
            game = setInterval(draw, speed);
        }

        if(over) {
            clearInterval(game);
            if(Number(score.textContent) > 0) {
                scores.unshift([new Date().toLocaleString(), score.textContent]);
                localStorage.setItem('scores', JSON.stringify(scores));
                drawScoreTable(scores);
            }

            phrase.textContent = 'Game Over!';
            audioOver.play();

            overlay.style.opacity = 1;
            overlay.style.zIndex = 100;
            setTimeout(() => {
                init();
                overlay.style.opacity = 0;
                overlay.style.zIndex = -1;
                score.textContent = '0';
            }, 3000);            
        }
    }

    const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawField();
        move();
        addFood();
        eat();
        gameOver();
    }

    const drawScoreTable = (scores) => {
        scoreTable.innerHTML = '';
        for(let i = 0; i < 10; i++) {
            if(!scores[i]) {
                break;
            }
            const time = document.createElement('span');
            time.classList.add('score_time');
            time.textContent = scores[i][0];
            const count = document.createElement('span');
            count.classList.add('score_count');
            count.textContent = scores[i][1];
            const row = document.createElement('div');
            row.classList.add('row');
            row.append(time, count);
            if(scores[i][1] == 100) {
                row.classList.add('row_win');
            }
            scoreTable.append(row);            
        }
    }

    drawScoreTable(scores);

    document.addEventListener('keydown', (e) => {
        if(e.code === DOWN_KEY
        || e.code === UP_KEY
        || e.code === LEFT_KEY
        || e.code === RIGHT_KEY
        ||e.code === 'Space') {
            e.preventDefault();
        }
        
        if(game) {
            if(e.code === DOWN_KEY && direction !== 'up') {
                direction = 'down';
            }
    
            if(e.code === UP_KEY && direction !== 'down') {
                direction = 'up';
            }
    
            if(e.code === LEFT_KEY && direction !== 'right') {
                direction = 'left';
            }
            if(e.code === RIGHT_KEY && direction !== 'left') {
                direction = 'right';
            }
        }        

        if(e.code === 'Space') {            
            if(game) {
                clearInterval(game);
                game = false;
            } else {
                game = setInterval(draw, speed);
            }            
        }
        
    })

});