import { allWordsExceptAnswers, allAnswerWords } from "./constants.js";
const board = document.getElementById("board");
const popup = document.getElementById("popup");
const resultText = document.getElementById("result-text");
const resultValue = document.getElementById("result-value");
const playAgainButton = document.getElementById("play-again-button");
const allWords = allWordsExceptAnswers.concat(allAnswerWords);
const answersLength = allAnswerWords.length;
let currentRowIndex = 0;
let currentCellIndex = 0;
let currentRow;
let answerWord;
let randomNumber;
let currentWord;
const possibleStates = ["correct", "present", "absent"];
const createCells = () => {
    for (let i = 0; i <= 5; i++) {
        const row = document.createElement("div");
        row.className = "row " + i.toString();
        for (let j = 0; j <= 4; j++) {
            const cell = document.createElement("div");
            cell.className = "cell " + i.toString() + j.toString();
            const paragraph = document.createElement("p");
            paragraph.className = "letter";
            paragraph.innerHTML = "";
            cell.appendChild(paragraph);
            row.appendChild(cell);
        }
        board === null || board === void 0 ? void 0 : board.appendChild(row);
    }
};
createCells();
const rows = document.querySelectorAll(".row");
const createAnswerWord = () => {
    randomNumber = Math.floor(Math.random() * (answersLength + 1));
    answerWord = allAnswerWords[randomNumber].toUpperCase();
    console.log("answer: ", answerWord);
};
createAnswerWord();
const checkValidWord = (word) => {
    return allWords.includes(word.toLowerCase());
};
const checkValidAnswerWord = (word) => {
    return allAnswerWords.includes(word.toLowerCase());
};
const updateCellNumber = (type) => {
    /*
    accepted inputs:
    key: next cell, if space
    back: previous cell, if space
    enter: next row, first cell
    */
    if (type === "key" && currentCellIndex <= 4) {
        currentCellIndex++;
    }
    else if (type === "back" && currentCellIndex > 0) {
        currentCellIndex--;
    }
    else if (type === "enter") {
        currentCellIndex = 0;
        currentRowIndex++;
    }
};
const checkIfSpace = () => {
    return currentCellIndex <= 4;
};
const insertLetter = (letter) => {
    const currentCell = currentRow === null || currentRow === void 0 ? void 0 : currentRow.children[currentCellIndex];
    const currentCellPara = currentCell.children[0];
    if (!currentCellPara.innerHTML) {
        currentCellPara.innerHTML = letter;
    }
};
const deleteRecentLetter = () => {
    const lastCell = currentRow === null || currentRow === void 0 ? void 0 : currentRow.children[currentCellIndex - 1];
    const lastCellPara = lastCell.children[0];
    if (lastCellPara.innerHTML) {
        lastCellPara.innerHTML = "";
    }
};
const findCurrentWord = () => {
    let word = "";
    for (let cell of currentRow.children) {
        const cellPara = cell.children[0];
        word += cellPara.innerHTML;
    }
    return word;
};
const enablePopup = () => {
    document.removeEventListener("keydown", gameLoop);
    setTimeout(() => {
        popup.style.display = "flex";
    }, 250);
    playAgainButton.addEventListener("click", playAgain);
};
const win = () => {
    enablePopup();
    resultValue.innerHTML = "Win!";
    resultValue.style.color = "#7bb274";
};
const lose = () => {
    enablePopup();
    resultValue.innerHTML = "Lose!";
    resultValue.style.color = "#d3494e";
};
const playAgain = () => {
    location.reload();
};
const updateCurrentWord = () => {
    currentWord = findCurrentWord();
};
const checkWin = () => {
    if (currentWord === answerWord) {
        win();
        return true;
    }
    return false;
};
const changeColourOfCell = (cellPosition, state) => {
    const cell = currentRow.children[cellPosition];
    let alreadyContainsState = false;
    for (let state of possibleStates) {
        if (cell.classList.contains(state)) {
            alreadyContainsState = true;
        }
    }
    if (possibleStates.includes(state) && !alreadyContainsState) {
        cell.classList.add(state);
    }
};
const checkLetters = () => {
    let currentWordArray = currentWord.split("");
    let answerWordArray = answerWord.split("");
    for (let i = 0; i < 5; i++) {
        const currentWordLetter = currentWordArray[i];
        const answerWordLetter = answerWordArray[i];
        if (currentWordLetter === answerWordLetter) {
            changeColourOfCell(i, "correct");
            currentWordArray[i] = "";
            answerWordArray[i] = "";
        }
    }
    for (let i = 0; i < 5; i++) {
        const answerWordLetter = answerWordArray[i];
        if (currentWordArray.includes(answerWordLetter)) {
            const indexOfLetter = currentWordArray.indexOf(answerWordLetter);
            changeColourOfCell(indexOfLetter, "present");
            currentWordArray[indexOfLetter] = "";
            answerWordArray[i] = "";
        }
    }
    for (let i = 0; i < 5; i++) {
        const currentWordLetter = currentWordArray[i];
        if (currentWordLetter) {
            changeColourOfCell(i, "absent");
            currentWordArray[i] = "";
        }
    }
    checkWin();
};
const onEnterPress = () => {
    const validWord = checkValidWord(currentWord);
    if (currentCellIndex === 5 && validWord) {
        checkLetters();
        updateCellNumber("enter");
    }
};
const onBackspacePress = () => {
    if (currentCellIndex > 0) {
        deleteRecentLetter();
        updateCellNumber("back");
    }
};
const onKeyPress = (letter) => {
    letter = letter.toUpperCase();
    const validSpace = checkIfSpace();
    if (validSpace) {
        insertLetter(letter);
        updateCellNumber("key");
    }
};
const gameLoop = (event) => {
    currentRow = rows[currentRowIndex];
    let key = event.key;
    if (key === "Enter") {
        onEnterPress();
    }
    else if (key === "Backspace") {
        onBackspacePress();
    }
    else if (((key.charCodeAt(0) >= 97 && key.charCodeAt(0) <= 122) ||
        (key.charCodeAt(0) >= 65 && key.charCodeAt(0) <= 90)) &&
        key.length === 1) {
        onKeyPress(key);
    }
    updateCurrentWord();
    if (currentRowIndex >= 6) {
        if (checkWin()) {
            return;
        }
        lose();
    }
};
document.addEventListener("keydown", gameLoop);
//# sourceMappingURL=script.js.map