import util from "./util.js";
import dataStructure from "./data-structure.js";

const clearPaths = () => {
  const [M, N] = util.getMN();
  const board = document.getElementById("board");
  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      util.getCell([i, j]).classList.remove("path");
      util.getCell([i, j]).classList.remove("explored");
    }
  }
};

const bfs = () => {
  clearPaths();
  const [M, N] = util.getMN();
  const grid = util.getGrid();
  const start = util.getStart();
  const goal = util.getGoal();
  const q = new dataStructure.Queue();

  const visited = [];
  const prev = [];
  for (let i = 0; i < M; i++) {
    visited[i] = Array(N).fill(0);
    prev[i] = Array(N).map((e) => [-1, -1]);
  }
  let t = 1;
  ///
  q.push(start);
  visited[start[0]][start[1]] = 1;
  prev[start[0]][start[1]] = [-1, -1];
  while (q.empty() == false) {
    const [a, b] = q.pop();
    if (a === goal[0] && b === goal[1]) {
      break;
    }
    setTimeout(() => {
      util.getCell([a, b]).classList.add("explored");
    }, t++ * 5);
    const dir = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];
    util.shuffleArray(dir);
    dir.forEach(([offa, offb]) => {
      const x = a + offa;
      const y = b + offb;
      if (
        x >= 0 &&
        x < M &&
        y >= 0 &&
        y < N &&
        grid[x][y] === 0 &&
        visited[x][y] === 0
      ) {
        prev[x][y] = [a, b];
        visited[x][y] = 1;
        q.push([x, y]);
      }
    });
  }
  let cur = [...goal];
  while (cur[0] !== -1 && cur[1] !== -1) {
    const a = cur[0],
      b = cur[1];
    setTimeout(() => {
      util.getCell([a, b]).classList.add("path");
    }, t++ * 5);
    cur = prev[a][b];
  } 
};


export default {bfs, clearPaths};