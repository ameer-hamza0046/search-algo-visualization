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

/**
 *
 * @param {*} anim the animation array
 * @param {*} path the array containing the path from start to goal
 * @param {*} timeSearch the time interval for every operation path searching animation
 * @param {*} timePath the time interval for every step while path animation
 * @param {*} startTime the start time
 * @returns
 */
const searchAnimate = (
  anim,
  path,
  timeSearch = 5,
  timePath = 5,
  startTime = 0
) => {
  let t = startTime;
  // animating the search
  clearPaths();
  anim.forEach((cell) => {
    setTimeout(() => {
      util.getCell(cell).classList.add("explored");
    }, (t += timeSearch));
  });
  // animating the path
  path.forEach((cell) => {
    setTimeout(() => {
      util.getCell(cell).classList.add("path");
    }, (t += timePath));
  });
  return t;
};

const bfs = () => {
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
  let goalFound = false;
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
      goalFound = true;
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
  if (goalFound) {
    while (cur[0] !== -1) {
      path.push(cur);
      cur = prev[cur[0]][cur[1]];
    }
  }
  path.reverse();
  // animating the search
  searchAnimate(anim, path, 5, 10, 0);
};

const dls = (depthLimit) => {
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
  let goalFound = false;
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
  // last parameter is depth
  stack.push([...start, -1, -1, 0, 0, 0]);
  while (stack.length > 0) {
    const [x, y, prevx, prevy, dx, dy, depth] = stack.pop();
    if (
      x < 0 ||
      x >= M ||
      y < 0 ||
      y >= N ||
      grid[x][y] ||
      visited[x][y] ||
      depth > depthLimit
    ) {
      continue;
    }
    visited[x][y] = 1;
    prev[x][y] = [prevx, prevy];
    // storing the current visited node for the animation
    anim.push([x, y]);
    // if the current node is goal then stop here
    if (x === goal[0] && y === goal[1]) {
      goalFound = true;
      break;
    }
    // shuffling the next dir array so that the choice of the next direction is random
    // we also move the previous directions dx, dy to the front so that the search looks less chaotic
    let curdir = dir.filter((item) => item[0] !== dx || item[1] !== dy);
    util.shuffleArray(curdir);
    curdir.push([dx, dy]);
    curdir.forEach(([offx, offy]) => {
      const [newx, newy] = [x + offx, y + offy];
      stack.push([newx, newy, x, y, offx, offy, depth + 1]);
    });
  }
  // dfs is complete
  // calculating the path from start to goal
  let cur = [...goal];
  const path = [];
  if (goalFound) {
    while (cur[0] !== -1) {
      path.push(cur);
      cur = prev[cur[0]][cur[1]];
    }
  }
  path.reverse();
  // animating the search
  searchAnimate(anim, path, 2, 5, 0);
  return goalFound;
};

const dfs = () => dls(100000);

export default { bfs, clearPaths, dfs };
