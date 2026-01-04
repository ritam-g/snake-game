const board = document.querySelector(".board");
const gameBox = document.querySelector(".gameBox");
const startBtn = document.querySelector("#startBtn");

const scoreEl = document.querySelector("#S");
const highScoreEl = document.querySelector("#HS");
const timeEl = document.querySelector("#T");
const speed=200;
// ---------------- AUDIO SETUP ----------------
// Define the Audio objects. Use .cloneNode() before playing if the sound 
// needs to be retriggered quickly (e.g., eating food).
const welcomeSound = new Audio("./public/sound/welcome.mp3"); // Sound when game starts/user enters
const eatSound = new Audio("./public/sound/eat.mp3");         // Sound when snake eats food
const gameOverSound = new Audio("./public/sound/gameOver.mp3"); // Sound when game ends

// Optional: Pre-load sounds to minimize delay on first play
welcomeSound.load();
eatSound.load();
gameOverSound.load();

// ---------------- SCORE ----------------
let score = 0;
let highScore = Number(localStorage.getItem("highScore")) || 0;
highScoreEl.textContent = highScore;

// ---------------- TIME ----------------
let min = 0, sec = 0;
let timerInterval = null;

// ---------------- BOARD ----------------
const blockSize = 50;
const rows = Math.floor(board.clientHeight / blockSize);
const cols = Math.floor(board.clientWidth / blockSize);
const blocks = {};
let gameInterval = null;

// ---------------- SNAKE ----------------
let snake = [{ row: 1, col: 3 }];
let direction = "right";

// ---------------- FOOD ----------------
let food = randomFood();

// ---------------- CREATE GRID ----------------
for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
        const div = document.createElement("div");
        div.className = "block";
        board.appendChild(div);
        blocks[`${r},${c}`] = div;
    }
}

// ---------------- FUNCTIONS ----------------
function randomFood() {
    return {
        row: Math.floor(Math.random() * rows),
        col: Math.floor(Math.random() * cols),
    };
}

function drawGame() {
    let head = { ...snake[0] };

    if (direction === "left") head.col--;
    if (direction === "right") head.col++;
    if (direction === "up") head.row--;
    if (direction === "down") head.row++;

    // 1. Check for Wall Collision (OUT OF BLOCK) -> GAME OVER
    if (
        head.row < 0 || head.col < 0 ||
        head.row >= rows || head.col >= cols
    ) {
        endGame();
        return;
    }

    // 2. Check for Self-Collision
    for (let i = 1; i < snake.length; i++) {
        if (head.row === snake[i].row && head.col === snake[i].col) {
            endGame();
            
            return;
        }
    }
    
    // Draw Food
    blocks[`${food.row},${food.col}`].classList.add("food");

    // 3. Check for Food Collision (SNAKE EAT FOOD)
    if (head.row === food.row && head.col === food.col) {
        // --- PLAY EAT SOUND ONCE ---
        eatSound.currentTime = 0; // Rewind the sound to the beginning
        eatSound.play(); 

        score += 10;
        scoreEl.textContent = score;

        if (score > highScore) {
            highScore = score;
            localStorage.setItem("highScore", highScore);
            highScoreEl.textContent = highScore;
        }

        blocks[`${food.row},${food.col}`].classList.remove("food");
        food = randomFood();
        snake.unshift(head);
    } else {
        snake.pop();
        snake.unshift(head);
    }

    document.querySelectorAll(".snake").forEach(b => b.classList.remove("snake"));
    snake.forEach(p => blocks[`${p.row},${p.col}`].classList.add("snake"));
}

function startTimer() {
    timerInterval = setInterval(() => {
        sec++;
        if (sec === 60) { sec = 0; min++; }
        timeEl.textContent =
            `${String(min).padStart(2,"0")}:${String(sec).padStart(2,"0")}`;
    }, 1000);
}

function endGame() {
    // 1. **STOP THE EAT SOUND**
    eatSound.pause();
    eatSound.currentTime = 0; 
    // This immediately halts any ongoing eat sound.
    
    // 2. Play the Game Over Sound
    gameOverSound.currentTime = 0; 
    gameOverSound.play();

    // 3. Clear Intervals and Show Game Box
    clearInterval(gameInterval);
    clearInterval(timerInterval);
    gameBox.style.visibility = "visible";

}

// ---------------- CONTROLS ----------------
document.addEventListener("keydown", e => {
    // Basic direction logic (prevents changing to the opposite direction)
    const newDir = e.key.replace("Arrow","").toLowerCase();
    
    if (e.key.includes("Arrow")) {
        if (newDir === "left" && direction !== "right") direction = newDir;
        else if (newDir === "right" && direction !== "left") direction = newDir;
        else if (newDir === "up" && direction !== "down") direction = newDir;
        else if (newDir === "down" && direction !== "up") direction = newDir;
    }
});

// ---------------- START ----------------
startBtn.addEventListener("click", () => {
    // --- WELCOME SOUND PLAYS HERE (User Interaction) ---
    welcomeSound.currentTime = 0; // Rewind the sound
    welcomeSound.play();
    startBtn.textContent="Play Again"
    gameBox.style.visibility = "hidden";

    snake = [{ row: 1, col: 3 }];
    direction = "right";
    score = 0;
    min = sec = 0;

    scoreEl.textContent = 0;
    timeEl.textContent = "00:00";

    document.querySelectorAll(".snake,.food").forEach(b =>
        b.classList.remove("snake","food")
    );

    food = randomFood();

    clearInterval(gameInterval);
    clearInterval(timerInterval);

    startTimer();
    gameInterval = setInterval(drawGame, speed);
});