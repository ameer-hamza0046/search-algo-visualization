import createBoard from "./components/createBoard.js";

createBoard();

import getInfo from "./components/getInfo.js";

document.getElementById("btn1").addEventListener("click",() => console.log(getInfo.getStart()));
document.getElementById("btn2").addEventListener("click",() => console.log(getInfo.getGoal()));