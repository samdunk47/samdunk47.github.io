const board = document.getElementById("board");
let currentRow: number = 1;

const findCell = (id: string) => {
    let cellFound = document.getElementById("cell-" + id);
    return cellFound;
};

const onEnterPress = () => {
    
};

const onBackspacePress = () => {

};

document.addEventListener("keydown", (event) => {
    console.log(event);
});