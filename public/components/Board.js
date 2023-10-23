const M = 50;
const N = 80;
const start = [Math.floor(M/2), Math.floor(N/4)];
const goal = [Math.floor(M/2), Math.floor(3*N/4)];

const cell = (i, j) => {
    return document.getElementById("board").children[i].children[j];
}

const createBoard = () => {
    const board = document.createElement("div");
    board.id = "board";
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
    document.getElementById("root").appendChild(board);
    cell(start[0], start[1]).id = "start";
    cell(goal[0], goal[1]).id = "goal";
}

export {createBoard, cell, M, N, start, goal};