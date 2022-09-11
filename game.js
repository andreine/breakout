
const grid = document.querySelector("#grid");
const player = document.querySelector("#player");
const ball = document.querySelector("#ball");
const board = document.querySelector("#board");

const boardCoords = board.getBoundingClientRect();
let ballMoveX = 0;
let ballMoveY = 1;


let boardPosition = grid.getBoundingClientRect();


for(let i = 1; i<=5; i++){
    for(let j = 1; j<=5; j++){
        let block = document.createElement("span");
        block.style.gridRowStart = i;
        block.style.gridColumnStart = j;
        block.style.backgroundColor = "red";
        block.style.margin = "2px";
        grid.append(block);
    }
}

let blocks = document.querySelectorAll("span");

let palyerX;
let playerY;

function setPlayerPosition(){
    player.getBoundingClientRect();
}
setPlayerPosition()


function checkCollision(){
    let ballCoords = ball.getBoundingClientRect();
    let ballLeftBottomCornerX = ballCoords.left;
    let ballLeftBottomCornerY = ballCoords.bottom;

    let ballRightBottomCornerX = ballCoords.right;
    let ballRightBottomCornerY = ballCoords.bottom;


    let ballLeftTopCorner = ballCoords.top;
    let ballRightTopCorner = ballCoords.bottom - ballCoords.height;


    let playerCoords = player.getBoundingClientRect();
    let playerLeftTopCornerX = playerCoords.left;
    let playerLeftTopCornerY = playerCoords.top;
    let playerRightTopCornerX = playerCoords.right;
    let playerRightTopCornerY = playerCoords.bottom;


    if(ballLeftBottomCornerX > playerLeftTopCornerX && ballLeftBottomCornerY > playerLeftTopCornerY && ballRightBottomCornerX <= playerRightTopCornerX - playerCoords.width/2){
        ballMoveX = -1;
        ballMoveY = -1;
    }else if(ballRightBottomCornerX < playerRightTopCornerX && ballLeftBottomCornerY > playerLeftTopCornerY && ballLeftBottomCornerX >= playerRightTopCornerX - playerCoords.width/2){
        ballMoveX = 1;
        ballMoveY = -1;
    }else if(ballRightBottomCornerX < boardCoords.left + ballCoords.width && ballMoveY === -1){
        ballMoveX = 1;
    }else if(ballRightBottomCornerX > boardCoords.right - ballCoords.width && ballMoveY === -1){
        ballMoveX = -1;
    }
    checkBlockCollision(ballCoords)
}

function checkBordersCollision(ballCoords){

}

function checkBlockCollision(ballCoords) {
    blocks.forEach(block => {
        let blockCoords = block.getBoundingClientRect();
        if(ballCoords.top === blockCoords.bottom && ballCoords.left <= blockCoords.right + ballCoords.width - 2 && ballCoords.left >= blockCoords.left - ballCoords.width +2){
            block.remove();
            let nextXDir = Math.floor(Math.random() * 2);
            if (nextXDir === 0){
                ballMoveX = 1;
            }else{
                ballMoveX = -1;
            }
            ballMoveY = 1;
        }
    })
}



checkCollision()


window.addEventListener("keydown", (event) => {
    if(event.key === "a"){
        let playerStyle = getComputedStyle(player);
        let nextPixelLeft = Number.parseInt(playerStyle.left) - 10 + "px"

        if(Number.parseInt(nextPixelLeft) >= 0)
        player.style.left = nextPixelLeft;
    }

    if(event.key === "d"){
        let playerStyle = getComputedStyle(player);
        let nextPixelRight = Number.parseInt(playerStyle.left) + 10 + "px"

        if(Number.parseInt(nextPixelRight) <= 400)
        player.style.left = nextPixelRight;
    }
})



function moveBall(){
    let ballStyle = getComputedStyle(ball);
    ball.style.top =  Number.parseInt(ballStyle.top) + ballMoveY + "px";
    ball.style.left =  Number.parseInt(ballStyle.left) + ballMoveX + "px";
}


let lastRender = 1;

function main(timestamp){
    let secondsPassed = timestamp/1000;
    window.requestAnimationFrame(main);

    if(secondsPassed > lastRender){
        lastRender = secondsPassed + 0.00233;
        checkCollision();
        moveBall();
    }

}

window.requestAnimationFrame(main);
