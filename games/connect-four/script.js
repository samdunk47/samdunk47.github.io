document.addEventListener("DOMContentLoaded", () => {
  const grid = document.createElement("div");
  grid.classList.add("grid");
  document.body.appendChild(grid);

  const turnDisplayText = document.querySelector(".turn-display-text");

  const colours = ["red", "yellow"];
  let currentTurn = "red";
  let spaces = []; // Array.from(Array(6), () => new Array(7));

  turnDisplayText.style.color = currentTurn;

  function createGridItems() {
    for (let i = 0; i < 42; i++) {
      let space = document.createElement("div");
      space.classList.add("space");
      grid.appendChild(space);
      spaces.push(space);
    }
  }

  const winnerDisplay = document.createElement("h1");
  winnerDisplay.classList.add("winner-display");
  grid.appendChild(winnerDisplay);

  createGridItems();

  function doChecks() {
    spaces.forEach((space) => {
      space.addEventListener("mouseover", () => {
        if (space.classList.contains("taken")) {
          space.style.cursor = "not-allowed";
        } else {
          space.style.cursor = "pointer";
        }
      });

      space.addEventListener("mousedown", () => {
        if (!space.classList.contains("taken")) {
          let posValue = spaces.indexOf(space); // parseInt(space.classList[2][2]) * 7 + parseInt(space.classList[1][2]);
          let newSpace;
          while (!spaces[posValue].classList.contains("taken")) {
            if (posValue >= 35) {
              newSpace = spaces[posValue];
              break;
            }
            newSpace = spaces[posValue];
            posValue += 7;
          }
          if (currentTurn == "red") {
            newSpace.classList.add("red");
            currentTurn = "yellow";
          } else if (currentTurn == "yellow") {
            newSpace.classList.add("yellow");
            currentTurn = "red";
          }
          turnDisplayText.textContent = currentTurn;
          turnDisplayText.style.color = currentTurn;
          newSpace.classList.add("taken");
        }
      });
    });
  }

  function win(colour) {
    console.log("winner!", colour);
    const colourCapitalized = colour.charAt(0).toUpperCase() + colour.slice(1);
    winnerDisplay.textContent = colourCapitalized + " Wins!";
    winnerDisplay.style.color = colour;
    turnDisplayText.textContent = "Game Finished";
    turnDisplayText.style.color = "black";
    spaces.forEach((space) => {
      space.replaceWith(space.cloneNode(true));
    });
  }

  function checkWin() {
    for (let colour of colours) {
      for (let i = 0; i < 42; i++) {
        if (
          (i < 38 &&
            spaces[i].classList.contains(colour) &&
            spaces[i + 1].classList.contains(colour) &&
            spaces[i + 2].classList.contains(colour) &&
            spaces[i + 3].classList.contains(colour) &&
            i % 7 < (i + 4) % 7) ||
          (i < 21 &&
            spaces[i].classList.contains(colour) &&
            spaces[i + 7].classList.contains(colour) &&
            spaces[i + 14].classList.contains(colour) &&
            spaces[i + 21].classList.contains(colour)) ||
          (i < 18 &&
            i % 7 < 4 &&
            spaces[i].classList.contains(colour) &&
            spaces[i + 8].classList.contains(colour) &&
            spaces[i + 16].classList.contains(colour) &&
            spaces[i + 24].classList.contains(colour)) ||
          (i < 21 &&
            i % 7 > 2 &&
            spaces[i].classList.contains(colour) &&
            spaces[i + 6].classList.contains(colour) &&
            spaces[i + 12].classList.contains(colour) &&
            spaces[i + 18].classList.contains(colour))
        ) {
          win(colour);
        }
      }
    }
  }

  doChecks();

  setInterval(checkWin, 1000);
});
