let board = document.querySelector(".board");

let blockHeight = 30;
let blockWidth = 30;

// columns → based on WIDTH
let boardColSize = Math.floor(board.clientWidth / blockWidth);

// rows → based on HEIGHT
let boardRowSize = Math.floor(board.clientHeight / blockHeight);

console.log("Total blocks:", boardColSize * boardRowSize);
for (let index = 0; index <boardColSize*boardRowSize; index++) {
    let div=document.createElement("div")
    div.classList.add("block")
    board.appendChild(div)
}