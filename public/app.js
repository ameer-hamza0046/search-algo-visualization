import util from "./components/util.js";
import maze from "./components/maze.js";
import search from "./components/search.js";

util.createBoard();
const algoSelect = document.getElementById("search-algo-select");
document.getElementById("createMaze").addEventListener("click", maze.dfsmaze);
document.getElementById("visualize").addEventListener("click", () => search[algoSelect.value]());
document.getElementById("reset").addEventListener("click", util.createBoard);
document.getElementById("clear").addEventListener("click", util.clearPaths);
