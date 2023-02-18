"use strict";
const board = document.getElementById("board");
const cells = [];
for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 5; j++) {
        let cell = document.createElement("div");
        let cellID = "cell " + i.toString() + j.toString();
        cell.className = cellID;
        cells.push(cell);
        board.appendChild(cell);
    }
}
//# sourceMappingURL=script.js.map