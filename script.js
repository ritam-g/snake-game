let board = document.querySelector(".board");

let blockHeight = 50;
let blockWidth = 50;

let boardColSize = Math.floor(board.clientWidth / blockWidth);
let boardRowSize = Math.floor(board.clientHeight / blockHeight);

let blocks = [];

// Snake positions
let snake = [
    { row: 1, col: 3 },

];
// Create board
for (let row = 0; row < boardRowSize; row++) {
    for (let col = 0; col < boardColSize; col++) {
        let block = document.createElement("div");
        block.classList.add("block");
        board.appendChild(block);
        blocks[`${row},${col}`] = block;
    }
}
// Draw snake
function drawSnake() {
    snake.forEach(({ row, col }) => {
        blocks[`${row},${col}`].classList.add("snake");
    });
}

//! USER-DIRECTION
let userDirection = "right"

drawSnake();
let playGame=setInterval(() => {

    let headOfSnake = null;

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
        alert("Game Over");
        
        clearInterval(playGame)
        
    }

    snake.forEach(({ row, col }) => {
        blocks[`${row},${col}`].classList.remove("snake");
    });

    snake.unshift(headOfSnake);
    snake.pop();
    drawSnake();

}, 500);
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



