import util from "./util.js";
import dataStructure from "./data-structure.js";

const bfs = () => {
  // taking input M, N, grid, goal, dir
  const [M, N, grid, start, goal] = [
    ...util.getMN(),
    util.getGrid(),
    util.getStart(),
    util.getGoal(),
  ];
  // initializing queue
  const q = new dataStructure.Queue();
  q.push({
    cur: [...start],
    prev: [-1, -1],
  });
  // 2d array visited is used so that we can avoid duplicate arrays
  const visited = util.array2D(M, N, 0);
  // 2d array previous will be used to calculate the path from start to goal
  const previous = util.array2D(M, N, [-1, -1]);
  // clearing the board off of previous results
  util.clearPaths();
  // t is a counter used for animation
  let t = 0;
  // starting bfs
  while (q.empty() === false) {
    const { cur, prev } = q.pop();
    // checking if we have to explore cur or not
    if (
      cur[0] < 0 ||
      cur[0] >= M ||
      cur[1] < 0 ||
      cur[1] >= N ||
      grid[cur[0]][cur[1]] == 1 ||
      visited[cur[0]][cur[1]]
    ) {
      continue;
    }
    visited[cur[0]][cur[1]] = true;
    previous[cur[0]][cur[1]] = [...prev];
    setTimeout(() => {
      util.getCell(cur).classList.add("explored");
    }, (t += 10));
    if (util.isEqual(cur, goal)) {
      break;
    }
    util.getDir().forEach((d) => {
      q.push({
        cur: [cur[0] + d[0], cur[1] + d[1]],
        prev: [cur[0], cur[1]],
      });
    });
  }
  // calculating path using the "previous" 2D array
  const path = [];
  let cur = [...goal];
  while (util.isEqual(cur, [-1, -1]) === false) {
    path.push(cur);
    cur = previous[cur[0]][cur[1]];
  }
  path.reverse();
  // animating the path
  path.forEach((cell) =>
    setTimeout(() => {
      util.getCell(cell).classList.add("path");
    }, (t += 20))
  );
};

const dfs = () => {
  // taking input M, N, grid, goal, dir
  const [M, N, grid, start, goal] = [
    ...util.getMN(),
    util.getGrid(),
    util.getStart(),
    util.getGoal(),
  ];
  // initializing stack
  const stack = [];
  stack.push({
    cur: [...start],
    prev: [-1, -1],
  });
  // used to check duplicates
  const visited = util.array2D(M, N, 0);
  // will be used to calculate path from start to goal
  const previous = util.array2D(M, N, [-1, -1]);
  // clearing the previous output
  util.clearPaths();
  // counter used for animation
  let t = 0;
  // starting dfs
  while (stack.length > 0) {
    const { cur, prev } = stack.pop();
    // checking if we have to explore cur or not
    if (
      cur[0] < 0 ||
      cur[0] >= M ||
      cur[1] < 0 ||
      cur[1] >= N ||
      grid[cur[0]][cur[1]] == 1 ||
      visited[cur[0]][cur[1]]
    ) {
      continue;
    }
    // visited, prev, and animation
    visited[cur[0]][cur[1]] = true;
    previous[cur[0]][cur[1]] = [...prev];
    setTimeout(() => {
      util.getCell(cur).classList.add("explored");
    }, (t += 10));
    if (util.isEqual(cur, goal)) {
      break;
    }
    // pushing neighbouring cells into the stack
    util.getDir().forEach((d) => {
      stack.push({
        cur: [cur[0] + d[0], cur[1] + d[1]],
        prev: [cur[0], cur[1]],
      });
    });
  }
  // calculating path from start to goal
  const path = [];
  let cur = [...goal];
  while (util.isEqual(cur, [-1, -1]) === false) {
    path.push(cur);
    cur = previous[cur[0]][cur[1]];
  }
  path.reverse();
  // animating the path
  path.forEach((cell) =>
    setTimeout(() => {
      util.getCell(cell).classList.add("path");
    }, (t += 20))
  );
};

