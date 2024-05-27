//board
var blockSize = 40;
var rows = 8;
var cols = 8;
var board;
var context;

let points = 0;

//snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

//food
var foodX;
var foodY;

var gameOver = false;

const images = [
  "docker.png",
  "java.png",
  "react.png",
  "typescript.png",
  "mongoDB.png",
];
let imageIndex = 0;

window.onload = function () {
  var mobileWidth = 480;
  var desktopWidth = 1024;

  var screenWidth = window.innerWidth;
  if (screenWidth > mobileWidth) {
  }
  board = document.getElementById("board");
  board.height = rows * blockSize;
  board.width = cols * blockSize;
  context = board.getContext("2d");

  placeFood();
  document.addEventListener("keyup", changeDirection);

  // Add event listeners for button clicks
  var upButton = document.getElementById("upButton");
  var downButton = document.getElementById("downButton");
  var leftButton = document.getElementById("leftButton");
  var rightButton = document.getElementById("rightButton");

  upButton.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default behavior
    setDirection(0, -1);
  });
  downButton.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default behavior
    setDirection(0, 1);
  });
  leftButton.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default behavior
    setDirection(-1, 0);
  });
  rightButton.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default behavior
    setDirection(1, 0);
  });
  setInterval(update, 1000 / 3.8);

  function update(event) {
    if (gameOver) {
      return;
    }

    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    //context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    var img = new Image();
    img.src = "/assets/" + images[imageIndex];
    context.drawImage(img, foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
      snakeBody.push([foodX, foodY]);
      placeFood();
      points++;
      imageIndex++;
      document.getElementById("scoreDisplay").textContent = points;
      if (isOverFivePoints()) {
        let game = document.getElementById("snake-game");
        let portfolio = document.getElementById("portfolio");

        portfolio.style.display = "block";
        game.style.display = "none";
      }
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
      snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
      snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
      context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //game over conditions
    if (
      snakeX < 0 ||
      snakeX >= cols * blockSize ||
      snakeY < 0 ||
      snakeY >= rows * blockSize
    ) {
      gameOver = true;
      if (!isOverFivePoints()) {
        if (confirm("Game Over")) {
          restartGame(event);
        }
      }
    }

    for (let i = 0; i < snakeBody.length; i++) {
      if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
        gameOver = true;
        if (!isOverFivePoints()) {
          confirm("Game Over");
        }
      }
    }
  }

  function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
      setDirection(0, -1);
    } else if (e.code == "ArrowDown" && velocityY != -1) {
      setDirection(0, 1);
    } else if (e.code == "ArrowLeft" && velocityX != 1) {
      setDirection(-1, 0);
    } else if (e.code == "ArrowRight" && velocityX != -1) {
      setDirection(1, 0);
    }
  }

  function isOverFivePoints() {
    if (points >= 5) {
      return true;
    }
    return false;
  }

  function placeFood() {
    //(0-1) * cols -> (0-19.9999) -> (0-19) * 25
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
  }

  function setDirection(x, y) {
    velocityX = x;
    velocityY = y;
  }
};
function restartGame(event) {
  event.preventDefault();
  window.location.reload();
}
