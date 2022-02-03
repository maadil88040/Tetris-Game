const cvs = document.getElementById("tetris");
const ctx = cvs.getContext("2d");
const scoreElement = document.getElementById("score");
let levelElement = document.getElementById("level");
const increment = document.getElementById("increment");
var level = 1;
var timer = 1000;
increment.addEventListener("click", function () {
    ++level;
    if (level >= 4) {
         level = 4;
    }
    if (level == 2) {
        timer = 600;
    }

    if (level == 3) {
        timer = 300;
    }
    if (level == 4) {
        timer = 100;
    }
    levelElement.value = level;
//     console.log("level", level);
})
const decrement = document.getElementById("decrement");
decrement.addEventListener("click", function () {
    level -= 1;
    if (level <= 1) {
        level = 1;
    }
    if (level == 2) {
        timer = 600;
    }
    else if (level == 3) {
        timer = 300;
    }
    else if (level == 4) {
        timer = 1000;
    }
    levelElement.value = level;
})
const ROW = 12;
const COL = COLUMN = 3;
const SQ = circleSize = 46;
const VACANT = "WHITE";
const radius = 23;
const YELLOW = "yellow";
const PURPLE = "purple";
const GREEN = "green";
const BLUE = "blue";
function drawBall(x, y, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc((x + 0.5) * SQ, (y + 0.5) * SQ, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "WHITE";
    ctx.stroke();
}
var Grid = [];
for (r = 0; r < ROW; r++) {
    Grid[r] = [];
    for (c = 0; c < COL; c++) {
        Grid[r][c] = VACANT;
    }
}
function drawGrid() {
    for (r = 0; r < ROW; r++) {
        for (c = 0; c < COL; c++) {
            drawBall(c, r, Grid[r][c]);
        }
    }
}
drawGrid();
const O = [
    [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0],
    ],
  ];
