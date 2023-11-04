import getInfo from "./getInfo.js";
import util from "./util.js";
const M = getInfo.getM();
const N = getInfo.getN();
const getCell = getInfo.getCell;
const rand = util.rand;
//
const mazeSkeleton = () => {
  // creating a grid
  const grid = [];
  for (let i = 0; i < M; i++) {
    grid[i] = Array(N).fill(0);
  }
  // filling adjacent cells with walls
  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      if (i % 2 == 0 || j % 2 == 0) {
        grid[i][j] = 1;
      }
    }
  }
  // copying the skeleton to the board
  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      if (grid[i][j] === 1) {
        getCell([i, j]).classList.add("wall");
      }
    }
  }

  return grid;
};
//
const dfsmaze = () => {
  const grid = mazeSkeleton();
  // select a starting location
  // range(x) = 2*[0, M/2)+1
  // range(y) = 2*[0, N/2]+1
  const [x, y] = [2 * rand(M / 2) + 1, 2 * rand(N / 2) + 1];

  const visited = [];
  for (let i = 0; i < M; i++) {
    visited[i] = Array(N).fill(0);
  }

  const dfs = ([x, y]) => {
    const dir = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];
    util.shuffleArray(dir);
    dir.forEach(([dirx, diry]) => {
      const [newx, newy] = [x + 2 * dirx, y + 2 * diry];
      if (
        newx >= 0 &&
        newx < M &&
        newy >= 0 &&
        newy < N &&
        visited[newx][newy] === 0
      ) {
        grid[x + dirx][y + diry] = 0;
        visited[newx][newy] = 1;
        dfs([newx, newy]);
      }
    });
  };
  dfs([x, y]);

  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      if (grid[i][j] === 0) {
        getCell([i, j]).classList.remove("wall");
      }
    }
  }

  return grid;
};

const mazes = {
  mazeSkeleton: mazeSkeleton,
  dfsmaze: dfsmaze,
};

export default mazes;
