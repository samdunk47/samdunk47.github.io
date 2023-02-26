const board = document.getElementById("board");
let currentRowNum: number = 0;
let currentCellNum: number = 0;

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
        board?.appendChild(row);
    }
};

createCells();

const rows = document.querySelectorAll(".row");


/*
const findNextEmptyCellInRow = (): string => {
    for (let i = 0; i < 5; i++) {
        const cell = rows[currentRow - 1].children[i];
        // console.log(cell);
        const cellParagraph: Element = cell.children[0];
        const cellText: string = cellParagraph.innerHTML;
        const cellId: string = cell.classList[1];
        if (!cellText) {
            return cellId;
        }
    }
    return "";
};
*/

const insertLetter = (letter: string) => {
    const currentRow = rows[currentRowNum];
    const currentCell = currentRow.children[currentCellNum];
    const currentCellPara = currentCell.children[0];
    if (!currentCellPara.innerHTML) {
        currentCellPara.innerHTML = letter;
    }
};

const onEnterPress = () => {
};

const onBackspacePress = () => {

};

const updateCellNumber = (type: string) => {
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
        // add enter code 
    }
};

/*
const checkEmptyCell = () => {
    const row = board!.getElementsByClassName(
        "row " + currentRow.toString()
    )[0];
    console.log(row);
};
*/

const checkIfSpace = (): boolean => {
    return currentCellNum <= 4;
}

const onKeyPress = (letter: string) => {
    letter = letter.toUpperCase();
    const validSpace = checkIfSpace();
    if (validSpace) { 
        insertLetter(letter);
        updateCellNumber("key");
    }

    // const emptyCellId: string = findNextEmptyCellInRow();
    // if
    // const emptyCell = document.getElementsByClassName(emptyCellId)[0];
    // insertLetter(emptyCell, letter);
};

document.addEventListener("keydown", (event) => {
    console.log(event);

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
