const getCell = ([i,j]) => {
    return document.getElementById("board").children[i].children[j];
}
export default getCell;