const iddfs = () => {
  // taking input M, N, grid, goal, dir
  const [M, N, grid, start, goal] = [
    ...util.getMN(),
    util.getGrid(),
    util.getStart(),
    util.getGoal(),
  ];
  // quietly calculate the shortest path to each visitable cell using bfs..........
  const q = new dataStructure.Queue();
  q.push({ cur: [...start], dis: 0 });
  const distance = util.array2D(M, N, -1);
  while (q.empty() === false) {
    const { cur, dis } = q.pop();
    if (
      cur[0] < 0 ||
      cur[0] >= M ||
      cur[1] < 0 ||
      cur[1] >= N ||
      grid[cur[0]][cur[1]] == 1 ||
      distance[cur[0]][cur[1]] !== -1
    ) {
      continue;
    }
    distance[cur[0]][cur[1]] = dis;
    if (util.isEqual(cur, goal)) {
      break;
    }
    util.getDir().forEach((d) => {
      q.push({ cur: [cur[0] + d[0], cur[1] + d[1]], dis: dis + 1 });
    });
  }
  // done........................................................................
  // starting iddfs
  let goalFound = false;
  // counter used for animation
  let t = 0;
  // will be used to calculate path from start to goal
  const previous = util.array2D(M, N, [-1, -1]);
  for (let depthLimit = 1; depthLimit < M * N && !goalFound; depthLimit++) {
    const stack = [];
    stack.push({
      cur: [...start],
      prev: [-1, -1],
      depth: 0,
    });
    // used to check duplicates
    const visited = util.array2D(M, N, 0);
    // clearing the previous output
    setTimeout(util.clearPaths, (t += 3));
    // starting dfs
    while (stack.length > 0) {
      const { cur, prev, depth } = stack.pop();
      // checking if we have to explore cur or not
      if (
        cur[0] < 0 ||
        cur[0] >= M ||
        cur[1] < 0 ||
        cur[1] >= N ||
        grid[cur[0]][cur[1]] == 1 ||
        visited[cur[0]][cur[1]] ||
        depth > distance[cur[0]][cur[1]] ||
        depth > depthLimit
      ) {
        continue;
      }
      // visited, prev, and animation
      visited[cur[0]][cur[1]] = true;
      previous[cur[0]][cur[1]] = [...prev];
      setTimeout(() => {
        util.getCell(cur).classList.add("explored");
      }, (t += 3));
      if (util.isEqual(cur, goal)) {
        goalFound = true;
        break;
      }
      // pushing neighbouring cells into the stack
      util.getDir().forEach((d) => {
        stack.push({
          cur: [cur[0] + d[0], cur[1] + d[1]],
          prev: [cur[0], cur[1]],
          depth: depth + 1,
        });
      });
    }
  }
  // calculating path using the "previous" 2D array
  const path = [];
  let cur = [...goal];
  while (util.isEqual(cur, [-1, -1]) === false) {
    path.push(cur);
    cur = previous[cur[0]][cur[1]];
  }
  path.reverse();
  // animating the path
  path.forEach((cell) =>
    setTimeout(() => {
      util.getCell(cell).classList.add("path");
    }, (t += 20))
  );
};

