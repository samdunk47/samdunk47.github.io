document.addEventListener("DOMContentLoaded", () => {
  const grid = document.createElement("div");
  grid.classList.add("grid");
  document.body.appendChild(grid);

  const resultDisplay = document.createElement("h2");
  resultDisplay.classList.add("result-display");
  grid.appendChild(resultDisplay);

  const playAgainDisplay = document.createElement("h2");
  playAgainDisplay.classList.add("play-again-display");
  grid.appendChild(playAgainDisplay);
  playAgainDisplay.textContent = "Play Again";
  playAgainDisplay.addEventListener("mouseup", () => {
    location.reload();
  })

  const frog = document.createElement("div");
  frog.classList.add("frog");
  grid.appendChild(frog);

  const endingBlock = document.createElement("div");
  endingBlock.classList.add("ending-block");
  grid.appendChild(endingBlock);

  const numOfBlocksWidth = 13;
  const numOfBlocksHeight = numOfBlocksWidth;
  const smallestWindowDimension =
    window.innerHeight < window.innerWidth
      ? window.innerHeight
      : window.innerWidth;
  const blockWidth = (0.75 * smallestWindowDimension) / 13;
  const blockHeight = blockWidth;
  const gridWidth = numOfBlocksWidth * blockWidth;
  const gridHeight = numOfBlocksHeight * blockHeight;
  const logWidth = blockWidth * 3;
  const logHeight = blockHeight;
  const logGap = blockWidth * 2;
  const waterWidth = blockWidth * 2;
  const waterHeight = blockHeight;
  const waterGap = blockWidth * 2;
  const carWidth = blockWidth;
  const carHeight = blockHeight;
  const carGap = blockWidth * 2;
  const roadWidth = blockWidth;
  const roadHeight = blockHeight;
  const frogWidth = blockWidth;
  const frogHeight = blockHeight;
  const frogStart = [gridWidth / 2 - blockWidth / 2, gridHeight - blockWidth];
  const endingBlockPos = [gridWidth / 2 - blockWidth / 2, 0];
  const gameSpeed = 10;
  const checkSpeed = 10;
  const maxLevel = 5;

  let logs = [];
  let waters = [];
  let roads = [];
  let cars = [];

  let moveElementPx = gridWidth / 1560;
  let level = 1;
  let frogPosition = frogStart;
  let timerId, timerId2, outcomeTimerId;
  let extraGap;
  let index = 0;
  let newLog, newWater, newCar;
  let currentLog, currentWater, currentCar;

  resultDisplay.textContent = "Level 1";
  grid.style.width = 75 + "vh";
  grid.style.height = 75 + "vh";

  class Log {
    constructor(xAxis, yAxis) {
      this.topLeft = [xAxis, yAxis + logHeight];
    }
  }

  class Water {
    constructor(xAxis, yAxis) {
      this.topLeft = [xAxis, yAxis + waterHeight];
    }
  }

  class Road {
    constructor(xAxis, yAxis) {
      this.topLeft = [xAxis, yAxis + roadHeight];
    }
  }

  class Car {
    constructor(xAxis, yAxis) {
      this.topLeft = [xAxis, yAxis + carHeight];
    }
  }

  function createLogs() {
    extraGap = 0;
    for (let y = blockHeight; y < blockHeight * 4; y += logHeight) {
      for (let x = 0; x < gridWidth + blockWidth * 3; x += logWidth + logGap) {
        newLog = new Log(x + extraGap, y);
        if (newLog.topLeft[0] > gridWidth) {
          newLog.topLeft[0] -= gridWidth + blockWidth * 7;
        }
        logs.push(newLog);
      }
      extraGap += blockWidth * 2;
    }
  }

  function createWater() {
    extraGap = 0;
    for (let y = blockHeight; y < blockHeight * 4; y += waterHeight) {
      for (
        let x = -(blockWidth * 2);
        x < gridWidth + blockWidth * 16;
        x += waterWidth + logWidth
      ) {
        newWater = new Water(x + extraGap, y);
        if (newWater.topLeft[0] > gridWidth) {
          newWater.topLeft[0] -= gridWidth + waterWidth;
        }
        waters.push(newWater);
      }
      extraGap += blockWidth * 2;
    }
  }

  function createRoads() {
    for (let y = blockHeight * 5; y < blockHeight * 10; y += roadHeight) {
      for (let x = 0; x < gridWidth; x += roadWidth) {
        newRoad = new Road(x, y);
        roads.push(newRoad);
      }
    }
  }

  function createCars() {
    extraGap = 0;
    for (let y = blockHeight * 5; y < blockHeight * 10; y += carHeight * 2) {
      for (let x = 0; x < gridWidth + blockWidth; x += carWidth + carGap) {
        newCar = new Car(x + extraGap, y);
        if (newCar.topLeft[0] > gridWidth) {
          newCar.topLeft[0] -= gridWidth + blockWidth * 2;
        }
        cars.push(newCar);
      }
      extraGap += blockHeight * 2;
    }
  }

  createLogs();
  createWater();
  createRoads();
  createCars();

  function addLogs() {
    for (let i = 0; i < logs.length; i++) {
      let log = document.createElement("div");
      log.style.left = logs[i].topLeft[0] + "px";
      log.style.top = logs[i].topLeft[1] + "px";
      if (logs[i].topLeft[1] == blockHeight * 3) {
        log.classList.add("log-middle");
      } else if (logs[i].topLeft[1] == blockHeight * 2) {
        log.classList.add("log-top");
      } else if (logs[i].topLeft[1] == blockHeight * 4) {
        log.classList.add("log-bottom");
      }
      grid.appendChild(log);
    }
  }

  function addWaters() {
    for (let i = 0; i < waters.length; i++) {
      let water = document.createElement("div");
      water.classList.add("water");
      water.style.left = waters[i].topLeft[0] + "px";
      water.style.top = waters[i].topLeft[1] + "px";
      grid.appendChild(water);
    }
  }

  function addRoads() {
    for (let i = 0; i < roads.length; i++) {
      let road = document.createElement("div");
      road.classList.add("road");
      road.style.left = roads[i].topLeft[0] + "px";
      road.style.top = roads[i].topLeft[1] + "px";
      grid.append(road);
    }
  }

  function addCars() {
    for (let i = 0; i < cars.length; i++) {
      let car = document.createElement("div");
      car.classList.add("car");
      car.style.left = cars[i].topLeft[0] + "px";
      car.style.top = cars[i].topLeft[1] + "px";
      grid.appendChild(car);
    }
  }

  addLogs();
  addWaters();
  addRoads();
  addCars();

  const allLogs = [];
  Array.from(document.querySelectorAll(".log-top")).forEach((item) => {
    allLogs.push(item);
  });
  Array.from(document.querySelectorAll(".log-middle")).forEach((item) => {
    allLogs.push(item);
  });
  Array.from(document.querySelectorAll(".log-bottom")).forEach((item) => {
    allLogs.push(item);
  });
  const allWaters = Array.from(document.querySelectorAll(".water"));
  const allCars = Array.from(document.querySelectorAll(".car"));

  function drawEndingBlock() {
    endingBlock.style.left = endingBlockPos[0] + "px";
    endingBlock.style.top = endingBlockPos[1] + "px";
  }

  function drawFrog() {
    frog.style.left = frogPosition[0] + "px";
    frog.style.top = frogPosition[1] + "px";
  }

  function drawLog(log, index) {
    currentLog = allLogs[index];
    currentLogLeft = currentLog.style.left.substring(
      0,
      currentLog.style.left.indexOf("p")
    );
    currentLogTop = currentLog.style.top.substring(
      0,
      currentLog.style.top.indexOf("p")
    );
    if (
      currentLogLeft < -(blockWidth * 3) &&
      currentLogTop >= blockWidth * 3 - 1 &&
      currentLogTop < blockWidth * 4 + 1
    ) {
      log.topLeft[0] += gridWidth + blockWidth * 7;
    }
    if (currentLogLeft >= gridWidth && !(currentLogTop == blockWidth * 3)) {
      log.topLeft[0] -= gridWidth + blockWidth * 7;
    }

    currentLog.style.left = log.topLeft[0] + "px";
    currentLog.style.top = log.topLeft[1] + "px";
  }

  function drawWater(water, index) {
    currentWater = allWaters[index];
    currentWaterLeft = currentWater.style.left.substring(
      0,
      currentWater.style.left.indexOf("p")
    );
    currentWaterTop = currentWater.style.top.substring(
      0,
      currentWater.style.top.indexOf("p")
    );
    if (
      currentWaterLeft <= -(blockWidth * 2) &&
      currentWaterTop >= blockWidth * 3 - 20 &&
      currentWaterTop < blockWidth * 4 + 20
    ) {
      water.topLeft[0] += gridWidth + blockWidth * 2;
    }
    if (currentWaterLeft >= gridWidth && !(currentWaterTop == blockWidth * 3)) {
      water.topLeft[0] -= gridWidth + waterWidth;
    }
    currentWater.style.left = water.topLeft[0] + "px";
    currentWater.style.top = water.topLeft[1] + "px";
  }

  function drawCar(car, index) {
    currentCar = allCars[index];
    currentCarLeft = currentCar.style.left.substring(
      0,
      currentCar.style.left.indexOf("p")
    );
    if (currentCarLeft >= gridWidth) {
      car.topLeft[0] -= gridWidth + blockWidth * 2;
    }
    currentCar.style.left = car.topLeft[0] + "px";
    currentCar.style.top = car.topLeft[1] + "px";
  }

  drawEndingBlock();
  drawFrog();

  function moveFrog(event) {
    if (!event.repeat) {
      switch (event.key) {
        case "a":
        case "ArrowLeft":
          if (frogPosition[0] - blockWidth / 2 > 0) {
            frogPosition[0] -= blockWidth;
            frog.style.transform = "rotate(270deg)";
          }
          break;
        case "d":
        case "ArrowRight":
          if (frogPosition[0] < gridWidth - frogWidth) {
            frogPosition[0] += blockWidth;
            frog.style.transform = "rotate(90deg)";
          }
          break;
        case "w":
        case "ArrowUp":
          if (frogPosition[1] - 2 > 0) {
            frogPosition[1] -= blockHeight;
            frog.style.transform = "rotate(0deg)";
          }
          break;
        case "s":
        case "ArrowDown":
          if (frogPosition[1] < gridHeight - frogWidth) {
            frogPosition[1] += blockHeight;
            frog.style.transform = "rotate(180deg)";
          }
          break;
      }

      drawFrog();
    }
  }

  function autoMoveElements() {
    index = 0;
    waters.forEach((water) => {
      if (
        water.topLeft[1] >= blockWidth * 3 &&
        water.topLeft[1] < blockWidth * 4
      ) {
        water.topLeft[0] -= moveElementPx;
      } else {
        water.topLeft[0] += moveElementPx;
      }
      drawWater(water, index);
      index++;
    });
    index = 0;
    cars.forEach((car) => {
      car.topLeft[0] += moveElementPx;
      drawCar(car, index);
      index++;
    });
    index = 0;
    for (let log of logs) {
      if (log.topLeft[1] >= blockWidth * 3 && log.topLeft[1] < blockWidth * 4) {
        log.topLeft[0] -= moveElementPx;
      } else {
        log.topLeft[0] += moveElementPx;
      }
      drawLog(log, index);
      index++;
    }
  }

  function autoMoveFrog() {
    for (let log of logs) {
      if (
        frogPosition[0] >= log.topLeft[0] &&
        frogPosition[0] < log.topLeft[0] + logWidth
      ) {
        if (
          frogPosition[1] + 2 > blockWidth * 3 &&
          frogPosition[1] - 2 < blockWidth * 3
        ) {
          frogPosition[0] -= moveElementPx;
          drawFrog();
          return;
        } else if (
          (frogPosition[1] + 2 > blockWidth * 2 &&
            frogPosition[1] - 2 < blockWidth * 2) ||
          (frogPosition[1] + 2 > blockWidth * 4 &&
            frogPosition[1] - 2 < blockWidth * 4)
        ) {
          frogPosition[0] += moveElementPx;
          drawFrog();
          return;
        }
      }
    }
  }

  function win() {
    clearInterval(timerId);
    clearInterval(timerId2);
    clearInterval(outcomeTimerId);
    document.removeEventListener("keydown", moveFrog);
    grid.style.borderColor = "green";
    grid.style.borderWidth = "10px";
    resultDisplay.textContent = "You Won";
    resultDisplay.style.color = "green";
  }

  function lose() {
    playAgainDisplay.style.visibility = "inherit";
    clearInterval(timerId);
    clearInterval(timerId2);
    clearInterval(outcomeTimerId);
    document.removeEventListener("keydown", moveFrog);
    grid.style.borderColor = "red";
    grid.style.borderWidth = "10px";
    resultDisplay.textContent = "You Lost";
    resultDisplay.style.color = "red";
  }

  function nextLevel() {
    frogPosition = [gridWidth / 2 - blockWidth / 2, gridHeight - blockWidth];
    level++;
    displayNextLevel();
    setTimeout(normalBorder, 1000);
    setTimeout(resetFrog, 500);
  }

  function displayNextLevel() {
    grid.style.borderColor = "green";
    grid.style.borderWidth = "5px";
    resultDisplay.textContent = "Level " + level;
  }

  function normalBorder() {
    grid.style.borderColor = "black";
    grid.style.borderWidth = "2px";
  }

  function resetFrog() {
    drawFrog();
    moveElementPx += gridWidth / 1560 - gridWidth / (1560 * 2);
  }

  function checkWin() {
    if (
      frogPosition[0] + 2 + blockWidth > endingBlockPos[0] &&
      frogPosition[0] - 2 - blockWidth < endingBlockPos[0] &&
      frogPosition[1] + 2 > endingBlockPos[1] &&
      frogPosition[1] - 2 < endingBlockPos[1] &&
      level == maxLevel
    ) {
      win();
    }
  }

  function checkLose() {
    waters.forEach((water) => {
      if (
        water.topLeft[0] + blockWidth + blockWidth / 2 > frogPosition[0] &&
        frogPosition[0] + blockWidth / 2 > water.topLeft[0] &&
        frogPosition[1] >= water.topLeft[1] - 2 &&
        frogPosition[1] < water.topLeft[1] + waterHeight - 2
      ) {
        lose();
        
      }
    });
    cars.forEach((car) => {
      if (
        car.topLeft[0] + blockWidth > frogPosition[0] &&
        frogPosition[0] + blockWidth > car.topLeft[0] &&
        frogPosition[1] + 2 > car.topLeft[1] &&
        frogPosition[1] - 2 < car.topLeft[1]
      ) {
        lose();
      }
    });
    if (frogPosition[0] + blockWidth < 0 || frogPosition[0] > gridWidth) {
      lose();
    }
  }

  function checkNextLevel() {
    if (
      frogPosition[0] + 2 + blockWidth > endingBlockPos[0] &&
      frogPosition[0] - 2 - blockWidth < endingBlockPos[0] &&
      frogPosition[1] + 2 > endingBlockPos[1] &&
      frogPosition[1] - 2 < endingBlockPos[1] &&
      level < maxLevel
    ) {
      nextLevel();
    }
  }

  function checkOutcomes() {
    checkWin();
    checkLose();
    checkNextLevel();
  }

  timerId2 = setInterval(autoMoveFrog, gameSpeed);
  timerId = setInterval(autoMoveElements, gameSpeed);
  outcomeTimerId = setInterval(checkOutcomes, checkSpeed);

  document.addEventListener("keydown", moveFrog);
});
