"use strict";
const board = document.getElementById("board");
let currentRow = 1;
const createCells = () => {
    for (let i = 1; i <= 6; i++) {
        const row = document.createElement("div");
        row.className = "row " + i.toString();
        for (let j = 1; j <= 5; j++) {
            const cell = document.createElement("div");
            cell.className = "cell " + i.toString() + j.toString();
            const paragraph = document.createElement("p");
            paragraph.className = "letter";
            paragraph.innerHTML = "A";
            cell.appendChild(paragraph);
            row.appendChild(cell);
        }
        board === null || board === void 0 ? void 0 : board.appendChild(row);
    }
};
createCells();
const rows = document.querySelectorAll(".row");
const findNextEmptyCellInRow = () => {
    var _a;
    for (let cell of (_a = rows[currentRow - 1]) === null || _a === void 0 ? void 0 : _a.children) {
        const cellParagraph = cell.children[0];
        const cellText = cellParagraph.innerHTML;
        const cellId = cell.classList[1];
        return cellId;
    }
    return "";
};
const onEnterPress = () => {
    console.log("enter");
};
const onBackspacePress = () => {
    console.log("backspace");
};
const onKeyPress = (letter) => {
    letter = letter.toUpperCase();
    const emptyCellId = findNextEmptyCellInRow();
    const emptyCell = document.getElementsByClassName(emptyCellId)[0];
};
document.addEventListener("keydown", (event) => {
    let key = event.key;
    if (key == "Enter") {
        onEnterPress();
    }
    else if (key == "Backspace") {
        onBackspacePress();
    }
    else if (((key.charCodeAt(0) >= 97 && key.charCodeAt(0) <= 122) ||
        (key.charCodeAt(0) >= 65 && key.charCodeAt(0) <= 90)) &&
        key.length === 1) {
        onKeyPress(key);
    }
});
//# sourceMappingURL=script.js.map