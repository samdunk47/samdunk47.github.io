import cardArray from "./cards.js";

cardArray.sort(() => 0.5 - Math.random());

const gridDisplay = document.querySelector("#grid");
const resultDisplay = document.querySelector("#result");
const attemptsDisplay = document.querySelector("#attempts");
let cardsChosen = [];
let cardsChosenIds = [];
let attempts = 0;
const cardsWon = [];

function createBoard() {
  for (let i = 0; i < cardArray.length; i++) {
    const card = document.createElement("img");
    card.setAttribute("src", "images/blank.png");
    card.setAttribute("data-id", i);
    card.addEventListener("click", flipCard);
    gridDisplay.appendChild(card);
  }
}
createBoard();

function checkMatch() {
  const cards = document.querySelectorAll("img");
  if (cardsChosenIds[0] == cardsChosenIds[1]) {
    alert("You clicked the same image!");
    cards[cardsChosenIds[0]].setAttribute("src", "images/blank.png");
    cardsChosen = [];
    cardsChosenIds = [];
    return;
  }
  if (cardsChosen[0] == cardsChosen[1]) {
    alert("You found a match!");
    for (let i = 0; i < 2; i++) {
      cards[cardsChosenIds[i]].setAttribute("src", "images/white.png");
      cards[cardsChosenIds[i]].removeEventListener("click", flipCard);
    }
    cardsWon.push(cardsChosen);
  } else {
    cards[cardsChosenIds[0]].setAttribute("src", "images/blank.png");
    cards[cardsChosenIds[1]].setAttribute("src", "images/blank.png");
    alert("Try again!");
  }
  resultDisplay.innerHTML = cardsWon.length;
  cardsChosen = [];
  cardsChosenIds = [];
  if (cardsWon.length == cardArray.length / 2) {
    resultDisplay.innerHTML = "Congratulations! You found them all!";
  }
  attempts++;
  attemptsDisplay.innerHTML = attempts;
}

function flipCard() {
  const cardId = this.getAttribute("data-id");
  cardsChosen.push(cardArray[cardId].name);
  cardsChosenIds.push(cardId);
  this.setAttribute("src", cardArray[cardId].img);
  if (cardsChosen.length === 2) {
    setTimeout(checkMatch, 200);
  }
}
