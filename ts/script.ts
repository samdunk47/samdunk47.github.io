const board = document.getElementById("board");
let currentRow: number = 1;

const createCells = () => {
    for (let i = 1; i <= 6; i++) {
        const row = document.createElement("div");
        row.className = "row " + i.toString();

        for (let j = 1; j <= 5; j++) {
            const cell = document.createElement("div");
            cell.className = "cell " + i.toString() + j.toString();

            const paragraph = document.createElement("p");
            paragraph.className = "letter";
            paragraph.innerHTML = "A"

            cell.appendChild(paragraph);
            row.appendChild(cell);
        }
        board?.appendChild(row);
    }
};

createCells();

const rows = document.querySelectorAll(".row");

const findNextEmptyCellInRow = (): string => {
    for (let cell of rows[currentRow - 1]?.children) {
        const cellParagraph: Element = cell.children[0];
        const cellText: string = cellParagraph.innerHTML;
        const cellId: string = cell.classList[1];
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

const onKeyPress = (letter: string) => {
    letter = letter.toUpperCase();
    const emptyCellId: string = findNextEmptyCellInRow();
    const emptyCell = document.getElementsByClassName(emptyCellId)[0];
};

document.addEventListener("keydown", (event) => {
    let key: string = event.key;

    if (key == "Enter") {
        onEnterPress();
    } else if (key == "Backspace") {
        onBackspacePress();
    } else if (
        ((key.charCodeAt(0) >= 97 && key.charCodeAt(0) <= 122) ||
            (key.charCodeAt(0) >= 65 && key.charCodeAt(0) <= 90)) &&
        key.length === 1
    ) {
        onKeyPress(key);
    }
});
