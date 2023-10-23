import {M, N, start, goal, cell} from './Board.js';
import Neighbours from './Neighbours.js';

const DFS = () => {
    const visited = new Map();
    let goalfound = false;
    let t = 1000;
    const dfs_fun = ([i, j], [px, py]) => {
        visited.set(JSON.stringify([i, j]), [px, py]);
        if(JSON.stringify([i,j])===JSON.stringify(goal)) {
            goalfound = true;
        }
        ///////////////animation///////////////
        setTimeout(() => {
            cell(i, j).classList.add("path");
        }, t);
        t += 5;
        /////////////////////////////////////
        Neighbours(i, j).forEach(([x, y]) => {
            if(goalfound) {
                return;
            }
            if(x>=0 && x<M && y>=0 && y<N && !visited.has(JSON.stringify([x, y]))) {
                dfs_fun([x, y], [i, j]);
            }
        });
        if(!goalfound) {
            // visited.delete(JSON.stringify([i, j]));
            ///////////////animation////////////////
            setTimeout(() => {
                cell(i, j).classList.remove("path");
            }, t);
            t += 5;
            /////////////////////////////////////////
        }
    }
    dfs_fun(start, [-1,-1]);
    const path = []
    let cur = goal;
    while(cur[0] !== -1) {
        path.push([...cur]);
        cur = [...visited.get(JSON.stringify(cur))];
    }
    path.reverse();
    path.forEach(([a, b]) => {
        setTimeout(() => {
            cell(a, b).classList.add("path2");
        }, t);
        t += 10;
    })
}

export default DFS;