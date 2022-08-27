const computerChoicedisplay = document.getElementById('computer-choice');
const UserChoiceDisplay = document.getElementById('user-choice');
const resultDisplay = document.getElementById('result');
const possibleChoices = document.querySelectorAll('button');
let userChoice;
let computerChoice;
let result;

possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click', (e) => {
  userChoice = e.target.id;
  UserChoiceDisplay.innerHTML = userChoice;
  generateComputerChoice();
  getResult()
}))

function generateComputerChoice() {
  computerChoice = ['rock', 'paper', 'scissors'][Math.floor(Math.random() * possibleChoices.length)];
  computerChoicedisplay.innerHTML = computerChoice;
    
}

function getResult() {
  if (computerChoice === userChoice) {
    result = 'it\'s a draw!';
  } else if ((userChoice === 'rock' && computerChoice === 'scissors') || 
  (userChoice === 'scissors' && computerChoice === 'paper') || 
  (userChoice === 'paper' && computerChoice === 'rock')) {
    result = 'you win!'
  } else {
    result = 'you lose'
  }
  resultDisplay.innerHTML = result;
  console.log(result);
}
