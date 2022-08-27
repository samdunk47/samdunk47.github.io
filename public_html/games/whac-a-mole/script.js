const squares = document.querySelectorAll(".square");
const mole = document.querySelector(".mole");
const timeLeft = document.querySelector("#time-left");
const score = document.querySelector("#score");
const stopButton = document.querySelector("#pause-button");

let result = 0;
let hitPosition;
let currentTime = 60;
let timerId = null;
let countDownTimerId = null;
let paused = false;
let randomSquare, lastRandomSquare;

timerId = setInterval(chooseRandomSquare, 1000);
countDownTimerId = setInterval(countDown, 1000);

function chooseRandomSquare() {
  squares.forEach((square) => {
    square.classList.remove("mole");
  });
  do {
    randomSquare = squares[Math.floor(Math.random() * 9)];
  } while (randomSquare == lastRandomSquare);
  randomSquare.classList.add("mole");
  hitPosition = randomSquare.id;
  lastRandomSquare = randomSquare;
}

squares.forEach((square) => {
  square.addEventListener("mousedown", () => {
    if (square.id == hitPosition) {
      square.classList.remove("mole");
      result++;
      score.innerHTML = result;
      hitPosition = null;
    }
  });
});

function countDown() {
  currentTime--;
  timeLeft.innerHTML = currentTime;
  if (currentTime < 0) {
    clearInterval(countDownTimerId);
    clearInterval(timerId);
    timeLeft.innerHTML = "0";
    alert(`Game over! Your final score is ${result}`);
  }
}

function pauseGame() {
  if (!paused) {
    clearInterval(timerId);
    clearInterval(countDownTimerId);
    stopButton.textContent = "Unpause";
    paused = true;
  } else {
    timerId = setInterval(chooseRandomSquare, 1000);
    countDownTimerId = setInterval(countDown, 1000);
    stopButton.textContent = "Pause";
    paused = false;
  }
}
