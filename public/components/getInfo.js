const getInfo = {
  getM: function () {
    return 25;
  },
  getN: function () {
    return 45;
  },
  getCell: function ([i, j]) {
    return document.getElementById("board").children[i].children[j];
  },
  getStart: function () {
    const M = this.getM();
    const N = this.getN();
    for (let i = 0; i < M; i++) {
      for (let j = 0; j < N; j++) {
        if (
          this.getCell([i, j]).children.length > 0 &&
          this.getCell([i, j]).children[0].id === "start"
        ) {
          return [i, j];
        }
      }
    }
    return [-1, -1];
  },
  getGoal: function () {
    const M = this.getM();
    const N = this.getN();
    for (let i = 0; i < M; i++) {
      for (let j = 0; j < N; j++) {
        if (
          this.getCell([i, j]).children.length > 0 &&
          this.getCell([i, j]).children[0].id === "goal"
        ) {
          return [i, j];
        }
      }
    }
    return [-1, -1];
  },
  getGrid: function () {
    const M = this.getM();
    const N = this.getN();
    const grid = Array(M);
    for (let i = 0; i < M; i++) {
      grid[i] = Array(N).fill(0);
      for (let j = 0; j < N; j++) {
        if (this.getCell([i, j]).classList.contains("wall")) {
          grid[i][j] = 1;
        }
      }
    }
    return grid;
  },
};
export default getInfo;
