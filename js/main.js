import Ball from "./GameObjects/Ball.js";
import Paddle from "./GameObjects/Paddle.js";
import Player from "./GameObjects/Player.js";
import Brick from "./GameObjects/Brick.js";

// Store canvas DOM
var canvas = document.getElementById('myCanvas');
// Store drawing context on the canvas
var ctx = canvas.getContext("2d");

// initialize ball object
var ballObject = new Ball(canvas.width / 2, canvas.height - 30, 0, Math.PI*2, 10);
// initialize paddle object
var paddleObject = new Paddle(10, 75, ( canvas.width - 75 ) / 2, 7);
// initialize player object
var playerObject = new Player(0, 3);

// Initialize some brick variables that we can tweak
var brickRowCount = 3;
var brickColumnCount = 5;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

// Create an Array of Bricks
var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = new Brick(75, 20, 0, 0, 1); 
    }
}

// Player controls
var rightPressed = false;
var leftPressed = false;

document.addEventListener("keydown", eventHandler, false);
document.addEventListener("keyup", eventHandler, false);
document.addEventListener("mousemove", eventHandler, false);

// Ball delta positions -> movement speed
var dx = 3;
var dy = -3;

// Initialize the game
initalizeGame();

function initalizeGame() {
    // Start game text
    ctx.font = "24px courier";
    var text = "PRESS SPACE TO START";
    var textWidth = ctx.measureText(text).width;
    ctx.fillStyle = "#0095DD";
    ctx.fillText(text, (canvas.width / 2 - textWidth / 2), canvas.height / 2);
    // Author text
    ctx.font = "14px cursive";
    var author = "Created by David Kasabji";
    textWidth =  ctx.measureText(author).width;
    ctx.fillStyle = "#4a32ff";
    ctx.fillText( author, (canvas.width / 2 - textWidth / 2), canvas.height - 10);
}

function drawLives() {
    ctx.font = "16px cursive";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: " + playerObject.lives, canvas.width-85, 20);
}

function drawScore() {
    ctx.font = "16px cursive";
    ctx.fillStyle = "#0095DD";    
    ctx.fillText("Score: " + playerObject.score, 8, 20);
}

function drawBricks() {
    for(var c = 0; c < brickColumnCount; c++) {
        for(var r = 0; r < brickRowCount; r++) {
            var brick = bricks[c][r];
            // Draw only those bricks that are not destroyed
            if( brick.visible ) {
                brick.posX = (c*(brick.width+brickPadding))+brickOffsetLeft;
                brick.posY = (r*(brick.height+brickPadding))+brickOffsetTop;
                ctx.beginPath();
                ctx.rect(brick.posX, brick.posY, brick.width, brick.height);
                ctx.fillStyle = "#f49241";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleObject.posX, canvas.height-paddleObject.height, paddleObject.width, paddleObject.height);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ballObject.posX, ballObject.posY, ballObject.radius, ballObject.startAngle, ballObject.endAngle);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// MAIN GAME LOOP
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Do all the game updates
    drawBricks();
    drawPaddle();
    collisionDetection();
    drawScore();
    drawLives();
    drawBall();

    // Ball hits the left or right wall
    if( ballObject.posX + dx > canvas.width-ballObject.radius || ballObject.posX + dx < ballObject.radius ) {
        dx = -dx;
    }
    // Ball hits the top wall
    if( ballObject.posY + dy < ballObject.radius ) {
        dy = -dy;
    } else if( ballObject.posY + dy > canvas.height-ballObject.radius ) {
        // Ball hits the paddle
        if( ballObject.posX > paddleObject.posX && ballObject.posX < paddleObject.posX + paddleObject.width ) {
            // accelerate it a bit for every hit
            dy = -dy - 0.5;            
        } else {
            // ball hit out of bounds, decrease lives
            playerObject.takeOneLife();
            // if 0 lives => game over
            if(!playerObject.lives) {
                alert("GAME OVER");
                document.location.reload();
            } else {
                // else if you still ahve lives, restart game
                resetToInitialPosition();
            }
        }
    }
    
    // Controls for moving the paddle depending on player input
    if( rightPressed && paddleObject.posX < canvas.width - paddleObject.width ) {
        paddleObject.posX += paddleObject.speed;
    } else if( leftPressed && paddleObject.posX > 0 ) {
        paddleObject.posX -= paddleObject.speed;
    }

    // Basically determines position of ball, with delta's we can adjust speed
    ballObject.posX += dx;
    ballObject.posY += dy;
    // This will optimize the refresh rate depending on the Browser performance
    requestAnimationFrame(update);
}

function resetToInitialPosition() {
    ballObject.posX = canvas.width/2;
    ballObject.posY = canvas.height-30;
    dx = 3;
    dy = -3;
    paddleObject.posX = (canvas.width-paddleObject.width)/2;
}

function collisionDetection() {
    for(var c = 0; c < brickColumnCount; c++) {
        for(var r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            // Only detect colision with visible bricks
            if( b.visible ) {
                // Checking if the ball hit the brick
                if( ballObject.posX > b.posX && ballObject.posX < b.posX + b.width && ballObject.posY > b.posY && ballObject.posY < b.posY + b.height ) {
                    dy = -dy;
                    // Destroy the hit brick
                    b.destroyBrick();
                    // Add to the scoreboard
                    playerObject.addScore(1);
                    // Check if player won
                    checkWinCondition();
                }
            }
        }
    }
}

function checkWinCondition() {
    if( playerObject.score == brickRowCount * brickColumnCount ) {
        alert("YOU WON, CONGRATULATIONS!");
        document.location.reload();
    }
}

function eventHandler(event) {
    switch(event.type) {
        case 'keydown':
            if( event.keyCode == 39 ) rightPressed = true;
            else if( event.keyCode == 37 ) leftPressed = true;
            else if( event.keyCode == 32 ) update();
            break;
        case 'keyup':
            if( event.keyCode == 39 ) rightPressed = false;
            else if( event.keyCode == 37 ) leftPressed = false;
            break;
        case 'mousemove':
            var relativeX = event.clientX - canvas.offsetLeft;
            if( relativeX > 0 && relativeX < canvas.width ) {
                paddleObject.posX = relativeX - paddleObject.width / 2;
            }
            break;
    }
}