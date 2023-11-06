import getInfo from "./getInfo.js";

const createBoard = () => {
  const M = getInfo.getM();
  const N = getInfo.getN();
  const board = document.getElementById("board");
  board.innerHTML = "";
  for (let i = 0; i < M; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < N; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.addEventListener("click", e => e.target.classList.toggle("wall"));
      // cell.addEventListener("dragenter", (e) =>
      //   e.target.classList.toggle("wall")
      // );
      cell.ondrag
      row.appendChild(cell);
    }
    board.appendChild(row);
  }
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
  getInfo.getCell(start).appendChild(startNode);
  getInfo.getCell(goal).appendChild(goalNode);

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
      const cur = getInfo.getCell([i, j]);
      cur.addEventListener("dragover", dragoverHandler);
      cur.addEventListener("drop", dropHandler);
    }
  }
};

export default createBoard;
