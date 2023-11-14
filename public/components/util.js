const getMN = () => [25, 45];
const getCell = ([i, j]) =>
  document.getElementById("board").children[i].children[j];
const searchIdInCells = (id) => {
  const [M, N] = getMN();
  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      if (
        getCell([i, j]).children.length > 0 &&
        getCell([i, j]).children[0].id === id
      ) {
        return [i, j];
      }
    }
  }
  return [-1, -1];
};
const getStart = () => searchIdInCells("start");
const getGoal = () => searchIdInCells("goal");
const getGrid = () => {
  const [M, N] = getMN();
  const grid = [];
  for (let i = 0; i < M; i++) {
    grid[i] = Array(N).fill(0);
    for (let j = 0; j < N; j++) {
      if (getCell([i, j]).classList.contains("wall")) {
        grid[i][j] = 1;
      }
    }
  }
  return grid;
};

// range [0, floor(a))
const rand = (a) => Math.floor(Math.random() * Math.floor(a));

const shuffleArray = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
};

///////////////////////
const createBoard = () => {
  const [M, N] = getMN();
  const board = document.getElementById("board");
  board.innerHTML = "";
  for (let i = 0; i < M; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < N; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.addEventListener("click", (e) => e.target.classList.toggle("wall"));
      // cell.addEventListener("dragenter", (e) =>
      //   e.target.classList.toggle("wall")
      // );
      row.appendChild(cell);
    }
    board.appendChild(row);
  }
  // to select an odd index for row and column for the start and goal node
  const start = [Math.floor(M / 2), Math.floor(N / 4)];
  if (start[0] % 2 === 0) {
    start[0]++;
  }
  if (start[1] % 2 === 0) {
    start[1]++;
  }
  const goal = [Math.floor(M / 2), Math.floor((3 * N) / 4)];
  if (goal[0] % 2 === 0) {
    goal[0]++;
  }
  if (goal[1] % 2 === 0) {
    goal[1]++;
  }
  const startNode = document.createElement("div");
  startNode.id = "start";
  const goalNode = document.createElement("div");
  goalNode.id = "goal";
  getCell(start).appendChild(startNode);
  getCell(goal).appendChild(goalNode);

  ///////////// dragging ////////////
  function dragstartHandler(ev) {
    // Add the target element's id to the data transfer object
    ev.dataTransfer.setData("application/my-app", ev.target.id);
    ev.dataTransfer.effectAllowed = "move";
  }
  function dragoverHandler(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
  }
  function dropHandler(ev) {
    ev.preventDefault();
    // Get the id of the target and add the moved element to the target's DOM
    const data = ev.dataTransfer.getData("application/my-app");
    ev.target.appendChild(document.getElementById(data));
  }
  ///////////////////////////////////
  startNode.setAttribute("draggable", "true");
  startNode.addEventListener("dragstart", dragstartHandler);
  goalNode.setAttribute("draggable", "true");
  goalNode.addEventListener("dragstart", dragstartHandler);
  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      const cur = getCell([i, j]);
      cur.addEventListener("dragover", dragoverHandler);
      cur.addEventListener("drop", dropHandler);
    }
  }
};

export default {
  rand,
  shuffleArray,
  getMN,
  getCell,
  getStart,
  getGoal,
  getGrid,
  createBoard,
};
