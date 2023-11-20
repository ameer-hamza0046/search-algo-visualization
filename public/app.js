import util from "./components/util.js";
import maze from "./components/maze.js";
import search from "./components/search.js";

util.createBoard();

document.getElementById("btn1").addEventListener("click", maze.dfsmaze);
document.getElementById("btn2").addEventListener("click", search.iddfs);
document.getElementById("btn3").addEventListener("click", util.createBoard);
document.getElementById("btn4").addEventListener("click", util.clearPaths);
