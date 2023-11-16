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
  // initialize variables
  const [M, N, grid, start, goal, dir] = [
    ...util.getMN(),
    util.getGrid(),
    util.getStart(),
    util.getGoal(),
    util.getDir(),
  ];
  const q = new dataStructure.Queue();
  const anim = [];
  const [visited, prev] = [[], []];
  for (let i = 0; i < M; i++) {
    visited[i] = Array(N).fill(0);
    prev[i] = [];
  }
  // remove walls for the start and goal node so that the search should stop on the start node or right before the goal node
  util.getCell(start).classList.remove("wall");
  util.getCell(goal).classList.remove("wall");
  // starting the search
  // x,y = coordinates of the current node
  // prevx, prevy = coordinates of the parent node (later used to find the path from start to goal)
  // dx, dy = last used direction by the parent node (used so that the search looks somewhat less chaotic)
  // x, y, prevx, prevy, dx, dy
  q.push([...start, -1, -1, 0, 0]);
  while (q.empty() == false) {
    const [x, y, prevx, prevy, dx, dy] = q.pop();
    if (x < 0 || x >= M || y < 0 || y >= N || grid[x][y] || visited[x][y]) {
      continue;
    }
    visited[x][y] = 1;
    prev[x][y] = [prevx, prevy];
    // storing the current visited node for the animation
    anim.push([x, y]);
    // if the current node is goal then stop here
    if (x === goal[0] && y === goal[1]) {
      break;
    }
    // shuffling the next dir array so that the choice of the next direction is random
    // we also move the previous directions dx, dy to the front so that the search looks less chaotic
    let curdir = dir.filter((item) => item[0] !== dx || item[1] !== dy);
    util.shuffleArray(curdir);
    curdir.unshift([dx, dy]);
    curdir.forEach(([offx, offy]) => {
      const [newx, newy] = [x + offx, y + offy];
      q.push([newx, newy, x, y, offx, offy]);
    });
  }
  // bfs is complete
  // calculating the path from start to goal
  let cur = [...goal];
  const path = [];
  while (cur[0] !== -1) {
    path.push(cur);
    cur = prev[cur[0]][cur[1]];
  }
  path.reverse();
  // animating the search
  let t = 0;
  anim.forEach((cell) => {
    setTimeout(() => {
      util.getCell(cell).classList.add("explored");
    }, (t += 2));
  });
  // animating the path
  path.forEach((cell) => {
    setTimeout(() => {
      util.getCell(cell).classList.add("path");
    }, (t += 10));
  });
};

const dfs = () => {
  clearPaths();
  // initialize variables
  const [M, N, grid, start, goal, dir] = [
    ...util.getMN(),
    util.getGrid(),
    util.getStart(),
    util.getGoal(),
    util.getDir(),
  ];
  const stack = [];
  const anim = [];
  const [visited, prev] = [[], []];
  for (let i = 0; i < M; i++) {
    visited[i] = Array(N).fill(0);
    prev[i] = [];
  }
  // remove walls for the start and goal node so that the search should stop on the start node or right before the goal node
  util.getCell(start).classList.remove("wall");
  util.getCell(goal).classList.remove("wall");
  // starting the search
  // x,y = coordinates of the current node
  // prevx, prevy = coordinates of the parent node (later used to find the path from start to goal)
  // dx, dy = last used direction by the parent node (used so that the search looks somewhat less chaotic)
  // x, y, prevx, prevy, dx, dy
  stack.push([...start, -1, -1, 0, 0]);
  while (stack.length > 0) {
    const [x, y, prevx, prevy, dx, dy] = stack.pop();
    if (x < 0 || x >= M || y < 0 || y >= N || grid[x][y] || visited[x][y]) {
      continue;
    }
    visited[x][y] = 1;
    prev[x][y] = [prevx, prevy];
    // storing the current visited node for the animation
    anim.push([x, y]);
    // if the current node is goal then stop here
    if (x === goal[0] && y === goal[1]) {
      break;
    }
    // shuffling the next dir array so that the choice of the next direction is random
    // we also move the previous directions dx, dy to the front so that the search looks less chaotic
    let curdir = dir.filter((item) => item[0] !== dx || item[1] !== dy);
    util.shuffleArray(curdir);
    curdir.push([dx, dy]);
    curdir.forEach(([offx, offy]) => {
      const [newx, newy] = [x + offx, y + offy];
      stack.push([newx, newy, x, y, offx, offy]);
    });
  }
  // bfs is complete
  // calculating the path from start to goal
  let cur = [...goal];
  const path = [];
  while (cur[0] !== -1) {
    path.push(cur);
    cur = prev[cur[0]][cur[1]];
  }
  path.reverse();
  // animating the search
  let t = 0;
  anim.forEach((cell) => {
    setTimeout(() => {
      util.getCell(cell).classList.add("explored");
    }, (t += 10));
  });
  // animating the path
  path.forEach((cell) => {
    setTimeout(() => {
      util.getCell(cell).classList.add("path");
    }, (t += 10));
  });
};

export default { bfs, clearPaths, dfs };
