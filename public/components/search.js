import getInfo from "./getInfo.js";
import util from "./util.js";

class Node {
  constructor(val=0) {
    this.val = val;
    this.next = null;
    return this;
  }
}
class Queue {
  constructor() {
    this.head = this.tail = null;
    this.sz = 0;
  }
  push(val) {
    if(this.head===null) {
      this.head = this.tail = new Node(val);
    }
    else {
      this.tail.next = new Node(val);
      this.tail = this.tail.next;
    }
    this.sz++;
  }
  pop() {
    const val = this.head.val;
    if(this.head===this.tail) {
      this.head = this.tail = null;
    }
    else {
      this.head = this.head.next;
    }
    this.sz--;
    return val;
  }
  empty() {
    return this.head===null;
  }
  size() {
    return this.sz;
  }
  print() {
    const cur = []
    for(let i=this.head; i!==null; i=i.next) {
      cur.push(i.val);
    }
    console.log(cur);
  }
};

const bfs = () => {
    const M = getInfo.getM();
    const N = getInfo.getN();
    const grid = getInfo.getGrid();
    const start = getInfo.getStart();
    const goal = getInfo.getGoal();
    const q = new Queue();

    const visited = [];
    const prev = []
    for(let i=0; i<M; i++) {
      visited[i] = Array(N).fill(0);
      prev[i] = Array(N).map(e => [-1, -1]);
    }
    let t = 1;
    ///
    q.push(start);
    visited[start[0]][start[1]] = 1;
    prev[start[0]][start[1]] = [-1,-1];
    while(q.empty()==false) {
      console.log(q.size());
      const [a, b] = q.pop();
      if(a===goal[0] && b===goal[1]) {
        break;
      }
      setTimeout(() => {
        getInfo.getCell([a, b]).style.backgroundColor = "red";
      }, (t++)*5);
      const dir = [[-1,0],[1,0],[0,-1],[0,1]];
      util.shuffleArray(dir);
      dir.forEach(([offa, offb]) => {
        const x = a+offa;
        const y = b+offb;
        if(x>=0 && x<M && y>=0 && y<N && grid[x][y]===0 && visited[x][y]===0) {
          prev[x][y] = [a, b];
          visited[x][y] = 1;
          q.push([x, y]);
        }
      })
    }
    let cur = [...goal];
    while(cur[0]!==-1 && cur[1]!==-1) {
      const a = cur[0], b = cur[1];
      setTimeout(() => {
        getInfo.getCell([a, b]).style.backgroundColor = "pink";
      }, (t++)*5);
      cur = prev[a][b];
    }
};

const search = {
  bfs: bfs,
};
export default search;
