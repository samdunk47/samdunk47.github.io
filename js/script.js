"use strict";
const board = document.getElementById("board");
const findCell = (id) => {
    let cellFound = document.getElementById("cell-" + id);
    return cellFound;
};
document.addEventListener("keydown", (event) => {
    console.log(event);
});
//# sourceMappingURL=script.js.map