const a_star = () => {
  // taking input M, N, grid, goal, dir
  const [M, N, grid, start, goal] = [
    ...util.getMN(),
    util.getGrid(),
    util.getStart(),
    util.getGoal(),
  ];
  // estimated cost function
  const g = (cur) => {
    return 1 * (Math.abs(cur[0] - goal[0]) + Math.abs(cur[1] - goal[1]));
  };
  // initializing priority queue
  const pq = new dataStructure.MinPriorityQueue();
  pq.min_heap_insert({
    key: 0 + g(start),
    fn: 0,
    cur: [...start],
    prev: [-1, -1],
  });
  // 2d array visited is used so that we can avoid duplicate arrays
  const visited = util.array2D(M, N, 0);
  // 2d array previous will be used to calculate the path from start to goal
  const previous = util.array2D(M, N, [-1, -1]);
  // clearing the board off of previous results
  util.clearPaths();
  // t is a counter used for animation
  let t = 0;
  // starting a_star
  while (pq.empty() === false) {
    const { fn, cur, prev } = pq.heap_extract_min();
    // checking if we have to explore cur or not
    if (
      cur[0] < 0 ||
      cur[0] >= M ||
      cur[1] < 0 ||
      cur[1] >= N ||
      grid[cur[0]][cur[1]] == 1 ||
      visited[cur[0]][cur[1]]
    ) {
      continue;
    }
    visited[cur[0]][cur[1]] = true;
    previous[cur[0]][cur[1]] = [...prev];
    setTimeout(() => {
      util.getCell(cur).classList.add("explored");
    }, (t += 10));
    if (util.isEqual(cur, goal)) {
      break;
    }
    util.getDir().forEach((d) => {
      const newcur = [cur[0] + d[0], cur[1] + d[1]];
      pq.min_heap_insert({
        key: fn + 1 + g(newcur),
        fn: fn + 1,
        cur: newcur,
        prev: cur,
      });
    });
  }
  // calculating path using the "previous" 2D array
  const path = [];
  let cur = [...goal];
  while (util.isEqual(cur, [-1, -1]) === false) {
    path.push(cur);
    cur = previous[cur[0]][cur[1]];
  }
  path.reverse();
  // animating the path
  path.forEach((cell) =>
    setTimeout(() => {
      util.getCell(cell).classList.add("path");
    }, (t += 20))
  );
};

const greedy_bfs = () => {
  // taking input M, N, grid, goal, dir
  const [M, N, grid, start, goal] = [
    ...util.getMN(),
    util.getGrid(),
    util.getStart(),
    util.getGoal(),
  ];
  // estimated cost function
  const g = (cur) => {
    return 1 * (Math.abs(cur[0] - goal[0]) + Math.abs(cur[1] - goal[1]));
  };
  // initializing priority queue
  const pq = new dataStructure.MinPriorityQueue();
  pq.min_heap_insert({
    key: g(start),
    cur: [...start],
    prev: [-1, -1],
  });
  // 2d array visited is used so that we can avoid duplicate arrays
  const visited = util.array2D(M, N, 0);
  // 2d array previous will be used to calculate the path from start to goal
  const previous = util.array2D(M, N, [-1, -1]);
  // clearing the board off of previous results
  util.clearPaths();
  // t is a counter used for animation
  let t = 0;
  // starting greedy best first search
  while (pq.empty() === false) {
    const { cur, prev } = pq.heap_extract_min();
    // checking if we have to explore cur or not
    if (
      cur[0] < 0 ||
      cur[0] >= M ||
      cur[1] < 0 ||
      cur[1] >= N ||
      grid[cur[0]][cur[1]] == 1 ||
      visited[cur[0]][cur[1]]
    ) {
      continue;
    }
    visited[cur[0]][cur[1]] = true;
    previous[cur[0]][cur[1]] = [...prev];
    setTimeout(() => {
      util.getCell(cur).classList.add("explored");
    }, (t += 10));
    if (util.isEqual(cur, goal)) {
      break;
    }
    util.getDir().forEach((d) => {
      const newcur = [cur[0] + d[0], cur[1] + d[1]];
      pq.min_heap_insert({
        key: g(newcur),
        cur: newcur,
        prev: cur,
      });
    });
  }
  // calculating path using the "previous" 2D array
  const path = [];
  let cur = [...goal];
  while (util.isEqual(cur, [-1, -1]) === false) {
    path.push(cur);
    cur = previous[cur[0]][cur[1]];
  }
  path.reverse();
  // animating the path
  path.forEach((cell) =>
    setTimeout(() => {
      util.getCell(cell).classList.add("path");
    }, (t += 20))
  );
};

export default { bfs, dfs, iddfs, a_star, greedy_bfs };
