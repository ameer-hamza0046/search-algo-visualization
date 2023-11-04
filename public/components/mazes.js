import getInfo from './getInfo.js'
const M = getInfo.getM();
const N = getInfo.getN();
const getCell = getInfo.getCell;
//
const mazeSkeleton = () => {
    // creating a grid
    const grid = []
    for(let i=0; i<M; i++) {
        grid[i] = Array(N).fill(0);
    }
    // filling adjacent cells with walls
    for(let i=0; i<M; i++) {
        for(let j=0; j<N; j++) {
            if(i%2==0 || j%2==0) {
                grid[i][j] = 1;
            }
        }
    }
    // copying the skeleton to the board
    for(let i=0; i<M; i++) {
        for(let j=0; j<N; j++) {
            if(grid[i][j]===1) {
                getCell([i,j]).classList.add("wall");
            }
        }
    }
}
//
const dfsmaze = () => {

}

const mazes = {
    mazeSkeleton: mazeSkeleton,
    dfsmaze: dfsmaze,
}

export default mazes;