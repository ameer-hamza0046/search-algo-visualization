import getDimensions from "./getDimensions.js";
import getCell from "./getCell.js";

const createBoard = () => {
    const M = getDimensions.getM();
    const N = getDimensions.getN();
    const board = document.getElementById("board");
    board.innerHTML = "";
    for(let i=0; i<M; i++) {
        const row = document.createElement("div");
        row.classList.add("row");
        for(let j=0; j<N; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            row.appendChild(cell);
        }
        board.appendChild(row);
    }
    const start = [Math.floor(M/2), Math.floor(N/4)];
    const goal = [Math.floor(M/2), Math.floor(3*N/4)];
    getCell(start).id = "start";
    getCell(goal).id = "goal";
}

export default createBoard;