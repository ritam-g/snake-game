let board = document.querySelector(".board");
let gameBox=document.querySelector(".gameBox")
let  gamebutton=document.querySelector(".gameBox button#startBtn")
let blockHeight = 50;
let blockWidth = 50;

let boardColSize = Math.floor(board.clientWidth / blockWidth);
let boardRowSize = Math.floor(board.clientHeight / blockHeight);

let blocks = [];

// Snake positions
let snake = [
    { row: 1, col: 3 },
];
let food=[
    {row:Math.floor(Math.random()*boardRowSize),col:Math.floor(Math.random()*boardColSize)}
]
// Create board
for (let row = 0; row < boardRowSize; row++) {
    for (let col = 0; col < boardColSize; col++) {
        let block = document.createElement("div");
        block.classList.add("block");
        board.appendChild(block);
        blocks[`${row},${col}`] = block;
    }
}

//! USER-DIRECTION
let userDirection = "right"
// Draw snake
function drawSnake() {
    
    let headOfSnake = null;
    //randomly place food
    blocks[`${food[0].row},${food[0].col}`].classList.add("food");
    if (userDirection === "left") {
        headOfSnake = { row: snake[0].row, col: snake[0].col - 1 };
    }
    else if (userDirection === "right") {
        headOfSnake = { row: snake[0].row, col: snake[0].col + 1 };
    }
    if (userDirection === "up") {
        headOfSnake = { row: snake[0].row - 1, col: snake[0].col };
    }
    else if (userDirection === "down") {
        headOfSnake = { row: snake[0].row + 1, col: snake[0].col };
    }

    // ✅ GAME OVER CHECK (correct place)
    if (
        headOfSnake.row < 0 ||
        headOfSnake.col < 0 ||
        headOfSnake.row >= boardRowSize ||
        headOfSnake.col >= boardColSize
    ) {
        
        gameBox.style.visibility="visible"
             
        clearInterval(playGame)
        return
        
    }
    if(headOfSnake.row===food[0].row && headOfSnake.col===food[0].col){
        blocks[`${food[0].row},${food[0].col}`].classList.remove("food")
        //! new food location 
        food[0]={row:Math.floor(Math.random()*boardRowSize),col:Math.floor(Math.random()*boardColSize)}
        blocks[`${food[0].row},${food[0].col}`].classList.add("food");
        //i want add the length
        snake.unshift(headOfSnake);
        // alert("Yummy")
        //! i want the color will go from the food 

    }
    snake.forEach(({ row, col }) => {
        blocks[`${row},${col}`].classList.remove("snake");
    });

    snake.unshift(headOfSnake);
    snake.pop();
    snake.forEach(({ row, col }) => {
        blocks[`${row},${col}`].classList.add("snake");
    });
}

drawSnake();

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") {
        userDirection = "up"

    }

    else if (event.key === "ArrowDown") {
        userDirection = "down"
    }

    if (event.key === "ArrowLeft") {
        userDirection = "left"
    }

    if (event.key === "ArrowRight") {
        userDirection = "right"
    }
    if (headOfSnake.row<0||headOfSnake.col<0) {
        alert("gameover")
    }
});
function btnClick() {
    gamebutton.addEventListener("click",()=>{
    gameBox.style.visibility="hidden"
    let playGame=setInterval(() => {
        drawSnake();

    }, 500);
    
})
}
btnClick()


