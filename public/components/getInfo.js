const getInfo = {
  getM: function () {
    return 11;
  },
  getN: function () {
    return 21;
  },
  getCell: function ([i, j]) {
    return document.getElementById("board").children[i].children[j];
  },
  getStart: function () {
    const M = getInfo.getM();
    const N = getInfo.getN();
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
    const M = getInfo.getM();
    const N = getInfo.getN();
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
};
export default getInfo;
