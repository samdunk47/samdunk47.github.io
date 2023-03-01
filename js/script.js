import { allWords, allAnswerWords } from "./constants.js";
const board = document.getElementById("board");
let currentRowNum = 0;
let currentCellNum = 0;
let currentRow;
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
const checkValidWord = (word) => {
    return word in allWords;
};
const checkValidAnswerWord = (word) => {
    return word in allAnswerWords;
};
const updateCellNumber = (type) => {
    /*
    accepted inputs:
    key: next cell, if space
    back: previous cell, if space
    enter: next row, first cell
    */
    if (type === "key" && currentCellNum <= 4) {
        currentCellNum++;
    }
    else if (type === "back" && currentCellNum > 0) {
        currentCellNum--;
    }
    else if (type === "enter") {
        currentCellNum = 0;
        currentRowNum++;
    }
};
const checkIfSpace = () => {
    return currentCellNum <= 4;
};
const insertLetter = (letter) => {
    const currentCell = currentRow === null || currentRow === void 0 ? void 0 : currentRow.children[currentCellNum];
    "asjoeijfopiasejfopiasejfpoasiejfpoaieuwpqoirupqoiwuerpoiqwuerpoqwiruoiwe";
    const currentCellPara = currentCell.children[0];
    if (!currentCellPara.innerHTML) {
        currentCellPara.innerHTML = letter;
    }
};
const deleteRecentLetter = () => {
    const lastCell = currentRow === null || currentRow === void 0 ? void 0 : currentRow.children[currentCellNum - 1];
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
    console.log(word);
    return word;
};
const checkWin = () => { };
const checkLetters = () => { };
const onEnterPress = () => {
    if (currentCellNum === 5) {
        checkLetters();
        if (currentRowNum === 6) {
            checkWin();
        }
        updateCellNumber("enter");
    }
};
const onBackspacePress = () => {
    if (currentCellNum > 0) {
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
document.addEventListener("keydown", (event) => {
    console.log(event);
    console.log(currentCellNum, currentRowNum);
    currentRow = rows[currentRowNum];
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
});
//# sourceMappingURL=script.js.map