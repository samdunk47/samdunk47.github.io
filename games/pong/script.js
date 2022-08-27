const canvas = document.getElementById("game-window");
const context = canvas.getContext("2d");
const fps = 50;
const smallestDimension =
  (window.innerWidth < window.innerHeight
    ? window.innerWidth
    : window.innerHeight) * 0.83;

const paddleWidth = smallestDimension / 40;
const paddleHeight = smallestDimension / 6;
const ballRadius = smallestDimension / 40;
const textSize = smallestDimension / 10;
const netWidth = smallestDimension / 300;
const netHeight = smallestDimension / 40;
const increment = smallestDimension / 20;
const movementSpeed = smallestDimension / 100;
const computerLevel = smallestDimension / 5000;

canvas.width = smallestDimension;
canvas.height = smallestDimension;

while (
  canvas.width + window.innerWidth / 8 <= window.innerWidth &&
  canvas.width <= canvas.height * 1.5
) {
  canvas.width += 1;
}

const colourPalette = {
  background: "#17BEBB",
  user: "#2E282A",
  computer: "#2E282A",
  net: "#FAD8D6",
  ball: "#EF3E36",
  other: "#EDB88B",
};

const user = {
  x: 0,
  y: canvas.height / 2 - paddleHeight / 2,
  width: paddleWidth,
  height: paddleHeight,
  colour: colourPalette.user,
  score: 0,
};

const com = {
  x: canvas.width - paddleWidth,
  y: canvas.height / 2 - paddleHeight / 2,
  width: paddleWidth,
  height: paddleHeight,
  colour: colourPalette.computer,
  score: 0,
};

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: ballRadius,
  speed: movementSpeed,
  velocityX: movementSpeed,
  velocityY: movementSpeed,
  colour: colourPalette.ball,
};

function drawRect(x, y, w, h, colour) {
  context.fillStyle = colour;
  context.fillRect(x, y, w, h);
}

const net = {
  x: canvas.width / 2 - smallestDimension / 600,
  y: 0,
  width: netWidth,
  height: netHeight,
  colour: colourPalette.net,
};

function drawNet() {
  for (let i = smallestDimension / 80; i <= canvas.height; i += increment) {
    drawRect(net.x, net.y + i, net.width, net.height, net.colour);
  }
}

function drawCircle(x, y, r, colour) {
  context.fillStyle = colour;
  context.beginPath();
  context.arc(x, y, r, 0, Math.PI * 2, false);
  context.closePath();
  context.fill();
}

function drawText(text, x, y, colour) {
  context.fillStyle = colour;
  context.font = `${textSize}px consolas`;
  context.fillText(text, x, y);
}

function render() {
  drawRect(0, 0, canvas.width, canvas.height, colourPalette.background);

  drawNet();

  drawText(user.score, canvas.width / 4, canvas.height / 5, colourPalette.text);
  drawText(
    com.score,
    (3 * canvas.width) / 4,
    canvas.height / 5,
    colourPalette.text
  );

  drawRect(user.x, user.y, user.width, user.height, user.colour);
  drawRect(com.x, com.y, com.width, com.height, com.colour);

  drawCircle(ball.x, ball.y, ball.radius, ball.colour);
}

canvas.addEventListener("mousemove", movePaddle);

function movePaddle(event) {
  let rect = canvas.getBoundingClientRect();

  user.y = event.clientY - rect.top - user.height / 2;
}

function collision(ball, paddle) {
  ball.top = ball.y - ball.radius;
  ball.bottom = ball.y + ball.radius;
  ball.left = ball.x - ball.radius;
  ball.right = ball.x + ball.radius;

  paddle.top = paddle.y;
  paddle.bottom = paddle.y + paddle.height;
  paddle.left = paddle.x;
  paddle.right = paddle.x + paddle.width;

  return (
    ball.right > paddle.left &&
    ball.bottom > paddle.top &&
    ball.left < paddle.right &&
    ball.top < paddle.bottom
  );
}

function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.speed = movementSpeed;
  ball.velocityX = -ball.velocityX;
}

function update() {
  ball.x += ball.velocityX;
  ball.y += ball.velocityY;

  com.y += (ball.y - (com.y + com.height / 2)) * computerLevel;

  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.velocityY = -ball.velocityY;
  }

  let player = ball.x < canvas.width / 2 ? user : com;

  if (collision(ball, player)) {
    let collidePoint = ball.y - (player.y + player.height / 2);
    collidePoint = collidePoint / (player.height / 2);

    let angleRad = (collidePoint * Math.PI) / 4;

    let direction = ball.x < canvas.width / 2 ? 1 : -1;

    ball.velocityX = direction * ball.speed * Math.cos(angleRad);
    ball.velocityY = ball.speed * Math.sin(angleRad);

    ball.speed += movementSpeed / 10;
  }

  if (ball.x - ball.radius < 0) {
    com.score++;
    resetBall();
  } else if (ball.x + ball.radius > canvas.width) {
    user.score++;
    resetBall();
  }
}

function game() {
  update();
  render();
}

setInterval(game, 1000 / fps);
