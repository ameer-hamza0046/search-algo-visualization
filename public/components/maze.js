import util from "./util.js";

const [M, N] = util.getMN();
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

  return grid;
};
//
const dfsmaze = () => {
  const grid = mazeSkeleton();
  // select a starting location
  // range(x) = 2*[0, M/2)+1
  // range(y) = 2*[0, N/2]+1
  const [x, y] = [2 * util.rand(M / 2) + 1, 2 * util.rand(N / 2) + 1];

  const visited = [];
  for (let i = 0; i < M; i++) {
    visited[i] = Array(N).fill(0);
  }

  const dfs = ([x, y]) => {
    const dir = util.getDir();
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
      if (grid[i][j] === 1) {
        util.getCell([i, j]).classList.add("wall");
      } else {
        util.getCell([i, j]).classList.remove("wall");
      }
    }
  }
};

export default { mazeSkeleton, dfsmaze };
