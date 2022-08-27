/*
possible = ["l1", "l2", "l3", "l4", "l5"];
array2 = ["randomthing", "alsorandom ting", "l3"];
item = "l3";
let position;
let x = 0;
while (!(position >= 0)) {
  position = possible.indexOf(array2[x]);
  x++;
  if (x > 4) {
    break;
  }
}
console.log(position);
*/
const timeLeftDisplay = document.querySelector("#time-left");
const resultDisplay = document.querySelector("#result");
const startPauseButton = document.querySelector("#start-pause-button");
const startPauseText = document.querySelector("#start-pause-text");
const squares = document.querySelectorAll(".grid div");
const logsLeft = document.querySelectorAll(".log-left");
const logsMiddle = document.querySelectorAll(".log-right-fast");
const logsRight = document.querySelectorAll(".log-right");
const carsLeft = document.querySelectorAll(".car-left");
const carsMiddle = document.querySelectorAll(".car-left-fast");
const carsRight = document.querySelectorAll(".car-right");
const grid = document.querySelector(".grid");

const logPositions = ["l1", "l2", "l3", "l4", "l5"];
const carPositions = ["c1", "c2", "c3"];
const gridWidth = 13;
const gridHeight = 13;
const gameSpeed = 250;
const checkSpeed = 10;
const maxTime = 20;

let position;
let currentIndex = 162;
let timerId;
let outcomeTimerId;
let currentTime = 20;
let count = 1;
let lost = false;
let won = false;
let lastEvent = { key: "" };

function moveFrog(event) {
  squares[currentIndex].classList.remove("frog");
  if (lastEvent.view != event.view)
    if (!event.repeat) {
      switch (event.key) {
        case "a":
        case "ArrowLeft":
          if (currentIndex % gridWidth !== 0) {
            currentIndex--;
          }
          break;
        case "d":
        case "ArrowRight":
          if (currentIndex % gridWidth < gridWidth - 1) {
            currentIndex++;
          }
          break;
        case "w":
        case "ArrowUp":
          if (currentIndex - gridWidth >= 0) {
            currentIndex -= gridWidth;
          }
          break;
        case "s":
        case "ArrowDown":
          if (currentIndex + gridWidth < gridWidth * gridWidth) {
            currentIndex += gridWidth;
          }
          break;
      }
      squares[currentIndex].classList.add("frog");
    } else {
      squares[currentIndex].classList.add("frog");
    }
  if (event.view == null) {
    lastEvent = event;
  }
}

function autoMoveElements() {
  timeLeftDisplay.textContent = Math.floor(currentTime);
  if (count % 1 == 0) {
    logsLeft.forEach((log) => moveLogLeft(log));
    carsLeft.forEach((car) => moveCarLeft(car));
  }
  if (count % 2 == 0) {
    logsMiddle.forEach((log) => moveLogRight(log));
    carsMiddle.forEach((car) => moveCarLeft(car));
  }
  if (count % 3 == 0) {
    logsRight.forEach((log) => moveLogRight(log));
    carsRight.forEach((car) => moveCarRight(car));
  }
  if (count % 4 == 0) {
    currentTime--;
    timeLeftDisplay.textContent = Math.floor(currentTime);
  }
  count++;
}

function checkOutcomes() {
  lose();
  win();
}

function moveLogLeft(log) {
  position = logPositions.indexOf(log.classList[1]);
  log.classList.remove(logPositions[position]);
  log.classList.add(logPositions[position + 1 == 5 ? 0 : position + 1]);
  /*
  if (log.classList.contains("frog")) {
    document.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "ArrowLeft",
      })
    );
  }
  */
}

function moveLogRight(log) {
  position = logPositions.indexOf(log.classList[1]);
  log.classList.remove(logPositions[position]);
  log.classList.add(logPositions[position - 1 == -1 ? 4 : position - 1]);
  /*
  if (log.classList.contains("frog")) {
    moveFrog({ key: "d" });
  }
  */
  /*
  if (log.classList.contains("frog")) {
    document.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "ArrowRight",
      })
    );
  }
  */
}

function moveCarLeft(car) {
  position = carPositions.indexOf(car.classList[1]);
  car.classList.remove(carPositions[position]);
  car.classList.add(carPositions[position + 1 == 3 ? 0 : position + 1]);
}

function moveCarRight(car) {
  position = carPositions.indexOf(car.classList[1]);
  car.classList.remove(carPositions[position]);
  car.classList.add(carPositions[position - 1 == -1 ? 2 : position - 1]);
}

function lose() {
  if (
    squares[currentIndex].classList.contains("c1") ||
    squares[currentIndex].classList.contains("l4") ||
    squares[currentIndex].classList.contains("l5") ||
    currentTime <= 0
  ) {
    resultDisplay.textContent = "You lose!";
    resultDisplay.style.color = "red";
    startPauseText.textContent = "Play Again!";
    grid.style.borderColor = "red";
    grid.style.borderWidth = "10px";
    clearInterval(timerId);
    clearInterval(outcomeTimerId);
    squares[currentIndex].classList.remove("frog");
    document.removeEventListener("keydown", moveFrog);
    lost = true;
  }
}

function win() {
  if (squares[currentIndex].classList.contains("ending-block")) {
    resultDisplay.textContent = "You win!";
    resultDisplay.style.color = "green";
    startPauseText.textContent = "Play Again!";
    grid.style.borderColor = "green";
    grid.style.borderWidth = "10px";
    clearInterval(timerId);
    clearInterval(outcomeTimerId);
    document.removeEventListener("keydown", moveFrog);
    won = true;
  }
}

startPauseButton.addEventListener("click", () => {
  if (lost || won) {
    location.reload();
  }
  if (timerId) {
    startPauseText.textContent = "Resume";
    clearInterval(timerId);
    clearInterval(outcomeTimerId);
    timerId = null;
    outcomeTimerId = null;
    document.removeEventListener("keydown", moveFrog);
  } else {
    startPauseText.textContent = "Pause";
    timerId = setInterval(autoMoveElements, gameSpeed);
    outcomeTimerId = setInterval(checkOutcomes, checkSpeed);
    document.addEventListener("keydown", moveFrog);
  }
});
