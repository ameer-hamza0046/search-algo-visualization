import createBoard from "./components/createBoard.js";

createBoard();

import mazes from "./components/mazes.js";
import search from "./components/search.js";

document.getElementById("btn1").addEventListener("click", mazes.dfsmaze);
document
  .getElementById("btn2")
  .addEventListener("click", () => search.bfs());
document.getElementById("btn3").addEventListener("click", createBoard);
