import { allWordsExceptAnswers, allAnswerWords } from "./constants.js";

const allWords: string[] = allWordsExceptAnswers.concat(allAnswerWords);
const answersLength: number = allAnswerWords.length;

const board = document.getElementById("board");
let currentRowIndex: number = 0;
let currentCellIndex: number = 0;
let currentRow: Element;
let answerWord: string;
let randomNumber: number;
let currentWord: string;
const possibleStates: string[] = ["correct", "present", "unused"]

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

const createAnswerWord = (): void => {
    randomNumber = Math.floor(Math.random() * (answersLength + 1));
    answerWord = allAnswerWords[randomNumber].toUpperCase();
    console.log("answer: ", answerWord);
};

createAnswerWord();

const checkValidWord = (word: string): boolean => {
    return allWords.includes(word.toLowerCase());
};

const checkValidAnswerWord = (word: string): boolean => {
    return allAnswerWords.includes(word.toLowerCase());
};

const updateCellNumber = (type: string): void => {
    /* 
    accepted inputs: 
    key: next cell, if space
    back: previous cell, if space
    enter: next row, first cell
    */

    if (type === "key" && currentCellIndex <= 4) {
        currentCellIndex++;
    } else if (type === "back" && currentCellIndex > 0) {
        currentCellIndex--;
    } else if (type === "enter") {
        currentCellIndex = 0;
        currentRowIndex++;
    }
};

const checkIfSpace = (): boolean => {
    return currentCellIndex <= 4;
};

const insertLetter = (letter: string): void => {
    const currentCell = currentRow?.children[currentCellIndex];
    const currentCellPara = currentCell.children[0];
    if (!currentCellPara.innerHTML) {
        currentCellPara.innerHTML = letter;
    }
};

const deleteRecentLetter = (): void => {
    const lastCell = currentRow?.children[currentCellIndex - 1];
    const lastCellPara = lastCell.children[0];
    if (lastCellPara.innerHTML) {
        lastCellPara.innerHTML = "";
    }
};

const findCurrentWord = (): string => {
    let word: string = "";
    for (let cell of currentRow.children) {
        const cellPara = cell.children[0];
        word += cellPara.innerHTML;
    }
    return word;
};


const win = () => {};

const lose = () => {};

const updateCurrentWord = () => {
    currentWord = findCurrentWord();
}

const checkWin = () => {
    if (currentWord === answerWord) {
        win();
    }
};

const changeColourOfCell = (cellPosition: number, state: string) => {
    const cell = currentRow.children[cellPosition];
    if (possibleStates.includes(state)) {
        cell.classList.add(state);
    }
    
}

const checkLetters = () => {
    let currentWordArray: string[] = currentWord.split("");
    let answerWordArray: string[] = answerWord.split("");

    for (let i = 0; i < 5; i++) {
        const currentWordLetter = currentWordArray[i];
        const answerWordLetter = answerWordArray[i];

        if (currentWordLetter === answerWordLetter) { 
            changeColourOfCell(i, "correct")
            currentWordArray[i] = "";
            answerWordArray[i] = "";
        } 
    }

    for (let i = 0; i < 5; i++) {
        const answerWordLetter = answerWordArray[i];
        if (currentWordArray.includes(answerWordLetter)) {
            const indexOfLetter = currentWordArray.indexOf(answerWordLetter)
            changeColourOfCell(indexOfLetter, "present")
            currentWordArray[indexOfLetter] = ""
            answerWordArray[i] = "";
        }
    }

    checkWin();
};

const onEnterPress = (): void => {
    const validWord: boolean = checkValidWord(currentWord);
    if (currentCellIndex === 5 && validWord) {
        checkLetters();

        updateCellNumber("enter");
    }
};

const onBackspacePress = (): void => {
    if (currentCellIndex > 0) {
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
    currentRow = rows[currentRowIndex];
    
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
        
    updateCurrentWord();
});