const PIECES = [
    [O, "purple"],
    [O, "green"],
    [O, "yellow"],
    [O, "blue"]
];
function randomPiece() {
    let r = randomN = Math.floor(Math.random() * PIECES.length)
    return new Piece(PIECES[r][0], PIECES[r][1]);
}
let p = randomPiece();
function Piece(Ball, color) {
    this.Ball = Ball;
    this.color = color;
    this.BallN = 0;
    this.activeBall = this.Ball[this.BallN];
    this.x = 0;
    this.y = -3;
}
Piece.prototype.fill = function (color) {
    for (r = 0; r < this.activeBall.length; r++) {
        for (c = 0; c < this.activeBall.length; c++) {
            if (this.activeBall[r][c]) {
                drawBall(this.x + c, this.y + r, color);
            }
        }
    }
}
Piece.prototype.draw = function () {
    this.fill(this.color);
}
Piece.prototype.unDraw = function () {
    this.fill(VACANT);
}
Piece.prototype.moveDown = function () {
    if (!this.boundaryCheck(0, 1, this.activeBall)) {
        this.unDraw();
        this.y++;
        this.draw();
    } else {
        this.lock();
        p = randomPiece();
    }
}
Piece.prototype.moveRight = function () {
    if (!this.boundaryCheck(1, 0, this.activeBall)) {
        this.unDraw();
        this.x++;
        this.draw();
    }
}
Piece.prototype.moveLeft = function () {
    if (!this.boundaryCheck(-1, 0, this.activeBall)) {
        this.unDraw();
        this.x--;
        this.draw();
    }
}
var score = 0;
Piece.prototype.lock = function () {
    for (r = 0; r < this.activeBall.length; r++) {
        for (c = 0; c < this.activeBall.length; c++) {
            if (!this.activeBall[r][c]) {
                continue;
            }
            if (this.y + r < 0) {
                alert(`Game Over Your Score is ${score}`);
                gameOver = true;
                if (gameOver) {
                    location.reload();
                }
                break;
            }
            Grid[this.y + r][this.x + c] = this.color;
        }
    }
    function checkHorizontal(Grid,color){
        for (r = 0; r < ROW; r++) {
            let isRowFull = true;
            for (c = 0; c < COL; c++) {
                isRowFull = (isRowFull && (Grid[r][c] == color));
            }
            if (isRowFull) {
                for (y = r; y > 1; y--) {
                    for (c = 0; c < COL; c++) {
                        Grid[y][c] = Grid[y - 1][c];
                    }
                }
                for (c = 0; c < COL; c++) {
                    Grid[0][c] = VACANT;
                }
                score += 10;
            }
        }
    }
    checkHorizontal(Grid,YELLOW);
    function checkVertical(Grid, color) {
        for (c = 0; c < COL; ++c) {
            if ((Grid[8][c] === color) && (Grid[9][c] === color) && (Grid[10][c] === color)) {
                Grid[8][c] = VACANT;
                Grid[9][c] = VACANT;
                Grid[10][c] = VACANT;
                score+=100;
            }
            if ((Grid[9][c] === color) && (Grid[10][c] === color) && (Grid[11][c] === color)) {
                Grid[9][c] = VACANT;
                Grid[10][c] = VACANT;
                Grid[11][c] = VACANT;
                score+=10;
            }
            if ((Grid[7][c] === color) && (Grid[8][c] === color) && (Grid[9][c] === color)) {
                Grid[7][c] = VACANT;
                Grid[8][c] = VACANT;
                Grid[9][c] = VACANT;
                score+=100;
            }
            if ((Grid[6][c] === color) && (Grid[7][c] === color) && (Grid[8][c] === color)) {
                Grid[6][c] = VACANT;
                Grid[7][c] = VACANT;
                Grid[8][c] = VACANT;
                score+=100;
            } 
            if ((Grid[5][c] === color) && (Grid[6][c] === color) && (Grid[7][c] === color)) {
                Grid[5][c] = VACANT;
                Grid[6][c] = VACANT;
                Grid[7][c] = VACANT;
                score+=100;
            }
            if ((Grid[4][c] === color) && (Grid[5][c] === color) && (Grid[6][c] === color)) {
                Grid[4][c] = VACANT;
                Grid[5][c] = VACANT;
                Grid[6][c] = VACANT;
                score+=100;
            }
            if ((Grid[3][c] === color) && (Grid[4][c] === color) && (Grid[5][c] === color)) {
                Grid[3][c] = VACANT;
                Grid[4][c] = VACANT;
                Grid[5][c] = VACANT;
                score+=100;
            }
            if ((Grid[2][c] === color) && (Grid[3][c] === color) && (Grid[4][c] === color)) {
                Grid[2][c] = VACANT;
                Grid[3][c] = VACANT;
                Grid[4][c] = VACANT;
                score+=100;
            }
            if ((Grid[1][c] === color) && (Grid[2][c] === color) && (Grid[3][c] === color)) {
                Grid[1][c] = VACANT;
                Grid[2][c] = VACANT;
                Grid[3][c] = VACANT;
                score+=100;
            }
            if ((Grid[0][c] === color) && (Grid[1][c] === color) && (Grid[2][c] === color)) {
                Grid[0][c] = VACANT;
                Grid[1][c] = VACANT;
                Grid[2][c] = VACANT;
                score+=100;
            }
        }
    }
    checkVertical(Grid, YELLOW);
    drawGrid();
    scoreElement.value = score;
    checkHorizontal(Grid,BLUE);
    checkVertical(Grid,BLUE);
    drawGrid();
    scoreElement.value = score;
    checkHorizontal(Grid,GREEN);
    checkVertical(Grid,GREEN);
    drawGrid();
    scoreElement.value = score;
    checkHorizontal(Grid,PURPLE);
    checkVertical(Grid,PURPLE);
    drawGrid();
    scoreElement.value = score;
}
Piece.prototype.boundaryCheck = function (x, y, piece) {
    for (r = 0; r < piece.length; r++) {
        for (c = 0; c < piece.length; c++) {
            if (!piece[r][c]) {
                continue;
            }
            let newX = this.x + c + x;
            let newY = this.y + r + y;
            if (newX < 0 || newX >= COL || newY >= ROW) {
                return true;
            }
            if (newY < 0) {
                continue;
            }
            if (Grid[newY][newX] != VACANT) {
                return true;
            }
        }
    }
    return false;
}
document.addEventListener("keydown", CONTROL);
function CONTROL(event) {
    if (event.keyCode == 37) {
        p.moveLeft();
        dropStart = Date.now();
    } else if (event.keyCode == 38) {
        dropStart = Date.now();
    } else if (event.keyCode == 39) {
        p.moveRight();
        dropStart = Date.now();
    } else if (event.keyCode == 40) {
        p.moveDown();
    }
}
let leftarrow = document.getElementById("leftarrow");
leftarrow.addEventListener("click", () => {
    p.moveLeft();
    dropStart = Date.now();
});
let rightarrow = document.getElementById("rightarrow");
rightarrow.addEventListener("click", () => {
    p.moveRight();
    dropStart = Date.now();
});
let downarrow = document.getElementById("downarrow");
downarrow.addEventListener("click", () => {
    p.moveDown();
});
let dropStart = Date.now();
let gameOver = false;
function drop() {
    let now = Date.now();
    let delta = now - dropStart;
    if (delta > timer) {
        p.moveDown();
        dropStart = Date.now();
    }
    if (!gameOver) {
        requestAnimationFrame(drop);
    }
}
drop();