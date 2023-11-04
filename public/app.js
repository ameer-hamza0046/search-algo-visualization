import createBoard from "./components/createBoard.js";

createBoard();

import mazes from './components/mazes.js';

document.getElementById("btn1").addEventListener("click", mazes.mazeSkeleton);
document.getElementById("btn2").addEventListener("click",() => console.log("hello"));