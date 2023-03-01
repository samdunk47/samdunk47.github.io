import { allWords, allAnswerWords } from "./constants.js";

const board = document.getElementById("board");
let currentRowNum: number = 0;
let currentCellNum: number = 0;
let currentRow: Element;

const createCells = (): void => {
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
        board?.appendChild(row);
    }
};

createCells();

const rows = document.querySelectorAll(".row");

const checkValidWord = (word: string): boolean => {
    return word in allWords;
}

const checkValidAnswerWord = (word: string): boolean => {
    return word in allAnswerWords;
}

const updateCellNumber = (type: string): void => {
    /* 
    accepted inputs: 
    key: next cell, if space
    back: previous cell, if space
    enter: next row, first cell
    */

    if (type === "key" && currentCellNum <= 4) {
        currentCellNum++;
    } else if (type === "back" && currentCellNum > 0) {
        currentCellNum--;
    } else if (type === "enter") {
        currentCellNum = 0;
        currentRowNum++;
    }
};

const checkIfSpace = (): boolean => {
    return currentCellNum <= 4;
};

const insertLetter = (letter: string): void => {
    const currentCell = currentRow?.children[currentCellNum];
    "asjoeijfopiasejfopiasejfpoasiejfpoaieuwpqoirupqoiwuerpoiqwuerpoqwiruoiwe";
    const currentCellPara = currentCell.children[0];
    if (!currentCellPara.innerHTML) {
        currentCellPara.innerHTML = letter;
    }
};

const deleteRecentLetter = (): void => {
    const lastCell = currentRow?.children[currentCellNum - 1];
    const lastCellPara = lastCell.children[0];
    if (lastCellPara.innerHTML) {
        lastCellPara.innerHTML = "";
    }
};

const findCurrentWord = (): string => {
    let word: string = ""
    for (let cell of currentRow.children) {
        const cellPara = cell.children[0];
        word += cellPara.innerHTML;
    }
    console.log(word);
    return word;
}

const checkWin = () => {};

const checkLetters = () => {};

const onEnterPress = (): void => {
    if (currentCellNum === 5) {
        checkLetters();
        if (currentRowNum === 6) {
            checkWin();
        }
        updateCellNumber("enter");
    }
};

const onBackspacePress = (): void => {
    if (currentCellNum > 0) {
        deleteRecentLetter();
        updateCellNumber("back");
    }
};

const onKeyPress = (letter: string): void => {
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

    let key: string = event.key;

    if (key === "Enter") {
        onEnterPress();
    } else if (key === "Backspace") {
        onBackspacePress();
    } else if (
        ((key.charCodeAt(0) >= 97 && key.charCodeAt(0) <= 122) ||
            (key.charCodeAt(0) >= 65 && key.charCodeAt(0) <= 90)) &&
        key.length === 1
    ) {
        onKeyPress(key);
    }
});
